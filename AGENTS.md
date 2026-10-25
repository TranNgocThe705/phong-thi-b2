# Phòng Thi B2 — Ghi chú phát triển

App luyện thi VSTEP B2 tĩnh (SPA thuần, không build step): `index.html` + `css/main.css` + `js/*.js` chạy trực tiếp trên trình duyệt.

## Chạy & kiểm tra

```bash
# Chạy local server
python3 -m http.server 8931          # → http://localhost:8931

# Kiểm tra cú pháp JS sau khi sửa (bắt buộc)
node --check js/app.js && node --check js/data-exam-library.js
```

## QUAN TRỌNG: Cache busting

Mọi file JS/CSS local được load kèm `?v=YYYYMMDD` trong `index.html`. **Khi sửa bất kỳ file `js/*` hoặc `css/*` nào, phải bump version** trong `index.html` (2 chỗ: `<link>` css + 10 thẻ `<script>`), nếu không trình duyệt sẽ dùng bản cache cũ (đã từng gây lỗi hiển thị số đề cũ).

## Cấu trúc dữ liệu

- `js/data-exam-library.js` — kho đề trung tâm: `ALL_READING_SETS` (21 bộ), `LISTENING` (8 bộ), `WRITING` (36), `SPEAKING_P1/P2/P3` (17 mỗi phần), `VSTEP_EXAM_SETS` (25 đề CBT). Block mới append cuối file rồi `ARR.push(...)` — xem mẫu block Thiên Ân / Tự biên.
- `js/data-grammar.js` `GRAMMAR` (100 câu/20 chủ đề), `js/data-vocab.js` `VOCAB` (100 câu/14 chủ đề) + `CARDS` (144 thẻ).
- Câu hỏi bắt buộc có `id`, `q`, `opts` (4), `a` (index), `ex` (giải thích tiếng Việt).
- Đề CBT map kỹ năng qua `readingSetIndex`, `listeningSet`, `w1Id/w2Id`, `s1Id/s2Id/s3Id`.
- Đếm số liệu trên UI luôn động (`ARR.length`) — không hardcode số.

## Lưu trữ localStorage

- `b2.dossier.v2` — Store: `answers` (sổ lỗi), `mocks` (lịch sử thi), `days` (streak), `cards` (hộp flashcard), `writings` (bài viết <6.0).
- `b2.cbt.draft.v1` — bản nháp bài thi CBT đang làm dở (resume sau F5); xóa khi nộp.
- `b2.ai.key.v1` — cấu hình API AI (Gemini/OpenAI); không commit khóa.

## Quy ước khác

- Scraper nguồn đề: `scripts/scrape-vstep-library.py` (SOURCES registry).
- Không để API key/secrets trong code hay log.
- VSTEP_EXAM_SETS nhóm hiển thị tự động theo `badge`/`source` qua `examGroupOf()` + `EXAM_GROUP_ORDER` trong `app.js` — thêm nguồn mới cần đăng ký nhóm ở đó.
