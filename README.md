# PHÒNG THI B2 — Web ôn thi VSTEP B2

Web tĩnh thuần HTML/CSS/JS, không cần backend, không cần build. Mở là dùng.

## Chạy

```bash
cd D:\B2
python -m http.server 8642
# mở http://127.0.0.1:8642
```

(Hoặc mở trực tiếp `index.html` bằng Chrome/Edge — khuyến nghị chạy qua server để mọi tính năng đồng nhất.)

## Tính năng

- **Ngữ pháp** 60 câu · 12 chủ đề, chấm ngay + giải thích, phím tắt A–D/←→
- **Từ vựng** 60 câu + 48 flashcard lặp lại (hộp 1–3), phát âm qua API
- **Đọc hiểu** 4 phần format VSTEP — gồm **4 passage 40 câu trong đề mẫu chính thức** (QĐ 730/QĐ-BGDĐT) kèm đáp án gốc + bảng quy đổi điểm
- **Nghe** 25 câu: Web Speech API đọc hội thoại 2 giọng (F/M), tốc độ 0.85×/1×/1.15×, transcript đối chiếu; 8 câu Part 1 lấy câu hỏi + đáp án từ đề chính thức
- **Viết** 8 đề (2 đề chính thức): editor giấy kẻ dòng, đếm từ, timer, bộ soi bài cục bộ (từ nối, từ lặp, câu quá dài…), **AI chấm theo 4 tiêu chí VSTEP**, bài mẫu chuẩn B2
- **Nói** 10 đề: ghi âm + nhận diện giọng (STT), đo tốc độ từ/phút + từ đệm, **AI chấm theo rubric VSTEP**, nút "Gọi AI sinh ý" khi bí, 6 chiến thuật cứu nguy chống 0 điểm
- **Thi thử** 3 cỡ đề (20/50/40 câu), timer, phiếu trả lời, cờ xem lại, chấm thang 10, dấu ĐẠT B2, review từng câu
- **Sổ lỗi** tự ghi mọi câu sai kèm giải thích, đánh dấu "đã hiểu"
- **Chiến thuật** đoán nghĩa từ ngữ cảnh (demo tương tác), phân tích ý đề 5W, mẹo từng phần
- **Widget TRẢ TỪ** (góc phải): Free Dictionary API + dịch MyMemory; nhấn đúp chuột vào từ bất kỳ để tra

## AI (tùy chọn)

Vào **Cài đặt**, cắm API key (Gemini miễn phí tại aistudio.google.com, hoặc bất kỳ endpoint tương thích OpenAI: OpenRouter, Together…). Key lưu trong localStorage trên máy bạn. Không có key: mọi thứ vẫn chạy, chỉ thiếu phần chấm AI (có bộ chấm cục bộ thay thế).

## Nguồn nội dung

- Đề mẫu chính thức VSTEP (Level 3-5) trích từ tài liệu công khai kèm Định dạng đề thi theo QĐ 730/QĐ-BGDĐT — file gốc trong `.cache/` (`de_minh_hoa.pdf`, `dthu.pdf`), đã parse tự động bằng `.cache/parse_reading.py`
- Cấu trúc đề tham khảo: evstep.edu.vn, citi.edu.vn, zim.vn
- Phần còn lại tự biên soạn theo đúng format VSTEP

## Cấu trúc

```
index.html          — khung SPA + nav
css/main.css        — toàn bộ style (concept "hồ sơ đề thi")
js/data-*.js        — bank đề tách riêng từng kỹ năng
js/data-reading-official.js — đề chính thức (sinh từ PDF bằng Python)
js/ai.js            — lớp API AI (Gemini/OpenAI) + bộ chấm cục bộ
js/app.js           — router, quiz engine, TTS, STT, từ điển, thi thử…
.cache/             — PDF gốc + script parse (không cần để chạy web)
```
