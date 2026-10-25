/* ============================================================
   Tích hợp AI (Gemini / OpenAI) và Bộ phân tích cục bộ
   - Người dùng tự cắm API key ở trang Cài đặt (lưu localStorage)
   - Không có key: bộ phân tích cục bộ (rule-based) vẫn chạy đủ
   ============================================================ */

/* Dịch mã lỗi API sang hướng dẫn xử lý tiếng Việt (trả null nếu không nhận diện được) */
function aiErrorHint(status, raw, model){
  let j = null;
  try { j = JSON.parse(raw); } catch(e){}
  const msg = (j && j.error && j.error.message) || raw || "";
  const st = (j && j.error && j.error.status) || "";
  if(status === 400) return "API Key không hợp lệ hoặc sai định dạng (" + st + "). Kiểm tra lại đã copy ĐỦ khóa chưa — khóa Gemini thường bắt đầu bằng “AIza”.";
  if(status === 401) return "API Key không hợp lệ (401 Unauthorized). Hãy kiểm tra lại khóa hoặc tạo khóa mới.";
  if(status === 403){
    if(/suspend/i.test(msg)) return "Project Google Cloud gắn với khóa này đã bị ĐÌNH CHỈ (suspended) nên khóa vô hiệu. Cách sửa: vào aistudio.google.com → Get API key → chọn “Create API key in new project” để cấp khóa mới rồi dán lại vào đây.";
    if(/referer|referrer|block/i.test(msg)) return "Khóa đang bị chặn bởi giới hạn referrer — vào Google Cloud Console → Credentials bỏ giới hạn hoặc tạo khóa mới không giới hạn.";
    return "Khóa không có quyền truy cập model này (403 " + st + "). Bấm “Lấy danh sách model khả dụng” trong trang Cài đặt để chọn model khóa được phép dùng, hoặc tạo khóa mới tại aistudio.google.com.";
  }
  if(status === 404) return "Không tìm thấy model “" + (model || "") + "”. Kiểm tra lại Tên Model — bấm “Lấy danh sách model khả dụng” trong trang Cài đặt để xem đúng các model khóa của bạn được dùng, hoặc để trống để dùng mặc định.";
  if(status === 429) return "Đã hết hạn ngạch (quota) miễn phí — chờ khoảng 1 phút rồi thử lại, hoặc đổi sang model khác trong ô Tên Model.";
  return null;
}

const AI = {
  KEY_STORE: "b2.ai.key.v1",
  cfg(){
    try { return JSON.parse(localStorage.getItem(this.KEY_STORE)) || {}; }
    catch(e){ return {}; }
  },
  saveCfg(c){ localStorage.setItem(this.KEY_STORE, JSON.stringify(c)); },
  available(){
    const c = this.cfg();
    return !!(c.key && c.key.length > 8);
  },
  /* ---- lời gọi chat duy nhất, trả về text thô ---- */
  async chat(prompt, system, maxTokens = 2500){
    const c = this.cfg();
    if(!this.available()) throw new Error("Chưa cấu hình API key — mở trang Cài đặt AI.");
    const provider = c.provider || "gemini";
    const model = c.model || (provider === "gemini" ? "gemini-2.5-flash" : "gpt-4o-mini");
    if(provider === "gemini"){
      const url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + encodeURIComponent(c.key);
      const body = {
        systemInstruction: { parts: [{ text: system || "" }] },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: maxTokens }
      };
      const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if(!r.ok){ const t = await r.text(); throw new Error(aiErrorHint(r.status, t, model) || ("Gemini lỗi " + r.status + ": " + t.slice(0, 160))); }
      const j = await r.json();
      return (j.candidates?.[0]?.content?.parts || []).map(p => p.text || "").join("");
    } else {
      const base = (c.baseUrl || "https://api.openai.com/v1").replace(/\/+$/, "");
      const r = await fetch(base + "/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + c.key },
        body: JSON.stringify({
          model: model,
          temperature: 0.4,
          max_tokens: maxTokens,
          messages: [
            { role: "system", content: system || "" },
            { role: "user", content: prompt }
          ]
        })
      });
      if(!r.ok){ const t = await r.text(); throw new Error(aiErrorHint(r.status, t, model) || ("API lỗi " + r.status + ": " + t.slice(0, 160))); }
      const j = await r.json();
      return j.choices?.[0]?.message?.content || "";
    }
  },

  /* ---- liệt kê model mà API key được phép dùng (đọc thẳng từ máy chủ) ---- */
  async listModels(cfgOverride){
    const c = cfgOverride || this.cfg();
    if(!c.key) throw new Error("Nhập API Key trước rồi bấm lấy danh sách.");
    const provider = c.provider || "gemini";
    if(provider === "gemini"){
      const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=" + encodeURIComponent(c.key) + "&pageSize=200");
      if(!r.ok){ const t = await r.text(); throw new Error(aiErrorHint(r.status, t, "") || ("Gemini lỗi " + r.status + ": " + t.slice(0, 160))); }
      const j = await r.json();
      return (j.models || [])
        .filter(m => (m.supportedGenerationMethods || []).includes("generateContent"))
        .map(m => (m.name || "").replace(/^models\//, ""))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    }
    const base = (c.baseUrl || "https://api.openai.com/v1").replace(/\/+$/, "");
    const r = await fetch(base + "/models", { headers: { "Authorization": "Bearer " + c.key } });
    if(!r.ok){ const t = await r.text(); throw new Error(aiErrorHint(r.status, t, "") || ("API lỗi " + r.status + ": " + t.slice(0, 160))); }
    const j = await r.json();
    return (j.data || []).map(m => m.id).filter(Boolean).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  },

  /* ============ 1. CHẤM VIẾT THEO RUBRIC VSTEP ============ */
  async gradeWriting(task, essay){
    const system = "Bạn là giám khảo VSTEP B2 (Việt Nam), chấm bài Writing theo 4 tiêu chí chính thức: Task Fulfillment (đáp ứng yêu cầu đề), Organization (mạch lạc, liên kết), Vocabulary (từ vựng B2), Grammar (ngữ pháp). Trả lời bằng tiếng Việt, giọng chuyên nghiệp nhưng thân thiện, đúng format yêu cầu.";
    const prompt = `ĐỀ BÀI (Task ${task.task}, ${task.type}, yêu cầu tối thiểu ${task.target} từ):\n${task.prompt}\n\n=== BÀI LÀM CỦA THÍ SINH (${countWords(essay)} từ) ===\n${essay}\n\n=== YÊU CẦU PHẢN HỒI (đúng thứ tự, dùng các dòng tiêu đề sau) ===\n[ĐIỂM DỰ KIẾN] Cho điểm trên thang 10 (ví dụ: 6.5/10) + 2 câu nhận xét tổng quan.\n[TIÊU CHÍ 1 - TASK FULFILLMENT] điểm /10 + nhận xét: đã trả lời đủ các ý đề yêu cầu chưa, ý nào thiếu.\n[TIÊU CHÍ 2 - ORGANIZATION] điểm /10 + nhận xét về bố cục đoạn, từ nối (trích từ nối đã dùng/cần bổ sung).\n[TIÊU CHÍ 3 - VOCABULARY] điểm /10 + 3 từ/cụm từ nên nâng cấp (ghi rõ từ gốc -> gợi ý thay B2).\n[TIÊU CHÍ 4 - GRAMMAR] điểm /10 + lỗi ngữ pháp cụ thể: trích câu sai nguyên văn -> sửa lại đúng.\n[BA CÂU NÂNG CẤP] 3 câu tiếng Anh mẫu chuẩn B2 mà thí sinh có thể áp dụng ngay.\n[LỜI KHUYÊN] 1 câu động viên + việc cần ưu tiên cải thiện.`;
    return this.chat(prompt, system);
  },

  /* ============ 2. NÂNG CẤP BÀI VIẾT LÊN MỨC B2 VÀ C1 ============ */
  async upgradeWriting(task, essay){
    const system = "Bạn là chuyên gia huấn luyện Writing VSTEP B2/C1. Nhiệm vụ của bạn là viết lại chính bài làm của thí sinh thành 2 phiên bản: Bản chuẩn B2 (Band 6.5-7.5) và Bản nâng cao C1 (Band 8.5+), giữ nguyên ý tưởng và lập luận của thí sinh nhưng sửa sạch lỗi và nâng cấp từ vựng, cấu trúc câu.";
    const prompt = `ĐỀ BÀI (Task ${task.task}, ${task.type}):\n${task.prompt}\n\n=== BÀI GỐC CỦA THÍ SINH (${countWords(essay)} từ) ===\n${essay}\n\n=== YÊU CẦU TRẢ VỀ ĐÚNG ĐỊNH DẠNG SAU ===\n[BẢN NÂNG CẤP CHUẨN B2 (BAND 7.0)]\nViết lại toàn bộ bài bằng tiếng Anh ở mức B2 vững vàng: tự nhiên, mạch lạc, đủ độ dài, giữ nguyên ý chính của thí sinh.\n\n[BẢN NÂNG CẤP CHUẨN C1 (BAND 8.5+)]\nViết lại toàn bộ bài bằng tiếng Anh ở mức C1 học thuật cao: dùng collocations sắc sảo, cấu trúc câu phức/đảo ngữ/mệnh đề phân từ tự nhiên.\n\n[ĐỐI CHIẾU CÁC CHỖ ĐÃ NÂNG CẤP]\nLiệt kê 5-6 thay đổi đắt giá nhất theo dạng:\n- Câu/cụm gốc của bạn -> Bản B2 -> Bản C1 (kèm giải thích ngắn gọn bằng tiếng Việt vì sao hay hơn).`;
    return this.chat(prompt, system, 3000);
  },

  /* ============ 3. PHÂN TÍCH NÓI TỪ TRANSCRIPT ============ */
  async gradeSpeaking(item, transcript, metrics){
    const system = "Bạn là giám khảo Speaking VSTEP B2. Bạn chỉ thấy transcript (không có audio) nên lưu ý ngắn gọn điều đó. Chấm theo: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, và Task Fulfillment. Trả lời tiếng Việt, format chặt theo yêu cầu.";
    const prompt = `PHẦN THI: ${item.topic} (Part ${item.part}).\nĐỀ/GỢI Ý: ${item.situation || item.mindmap ? JSON.stringify({situation:item.situation, mindmap:item.mindmap, followups:item.followups||[]}) : (item.questions || []).join(" ")}\n\nCHỈ SỐ ĐO ĐƯỢC TỰ ĐỘNG: ${metrics.wpm} từ/phút, ${metrics.words} từ, ${metrics.fillers} từ đệm, ${metrics.conn} từ nối.\n\nTRANSCRIPT (Web Speech API ghi lại):\n${transcript}\n\n=== YÊU CẦU ===\n[ĐIỂM DỰ KIẾN] Cho điểm trên thang 10 (ví dụ: 6.5/10) + ấn tượng chung (Yếu/B1/B2/C1).\n[TRÔI CHẢY & LIÊN KẾT] nhận xét dựa trên WPM (B2 tốt: 100-150 wpm), từ nối và từ đệm.\n[TỪ VỰNG] 3 chỗ nên nâng cấp (trích nguyên văn -> thay bằng cụm từ B2).\n[NGỮ PHÁP] lỗi cụ thể: câu sai -> sửa đúng (tối đa 5 lỗi).\n[ĐÁP ỨNG ĐỀ] có bám đề/sơ đồ tư duy không, ý nào nên mở rộng.\n[BA MẪU CÂU] 3 câu mẫu để lần sau nói tốt hơn phần này.\n[LỜI KHUYÊN] 1 câu chốt.`;
    return this.chat(prompt, system);
  },

  /* ============ 4. NÂNG CẤP BÀI NÓI LÊN MỨC B2 VÀ C1 ============ */
  async upgradeSpeaking(item, transcript){
    const system = "Bạn là giám khảo & huấn luyện viên Speaking VSTEP B2/C1. Hãy nâng cấp bài nói của thí sinh lên 2 phiên bản: Bản nói tự nhiên chuẩn B2 (Band 7.0) và Bản nói xuất sắc chuẩn C1 (Band 8.5+), giữ nguyên ý tưởng cá nhân của thí sinh.";
    const prompt = `PHẦN THI SPEAKING PART ${item.part}: ${item.topic}\nBẢN GHI LỜI NÓI GỐC CỦA THÍ SINH:\n${transcript}\n\n=== YÊU CẦU TRẢ VỀ ĐÚNG ĐỊNH DẠNG ===\n[BẢN NÓI NÂNG CẤP B2 (BAND 7.0)]\nViết lại bài nói bằng tiếng Anh giao tiếp học thuật chuẩn B2, thêm các discourse markers tự nhiên (Well, To be honest, What I mean is, On top of that...).\n\n[BẢN NÓI NÂNG CẤP C1 (BAND 8.5+)]\nViết lại bài nói ở mức C1 trôi chảy, giàu collocations và sắc thái tự nhiên.\n\n[CỤM TỪ ĐẮT GIÁ ĐÃ NÂNG CẤP]\nLiệt kê 5 điểm nâng cấp từ bài gốc -> B2 -> C1 (kèm giải thích tiếng Việt).`;
    return this.chat(prompt, system, 2800);
  },

  /* ============ 5. CỨU NGUY BÍ Ý (GENERATE Ý TƯỞNG) ============ */
  async rescueIdeas(topic, question){
    const system = "Bạn là coach Speaking VSTEP B2. Sinh ý tưởng nhanh, thực tế, dễ nói cho thí sinh Việt Nam. Tiếng Việt phần giải thích, tiếng Anh phần câu mẫu.";
    const prompt = `Thí sinh đang bí ý khi nói Part ${question||2} VSTEP về chủ đề: "${topic}".\nCho tôi:\n[4 HƯỚNG Ý] 4 hướng triển khai, mỗi hướng 1 câu giải thích tiếng Việt + 1 câu tiếng Anh mẫu mở đầu.\n[TỪ KHÓA] 6-8 cụm từ B2 dùng được ngay cho chủ đề này (kèm nghĩa tiếng Việt).\n[MẪU CÂU MUA THỜI GIAN] 2 câu tiếng Anh "cứu nguy" khi đang bí (mua thời gian tự nhiên, lịch sự).`;
    return this.chat(prompt, system);
  },

  /* ============ 6. CHẤM TỰ ĐỘNG PHÒNG THI 4 KỸ NĂNG CBT ============ */
  async gradeFullExam(data){
    const system = "Bạn là Hội đồng Giám khảo chấm thi VSTEP B2 chính thức trên máy tính (CBT). Bạn sẽ chấm 2 bài Writing (Task 1 chiếm 1/3 điểm, Task 2 chiếm 2/3 điểm) và 3 phần Speaking (Part 1, Part 2, Part 3). Bạn PHẢI bắt đầu câu trả lời bằng dòng định dạng điểm số chính xác: SCORE_JSON:{\"w1\":6.5,\"w2\":6.5,\"writing\":6.5,\"s1\":6.5,\"s2\":6.5,\"s3\":6.5,\"speaking\":6.5} (nếu thí sinh bỏ trống phần nào thì cho 0 điểm phần đó), sau đó mới trình bày nhận xét chi tiết bằng tiếng Việt.";
    const prompt = `Hãy chấm bài thi VSTEP 4 kỹ năng của thí sinh dưới đây:

=== PHẦN THI VIẾT (WRITING) ===
1. Task 1 (Thư/Email - Yêu cầu ≥120 từ):
Đề: ${data.w1Task.prompt}
Bài làm thí sinh (${countWords(data.w1Text)} từ):
${data.w1Text || "(Thí sinh bỏ trống)"}

2. Task 2 (Luận văn Essay - Yêu cầu ≥250 từ):
Đề: ${data.w2Task.prompt}
Bài làm thí sinh (${countWords(data.w2Text)} từ):
${data.w2Text || "(Thí sinh bỏ trống)"}

=== PHẦN THI NÓI (SPEAKING) ===
1. Part 1 (Social Interaction - ${data.s1Item.topic}):
Câu hỏi: ${(data.s1Item.questions || []).join(" / ")}
Bài trả lời (${countWords(data.s1Text)} từ):
${data.s1Text || "(Thí sinh bỏ trống)"}

2. Part 2 (Solution Discussion - ${data.s2Item.topic}):
Tình huống: ${data.s2Item.situation}
Bài trả lời (${countWords(data.s2Text)} từ):
${data.s2Text || "(Thí sinh bỏ trống)"}

3. Part 3 (Topic Development - ${data.s3Item.topic}):
Chủ đề: ${JSON.stringify(data.s3Item.mindmap)}
Bài trả lời (${countWords(data.s3Text)} từ):
${data.s3Text || "(Thí sinh bỏ trống)"}

=== YÊU CẦU ĐẦU RA ===
Dòng đầu tiên BẮT BUỘC là JSON điểm thang 10 theo đúng mẫu:
SCORE_JSON:{"w1":0,"w2":0,"writing":0,"s1":0,"s2":0,"s3":0,"speaking":0}
(Lưu ý: writing = làm tròn 1 chữ số thập phân của (w1 + w2*2)/3; speaking = làm tròn 1 chữ số thập phân của trung bình s1, s2, s3).

Sau dòng SCORE_JSON, hãy nhận xét chi tiết theo các mục:
[ĐÁNH GIÁ KỸ NĂNG VIẾT (TASK 1 & TASK 2)]
Nhận xét ưu/nhược điểm từng bài theo 4 tiêu chí VSTEP, chỉ ra các lỗi ngữ pháp/từ vựng cần sửa và gợi ý cách nâng band.
[ĐÁNH GIÁ KỸ NĂNG NÓI (PART 1, PART 2, PART 3)]
Nhận xét mức độ trôi chảy, phát triển ý, từ vựng và ngữ pháp của cả 3 phần nói, kèm câu mẫu nâng cấp lên B2/C1.
[LỘ TRÌNH CẢI THIỆN ĐỂ ĐẠT B2/C1]
3 lời khuyên trọng tâm nhất dựa trên bài thi vừa làm.`;
    const raw = await this.chat(prompt, system, 3200);
    let scores = null;
    const m = raw.match(/SCORE_JSON:\s*(\{[^\n]+\})/);
    if(m){
      try { scores = JSON.parse(m[1]); } catch(e){}
    }
    const cleanText = raw.replace(/SCORE_JSON:\s*\{[^\n]+\}\s*/g, "").trim();
    return { scores, report: cleanText };
  }
};

/* ============================================================
   BỘ CHẤM CỤC BỘ (offline, không cần API key)
   ============================================================ */

const CONNECTIVES = ["however","moreover","in addition","nevertheless","therefore","furthermore","for instance","for example","in conclusion","to conclude","as a result","on the other hand","firstly","secondly","finally","besides","although","whereas","in contrast","what is more","to begin with","on balance","in summary"];
const FILLERS = ["uh","um","erm","er","like","you know","i mean","sort of","kind of","basically","actually"];
const BASIC_WORDS = {"good":"beneficial / rewarding / worthwhile","bad":"harmful / detrimental / adverse","very":"extremely / remarkably / considerably","nice":"pleasant / enjoyable / delightful","a lot of":"a great deal of / numerous / a wide range of","thing":"aspect / factor / matter","get":"obtain / acquire / receive","big":"significant / substantial / considerable","small":"minimal / modest / slight","happy":"delighted / content","sad":"disheartened / frustrated"};

function countWords(t){ return ((t || "").trim().match(/\S+/g) || []).length; }

const LocalAnalyzer = {
  /* ---- chấm điểm số Writing cục bộ (0 - 10) ---- */
  scoreWritingNumeric(text, task){
    const words = countWords(text);
    if(words < 10) return 0;
    const low = text.toLowerCase();
    const conn = CONNECTIVES.filter(c => low.includes(c)).length;
    const wordsArr = (low.match(/[a-z']+/g) || []);
    const ttr = wordsArr.length ? (new Set(wordsArr).size / wordsArr.length) : 0;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;
    const lengthRatio = Math.min(1.15, words / task.target);
    let score = 3.5 * Math.min(1, lengthRatio);
    score += Math.min(2.5, conn * 0.5);
    score += Math.min(2.0, ttr * 4.2);
    score += paragraphs >= (task.task === 1 ? 3 : 4) ? 1.5 : paragraphs >= 2 ? 0.8 : 0.2;
    return Math.min(9.0, Math.max(1.0, +score.toFixed(1)));
  },

  /* ---- chấm điểm số Speaking cục bộ (0 - 10) ---- */
  scoreSpeakingNumeric(text, minWords = 60){
    const words = countWords(text);
    if(words < 5) return 0;
    const low = text.toLowerCase();
    const conn = CONNECTIVES.filter(c => low.includes(c)).length;
    const wordsArr = (low.match(/[a-z']+/g) || []);
    const ttr = wordsArr.length ? (new Set(wordsArr).size / wordsArr.length) : 0;
    const lengthRatio = Math.min(1.15, words / minWords);
    let score = 4.0 * Math.min(1, lengthRatio);
    score += Math.min(2.5, conn * 0.6);
    score += Math.min(2.5, ttr * 4.5);
    return Math.min(9.0, Math.max(1.0, +score.toFixed(1)));
  },

  /* ---- phân tích bài viết ---- */
  writing(text, task){
    const words = countWords(text);
    const sentences = (text.match(/[.!?]+/g) || []).length || 1;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;
    const wordsArr = (text.toLowerCase().match(/[a-z']+/g) || []);
    const uniq = new Set(wordsArr).size;
    const ttr = wordsArr.length ? +(uniq / wordsArr.length).toFixed(2) : 0;
    const sentLens = text.split(/[.!?]+/).map(s => countWords(s)).filter(n => n > 0);
    const avgSent = sentLens.length ? +(sentLens.reduce((a,b)=>a+b,0) / sentLens.length).toFixed(1) : 0;
    const longSents = sentLens.filter(n => n > 35).length;
    const low = text.toLowerCase();
    const conn = CONNECTIVES.filter(c => low.includes(c));
    const basics = Object.keys(BASIC_WORDS).filter(k => new RegExp("\\b" + k + "\\b", "i").test(low));
    const reps = {};
    const STOP = new Set("the a an and or but of to in on for with is are was were be been it its this that i you he she they we my your their as at by from not have has had do does did will would can could should".split(" "));
    wordsArr.forEach(w => { if(!STOP.has(w) && w.length > 3){ reps[w] = (reps[w]||0)+1; } });
    const topReps = Object.entries(reps).filter(e => e[1] >= 4).sort((a,b)=>b[1]-a[1]).slice(0,5);
    const hasGreeting = /\b(dear)\b/i.test(text);
    const hasClosing = /(yours (sincerely|faithfully)|best wishes|warm regards|all the best)/i.test(text);
    const estScore = this.scoreWritingNumeric(text, task);

    const tips = [];
    if(task.task === 1){
      tips.push(hasGreeting ? "Có lời chào mở đầu chuẩn mực." : "Thiếu lời chào mở đầu (Dear...) — thư bắt buộc mở đầu đúng chuẩn.");
      tips.push(hasClosing ? "Có lời chào kết thư đầy đủ." : "Thiếu câu chào kết thư (Yours sincerely / Best wishes...).");
    } else {
      if(paragraphs >= 4) tips.push(paragraphs + " đoạn văn — bố cục bài luận 4 đoạn (Mở bài - Thân bài 1 - Thân bài 2 - Kết bài) đạt chuẩn.");
      else tips.push("Mới có " + paragraphs + " đoạn — bài luận Task 2 nên chia thành 4 đoạn rõ ràng.");
    }
    if(words < task.target) tips.push("Đang có " + words + "/" + task.target + " từ — còn thiếu " + (task.target - words) + " từ. Hãy thêm 1 câu ví dụ cụ thể ở mỗi đoạn thân bài.");
    else tips.push("Đạt yêu cầu độ dài (" + words + " / ≥" + task.target + " từ).");
    if(avgSent > 28) tips.push("Độ dài câu trung bình " + avgSent + " từ — khá dài; nên đan xen câu 10–15 từ để dễ theo dõi.");
    if(longSents) tips.push("Có " + longSents + " câu vượt quá 35 từ — cân nhắc tách câu để tránh lỗi ngữ pháp.");
    if(conn.length < 4) tips.push("Mới dùng " + conn.length + " loại từ nối — mức B2 nên có từ 5 từ nối học thuật trở lên (However, Moreover, In addition, For instance, To conclude...).");
    else tips.push("Sử dụng từ nối tốt: " + conn.slice(0, 6).join(", ") + ".");
    if(basics.length) tips.push("Gợi ý nâng cấp từ cơ bản lên B2: " + basics.map(b => b + " → " + BASIC_WORDS[b]).join("; ") + ".");
    if(topReps.length) tips.push("Các từ lặp lại nhiều lần (≥4 lần): " + topReps.map(e => e[0] + " (" + e[1] + "×)").join(", ") + " — nên thay bằng từ đồng nghĩa.");
    tips.push("Độ đa dạng từ vựng (TTR): " + ttr + (ttr < 0.4 ? " — còn lặp từ, nên paraphrase thêm." : " — đạt mức tốt."));

    return {
      estScore,
      metrics: [
        ["Điểm ước lượng cục bộ", estScore + " / 10"],
        ["Số lượng từ", words + " / ≥" + task.target],
        ["Số câu & độ dài TB", sentences + " câu (TB " + avgSent + " từ/câu)"],
        ["Số đoạn văn", paragraphs + " đoạn"],
        ["Từ nối học thuật", conn.length + " loại"],
        ["Đa dạng từ vựng (TTR)", ttr]
      ],
      tips
    };
  },

  /* ---- phân tích bài nói từ transcript ---- */
  speaking(transcript, durationSec){
    const words = countWords(transcript);
    const wpm = durationSec > 3 ? Math.round(words / (durationSec / 60)) : 0;
    const low = " " + transcript.toLowerCase().replace(/[^\w\s']/g, " ") + " ";
    const fillers = FILLERS.reduce((s, f) => s + (low.split(" " + f + " ").length - 1), 0);
    const conn = CONNECTIVES.filter(c => low.includes(c)).length;
    const wordsArr = (transcript.toLowerCase().match(/[a-z']+/g) || []);
    const ttr = wordsArr.length ? +(new Set(wordsArr).size / wordsArr.length).toFixed(2) : 0;
    const tips = [];
    if(wpm === 0) tips.push("Chưa ghi nhận được giọng nói — hãy kiểm tra quyền truy cập micro trên trình duyệt.");
    else if(wpm < 80) tips.push(wpm + " từ/phút — hơi chậm so với chuẩn B2 (100–150). Hãy mở rộng mỗi ý bằng 1 câu giải thích hoặc ví dụ cá nhân.");
    else if(wpm > 170) tips.push(wpm + " từ/phút — khá nhanh; nên nói chậm lại một chút để phát âm rõ âm cuối.");
    else tips.push(wpm + " từ/phút — nằm trong ngưỡng trôi chảy chuẩn B2 (100–150 từ/phút).");
    if(fillers > 4) tips.push("Phát hiện " + fillers + " từ đệm (uh, um, like...) — nên thay bằng cụm từ nối tự nhiên như “Well, from my perspective...”, “Let me think for a moment...”.");
    else tips.push("Kiểm soát từ đệm tốt (" + fillers + " lần).");
    tips.push("Đã dùng " + conn + " loại từ nối" + (conn < 3 ? " — nên bổ sung Because, However, In fact, For example để câu nói mạch lạc hơn." : " — độ liên kết câu tốt."));
    tips.push("Độ đa dạng từ vựng (TTR): " + ttr + (ttr < 0.35 ? " — lặp từ khá nhiều, hãy thử paraphrase." : " — đạt mức khá tốt."));
    if(words < 80) tips.push("Tổng số từ là " + words + " từ — ở Part 2 và Part 3 bạn nên nói khoảng 150–220 từ.");
    return { wpm, words, fillers, conn, ttr, tips };
  }
};

/* md-lite: **bold**, dòng [TIÊU ĐỀ] -> heading, "- " -> bullet, xuống dòng giữ nguyên */
function mdLite(s){
  let h = String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  h = h.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
  h = h.replace(/^#{1,3}\s*(.+)$/gm, "<b>$1</b>");
  h = h.replace(/^\[(.+?)\]\s*$/gm, '<span class="ai-sec">$1</span>');
  h = h.replace(/^\[(.+?)\]/gm, '<span class="ai-sec">$1</span>');
  h = h.replace(/^- (.+)$/gm, "<li>$1</li>");
  h = h.replace(/\n{2,}/g, "</p><p>");
  return "<p>" + h + "</p>";
}
