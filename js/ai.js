/* ============================================================
   Tích hợp AI (Gemini / OpenAI) và Bộ phân tích cục bộ
   - Người dùng tự cắm API key ở trang Cài đặt (lưu localStorage)
   - Không có key: bộ phân tích cục bộ (rule-based) vẫn chạy đủ
   ============================================================ */

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
  async chat(prompt, system){
    const c = this.cfg();
    if(!this.available()) throw new Error("Chưa cấu hình API key — mở trang Cài đặt.");
    const provider = c.provider || "gemini";
    const model = c.model || (provider === "gemini" ? "gemini-2.0-flash" : "gpt-4o-mini");
    if(provider === "gemini"){
      const url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + encodeURIComponent(c.key);
      const body = {
        systemInstruction: { parts: [{ text: system || "" }] },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 2048 }
      };
      const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if(!r.ok){ const t = await r.text(); throw new Error("Gemini lỗi " + r.status + ": " + t.slice(0, 200)); }
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
          messages: [
            { role: "system", content: system || "" },
            { role: "user", content: prompt }
          ]
        })
      });
      if(!r.ok){ const t = await r.text(); throw new Error("API lỗi " + r.status + ": " + t.slice(0, 200)); }
      const j = await r.json();
      return j.choices?.[0]?.message?.content || "";
    }
  },

  /* ============ CHẤM VIẾT THEO RUBRIC VSTEP ============ */
  async gradeWriting(task, essay){
    const system = "Bạn là giám khảo VSTEP B2 (Việt Nam), chấm bài Writing theo 4 tiêu chí chính thức: Task Fulfillment (đáp ứng yêu cầu đề), Organization (mạch lạc, liên kết), Vocabulary (từ vựng B2), Grammar (ngữ pháp). Trả lời bằng tiếng Việt, giọng chuyên nghiệp nhưng thân thiện, đúng format yêu cầu.";
    const prompt = `ĐỀ BÀI (Task ${task.task}, ${task.type}, yêu cầu tối thiểu ${task.target} từ):\n${task.prompt}\n\n=== BÀI LÀM CỦA THÍ SINH (${countWords(essay)} từ) ===\n${essay}\n\n=== YÊU CẦU PHẢN HỒI (đúng thứ tự, dùng các dòng tiêu đề sau) ===\n[TỔNG KẾT] 2-3 câu nhận xét chung + ước lượng mức đạt (Yếu/Dễ/Khá/Tốt B2).\n[TIÊU CHÍ 1 - TASK FULFILLMENT] điểm /5 + nhận xét: đã trả lời đủ các ý đề yêu cầu chưa, ý nào thiếu.\n[TIÊU CHÍ 2 - ORGANIZATION] điểm /5 + nhận xét về cấu trúc, từ nối (trích 1-2 từ nối đã dùng/khiếm khuyết).\n[TIÊU CHÍ 3 - VOCABULARY] điểm /5 + 3 từ/cụm từ nên nâng cấp (ghi rõ từ gốc -> gợi ý thay B2).\n[TIÊU CHÍ 4 - GRAMMAR] điểm /5 + lỗi ngữ pháp cụ thể: trích câu sai nguyên văn, gạch chân ý sai, viết lại đúng.\n[BA CÂU NÂNG CẤP] 3 câu tiếng Anh mẫu mà thí sinh có thể "mượn" cho đề tương tự.\n[LỜI KHUYÊN] 1 câu động viên + việc cần luyện trước nhất.`;
    return this.chat(prompt, system);
  },

  /* ============ PHÂN TÍCH NÓI TỪ TRANSCRIPT ============ */
  async gradeSpeaking(item, transcript, metrics){
    const system = "Bạn là giám khảo Speaking VSTEP B2. Bạn chỉ thấy transcript (không có audio) nên KHÔNG đánh giá phát âm, hãy nói rõ điều đó. Chấm theo: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, và mức đáp ứng đề. Trả lời tiếng Việt, format chặt theo yêu cầu.";
    const prompt = `PHẦN THI: ${item.topic} (Part ${item.part}).\nĐỀ/GỢI Ý: ${item.situation || item.mindmap ? JSON.stringify({situation:item.situation, mindmap:item.mindmap, followups:item.followups||[]}) : item.questions.join(" ")}\n\nCHỈ SỐ ĐO ĐƯỢC TỰ ĐỘNG: ${metrics.wpm} từ/phút, ${metrics.words} từ, ${metrics.fillers} từ đệm, ${metrics.connectives} từ nối.\n\nTRANSCRIPT (Web Speech API ghi lại):\n${transcript}\n\n=== YÊU CẦU ===\n[TỔNG KẾT] 2 câu: ấn tượng chung + mức (Yếu/Dễ/Khá/Tốt B2).\n[TRÔI CHẢY] nhận xét dựa trên WPM (B2 tốt: 100-150 wpm) và từ đệm; nếu WPM thấp, gợi ý kỹ thuật kéo dài ý.\n[TỪ VỰNG] 3 chỗ nên nâng cấp (trích nguyên văn -> thay bằng B2).\n[NGỮ PHÁP] lỗi cụ thể: câu sai -> sửa đúng (tối đa 5 lỗi).\n[NỘI DUNG] có bám đề/sơ đồ tư duy không, ý nào nên thêm.\n[BA MẪU CÂU] 3 câu mẫu để lần sau nói tốt hơn phần này.\n[LỜI KHUYÊN] 1 câu chốt.`;
    return this.chat(prompt, system);
  },

  /* ============ CỨU NGUY BÍ Ý (GENERATE Ý TƯỞNG) ============ */
  async rescueIdeas(topic, question){
    const system = "Bạn là coach Speaking VSTEP B2. Sinh ý tưởng nhanh, thực tế, dễ nói cho thí sinh Việt Nam. Tiếng Việt phần giải thích, tiếng Anh phần câu mẫu.";
    const prompt = `Thí sinh đang bí ý khi nói Part ${question||2} VSTEP về chủ đề: "${topic}".\nCho tôi:\n[4 HƯỚNG Ý] 4 hướng triển khai, mỗi hướng 1 câu giải thích tiếng Việt + 1 câu tiếng Anh mẫu mở đầu.\n[TỪ KHÓA] 6-8 cụm từ B2 dùng được ngay cho chủ đề này (kèm nghĩa tiếng Việt).\n[KHIẾU KHUYẾN KHÍCH] 2 câu tiếng Anh "cứu nguy" khi đang bí (mua thời gian tự nhiên, không phải "uhh").`;
    return this.chat(prompt, system);
  }
};

/* ============================================================
   BỘ CHẤM CỤC BỘ (offline, không cần API key)
   ============================================================ */

const CONNECTIVES = ["however","moreover","in addition","nevertheless","therefore","furthermore","for instance","for example","in conclusion","to conclude","as a result","on the other hand","firstly","secondly","finally","besides","although","whereas","in contrast","what is more","to begin with","on balance","in summary"];
const FILLERS = ["uh","um","erm","er","like","you know","i mean","sort of","kind of","basically","actually"];
const BASIC_WORDS = {"good":"beneficial / rewarding / worthwhile","bad":"harmful / detrimental / adverse","very":"extremely / remarkably / considerably","nice":"pleasant / enjoyable / delightful","a lot of":"a great deal of / numerous / a wide range of","thing":"aspect / factor / matter","get":"obtain / acquire / receive","big":"significant / substantial / considerable","small":"minimal / modest / slight","happy":"delighted / content","sad":"disheartened / frustrated"};

function countWords(t){ return (t.trim().match(/\S+/g) || []).length; }

const LocalAnalyzer = {
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

    const tips = [];
    if(task.task === 1){
      tips.push(hasGreeting ? "Có lời chào mở đầu — tốt." : "Thiếu lời chào (Dear...) — thư phải mở đầu đúng epistolary form.");
      tips.push(hasClosing ? "Có lời chào kết — chuẩn letter format." : "Thiếu câu chào kết (Yours sincerely / Best wishes...).");
    } else {
      if(paragraphs >= 4) tips.push(paragraphs + " đoạn — cấu trúc essay 4 đoạn (mở - thân 1 - thân 2 - kết) đạt.");
      else tips.push("Mới " + paragraphs + " đoạn — essay Task 2 nên có 4 đoạn trở lên (mở bài, 2 đoạn thân, kết).");
    }
    if(words < task.target) tips.push("Đang " + words + "/" + task.target + " từ — còn thiếu " + (task.target - words) + " từ. Mỗi ý thân bài thêm 1 câu dẫn chứng là đủ.");
    else tips.push("Đủ độ dài (" + words + "/" + task.target + " từ tối thiểu).");
    if(avgSent > 28) tips.push("Câu trung bình " + avgSent + " từ — hơi dài; xen câu ngắn 8-12 từ cho nhịp điệu.");
    if(longSents) tips.push(longSents + " câu vượt 35 từ — cân nhắc chẽ đôi bằng liên từ hoặc dấu chấm phẩy.");
    if(conn.length < 4) tips.push("Mới dùng " + conn.length + " loại từ nối — B2 nên có 5+ (However, Moreover, In addition, For instance, To conclude...).");
    else tips.push("Từ nối tốt: " + conn.slice(0, 6).join(", ") + ".");
    if(basics.length) tips.push("Từ cơ bản nên nâng cấp: " + basics.map(b => b + " → " + BASIC_WORDS[b]).join("; ") + ".");
    if(topReps.length) tips.push("Từ lặp nhiều (≥4 lần): " + topReps.map(e => e[0] + " (" + e[1] + "×)").join(", ") + " — thay bằng từ đồng nghĩa.");
    tips.push("Đa dạng từ vựng (type/token ratio): " + ttr + (ttr < 0.4 ? " — khá lặp, nên paraphrase thêm." : " — ở mức khá."));

    return {
      metrics: [
        ["Số từ", words + " / ≥" + task.target],
        ["Câu", sentences + " câu (TB " + avgSent + " từ/câu)"],
        ["Đoạn", paragraphs],
        ["Từ nối đã dùng", conn.length + " loại"],
        ["Từ đệm cơ bản", basics.length + " loại"],
        ["Đa dạng từ vựng", ttr]
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
    if(wpm === 0) tips.push("Chưa ghi nhận được giọng nói — kiểm tra micro / quyền trình duyệt.");
    else if(wpm < 80) tips.push(wpm + " từ/phút — chậm so với B2 (100-150). Mở rộng mỗi ý thêm 1 câu giải thích hoặc ví dụ.");
    else if(wpm > 170) tips.push(wpm + " từ/phút — khá nhanh, có thể mất rõ ràng; chậm lại ~15% để giám khảo kịp theo.");
    else tips.push(wpm + " từ/phút — nằm trong dải trôi chảy của B2 (100-150). Giữ nhịp này.");
    if(fillers > 4) tips.push(fillers + " từ đệm (uh, um, like...) — thay bằng cụm mua thời gian trang trọng: “That's an interesting point...”, “Let me think for a second...”.");
    else tips.push("Ít từ đệm (" + fillers + ") — kỷ luật tốt.");
    tips.push(conn + " loại từ nối được sử dụng" + (conn < 3 ? " — thêm Because, However, In fact, For example để câu logic hơn." : " — mức liên kết tốt."));
    tips.push("Độ đa dạng từ vựng (TTR): " + ttr + (ttr < 0.35 ? " — lặp từ nhiều, thử paraphrase chủ đề." : " — khá."));
    if(words < 80) tips.push("Tổng " + words + " từ — Part 2/3 thường cần 200+ từ cho 2 phút; tập nói dài hơi hơn.");
    return { wpm, words, fillers, conn, ttr, tips };
  }
};

/* md-lite: **bold**, dòng [TIÊU ĐỀ] -> heading, "- " -> bullet, xuống dòng giữ nguyên */
function mdLite(s){
  let h = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  h = h.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
  h = h.replace(/^#{1,3}\s*(.+)$/gm, "<b>$1</b>");
  h = h.replace(/^\[(.+?)\]\s*$/gm, '<span class="ai-sec">[$1]</span>');
  h = h.replace(/^\[(.+?)\]/gm, '<span class="ai-sec">[$1]</span>');
  h = h.replace(/^- (.+)$/gm, "<li>$1</li>");
  h = h.replace(/\n{2,}/g, "</p><p>");
  return "<p>" + h + "</p>";
}
