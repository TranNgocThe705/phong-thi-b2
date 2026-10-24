#!/usr/bin/env python3
"""
Công cụ thu thập & bóc tách đề thi VSTEP B2 từ cả file PDF và trang HTML
Hỗ trợ:
  1. Bóc tách file PDF trực tiếp (cả PDF văn bản bằng PDFKit lẫn PDF scan bằng Vision OCR)
  2. Cào dữ liệu từ các trang HTML luyện thi VSTEP (EVSTEP, Vivian, ZIM, PREP...)
  3. Chuẩn hóa câu hỏi trắc nghiệm (A/B/C/D), bài đọc, bài nghe, đề viết, đề nói

Cách chạy:
  python3 scripts/scrape-vstep-library.py --pdf https://vstep.ftu.edu.vn/wp-content/uploads/2023/10/DE-THI-MINH-HOA-VSTEP.pdf
  python3 scripts/scrape-vstep-library.py --html https://vstep-elearning.edu.vn/de-thi-vstep-reading/
  python3 scripts/scrape-vstep-library.py --sync-sources
"""

import argparse
import html
import json
import os
import re
import ssl
import subprocess
import tempfile
import urllib.request
from pathlib import Path

SOURCES = {
    "pdf": [
        {
            "id": "dthu_official_pdf",
            "title": "Đề mẫu Bộ GD&ĐT (ĐH Đồng Tháp công bố)",
            "url": "https://vstep.dthu.edu.vn/mainpage/page/27.pdf",
        },
        {
            "id": "ftu_official_pdf",
            "title": "Đề minh họa VSTEP 4 kỹ năng (ĐH Ngoại Thương FTU)",
            "url": "https://vstep.ftu.edu.vn/wp-content/uploads/2023/10/DE-THI-MINH-HOA-VSTEP.pdf",
        },
        {
            "id": "ctu_official_pdf",
            "title": "Đề thi mẫu VSTEP May 2015 (ĐH Cần Thơ CTU)",
            "url": "https://cfla.ctu.edu.vn/documents/20181/23252/%C4%90%E1%BB%81+thi+m%E1%BA%ABu/7690ef96-42ec-42cb-9688-f4d8f7b785ed",
        },
        {
            "id": "citi_sample_pdf",
            "title": "Đề thi minh họa VSTEP bậc 3-5 (CITI — cần OCR từng trang)",
            "url": "https://citi.edu.vn/wp-content/uploads/2024/03/De-thi-minh-hoa-bac-3-den-5.pdf",
        },
    ],
    "html": [
        {
            "id": "evstep_reading",
            "title": "Bộ đề VSTEP Reading Test 1 & Test 2 (EVSTEP)",
            "url": "https://vstep-elearning.edu.vn/de-thi-vstep-reading/",
        },
        {
            "id": "vivian_reading",
            "title": "Đề thi VSTEP Reading Full Test B1-B2-C1 (Ngoại ngữ Vivian)",
            "url": "https://vivian.edu.vn/de-thi-vstep-reading-full-test-b1-b2-c1",
        },
        {
            "id": "zim_full_sample",
            "title": "Đề thi mẫu VSTEP.3-5 đủ 4 kỹ năng (ZIM Academy)",
            "url": "https://zim.vn/de-thi-vstep",
        },
        {
            "id": "prep_full_sample",
            "title": "Đề thi mẫu VSTEP 4 kỹ năng (PREP Edu)",
            "url": "https://prepedu.com/vi/blog/de-thi-mau-vstep",
        },
        {
            "id": "thienan_test1",
            "title": "Thiên Ân VSTEP Test 1 — Full 4 kỹ năng (VSTEP Collection 20 Mock Tests)",
            "url": "https://anhnguthienan.edu.vn/de-thi-that-vstep-b1-b2-c1-test1/",
        },
        {
            "id": "thienan_test2",
            "title": "Thiên Ân VSTEP Test 2 — Full 4 kỹ năng",
            "url": "https://anhnguthienan.edu.vn/de-thi-mau-vstep-b1-b2-c1-test-2-full-04-ky-nang-co-dap-an/",
        },
        {
            "id": "thienan_test3",
            "title": "Thiên Ân VSTEP Test 3 — Full 4 kỹ năng",
            "url": "https://anhnguthienan.edu.vn/de-thi-thu-vstep-b1-b2-c1-test-3-full-04-ky-nang-co-dap-an/",
        },
        {
            "id": "thienan_test4",
            "title": "Thiên Ân VSTEP Test 4 — Full 4 kỹ năng",
            "url": "https://anhnguthienan.edu.vn/de-thi-vstep-b1-b2-c1-test-4-full-04-ky-nang-co-dap-an/",
        },
        {
            "id": "thienan_test5",
            "title": "Thiên Ân VSTEP Test 5 — Full 4 kỹ năng",
            "url": "https://anhnguthienan.edu.vn/de-thi-vstep-b1-b2-c1-test-5-full-04-ky-nang-co-dap-an/",
        },
        {
            "id": "thienan_archive",
            "title": "Thiên Ân — Kho đề thi thật VSTEP 2019–2023 (trang tổng hợp)",
            "url": "https://anhnguthienan.edu.vn/giai-de-thi-vstep/",
        },
        {
            "id": "edulife_collection",
            "title": "Edulife — Tổng hợp 100+ đề thi VSTEP B1-B2-C1 PDF",
            "url": "https://edulife.com.vn/tong-hop-de-thi-vstep-b1-b2-c1-pdf/",
        },
        {
            "id": "citi_reading",
            "title": "CITI — Luyện đề Reading VSTEP B2",
            "url": "https://citi.edu.vn/reading-vstep-b2/",
        },
    ],
}


def make_ssl_ctx():
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    return ctx


def fetch_bytes(url: str) -> bytes:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 Chrome/124.0 Safari/537.36"
        },
    )
    with urllib.request.urlopen(req, context=make_ssl_ctx(), timeout=25) as resp:
        return resp.read()


def extract_pdf_text_macos(pdf_path: str) -> str:
    """
    Trích xuất văn bản từ file PDF bằng PDFKit (kèm Vision OCR tự động nếu trang PDF là ảnh scan).
    """
    swift_code = r'''
import Foundation
import PDFKit
import Vision
import AppKit

let path = CommandLine.arguments[1]
guard let doc = PDFDocument(url: URL(fileURLWithPath: path)) else {
    fputs("Cannot open PDF\n", stderr)
    exit(1)
}

for i in 0..<doc.pageCount {
    guard let page = doc.page(at: i) else { continue }
    let raw = (page.string ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
    print("\n=== PAGE \(i + 1) ===")
    if raw.count > 40 {
        print(raw)
    } else {
        // Trang PDF scan dưới dạng hình ảnh -> dùng Vision OCR
        let bounds = page.bounds(for: .mediaBox)
        let img = page.thumbnail(of: CGSize(width: bounds.width * 2, height: bounds.height * 2), for: .mediaBox)
        if let tiff = img.tiffRepresentation, let bitmap = NSBitmapImageRep(data: tiff), let cgImg = bitmap.cgImage {
            let req = VNRecognizeTextRequest()
            req.recognitionLevel = .accurate
            req.recognitionLanguages = ["en-US", "vi-VN"]
            let handler = VNImageRequestHandler(cgImage: cgImg, options: [:])
            try? handler.perform([req])
            let recognized = (req.results ?? []).compactMap { $0.topCandidates(1).first?.string }.joined(separator: "\n")
            print(recognized)
        }
    }
}
'''
    with tempfile.NamedTemporaryFile("w", suffix=".swift", delete=False) as sf:
        sf.write(swift_code)
        swift_file = sf.name
    try:
        out = subprocess.check_output(["swift", swift_file, pdf_path], stderr=subprocess.DEVNULL)
        return out.decode("utf-8", errors="replace")
    finally:
        if os.path.exists(swift_file):
            os.unlink(swift_file)


def strip_html_to_text(raw_html: str) -> str:
    text = re.sub(r"<script\b[^>]*>[\s\S]*?</script>", " ", raw_html, flags=re.I)
    text = re.sub(r"<style\b[^>]*>[\s\S]*?</style>", " ", text, flags=re.I)
    text = re.sub(r"<(br|p|div|li|tr|h[1-6])\b[^>]*>", "\n", text, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = html.unescape(text)
    lines = [re.sub(r"[ \t]+", " ", ln).strip() for ln in text.splitlines()]
    return "\n".join(ln for ln in lines if ln)


def parse_mc_questions(text: str):
    """
    Nhận diện câu hỏi trắc nghiệm dạng:
      1. Question text...
      A. ... B. ... C. ... D. ...
    """
    pattern = re.compile(
        r"(?:^|\n)\s*(\d{1,2})\.\s+([^\n]+?)\s*\n"
        r"\s*A\.\s*([^\n]+?)\s*(?:\n|\s+)"
        r"B\.\s*([^\n]+?)\s*(?:\n|\s+)"
        r"C\.\s*([^\n]+?)\s*(?:\n|\s+)"
        r"D\.\s*([^\n]+)",
        re.M,
    )
    items = []
    for m in pattern.finditer(text):
        items.append(
            {
                "n": int(m.group(1)),
                "q": m.group(2).strip(),
                "opts": [m.group(3).strip(), m.group(4).strip(), m.group(5).strip(), m.group(6).strip()],
            }
        )
    return items


def main():
    parser = argparse.ArgumentParser(description="Scraper đề thi VSTEP từ PDF & HTML")
    parser.add_argument("--pdf", help="Đường dẫn file PDF hoặc URL PDF cần bóc tách")
    parser.add_argument("--html", help="URL trang HTML cần cào đề thi")
    parser.add_argument("--out", help="File JSON xuất kết quả bóc tách")
    parser.add_argument("--list-sources", action="store_true", help="Liệt kê các nguồn PDF & HTML đã cấu hình")
    args = parser.parse_args()

    if args.list_sources:
        print(json.dumps(SOURCES, ensure_ascii=False, indent=2))
        return

    if args.pdf:
        if args.pdf.startswith("http"):
            data = fetch_bytes(args.pdf)
            with tempfile.NamedTemporaryFile("wb", suffix=".pdf", delete=False) as f:
                f.write(data)
                pdf_path = f.name
        else:
            pdf_path = args.pdf
        text = extract_pdf_text_macos(pdf_path)
        qs = parse_mc_questions(text)
        result = {"source": args.pdf, "type": "pdf", "char_count": len(text), "questions_detected": len(qs), "questions": qs, "raw_text": text}
        if args.out:
            Path(args.out).write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
        else:
            print(f"Đã bóc tách PDF ({len(text)} ký tự, tìm thấy {len(qs)} câu trắc nghiệm).")
        return

    if args.html:
        raw = fetch_bytes(args.html).decode("utf-8", errors="replace")
        text = strip_html_to_text(raw)
        qs = parse_mc_questions(text)
        result = {"source": args.html, "type": "html", "char_count": len(text), "questions_detected": len(qs), "questions": qs, "raw_text": text}
        if args.out:
            Path(args.out).write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
        else:
            print(f"Đã cào HTML ({len(text)} ký tự, tìm thấy {len(qs)} câu trắc nghiệm).")
        return

    parser.print_help()


if __name__ == "__main__":
    main()
