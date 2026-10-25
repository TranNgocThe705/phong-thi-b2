# PHÒNG THI B2 — Nền tảng ôn thi VSTEP B2 (CBT)

Ứng dụng web tĩnh thuần HTML/CSS/JS mô phỏng phòng thi máy tính VSTEP — không cần backend, không cần build. Luyện đủ 4 kỹ năng **Nghe · Đọc · Viết · Nói** kèm giám khảo AI.

## Chạy

```bash
cd phong-thi-b2
python3 -m http.server 8931
# mở http://localhost:8931
```

Khuyến nghị chạy qua server (localhost hoặc HTTPS) để dùng đầy đủ tính năng PWA/thu âm — mở trực tiếp `index.html` qua `file://` vẫn chạy nhưng hạn chế.

## Ngân hàng đề

| Kỹ năng | Số lượng |
|---|---|
| Ngữ pháp & cấu trúc | 100 câu trắc nghiệm theo chuyên đề |
| Từ vựng B2 | 100 câu + 144 flashcard lặp lại ngắt quãng |
| Đọc hiểu | 21 bộ đề × 4 bài = 840 câu |
| Nghe hiểu | 8 bộ đề = 245 câu (TTS 2 giọng + transcript) |
| Viết | 87 đề (19 Task 1 · 68 Task 2 — trong đó 51 đề thi thật 2019–2023) |
| Nói | 108 chủ đề (Part 1: 17 · Part 2: 23 · Part 3: 68) |
| **Thi thử CBT** | **31 đề Full 4 kỹ năng** |

## Tính năng chính

- **Phòng thi CBT chuẩn thời gian thật**: Nghe 40p → Đọc 60p → Viết 60p → Nói 12p, tự chuyển phần, phiếu trả lời + cờ đánh dấu câu nghi ngờ
- **Tự lưu & khôi phục bài thi dở**: F5/đứt điện không mất bài — banner "tiếp tục bài thi" khi quay lại, chỉ báo `Đã lưu nháp · HH:MM`
- **Thu âm Speaking** bằng MediaRecorder: nghe lại và tải file `.webm` sau khi nộp, transcript STT chạy song song
- **AI chấm Viết/Nói** theo rubric VSTEP 4 tiêu chí, kèm gợi ý nâng bài lên B2/C1; có bộ chấm cục bộ khi không dùng AI
- **Sổ lỗi thông minh**: tự ghi câu sai kèm giải thích, lưu cả bài Viết < 6.0 cần viết lại, nhắc ôn lỗi cũ trên trang chủ
- **Biểu đồ band điểm**: đường tiến trình qua các lần thi với ngưỡng B1 4.0 / B2 6.0 / C1 8.5
- **Bộ công cụ triển khai ý** khi gặp đề lạ (4 bước + ngân hàng 64 lập luận vạn năng)
- **Mini-test bấm giờ** 15 câu/15 phút cho Ngữ pháp & Từ vựng
- **Flashcard** lọc theo hộp (chưa thuộc / đang nhớ / đã thuộc) + trộn thẻ
- **Sao lưu/khôi phục JSON** toàn bộ tiến trình trong Cài đặt
- **Phím tắt thi**: `1–4`/`A–D` chọn đáp án, `←/→` chuyển câu, `F` đánh cờ
- **In phiếu điểm** + PWA **Add to Home Screen** (manifest + service worker + favicon)
- **Widget TRẢ TỪ** (góc phải): Free Dictionary API + dịch MyMemory, nhấn đúp vào từ bất kỳ để tra

## AI (tùy chọn)

Vào **Cài đặt**, cắm API key (Gemini miễn phí tại aistudio.google.com, hoặc endpoint tương thích OpenAI: OpenRouter, Together…). Key lưu trong localStorage trên máy bạn — được kèm trong file sao lưu nên giữ file đó riêng tư. Không có key: mọi thứ vẫn chạy, chỉ thiếu phần chấm AI (có bộ chấm cục bộ thay thế).

## Nguồn nội dung

- **Sách NXB ĐHQGHN** — 10 bộ đề Reading/Listening
- **Anh ngữ Thiên Ân** (anhnguthienan.edu.vn) — 5 Collection Full 4 kỹ năng + 51 đề Viết Task 2 và 51 chủ đề Nói Part 3 trích từ **đề thi thật VSTEP 2019–2023** kèm bài mẫu B2/C1
- **ĐH Ngoại Thương, ĐH Đồng Tháp, EVSTEP, Vivian, ZIM, PREP** — bộ đề tham khảo
- Đề minh họa chính thức VSTEP (Bậc 3–5) theo QĐ 730/QĐ-BGDĐT
- Phần còn lại tự biên soạn đúng format VSTEP

## Lưu trữ local

| Key | Nội dung |
|---|---|
| `b2.dossier.v2` | Tiến trình: đáp án, lịch sử thi, ngày học, flashcard, bài viết cần viết lại |
| `b2.cbt.draft.v1` | Bản nháp bài thi CBT đang dở |
| `b2.ai.key.v1` | Cấu hình AI (provider, key, model) |

## Cấu trúc

```
index.html                 — khung SPA + nav + PWA meta
css/main.css               — toàn bộ style daylight academic
js/data-*.js               — ngân hàng đề tách theo kỹ năng
js/data-exam-library.js    — metadata 31 đề CBT + đề sách + đề thi thật Thiên Ân
js/ai.js                   — lớp API AI (Gemini/OpenAI) + bộ chấm cục bộ
js/app.js                  — router, quiz engine, CBT, TTS/STT, MediaRecorder…
sw.js / manifest.webmanifest / favicon.svg / icons/
                           — PWA (Add to Home Screen)
scripts/scrape-vstep-library.py — pipeline cào đề từ web
AGENTS.md                  — quy trình phát triển (bump ?v=, lệnh kiểm tra)
```
