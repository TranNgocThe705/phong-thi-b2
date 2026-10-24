/* ============================================================
   PHÒNG THI B2 — SPA chính
   ============================================================ */
"use strict";

const $ = (s, el) => (el || document).querySelector(s);
const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const shuffle = a => { a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pickN = (arr, n) => shuffle(arr).slice(0, n);
const fmtTime = s => { s = Math.max(0, Math.round(s)); return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); };
const todayStr = () => new Date().toISOString().slice(0, 10);
const LETTERS = ["A", "B", "C", "D"];

/* ================= STORE ================= */
const Store = {
  K: "b2.dossier.v2",
  d: null,
  load(){
    try { this.d = JSON.parse(localStorage.getItem(this.K)) || {}; } catch(e){ this.d = {}; }
    this.d.answers = this.d.answers || {};
    this.d.mocks = this.d.mocks || [];
    this.d.days = this.d.days || [];
    this.d.cards = this.d.cards || {};
    if(!this.d.days.includes(todayStr())) this.d.days.push(todayStr());
    this.save();
  },
  save(){ try { localStorage.setItem(this.K, JSON.stringify(this.d)); } catch(e){} },
  addAnswer(id, pick, ok){
    this.d.answers[id] = { pick, ok, at: Date.now(), resolved: false };
    if(!this.d.days.includes(todayStr())) this.d.days.push(todayStr());
    this.save();
  },
  resolve(id, v){ if(this.d.answers[id]){ this.d.answers[id].resolved = v; this.save(); } },
  addMock(m){ this.d.mocks.unshift(m); this.save(); },
  streak(){
    const days = this.d.days.slice().sort();
    let s = 0;
    for(let i = 0; i < days.length; i++){
      const cur = new Date(days[i]);
      const prev = i > 0 ? new Date(days[i - 1]) : null;
      if(i === 0){ s = 1; }
      else if((cur - prev) / 86400000 === 1){ s++; }
      else break;
    }
    const last = new Date(days[days.length - 1]);
    const stale = (Date.now() - last) / 86400000 > 1.5;
    return stale ? 0 : s;
  },
  accBy(prefix){
    let total = 0, ok = 0;
    for(const id in this.d.answers){
      if(prefix === "*" || id.startsWith(prefix)){
        total++; if(this.d.answers[id].ok) ok++;
      }
    }
    return { total, ok, pct: total ? Math.round(ok / total * 100) : 0 };
  }
};
Store.load();

/* ================= TTS ENGINE ================= */
const TTS = {
  voices: [], v1: null, v2: null, rate: 1, speaking: false, _onDone: null,
  init(){
    const load = () => {
      this.voices = speechSynthesis.getVoices().filter(v => (v.lang || "").toLowerCase().startsWith("en"));
      if(!this.voices.length) this.voices = speechSynthesis.getVoices();
      this.v1 = this.voices.find(v => /female|samantha|zira|google us/i.test(v.name)) || this.voices[0];
      this.v2 = this.voices.find(v => v !== this.v1 && /male|david|george|google uk/i.test(v.name)) || this.voices.find(v => v !== this.v1) || this.v1;
    };
    load();
    if(typeof speechSynthesis !== "undefined") speechSynthesis.onvoiceschanged = load;
  },
  speak(script, { rate = this.rate, onLine = null, onEnd = null } = {}){
    this.stop();
    this.speaking = true; this._onDone = onEnd;
    const chunk = (arr, i) => {
      if(i >= arr.length){ this.speaking = false; if(onEnd) onEnd(); return; }
      const line = arr[i];
      const u = new SpeechSynthesisUtterance(line.t);
      u.rate = rate;
      u.voice = line.v === 2 ? this.v2 : this.v1;
      if(line.v === 2) u.pitch = 0.85;
      if(onLine) onLine(i);
      u.onend = () => setTimeout(() => chunk(arr, i + 1), 260);
      u.onerror = () => { this.speaking = false; };
      speechSynthesis.speak(u);
    };
    chunk(script, 0);
  },
  stop(){ try { speechSynthesis.cancel(); } catch(e){} this.speaking = false; }
};
TTS.init();

/* ================= STT ENGINE (Web Speech API) ================= */
const STT = {
  supported: typeof webkitSpeechRecognition !== "undefined" || typeof SpeechRecognition !== "undefined",
  rec: null, active: false, finalText: "", interim: "",
  start(onUpdate, onEnd){
    if(!this.supported) return false;
    const R = webkitSpeechRecognition || SpeechRecognition;
    this.rec = new R();
    this.rec.lang = "en-US";
    this.rec.continuous = true;
    this.rec.interimResults = true;
    this.finalText = ""; this.interim = ""; this.active = true;
    this.rec.onresult = e => {
      this.interim = "";
      for(let i = e.resultIndex; i < e.results.length; i++){
        if(e.results[i].isFinal) this.finalText += e.results[i][0].transcript + " ";
        else this.interim += e.results[i][0].transcript;
      }
      onUpdate(this.finalText, this.interim);
    };
    this.rec.onend = () => { if(this.active){ try { this.rec.start(); } catch(e){} } else { onEnd && onEnd(this.finalText); } };
    this.rec.onerror = () => {};
    this.rec.start();
    return true;
  },
  stop(){
    this.active = false;
    try { this.rec && this.rec.stop(); } catch(e){}
    return this.finalText;
  }
};

/* ================= DICT WIDGET (Free Dictionary API + MyMemory) ================= */
const Dict = {
  el: null, mode: "dict",
  mount(){
    const wrap = document.createElement("div");
    wrap.className = "dictw";
    wrap.innerHTML = `
      <button class="dictw__fab mono" id="dictFab">TRẢ TỪ</button>
      <div class="dictw__panel sheet" id="dictPanel">
        <div class="dictw__head">
          <button class="dictw__tab mono on" data-m="dict">TỪ ĐIỂN</button>
          <button class="dictw__tab mono" data-m="trans">DỊCH CÂU</button>
          <button class="dictw__x mono" id="dictX">✕</button>
        </div>
        <div class="dictw__body">
          <div class="dictw__row">
            <input id="dictInput" placeholder="gõ một từ tiếng Anh…" autocomplete="off">
            <button class="btn btn--sm" id="dictGo">TRA</button>
          </div>
          <div id="dictOut" class="dictw__out"></div>
        </div>
      </div>`;
    document.body.appendChild(wrap);
    this.el = wrap;
    $("#dictFab").onclick = () => { wrap.classList.toggle("open"); if(wrap.classList.contains("open")) $("#dictInput").focus(); };
    $("#dictX").onclick = () => wrap.classList.remove("open");
    $$(".dictw__tab", wrap).forEach(t => t.onclick = () => {
      $$(".dictw__tab", wrap).forEach(x => x.classList.remove("on"));
      t.classList.add("on");
      this.mode = t.dataset.m;
      $("#dictInput").placeholder = this.mode === "dict" ? "gõ một từ tiếng Anh…" : "dán câu/tiếng Việt hoặc tiếng Anh…";
      $("#dictGo").textContent = this.mode === "dict" ? "TRA" : "DỊCH";
      $("#dictOut").innerHTML = "";
    });
    const go = () => this.go($("#dictInput").value.trim());
    $("#dictGo").onclick = go;
    $("#dictInput").onkeydown = e => { if(e.key === "Enter") go(); };
    document.addEventListener("dblclick", () => {
      const sel = (window.getSelection() || "").toString().trim();
      if(sel && /^[A-Za-z][A-Za-z -']{1,30}$/.test(sel)){
        wrap.classList.add("open");
        $("#dictInput").value = sel;
        this.go(sel);
      }
    });
  },
  async go(q){
    const out = $("#dictOut");
    if(!q) return;
    out.innerHTML = '<p class="dictw__loading mono">ĐANG TRA…</p>';
    try{
      if(this.mode === "dict"){
        let j;
        try{
          const r = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(q));
          if(!r.ok) throw new Error("notfound");
          j = await r.json();
        }catch(err){
          if(err.message === "notfound") throw err;
          /* API từ điển bị chặn/mất mạng — fallback dịch + đọc mẫu */
          j = null;
        }
        if(j){
          const e0 = j[0];
          const ph = e0.phonetic || (e0.phonetics || []).map(p => p.text).filter(Boolean)[0] || "";
          let html = `<div class="dictw__word"><b>${esc(e0.word)}</b> <span class="mono">${esc(ph)}</span></div>`;
          const aud = (e0.phonetics || []).map(p => p.audio).filter(Boolean)[0];
          if(aud) html += `<button class="btn btn--sm" id="dictAudio">▶ PHÁT ÂM</button>`;
          (e0.meanings || []).slice(0, 3).forEach(m => {
            html += `<div class="dictw__pos mono">${esc(m.partOfSpeech)}</div>`;
            m.definitions.slice(0, 2).forEach(d => {
              html += `<div class="dictw__def">– ${esc(d.definition)}${d.example ? `<i>“${esc(d.example)}”</i>` : ""}</div>`;
            });
          });
          out.innerHTML = html;
          if(aud) $("#dictAudio").onclick = () => new Audio(aud).play();
        } else {
          const t = await this.translate(q, "en|vi");
          out.innerHTML = `<div class="dictw__word"><b>${esc(q)}</b></div>
            <div class="dictw__trans">${esc(t)}</div>
            <button class="btn btn--sm" id="dictAudio">▶ ĐỌC TỪ</button>
            <p class="dictw__src mono">Từ điển Anh–Anh chưa trả lời được (mạng chặn) — hiển thị nghĩa dịch qua MyMemory + giọng đọc máy.</p>`;
          $("#dictAudio").onclick = () => TTS.speak([{v:0,t:q}]);
        }
      } else {
        const hasVi = /[ăâđêôơưàáảãạằắẳẵặèéẻẽẹìíỉĩịòóỏõọùúủũụỳýỷỹỵđ]/i.test(q);
        const t = await this.translate(q, hasVi ? "vi|en" : "en|vi");
        out.innerHTML = `<div class="dictw__trans">${esc(t)}</div><p class="dictw__src mono">MyMemory · ${(hasVi ? "vi|en" : "en|vi").replace("|", " → ")}</p>`;
      }
    }catch(err){
      out.innerHTML = `<p class="dictw__err">Không tra được “${esc(q)}”. Từ điển chỉ hỗ trợ tiếng Anh; thử kiểm tra chính tả, hoặc chuyển sang thẻ DỊCH CÂU.</p>`;
    }
  },
  async translate(text, pair){
    const r = await fetch("https://api.mymemory.translated.net/get?q=" + encodeURIComponent(text) + "&langpair=" + pair);
    const j = await r.json();
    if(!j.responseData || !j.responseData.translatedText) throw new Error("notfound");
    return j.responseData.translatedText;
  }
};

/* ================= ROUTER ================= */
const app = $("#app");
const ROUTES = {
  "/": viewHome, "/ngu-phap": viewGrammar, "/tu-vung": viewVocab, "/doc": viewReading,
  "/nghe": viewListening, "/viet": viewWriting, "/noi": viewSpeaking, "/thi-thu": viewMock,
  "/chien-thuat": viewStrategy, "/so-loi": viewMistakes, "/cai-dat": viewSettings
};
function route(){
  const hash = location.hash.replace(/^#/, "") || "/";
  const fn = ROUTES[hash] || viewHome;
  TTS.stop();
  if(STT.active) STT.stop();
  window.scrollTo(0, 0);
  $$(".nav a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + hash));
  $("#nav").classList.remove("open");
  fn();
}
window.addEventListener("hashchange", route);

/* ================= MẪU DÙNG CHUNG ================= */
function moduleHead(no, title, desc, meta){
  return `<div class="module-top">
    <div class="tag">PHẦN ${no} ${meta ? "· " + meta : ""}</div>
    <h1>${title}</h1>
    <p>${desc}</p>
  </div>`;
}
function officialBadge(){ return '<span class="badge-off mono">ĐỀ CHÍNH THỨC</span>'; }

/* ================= QUIZ ENGINE (practice) ================= */
function mountQuiz(mount, cfg){
  /* cfg: {items, title, getPassage(item)|null, sourceNote, onChange} */
  const items = cfg.items;
  let idx = 0;
  let rec; /* trạng thái đã làm của câu hiện tại, nạp lại khi render */

  function render(){
    const q = items[idx];
    rec = Store.d.answers[q.id];
    const passHtml = cfg.getPassage ? cfg.getPassage(q) : "";
    mount.innerHTML = `
      ${passHtml ? `<div class="sheet passage-panel">${passHtml}</div>` : ""}
      <div class="sheet q-card sheet--pad">
        <div class="q-card__top">
          <span class="q-card__no">CÂU ${idx + 1}/${items.length}<em>${q.tag || ""}</em></span>
          <span class="mono" style="font-size:10px;color:var(--ink-3)">${q.src ? esc(q.src).toUpperCase() : ""}</span>
        </div>
        <div class="q-card__text">${q.q}</div>
        <div class="opts" id="qOpts">
          ${q.opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="key">${LETTERS[i]}</span><span>${o}</span></button>`).join("")}
        </div>
        <div id="qExplain"></div>
        <div class="q-nav">
          <button class="btn btn--ghost" id="qPrev" ${idx === 0 ? "disabled" : ""}>← TRƯỚC</button>
          <span class="q-nav__mid">${rec ? "đã làm · " + (rec.ok ? "đúng" : "sai") : "chưa trả lời"}</span>
          <button class="btn" id="qNext" ${idx === items.length - 1 ? "disabled" : ""}>TIẾP →</button>
        </div>
        <p class="kbd-hint">Phím tắt: <b>A–D</b> chọn đáp án · <b>←/→</b> chuyển câu · nhấn đúp chuột vào từ để tra từ điển</p>
      </div>`;

    const paint = () => {
      $$(".opt", mount).forEach((el, i) => {
        el.classList.remove("sel", "correct", "wrong", "dim");
        if(rec === undefined) return;
        if(i === q.a) el.classList.add("correct");
        else if(i === rec.pick) el.classList.add("wrong");
        else el.classList.add("dim");
        el.disabled = true;
      });
    };
    if(rec !== undefined){ paint(); showEx(); }

    function showEx(){
      $("#qExplain", mount).innerHTML = `<div class="explain">
        <span class="explain__tag">GIẢI THÍCH ${rec.ok ? "· CHÍNH XÁC" : "· ĐÁP ÁN: " + LETTERS[q.a]}</span>
        <p>${q.ex || ""}</p></div>`;
    }

    $$(".opt", mount).forEach(el => el.onclick = () => {
      if(Store.d.answers[q.id] !== undefined) return;
      const i = +el.dataset.i;
      Store.addAnswer(q.id, i, i === q.a);
      rec = Store.d.answers[q.id];
      paint(); showEx();
    });
    const prev = $("#qPrev", mount); if(prev) prev.onclick = () => { idx--; render(); };
    const next = $("#qNext", mount); if(next) next.onclick = () => { idx++; render(); };
    focusHotkeys();
  }

  /* phím tắt A–D chọn đáp án, ←/→ chuyển câu — chỉ hoạt động khi quiz trong khung nhìn */
  let hotkeyEl = null;
  function focusHotkeys(){
    if(hotkeyEl) hotkeyEl.removeEventListener("keydown", hotkeyEl.__hk);
    hotkeyEl = $(".q-card", mount);
    if(!hotkeyEl) return;
    hotkeyEl.tabIndex = 0;
    hotkeyEl.__hk = e => {
      const k = e.key.toUpperCase();
      const q = items[idx];
      if(["A","B","C","D"].includes(k) && Store.d.answers[q.id] === undefined){
        const i = LETTERS.indexOf(k);
        const el = $$(".opt", mount)[i];
        if(el) el.click();
      } else if(e.key === "ArrowRight" && idx < items.length - 1){ idx++; render(); }
      else if(e.key === "ArrowLeft" && idx > 0){ idx--; render(); }
    };
    hotkeyEl.addEventListener("keydown", hotkeyEl.__hk);
    hotkeyEl.focus({ preventScroll: true });
  }

  render();
}

/* ================= TRANG CHỦ ================= */
function viewHome(){
  const total = Object.keys(Store.d.answers).length;
  const all = Store.accBy("*");
  const streak = Store.streak();
  const ai = AI.available();
  const modDefs = [
    ["01", "Ngữ pháp & cấu trúc", "12 chủ đề điểm rơi của đề VSTEP — thì, bị động, điều kiện, tường thuật…", "60 câu", "#/ngu-phap"],
    ["02", "Từ vựng B2", "Collocation, phrasal verbs, từ theo chủ đề + bộ flashcard lặp lại.", "60 câu + 48 thẻ", "#/tu-vung"],
    ["03", "Đọc hiểu", "4 phần đúng format VSTEP — kể cả 4 passage trong đề mẫu chính thức.", "62 câu", "#/doc"],
    ["04", "Nghe", "Máy đọc hội thoại 2 giọng trực tiếp trong trình duyệt, không cần file audio.", "25 câu", "#/nghe"],
    ["05", "Viết", "Dàn ý + bài mẫu chuẩn B2. Bộ chấm cục bộ và AI chấm theo 4 tiêu chí VSTEP.", "8 đề", "#/viet"],
    ["06", "Nói", "Ghi âm nhận diện giọng nói, đo tốc độ nói, AI chấm theo rubric, cứu nguy khi bí ý.", "10 đề", "#/noi"],
    ["07", "Chiến thuật", "Cách đoán nghĩa từ ngữ cảnh, phân tích ý đề, mẹo từng phần thi.", "6 kỹ năng", "#/chien-thuat"],
    ["08", "Sổ lỗi", "Mọi câu bạn từng làm sai, xếp sẵn kèm giải thích — ôn đúng chỗ yếu.", "tự động", "#/so-loi"]
  ];
  app.innerHTML = `
  <section class="hero">
    <div>
      <div class="hero__kicker"><span class="tag">VSTEP · B2 PREP DOSSIER · ${todayStr()}</span><span class="rule"></span></div>
      <h1>Luyện B2 như<br><span class="u">vào phòng thi thật</span>.</h1>
      <p class="hero__sub">Đề luyện bám cấu trúc VSTEP 4 kỹ năng, có cả 4 bài đọc &amp; đáp án trong <b>đề mẫu chính thức của Bộ GD&amp;ĐT</b>. Làm bài — xem điểm — soi từng chỗ sai — để AI chấm từng câu văn, câu nói của bạn.</p>
      <div class="hero__cta">
        <a class="btn btn--solid" href="#/thi-thu">VÀO THI THỬ →</a>
        <a class="btn" href="#/ngu-phap">LUYỆN TỪ ĐẦU</a>
      </div>
    </div>
    <div class="sheet score-sheet sheet--pad">
      <div class="score-sheet__title"><span>HỒ SƠ LUYỆN TẬP</span><span>№ 02/ĐT-B2</span></div>
      <div class="score-sheet__row"><span class="k">CÂU ĐÃ LÀM</span><span class="v">${total}<small> câu</small></span></div>
      <div class="score-sheet__row"><span class="k">ĐỘ CHÍNH XÁC</span><span class="v ${all.pct >= 70 ? "v--green" : all.pct > 0 && all.pct < 50 ? "v--red" : ""}">${all.pct || "—"}<small>%</small></span></div>
      <div class="score-sheet__row"><span class="k">CHUỖI NGÀY HỌC</span><span class="v">${streak}<small> ngày</small></span></div>
      <div class="score-sheet__row"><span class="k">TRỢ LÝ AI</span><span class="v ${ai ? "v--green" : ""}" style="font-size:15px">${ai ? "SẴN SÀNG ✓" : "CHƯA CẮM KEY"}</span></div>
      <a class="btn btn--red" style="width:100%;justify-content:center;margin-top:14px" href="#/cai-dat">${ai ? "CÀI ĐẶT AI" : "CẮM API KEY MIỄN PHÍ"}</a>
    </div>
  </section>

  <div class="ticker"><div class="ticker__in">
    ${( '<span><b>60</b> câu ngữ pháp</span><span><b>60</b> câu từ vựng</span><span><b>48</b> flashcard</span><span><b>62</b> câu đọc hiểu</span><span><b>40</b> câu trong đề chính thức</span><span><b>25</b> câu nghe</span><span><b>8</b> đề viết</span><span><b>10</b> đề nói</span><span><b>AI</b> chấm viết &amp; nói</span><span><b>API</b> từ điển + dịch</span>').repeat(2)}
  </div></div>

  <section>
    <div class="section-head"><span class="section-head__no">MỤC LỤC</span><h2>Mô-đun luyện tập</h2><span class="section-head__meta">8 PHẦN</span></div>
    <div class="mods">
      ${modDefs.map(m => `
        <a class="mod" href="${m[4]}">
          <span class="mod__no">PHẦN ${m[0]}<em>${m[3]}</em></span>
          <h3>${m[1]}</h3><p>${m[2]}</p>
          <span class="mod__go">MỞ <span class="arr">→</span></span>
        </a>`).join("")}
    </div>
  </section>

  <section class="exam-band">
    <div>
      <span class="tag">PHÒNG THI SỐ 02 — MÔ PHỎNG</span>
      <h3>Thi thử có <em>bấm giờ, phiếu trả lời</em> và chấm điểm theo thang VSTEP.</h3>
    </div>
    <div class="exam-band__meta">
      <div><b>3</b><span>cỡ đề</span></div>
      <div><b>60'</b><span>tối đa</span></div>
      <div><b>10</b><span>thang điểm</span></div>
    </div>
    <a class="btn btn--paper" href="#/thi-thu">XUẤT PHÍCH →</a>
  </section>

  <section class="dossier">
    <div class="section-head"><span class="section-head__no">HỒ SƠ</span><h2>Sổ điểm của bạn</h2><span class="section-head__meta">${Store.d.days.length} NGÀY HỌC</span></div>
    <div class="dossier__grid">
      <div class="dossier__col">
        <h4 class="tag">ĐỘ CHÍNH XÁC THEO KỸ NĂNG</h4>
        <div class="acc-rows">
          ${[["Ngữ pháp","g"],["Từ vựng","v"],["Đọc hiểu","r"],["Nghe","l"]].map(([name, p]) => {
            const a = Store.accBy(p);
            const w = a.total ? a.pct : 0;
            return `<div class="acc-row"><div class="acc-row__top"><span>${name}</span><span>${a.total ? a.pct + "% (" + a.ok + "/" + a.total + ")" : "chưa có dữ liệu"}</span></div>
              <div class="acc-row__bar"><div class="acc-row__fill ${a.total && a.pct < 50 ? "acc-row__fill--red" : ""}" style="width:${w}%"></div></div></div>`;
          }).join("")}
        </div>
      </div>
      <div class="dossier__col">
        <h4 class="tag">LỊCH SỬ THI THỬ</h4>
        <div class="hist">
          ${Store.d.mocks.length ? Store.d.mocks.slice(0, 6).map(m => `
            <div class="hist-row"><span class="d">${m.date}</span><span class="m">${esc(m.label)}</span><span class="m">${m.timeUsed}</span>
            <span class="pct ${m.pct >= 60 ? "ok" : "no"}">${m.score}/10</span></div>`).join("")
          : '<p class="hist-empty">Chưa có kỳ thi thử nào — phòng thi số 02 đang chờ bạn.</p>'}
        </div>
      </div>
    </div>
  </section>`;
}

/* ================= NGỮ PHÁP ================= */
function viewGrammar(){
  const topics = [...new Set(GRAMMAR.map(q => q.topic))];
  let filter = "all";
  app.innerHTML = moduleHead("01", "Ngữ pháp &amp; cấu trúc",
    "12 chủ đề điểm rơi của VSTEP B2. Chọn đáp án là chấm ngay, kèm giải thích chi tiết — câu nào sai sẽ tự vào Sổ lỗi.",
    "60 CÂU") + `
    <div class="topic-bar" id="topicBar">
      <button class="chip on" data-t="all">TẤT CẢ <span class="n">${GRAMMAR.length}</span></button>
      ${topics.map(t => `<button class="chip" data-t="${esc(t)}">${esc(t).toUpperCase()} <span class="n">${GRAMMAR.filter(q => q.topic === t).length}</span></button>`).join("")}
    </div>
    <div class="quiz-layout"><div class="quiz-main" id="quizMount"></div></div>`;
  const mount = $("#quizMount");
  const render = () => {
    const items = (filter === "all" ? GRAMMAR : GRAMMAR.filter(q => q.topic === filter))
      .map(q => ({ id: q.id, q: esc(q.q), opts: q.opts.map(esc), a: q.a, ex: q.ex, tag: esc(q.topic) }));
    mountQuiz(mount, { items });
  };
  $$("#topicBar .chip").forEach(c => c.onclick = () => {
    $$("#topicBar .chip").forEach(x => x.classList.remove("on"));
    c.classList.add("on"); filter = c.dataset.t; render();
  });
  render();
}

/* ================= TỪ VỰNG ================= */
function viewVocab(tab){
  tab = tab || "quiz";
  app.innerHTML = moduleHead("02", "Từ vựng B2",
    "Collocation, phrasal verbs, chọn từ và từ vựng theo 6 chủ đề thi hay gặp. Có thêm bộ flashcard lặp lại cho từ khó.",
    "60 CÂU + 48 THẺ") + `
    <div class="topic-bar">
      <button class="chip ${tab === "quiz" ? "on" : ""}" data-tab="quiz">LUYỆN ĐỀ</button>
      <button class="chip ${tab === "cards" ? "on" : ""}" data-tab="cards">FLASHCARD</button>
      <span class="mono" style="font-size:10px;color:var(--ink-3);align-self:center;margin-left:6px">NHẤP ĐÚP CHUỘT VÀO TỪ BẤT KỲ ĐỂ TRA TỪ ĐIỂN</span>
    </div>
    <div id="vocabBody"></div>`;
  $$(".chip[data-tab]").forEach(c => c.onclick = () => { location.hash = "#/tu-vung"; viewVocab(c.dataset.tab); $$(".chip[data-tab]").forEach(x => x.classList.toggle("on", x === c)); });
  if(tab === "quiz") vocabQuiz(); else vocabCards();
}
function vocabQuiz(){
  const sets = [...new Set(VOCAB.map(q => q.set))];
  let filter = "all";
  $("#vocabBody").innerHTML = `
    <div class="topic-bar" id="setBar">
      <button class="chip on" data-t="all">TẤT CẢ <span class="n">${VOCAB.length}</span></button>
      ${sets.map(s => `<button class="chip" data-t="${esc(s)}">${esc(s).toUpperCase()} <span class="n">${VOCAB.filter(q => q.set === s).length}</span></button>`).join("")}
    </div>
    <div class="quiz-layout"><div class="quiz-main" id="quizMount"></div></div>`;
  const mount = $("#quizMount");
  const render = () => mountQuiz(mount, { items: (filter === "all" ? VOCAB : VOCAB.filter(q => q.set === filter))
    .map(q => ({ id: q.id, q: esc(q.q), opts: q.opts.map(esc), a: q.a, ex: q.ex, tag: esc(q.set) })) });
  $$("#setBar .chip").forEach(c => c.onclick = () => {
    $$("#setBar .chip").forEach(x => x.classList.remove("on"));
    c.classList.add("on"); filter = c.dataset.t; render();
  });
  render();
}
function vocabCards(){
  let deck = CARDS.slice();
  let i = 0, flipped = false;
  const boxOf = c => (Store.d.cards[c.id] || {}).box || 1;
  const render = () => {
    const c = deck[i];
    const known = Object.keys(Store.d.cards).length;
    $("#vocabBody").innerHTML = `
      <div class="fc-stage">
        <div class="fc-card" id="fcCard">
          <span class="fc-side mono">${flipped ? "MẶT SAU" : "MẶT TRƯỚC"} · THẺ ${i + 1}/${deck.length}</span>
          ${flipped
            ? `<div><div class="fc-vi">${esc(c.vi)}</div><div class="fc-en">“${esc(c.en)}”</div></div>`
            : `<div><div class="fc-word">${esc(c.word)}</div><div class="fc-pos mono">${esc(c.pos)} · hộp ${boxOf(c)}/3</div></div>`}
        </div>
      </div>
      <div class="fc-controls">
        <button class="btn btn--ghost" id="fcPrev">← TRƯỚC</button>
        <button class="btn btn--solid" id="fcFlip">${flipped ? "QUAY LẠI" : "LẬT THẺ"}</button>
        ${flipped ? `<button class="btn btn--red" id="fcNo">CHƯA NHỚ</button><button class="btn" id="fcYes" style="border-color:var(--green);color:var(--green)">ĐÃ NHỚ ↑ HỘP</button>` : ""}
        <button class="btn btn--ghost" id="fcAudio">🔊 LOA</button>
      </div>
      <p class="fc-count">HỌC BÀI: ${known}/${CARDS.length} THẺ ĐÃ GẶP · NGUYÊN TẮC: “CHƯA NHỚ” ĐẨY THẺ VỀ HỘP 1, “ĐÃ NHỚ” TĂNG HỘP</p>`;
    $("#fcCard").onclick = () => { flipped = !flipped; render(); };
    $("#fcPrev").onclick = () => { i = (i - 1 + deck.length) % deck.length; flipped = false; render(); };
    $("#fcFlip").onclick = () => { flipped = !flipped; render(); };
    $("#fcAudio").onclick = () => {
      fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(c.word))
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(j => { const a = (j[0].phonetics || []).map(p => p.audio).filter(Boolean)[0]; if(a) new Audio(a).play(); else TTS.speak([{v:0,t:c.word}]); })
        .catch(() => TTS.speak([{v:0,t:c.word}]));
    };
    if($("#fcYes")) $("#fcYes").onclick = () => { Store.d.cards[c.id] = { box: Math.min(3, boxOf(c) + 1), at: Date.now() }; Store.save(); i = (i + 1) % deck.length; flipped = false; render(); };
    if($("#fcNo")) $("#fcNo").onclick = () => { Store.d.cards[c.id] = { box: 1, at: Date.now() }; Store.save(); i = (i + 1) % deck.length; flipped = false; render(); };
  };
  render();
}

/* ================= ĐỌC HIỂU ================= */
function viewReading(part){
  part = part || "p1";
  app.innerHTML = moduleHead("03", "Đọc hiểu",
    "Bốn phần đúng format VSTEP Reading. Phần 4 là 4 bài đọc trong <b>đề mẫu chính thức</b> kèm đáp án gốc và bảng quy đổi điểm.",
    "62 CÂU · 60 PHÚT KHI THI") + `
    <div class="topic-bar">
      <button class="chip ${part === "p1" ? "on" : ""}" data-p="p1">P1 · THÔNG BÁO NGẮN</button>
      <button class="chip ${part === "p2" ? "on" : ""}" data-p="p2">P2 · ĐỐI CHIẾU CHI TIẾT</button>
      <button class="chip ${part === "p3" ? "on" : ""}" data-p="p3">P3 · ĐIỀN CÂU</button>
      <button class="chip ${part === "p4" ? "on" : ""}" data-p="p4">P4 · ĐỀ CHÍNH THỨC (40 CÂU)</button>
    </div>
    <div id="readBody"></div>`;
  $$(".chip[data-p]").forEach(c => c.onclick = () => {
    $$(".chip[data-p]").forEach(x => x.classList.remove("on")); c.classList.add("on");
    viewReading(c.dataset.p);
  });
  const body = $("#readBody");

  if(part === "p1"){
    body.innerHTML = `<div class="quiz-layout"><div class="quiz-main" id="quizMount"></div></div>`;
    mountQuiz($("#quizMount"), {
      items: READING_P1.map(q => ({ id: q.id, q: esc(q.q), opts: q.opts.map(esc), a: q.a, ex: q.ex, tag: "P1", src: q.src })),
      getPassage: q => `<h3>Notice</h3><span class="src">${esc(READING_P1.find(x => x.id === q.id).src)}</span><div class="passage-body">${esc(READING_P1.find(x => x.id === q.id).passage).replace(/\n/g, "<br>")}</div>`
    });
  }
  else if(part === "p2"){
    body.innerHTML = `
      <div class="sheet passage-panel">
        <h3>Bốn hoạt động cuối tuần</h3><span class="src">Đọc 4 đoạn và chọn đoạn phù hợp với mỗi nhận định</span>
        <div class="p2-texts">${READING_P2_TEXTS.map(t => `
          <div class="p2-text"><b class="mono">ĐOẠN ${t.key}</b> — ${esc(t.title)}<br>${esc(t.body)}</div>`).join("")}
        </div>
      </div>
      <div class="quiz-layout"><div class="quiz-main" id="quizMount"></div></div>`;
    mountQuiz($("#quizMount"), {
      items: READING_P2.map(q => ({ id: q.id, q: esc(q.q), opts: q.opts.map(esc), a: q.a, ex: q.ex, tag: "P2" }))
    });
  }
  else if(part === "p3"){
    body.innerHTML = `
      <div class="sheet passage-panel">
        <h3>${esc(READING_P3_PASSAGE.title)}</h3><span class="src">Chọn câu phù hợp cho mỗi chỗ trống trong bài</span>
        <div class="passage-body">${esc(READING_P3_PASSAGE.body).replace(/__(\(\d+\))__/g, '<span class="blank-no">$1</span>').replace(/\n/g, "<br>")}</div>
      </div>
      <div class="quiz-layout"><div class="quiz-main" id="quizMount"></div></div>`;
    mountQuiz($("#quizMount"), {
      items: READING_P3.map(q => ({ id: q.id, q: esc(q.q), opts: q.opts.map(esc), a: q.a, ex: q.ex, tag: "P3" }))
    });
  }
  else {
    body.innerHTML = `
      <div class="topic-bar" id="psBar">
        ${READING_OFFICIAL.map((p, i) => `<button class="chip ${i === 0 ? "on" : ""}" data-i="${i}">BÀI ${i + 1} · ${esc(p.title.replace("PASSAGE ", "").split(" - ")[1] || "").toUpperCase()}</button>`).join("")}
        <span class="badge-off mono" style="align-self:center">ĐỀ MẪU CHÍNH THỨC · 10 CÂU/ BÀI</span>
      </div>
      <div class="quiz-layout"><div class="quiz-main" id="quizMount"></div></div>`;
    let cur = 0;
    const render = () => {
      const p = READING_OFFICIAL[cur];
      mountQuiz($("#quizMount"), {
        items: p.questions.map(q => {
          const n = q.n, key = READING_OFFICIAL_KEY[String(n)];
          return { id: "ro" + n, q: esc(q.q), opts: q.opts.map(esc), a: LETTERS.indexOf(key), ex: READING_OFFICIAL_EX[String(n)], tag: "P4 · câu " + n + "/40", src: "đề chính thức" };
        }),
        getPassage: () => `<h3>${esc(p.title.replace(/^PASSAGE \d+ - /, ""))}</h3><span class="src">VSTEP SAMPLE TEST (LEVEL 3-5) — ĐỀ MINH HỌA QĐ 730/QĐ-BGDĐT</span><div class="passage-body">${esc(p.body)}</div>`
      });
    };
    $$("#psBar .chip").forEach(c => c.onclick = () => { $$("#psBar .chip").forEach(x => x.classList.remove("on")); c.classList.add("on"); cur = +c.dataset.i; render(); });
    render();
  }
}

/* ================= NGHE ================= */
function viewListening(){
  app.innerHTML = moduleHead("04", "Nghe",
    "Trình duyệt đọc hội thoại bằng hai giọng nam–nữ (Web Speech API), không cần tải audio. Nghe trước — trả lời sau — rồi mở transcript đối chiếu. 8 câu đầu là câu hỏi &amp; đáp án <b>đề mẫu chính thức</b>.",
    "25 CÂU") + `
    <div class="notice" style="margin-bottom:24px"><span class="mono">LƯU Ý</span>
      <span>Tốc độ đọc mặc định 1.0 — đề thật chỉ được nghe <b>một lần</b>, hãy bấm PLAY đúng lúc sẵn sàng. Nếu máy không có giọng tiếng Anh, cài thêm gói ngôn ngữ hoặc dùng Chrome/Edge.</span></div>
    <div id="listenBody"></div>`;
  const body = $("#listenBody");
  LISTENING.forEach(g => {
    const wrap = document.createElement("div");
    wrap.className = "listen-group";
    wrap.innerHTML = `
      <div class="sheet sheet--pad" style="margin-bottom:18px;padding:18px 22px;display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap">
        <div><span class="tag">PART ${g.part} · ${g.qs.length} CÂU</span>
          <div style="font-size:19px;font-weight:700;margin-top:4px">${esc(g.title)} ${g.official ? officialBadge() : ""}</div></div>
        <div style="display:flex;gap:8px;align-items:center">
          <span class="mono" style="font-size:10px;color:var(--ink-3)">TỐC ĐỘ</span>
          <button class="btn btn--sm btn--ghost" data-rate="0.85">0.85×</button>
          <button class="btn btn--sm" data-rate="1">1×</button>
          <button class="btn btn--sm btn--ghost" data-rate="1.15">1.15×</button>
        </div>
      </div>
      <div class="tape" data-gid="${g.gid}">
        <div class="tape__reels"><div class="reel"></div><div class="reel"></div></div>
        <div class="tape__info"><b>MÁY ĐỌC — ${esc(g.title).toUpperCase()}</b><span>bấm play khi đã sẵn sàng · mỗi lần play đọc lại từ đầu</span></div>
        <div class="tape__ctrl">
          <button class="btn btn--tape btn--sm">▶ PLAY</button>
          <button class="btn btn--tape btn--sm">■ STOP</button>
        </div>
      </div>
      <div class="script-box" id="sb-${g.gid}">
        <h5>TRANSCRIPT — chỉ mở sau khi làm xong</h5>
        ${g.script.map(l => `<div class="script-line ${l.v === 2 ? "v2" : l.v === 0 ? "nar" : ""}"><span class="spk">${l.v === 0 ? "»" : l.v === 1 ? "F" : "M"}</span><span>${esc(l.t)}</span></div>`).join("")}
      </div>
      <div class="quiz-layout" style="margin-top:22px"><div class="quiz-main" id="q-${g.gid}"></div></div>`;
    body.appendChild(wrap);
    let rate = 1;
    $$("[data-rate]", wrap).forEach(b => b.onclick = () => { rate = +b.dataset.rate; $$("[data-rate]", wrap).forEach(x => x.classList.remove("btn--solid")); b.classList.add("btn--solid"); });
    const tape = $(".tape", wrap);
    const [playBtn, stopBtn] = $$(".tape__ctrl .btn", wrap);
    playBtn.onclick = () => {
      TTS.speak(g.script, { rate, onEnd: () => tape.classList.remove("playing") });
      tape.classList.add("playing");
    };
    stopBtn.onclick = () => { TTS.stop(); tape.classList.remove("playing"); };
    mountQuiz($("#q-" + g.gid), {
      items: g.qs.map(q => ({ id: q.id, q: esc(q.q), opts: q.opts.map(esc), a: q.a, ex: q.ex, tag: "PART " + g.part }))
    });
    /* nút mở transcript chèn sau khi mountQuiz render */
    const obs = new MutationObserver(() => {
      if($("#q-" + g.gid).innerHTML && !$("#tbtn-" + g.gid)){
        const btn = document.createElement("button");
        btn.className = "btn btn--ghost"; btn.id = "tbtn-" + g.gid;
        btn.textContent = "MỞ TRANSCRIPT";
        btn.onclick = () => { const sb = $("#sb-" + g.gid); sb.classList.toggle("open"); btn.textContent = sb.classList.contains("open") ? "ĐÓNG TRANSCRIPT" : "MỞ TRANSCRIPT"; };
        $("#q-" + g.gid).after(btn);
        obs.disconnect();
      }
    });
    obs.observe($("#q-" + g.gid), { childList: true });
  });
}

/* ================= VIẾT ================= */
function viewWriting(sel){
  sel = sel || 0;
  const t = WRITING[sel];
  app.innerHTML = moduleHead("05", "Viết",
    "Chọn đề — gõ bài ngay trên giấy kẻ dòng. Bộ chấm cục bộ soi cấu trúc, từ nối, từ lặp; cắm API key để AI chấm chi tiết theo 4 tiêu chí VSTEP.",
    "8 ĐỀ · 60 PHÚT") + `
    <div class="wtask-picker" id="wPicker">
      ${WRITING.map((w, i) => `
        <button class="wtask ${i === sel ? "on" : ""}" data-i="${i}">
          <span class="t">TASK ${w.task} · ${w.time}' ${w.official ? "· ĐỀ CHÍNH THỨC" : ""}</span>
          <b>${esc(w.type)}</b>
          <span class="mono" style="font-size:10px;color:var(--ink-3)">${w.official ? "VSTEP SAMPLE TEST" : "TỰ BIÊN"}</span>
        </button>`).join("")}
    </div>
    <div class="write-layout">
      <div class="sheet write-paper">
        <div style="padding:20px 24px 0">
          <span class="tag">ĐỀ BÀI — TASK ${t.task} (${t.time} PHÚT · ≥${t.target} TỪ)</span>
          <div class="prompt-box">${esc(t.prompt).replace(/\n/g, "<br>")}</div>
        </div>
        <textarea id="wArea" placeholder="Bắt đầu viết vào đây…"></textarea>
        <div class="write-tools">
          <span class="wordmeter" id="wMeter"><b>0</b> / ≥${t.target} từ</span>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn btn--sm btn--ghost" id="wTimerBtn">⏱ BẮT ĐẦU ĐẾM ${t.time}'</button>
            <button class="btn btn--sm" id="wLocal">SOI BÀI (CỤC BỘ)</button>
            <button class="btn btn--sm btn--red" id="wAI">AI CHẤM THEO RUBRIC</button>
          </div>
        </div>
        <div id="wReport" style="padding:0 24px 24px"></div>
      </div>
      <div class="sheet sheet--pad">
        <h4 class="tag">CHECKLIST TỰ KIỂM</h4>
        <ul class="checklist" id="wCheck">${t.checklist.map(c => `<li><span class="box">✓</span><span>${esc(c)}</span></li>`).join("")}</ul>
        <hr class="hr-dash">
        <h4 class="tag">CỤM TỪ NÊN DÙNG</h4>
        <ul class="phrases">${t.phrases.map(p => `<li>– <i>${esc(p)}</i></li>`).join("")}</ul>
        <hr class="hr-dash">
        <div class="sample" id="wSample">
          <h5>BÀI MẪU ${t.official ? "(VIẾT THEO ĐỀ CHÍNH THỨC)" : ""} — CHỈ MỞ KHI LÀM XONG</h5>
          <div class="body">${esc(t.model).replace(/\n/g, "<br>")}</div>
          <div class="wc mono">${countWords(t.model)} TỪ</div>
        </div>
        <button class="btn btn--ghost" id="wSampleBtn" style="margin-top:14px">MỞ BÀI MẪU</button>
      </div>
    </div>`;
  $$("#wPicker .wtask").forEach(b => b.onclick = () => { $$("#wPicker .wtask").forEach(x => x.classList.remove("on")); b.classList.add("on"); viewWriting(+b.dataset.i); });
  $$("#wCheck li").forEach(li => li.onclick = () => li.classList.toggle("done"));
  const area = $("#wArea");
  const meter = $("#wMeter");
  const upd = () => {
    const n = countWords(area.value);
    meter.innerHTML = `<b>${n}</b> / ≥${t.target} từ`;
    meter.classList.toggle("hit", n >= t.target);
  };
  area.oninput = upd; upd();
  $("#wSampleBtn").onclick = () => { $("#wSample").classList.toggle("open"); };
  /* timer */
  let timerInt = null, left = t.time * 60;
  $("#wTimerBtn").onclick = () => {
    if(timerInt){ clearInterval(timerInt); timerInt = null; $("#wTimerBtn").textContent = "⏱ BẮT ĐẦU ĐẾM " + t.time + "'"; return; }
    $("#wTimerBtn").textContent = "⏸ TẠM DỪNG — CÒN " + fmtTime(left);
    timerInt = setInterval(() => {
      left--;
      $("#wTimerBtn").textContent = "⏸ TẠM DỪNG — CÒN " + fmtTime(left);
      if(left <= 0){ clearInterval(timerInt); timerInt = null; $("#wTimerBtn").textContent = "HẾT GIỜ — NỘP BÀI!"; }
    }, 1000);
  };
  /* chấm cục bộ */
  $("#wLocal").onclick = () => {
    const text = area.value.trim();
    if(countWords(text) < 20){ $("#wReport").innerHTML = '<div class="notice"><span>Viết ít nhất 20 từ để máy soi được nhé.</span></div>'; return; }
    const r = LocalAnalyzer.writing(text, t);
    $("#wReport").innerHTML = `
      <div class="ai-report">
        <h4 class="tag">BÁO CÁO CỤC BỘ — KHÔNG CẦN INTERNET</h4>
        <table class="mini-table">${r.metrics.map(m => `<tr><td>${m[0]}</td><td>${m[1]}</td></tr>`).join("")}</table>
        <ul class="tips">${r.tips.map(x => `<li>${x}</li>`).join("")}</ul>
      </div>`;
  };
  /* AI chấm */
  $("#wAI").onclick = async () => {
    const text = area.value.trim();
    if(countWords(text) < 30){ $("#wReport").innerHTML = '<div class="notice"><span>AI cần bài viết tối thiểu 30 từ để chấm có ý nghĩa.</span></div>'; return; }
    if(!AI.available()){
      $("#wReport").innerHTML = `<div class="notice"><span class="mono">CHƯA CÓ API KEY</span><span>Đang dùng báo cáo cục bộ. Để AI chấm chi tiết theo 4 tiêu chí VSTEP, cắm key miễn phí (Gemini) tại <a href="#/cai-dat"><b>trang Cài đặt</b></a> — 1 phút là xong.</span></div>`;
      return;
    }
    $("#wReport").innerHTML = '<div class="ai-report"><h4 class="tag">GIÁM KHẢO AI ĐANG CHẤM…</h4><p class="mono" style="font-size:11px">đang gửi bài + rubric VSTEP tới ' + esc((AI.cfg().provider || "gemini")) + '</p></div>';
    try{
      const out = await AI.gradeWriting(t, text);
      $("#wReport").innerHTML = `<div class="ai-report"><h4 class="tag">PHÉP CHẤM CỦA GIÁM KHẢO AI — 4 TIÊU CHÍ VSTEP</h4><div class="ai-md">${mdLite(out)}</div></div>`;
    }catch(e){
      $("#wReport").innerHTML = `<div class="notice"><span class="mono">LỖI AI</span><span>${esc(e.message)}</span></div>`;
    }
  };
}

/* ================= NÓI ================= */
function viewSpeaking(part){
  part = part || "p1";
  app.innerHTML = moduleHead("06", "Nói",
    "Bấm ghi âm — trình duyệt nhận diện giọng nói (Web Speech API), đo tốc độ &amp; từ đệm, sau đó gửi transcript cho AI chấm theo rubric VSTEP. Bí ý? Bấm “GỌI AI SINH Ý”.",
    "10 ĐỀ + 6 CHIẾN THUẬT") + `
    <div class="topic-bar">
      ${[["p1","P1 · HỎI ĐÁP XÃ GIAO (3')"],["p2","P2 · BÀN GIẢI PHÁP (4')"],["p3","P3 · PHÁT TRIỂN CHỦ ĐỀ (5')"],["rescue","CỨU NGUY KHI BÍ Ý"]].map(([k, l]) => `<button class="chip ${part === k ? "on" : ""}" data-p="${k}">${l}</button>`).join("")}
    </div>
    <div id="speakBody"></div>`;
  $$(".chip[data-p]").forEach(c => c.onclick = () => { $$(".chip[data-p]").forEach(x => x.classList.remove("on")); c.classList.add("on"); viewSpeaking(c.dataset.p); });
  const body = $("#speakBody");

  if(part === "rescue"){
    body.innerHTML = `
      <div class="sheet sheet--pad">
        <div class="tag" style="color:var(--red)">SỐ CỨU THƯỜNG TRỰC — 6 TÌNH HUỐNG 0 ĐIỂM ĐÃ ĐƯỢC XỬ LÝ</div>
        <h2 style="font-size:26px;margin:8px 0 4px">Không bao giờ ngồi im.</h2>
        <p style="color:var(--ink-2)">Im lặng là cách duy nhất chắc chắn mất điểm fluency. Mọi tình huống dưới đây đều có thể “lấp” bằng ngôn ngữ.</p>
      </div>
      <div class="rescue-grid" style="margin-top:18px">
      ${SPEAKING_RESCUE.map(r => `
        <div class="sheet sheet--pad rescue-card">
          <span class="tag" style="color:var(--red)">TÌNH HUỐNG</span>
          <h4>${esc(r.when)}</h4>
          <p>${esc(r.how)}</p>
          <div class="rescue-phrase mono">“${esc(r.phrase)}”</div>
        </div>`).join("")}
      </div>`;
    return;
  }

  const ITEMS = part === "p1" ? SPEAKING_P1 : part === "p2" ? SPEAKING_P2 : SPEAKING_P3;
  let cur = 0;
  const renderOne = () => {
    const it = ITEMS[cur];
    const mapHtml = it.mindmap ? `
      <div class="mindmap sheet sheet--pad">
        <span class="tag">SƠ ĐỒ TƯ DUY TRÊN ĐỀ — NÓI BÁM 3 NHÁNH + TỰ THÊM NHÁNH THỨ 4</span>
        <div class="mindmap__wrap">
          <div class="mindmap__center mono">${esc(it.mindmap.center).toUpperCase()}</div>
          <div class="mindmap__branches">${it.mindmap.branches.map(b => `<div class="mindmap__branch">${esc(b)}</div>`).join("")}</div>
        </div>
      </div>` : "";
    const followHtml = it.followups ? `<div class="tag" style="margin:14px 0 6px">GIÁM KHẢO SẼ HỎI THÊM</div><ul class="phrases">${it.followups.map(f => `<li>– <i>${esc(f)}</i></li>`).join("")}</ul>` : "";
    const pointsHtml = it.points ? `<ul class="checklist">${it.points.map(p => `<li><span class="box">→</span><span>${esc(p)}</span></li>`).join("")}</ul>` : "";
    const qsHtml = it.questions ? `<ul class="phrases">${it.questions.map(q => `<li>– <i>${esc(q)}</i></li>`).join("")}</ul>` : "";

    body.innerHTML = `
      <div class="topic-bar" id="spBar">
        ${ITEMS.map((x, i) => `<button class="chip ${i === cur ? "on" : ""}" data-i="${i}">${esc(x.topic).toUpperCase()}${x.official ? " ★" : ""}</button>`).join("")}
        <span class="mono" style="font-size:10px;color:var(--ink-3);align-self:center">★ = ĐỀ CHÍNH THỨC</span>
      </div>
      <div class="speak-layout">
        <div>
          <div class="sheet cue-card">
            <span class="lbl">PART ${part === "p1" ? "1 · SOCIAL INTERACTION" : part === "p2" ? "2 · SOLUTION DISCUSSION" : "3 · TOPIC DEVELOPMENT"}</span>
            <h3>${esc(it.topic)} ${it.official ? officialBadge() : ""}</h3>
            ${it.situation ? `<p style="margin-bottom:12px"><b>Tình huống:</b> ${esc(it.situation)}</p>` : ""}
            ${qsHtml}${pointsHtml}${mapHtml}${followHtml}
          </div>
          ${part === "p2" ? `<div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
            <button class="btn btn--red" id="spRescue">BÍ Ý → GỌI AI SINH Ý</button>
            <button class="btn btn--ghost" id="spPrep">⏱ CHUẨN BỊ 60 GIÂY</button></div>` : ""}
        </div>
        <div>
          <div class="sheet rec-panel" id="recPanel">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
              <span class="tag"><span class="rec-dot"></span>GIÂM + NHẬN DIỆN GIỌNG NÓI</span>
              <span class="rec-time mono" id="recTime">00:00</span>
            </div>
            ${STT.supported ? `
              <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">
                <button class="btn btn--red" id="recStart">● BẮT ĐẦU NÓI</button>
                <button class="btn btn--ghost" id="recStop">■ DỪNG &amp; PHÂN TÍCH</button>
              </div>
              <div class="stt-box" id="sttBox">Transcript sẽ hiện tại đây khi bạn nói. Nói tự nhiên như trong phòng thi — ngôn ngữ: en-US.</div>
              <div id="recReport"></div>`
            : `<div class="notice" style="margin-top:12px"><span class="mono">TRÌNH DUYỆT KHÔNG HỖ TRỢ</span><span>Nhận diện giọng nói cần Chrome hoặc Edge. Bạn vẫn có thể tập nói theo câu mẫu bên dưới và tự bấm giờ.</span></div>`}
          </div>
          <div class="sheet sheet--pad" style="margin-top:18px">
            <div style="display:flex;justify-content:space-between;align-items:baseline">
              <h4 class="tag" style="margin:0">CÂU TRẢ LỜI MẪU B2</h4>
              <button class="btn btn--sm btn--ghost" id="spSampleBtn">MỞ / ĐÓNG</button>
            </div>
            <div class="sample" id="spSample" style="display:none;margin-top:12px">
              <div class="body">${esc(it.sample).replace(/\n/g, "<br>")}</div>
            </div>
            <div class="notice" style="margin-top:14px"><span class="mono">MẸO GIÁM KHẢO</span><span>${esc(it.tip)}</span></div>
          </div>
        </div>
      </div>`;
    $$("#spBar .chip").forEach(c => c.onclick = () => { if(recRunning) stopRec(true); cur = +c.dataset.i; renderOne(); });
    $("#spSampleBtn").onclick = () => { const s = $("#spSample"); s.style.display = s.style.display === "none" ? "block" : "none"; };
    if($("#spPrep")) $("#spPrep").onclick = () => {
      let s = 60; const b = $("#spPrep");
      b.textContent = "ĐANG CHUẨN BỊ: 01:00"; b.disabled = true;
      const iv = setInterval(() => { s--; b.textContent = "ĐANG CHUẨN BỊ: " + fmtTime(s); if(s <= 0){ clearInterval(iv); b.textContent = "HẾT 60 GIÂY — BẮT ĐẦU NÓI!"; b.disabled = false; TTS.speak([{v:0,t:"Time is up. Please begin."}]); } }, 1000);
    };
    if($("#spRescue")) $("#spRescue").onclick = async () => {
      const mount = $("#recReport");
      if(!AI.available()){ mount.innerHTML = '<div class="notice"><span class="mono">CẦN API KEY</span><span>Sinh ý tự động cần AI — cắm key miễn phí ở <a href="#/cai-dat"><b>Cài đặt</b></a>. Tạm thời dùng 6 chiến thuật “Cứu nguy khi bí ý” ở thẻ bên trên.</span></div>'; return; }
      mount.innerHTML = '<div class="ai-report"><h4 class="tag">AI ĐANG SINH Ý…</h4></div>';
      try{
        const out = await AI.rescueIdeas(it.topic, part === "p2" ? 2 : part === "p3" ? 3 : 1);
        mount.innerHTML = `<div class="ai-report"><h4 class="tag">Ý TƯỞNG TỪ AI — CHỦ ĐỀ: ${esc(it.topic).toUpperCase()}</h4><div class="ai-md">${mdLite(out)}</div></div>`;
      }catch(e){ mount.innerHTML = `<div class="notice"><span class="mono">LỖI AI</span><span>${esc(e.message)}</span></div>`; }
    };

    /* ghi âm */
    let t0 = 0, timerInt = null;
    window.recRunning = false;
    const timeEl = $("#recTime"), box = $("#sttBox"), panel = $("#recPanel"), report = $("#recReport");
    function startRec(){
      recRunning = true; t0 = Date.now();
      panel.classList.add("recording");
      timerInt = setInterval(() => { timeEl.textContent = fmtTime((Date.now() - t0) / 1000); }, 250);
      STT.start((fin, inter) => { box.innerHTML = esc(fin) + '<i style="color:var(--ink-3)"> ' + esc(inter) + "</i>"; box.scrollTop = box.scrollHeight; });
    }
    function stopRec(silent){
      recRunning = false;
      clearInterval(timerInt);
      panel.classList.remove("recording");
      const dur = (Date.now() - t0) / 1000;
      const text = STT.stop();
      if(silent) return;
      const m = LocalAnalyzer.speaking(text, dur);
      report.innerHTML = `
        <div class="ai-report">
          <h4 class="tag">CHỈ SỐ TỰ ĐO — ${fmtTime(dur)} NGHE ĐƯỢC</h4>
          <table class="mini-table">
            <tr><td>Tốc độ</td><td>${m.wpm} từ/phút (B2 tốt: 100–150)</td></tr>
            <tr><td>Tổng từ</td><td>${m.words}</td></tr>
            <tr><td>Từ đệm</td><td>${m.fillers}</td></tr>
            <tr><td>Từ nối</td><td>${m.conn} loại</td></tr>
          </table>
          <ul class="tips">${m.tips.map(x => `<li>${x}</li>`).join("")}</ul>
          ${AI.available() ? '<button class="btn btn--red btn--sm" id="spAI" style="margin-top:8px">GỬI CHO GIÁM KHẢO AI CHẤM THEO RUBRIC VSTEP →</button>' : '<p class="mono" style="font-size:10.5px;color:var(--ink-3);margin-top:8px">Cắm API key ở Cài đặt để AI chấm chi tiết transcript này.</p>'}
        </div>`;
      const aiBtn = $("#spAI");
      if(aiBtn) aiBtn.onclick = async () => {
        aiBtn.disabled = true; aiBtn.textContent = "GIÁM KHẢO AI ĐANG NGHE LẠI…";
        try{
          const out = await AI.gradeSpeaking({ topic: it.topic, part: part === "p1" ? 1 : part === "p2" ? 2 : 3, situation: it.situation, mindmap: it.mindmap, followups: it.followups, questions: it.questions }, text, m);
          report.insertAdjacentHTML("beforeend", `<div class="ai-report" style="margin-top:10px"><h4 class="tag">PHÉP CHẤM CỦA GIÁM KHẢO AI</h4><div class="ai-md">${mdLite(out)}</div></div>`);
          aiBtn.textContent = "GỬI LẠI CHO AI CHẤM →"; aiBtn.disabled = false;
        }catch(e){
          report.insertAdjacentHTML("beforeend", `<div class="notice" style="margin-top:8px"><span class="mono">LỖI AI</span><span>${esc(e.message)}</span></div>`);
          aiBtn.textContent = "THỬ LẠI →"; aiBtn.disabled = false;
        }
      };
    }
    if(STT.supported){
      $("#recStart").onclick = startRec;
      $("#recStop").onclick = () => stopRec(false);
    }
  };
  renderOne();
}

/* ================= THI THỬ ================= */
function viewMock(){
  app.innerHTML = moduleHead("07", "Phòng thi số 02 — Thi thử",
    "Bấm giờ đúng luật, phiếu trả lời kiểu chấm bài, nộp bài là chấm ngay theo thang 10 của VSTEP (bảng quy đổi từ đề chính thức). Mọi câu sai tự vào Sổ lỗi.",
    "3 CỠ ĐỀ");
  app.insertAdjacentHTML("beforeend", `
    <div class="mock-cards">
      <button class="mock-opt" data-mode="quick">
        <span class="t">ĐỀ NHANH</span><h3>20 câu · 20 phút</h3>
        <p>Ngữ pháp + từ vựng + đọc phần 1. Đủ để đo nhiệt trước khi học mỗi ngày.</p>
        <span class="meta">TRẮC NGHIỆM · CHẤM NGAY</span>
      </button>
      <button class="mock-opt" data-mode="standard">
        <span class="t">ĐỀ CHUẨN</span><h3>50 câu · 60 phút</h3>
        <p>10 ngữ pháp + 10 từ vựng + 10 đọc tự biên + 20 câu trong 2 bài đọc đề chính thức.</p>
        <span class="meta">MÔ PHỎNG ĐỀ THẬT</span>
      </button>
      <button class="mock-opt" data-mode="reading">
        <span class="t">ĐỀ ĐỌC CHÍNH THỨC</span><h3>40 câu · 60 phút</h3>
        <p>Toàn bộ 4 passage của VSTEP Sample Test (Level 3-5) kèm đáp án gốc — đúng như phòng thi.</p>
        <span class="meta">READING PAPER</span>
      </button>
    </div>
    <p class="mono" style="font-size:10.5px;color:var(--ink-3);margin-top:14px">ĐIỂM ≥ 6.0/10 ĐƯỢC DẤN “ĐẠT B2” — theo ngưỡng tham khảo của VSTEP B2 Reading.</p>`);

  $$(".mock-opt").forEach(b => b.onclick = () => runMock(b.dataset.mode));
}

function buildMockItems(mode){
  const g = q => ({ id: q.id, section: "Ngữ pháp", q: esc(q.q), opts: q.opts.map(esc), a: q.a, ex: q.ex });
  const v = q => ({ id: q.id, section: "Từ vựng", q: esc(q.q), opts: q.opts.map(esc), a: q.a, ex: q.ex });
  const r = (q, part) => ({ id: q.id, section: "Đọc hiểu", q: esc(q.q), opts: q.opts.map(esc), a: q.a, ex: q.ex, tag: part });
  const off = p => p.questions.map(q => {
    const n = q.n, key = READING_OFFICIAL_KEY[String(n)];
    return { id: "ro" + n, section: "Đọc hiểu (đề chính thức)", q: esc(q.q), opts: q.opts.map(esc), a: LETTERS.indexOf(key), ex: READING_OFFICIAL_EX[String(n)], passage: p, tag: "bài đọc " + (READING_OFFICIAL.indexOf(p) + 1) };
  });
  if(mode === "quick"){
    return { label: "Đề nhanh 20 câu", secs: 20 * 60,
      items: [...pickN(GRAMMAR, 5).map(g), ...pickN(VOCAB, 5).map(v), ...pickN(READING_P1, 6).map(q => r(q, "P1")), ...pickN(READING_P2, 4).map(q => r(q, "P2"))] };
  }
  if(mode === "standard"){
    const twoPassages = pickN(READING_OFFICIAL, 2);
    return { label: "Đề chuẩn 50 câu", secs: 60 * 60,
      items: [...pickN(GRAMMAR, 10).map(g), ...pickN(VOCAB, 10).map(v),
        ...pickN(READING_P1, 4).map(q => r(q, "P1")), ...pickN(READING_P2, 3).map(q => r(q, "P2")), ...READING_P3.slice(0, 3).map(q => r(q, "P3")),
        ...off(twoPassages[0]), ...off(twoPassages[1])] };
  }
  return { label: "Đề đọc chính thức 40 câu", secs: 60 * 60, items: READING_OFFICIAL.flatMap(off) };
}

function runMock(mode){
  const { label, secs, items } = buildMockItems(mode);
  const picks = new Array(items.length).fill(undefined);
  const flags = new Array(items.length).fill(false);
  let idx = 0, left = secs, timerInt = null, submitted = false;

  app.innerHTML = `
    <div class="exam-head sheet" style="padding:18px 24px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:24px">
      <div><span class="tag">PHÒNG THI SỐ 02 · ${esc(label).toUpperCase()}</span>
        <div class="timer" style="margin-top:6px"><span class="mono" style="font-size:11px;color:var(--ink-2)">CÒN LẠI</span> <span class="t" id="mTimer">${fmtTime(left)}</span></div>
        <div class="timer-bar" style="width:220px"><i id="mTimerBar" style="width:100%"></i></div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <span class="mono" style="font-size:11px;color:var(--ink-2);align-self:center" id="mProg">0/${items.length} đã trả lời</span>
        <button class="btn btn--red" id="mSubmit">NỘP BÀI</button>
      </div>
    </div>
    <div class="quiz-layout">
      <div class="quiz-main" id="mBody"></div>
      <aside class="quiz-side">
        <div class="side-block"><h4>PHIẾU TRẢ LỜI</h4><div class="grid-q" id="mGrid"></div></div>
        <div class="side-block"><h4>KÝ HIỆU</h4>
          <p class="mono" style="font-size:10px;color:var(--ink-2);line-height:2">
          ■ đen = đã trả lời · ⚑ viền vàng = đánh dấu xem lại<br>viền đỏ = câu hiện tại</p>
        </div>
      </aside>
    </div>`;

  const timerEl = $("#mTimer"), barEl = $("#mTimerBar");
  timerInt = setInterval(() => {
    left--;
    timerEl.textContent = fmtTime(left);
    barEl.style.width = (left / secs * 100) + "%";
    if(left <= 300) timerEl.classList.add("warn");
    if(left <= 0){ clearInterval(timerInt); if(!submitted) submit(true); }
  }, 1000);

  const grid = $("#mGrid");
  items.forEach((_, i) => {
    const b = document.createElement("button");
    b.className = "gq"; b.textContent = i + 1;
    b.onclick = () => { idx = i; renderQ(); };
    grid.appendChild(b);
  });
  const paintGrid = () => {
    $$(".gq", grid).forEach((b, i) => {
      b.classList.toggle("ans", picks[i] !== undefined);
      b.classList.toggle("flag", flags[i]);
      b.classList.toggle("cur", i === idx);
    });
    $("#mProg").textContent = picks.filter(p => p !== undefined).length + "/" + items.length + " đã trả lời";
  };

  function renderQ(){
    const q = items[idx];
    $("#mBody").innerHTML = `
      ${q.passage ? `<div class="sheet passage-panel"><h3>${esc(q.passage.title.replace(/^PASSAGE \d+ - /, ""))}</h3><span class="src">VSTEP SAMPLE TEST — bấm để thu gọn/ mở</span><div class="passage-body" style="max-height:340px;overflow:auto">${esc(q.passage.body)}</div></div>` : ""}
      <div class="sheet q-card sheet--pad">
        <div class="q-card__top">
          <span class="q-card__no">CÂU ${idx + 1}/${items.length}<em>${esc(q.section)}${q.tag ? " · " + esc(q.tag) : ""}</em></span>
          <button class="q-card__flag ${flags[idx] ? "on" : ""}" id="mFlag">⚑ XEM LẠI</button>
        </div>
        <div class="q-card__text">${q.q}</div>
        <div class="opts" id="mOpts">
          ${q.opts.map((o, i) => `<button class="opt ${picks[idx] === i ? "sel" : ""}" data-i="${i}"><span class="key">${LETTERS[i]}</span><span>${o}</span></button>`).join("")}
        </div>
        <div class="q-nav">
          <button class="btn btn--ghost" id="mPrev" ${idx === 0 ? "disabled" : ""}>← TRƯỚC</button>
          <span class="q-nav__mid">${idx === items.length - 1 ? "CÂU CUỐI — KIỂM TRA PHIẾU RỒI NỘP" : ""}</span>
          <button class="btn" id="mNext" ${idx === items.length - 1 ? "disabled" : ""}>TIẾP →</button>
        </div>
      </div>`;
    $("#mFlag").onclick = () => { flags[idx] = !flags[idx]; renderQ(); paintGrid(); };
    $$("#mOpts .opt").forEach(el => el.onclick = () => {
      picks[idx] = +el.dataset.i;
      $$("#mOpts .opt").forEach(x => x.classList.remove("sel"));
      el.classList.add("sel");
      paintGrid();
      setTimeout(() => { if(idx < items.length - 1){ idx++; renderQ(); paintGrid(); } }, 220);
    });
    $("#mPrev").onclick = () => { idx--; renderQ(); paintGrid(); };
    $("#mNext").onclick = () => { idx++; renderQ(); paintGrid(); };
    paintGrid();
  }

  function submit(auto){
    if(submitted) return;
    const unanswered = picks.filter(p => p === undefined).length;
    if(!auto && unanswered > 0 && !confirm("Còn " + unanswered + " câu chưa trả lời. Nộp bài thật không?")) return;
    submitted = true;
    clearInterval(timerInt);
    const timeUsed = fmtTime(secs - left);
    let ok = 0;
    const perSection = {};
    items.forEach((q, i) => {
      const good = picks[i] === q.a;
      if(good) ok++;
      Store.addAnswer(q.id, picks[i] === undefined ? -1 : picks[i], good);
      perSection[q.section] = perSection[q.section] || { ok: 0, total: 0 };
      perSection[q.section].total++;
      if(good) perSection[q.section].ok++;
    });
    const score = +(ok / items.length * 10).toFixed(1);
    const pct = Math.round(ok / items.length * 100);
    Store.addMock({ date: todayStr(), label, score, pct, total: items.length, ok, timeUsed, at: Date.now() });

    app.innerHTML = `
      <a href="#/thi-thu" class="backlink">← PHÒNG THI</a>
      <div class="sheet result-head">
        <div>
          <span class="tag">KẾT QUẢ — ${esc(label).toUpperCase()} · DÙNG ${timeUsed}</span>
          <div style="display:flex;gap:34px;margin-top:12px;flex-wrap:wrap">
            <div class="result-score"><div class="big">${score}<small>/10</small></div><div class="lbl">thang VSTEP</div></div>
            <div class="result-score"><div class="big">${ok}<small>/${items.length}</small></div><div class="lbl">câu đúng</div></div>
          </div>
        </div>
        <div class="stamp ${pct >= 60 ? "stamp--pass" : "stamp--fail"}">${pct >= 60 ? "ĐẠT B2" : "CHƯA ĐẠT"}</div>
      </div>
      <div class="result-grid">
        ${Object.entries(perSection).map(([name, s]) => `
          <div class="result-cell"><div class="k">${esc(name).toUpperCase()}</div>
          <div class="v ${s.ok / s.total >= 0.6 ? "v--green" : "v--red"}">${s.ok}<small>/${s.total}</small></div></div>`).join("")}
      </div>
      <div style="display:flex;gap:12px;margin:24px 0;flex-wrap:wrap">
        <button class="btn btn--solid" id="rReview">XEM TỪNG CÂU (ĐÚNG/SAI + GIẢI THÍCH)</button>
        <a class="btn" href="#/so-loi">MỞ SỔ LỖI</a>
        <a class="btn btn--ghost" href="#/">VỀ TRANG CHỦ</a>
      </div>
      <div id="reviewBody"></div>`;
    $("#rReview").onclick = () => {
      $("#reviewBody").innerHTML = items.map((q, i) => {
        const mine = picks[i], good = mine === q.a;
        return `<div class="sheet sheet--pad" style="margin-bottom:14px">
          <div class="q-card__no" style="color:${good ? "var(--green)" : "var(--red)"}">CÂU ${i + 1} — ${good ? "ĐÚNG" : "SAI"} · ${esc(q.section)}</div>
          <div class="q-card__text" style="font-size:17px">${q.q}</div>
          <div class="opts">
            ${q.opts.map((o, j) => `<div class="opt ${j === q.a ? "correct" : j === mine ? "wrong" : "dim"}"><span class="key">${LETTERS[j]}</span><span>${o}</span></div>`).join("")}
          </div>
          ${good ? "" : `<div class="explain"><span class="explain__tag">GIẢI THÍCH — ĐÁP ÁN ${LETTERS[q.a]}${mine === undefined ? " · BẠN CHƯA TRẢ LỜI" : ""}</span><p>${q.ex || ""}</p></div>`}
        </div>`;
      }).join("");
      $("#rReview").scrollIntoView({ behavior: "smooth" });
    };
  }

  $("#mSubmit").onclick = () => submit(false);
  renderQ();
}

/* ================= SỔ LỖI ================= */
function viewMistakes(){
  const wrong = Object.entries(Store.d.answers).filter(([id, a]) => !a.ok && !a.resolved);
  const findQ = id => {
    const pools = [GRAMMAR, VOCAB, READING_P1, READING_P2, READING_P3];
    for(const p of pools){ const q = p.find(x => x.id === id); if(q) return { q, src: "Luyện tập" }; }
    for(const g of LISTENING){ const q = g.qs.find(x => x.id === id); if(q) return { q, src: "Nghe — " + g.title }; }
    const n = id.startsWith("ro") ? +id.slice(2) : null;
    if(n){ for(const p of READING_OFFICIAL){ const q = p.questions.find(x => x.n === n); if(q) return { q: { id, q: q.q, opts: q.opts, a: LETTERS.indexOf(READING_OFFICIAL_KEY[String(n)]), ex: READING_OFFICIAL_EX[String(n)] }, src: "Đề chính thức" }; } }
    return null;
  };
  app.innerHTML = moduleHead("08", "Sổ lỗi",
    "Mọi câu bạn từng làm sai ở mọi mô-đun, đã xếp sẵn kèm giải thích. Đánh dấu “đã hiểu” để câu biến khỏi sổ — học đúng chỗ yếu là cách nhanh nhất lên B2.",
    wrong.length + " CÂU CẦN XEM LẠI");
  if(!wrong.length){
    app.insertAdjacentHTML("beforeend", '<div class="sheet sheet--pad" style="text-align:center;padding:60px 30px"><h2 style="font-size:30px">Sổ lỗi trống trơn.</h2><p style="color:var(--ink-2);margin-top:10px">Chưa sai câu nào — hoặc bạn đã hiểu hết. Cả hai đều đáng khen.</p><a class="btn btn--solid" href="#/thi-thu" style="margin-top:16px">THỬ THÁCH BẰNG ĐỀ THI →</a></div>');
    return;
  }
  const groups = {};
  wrong.forEach(([id]) => { const f = findQ(id); if(!f) return; const key = f.src; (groups[key] = groups[key] || []).push([id, f.q]); });
  app.insertAdjacentHTML("beforeend", Object.entries(groups).map(([src, rows]) => `
    <div style="margin-bottom:34px">
      <div class="section-head"><span class="section-head__no">✗</span><h2 style="font-size:22px">${esc(src)}</h2><span class="section-head__meta">${rows.length} CÂU</span></div>
      ${rows.map(([id, q]) => {
        const a = Store.d.answers[id];
        return `<div class="sheet sheet--pad" style="margin-bottom:14px">
          <div class="q-card__text" style="font-size:17px;margin-top:8px">${esc(q.q)}</div>
          <div class="opts">
            ${q.opts.map((o, j) => `<div class="opt ${j === q.a ? "correct" : j === a.pick ? "wrong" : "dim"}"><span class="key">${LETTERS[j]}</span><span>${esc(o)}</span></div>`).join("")}
          </div>
          <div class="explain"><span class="explain__tag">VÌ SAI ĐÚNG LÀ ${LETTERS[q.a]}</span><p>${q.ex || ""}</p></div>
          <button class="btn btn--sm" data-resolve="${id}" style="margin-top:14px;border-color:var(--green);color:var(--green)">✓ ĐÃ HIỂU — BỎ KHỎI SỔ</button>
        </div>`;
      }).join("")}
    </div>`).join(""));
  $$("[data-resolve]").forEach(b => b.onclick = () => { Store.resolve(b.dataset.resolve, true); viewMistakes(); });
}

/* ================= CHIẾN THUẬT ================= */
const GUESS_DEMOS = [
  { word: "arduous", sent: "The ascent of the north face is arduous: climbers take twelve hours to cover what looks like a short distance on the map.", opts: ["rất nguy hiểm", "rất gian nan, tốn sức", "rất dốc và trơn", "rất ngắn"], a: 1, clue: "Manh mối: dấu hai chấm + ví dụ theo sau (12 giờ cho đoạn nhìn ngắn) → giải thích luôn nghĩa 'gian nan'." },
  { word: "resilient", sent: "Unlike fragile species, mangroves are resilient — they recover quickly after storms and even grow back thicker.", opts: ["dễ tổn thương", "mọc chậm", "có khả năng phục hồi", "khó nhân giống"], a: 2, clue: "Manh mối: 'Unlike fragile' (đối lập) + 'recover quickly' (giải thích) → resilient = bền, phục hồi nhanh." },
  { word: "ubiquitous", sent: "Smartphones are now so ubiquitous that finding a student without one is almost impossible.", opts: ["đắt tiền", "có mặt khắp nơi", "bị cấm sử dụng", "đa năng"], a: 1, clue: "Manh mối: mệnh đề theo sau 'finding a student without one is almost impossible' = kết quả của việc 'có mặt khắp nơi'." }
];
function viewStrategy(){
  app.innerHTML = moduleHead("09", "Chiến thuật làm bài",
    "Kỹ thuật đoán nghĩa từ ngữ cảnh, phân tích ý đề, và cách công phá từng phần thi — vũ khí để không bỏ sót câu nào dù gặp từ lạ.",
    "6 KHÓA") + `

  <div class="strat-grid">
    <div class="sheet sheet--pad strat-card">
      <span class="tag" style="color:var(--red)">KHÓA 1 · ĐỌC</span>
      <h3>Đoán nghĩa từ trong ngữ cảnh — 4 loại manh mối</h3>
      <p>Khi gặp từ lạ, ĐỪNG dừng lại. Đề VSTEP (kể cả đề chính thức trong mục Đọc) hỏi “closest in meaning” rất nhiều. Ngữ cảnh luôn chứa ít nhất 1 trong 4 manh mối:</p>
      <ul class="tips">
        <li><b>Manh mối định nghĩa:</b> dấu hai chấm, gạch ngang, “which is”, “meaning” — tác giả giải thích ngay.</li>
        <li><b>Manh mối ví dụ:</b> “for instance”, liệt kê — tổng của các ví dụ chính là nghĩa.</li>
        <li><b>Manh mối đối lập:</b> “unlike”, “but”, “although” — từ lạ mang nghĩa NGƯỢC với từ đã biết.</li>
        <li><b>Manh mối tiền tố–hậu tố:</b> re- (lại), un-/im- (không), -less (thiếu), -ful (đầy)… mảnh ghép nghĩa.</li>
      </ul>
      <div style="margin-top:16px">
        <span class="tag">THỬ NGAY — 3 TỪ LẠ, KHÔNG TRA TỪ ĐIỂN</span>
        <div id="guessDemo" style="margin-top:10px"></div>
      </div>
    </div>

    <div class="sheet sheet--pad strat-card">
      <span class="tag" style="color:var(--red)">KHÓA 2 · ĐỌC</span>
      <h3>Phân bổ 60 phút cho 4 phần đọc</h3>
      <ul class="tips">
        <li><b>Phần 1 (thông báo ngắn):</b> 8 câu — đọc câu hỏi TRƯỚC, quét thông báo tìm từ khóa. ≤ 8 phút.</li>
        <li><b>Phần 2 (đối chiếu):</b> gạch chân động từ chính của từng nhận định (must bring own, not open to teens…) rồi mới quét 4 đoạn. ≤ 12 phút.</li>
        <li><b>Phần 3 (điền câu):</b> đọc câu trước-sau chỗ trống, tìm từ nối (However, Therefore) và đại từ (this, they) — câu đúng phải khớp cả hai đầu. ≤ 12 phút.</li>
        <li><b>Phần 4 (bài dài):</b> câu hỏi theo thứ tự đoạn văn. Câu vocabulary-in-context: đọc 2 dòng quanh từ. Câu EXCEPT/NOT: loại 3 đáp án có trong bài. Còn lại ≈ 25 phút.</li>
      </ul>
    </div>

    <div class="sheet sheet--pad strat-card">
      <span class="tag" style="color:var(--red)">KHÓA 3 · NGHE</span>
      <h3>Nghe một lần vẫn đủ — chuẩn bị trước khi bấm play</h3>
      <ul class="tips">
        <li>Đọc trước 4 phương án: khác biệt giữa A–D chính là thứ bạn phải “canh” (ngày? con số? người nào?).</li>
        <li>Canh từ chuyển hướng: “however, actually, in fact, one more thing” — đáp án thường nằm ngay sau.</li>
        <li>Số liệu trong nghe hầu như luôn bị “thay đổi một nhịp” (đặt 5 giờ → đổi ra 6 giờ) — nghe đến hết, đừng vội chốt ở con số đầu tiên.</li>
        <li>Người nói nhấn/giọng đi xuống ở đâu thì đáp án ở đó — tập với máy đọc 2 giọng trong mục Nghe, tốc độ 0.85× trước, 1× sau.</li>
      </ul>
    </div>

    <div class="sheet sheet--pad strat-card">
      <span class="tag" style="color:var(--red)">KHÓA 4 · VIẾT</span>
      <h3>Phân tích ý đề trong 3 phút — bản đồ 5W</h3>
      <p>Mỗi đề Task 2 hỏi đúng 1 câu hỏi chính. Trước khi viết, trả lời nhanh:</p>
      <ul class="tips">
        <li><b>What</b> — kiểu đề gì? Discuss both views / Agree–disagree / Advantages–disadvantages → quyết định khung bài.</li>
        <li><b>Who</b> — “educated reader” → giọng trang trọng, không viết tắt “don't”… “it's”.</li>
        <li><b>How many ideas?</b> — 2 ý chính là đủ; mỗi ý = claim + reason + example. Ý hay hơn viết trước.</li>
        <li><b>Where examples?</b> — từ đời thường của chính bạn (Last year, in my city…) — không cần số liệu thật, cần cụ thể.</li>
        <li><b>Word budget:</b> Task 1 ≈ 130–160 từ / Task 2 ≈ 260–300 từ. Dài hơn không cộng điểm, sai mới trừ điểm.</li>
      </ul>
    </div>

    <div class="sheet sheet--pad strat-card">
      <span class="tag" style="color:var(--red)">KHÓA 5 · NÓI</span>
      <h3>Công thức BER khi gặp câu khó</h3>
      <ul class="tips">
        <li><b>B — Balanced:</b> mở đầu “It depends, really…” — ghế an toàn cho mọi câu hỏi khó.</li>
        <li><b>E — Experience:</b> kéo về chuyện mình: “In my experience…” — nói thứ mình sống qua thì trôi chảy nhất.</li>
        <li><b>R — Rule:</b> chốt quan điểm chung: “But generally speaking…” — có mở có kết, điểm coherence trọn vẹn.</li>
        <li>Xem thêm 6 tình huống <a href="#/noi"><b>Cứu nguy khi bí ý</b></a> ở mục Nói.</li>
      </ul>
    </div>

    <div class="sheet sheet--pad strat-card">
      <span class="tag" style="color:var(--red)">KHÓA 6 · ĐỐI PHÓ ĐỀ CHÍNH THỨC</span>
      <h3>Bạn đã có trong tay đề thật</h3>
      <p>Mục <a href="#/doc"><b>Đọc — P4</b></a> chứa toàn bộ 4 passage của VSTEP Sample Test với đáp án gốc; mục <a href="#/nghe"><b>Nghe</b></a> có 8 câu Part 1 lấy từ cùng bộ đề; <a href="#/viet"><b>Viết</b></a> và <a href="#/noi"><b>Nói</b></a> cũng chứa đề chính thức (đánh dấu ★). Chiến lược:</p>
      <ul class="tips">
        <li>Lần 1: làm như thi thật (bấm giờ, không mở đáp án).</li>
        <li>Lần 2: chỉ làm lại các câu sai + đọc giải thích từng câu.</li>
        <li>Lần 3: “Đề đọc chính thức” trong Phòng thi số 02 để đo điểm /10 theo bảng quy đổi gốc.</li>
      </ul>
    </div>
  </div>`;

  /* demo đoán từ */
  let di = 0, answered = false;
  const demoEl = $("#guessDemo");
  const renderDemo = () => {
    const d = GUESS_DEMOS[di];
    answered = false;
    demoEl.innerHTML = `
      <p style="font-size:16px;line-height:1.7">“${esc(d.sent)}”</p>
      <p class="mono" style="font-size:11px;margin:10px 0">TỪ CẦN ĐOÁN: <b style="color:var(--red)">${d.word.toUpperCase()}</b></p>
      <div class="opts" style="max-width:520px">
        ${d.opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="key">${LETTERS[i]}</span><span>${esc(o)}</span></button>`).join("")}
      </div>
      <div id="demoEx"></div>
      <button class="btn btn--ghost btn--sm" id="demoNext" style="margin-top:12px">TỪ TIẾP THEO →</button>`;
    $$(".opt", demoEl).forEach(el => el.onclick = () => {
      if(answered) return; answered = true;
      const i = +el.dataset.i, ok = i === d.a;
      Store.addAnswer("guess-" + d.word, i, ok);
      $$(".opt", demoEl).forEach((x, j) => { x.disabled = true; if(j === d.a) x.classList.add("correct"); else if(j === i) x.classList.add("wrong"); else x.classList.add("dim"); });
      $("#demoEx").innerHTML = `<div class="explain"><span class="explain__tag">${ok ? "ĐÚNG!" : "CHƯA ĐÚNG — ĐÁP ÁN " + LETTERS[d.a]}</span><p>${esc(d.clue)}</p></div>`;
    });
    $("#demoNext").onclick = () => { di = (di + 1) % GUESS_DEMOS.length; renderDemo(); };
  };
  renderDemo();
}

/* ================= CÀI ĐẶT ================= */
function viewSettings(){
  const c = AI.cfg();
  app.innerHTML = moduleHead("10", "Cài đặt trợ lý AI",
    "Web này chạy hoàn toàn offline và miễn phí. Để AI chấm Viết + Nói và sinh ý khi bí, cắm một API key — dữ liệu key lưu ngay trên máy bạn, không gửi đi đâu khác ngoài nhà cung cấp bạn chọn.",
    AI.available() ? "AI ĐANG BẬT" : "AI ĐANG TẮT") + `
    <div class="sheet sheet--pad" style="max-width:720px">
      <div class="side-stat"><span class="k">Nhà cung cấp</span>
        <select id="aiProvider" class="ai-input" style="width:280px">
          <option value="gemini" ${c.provider !== "openai" ? "selected" : ""}>Google Gemini (có gói miễn phí)</option>
          <option value="openai" ${c.provider === "openai" ? "selected" : ""}>OpenAI / tương thích (OpenRouter, Together…)</option>
        </select></div>
      <div class="side-stat"><span class="k">API key</span>
        <input id="aiKey" type="password" class="ai-input" style="width:280px" placeholder="dán key vào đây" value="${esc(c.key || "")}"></div>
      <div class="side-stat"><span class="k">Model</span>
        <input id="aiModel" class="ai-input" style="width:280px" placeholder="gemini-2.0-flash / gpt-4o-mini" value="${esc(c.model || "")}"></div>
      <div class="side-stat" id="baseUrlRow" style="display:${c.provider === "openai" ? "flex" : "none"}"><span class="k">Base URL (tuỳ chọn)</span>
        <input id="aiBase" class="ai-input" style="width:280px" placeholder="https://openrouter.ai/api/v1" value="${esc(c.baseUrl || "")}"></div>
      <div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap">
        <button class="btn btn--solid" id="aiSave">LƯU CÀI ĐẶT</button>
        <button class="btn" id="aiTest">KIỂM TRA KẾT NỐI</button>
        <button class="btn btn--ghost" id="aiClear">XOÁ KEY KHỎI MÁY</button>
      </div>
      <div id="aiTestOut" style="margin-top:16px"></div>
      <hr class="hr-dash">
      <p class="mono" style="font-size:11px;color:var(--ink-3);line-height:1.8">
      LẤY KEY GEMINI MIỄN PHÍ: aistudio.google.com → Get API key (cần tài khoản Google).<br>
      KEY CHỈ LƯU TRONG localStorage TRÊN MÁY NÀY. MỌI LỜI CHẤM ĐỀU GỬI TRỰC TIẾP TỪ TRÌNH DUYỆT CỦA BẠN TỚI NHÀ CUNG CẤP — KHÔNG QUA SERVER NÀO KHÁC.<br>
      TỪ ĐIỂN &amp; DỊCH: dictionaryapi.dev + MyMemory (miễn phí, không cần key, tự hoạt động).</p>
    </div>`;
  const provSel = $("#aiProvider");
  provSel.onchange = () => { $("#baseUrlRow").style.display = provSel.value === "openai" ? "flex" : "none"; };
  $("#aiSave").onclick = () => {
    AI.saveCfg({ provider: provSel.value, key: $("#aiKey").value.trim(), model: $("#aiModel").value.trim(), baseUrl: $("#aiBase").value.trim() });
    $("#aiTestOut").innerHTML = '<div class="notice"><span class="mono">ĐÃ LƯU</span><span>Cài đặt đã được ghi vào máy. Trợ lý AI sẵn sàng ở mục Viết &amp; Nói.</span></div>';
  };
  $("#aiTest").onclick = async () => {
    $("#aiTestOut").innerHTML = '<p class="mono" style="font-size:11px">ĐANG GỬI TÍN HIỆU…</p>';
    try{
      const r = await AI.chat("Trả lời đúng một từ: PONG", "Bạn là máy chủ kiểm tra kết nối.");
      $("#aiTestOut").innerHTML = `<div class="notice" style="border-color:var(--green)"><span class="mono" style="color:var(--green)">KẾT NỐI THÀNH CÔNG</span><span>Máy trả lời: “${esc(r.trim().slice(0, 60))}”. AI chấm bài đã sẵn sàng.</span></div>`;
    }catch(e){
      $("#aiTestOut").innerHTML = `<div class="notice"><span class="mono">KHÔNG KẾT NỐI ĐƯỢC</span><span>${esc(e.message)}</span></div>`;
    }
  };
  $("#aiClear").onclick = () => { localStorage.removeItem(AI.KEY_STORE); $("#aiKey").value = ""; $("#aiTestOut").innerHTML = '<div class="notice"><span class="mono">ĐÃ XOÁ</span><span>Key đã bị gỡ khỏi máy. Các chức năng cục bộ vẫn chạy bình thường.</span></div>'; };
}

/* ================= KHỞI ĐỘNG ================= */
Dict.mount();
$("#menuBtn").onclick = () => $("#nav").classList.toggle("open");
route();
