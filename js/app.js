/* ============================================================
   Phòng Thi B2 | Ứng dụng luyện thi VSTEP 4 kỹ năng
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
const toHalf = x => Math.round(x * 2) / 2;

/* ---------- Đánh dấu đoạn chữ (highlight) trong bài đọc ---------- */
function hlApply(body, texts){
  if(!body || !texts || !texts.length) return;
  texts.forEach(t => {
    if(!t) return;
    const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
    while(walker.nextNode()){
      const node = walker.currentNode;
      if(node.parentElement && node.parentElement.closest(".hl")) continue;
      const i = node.nodeValue.indexOf(t);
      if(i < 0) continue;
      const r = document.createRange();
      r.setStart(node, i); r.setEnd(node, i + t.length);
      const sp = document.createElement("span"); sp.className = "hl";
      try { r.surroundContents(sp); } catch(e){}
      break;
    }
  });
}
function hlClearAll(body){
  if(!body) return;
  $$(".hl", body).forEach(sp => {
    const p = sp.parentNode;
    while(sp.firstChild) p.insertBefore(sp.firstChild, sp);
    p.removeChild(sp);
  });
  body.normalize();
}
function hlBind(body, store, onChange){
  if(!body) return;
  body.addEventListener("mouseup", () => {
    const sel = window.getSelection();
    if(!sel || sel.isCollapsed || !sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    if(!body.contains(range.commonAncestorContainer)) return;
    const text = sel.toString().trim();
    if(text.length < 2 || text.length > 400){ sel.removeAllRanges(); return; }
    const sp = document.createElement("span"); sp.className = "hl";
    try { range.surroundContents(sp); }
    catch(e){ try { const frag = range.extractContents(); sp.appendChild(frag); range.insertNode(sp); } catch(e2){} }
    if(sp.textContent.trim() && !store.includes(text)){ store.push(text); if(onChange) onChange(); }
    sel.removeAllRanges();
  });
}
const CBT_DRAFT_KEY = "b2.cbt.draft.v1";

/* ================= SVG ICONS ================= */
const ICO = {
  next: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 10h10M11 6l4 4-4 4"/></svg>',
  prev: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 10H5M9 6l-4 4 4 4"/></svg>',
  play: '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M6.5 4.5v11l9-5.5-9-5.5z"/></svg>',
  stop: '<svg viewBox="0 0 20 20" fill="currentColor"><rect x="5" y="5" width="10" height="10" rx="1.5"/></svg>',
  speaker: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5L5 8H2v4h3l4 3V5z"/><path d="M13 7.5a3.5 3.5 0 010 5M15.5 5a7 7 0 010 10"/></svg>',
  clock: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7.5"/><path d="M10 6v4l2.5 2"/></svg>',
  flag: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3v14M4 4h10l-2 3.5L14 11H4"/></svg>',
  book: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4.5A2.5 2.5 0 015.5 2H16v14H5.5A2.5 2.5 0 003 18.5v-14z"/><path d="M3 16h13"/></svg>',
  mic: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2.5" width="6" height="9" rx="3"/><path d="M4.5 9.5a5.5 5.5 0 0011 0M10 15v3M7 18h6"/></svg>',
  flip: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h11l-3-3M16 13H5l3 3"/></svg>'
};

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
    this.d.writings = this.d.writings || [];
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
  addWriting(w){ this.d.writings = this.d.writings || []; this.d.writings.unshift(w); this.d.writings = this.d.writings.slice(0, 20); this.save(); },
  resolveWriting(i){ if(this.d.writings && this.d.writings[i] !== undefined){ this.d.writings.splice(i, 1); this.save(); } },
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
      <button class="dictw__fab" id="dictFab" aria-label="Mở từ điển tra nhanh">${ICO.book}<span>Tra từ nhanh</span></button>
      <div class="dictw__panel" id="dictPanel" role="dialog" aria-label="Từ điển và dịch câu">
        <div class="dictw__head">
          <button class="dictw__tab on" data-m="dict">Từ điển Anh-Anh</button>
          <button class="dictw__tab" data-m="trans">Dịch nhanh</button>
          <button class="dictw__x" id="dictX" aria-label="Đóng">✕</button>
        </div>
        <div class="dictw__body">
          <div class="dictw__row">
            <input id="dictInput" placeholder="Gõ một từ tiếng Anh…" autocomplete="off">
            <button class="btn btn--sm btn--solid" id="dictGo">Tra</button>
          </div>
          <div id="dictOut" class="dictw__out">
            <p class="dictw__src">Mẹo: Nhấp đúp chuột vào bất kỳ từ tiếng Anh nào trên trang để tra nghĩa tức thì.</p>
          </div>
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
      $("#dictInput").placeholder = this.mode === "dict" ? "Gõ một từ tiếng Anh…" : "Dán câu tiếng Việt hoặc tiếng Anh…";
      $("#dictGo").textContent = this.mode === "dict" ? "Tra" : "Dịch";
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
    out.innerHTML = '<p class="dictw__loading">Đang tra cứu dữ liệu…</p>';
    try{
      if(this.mode === "dict"){
        let j;
        try{
          const r = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(q));
          if(!r.ok) throw new Error("notfound");
          j = await r.json();
        }catch(err){
          if(err.message === "notfound") throw err;
          j = null;
        }
        if(j){
          const e0 = j[0];
          const ph = e0.phonetic || (e0.phonetics || []).map(p => p.text).filter(Boolean)[0] || "";
          let html = `<div class="dictw__word"><b>${esc(e0.word)}</b> <span class="mono">${esc(ph)}</span></div>`;
          const aud = (e0.phonetics || []).map(p => p.audio).filter(Boolean)[0];
          if(aud) html += `<button class="btn btn--sm" id="dictAudio">${ICO.speaker}<span>Phát âm</span></button>`;
          (e0.meanings || []).slice(0, 3).forEach(m => {
            html += `<div class="dictw__pos">${esc(m.partOfSpeech)}</div>`;
            m.definitions.slice(0, 2).forEach(d => {
              html += `<div class="dictw__def">• ${esc(d.definition)}${d.example ? `<i>“${esc(d.example)}”</i>` : ""}</div>`;
            });
          });
          out.innerHTML = html;
          if(aud) $("#dictAudio").onclick = () => new Audio(aud).play();
        } else {
          const t = await this.translate(q, "en|vi");
          out.innerHTML = `<div class="dictw__word"><b>${esc(q)}</b></div>
            <div class="dictw__trans">${esc(t)}</div>
            <button class="btn btn--sm" id="dictAudio">${ICO.speaker}<span>Đọc từ</span></button>
            <p class="dictw__src">Hiển thị nghĩa dịch qua MyMemory + phát âm trình duyệt.</p>`;
          $("#dictAudio").onclick = () => TTS.speak([{v:0,t:q}]);
        }
      } else {
        const hasVi = /[ăâđêôơưàáảãạằắẳẵặèéẻẽẹìíỉĩịòóỏõọùúủũụỳýỷỹỵđ]/i.test(q);
        const t = await this.translate(q, hasVi ? "vi|en" : "en|vi");
        out.innerHTML = `<div class="dictw__trans">${esc(t)}</div><p class="dictw__src">Nguồn dịch: MyMemory (${hasVi ? "Việt sang Anh" : "Anh sang Việt"})</p>`;
      }
    }catch(err){
      out.innerHTML = `<p class="dictw__err">Không tìm thấy từ “${esc(q)}”. Hãy kiểm tra lại chính tả hoặc chuyển sang thẻ Dịch nhanh.</p>`;
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
  if(window.__cbtSave){ try{ window.__cbtSave(); }catch(e){} window.__cbtSave = null; }
  if(window.__examKeys){ document.removeEventListener("keydown", window.__examKeys); window.__examKeys = null; }
  window.onbeforeunload = null;
  TTS.stop();
  if(STT.active) STT.stop();
  window.scrollTo(0, 0);
  $$(".nav a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + hash));
  $("#nav").classList.remove("open");
  app.classList.remove("view-enter");
  void app.offsetWidth;
  app.classList.add("view-enter");
  fn();
}
window.addEventListener("hashchange", route);

/* ================= MẪU DÙNG CHUNG ================= */
function moduleHead(badgeText, title, desc, meta){
  return `<div class="module-top">
    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
      <span class="tag">${badgeText}</span>
      ${meta ? `<span style="font-size:13px;font-weight:600;color:var(--ink-3)">${meta}</span>` : ""}
    </div>
    <h1>${title}</h1>
    <p>${desc}</p>
  </div>`;
}
function officialBadge(){ return '<span class="badge-off">Đề chính thức</span>'; }

/* ================= QUIZ ENGINE (practice) ================= */
function mountQuiz(mount, cfg){
  const items = cfg.items;
  let idx = 0;
  let rec;

  function render(){
    const q = items[idx];
    rec = Store.d.answers[q.id];
    const passHtml = cfg.getPassage ? cfg.getPassage(q) : "";
    const progRatio = ((idx + 1) / items.length).toFixed(3);
    const doneCount = items.filter(it => Store.d.answers[it.id] !== undefined).length;
    const okCount = items.filter(it => Store.d.answers[it.id]?.ok).length;

    mount.innerHTML = `
      <div class="quiz-layout">
        <div class="quiz-main">
          ${passHtml ? (cfg.split ? `<div class="read-split"><div class="sheet passage-panel read-split__passage">${passHtml}</div><div class="read-split__qs">` : `<div class="sheet passage-panel">${passHtml}</div>`) : ""}
          <div class="sheet q-card sheet--pad">
            <div class="q-prog" aria-hidden="true">
              <div class="q-prog__fill" style="transform:scaleX(${progRatio})"></div>
            </div>
            <div class="q-card__top">
              <span class="q-card__no">Câu ${idx + 1} / ${items.length}${q.tag ? `<em>${q.tag}</em>` : ""}</span>
              <span style="font-size:12.5px;font-weight:600;color:var(--ink-3)">${q.src ? esc(q.src) : ""}</span>
            </div>
            <div class="q-card__text">${q.q}</div>
            <div class="opts" id="qOpts">
              ${q.opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="key">${LETTERS[i]}</span><span>${o}</span></button>`).join("")}
            </div>
            <div id="qExplain"></div>
            <div class="q-nav">
              <button class="btn btn--ghost" id="qPrev" ${idx === 0 ? "disabled" : ""}>${ICO.prev}<span>Câu trước</span></button>
              <span class="q-nav__mid">${rec ? (rec.ok ? "Đã trả lời chính xác" : "Đã trả lời (chưa đúng)") : "Chọn 1 đáp án để xem giải thích"}</span>
              <button class="btn btn--solid" id="qNext" ${idx === items.length - 1 ? "disabled" : ""}><span>Câu tiếp</span>${ICO.next}</button>
            </div>
            <p class="kbd-hint">Phím tắt: <b>A–D</b> chọn đáp án, phím mũi tên <b>Trái / Phải</b> chuyển câu, nhấp đúp vào từ tiếng Anh bất kỳ để tra từ điển.</p>
          </div>
          ${passHtml && cfg.split ? `</div></div>` : ""}
        </div>
        <aside class="quiz-side">
          <div class="side-block">
            <h4><span>Tiến độ bộ câu hỏi</span><span>${doneCount}/${items.length}</span></h4>
            <div class="side-stat"><span class="k">Số câu đúng</span><span class="v" style="color:var(--green)">${okCount}</span></div>
            <div class="side-stat"><span class="k">Cần ôn lại</span><span class="v" style="color:var(--red)">${doneCount - okCount}</span></div>
          </div>
          <div class="side-block">
            <h4><span>Danh sách câu</span><span style="font-size:11.5px;font-weight:500;color:var(--ink-3)">Chuyển nhanh</span></h4>
            <div class="grid-q" id="qNavGrid">
              ${items.map((it, i) => {
                const st = Store.d.answers[it.id];
                const cls = st !== undefined ? (st.ok ? "done-ok" : "done-no") : "";
                return `<button class="gq ${cls} ${i === idx ? "cur" : ""}" data-gi="${i}">${i + 1}</button>`;
              }).join("")}
            </div>
          </div>
        </aside>
      </div>`;

    if(cfg.onPassage) cfg.onPassage($(".passage-body", mount));
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
      $("#qExplain", mount).innerHTML = `<div class="explain ${rec.ok ? "explain--ok" : "explain--no"}">
        <span class="explain__tag">${rec.ok ? "Chính xác! Giải thích chi tiết:" : "Đáp án đúng là " + LETTERS[q.a] + " — Giải thích:"}</span>
        <p>${q.ex || ""}</p></div>`;
    }

    $$(".opt", mount).forEach(el => el.onclick = () => {
      if(Store.d.answers[q.id] !== undefined) return;
      const i = +el.dataset.i;
      Store.addAnswer(q.id, i, i === q.a);
      rec = Store.d.answers[q.id];
      paint(); showEx();
      const gBtn = $(`.gq[data-gi="${idx}"]`, mount);
      if(gBtn) gBtn.classList.add(rec.ok ? "done-ok" : "done-no");
    });

    $$("#qNavGrid .gq", mount).forEach(b => b.onclick = () => {
      idx = +b.dataset.gi;
      render();
    });

    const prev = $("#qPrev", mount); if(prev) prev.onclick = () => { idx--; render(); };
    const next = $("#qNext", mount); if(next) next.onclick = () => { idx++; render(); };
    focusHotkeys();
  }

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

/* Hiện cả cụm câu hỏi của một bài nghe (đọc trước như phòng thi thật),
   vẫn chấm tức thì kèm giải thích khi luyện tập. */
function mountListenGroup(mount, g){
  const items = g.qs;
  mount.innerHTML = `
    <div class="quiz-layout">
      <div class="quiz-main" style="display:flex;flex-direction:column;gap:14px">
        ${items.map((q, i) => `
          <div class="sheet q-card sheet--pad" id="lq-${i}">
            <div class="q-card__top">
              <span class="q-card__no">Câu ${i + 1} / ${items.length}<em>Part ${g.part} · ${esc(g.title)}</em></span>
            </div>
            <div class="q-card__text" style="margin:10px 0 14px">${esc(q.q)}</div>
            <div class="opts">
              ${q.opts.map((o, oi) => `<button class="opt" data-lq="${i}" data-oi="${oi}"><span class="key">${LETTERS[oi]}</span><span>${esc(o)}</span></button>`).join("")}
            </div>
            <div class="lq-ex" data-ex="${i}"></div>
          </div>`).join("")}
      </div>
      <aside class="quiz-side">
        <div class="side-block">
          <h4><span>Tiến độ đoạn nghe</span><span class="lq-count"></span></h4>
          <div class="grid-q">
            ${items.map((q, i) => `<button class="gq" data-ljump="${i}">${i + 1}</button>`).join("")}
          </div>
        </div>
      </aside>
    </div>`;

  const updCount = () => {
    const c = $(".lq-count", mount);
    if(c) c.textContent = items.filter(q => Store.d.answers[q.id] !== undefined).length + "/" + items.length;
  };
  const paint = i => {
    const q = items[i], rec = Store.d.answers[q.id], card = $("#lq-" + i, mount);
    if(!card) return;
    $$(".opt", card).forEach((el, oi) => {
      el.classList.remove("sel", "correct", "wrong", "dim");
      if(rec === undefined) return;
      if(oi === q.a) el.classList.add("correct");
      else if(oi === rec.pick) el.classList.add("wrong");
      else el.classList.add("dim");
      el.disabled = true;
    });
    if(rec){
      const ex = $(".lq-ex", card);
      if(ex) ex.innerHTML = `<div class="explain ${rec.ok ? "explain--ok" : "explain--no"}">
        <span class="explain__tag">${rec.ok ? "Chính xác! Giải thích chi tiết:" : "Đáp án đúng là " + LETTERS[q.a] + " — Giải thích:"}</span>
        <p>${esc(q.ex || "")}</p></div>`;
    }
    const gBtn = $(`.gq[data-ljump="${i}"]`, mount);
    if(gBtn && rec) gBtn.classList.add(rec.ok ? "done-ok" : "done-no");
  };
  items.forEach((q, i) => paint(i));
  updCount();
  $$(".opt[data-lq]", mount).forEach(el => el.onclick = () => {
    const i = +el.dataset.lq, oi = +el.dataset.oi, q = items[i];
    if(Store.d.answers[q.id] !== undefined) return;
    Store.addAnswer(q.id, oi, oi === q.a);
    paint(i);
    updCount();
  });
  $$("[data-ljump]", mount).forEach(b => b.onclick = () => {
    const el = $("#lq-" + b.dataset.ljump, mount);
    if(el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

/* Cụm câu hỏi xếp chồng cho bài đọc: thanh tiến độ + danh sách câu
   nằm ngang sticky trên đầu, các câu hỏi cuộn liên tục bên dưới. */
function mountReadGroup(mount, items){
  mount.innerHTML = `
    <div class="qprogress-bar">
      <span class="qprogress-bar__stats">Đã làm <b class="rq-count">0/${items.length}</b> · Đúng <b class="rq-ok" style="color:var(--green)">0</b> · Ôn lại <b class="rq-no" style="color:var(--red)">0</b></span>
      <div class="grid-q grid-q--row">
        ${items.map((q, i) => `<button class="gq" data-rjump="${i}" title="Câu ${i + 1}">${i + 1}</button>`).join("")}
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:14px">
      ${items.map((q, i) => `
        <div class="sheet q-card sheet--pad" id="rq-${i}">
          <div class="q-card__top">
            <span class="q-card__no">Câu ${i + 1} / ${items.length}${q.tag ? `<em>${q.tag}</em>` : ""}</span>
            <span style="font-size:12.5px;font-weight:600;color:var(--ink-3)">${q.src ? esc(q.src) : ""}</span>
          </div>
          <div class="q-card__text" style="margin:10px 0 14px">${q.q}</div>
          <div class="opts">
            ${q.opts.map((o, oi) => `<button class="opt" data-rqi="${i}" data-oi="${oi}"><span class="key">${LETTERS[oi]}</span><span>${o}</span></button>`).join("")}
          </div>
          <div class="lq-ex"></div>
        </div>`).join("")}
    </div>`;

  const updCount = () => {
    const done = items.filter(q => Store.d.answers[q.id] !== undefined).length;
    const ok = items.filter(q => Store.d.answers[q.id]?.ok).length;
    const c = $(".rq-count", mount), o = $(".rq-ok", mount), n = $(".rq-no", mount);
    if(c) c.textContent = done + "/" + items.length;
    if(o) o.textContent = ok;
    if(n) n.textContent = done - ok;
  };
  const paint = i => {
    const q = items[i], rec = Store.d.answers[q.id], card = $("#rq-" + i, mount);
    if(!card) return;
    $$(".opt", card).forEach((el, oi) => {
      el.classList.remove("sel", "correct", "wrong", "dim");
      if(rec === undefined) return;
      if(oi === q.a) el.classList.add("correct");
      else if(oi === rec.pick) el.classList.add("wrong");
      else el.classList.add("dim");
      el.disabled = true;
    });
    if(rec){
      const ex = $(".lq-ex", card);
      if(ex) ex.innerHTML = `<div class="explain ${rec.ok ? "explain--ok" : "explain--no"}">
        <span class="explain__tag">${rec.ok ? "Chính xác! Giải thích chi tiết:" : "Đáp án đúng là " + LETTERS[q.a] + " — Giải thích:"}</span>
        <p>${esc(q.ex || "")}</p></div>`;
    }
    const gBtn = $(`.gq[data-rjump="${i}"]`, mount);
    if(gBtn && rec) gBtn.classList.add(rec.ok ? "done-ok" : "done-no");
  };
  items.forEach((q, i) => paint(i));
  updCount();
  $$(".opt[data-rqi]", mount).forEach(el => el.onclick = () => {
    const i = +el.dataset.rqi, oi = +el.dataset.oi, q = items[i];
    if(Store.d.answers[q.id] !== undefined) return;
    Store.addAnswer(q.id, oi, oi === q.a);
    paint(i);
    updCount();
  });
  $$("[data-rjump]", mount).forEach(b => b.onclick = () => {
    const el = $("#rq-" + b.dataset.rjump, mount);
    if(el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

/* ================= TRANG CHỦ ================= */
function bandChartSVG(pts){
  const W = 660, H = 232, L = 34, R = 46, T = 18, B = 30;
  const iw = W - L - R, ih = H - T - B;
  const y = v => (T + (10 - v) / 10 * ih).toFixed(1);
  const n = pts.length;
  const x = i => (L + (n === 1 ? iw / 2 : i / (n - 1) * iw)).toFixed(1);
  const grid = [0, 2, 4, 6, 8, 10].map(v =>
    `<line x1="${L}" y1="${y(v)}" x2="${W - R}" y2="${y(v)}" stroke="var(--line-soft)" stroke-width="1"/>` +
    `<text x="${L - 7}" y="${+y(v) + 3.5}" text-anchor="end" font-size="10" fill="var(--ink-muted)">${v}</text>`).join("");
  const bands = [[4, "var(--amber)", "B1"], [6, "var(--green)", "B2"], [8.5, "var(--teal)", "C1"]]
    .map(([v, c, lb]) =>
      `<line x1="${L}" y1="${y(v)}" x2="${W - R}" y2="${y(v)}" stroke="${c}" stroke-width="1.5" stroke-dasharray="5 4"/>` +
      `<text x="${W - R + 7}" y="${+y(v) + 3.5}" font-size="10" font-weight="800" fill="${c}">${lb}</text>`).join("");
  const line = pts.map((p, i) => (i ? "L " : "M ") + x(i) + " " + y(p.s)).join(" ");
  const area = line + ` L ${x(n - 1)} ${T + ih} L ${x(0)} ${T + ih} Z`;
  const dots = pts.map((p, i) =>
    `<circle cx="${x(i)}" cy="${y(p.s)}" r="${i === n - 1 ? 5 : 3.5}" fill="${i === n - 1 ? "var(--primary)" : "#fff"}" stroke="var(--primary)" stroke-width="2"><title>${esc(p.lb)} · ${p.s}/10 · ${p.d}</title></circle>`).join("");
  const dts = pts.map((p, i) => `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" font-size="9" fill="var(--ink-muted)">${esc(p.d)}</text>`).join("");
  const lastLb = `<text x="${Math.min(+x(n - 1), W - R - 26)}" y="${+y(pts[n - 1].s) - 12}" font-size="12.5" font-weight="800" fill="var(--primary)">${pts[n - 1].s}</text>`;
  return `<svg class="bandchart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Biểu đồ band điểm qua ${n} bài thi gần nhất">` +
    `<path d="${area}" fill="var(--primary)" opacity="0.07"/>${grid}${bands}` +
    `<path d="${line}" fill="none" stroke="var(--primary)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>${dots}${dts}${lastLb}</svg>`;
}

function viewHome(){
  const total = Object.keys(Store.d.answers).length;
  const all = Store.accBy("*");
  const streak = Store.streak();
  const ai = AI.available();
  const pendingErr = Object.values(Store.d.answers).filter(a => a && a.ok === false && !a.resolved);
  const pendingW = (Store.d.writings || []).filter(w => !w.rewritten);
  const staleDays = pendingErr.length ? Math.floor((Date.now() - Math.min.apply(Math, pendingErr.map(a => a.at || Date.now()))) / 864e5) : 0;
  const showRemind = staleDays >= 1 || pendingW.length > 0;
  const chartPts = Store.d.mocks.filter(m => isFinite(parseFloat(m.score))).slice(0, 14).reverse().map(m => {
    const dm = String(m.date || "").match(/(\d{4})-(\d{2})-(\d{2})/);
    return { s: parseFloat(m.score), d: dm ? dm[3] + "/" + dm[2] : String(m.date || "").slice(0, 5), lb: m.label || "Bài thi" };
  });
  const totalReadingQs = READING_P1.length + READING_P2.length + READING_P3.length + ALL_READING_SETS.length * 40;
  const totalListeningQs = LISTENING.reduce((s, g) => s + g.qs.length, 0);
  const totalMCQs = GRAMMAR.length + VOCAB.length + totalReadingQs + totalListeningQs;
  const totalSpeak = SPEAKING_P1.length + SPEAKING_P2.length + SPEAKING_P3.length;
  const modDefs = [
    ["Nền tảng", "Ngữ pháp & Cấu trúc", new Set(GRAMMAR.map(q => q.topic)).size + " chuyên đề trọng tâm thường gặp nhất trong đề VSTEP: thì, bị động, điều kiện, đảo ngữ, câu chẻ, mệnh đề rút gọn.", GRAMMAR.length + " câu hỏi", "#/ngu-phap"],
    ["Nền tảng", "Từ vựng B2 & Flashcard", "Collocation, phrasal verbs, idiom, cặp từ dễ nhầm và từ vựng theo " + new Set(VOCAB.map(q => q.set)).size + " chủ đề kèm hệ thống thẻ ghi nhớ lặp lại ngắt quãng.", VOCAB.length + " câu + " + CARDS.length + " thẻ", "#/tu-vung"],
    ["Kỹ năng 1", "Đọc hiểu VSTEP", ALL_READING_SETS.length + " bộ đề Reading Full Test (" + (ALL_READING_SETS.length * 4) + " bài đọc dài) từ Sách NXB ĐHQGHN, Anh ngữ Thiên Ân, ĐH Ngoại Thương, ĐH Đồng Tháp, EVSTEP, Vivian, ZIM & PREP.", totalReadingQs + " câu hỏi", "#/doc"],
    ["Kỹ năng 2", "Nghe hiểu 2 giọng đọc", [...new Set(LISTENING.map(g => g.set || 1))].length + " bộ đề Listening đủ Part 1, Part 2, Part 3 phát trực tiếp bằng 2 giọng đọc kèm lời thoại (Transcript) đối chiếu.", totalListeningQs + " câu hỏi", "#/nghe"],
    ["Kỹ năng 3", "Viết thư & Luận văn", WRITING.length + " đề Task 1 & Task 2 từ các bộ đề thi thật, tích hợp AI chấm theo 4 tiêu chí VSTEP và AI nâng cấp bài lên B2/C1.", WRITING.length + " đề luyện", "#/viet"],
    ["Kỹ năng 4", "Phòng thu luyện Nói", totalSpeak + " chủ đề Part 1, 2, 3 kèm sơ đồ tư duy, thu âm giọng nói, AI chấm theo rubric và nâng cấp bài nói lên B2/C1.", totalSpeak + " chủ đề", "#/noi"],
    ["Phương pháp", "Chiến thuật phòng thi", "Kỹ năng đoán nghĩa từ lạ qua ngữ cảnh, phân bổ thời gian 60 phút và công thức trả lời nhanh từng phần.", "6 chuyên đề", "#/chien-thuat"],
    ["Ôn tập", "Sổ lỗi tự động", "Tự động lưu lại mọi câu bạn từng làm sai ở mọi bộ đề kèm lời giải thích để ôn đúng điểm yếu trước ngày thi.", "Cá nhân hóa", "#/so-loi"]
  ];
  app.innerHTML = `
  <section class="hero">
    <div class="hero__main">
      <div>
        <div class="hero__kicker">
          <span class="tag">Chuẩn cấu trúc VSTEP B2 (Bậc 4/6)</span>
          <span style="font-size:13px;font-weight:600;color:var(--ink-3)">Thư viện ${ALL_READING_SETS.length} Bộ đề Sách PDF &amp; Web</span>
        </div>
        <h1>Không gian luyện thi B2 trực quan, tập trung và thực chiến.</h1>
        <p class="hero__sub">Luyện trọn vẹn 4 kỹ năng Nghe, Đọc, Viết, Nói trên giao diện mô phỏng phòng thi máy tính (CBT), tích hợp trọn bộ <b>10 đề sách NXB ĐHQGHN</b>, <b>5 đề Full 4 kỹ năng Anh ngữ Thiên Ân</b> cùng 6 bộ đề trường ĐH (FTU, DTHU, ZIM, PREP, Vivian, EVSTEP) và giám khảo AI chấm chữa chi tiết.</p>
        <div class="hero__cta">
          <a class="btn btn--solid" href="#/thi-thu"><span>Vào phòng thi thử CBT</span>${ICO.next}</a>
          <a class="btn" href="#/doc"><span>Kho ${ALL_READING_SETS.length} bộ đề Đọc hiểu</span></a>
          <a class="btn btn--ghost" href="#/tu-vung"><span>Học Flashcard B2</span></a>
        </div>
      </div>
      <div class="hero__highlights">
        <div class="hero__stat"><b>${totalMCQs}</b><span>Câu trắc nghiệm</span></div>
        <div class="hero__stat"><b>${VSTEP_EXAM_SETS.length}</b><span>Bộ đề Full CBT</span></div>
        <div class="hero__stat"><b>${WRITING.length + totalSpeak}</b><span>Đề Viết &amp; Nói</span></div>
        <div class="hero__stat"><b>6.0</b><span>Mục tiêu chuẩn B2</span></div>
      </div>
    </div>
    <div class="sheet score-sheet">
      <div>
        <div class="score-sheet__title"><span>Tiến độ học tập của bạn</span><span class="tag">Mục tiêu B2</span></div>
        <div class="score-sheet__row"><span class="k">Tổng số câu đã làm</span><span class="v">${total}<small> câu</small></span></div>
        <div class="score-sheet__row"><span class="k">Tỷ lệ chính xác</span><span class="v ${all.pct >= 70 ? "v--green" : all.pct > 0 && all.pct < 50 ? "v--red" : ""}">${all.pct || "0"}<small>%</small></span></div>
        <div class="score-sheet__row"><span class="k">Chuỗi ngày học liên tiếp</span><span class="v">${streak}<small> ngày</small></span></div>
        <div class="score-sheet__row"><span class="k">Giám khảo AI (Viết &amp; Nói)</span><span class="v ${ai ? "v--green" : ""}" style="font-size:15px">${ai ? "Đã kích hoạt" : "Chưa kết nối"}</span></div>
      </div>
      <a class="btn ${ai ? "btn--ghost" : "btn--solid"}" style="width:100%;margin-top:16px" href="#/cai-dat">
        <span>${ai ? "Quản lý cấu hình AI" : "Kết nối API Key Gemini miễn phí"}</span>
      </a>
    </div>
  </section>

  <section style="margin-top:36px">
    <div class="section-head">
      <span class="section-head__no">Lộ trình toàn diện</span>
      <h2>Các học phần luyện tập</h2>
      <span class="section-head__meta">8 học phần chuyên sâu</span>
    </div>
    <div class="mods">
      ${modDefs.map(m => `
        <a class="mod" href="${m[4]}">
          <div class="mod__top">
            <span class="mod__badge">${m[0]}</span>
            <span class="mod__meta">${m[3]}</span>
          </div>
          <h3>${m[1]}</h3>
          <p>${m[2]}</p>
          <div class="mod__foot">
            <span class="mod__go"><span>Bắt đầu học</span>${ICO.next}</span>
          </div>
        </a>`).join("")}
    </div>
  </section>

  <section class="exam-band">
    <div>
      <span class="tag">Mô phỏng phòng thi máy tính (CBT)</span>
      <h3>Làm đề thi thử có bấm giờ, bảng phiếu trả lời trực quan và chấm điểm thang 10 VSTEP.</h3>
    </div>
    <div class="exam-band__meta">
      <div><b>3</b><span>Chế độ đề</span></div>
      <div><b>60p</b><span>Thời lượng</span></div>
      <div><b>10</b><span>Thang điểm</span></div>
    </div>
    <a class="btn btn--paper" href="#/thi-thu"><span>Bắt đầu thi thử</span>${ICO.next}</a>
  </section>

  <section class="dossier">
    <div class="section-head">
      <span class="section-head__no">Phân tích năng lực</span>
      <h2>Thống kê kết quả học tập</h2>
      <span class="section-head__meta">${Store.d.days.length} ngày hoạt động</span>
    </div>
    ${showRemind ? `
    <div class="sheet resume-bar" style="margin-bottom:18px">
      <div class="resume-bar__info">
        <b>Nhắc ôn tập từ Sổ lỗi</b>
        <span>${pendingErr.length ? pendingErr.length + " câu trắc nghiệm chưa chốt" + (staleDays >= 1 ? " · cũ nhất " + staleDays + " ngày" : "") : ""}${pendingErr.length && pendingW.length ? " · " : ""}${pendingW.length ? pendingW.length + " bài viết cần viết lại" : ""} — ôn đều đặn trước khi quên.</span>
      </div>
      <div class="resume-bar__btns"><a class="btn btn--sm btn--solid" href="#/so-loi"><span>Ôn lại ngay</span></a></div>
    </div>` : ""}
    <div class="dossier__grid">
      <div class="dossier__col">
        <h4>Độ chính xác theo từng kỹ năng</h4>
        <div class="acc-rows">
          ${[["Ngữ pháp & Cấu trúc","g"],["Từ vựng học thuật","v"],["Đọc hiểu (Reading)","r"],["Nghe hiểu (Listening)","l"]].map(([name, p]) => {
            const a = Store.accBy(p);
            const ratio = a.total ? (a.pct / 100).toFixed(2) : 0;
            return `<div class="acc-row"><div class="acc-row__top"><span>${name}</span><span>${a.total ? a.pct + "% (" + a.ok + "/" + a.total + " câu)" : "Chưa làm bài"}</span></div>
              <div class="acc-row__bar"><div class="acc-row__fill ${a.total && a.pct < 50 ? "acc-row__fill--red" : a.total && a.pct >= 70 ? "acc-row__fill--green" : ""}" style="transform:scaleX(${ratio})"></div></div></div>`;
          }).join("")}
        </div>
      </div>
      <div class="dossier__col">
        <h4>Lịch sử làm bài thi thử</h4>
        <div class="hist">
          ${Store.d.mocks.length ? Store.d.mocks.slice(0, 6).map(m => `
            <div class="hist-row"><span class="d">${m.date}</span><span class="m">${esc(m.label)}</span><span class="m">${m.timeUsed}</span>
            <span class="pct ${m.pct >= 60 ? "ok" : "no"}">${m.score}/10</span></div>`).join("")
          : '<p class="hist-empty">Bạn chưa hoàn thành bài thi thử nào. Hãy thử sức với Đề nhanh 20 phút để đánh giá trình độ hiện tại.</p>'}
        </div>
      </div>
      <div class="dossier__col dossier__col--wide">
        <h4>Đường tiến trình band điểm</h4>
        <p class="dossier__hint">Điểm /10 của ${chartPts.length} bài thi gần nhất so với ngưỡng B1 (4.0), B2 (6.0) và C1 (8.5). Di chuột lên từng điểm để xem tên đề.</p>
        ${chartPts.length >= 2 ? bandChartSVG(chartPts) : '<p class="hist-empty">Hoàn thành tối thiểu 2 bài thi thử để xem đường tiến trình band điểm của bạn.</p>'}
      </div>
    </div>
  </section>`;
}

/* ================= NGỮ PHÁP ================= */
function viewGrammar(){
  const topics = [...new Set(GRAMMAR.map(q => q.topic))];
  let filter = "all";
  app.innerHTML = moduleHead("Học phần 1", "Ngữ pháp &amp; Cấu trúc B2",
    topics.length + " chuyên đề ngữ pháp cốt lõi của VSTEP B2, từ thì, bị động, điều kiện đến đảo ngữ, câu chẻ và mệnh đề rút gọn. Chọn đáp án để xem giải thích ngay lập tức; câu trả lời sai tự động được lưu vào Sổ lỗi.",
    GRAMMAR.length + " câu trắc nghiệm") + `
    <div class="topic-bar" id="topicBar">
      <button class="chip on" data-t="all">Tất cả chủ đề <span class="n">${GRAMMAR.length}</span></button>
      ${topics.map(t => `<button class="chip" data-t="${esc(t)}">${esc(t)} <span class="n">${GRAMMAR.filter(q => q.topic === t).length}</span></button>`).join("")}
      <button class="btn btn--sm btn--solid" id="gMini" style="margin-left:auto">Mini-test 15 câu · 15 phút</button>
    </div>
    <div id="quizMount"></div>`;
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
  $("#gMini").onclick = () => runMockExam(
    { label: "Mini-test Ngữ pháp (15 câu ngẫu nhiên)", secs: 15 * 60, items: pickN(GRAMMAR, 15).map(mapGQ) },
    { hash: "#/ngu-phap", text: "Quay lại Ngữ pháp" });
  render();
}

/* ================= TỪ VỰNG ================= */
function viewVocab(tab){
  tab = tab || "quiz";
  app.innerHTML = moduleHead("Học phần 2", "Từ vựng B2 &amp; Flashcard",
    "Rèn luyện collocation, phrasal verbs, thành ngữ, cặp từ dễ nhầm và từ vựng theo " + new Set(VOCAB.map(q => q.set)).size + " chủ đề thường gặp trong đề thi, kết hợp thẻ ghi nhớ Flashcard lật 3D theo phương pháp lặp lại ngắt quãng.",
    VOCAB.length + " câu hỏi & " + CARDS.length + " thẻ từ") + `
    <div class="topic-bar">
      <button class="chip ${tab === "quiz" ? "on" : ""}" data-tab="quiz">Luyện câu hỏi trắc nghiệm</button>
      <button class="chip ${tab === "cards" ? "on" : ""}" data-tab="cards">Học thẻ Flashcard 3D</button>
      <span style="font-size:12.5px;color:var(--ink-3);margin-left:auto">Mẹo: Nhấp đúp chuột vào từ tiếng Anh bất kỳ để mở từ điển</span>
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
      <button class="chip on" data-t="all">Tất cả <span class="n">${VOCAB.length}</span></button>
      ${sets.map(s => `<button class="chip" data-t="${esc(s)}">${esc(s)} <span class="n">${VOCAB.filter(q => q.set === s).length}</span></button>`).join("")}
      <button class="btn btn--sm btn--solid" id="vMini" style="margin-left:auto">Mini-test 15 câu · 15 phút</button>
    </div>
    <div id="quizMount"></div>`;
  const mount = $("#quizMount");
  const render = () => mountQuiz(mount, { items: (filter === "all" ? VOCAB : VOCAB.filter(q => q.set === filter))
    .map(q => ({ id: q.id, q: esc(q.q), opts: q.opts.map(esc), a: q.a, ex: q.ex, tag: esc(q.set) })) });
  $$("#setBar .chip").forEach(c => c.onclick = () => {
    $$("#setBar .chip").forEach(x => x.classList.remove("on"));
    c.classList.add("on"); filter = c.dataset.t; render();
  });
  $("#vMini").onclick = () => runMockExam(
    { label: "Mini-test Từ vựng (15 câu ngẫu nhiên)", secs: 15 * 60, items: pickN(VOCAB, 15).map(mapVQ) },
    { hash: "#/tu-vung", text: "Quay lại Từ vựng" });
  render();
}
function vocabCards(){
  let deckMode = "all";
  let deck = CARDS.slice();
  let i = 0, flipped = false;
  const boxOf = c => (Store.d.cards[c.id] || {}).box || 1;
  const nOf = mode => mode === "weak" ? CARDS.filter(c => boxOf(c) <= 1).length
                    : mode === "mid" ? CARDS.filter(c => boxOf(c) === 2).length
                    : mode === "master" ? CARDS.filter(c => boxOf(c) >= 3).length
                    : CARDS.length;
  const buildDeck = () => {
    deck = deckMode === "weak" ? CARDS.filter(c => boxOf(c) <= 1)
         : deckMode === "mid" ? CARDS.filter(c => boxOf(c) === 2)
         : deckMode === "master" ? CARDS.filter(c => boxOf(c) >= 3)
         : CARDS.slice();
    if(i >= deck.length) i = 0;
    flipped = false;
  };
  const deckChips = () => `
    <div class="topic-bar" style="margin-bottom:16px">
      ${[["all", "Tất cả"], ["weak", "Chưa thuộc"], ["mid", "Đang nhớ"], ["master", "Đã thuộc"]]
        .map(([k, l]) => `<button class="chip ${deckMode === k ? "on" : ""}" data-dm="${k}">${l} <span class="n">${nOf(k)}</span></button>`).join("")}
      <button class="btn btn--sm btn--ghost" id="fcShuffle" style="margin-left:auto">${ICO.flip}<span>Trộn thẻ</span></button>
    </div>`;
  const bindDeckChips = () => {
    $$("[data-dm]").forEach(b => b.onclick = () => { deckMode = b.dataset.dm; buildDeck(); render(); });
    if($("#fcShuffle")) $("#fcShuffle").onclick = () => { deck = shuffle(deck); i = 0; flipped = false; render(); };
  };
  const render = () => {
    const c = deck[i];
    const known = Object.keys(Store.d.cards).length;
    const mastered = Object.values(Store.d.cards).filter(x => x.box >= 3).length;
    if(!c){
      $("#vocabBody").innerHTML = deckChips() +
        `<div class="sheet sheet--pad" style="text-align:center;padding:44px"><p style="color:var(--ink-2)">Không có thẻ nào trong nhóm này — chuyển sang nhóm khác.</p></div>`;
      bindDeckChips();
      return;
    }
    $("#vocabBody").innerHTML = deckChips() + `
      <div class="fc-stage">
        <div class="fc-card ${flipped ? "is-flipped" : ""}" id="fcCard" tabindex="0" role="button" aria-label="Thẻ từ vựng ${esc(c.word)}, bấm để lật thẻ">
          <div class="fc-card__inner">
            <div class="fc-face fc-face--front">
              <span class="fc-side">Mặt trước (${i + 1}/${deck.length})</span>
              <span class="fc-box-badge">Hộp ghi nhớ ${boxOf(c)}/3</span>
              <div class="fc-word">${esc(c.word)}</div>
              <div class="fc-pos">${esc(c.pos)}</div>
              <span style="font-size:12.5px;color:var(--ink-3);margin-top:22px">Nhấp vào thẻ để lật xem nghĩa &amp; câu ví dụ</span>
            </div>
            <div class="fc-face fc-face--back">
              <span class="fc-side">Mặt sau (${i + 1}/${deck.length})</span>
              <span class="fc-box-badge">${esc(c.word)} (${esc(c.pos)})</span>
              <div class="fc-vi">${esc(c.vi)}</div>
              <div class="fc-en">“${esc(c.en)}”</div>
            </div>
          </div>
        </div>
      </div>
      <div class="fc-controls">
        <button class="btn btn--ghost" id="fcPrev">${ICO.prev}<span>Thẻ trước</span></button>
        <button class="btn" id="fcFlip">${ICO.flip}<span>Lật thẻ</span></button>
        <button class="btn btn--red" id="fcNo">Chưa nhớ (Về hộp 1)</button>
        <button class="btn btn--green" id="fcYes">Đã nhớ (Tăng hộp)</button>
        <button class="btn btn--ghost" id="fcAudio">${ICO.speaker}<span>Phát âm</span></button>
      </div>
      <p class="fc-count">Đã học: <b>${known}/${CARDS.length}</b> thẻ | Đã thuộc lòng (Hộp 3): <b>${mastered}</b> thẻ</p>`;

    const toggleFlip = () => {
      flipped = !flipped;
      $("#fcCard").classList.toggle("is-flipped", flipped);
    };
    $("#fcCard").onclick = toggleFlip;
    $("#fcCard").onkeydown = e => { if(e.key === " " || e.key === "Enter"){ e.preventDefault(); toggleFlip(); } };
    $("#fcFlip").onclick = toggleFlip;
    $("#fcPrev").onclick = () => { i = (i - 1 + deck.length) % deck.length; flipped = false; render(); };
    $("#fcAudio").onclick = () => {
      fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(c.word))
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(j => { const a = (j[0].phonetics || []).map(p => p.audio).filter(Boolean)[0]; if(a) new Audio(a).play(); else TTS.speak([{v:0,t:c.word}]); })
        .catch(() => TTS.speak([{v:0,t:c.word}]));
    };
    $("#fcYes").onclick = () => { Store.d.cards[c.id] = { box: Math.min(3, boxOf(c) + 1), at: Date.now() }; Store.save(); i = (i + 1) % deck.length; flipped = false; render(); };
    $("#fcNo").onclick = () => { Store.d.cards[c.id] = { box: 1, at: Date.now() }; Store.save(); i = (i + 1) % deck.length; flipped = false; render(); };
    bindDeckChips();
  };
  render();
}

/* ================= ĐỌC HIỂU ================= */
const practiceHL = {};
const HL_TOOLS = `<div class="passage-hltools"><button class="btn btn--sm btn--ghost" id="hlClear" type="button">Xóa đánh dấu</button><span class="hint">Bôi đen đoạn chữ trong bài để đánh dấu</span></div>`;
function viewReading(part, setIdx){
  part = part || "p4";
  setIdx = setIdx || 0;
  const totalP4Qs = ALL_READING_SETS.length * 40;
  const totalReadQs = totalP4Qs + READING_P1.length + READING_P2.length + READING_P3.length;
  app.innerHTML = moduleHead("Học phần 3", "Thư viện Đọc hiểu VSTEP (Reading)",
    "Bao gồm " + ALL_READING_SETS.length + " Bộ đề Reading Full Test (" + (ALL_READING_SETS.length * 4) + " bài đọc dài = " + totalP4Qs + " câu) bóc tách từ Sách 10 bộ đề NXB ĐHQGHN, 5 đề Full Anh ngữ Thiên Ân (VSTEP Collection 20 Mock Tests), PDF ĐH Đồng Tháp, ĐH Ngoại Thương (FTU), EVSTEP, Vivian, ZIM & PREP.",
    totalReadQs + " câu hỏi | " + ALL_READING_SETS.length + " bộ đề chuẩn") + `
    <div class="topic-bar">
      <button class="chip ${part === "p4" ? "on" : ""}" data-p="p4">Kho ${ALL_READING_SETS.length} Bộ đề Full Test (${totalP4Qs} câu)</button>
      <button class="chip ${part === "p1" ? "on" : ""}" data-p="p1">Khởi động 1: Thông báo ngắn</button>
      <button class="chip ${part === "p2" ? "on" : ""}" data-p="p2">Khởi động 2: Đối chiếu đoạn văn</button>
      <button class="chip ${part === "p3" ? "on" : ""}" data-p="p3">Khởi động 3: Điền câu vào đoạn</button>
    </div>
    <div id="readBody"></div>`;
  $$(".chip[data-p]").forEach(c => c.onclick = () => {
    $$(".chip[data-p]").forEach(x => x.classList.remove("on")); c.classList.add("on");
    viewReading(c.dataset.p, setIdx);
  });
  const body = $("#readBody");

  if(part === "p1"){
    body.innerHTML = `<div id="quizMount"></div>`;
    mountQuiz($("#quizMount"), {
      items: READING_P1.map(q => ({ id: q.id, q: esc(q.q), opts: q.opts.map(esc), a: q.a, ex: q.ex, tag: "Thông báo ngắn", src: q.src })),
      getPassage: q => `<h3>Văn bản thông báo</h3><span class="src">${esc(READING_P1.find(x => x.id === q.id).src)}</span><div class="passage-body">${esc(READING_P1.find(x => x.id === q.id).passage).replace(/\n/g, "<br>")}</div>`
    });
  }
  else if(part === "p2"){
    body.innerHTML = `
      <div class="read-split">
        <div class="sheet passage-panel read-split__passage">
          <h3>Bốn hoạt động cuối tuần</h3><span class="src">Đọc 4 đoạn giới thiệu dưới đây và chọn đoạn phù hợp với từng nhận định</span>
          ${HL_TOOLS}
          <div class="p2-texts" id="p2Texts">${READING_P2_TEXTS.map(t => `
            <div class="p2-text"><b>Đoạn ${t.key}: ${esc(t.title)}</b><br>${esc(t.body)}</div>`).join("")}
          </div>
        </div>
        <div class="read-split__qs" id="quizMount"></div>
      </div>`;
    mountReadGroup($("#quizMount"), READING_P2.map(q => ({ id: q.id, q: esc(q.q), opts: q.opts.map(esc), a: q.a, ex: q.ex, tag: "Đối chiếu" })));
    const p2b = $("#p2Texts");
    practiceHL["p2"] = practiceHL["p2"] || [];
    hlApply(p2b, practiceHL["p2"]);
    hlBind(p2b, practiceHL["p2"]);
    $("#hlClear").onclick = () => { practiceHL["p2"].length = 0; hlClearAll(p2b); };
  }
  else if(part === "p3"){
    body.innerHTML = `
      <div class="read-split">
        <div class="sheet passage-panel read-split__passage">
          <h3>${esc(READING_P3_PASSAGE.title)}</h3><span class="src">Chọn câu phù hợp nhất để điền vào mỗi vị trí trống trong bài đọc</span>
          ${HL_TOOLS}
          <div class="passage-body" id="p3PassBody">${esc(READING_P3_PASSAGE.body).replace(/__(\(\d+\))__/g, '<span class="blank-no">$1</span>').replace(/\n/g, "<br>")}</div>
        </div>
        <div class="read-split__qs" id="quizMount"></div>
      </div>`;
    mountReadGroup($("#quizMount"), READING_P3.map(q => ({ id: q.id, q: esc(q.q), opts: q.opts.map(esc), a: q.a, ex: q.ex, tag: "Điền câu" })));
    const p3b = $("#p3PassBody");
    practiceHL["p3"] = practiceHL["p3"] || [];
    hlApply(p3b, practiceHL["p3"]);
    hlBind(p3b, practiceHL["p3"]);
    $("#hlClear").onclick = () => { practiceHL["p3"].length = 0; hlClearAll(p3b); };
  }
  else {
    const curSet = ALL_READING_SETS[setIdx] || ALL_READING_SETS[0];
    let cur = 0;
    body.innerHTML = `
      <div class="sheet sheet--pad" style="margin-bottom:16px;padding:16px 20px">
        <div style="font-size:12.5px;font-weight:700;color:var(--ink-3);margin-bottom:10px">CHỌN BỘ ĐỀ READING (${ALL_READING_SETS.length} BỘ ĐỀ × 40 CÂU = ${totalP4Qs} CÂU):</div>
        <div class="topic-bar" id="rSetBar" style="margin:0">
          ${ALL_READING_SETS.map((s, idx) => `<button class="chip ${idx === setIdx ? "on" : ""}" data-si="${idx}">${esc(s.title.split(":")[0].replace("Đề số ", "Đề "))} <span class="n">40</span></button>`).join("")}
        </div>
        <div style="font-size:13px;color:var(--ink-2);margin-top:10px"><b>Đang mở:</b> ${esc(curSet.title)} — <span style="color:var(--primary);font-weight:600">Nguồn: ${esc(curSet.source)}</span></div>
      </div>
      <div class="topic-bar" id="psBar">
        ${curSet.passages.map((p, i) => `<button class="chip ${i === 0 ? "on" : ""}" data-i="${i}">Passage ${i + 1}: ${esc(p.title.replace(/^PASSAGE \d+\s*[-–]\s*/i, ""))}</button>`).join("")}
      </div>
      <div id="quizMount"></div>`;

    const render = () => {
      const p = curSet.passages[cur];
      $("#quizMount").innerHTML = `
        <div class="read-split">
          <div class="sheet passage-panel read-split__passage">
            <h3>${esc(p.title.replace(/^PASSAGE \d+\s*[-–]\s*/i, "Passage " + (cur + 1) + ": "))}</h3>
            <span class="src">Nguồn: ${esc(curSet.source)}</span>
            ${HL_TOOLS}
            <div class="passage-body">${esc(p.body)}</div>
          </div>
          <div class="read-split__qs" id="rqMount"></div>
        </div>`;
      mountReadGroup($("#rqMount"), p.questions.map(q => {
        const qid = setIdx === 0 ? ("ro" + q.n) : (curSet.id + "_" + q.n);
        return { id: qid, q: esc(q.q), opts: q.opts.map(esc), a: q.a, ex: q.ex, tag: `Đề ${String(setIdx + 1).padStart(2, "0")} | Câu ${q.n}/40`, src: curSet.title.split(":")[0] };
      }));
      const bodyEl = $("#quizMount .passage-body");
      const k = setIdx + ":" + cur;
      practiceHL[k] = practiceHL[k] || [];
      hlApply(bodyEl, practiceHL[k]);
      hlBind(bodyEl, practiceHL[k]);
      const cb = $("#hlClear");
      if(cb) cb.onclick = () => { practiceHL[k].length = 0; hlClearAll(bodyEl); };
    };
    $$("#rSetBar .chip").forEach(b => b.onclick = () => viewReading("p4", +b.dataset.si));
    $$("#psBar .chip").forEach(c => c.onclick = () => { $$("#psBar .chip").forEach(x => x.classList.remove("on")); c.classList.add("on"); cur = +c.dataset.i; render(); });
    render();
  }
}

/* ================= NGHE ================= */
const LISTEN_SET_LABELS = {
  1: "Đề mẫu Bộ GD&ĐT",
  2: "ZIM Full Test (35 câu)",
  3: "PREP Bài giảng học thuật",
  4: "Thiên Ân Test 1 (35 câu)",
  5: "Thiên Ân Test 2 (35 câu)",
  6: "Thiên Ân Test 3 (35 câu)",
  7: "Thiên Ân Test 4 (35 câu)",
  8: "Thiên Ân Test 5 (35 câu)"
};
function viewListening(selSet){
  selSet = selSet || 1;
  const totalListenQs = LISTENING.reduce((s, g) => s + g.qs.length, 0);
  const listenSets = [...new Set(LISTENING.map(g => g.set || 1))].sort((a, b) => a - b);
  const filteredGroups = selSet === "all" ? LISTENING : LISTENING.filter(g => (g.set || 1) === selSet);
  app.innerHTML = moduleHead("Học phần 4", "Thư viện Nghe hiểu VSTEP (Listening)",
    "Trình phát hội thoại & bài giảng bằng hai giọng đọc Nam – Nữ trực tiếp trên trình duyệt. Kho đề gồm " + listenSets.length + " bộ đề nghe thực chiến (tổng cộng " + totalListenQs + " câu hỏi trắc nghiệm kèm lời thoại) — gồm 5 đề Full 35 câu từ Anh ngữ Thiên Ân.",
    totalListenQs + " câu hỏi | " + listenSets.length + " bộ đề") + `
    <div class="topic-bar" id="listenSetBar">
      ${listenSets.map(sn => `<button class="chip ${selSet === sn ? "on" : ""}" data-lset="${sn}">Bộ đề Nghe ${String(sn).padStart(2, "0")}: ${esc(LISTEN_SET_LABELS[sn] || "Bộ đề " + sn)} <span class="n">${LISTENING.filter(g => (g.set || 1) === sn).reduce((s, g) => s + g.qs.length, 0)}</span></button>`).join("")}
      <button class="chip ${selSet === "all" ? "on" : ""}" data-lset="all">Tất cả bài nghe <span class="n">${totalListenQs}</span></button>
    </div>
    <div class="notice" style="margin-bottom:24px">
      <div><b>Hướng dẫn luyện nghe hiệu quả:</b> Trong phòng thi VSTEP thật, thí sinh chỉ được nghe <b>một lần duy nhất</b>. Bạn có thể chọn tốc độ 0.85× khi mới luyện và tăng lên 1.0× khi đã quen nhịp.</div>
    </div>
    <div id="listenBody"></div>`;
  $$("#listenSetBar .chip").forEach(b => b.onclick = () => {
    TTS.stop();
    viewListening(b.dataset.lset === "all" ? "all" : +b.dataset.lset);
  });
  const body = $("#listenBody");
  filteredGroups.forEach(g => {
    const wrap = document.createElement("div");
    wrap.className = "listen-group";
    wrap.innerHTML = `
      <div class="sheet sheet--pad" style="margin-bottom:14px;padding:18px 22px;display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap">
        <div>
          <span class="tag">Part ${g.part} (${g.qs.length} câu)</span>
          <div style="font-size:19px;font-weight:800;margin-top:6px">${esc(g.title)} ${g.official ? officialBadge() : ""}</div>
        </div>
        <div style="display:flex;gap:6px;align-items:center">
          <span style="font-size:12.5px;font-weight:600;color:var(--ink-3);margin-right:4px">Tốc độ đọc:</span>
          <button class="btn btn--sm btn--ghost" data-rate="0.85">0.85×</button>
          <button class="btn btn--sm btn--solid" data-rate="1">1.0×</button>
          <button class="btn btn--sm btn--ghost" data-rate="1.15">1.15×</button>
        </div>
      </div>
      <div class="tape" data-gid="${g.gid}">
        <div class="tape__wave" aria-hidden="true">
          <div class="tape__bar"></div><div class="tape__bar"></div><div class="tape__bar"></div>
          <div class="tape__bar"></div><div class="tape__bar"></div><div class="tape__bar"></div>
        </div>
        <div class="tape__info">
          <b>Trình phát hội thoại: ${esc(g.title)}</b>
          <span id="status-${g.gid}">Sẵn sàng phát âm thanh (2 giọng đọc tiếng Anh)</span>
        </div>
        <div class="tape__ctrl">
          <button class="btn btn--tape btn--sm">${ICO.play}<span>Phát bài nghe</span></button>
          <button class="btn btn--tape btn--sm">${ICO.stop}<span>Dừng</span></button>
          <button class="btn btn--tape btn--sm" data-scr>${ICO.book}<span>Transcript</span></button>
        </div>
      </div>
      <div class="script-box" id="sb-${g.gid}">
        <h5>Lời thoại bài nghe (Transcript) — Chỉ mở sau khi đã chọn đáp án</h5>
        ${g.script.map((l, idx) => `<div class="script-line ${l.v === 2 ? "v2" : l.v === 0 ? "nar" : ""}" data-line="${idx}"><span class="spk">${l.v === 0 ? "Dẫn" : l.v === 1 ? "Nữ" : "Nam"}</span><span>${esc(l.t)}</span></div>`).join("")}
      </div>
      <div style="margin-top:18px" id="q-${g.gid}"></div>`;
    body.appendChild(wrap);
    let rate = 1;
    $$("[data-rate]", wrap).forEach(b => b.onclick = () => {
      rate = +b.dataset.rate;
      $$("[data-rate]", wrap).forEach(x => { x.classList.remove("btn--solid"); x.classList.add("btn--ghost"); });
      b.classList.remove("btn--ghost");
      b.classList.add("btn--solid");
    });
    const tape = $(".tape", wrap);
    const statusEl = $(`#status-${g.gid}`, wrap);
    const [playBtn, stopBtn, scrBtn] = $$(".tape__ctrl .btn", wrap);
    playBtn.onclick = () => {
      TTS.speak(g.script, {
        rate,
        onLine: (lineIdx) => {
          statusEl.textContent = `Đang đọc câu thoại ${lineIdx + 1} / ${g.script.length}…`;
          $$(".script-line", wrap).forEach((el, idx) => el.classList.toggle("active-line", idx === lineIdx));
        },
        onEnd: () => {
          tape.classList.remove("playing");
          statusEl.textContent = "Đã phát xong bài nghe.";
          $$(".script-line", wrap).forEach(el => el.classList.remove("active-line"));
        }
      });
      tape.classList.add("playing");
    };
    stopBtn.onclick = () => {
      TTS.stop();
      tape.classList.remove("playing");
      statusEl.textContent = "Đã dừng phát âm thanh.";
      $$(".script-line", wrap).forEach(el => el.classList.remove("active-line"));
    };
    scrBtn.onclick = () => {
      const sb = $("#sb-" + g.gid);
      sb.classList.toggle("open");
      const on = sb.classList.contains("open");
      scrBtn.classList.toggle("on", on);
      $("span", scrBtn).textContent = on ? "Ẩn transcript" : "Transcript";
      if(on) sb.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };
    mountListenGroup($("#q-" + g.gid), g);
  });
}

/* ================= VIẾT ================= */
/* Ngân hàng ý tưởng vạn năng — triển khai ý khi gặp đề lạ (dùng cho Task 2 & Nói Part 3) */
const IDEA_BANK = [
  ["Giáo dục", [
    ["broadens career prospects and earning potential", "mở rộng cơ hội nghề nghiệp và thu nhập"],
    ["reduces inequality between social groups", "thu hẹp bất bình đẳng giữa các tầng lớp"],
    ["develops critical thinking and problem-solving skills", "rèn tư duy phản biện và kỹ năng giải quyết vấn đề"],
    ["supplies a skilled workforce for the economy", "cung cấp nhân lực chất lượng cho nền kinh tế"]],
    [
    ["high tuition fees place a heavy burden on families", "học phí cao tạo gánh nặng cho gia đình"],
    ["theory-heavy curricula often lack practical skills", "chương trình nặng lý thuyết, thiếu kỹ năng thực hành"],
    ["intense academic pressure harms students' mental health", "áp lực học tập ảnh hưởng sức khỏe tinh thần"],
    ["a degree no longer guarantees stable employment", "tấm bằng không còn đảm bảo việc làm ổn định"]]],
  ["Công nghệ", [
    ["saves time and effort through automation", "tiết kiệm thời gian nhờ tự động hóa"],
    ["widens access to information and public services", "mở rộng tiếp cận thông tin và dịch vụ công"],
    ["creates entirely new industries and jobs", "tạo ra ngành nghề và việc làm hoàn toàn mới"],
    ["connects people regardless of distance", "kết nối con người bất kể khoảng cách"]],
    [
    ["automation replaces manual workers and causes job losses", "máy móc thay thế lao động thủ công gây thất nghiệp"],
    ["excessive screen time weakens face-to-face skills", "dùng màn hình quá nhiều làm giảm kỹ năng giao tiếp trực tiếp"],
    ["raises serious concerns about privacy and data security", "đặt ra lo ngại về riêng tư và an toàn dữ liệu"],
    ["widens the gap between digital haves and have-nots", "nới rộng khoảng cách giữa người có và không có công nghệ"]]],
  ["Môi trường", [
    ["protects public health by reducing pollution", "bảo vệ sức khỏe cộng đồng nhờ giảm ô nhiễm"],
    ["preserves natural resources for future generations", "giữ gìn tài nguyên cho thế hệ sau"],
    ["green industries create sustainable jobs", "công nghiệp xanh tạo việc làm bền vững"],
    ["ecotourism generates income while conserving nature", "du lịch sinh thái tạo thu nhập đồng thời bảo tồn thiên nhiên"]],
    [
    ["green transition raises costs for businesses and consumers", "chuyển đổi xanh làm tăng chi phí cho doanh nghiệp và người tiêu dùng"],
    ["strict environmental rules can slow economic growth", "quy định môi trường nghiêm ngặt có thể làm chậm tăng trưởng"],
    ["eco-friendly habits are inconvenient to maintain", "thói quen thân thiện môi trường khó duy trì vì bất tiện"],
    ["developing regions often lack funding for green policies", "vùng đang phát triển thường thiếu ngân sách cho chính sách xanh"]]],
  ["Sức khỏe", [
    ["healthy citizens are more productive workers", "người dân khỏe mạnh làm việc năng suất hơn"],
    ["prevention is far cheaper than treatment", "phòng bệnh rẻ hơn nhiều so với chữa bệnh"],
    ["improves quality of life and life expectancy", "nâng cao chất lượng sống và tuổi thọ"],
    ["reduces the financial burden on healthcare systems", "giảm gánh nặng tài chính cho hệ thống y tế"]],
    [
    ["healthcare costs strain both family and state budgets", "chi phí y tế đè nặng ngân sách gia đình và nhà nước"],
    ["fast-paced modern life makes healthy habits hard to keep", "nhịp sống nhanh khiến thói quen lành mạnh khó duy trì"],
    ["health campaigns can limit personal freedom of choice", "chiến dịch sức khỏe đôi khi hạn chế tự do lựa chọn cá nhân"],
    ["rural areas still lack access to quality medical services", "vùng nông thôn vẫn thiếu dịch vụ y tế chất lượng"]]],
  ["Kinh tế & Việc làm", [
    ["raises living standards across society", "nâng cao mức sống của toàn xã hội"],
    ["generates tax revenue for public services", "tạo nguồn thuế cho dịch vụ công"],
    ["flexible work improves work-life balance", "làm việc linh hoạt cải thiện cân bằng cuộc sống"],
    ["small businesses drive innovation and local employment", "doanh nghiệp nhỏ thúc đẩy đổi mới và việc làm địa phương"]],
    [
    ["rapid growth often widens the rich-poor gap", "tăng trưởng nhanh thường nới rộng khoảng cách giàu nghèo"],
    ["insecure contracts leave workers without stability", "hợp đồng không ổn định khiến người lao động thiếu an toàn"],
    ["overwork culture damages health and family life", "văn hóa làm việc quá sức hại sức khỏe và đời sống gia đình"],
    ["economic dependence on one sector is risky", "phụ thuộc kinh tế vào một ngành tiềm ẩn rủi ro"]]],
  ["Gia đình & Xã hội", [
    ["strong family support builds emotional resilience", "sự hỗ trợ gia đình tạo sức bật tinh thần"],
    ["community activities reduce loneliness and isolation", "hoạt động cộng đồng giảm cô đơn và cô lập"],
    ["shared values create social stability and trust", "giá trị chung tạo sự ổn định và tin cậy xã hội"],
    ["close-knit neighbourhoods improve safety for children", "khu dân cư gắn kết giúp trẻ em an toàn hơn"]],
    [
    ["generation gaps frequently cause family conflict", "khác biệt thế hệ thường gây mâu thuẫn gia đình"],
    ["social pressure can limit individual freedom", "áp lực xã hội có thể hạn chế tự do cá nhân"],
    ["rapid urbanisation weakens traditional community bonds", "đô thị hóa nhanh làm suy yếu gắn kết cộng đồng truyền thống"],
    ["both parents working means less time with children", "cha mẹ cùng đi làm khiến thời gian bên con bị cắt giảm"]]],
  ["Truyền thông", [
    ["spreads information instantly to a wide audience", "lan truyền thông tin tức thì tới đông đảo công chúng"],
    ["gives ordinary citizens a public voice", "trao tiếng nói công khai cho người dân thường"],
    ["holds organisations and authorities accountable", "giám sát trách nhiệm của tổ chức và chính quyền"],
    ["educational content reaches learners everywhere", "nội dung giáo dục tiếp cận người học ở mọi nơi"]],
    [
    ["fake news misleads the public and spreads panic", "tin giả đánh lừa công chúng và gây hoang mang"],
    ["sensational headlines reduce trust in the media", "tiêu đề giật gân làm giảm niềm tin vào báo chí"],
    ["constant exposure to negative news causes anxiety", "tiếp xúc liên tục tin xấu gây lo âu"],
    ["social media algorithms trap users in echo chambers", "thuật toán mạng xã hội nhốt người dùng trong buồng vang"]]],
  ["Du lịch & Văn hóa", [
    ["tourism creates jobs and boosts local income", "du lịch tạo việc làm và tăng thu nhập địa phương"],
    ["travel broadens horizons and cultural understanding", "đi lại mở rộng tầm nhìn và hiểu biết văn hóa"],
    ["visitor spending helps fund heritage preservation", "chi tiêu của khách giúp tài trợ bảo tồn di sản"],
    ["cultural exchange promotes tolerance between nations", "giao lưu văn hóa thúc đẩy sự khoan dung giữa các quốc gia"]],
    [
    ["overtourism damages fragile natural environments", "du lịch quá tải phá hủy môi trường tự nhiên nhạy cảm"],
    ["commercialisation erodes authentic local culture", "thương mại hóa làm mất bản sắc văn hóa địa phương"],
    ["tourism pushes up prices for local residents", "du lịch đẩy giá sinh hoạt lên cao cho người dân bản địa"],
    ["mass tourism produces large carbon footprints", "du lịch đại trà tạo dấu chân carbon lớn"]]]
];
let ideaKitOpen = false;

function viewWriting(sel, wFilter){
  sel = sel || 0;
  wFilter = wFilter || "all";
  const t = WRITING[sel];
  const officialCount = WRITING.filter(w => w.official).length;
  const t1Count = WRITING.filter(w => w.task === 1).length;
  const t2Count = WRITING.length - t1Count;
  const wIdxs = WRITING.map((_, i) => i).filter(i => wFilter === "all" || (wFilter === "t1" ? WRITING[i].task === 1 : WRITING[i].task === 2));
  app.innerHTML = moduleHead("Học phần 5", "Luyện Viết VSTEP (Writing)",
    "Ngân hàng " + WRITING.length + " đề Viết (" + officialCount + " đề thi thật + " + (WRITING.length - officialCount) + " đề tự biên): Task 1 Thư/Email ≥120 từ và Task 2 Luận văn ≥250 từ. Hệ thống tự động đếm từ, phân tích cục bộ, chấm điểm 4 tiêu chí VSTEP bằng AI và nâng cấp bài viết lên B2/C1.",
    WRITING.length + " đề luyện | 60 phút") + `
    <div class="topic-bar" style="margin:0 0 14px">
      ${[["all", "Tất cả (" + WRITING.length + ")"], ["t1", "Task 1 — Thư/Email (" + t1Count + ")"], ["t2", "Task 2 — Luận văn (" + t2Count + ")"]].map(([k, l]) => `<button class="chip ${wFilter === k ? "on" : ""}" data-wf="${k}">${l}</button>`).join("")}
      <input class="ai-input pick-search" id="wSearch" placeholder="Tìm đề (mã W, chủ đề, nội dung)…" autocomplete="off">
    </div>
    <div class="wtask-picker" id="wPicker">
      ${wIdxs.map(i => { const w = WRITING[i];
        const isReal = /thi thật/i.test(w.type || "");
        const dm = (w.type || "").match(/(\d{2}-\d{2}-\d{4})/);
        const pLine = (w.prompt || "").split("\n")[0].trim();
        const stxt = (w.id + " " + (w.type || "") + " " + pLine).toLowerCase().replace(/["']/g, " ");
        return `
        <button class="wtask ${i === sel ? "on" : ""}" data-i="${i}" data-search="${esc(stxt)}" title="${esc(w.type)} — ${esc(pLine)}">
          <span class="wtask__code">${w.id.toUpperCase()}</span>
          <span class="wtask__name">${esc(isReal ? pLine : w.type)}</span>
          ${w.official ? '<span class="wtask__tag">Đề thật</span>' : ""}
          <span class="wtask__meta">T${w.task} · ${w.time}p · ≥${w.target}t${dm ? " · " + dm[1] : ""}</span>
        </button>`; }).join("")}
    </div>
    <div class="sheet ideakit ${ideaKitOpen ? "open" : ""}" id="ideaKit">
      <button class="ideakit__head" id="ideaKitBtn" type="button">
        <span class="ideakit__title">Bí ý tưởng? Bộ công cụ triển khai ý khi gặp đề lạ <small>· dùng được cho cả Nói Part 3</small></span>
        <span class="ideakit__arrow">▾</span>
      </button>
      <div class="ideakit__body" id="ideaKitBody" ${ideaKitOpen ? "" : "hidden"}>
        <div class="idea-steps">
          <div class="idea-step"><b>1 · Nhận dạng đề (30 giây)</b><p>Gạch chân từ khóa và xác định dạng đề: Opinion (agree/disagree) chọn rõ một phía; Discussion trình bày hai mặt rồi kết luận; Advantages–Disadvantages viết hai đoạn cân bằng; Problem–Solution một đoạn nguyên nhân kèm một đoạn giải pháp.</p></div>
          <div class="idea-step"><b>2 · Vặn ý bằng 3 góc nhìn P-E-S</b><p>Personal: tiền bạc, thời gian, sức khỏe, cảm xúc. Economic: việc làm, chi phí, năng suất. Social: công bằng, môi trường, cộng đồng. Với mỗi góc nhìn tự hỏi: ai được lợi, ai chịu thiệt?</p></div>
          <div class="idea-step"><b>3 · Đảo chiều khi vẫn bí</b><p>Hỏi ngược: "nếu KHÔNG có điều này thì điều gì xảy ra?" để sinh ý phản diện. Hoặc đổi chủ thể từ cá nhân sang gia đình, doanh nghiệp, chính phủ để mở khóa thêm lập luận.</p></div>
          <div class="idea-step"><b>4 · Khóa ý vào khung đoạn</b><p>Mỗi đoạn thân bài: Câu chủ đề → Giải thích vì sao → Ví dụ thực tế → Câu nối quay lại đề. Hai ý triển khai sâu luôn ăn điểm hơn bốn ý liệt kê nông.</p></div>
        </div>
        <div class="idea-bank__label">Ngân hàng ý vạn năng: chọn chủ đề gần đề nhất rồi biến tấu cho khớp đề của bạn</div>
        <div class="topic-bar" id="ideaThemes" style="margin:0 0 10px">
          ${IDEA_BANK.map((t, i) => `<button class="chip ${i === 0 ? "on" : ""}" data-it="${i}">${esc(t[0])}</button>`).join("")}
        </div>
        <div class="idea-cols" id="ideaCols"></div>
      </div>
    </div>
    <div class="write-layout">
      <div class="sheet write-paper">
        <div style="padding:22px 26px 0">
          <span class="tag">Đề bài Task ${t.task} (${t.time} phút | Yêu cầu ≥ ${t.target} từ)</span>
          <div class="prompt-box">${esc(t.prompt).replace(/\n/g, "<br>")}</div>
        </div>
        <textarea id="wArea" placeholder="Nhập bài viết tiếng Anh của bạn tại đây…"></textarea>
        <div class="write-tools">
          <div class="wordmeter" id="wMeter">
            <div><b id="wCountNum">0</b> / ≥${t.target} từ</div>
            <div class="wordmeter__bar"><div class="wordmeter__fill" id="wCountBar" style="transform:scaleX(0)"></div></div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn btn--sm btn--ghost" id="wTimerBtn">${ICO.clock}<span>Đếm ngược ${t.time} phút</span></button>
            <button class="btn btn--sm" id="wLocal">Phân tích cục bộ</button>
            <button class="btn btn--sm btn--solid" id="wAI">Chấm điểm AI theo Rubric</button>
            <button class="btn btn--sm btn--teal" id="wUpgrade">AI nâng cấp lên B2/C1</button>
            <button class="btn btn--sm btn--ghost" id="wDraftDel">Xóa nháp</button>
            <span id="wDraftAt" style="align-self:center;font-size:11.5px;font-weight:600;color:var(--ink-muted)"></span>
          </div>
        </div>
        <div id="wReport" style="padding:0 24px 24px"></div>
      </div>
      <div class="sheet sheet--pad">
        <h4 style="font-size:14px;font-weight:700;color:var(--ink)">Danh sách tự kiểm tra (Checklist)</h4>
        <ul class="checklist" id="wCheck">${t.checklist.map(c => `<li><span class="box">✓</span><span>${esc(c)}</span></li>`).join("")}</ul>
        <hr class="hr-dash">
        <h4 style="font-size:14px;font-weight:700;color:var(--ink)">Cấu trúc câu ăn điểm B2 nên dùng</h4>
        <ul class="phrases">${t.phrases.map(p => `<li>• <i>${esc(p)}</i></li>`).join("")}</ul>
        <hr class="hr-dash">
        <div class="sample" id="wSample">
          <h5>Bài mẫu tham khảo chuẩn B2 (${countWords(t.model)} từ)</h5>
          <div class="body">${esc(t.model).replace(/\n/g, "<br>")}</div>
        </div>
        <button class="btn btn--ghost" id="wSampleBtn" style="margin-top:12px">Xem / Ẩn bài mẫu B2</button>
      </div>
    </div>`;
  $$(".chip[data-wf]").forEach(b => b.onclick = () => {
    const k = b.dataset.wf;
    let idx = sel;
    if(k !== "all" && WRITING[idx].task !== (k === "t1" ? 1 : 2)) idx = WRITING.findIndex(w => w.task === (k === "t1" ? 1 : 2));
    viewWriting(idx, k);
  });
  $$("#wPicker .wtask").forEach(b => b.onclick = () => { $$("#wPicker .wtask").forEach(x => x.classList.remove("on")); b.classList.add("on"); viewWriting(+b.dataset.i, wFilter); });
  if($("#wSearch")) $("#wSearch").oninput = e => {
    const q = e.target.value.trim().toLowerCase();
    $$("#wPicker .wtask").forEach(r => { r.style.display = !q || (r.dataset.search || "").includes(q) ? "" : "none"; });
  };
  $("#ideaKitBtn").onclick = () => {
    ideaKitOpen = !ideaKitOpen;
    $("#ideaKit").classList.toggle("open", ideaKitOpen);
    $("#ideaKitBody").hidden = !ideaKitOpen;
  };
  const renderIdeas = i => {
    const [, pros, cons] = IDEA_BANK[i];
    $("#ideaCols").innerHTML = `
      <div class="idea-col idea-col--pro"><h5>Ý THUẬN: dùng cho mặt ủng hộ</h5><ul>${pros.map(p => `<li><b>${esc(p[0])}</b><span>${esc(p[1])}</span></li>`).join("")}</ul></div>
      <div class="idea-col idea-col--con"><h5>Ý PHẢN / RỦI RO: dùng cho mặt chống hoặc nhượng bộ</h5><ul>${cons.map(p => `<li><b>${esc(p[0])}</b><span>${esc(p[1])}</span></li>`).join("")}</ul></div>`;
  };
  renderIdeas(0);
  $$("#ideaThemes .chip").forEach(b => b.onclick = () => { $$("#ideaThemes .chip").forEach(x => x.classList.remove("on")); b.classList.add("on"); renderIdeas(+b.dataset.it); });
  $$("#wCheck li").forEach(li => li.onclick = () => li.classList.toggle("done"));
  const area = $("#wArea");
  const meter = $("#wMeter");
  const countNum = $("#wCountNum");
  const countBar = $("#wCountBar");
  const upd = () => {
    const n = countWords(area.value);
    const ratio = Math.min(1, n / t.target).toFixed(3);
    countNum.textContent = n;
    countBar.style.transform = `scaleX(${ratio})`;
    meter.classList.toggle("hit", n >= t.target);
  };
  area.oninput = upd; upd();
  const wDk = "b2.wdraft." + t.id;
  const wSavedEl = $("#wDraftAt");
  const prevW = localStorage.getItem(wDk);
  if(prevW !== null && !area.value){ area.value = prevW; upd(); if(wSavedEl) wSavedEl.textContent = "Đã khôi phục nháp của đề " + t.id.toUpperCase(); }
  let wDt = null;
  area.addEventListener("input", () => {
    clearTimeout(wDt);
    wDt = setTimeout(() => {
      try {
        if(area.value.trim()) localStorage.setItem(wDk, area.value);
        else localStorage.removeItem(wDk);
        if(wSavedEl) wSavedEl.textContent = "Nháp tự lưu · " + new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
      } catch(e){}
    }, 700);
  });
  $("#wDraftDel").onclick = () => {
    localStorage.removeItem(wDk); area.value = ""; upd();
    if(wSavedEl) wSavedEl.textContent = "Đã xóa nháp của đề " + t.id.toUpperCase();
  };
  $("#wSampleBtn").onclick = () => { $("#wSample").classList.toggle("open"); };
  let timerInt = null, left = t.time * 60;
  $("#wTimerBtn").onclick = () => {
    if(timerInt){ clearInterval(timerInt); timerInt = null; $("#wTimerBtn").innerHTML = `${ICO.clock}<span>Đếm ngược ${t.time} phút</span>`; return; }
    $("#wTimerBtn").innerHTML = `${ICO.clock}<span>Đang chạy: ${fmtTime(left)}</span>`;
    timerInt = setInterval(() => {
      left--;
      $("#wTimerBtn").innerHTML = `${ICO.clock}<span>Đang chạy: ${fmtTime(left)}</span>`;
      if(left <= 0){ clearInterval(timerInt); timerInt = null; $("#wTimerBtn").textContent = "Hết giờ làm bài!"; }
    }, 1000);
  };
  $("#wLocal").onclick = () => {
    const text = area.value.trim();
    if(countWords(text) < 20){ $("#wReport").innerHTML = '<div class="notice" style="margin-top:14px"><span>Hãy viết tối thiểu 20 từ để công cụ phân tích cấu trúc và từ vựng hoạt động.</span></div>'; return; }
    const r = LocalAnalyzer.writing(text, t);
    $("#wReport").innerHTML = `
      <div class="ai-report">
        <span class="tag">Báo cáo phân tích cục bộ</span>
        <table class="mini-table">${r.metrics.map(m => `<tr><td>${m[0]}</td><td>${m[1]}</td></tr>`).join("")}</table>
        <ul class="tips">${r.tips.map(x => `<li>${x}</li>`).join("")}</ul>
      </div>`;
  };
  $("#wAI").onclick = async () => {
    const text = area.value.trim();
    if(countWords(text) < 30){ $("#wReport").innerHTML = '<div class="notice" style="margin-top:14px"><span>Bài viết cần tối thiểu 30 từ để giám khảo AI chấm điểm chính xác theo 4 tiêu chí.</span></div>'; return; }
    if(!AI.available()){
      $("#wReport").innerHTML = `<div class="notice" style="margin-top:14px"><span>Chưa cấu hình API Key. Hãy kết nối khóa Gemini miễn phí tại <a href="#/cai-dat"><b>trang Cài đặt AI</b></a> để sử dụng tính năng chấm bài chi tiết.</span></div>`;
      return;
    }
    $("#wReport").innerHTML = '<div class="ai-report"><span class="tag">Giám khảo AI đang chấm bài…</span><p style="font-size:13.5px;color:var(--ink-2);margin-top:8px">Đang đối chiếu bài viết với 4 tiêu chí chấm VSTEP (' + esc((AI.cfg().provider || "gemini")) + ')…</p></div>';
    try{
      const out = await AI.gradeWriting(t, text);
      $("#wReport").innerHTML = `<div class="ai-report"><span class="tag">Kết quả chấm của Giám khảo AI (4 tiêu chí VSTEP)</span><div class="ai-md">${mdLite(out)}</div></div>`;
    }catch(e){
      $("#wReport").innerHTML = `<div class="notice" style="margin-top:14px"><span>Lỗi kết nối AI: ${esc(e.message)}</span></div>`;
    }
  };
  $("#wUpgrade").onclick = async () => {
    const text = area.value.trim();
    if(countWords(text) < 20){ $("#wReport").innerHTML = '<div class="notice" style="margin-top:14px"><span>Hãy viết tối thiểu 20 từ để AI có chất liệu nâng cấp bài viết của bạn lên chuẩn B2 và C1.</span></div>'; return; }
    if(!AI.available()){
      $("#wReport").innerHTML = `<div class="notice" style="margin-top:14px"><span>Chưa cấu hình API Key. Hãy kết nối khóa Gemini miễn phí tại <a href="#/cai-dat"><b>trang Cài đặt AI</b></a> để AI nâng cấp bài viết lên B2/C1.</span></div>`;
      return;
    }
    $("#wReport").innerHTML = '<div class="ai-report"><span class="tag">AI đang nâng cấp bài viết lên B2 &amp; C1…</span><p style="font-size:13.5px;color:var(--ink-2);margin-top:8px">Đang giữ nguyên ý tưởng gốc của bạn và viết lại theo chuẩn Band 7.0 (B2) và Band 8.5+ (C1)…</p></div>';
    try{
      const out = await AI.upgradeWriting(t, text);
      $("#wReport").innerHTML = `<div class="ai-report"><span class="tag">Bản nâng cấp bài viết của bạn lên chuẩn B2 &amp; C1</span><div class="ai-md">${mdLite(out)}</div></div>`;
    }catch(e){
      $("#wReport").innerHTML = `<div class="notice" style="margin-top:14px"><span>Lỗi kết nối AI: ${esc(e.message)}</span></div>`;
    }
  };
}

/* ================= NÓI ================= */
function viewSpeaking(part){
  part = part || "p1";
  const totalSpeak = SPEAKING_P1.length + SPEAKING_P2.length + SPEAKING_P3.length;
  app.innerHTML = moduleHead("Học phần 6", "Phòng thu Luyện Nói (Speaking)",
    "Ghi âm trực tiếp trên trình duyệt: nhận diện giọng nói tiếng Anh, đo tốc độ nói (WPM) và từ đệm, kết hợp AI chấm theo rubric VSTEP, nâng cấp bài nói lên B2/C1 hoặc gợi ý ý tưởng khi bí.",
    totalSpeak + " chủ đề & 6 mẫu câu cứu nguy") + `
    <div class="topic-bar">
      ${[["p1","Phần 1: Hỏi đáp xã giao (3p)"],["p2","Phần 2: Thảo luận giải pháp (4p)"],["p3","Phần 3: Phát triển chủ đề (5p)"],["rescue","Mẫu câu cứu nguy khi bí ý"]].map(([k, l]) => `<button class="chip ${part === k ? "on" : ""}" data-p="${k}">${l}</button>`).join("")}
    </div>
    <div id="speakBody"></div>`;
  $$(".chip[data-p]").forEach(c => c.onclick = () => { $$(".chip[data-p]").forEach(x => x.classList.remove("on")); c.classList.add("on"); viewSpeaking(c.dataset.p); });
  const body = $("#speakBody");

  if(part === "rescue"){
    body.innerHTML = `
      <div class="sheet sheet--pad">
        <span class="tag">Kỹ năng xử lý tình huống phòng thi</span>
        <h2 style="font-size:24px;margin:10px 0 4px">Nguyên tắc vàng: Không để khoảng lặng chết.</h2>
        <p style="color:var(--ink-2)">Trong phòng thi Speaking, giữ sự trôi chảy (Fluency) quan trọng hơn việc tìm một ý tưởng hoàn hảo. Sử dụng các mẫu câu tự nhiên dưới đây để có thêm thời gian suy nghĩ.</p>
      </div>
      <div class="rescue-grid" style="margin-top:18px">
      ${SPEAKING_RESCUE.map(r => `
        <div class="sheet sheet--pad rescue-card">
          <span class="tag">Tình huống thường gặp</span>
          <h4>${esc(r.when)}</h4>
          <p>${esc(r.how)}</p>
          <div class="rescue-phrase">“${esc(r.phrase)}”</div>
        </div>`).join("")}
      </div>`;
    return;
  }

  const ITEMS = part === "p1" ? SPEAKING_P1 : part === "p2" ? SPEAKING_P2 : SPEAKING_P3;
  let cur = 0;
  body.innerHTML = `
    <div class="topic-bar" style="margin:0 0 10px">
      <input class="ai-input pick-search" id="spSearch" placeholder="Tìm chủ đề (mã S, từ khóa, ngày thi)…" autocomplete="off">
    </div>
    <div class="wtask-picker" id="spBar" style="max-height:250px;margin-bottom:16px">
      ${ITEMS.map((x, i) => {
        const tp = x.topic || "";
        const dm = tp.match(/đề thi thật\s*([\d-]+)/i);
        const isReal = /đề thi thật/i.test(tp);
        const nm = tp.replace(/\s*—\s*đề thi thật.*$/i, "").replace(/\s*\([^)]*\)\s*$/, "");
        const meta = dm ? dm[1] : part === "p1" ? ((x.questions || []).length + " câu") : part === "p2" ? "3 phương án" : (x.mindmap ? x.mindmap.branches.length + " nhánh" : "");
        const stxt = ((x.id || "") + " " + tp + " " + (x.situation || "")).toLowerCase().replace(/["']/g, " ");
        return `<button class="wtask ${i === 0 ? "on" : ""}" data-i="${i}" data-search="${esc(stxt)}" title="${esc(tp)}">
          <span class="wtask__code">${esc((x.id || "s" + i).toUpperCase())}</span>
          <span class="wtask__name">${esc(nm)}</span>
          ${isReal ? '<span class="wtask__tag">Đề thật</span>' : ""}
          <span class="wtask__meta">${esc(meta)}</span>
        </button>`; }).join("")}
    </div>
    <div id="spContent"></div>`;
  $("#spSearch").oninput = e => {
    const q = e.target.value.trim().toLowerCase();
    $$("#spBar .wtask").forEach(r => { r.style.display = !q || (r.dataset.search || "").includes(q) ? "" : "none"; });
  };
  const renderOne = () => {
    const it = ITEMS[cur];
    const mapHtml = it.mindmap ? `
      <div class="mindmap">
        <span style="font-size:12px;font-weight:700;color:var(--primary)">Sơ đồ tư duy (Triển khai 3 ý có sẵn + 1 ý cá nhân)</span>
        <div class="mindmap__wrap">
          <div class="mindmap__center">${esc(it.mindmap.center)}</div>
          <div class="mindmap__branches">${it.mindmap.branches.map(b => `<div class="mindmap__branch">${esc(b)}</div>`).join("")}</div>
        </div>
      </div>` : "";
    const followHtml = it.followups ? `<div style="font-size:13px;font-weight:700;color:var(--ink);margin:16px 0 6px">Câu hỏi thảo luận mở rộng:</div><ul class="phrases">${it.followups.map(f => `<li>• <i>${esc(f)}</i></li>`).join("")}</ul>` : "";
    const pointsHtml = it.points ? `<ul class="checklist">${it.points.map(p => `<li><span class="box">✓</span><span>${esc(p)}</span></li>`).join("")}</ul>` : "";
    const qsHtml = it.questions ? `<ul class="phrases">${it.questions.map(q => `<li>• <i>${esc(q)}</i></li>`).join("")}</ul>` : "";

    $("#spContent").innerHTML = `
      <div class="speak-layout">
        <div>
          <div class="sheet cue-card">
            <span class="lbl">Part ${part === "p1" ? "1: Social Interaction" : part === "p2" ? "2: Solution Discussion" : "3: Topic Development"}</span>
            <h3>${esc(it.topic)} ${it.official ? officialBadge() : ""}</h3>
            ${it.situation ? `<p style="margin-bottom:12px;color:var(--ink-2)"><b>Tình huống:</b> ${esc(it.situation)}</p>` : ""}
            ${qsHtml}${pointsHtml}${mapHtml}${followHtml}
          </div>
          ${part === "p2" ? `<div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
            <button class="btn btn--solid" id="spRescue">Gợi ý hướng trả lời bằng AI</button>
            <button class="btn btn--ghost" id="spPrep">${ICO.clock}<span>Bấm giờ chuẩn bị 60 giây</span></button></div>` : ""}
        </div>
        <div>
          <div class="sheet rec-panel" id="recPanel">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
              <span style="font-size:13.5px;font-weight:700;color:var(--ink)"><span class="rec-dot"></span>Phòng thu &amp; Nhận diện giọng nói</span>
              <span class="rec-time" id="recTime">00:00</span>
            </div>
            ${STT.supported ? `
              <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">
                <button class="btn btn--red" id="recStart">${ICO.mic}<span>Bắt đầu thu âm</span></button>
                <button class="btn btn--ghost" id="recStop">${ICO.stop}<span>Dừng &amp; Phân tích</span></button>
              </div>
              <div class="stt-box" id="sttBox">Lời nói tiếng Anh của bạn sẽ được chuyển thành văn bản trực tiếp tại đây (en-US).</div>
              <div id="recReport"></div>`
            : `<div class="notice" style="margin-top:12px"><span>Trình duyệt hiện tại chưa hỗ trợ Web Speech API. Bạn hãy mở bằng Google Chrome hoặc Microsoft Edge để thu âm chuyển giọng nói thành văn bản.</span></div>`}
          </div>
          <div class="sheet sheet--pad" style="margin-top:18px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <h4 style="font-size:14px;font-weight:700;margin:0">Bài nói mẫu chuẩn B2</h4>
              <button class="btn btn--sm btn--ghost" id="spSampleBtn">Xem / Ẩn bài mẫu</button>
            </div>
            <div class="sample" id="spSample" style="display:none;margin-top:12px">
              <div class="body" style="display:block">${esc(it.sample).replace(/\n/g, "<br>")}</div>
            </div>
            <div class="notice" style="margin-top:14px"><span><b>Mẹo phòng thi:</b> ${esc(it.tip)}</span></div>
          </div>
        </div>
      </div>`;
    $$("#spBar .wtask").forEach((x, i) => x.classList.toggle("on", i === cur));
    const onSp = $("#spBar .wtask.on"); if(onSp) onSp.scrollIntoView({ block: "nearest" });
    $$("#spBar .wtask").forEach(c => c.onclick = () => { if(window.recRunning) stopRec(true); cur = +c.dataset.i; renderOne(); });
    $("#spSampleBtn").onclick = () => { const s = $("#spSample"); s.style.display = s.style.display === "none" ? "block" : "none"; };
    if($("#spPrep")) $("#spPrep").onclick = () => {
      let s = 60; const b = $("#spPrep");
      b.textContent = "Thời gian chuẩn bị: 01:00"; b.disabled = true;
      const iv = setInterval(() => { s--; b.textContent = "Thời gian chuẩn bị: " + fmtTime(s); if(s <= 0){ clearInterval(iv); b.textContent = "Hết 60 giây — Bắt đầu nói!"; b.disabled = false; TTS.speak([{v:0,t:"Time is up. Please begin speaking."}]); } }, 1000);
    };
    if($("#spRescue")) $("#spRescue").onclick = async () => {
      const mount = $("#recReport");
      if(!AI.available()){ mount.innerHTML = '<div class="notice" style="margin-top:14px"><span>Tính năng sinh ý tưởng tự động cần kết nối API Key tại <a href="#/cai-dat"><b>Cài đặt AI</b></a>.</span></div>'; return; }
      mount.innerHTML = '<div class="ai-report"><span class="tag">AI đang chuẩn bị gợi ý…</span></div>';
      try{
        const out = await AI.rescueIdeas(it.topic, part === "p2" ? 2 : part === "p3" ? 3 : 1);
        mount.innerHTML = `<div class="ai-report"><span class="tag">Gợi ý triển khai chủ đề: ${esc(it.topic)}</span><div class="ai-md">${mdLite(out)}</div></div>`;
      }catch(e){ mount.innerHTML = `<div class="notice" style="margin-top:14px"><span>Lỗi AI: ${esc(e.message)}</span></div>`; }
    };

    let t0 = 0, timerInt = null;
    window.recRunning = false;
    const timeEl = $("#recTime"), box = $("#sttBox"), panel = $("#recPanel"), report = $("#recReport");
    function startRec(){
      window.recRunning = true; t0 = Date.now();
      panel.classList.add("recording");
      timerInt = setInterval(() => { timeEl.textContent = fmtTime((Date.now() - t0) / 1000); }, 250);
      STT.start((fin, inter) => { box.innerHTML = esc(fin) + '<i style="color:var(--ink-3)"> ' + esc(inter) + "</i>"; box.scrollTop = box.scrollHeight; });
    }
    function stopRec(silent){
      window.recRunning = false;
      clearInterval(timerInt);
      panel.classList.remove("recording");
      const dur = (Date.now() - t0) / 1000;
      const text = STT.stop();
      if(silent) return;
      const m = LocalAnalyzer.speaking(text, dur);
      report.innerHTML = `
          <div class="ai-report">
          <span class="tag">Chỉ số giọng nói (${fmtTime(dur)})</span>
          <table class="mini-table">
            <tr><td>Tốc độ nói</td><td>${m.wpm} từ/phút (Mức chuẩn B2: 100–150)</td></tr>
            <tr><td>Tổng số từ</td><td>${m.words} từ</td></tr>
            <tr><td>Từ đệm phát hiện</td><td>${m.fillers} lần</td></tr>
            <tr><td>Từ nối học thuật</td><td>${m.conn} loại</td></tr>
          </table>
          <ul class="tips">${m.tips.map(x => `<li>${x}</li>`).join("")}</ul>
          ${AI.available() ? `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
            <button class="btn btn--solid btn--sm" id="spAI"><span>Chấm bài nói bằng AI theo Rubric</span>${ICO.next}</button>
            <button class="btn btn--teal btn--sm" id="spUpgrade"><span>AI nâng cấp bài nói lên B2/C1</span></button>
          </div>` : '<p style="font-size:12.5px;color:var(--ink-3);margin-top:10px">Kết nối API Key ở mục Cài đặt AI để chấm chi tiết và nâng cấp bài nói lên B2/C1.</p>'}
        </div>`;
      const aiBtn = $("#spAI");
      if(aiBtn) aiBtn.onclick = async () => {
        aiBtn.disabled = true; aiBtn.textContent = "Giám khảo AI đang phân tích…";
        try{
          const out = await AI.gradeSpeaking({ topic: it.topic, part: part === "p1" ? 1 : part === "p2" ? 2 : 3, situation: it.situation, mindmap: it.mindmap, followups: it.followups, questions: it.questions }, text, m);
          report.insertAdjacentHTML("beforeend", `<div class="ai-report" style="margin-top:12px"><span class="tag">Nhận xét từ Giám khảo AI</span><div class="ai-md">${mdLite(out)}</div></div>`);
          aiBtn.textContent = "Chấm lại bằng AI"; aiBtn.disabled = false;
        }catch(e){
          report.insertAdjacentHTML("beforeend", `<div class="notice" style="margin-top:10px"><span>Lỗi AI: ${esc(e.message)}</span></div>`);
          aiBtn.textContent = "Thử lại"; aiBtn.disabled = false;
        }
      };
      const upBtn = $("#spUpgrade");
      if(upBtn) upBtn.onclick = async () => {
        if(countWords(text) < 10){ report.insertAdjacentHTML("beforeend", `<div class="notice" style="margin-top:10px"><span>Cần tối thiểu 10 từ trong bản ghi âm để AI nâng cấp lên B2/C1.</span></div>`); return; }
        upBtn.disabled = true; upBtn.textContent = "AI đang nâng cấp lên B2/C1…";
        try{
          const out = await AI.upgradeSpeaking({ topic: it.topic, part: part === "p1" ? 1 : part === "p2" ? 2 : 3 }, text);
          report.insertAdjacentHTML("beforeend", `<div class="ai-report" style="margin-top:12px"><span class="tag">Bản nâng cấp bài nói lên chuẩn B2 &amp; C1</span><div class="ai-md">${mdLite(out)}</div></div>`);
          upBtn.textContent = "Đã nâng cấp B2/C1"; upBtn.disabled = false;
        }catch(e){
          report.insertAdjacentHTML("beforeend", `<div class="notice" style="margin-top:10px"><span>Lỗi AI: ${esc(e.message)}</span></div>`);
          upBtn.textContent = "Thử lại nâng cấp"; upBtn.disabled = false;
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
const EXAM_GROUP_ORDER = ["Đề gốc & Thực chiến", "Sách NXB ĐHQGHN", "Anh ngữ Thiên Ân", "Đề tự biên — Phòng thi B2"];

function examGroupOf(e){
  const t = ((e.badge || "") + " " + (e.source || "")).toLowerCase();
  if (t.includes("tự biên")) return "Đề tự biên — Phòng thi B2";
  if (t.includes("thiên ân")) return "Anh ngữ Thiên Ân";
  if (t.includes("đhqghn") || t.includes("quốc gia hà nội")) return "Sách NXB ĐHQGHN";
  return "Đề gốc & Thực chiến";
}

function examCellSub(e){
  const m = (e.name || "").match(/\(([^)]{4,80})\)/);
  return m ? m[1] : (e.badge || "");
}

function viewMock(selExamIdx, selGroup){
  selExamIdx = selExamIdx !== undefined ? selExamIdx : 0;
  selGroup = selGroup || "*";
  const ex = VSTEP_EXAM_SETS[selExamIdx] || VSTEP_EXAM_SETS[0];
  const rSet = ALL_READING_SETS[ex.readingSetIndex] || ALL_READING_SETS[0];
  const lGroups = LISTENING.filter(g => (g.set || 1) === ex.listeningSet);
  const lCount = lGroups.reduce((s, g) => s + g.qs.length, 0);

  const examGroups = {};
  VSTEP_EXAM_SETS.forEach((item, i) => {
    const g = examGroupOf(item);
    (examGroups[g] = examGroups[g] || []).push(i);
  });
  const groupNames = [
    ...EXAM_GROUP_ORDER.filter(g => examGroups[g]),
    ...Object.keys(examGroups).filter(g => !EXAM_GROUP_ORDER.includes(g))
  ];
  const visIdxs = selGroup === "*" ? VSTEP_EXAM_SETS.map((_, i) => i) : (examGroups[selGroup] || []);

  app.innerHTML = moduleHead("Phòng thi CBT", "Thi thử VSTEP B2 trên máy tính (Kho " + VSTEP_EXAM_SETS.length + " Bộ đề)",
    "Chọn 1 trong " + VSTEP_EXAM_SETS.length + " Bộ đề thi thực chiến được bóc tách từ Sách 10 bộ đề NXB ĐHQGHN, 5 đề Full 4 kỹ năng Anh ngữ Thiên Ân (VSTEP Collection 20 Mock Tests), PDF các trường đại học (ĐH Đồng Tháp, ĐH Ngoại Thương FTU) và các hệ thống luyện thi lớn (EVSTEP, Vivian, ZIM, PREP).",
    VSTEP_EXAM_SETS.length + " bộ đề Full 4 kỹ năng") + `
    <div class="sheet exam-picker">
      <div class="exam-picker__top">
        <span class="exam-picker__title">Chọn mã bộ đề trước khi vào phòng thi</span>
        <input class="ai-input pick-search" id="exSearch" placeholder="Tìm đề (mã, nguồn)…" autocomplete="off">
        <span class="exam-picker__total">${VSTEP_EXAM_SETS.length} bộ đề</span>
      </div>
      <div class="exam-picker__tabs">
        <button class="exam-tab ${selGroup === "*" ? "on" : ""}" data-grp="*">Tất cả <b>${VSTEP_EXAM_SETS.length}</b></button>
        ${groupNames.map(g => `<button class="exam-tab ${selGroup === g ? "on" : ""}" data-grp="${esc(g)}">${esc(g)} <b>${examGroups[g].length}</b></button>`).join("")}
      </div>
      <div class="exam-grid" id="mockExamPicker">
        ${visIdxs.map(i => { const item = VSTEP_EXAM_SETS[i]; return `
          <button class="exam-cell ${i === selExamIdx ? "on" : ""}" data-exi="${i}" data-search="${esc((item.code + " " + item.name + " " + item.source).toLowerCase().replace(/["']/g, " "))}">
            <span class="exam-cell__code">${esc(item.code)}</span>
            <span class="exam-cell__sub">${esc(examCellSub(item))}</span>
          </button>`; }).join("")}
      </div>
      <div class="exam-picker__cur">
        <span><b>Bộ đề đang chọn:</b> ${esc(ex.code)} — ${esc(ex.name)}</span>
        <span style="color:var(--primary);font-weight:600">Nguồn: ${esc(ex.source)}</span>
      </div>
    </div>

    ${(() => {
      try {
        const d = JSON.parse(localStorage.getItem(CBT_DRAFT_KEY) || "null");
        if(!d) return "";
        const dex = VSTEP_EXAM_SETS[d.examIdx];
        if(!dex) return "";
        const stageNames = ["Nghe hiểu", "Đọc hiểu", "Viết", "Nói"];
        const done = (d.listenPicks || []).filter(v => v !== null && v !== undefined).length + (d.readPicks || []).filter(v => v !== null && v !== undefined).length;
        return `<div class="sheet resume-bar">
          <div class="resume-bar__info">
            <b>Bài thi dở đang được lưu: ${esc(dex.code)} — ${esc(dex.name)}</b>
            <span>Đang ở phần ${stageNames[d.stageIdx] || ""} · còn ${fmtTime(d.stageLeft)} · đã làm ${done} câu trắc nghiệm · lưu lúc ${new Date(d.savedAt).toLocaleString("vi-VN")}</span>
          </div>
          <div class="resume-bar__btns">
            <button class="btn btn--solid btn--sm" id="cbtResume"><span>Tiếp tục làm bài</span>${ICO.next}</button>
            <button class="btn btn--ghost btn--sm" id="cbtDraftDel">Xóa bài dở</button>
          </div>
        </div>`;
      } catch(e){ return ""; }
    })()}

    <div class="cbt-featured">
      <div style="flex:1;min-width:280px">
        <span class="tag" style="background:rgba(56,189,248,0.16);border-color:rgba(56,189,248,0.35);color:#BAE6FD">${esc(ex.code)} • ${esc(ex.badge)} (Full 4 Kỹ năng CBT)</span>
        <h2>Thi chuẩn VSTEP 4 kỹ năng: ${esc(ex.name)}</h2>
        <p>Làm lần lượt 4 kỹ năng như phần mềm thi thật: tự động chấm Nghe (${lCount} câu) &amp; Đọc (40 câu), kết hợp Giám khảo AI chấm tự động 2 bài Viết và 3 phần Nói để xuất bảng điểm VSTEP B1 / B2 / C1.</p>
        <div class="cbt-pillars">
          <div class="cbt-pillar"><b>1. Nghe (Listening)</b><span>Đề nghe ${String(ex.listeningSet).padStart(2, "0")} • ${lCount} câu • 40p</span></div>
          <div class="cbt-pillar"><b>2. Đọc (Reading)</b><span>4 Passage • 40 câu • 60p</span></div>
          <div class="cbt-pillar"><b>3. Viết (Writing)</b><span>Task 1 &amp; 2 (${ex.w1Id.toUpperCase()}/${ex.w2Id.toUpperCase()}) • 60p</span></div>
          <div class="cbt-pillar"><b>4. Nói (Speaking)</b><span>Part 1, 2, 3 (${ex.s1Id.toUpperCase()}-${ex.s3Id.toUpperCase()}) • 12p</span></div>
        </div>
      </div>
      <div>
        <button class="btn btn--paper" id="startFullCBT" style="padding:14px 24px;font-size:14.5px">
          <span>Vào thi ${esc(ex.code)} (4 kỹ năng)</span>${ICO.next}
        </button>
      </div>
    </div>

    <div class="section-head" style="margin-top:28px">
      <span class="section-head__no">Thi trắc nghiệm riêng</span>
      <h2 style="font-size:21px">Chế độ luyện đề rút gọn (Áp dụng cho ${esc(ex.code)})</h2>
    </div>
    <div class="mock-cards">
      <button class="mock-opt" data-mode="quick">
        <span class="t">Đề khởi động nhanh</span>
        <h3>20 câu / 20 phút</h3>
        <p>Kết hợp Ngữ pháp, Từ vựng và Đọc hiểu phần 1–2. Phù hợp để ôn luyện nhanh mỗi ngày.</p>
        <span class="meta">Bắt đầu làm đề 20 phút</span>
      </button>
      <button class="mock-opt" data-mode="standard">
        <span class="t">Đề tổng hợp (${esc(ex.code)})</span>
        <h3>50 câu / 60 phút</h3>
        <p>10 câu ngữ pháp + 10 câu từ vựng + 10 câu đọc ngắn + 20 câu từ 2 Passage của ${esc(ex.code)}.</p>
        <span class="meta">Bắt đầu làm đề 60 phút</span>
      </button>
      <button class="mock-opt" data-mode="reading">
        <span class="t">Đề Reading 40 câu (${esc(ex.code)})</span>
        <h3>40 câu / 60 phút</h3>
        <p>Trọn bộ 4 Passage (40 câu) của <b>${esc(rSet.title)}</b> kèm đáp án và giải thích chi tiết.</p>
        <span class="meta">Làm đề Reading ${esc(ex.code)}</span>
      </button>
    </div>
    <p style="font-size:13px;color:var(--ink-3);margin-top:16px">Quy chế tính điểm chuẩn VSTEP: Điểm trung bình 4 kỹ năng làm tròn đến 0.5 — Từ <b>4.0–5.5</b> đạt B1, từ <b>6.0–8.0</b> đạt B2, từ <b>8.5–10.0</b> đạt C1.</p>`;

  $$(".exam-tab").forEach(b => b.onclick = () => {
    const g = b.dataset.grp;
    let idx = selExamIdx;
    if (g !== "*" && !(examGroups[g] || []).includes(idx)) idx = examGroups[g][0];
    viewMock(idx, g);
  });
  $$("#mockExamPicker .exam-cell").forEach(b => b.onclick = () => viewMock(+b.dataset.exi, selGroup));
  if($("#exSearch")) $("#exSearch").oninput = e => {
    const q = e.target.value.trim().toLowerCase();
    $$("#mockExamPicker .exam-cell").forEach(r => { r.style.display = !q || (r.dataset.search || "").includes(q) ? "" : "none"; });
  };
  if($("#cbtResume")) $("#cbtResume").onclick = () => {
    try{ const d = JSON.parse(localStorage.getItem(CBT_DRAFT_KEY) || "null"); if(d) runFullCBTExam(d.examIdx, d); }catch(e){}
  };
  if($("#cbtDraftDel")) $("#cbtDraftDel").onclick = () => {
    localStorage.removeItem(CBT_DRAFT_KEY);
    viewMock(selExamIdx, selGroup);
  };
  $("#startFullCBT").onclick = () => {
    try{
      const d = JSON.parse(localStorage.getItem(CBT_DRAFT_KEY) || "null");
      if(d){
        const dCode = (VSTEP_EXAM_SETS[d.examIdx] || {}).code || "đề khác";
        const msg = d.examIdx === selExamIdx
          ? "Bạn đang có bài thi dở của đề này. Bắt đầu lại từ đầu sẽ XÓA bài dở — tiếp tục?"
          : "Bạn đang có bài thi dở của " + dCode + ". Bắt đầu đề mới sẽ GHI ĐÈ bài dở đó — tiếp tục?";
        if(!confirm(msg)) return;
      }
    }catch(e){}
    runFullCBTExam(selExamIdx);
  };
  $$(".mock-opt").forEach(b => b.onclick = () => runMock(b.dataset.mode, selExamIdx));
}

/* ================= PHÒNG THI FULL 4 KỸ NĂNG CHUẨN CBT ================= */
function runFullCBTExam(examIdx, draft){
  const ex = VSTEP_EXAM_SETS[examIdx || 0] || VSTEP_EXAM_SETS[0];
  const rSet = ALL_READING_SETS[ex.readingSetIndex] || ALL_READING_SETS[0];

  /* Chuẩn bị dữ liệu 4 kỹ năng theo đúng Mã Bộ Đề đã chọn */
  const listenGroups = LISTENING.filter(g => (g.set || 1) === ex.listeningSet);
  const listenQs = listenGroups.flatMap(g => g.qs.map(q => ({ ...q, gid: g.gid, part: g.part, groupTitle: g.title })));
  const listenPicks = draft && Array.isArray(draft.listenPicks) && draft.listenPicks.length === listenQs.length
    ? draft.listenPicks.map(v => (v === null || v === undefined) ? undefined : v)
    : new Array(listenQs.length).fill(undefined);

  const readPassages = rSet.passages;
  const readQs = readPassages.flatMap((p, pi) => p.questions.map(q => ({
    id: (ex.readingSetIndex === 0 ? "ro" + q.n : rSet.id + "_" + q.n),
    n: q.n, pi, passageTitle: p.title, q: q.q, opts: q.opts,
    a: q.a, ex: q.ex
  })));
  const readPicks = draft && Array.isArray(draft.readPicks) && draft.readPicks.length === readQs.length
    ? draft.readPicks.map(v => (v === null || v === undefined) ? undefined : v)
    : new Array(readQs.length).fill(undefined);
  const readFlags = draft && Array.isArray(draft.readFlags) && draft.readFlags.length === readQs.length
    ? draft.readFlags.map(Boolean)
    : new Array(readQs.length).fill(false);

  const w1Task = WRITING.find(w => w.id === ex.w1Id) || WRITING[0];
  const w2Task = WRITING.find(w => w.id === ex.w2Id) || WRITING.find(w => w.task === 2);
  const writeData = draft && draft.writeData ? { w1: draft.writeData.w1 || "", w2: draft.writeData.w2 || "", activeTask: draft.writeData.activeTask === 2 ? 2 : 1 } : { w1: "", w2: "", activeTask: 1 };

  const s1Item = SPEAKING_P1.find(s => s.id === ex.s1Id) || SPEAKING_P1[0];
  const s2Item = SPEAKING_P2.find(s => s.id === ex.s2Id) || SPEAKING_P2[0];
  const s3Item = SPEAKING_P3.find(s => s.id === ex.s3Id) || SPEAKING_P3[0];
  const speakData = draft && draft.speakData ? { s1: draft.speakData.s1 || "", s2: draft.speakData.s2 || "", s3: draft.speakData.s3 || "", activePart: [1, 2, 3].includes(draft.speakData.activePart) ? draft.speakData.activePart : 1 } : { s1: "", s2: "", s3: "", activePart: 1 };
  const speakBlobs = { 1: null, 2: null, 3: null };
  let stopSpeakCapture = () => {};

  const STAGES = [
    { key: "listening", name: "1. Nghe hiểu", secs: 40 * 60 },
    { key: "reading", name: "2. Đọc hiểu", secs: 60 * 60 },
    { key: "writing", name: "3. Viết (2 bài)", secs: 60 * 60 },
    { key: "speaking", name: "4. Nói (3 phần)", secs: 12 * 60 }
  ];
  let stageIdx = draft ? Math.min(Math.max(+draft.stageIdx || 0, 0), STAGES.length - 1) : 0;
  let stageLeft = draft ? Math.min(Math.max(+draft.stageLeft || 60, 5), STAGES[stageIdx].secs) : STAGES[0].secs;
  let totalElapsed = draft ? (+draft.totalElapsed || 0) : 0;
  let readCurPassage = draft ? Math.min(Math.max(+draft.readCurPassage || 0, 0), readPassages.length - 1) : 0;
  let listenCurGroup = draft ? Math.min(Math.max(+draft.listenCurGroup || 0, 0), listenGroups.length - 1) : 0;
  const readHL = draft && draft.readHL || {};
  let submitted = false;

  const saveDraft = () => {
    if(submitted) return;
    try{
      localStorage.setItem(CBT_DRAFT_KEY, JSON.stringify({
        v: 1, examIdx: examIdx || 0, stageIdx, stageLeft, totalElapsed,
        listenCurGroup, readCurPassage, listenPicks, readPicks, readFlags,
        readHL, writeData, speakData, savedAt: Date.now()
      }));
      const el = $("#cbtSavedAt");
      if(el) el.textContent = "Đã lưu nháp · " + new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    }catch(e){}
  };
  window.__cbtSave = saveDraft;
  window.onbeforeunload = e => { if(!submitted){ e.preventDefault(); e.returnValue = ""; } };

  app.innerHTML = `
    <div class="cbt-bar">
      <div class="cbt-bar__top">
        <div class="cbt-stepper" id="cbtStepper">
          ${STAGES.map((st, i) => `
            <button class="cbt-step ${i === 0 ? "on" : ""}" data-st="${i}">
              <span class="cbt-step__num">${i + 1}</span>
              <span>${st.name}</span>
            </button>`).join("")}
        </div>
        <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
          <div class="timer">
            <span style="font-size:12.5px;font-weight:600;color:var(--ink-3)" id="cbtStageLabel">Thời gian phần Nghe:</span>
            <span class="t" id="cbtTimer">${fmtTime(stageLeft)}</span>
          </div>
          <span class="cbt-saved" id="cbtSavedAt"></span>
          <button class="btn btn--sm" id="cbtNextStage"><span>Chuyển phần tiếp</span>${ICO.next}</button>
          <button class="btn btn--sm btn--solid" id="cbtSubmitAll">Nộp bài 4 kỹ năng</button>
        </div>
      </div>
      <div class="timer-bar" style="margin-top:10px"><i id="cbtTimerBar" style="transform:scaleX(1)"></i></div>
    </div>
    <div id="cbtStageMount"></div>`;

  const timerEl = $("#cbtTimer"), barEl = $("#cbtTimerBar"), labelEl = $("#cbtStageLabel");
  if(draft && draft.savedAt){
    const el = $("#cbtSavedAt");
    if(el) el.textContent = "Đã khôi phục nháp lúc " + new Date(draft.savedAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  }
  const timerInt = setInterval(() => {
    if(submitted) return;
    stageLeft--;
    totalElapsed++;
    timerEl.textContent = fmtTime(stageLeft);
    barEl.style.transform = `scaleX(${Math.max(0, stageLeft / STAGES[stageIdx].secs).toFixed(4)})`;
    if(stageLeft <= 180) timerEl.classList.add("warn"); else timerEl.classList.remove("warn");
    if(totalElapsed % 15 === 0) saveDraft();
    if(stageLeft <= 0){
      if(stageIdx < STAGES.length - 1){
        goStage(stageIdx + 1);
      } else {
        finishFullCBT(true);
      }
    }
  }, 1000);

  const syncStepper = () => {
    labelEl.textContent = "Thời gian " + STAGES[stageIdx].name.replace(/^\d+\.\s*/, "") + ":";
    $$("#cbtStepper .cbt-step").forEach((b, i) => {
      b.classList.toggle("on", i === stageIdx);
      b.classList.toggle("done", i < stageIdx);
    });
    $("#cbtNextStage").style.display = stageIdx < STAGES.length - 1 ? "inline-flex" : "none";
  };

  function goStage(nextIdx){
    TTS.stop();
    if(STT.active) STT.stop();
    stopSpeakCapture();
    stageIdx = nextIdx;
    stageLeft = STAGES[stageIdx].secs;
    timerEl.textContent = fmtTime(stageLeft);
    barEl.style.transform = "scaleX(1)";
    syncStepper();
    saveDraft();
    window.scrollTo({ top: 0, behavior: "smooth" });
    renderStage();
  }

  $$("#cbtStepper .cbt-step").forEach(b => b.onclick = () => goStage(+b.dataset.st));
  $("#cbtNextStage").onclick = () => {
    if(stageIdx < STAGES.length - 1) goStage(stageIdx + 1);
  };
  $("#cbtSubmitAll").onclick = () => finishFullCBT(false);

  function renderStage(){
    const mount = $("#cbtStageMount");
    if(stageIdx === 0) renderListeningStage(mount);
    else if(stageIdx === 1) renderReadingStage(mount);
    else if(stageIdx === 2) renderWritingStage(mount);
    else renderSpeakingStage(mount);
  }

  /* ---- STAGE 1: LISTENING ---- */
  function renderListeningStage(mount){
    const g = listenGroups[listenCurGroup];
    const groupStartIdx = listenQs.findIndex(q => q.gid === g.gid);
    const ansCount = listenPicks.filter(x => x !== undefined).length;

    mount.innerHTML = `
      <div class="topic-bar">
        ${listenGroups.map((lg, i) => { const lab = (lg.title.includes("—") ? lg.title.split("—").pop() : lg.title.split(":").pop() || lg.title).trim(); return `<button class="chip ${i === listenCurGroup ? "on" : ""}" data-lg="${i}" title="${esc(lg.title)}">Part ${lg.part} · ${esc(lab.length > 42 ? lab.slice(0, 40) + "…" : lab)}</button>`; }).join("")}
      </div>
      <div class="quiz-layout">
        <div class="quiz-main">
          <div class="tape" id="cbtTape">
            <div class="tape__wave" aria-hidden="true">
              <div class="tape__bar"></div><div class="tape__bar"></div><div class="tape__bar"></div>
              <div class="tape__bar"></div><div class="tape__bar"></div><div class="tape__bar"></div>
            </div>
            <div class="tape__info">
              <b>Phần Nghe Part ${g.part}: ${esc(g.title)}</b>
              <span id="cbtListenStatus">Bấm Phát bài nghe để nghe đoạn băng và chọn đáp án bên dưới</span>
            </div>
            <div class="tape__ctrl">
              <button class="btn btn--tape btn--sm" id="cbtPlayBtn">${ICO.play}<span>Phát bài nghe</span></button>
              <button class="btn btn--tape btn--sm" id="cbtStopBtn">${ICO.stop}<span>Dừng</span></button>
              <button class="btn btn--tape btn--sm" id="cbtScrBtn">${ICO.book}<span>Transcript</span></button>
            </div>
          </div>
          <div class="script-box" id="cbtScrBox">
            <h5>Lời thoại bài nghe (Transcript) — chỉ nên mở sau khi đã chọn đáp án</h5>
            ${g.script.map((l, idx) => `<div class="script-line ${l.v === 2 ? "v2" : l.v === 0 ? "nar" : ""}" data-line="${idx}"><span class="spk">${l.v === 0 ? "Dẫn" : l.v === 1 ? "Nữ" : "Nam"}</span><span>${esc(l.t)}</span></div>`).join("")}
          </div>
          <div style="margin-top:18px;display:flex;flex-direction:column;gap:14px">
            ${g.qs.map((q, localI) => {
              const qIdx = groupStartIdx + localI;
              return `<div class="sheet q-card sheet--pad">
                <div class="q-card__top">
                  <span class="q-card__no">Câu ${qIdx + 1} / ${listenQs.length}<em>Listening Part ${g.part}</em></span>
                </div>
                <div class="q-card__text" style="font-size:18.5px;margin:12px 0 16px">${esc(q.q)}</div>
                <div class="opts">
                  ${q.opts.map((o, oi) => `<button class="opt ${listenPicks[qIdx] === oi ? "sel" : ""}" data-qi="${qIdx}" data-oi="${oi}"><span class="key">${LETTERS[oi]}</span><span>${esc(o)}</span></button>`).join("")}
                </div>
              </div>`;
            }).join("")}
          </div>
          <div class="q-nav" style="background:var(--surface);padding:16px 20px;border-radius:var(--r-md);border:1px solid var(--line-soft);margin-top:18px">
            <button class="btn btn--ghost" id="lPrevG" ${listenCurGroup === 0 ? "disabled" : ""}>${ICO.prev}<span>Đoạn nghe trước</span></button>
            <span class="q-nav__mid">Đoạn nghe ${listenCurGroup + 1} / ${listenGroups.length}</span>
            <button class="btn btn--solid" id="lNextG">${listenCurGroup < listenGroups.length - 1 ? `<span>Đoạn nghe tiếp</span>${ICO.next}` : `<span>Sang kỹ năng Đọc</span>${ICO.next}`}</button>
          </div>
        </div>
        <aside class="quiz-side">
          <div class="side-block">
            <h4><span>Phiếu trả lời Nghe</span><span id="cbtListenCount">${ansCount}/${listenQs.length}</span></h4>
            <div class="grid-q">
              ${listenQs.map((q, qi) => `<button class="gq ${listenPicks[qi] !== undefined ? "ans" : ""} ${q.gid === g.gid ? "cur" : ""}" data-jump-q="${qi}">${qi + 1}</button>`).join("")}
            </div>
          </div>
        </aside>
      </div>`;

    $$("[data-lg]", mount).forEach(b => b.onclick = () => { TTS.stop(); listenCurGroup = +b.dataset.lg; renderListeningStage(mount); });
    const tape = $("#cbtTape", mount);
    const stEl = $("#cbtListenStatus", mount);
    $("#cbtPlayBtn", mount).onclick = () => {
      TTS.speak(g.script, {
        rate: 1,
        onLine: (li) => {
          stEl.textContent = `Đang phát câu thoại ${li + 1} / ${g.script.length}…`;
          $$(".script-line", mount).forEach((el, idx) => el.classList.toggle("active-line", idx === li));
        },
        onEnd: () => {
          tape.classList.remove("playing");
          stEl.textContent = "Đã phát xong đoạn băng.";
          $$(".script-line", mount).forEach(el => el.classList.remove("active-line"));
        }
      });
      tape.classList.add("playing");
    };
    $("#cbtStopBtn", mount).onclick = () => { TTS.stop(); tape.classList.remove("playing"); stEl.textContent = "Đã dừng âm thanh."; $$(".script-line", mount).forEach(el => el.classList.remove("active-line")); };
    $("#cbtScrBtn", mount).onclick = () => {
      const sb = $("#cbtScrBox", mount);
      sb.classList.toggle("open");
      const on = sb.classList.contains("open");
      $("#cbtScrBtn", mount).classList.toggle("on", on);
      $("#cbtScrBtn span", mount).textContent = on ? "Ẩn transcript" : "Transcript";
    };
    $$(".opt[data-qi]", mount).forEach(btn => btn.onclick = () => {
      const qi = +btn.dataset.qi, oi = +btn.dataset.oi;
      listenPicks[qi] = oi;
      saveDraft();
      renderListeningStage(mount);
    });
    $$("[data-jump-q]", mount).forEach(b => b.onclick = () => {
      const targetQ = listenQs[+b.dataset.jumpQ];
      const gIdx = listenGroups.findIndex(x => x.gid === targetQ.gid);
      if(gIdx >= 0){ TTS.stop(); listenCurGroup = gIdx; renderListeningStage(mount); }
    });
    $("#lPrevG", mount).onclick = () => { if(listenCurGroup > 0){ TTS.stop(); listenCurGroup--; renderListeningStage(mount); } };
    $("#lNextG", mount).onclick = () => {
      TTS.stop();
      if(listenCurGroup < listenGroups.length - 1){ listenCurGroup++; renderListeningStage(mount); }
      else goStage(1);
    };
  }

  /* ---- STAGE 2: READING ---- */
  function renderReadingStage(mount){
    const p = readPassages[readCurPassage];
    const pQs = readQs.filter(q => q.pi === readCurPassage);
    const ansCount = readPicks.filter(x => x !== undefined).length;

    mount.innerHTML = `
      <div class="topic-bar">
        ${readPassages.map((rp, i) => `<button class="chip ${i === readCurPassage ? "on" : ""}" data-rp="${i}">Passage ${i + 1} (Câu ${i * 10 + 1}–${(i + 1) * 10})</button>`).join("")}
      </div>
      <div class="quiz-layout">
        <div class="quiz-main">
          <div class="read-split">
          <div class="sheet passage-panel read-split__passage">
            <h3>${esc(p.title.replace(/^PASSAGE \d+ - /, "Passage " + (readCurPassage + 1) + ": "))}</h3>
            <span class="src">Đề thi VSTEP Reading Bậc 3–5 (40 câu / 60 phút)</span>
            ${HL_TOOLS}
            <div class="passage-body" id="cbtPassBody">${esc(p.body)}</div>
          </div>
          <div class="read-split__qs">
          <div style="display:flex;flex-direction:column;gap:14px">
            ${pQs.map(q => {
              const qi = q.n - 1;
              return `<div class="sheet q-card sheet--pad" id="cbt-rq-${qi}">
                <div class="q-card__top">
                  <span class="q-card__no">Câu ${q.n} / 40<em>Passage ${readCurPassage + 1}</em></span>
                  <button class="q-card__flag ${readFlags[qi] ? "on" : ""}" data-rflag="${qi}">${ICO.flag}<span>Xem lại</span></button>
                </div>
                <div class="q-card__text" style="font-size:18.5px;margin:12px 0 16px">${esc(q.q)}</div>
                <div class="opts">
                  ${q.opts.map((o, oi) => `<button class="opt ${readPicks[qi] === oi ? "sel" : ""}" data-rqi="${qi}" data-roi="${oi}"><span class="key">${LETTERS[oi]}</span><span>${esc(o)}</span></button>`).join("")}
                </div>
              </div>`;
            }).join("")}
          </div>
          <div class="q-nav" style="background:var(--surface);padding:16px 20px;border-radius:var(--r-md);border:1px solid var(--line-soft);margin-top:18px">
            <button class="btn btn--ghost" id="rPrevP" ${readCurPassage === 0 ? "disabled" : ""}>${ICO.prev}<span>Passage trước</span></button>
            <span class="q-nav__mid">Passage ${readCurPassage + 1} / 4</span>
            <button class="btn btn--solid" id="rNextP">${readCurPassage < 3 ? `<span>Passage tiếp theo</span>${ICO.next}` : `<span>Sang kỹ năng Viết</span>${ICO.next}`}</button>
          </div>
          </div>
          </div>
        </div>
        <aside class="quiz-side">
          <div class="side-block">
            <h4><span>Phiếu trả lời Đọc</span><span>${ansCount}/40</span></h4>
            <div class="grid-q">
              ${readQs.map((q, qi) => `<button class="gq ${readPicks[qi] !== undefined ? "ans" : ""} ${readFlags[qi] ? "flag" : ""} ${q.pi === readCurPassage ? "cur" : ""}" data-rjump="${qi}">${qi + 1}</button>`).join("")}
            </div>
          </div>
        </aside>
      </div>`;

    $$("[data-rp]", mount).forEach(b => b.onclick = () => { readCurPassage = +b.dataset.rp; renderReadingStage(mount); });
    $$(".opt[data-rqi]", mount).forEach(btn => btn.onclick = () => {
      const qi = +btn.dataset.rqi, oi = +btn.dataset.roi;
      readPicks[qi] = oi;
      saveDraft();
      renderReadingStage(mount);
    });
    $$("[data-rflag]", mount).forEach(btn => btn.onclick = () => {
      const qi = +btn.dataset.rflag;
      readFlags[qi] = !readFlags[qi];
      saveDraft();
      renderReadingStage(mount);
    });
    $$("[data-rjump]", mount).forEach(b => b.onclick = () => {
      const qi = +b.dataset.rjump;
      const targetP = Math.floor(qi / 10);
      if(targetP !== readCurPassage){ readCurPassage = targetP; renderReadingStage(mount); }
      const el = $(`#cbt-rq-${qi}`, mount);
      if(el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    $("#rPrevP", mount).onclick = () => { if(readCurPassage > 0){ readCurPassage--; renderReadingStage(mount); window.scrollTo(0, 0); } };
    $("#rNextP", mount).onclick = () => {
      if(readCurPassage < 3){ readCurPassage++; renderReadingStage(mount); window.scrollTo(0, 0); }
      else goStage(2);
    };
    const pb = $("#cbtPassBody", mount);
    readHL[readCurPassage] = readHL[readCurPassage] || [];
    hlApply(pb, readHL[readCurPassage]);
    hlBind(pb, readHL[readCurPassage], saveDraft);
    $("#hlClear", mount).onclick = () => { readHL[readCurPassage].length = 0; hlClearAll(pb); saveDraft(); };
  }

  /* ---- STAGE 3: WRITING ---- */
  function renderWritingStage(mount){
    const curT = writeData.activeTask === 1 ? w1Task : w2Task;
    const curText = writeData.activeTask === 1 ? writeData.w1 : writeData.w2;

    mount.innerHTML = `
      <div class="topic-bar">
        <button class="chip ${writeData.activeTask === 1 ? "on" : ""}" data-wt="1">Task 1: Viết Thư/Email (≥120 từ • Hệ số 1) <span class="n">${countWords(writeData.w1)} từ</span></button>
        <button class="chip ${writeData.activeTask === 2 ? "on" : ""}" data-wt="2">Task 2: Viết Luận văn Essay (≥250 từ • Hệ số 2) <span class="n">${countWords(writeData.w2)} từ</span></button>
      </div>
      <div class="write-layout">
        <div class="sheet write-paper">
          <div style="padding:22px 26px 0">
            <span class="tag">Writing Task ${curT.task}: ${esc(curT.type)} (Khuyến nghị ${curT.time} phút | Tối thiểu ${curT.target} từ)</span>
            <div class="prompt-box">${esc(curT.prompt).replace(/\n/g, "<br>")}</div>
          </div>
          <textarea id="cbtWriteArea" placeholder="Nhập bài làm Task ${curT.task} của bạn vào đây… Hệ thống tự động lưu khi bạn chuyển qua lại giữa Task 1 và Task 2.">${esc(curText)}</textarea>
          <div class="write-tools">
            <div class="wordmeter ${countWords(curText) >= curT.target ? "hit" : ""}" id="cbtWMeter">
              <div><b id="cbtWNum">${countWords(curText)}</b> / ≥${curT.target} từ</div>
              <div class="wordmeter__bar"><div class="wordmeter__fill" id="cbtWBar" style="transform:scaleX(${Math.min(1, countWords(curText) / curT.target).toFixed(3)})"></div></div>
            </div>
            <div style="display:flex;gap:8px">
              ${writeData.activeTask === 1
                ? `<button class="btn btn--sm btn--solid" id="cbtToTask2"><span>Chuyển sang viết Task 2</span>${ICO.next}</button>`
                : `<button class="btn btn--sm btn--solid" id="cbtToSpeak"><span>Hoàn thành Viết — Sang thi Nói</span>${ICO.next}</button>`}
            </div>
          </div>
        </div>
        <div class="sheet sheet--pad">
          <h4 style="font-size:14px;font-weight:700">Tiêu chí chấm Writing VSTEP</h4>
          <ul class="tips">
            <li><b>Task Fulfillment:</b> Trả lời đầy đủ mọi yêu cầu trong đề bài và đảm bảo số từ tối thiểu (${curT.target} từ).</li>
            <li><b>Organization:</b> Chia đoạn rõ ràng, sử dụng linh hoạt các từ nối học thuật (However, Moreover, Therefore, In conclusion).</li>
            <li><b>Vocabulary &amp; Grammar:</b> Đa dạng hóa cấu trúc câu phức và từ vựng mức B2/C1.</li>
          </ul>
          <hr class="hr-dash">
          <h4 style="font-size:14px;font-weight:700">Trạng thái bài viết của bạn</h4>
          <div class="side-stat"><span class="k">Task 1 (Thư/Email)</span><span class="v" id="cbtStatW1">${countWords(writeData.w1)} / 120 từ</span></div>
          <div class="side-stat"><span class="k">Task 2 (Luận văn)</span><span class="v" id="cbtStatW2">${countWords(writeData.w2)} / 250 từ</span></div>
        </div>
      </div>`;

    const area = $("#cbtWriteArea", mount);
    area.oninput = () => {
      if(writeData.activeTask === 1) writeData.w1 = area.value;
      else writeData.w2 = area.value;
      saveDraft();
      const n = countWords(area.value);
      $("#cbtWNum", mount).textContent = n;
      $("#cbtWBar", mount).style.transform = `scaleX(${Math.min(1, n / curT.target).toFixed(3)})`;
      $("#cbtWMeter", mount).classList.toggle("hit", n >= curT.target);
      $("#cbtStatW1", mount).textContent = countWords(writeData.w1) + " / 120 từ";
      $("#cbtStatW2", mount).textContent = countWords(writeData.w2) + " / 250 từ";
    };
    $$("[data-wt]", mount).forEach(b => b.onclick = () => { writeData.activeTask = +b.dataset.wt; renderWritingStage(mount); });
    if($("#cbtToTask2", mount)) $("#cbtToTask2", mount).onclick = () => { writeData.activeTask = 2; renderWritingStage(mount); };
    if($("#cbtToSpeak", mount)) $("#cbtToSpeak", mount).onclick = () => goStage(3);
  }

  /* ---- STAGE 4: SPEAKING ---- */
  function renderSpeakingStage(mount){
    const pt = speakData.activePart;
    const it = pt === 1 ? s1Item : pt === 2 ? s2Item : s3Item;
    const curKey = "s" + pt;

    const promptHtml = pt === 1
      ? `<p style="color:var(--ink-2);margin-bottom:10px">Hãy trả lời lần lượt 3 câu hỏi xã giao sau về chủ đề <b>${esc(it.topic)}</b>:</p>
         <ul class="phrases">${it.questions.map(q => `<li>• <b>${esc(q)}</b></li>`).join("")}</ul>`
      : pt === 2
      ? `<p style="color:var(--ink-2);margin-bottom:10px"><b>Tình huống:</b> ${esc(it.situation)}</p>
         <p style="font-size:13.5px;color:var(--ink-3)">Hãy phân tích ưu/nhược điểm của các phương án và bảo vệ lựa chọn tốt nhất của bạn.</p>`
      : `<div class="mindmap">
           <span style="font-size:12px;font-weight:700;color:var(--primary)">Phát triển chủ đề theo sơ đồ tư duy:</span>
           <div class="mindmap__wrap">
             <div class="mindmap__center">${esc(it.mindmap.center)}</div>
             <div class="mindmap__branches">${it.mindmap.branches.map(b => `<div class="mindmap__branch">${esc(b)}</div>`).join("")}</div>
           </div>
         </div>
         <div style="font-size:13px;font-weight:700;margin-top:14px">Câu hỏi thảo luận mở rộng:</div>
         <ul class="phrases">${(it.followups || []).map(f => `<li>• <i>${esc(f)}</i></li>`).join("")}</ul>`;

    mount.innerHTML = `
      <div class="topic-bar">
        <button class="chip ${pt === 1 ? "on" : ""}" data-spt="1">Part 1: Social Interaction (3p) <span class="n">${countWords(speakData.s1)} từ</span></button>
        <button class="chip ${pt === 2 ? "on" : ""}" data-spt="2">Part 2: Solution Discussion (4p) <span class="n">${countWords(speakData.s2)} từ</span></button>
        <button class="chip ${pt === 3 ? "on" : ""}" data-spt="3">Part 3: Topic Development (5p) <span class="n">${countWords(speakData.s3)} từ</span></button>
      </div>
      <div class="speak-layout">
        <div class="sheet cue-card">
          <span class="lbl">Speaking Part ${pt}</span>
          <h3>${esc(it.topic)}</h3>
          ${promptHtml}
        </div>
        <div class="sheet rec-panel" id="cbtSpeakPanel">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
            <span style="font-size:13.5px;font-weight:700"><span class="rec-dot"></span>Thu âm trả lời Part ${pt} (hoặc nhập trực tiếp bên dưới)</span>
            <span class="rec-time" id="cbtRecTime">00:00</span>
          </div>
          <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
            ${STT.supported ? `
              <button class="btn btn--red btn--sm" id="cbtRecStart">${ICO.mic}<span>Bắt đầu thu âm giọng nói</span></button>
              <button class="btn btn--ghost btn--sm" id="cbtRecStop">${ICO.stop}<span>Dừng thu âm</span></button>
            ` : `<span style="font-size:12.5px;color:var(--ink-3)">Trình duyệt không bật nhận diện giọng nói — hãy gõ nội dung câu trả lời tiếng Anh của bạn vào khung bên dưới để Giám khảo AI chấm điểm.</span>`}
          </div>
          <textarea class="stt-box" id="cbtSpeakText" style="width:100%;min-height:160px;resize:vertical;outline:none" placeholder="Bấm Thu âm để giọng nói tự chuyển thành chữ tại đây, hoặc bạn có thể tự gõ/chỉnh sửa câu trả lời tiếng Anh của mình…">${esc(speakData[curKey])}</textarea>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;flex-wrap:wrap;gap:10px">
            <span style="font-size:13px;color:var(--ink-3)" id="cbtSpCount">Độ dài câu trả lời: <b>${countWords(speakData[curKey])}</b> từ</span>
            ${pt < 3
              ? `<button class="btn btn--solid btn--sm" id="cbtNextSpPart"><span>Chuyển sang Speaking Part ${pt + 1}</span>${ICO.next}</button>`
              : `<button class="btn btn--solid" id="cbtFinishBtn"><span>Nộp bài toàn bộ 4 kỹ năng &amp; Chấm điểm</span>${ICO.next}</button>`}
          </div>
        </div>
      </div>`;

    const txtArea = $("#cbtSpeakText", mount);
    txtArea.oninput = () => {
      speakData[curKey] = txtArea.value;
      saveDraft();
      $("#cbtSpCount", mount).innerHTML = `Độ dài câu trả lời: <b>${countWords(txtArea.value)}</b> từ`;
    };
    $$("[data-spt]", mount).forEach(b => b.onclick = () => {
      if(STT.active) STT.stop();
      stopSpeakCapture();
      speakData.activePart = +b.dataset.spt;
      renderSpeakingStage(mount);
    });
    if($("#cbtNextSpPart", mount)) $("#cbtNextSpPart", mount).onclick = () => {
      if(STT.active) STT.stop();
      stopSpeakCapture();
      speakData.activePart = pt + 1;
      renderSpeakingStage(mount);
    };
    if($("#cbtFinishBtn", mount)) $("#cbtFinishBtn", mount).onclick = () => finishFullCBT(false);

    if(STT.supported){
      let recT0 = 0, recIv = null, mediaRec = null, mediaChunks = [], mediaStream = null;
      const panel = $("#cbtSpeakPanel", mount), timeEl = $("#cbtRecTime", mount);
      const startCapture = async () => {
        if(!navigator.mediaDevices || typeof MediaRecorder === "undefined") return;
        try{
          mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaChunks = [];
          mediaRec = new MediaRecorder(mediaStream);
          mediaRec.ondataavailable = e => { if(e.data && e.data.size) mediaChunks.push(e.data); };
          mediaRec.onstop = () => {
            try{
              const blob = new Blob(mediaChunks, { type: mediaRec.mimeType || "audio/webm" });
              if(speakBlobs[pt]) URL.revokeObjectURL(speakBlobs[pt].url);
              speakBlobs[pt] = { url: URL.createObjectURL(blob), mime: blob.type };
            }catch(e){}
            if(mediaStream){ mediaStream.getTracks().forEach(t => t.stop()); mediaStream = null; }
          };
          mediaRec.start();
          if(!panel.classList.contains("recording")) mediaRec.stop();
        }catch(e){}
      };
      stopSpeakCapture = () => { try{ if(mediaRec && mediaRec.state !== "inactive") mediaRec.stop(); }catch(e){} };
      $("#cbtRecStart", mount).onclick = () => {
        recT0 = Date.now();
        panel.classList.add("recording");
        const baseText = speakData[curKey] ? speakData[curKey].trim() + " " : "";
        recIv = setInterval(() => { timeEl.textContent = fmtTime((Date.now() - recT0) / 1000); }, 250);
        startCapture();
        STT.start((fin, inter) => {
          txtArea.value = baseText + fin + inter;
          speakData[curKey] = txtArea.value;
          saveDraft();
          $("#cbtSpCount", mount).innerHTML = `Độ dài câu trả lời: <b>${countWords(txtArea.value)}</b> từ`;
        });
      };
      $("#cbtRecStop", mount).onclick = () => {
        clearInterval(recIv);
        panel.classList.remove("recording");
        STT.stop();
        stopSpeakCapture();
      };
    }
  }

  /* ---- KẾT THÚC & CHẤM ĐIỂM FULL 4 KỸ NĂNG ---- */
  async function finishFullCBT(auto){
    if(submitted) return;
    if(!auto && !confirm("Bạn có chắc chắn muốn nộp bài thi VSTEP 4 kỹ năng và xem bảng điểm tổng kết không?")) return;
    submitted = true;
    clearInterval(timerInt);
    localStorage.removeItem(CBT_DRAFT_KEY);
    window.__cbtSave = null;
    window.onbeforeunload = null;
    TTS.stop();
    if(STT.active) STT.stop();
    stopSpeakCapture();

    /* 1. Chấm Nghe & Đọc chính xác theo đáp án */
    let listenOk = 0;
    listenQs.forEach((q, i) => {
      const good = listenPicks[i] === q.a;
      if(good) listenOk++;
      Store.addAnswer(q.id, listenPicks[i] === undefined ? -1 : listenPicks[i], good);
    });
    let readOk = 0;
    readQs.forEach((q, i) => {
      const good = readPicks[i] === q.a;
      if(good) readOk++;
      Store.addAnswer(q.id, readPicks[i] === undefined ? -1 : readPicks[i], good);
    });

    const listenScore = toHalf(listenOk / listenQs.length * 10);
    const readScore = toHalf(readOk / readQs.length * 10);

    /* 2. Điểm ước lượng cục bộ cho Viết & Nói (hiển thị tức thì, sau đó AI cập nhật) */
    const w1Local = LocalAnalyzer.scoreWritingNumeric(writeData.w1, w1Task);
    const w2Local = LocalAnalyzer.scoreWritingNumeric(writeData.w2, w2Task);
    let writeScore = +((w1Local + w2Local * 2) / 3).toFixed(1);
    if(w1Local < 6 && countWords(writeData.w1) >= 30) Store.addWriting({ task: 1, type: w1Task.type, score: w1Local, text: writeData.w1.slice(0, 2200), code: ex.code, date: todayStr() });
    if(w2Local < 6 && countWords(writeData.w2) >= 30) Store.addWriting({ task: 2, type: w2Task.type, score: w2Local, text: writeData.w2.slice(0, 2600), code: ex.code, date: todayStr() });

    const s1Local = LocalAnalyzer.scoreSpeakingNumeric(speakData.s1, 50);
    const s2Local = LocalAnalyzer.scoreSpeakingNumeric(speakData.s2, 90);
    const s3Local = LocalAnalyzer.scoreSpeakingNumeric(speakData.s3, 110);
    let speakScore = +((s1Local + s2Local + s3Local) / 3).toFixed(1);

    const calcOverall = (l, r, w, s) => Math.round(((l + r + w + s) / 4) * 2) / 2;
    let overallScore = calcOverall(listenScore, readScore, writeScore, speakScore);

    const badgeInfo = sc => {
      if(sc >= 8.5) return { text: "Đạt Bậc 5 (C1)", cls: "stamp--c1" };
      if(sc >= 6.0) return { text: "Đạt Bậc 4 (B2)", cls: "stamp--pass" };
      if(sc >= 4.0) return { text: "Đạt Bậc 3 (B1)", cls: "stamp--b1" };
      return { text: "Chưa đạt B1/B2", cls: "stamp--fail" };
    };

    const timeUsed = fmtTime(totalElapsed);
    Store.addMock({
      date: todayStr(),
      label: "Full 4KN · " + ex.code,
      score: overallScore,
      pct: Math.round(overallScore * 10),
      total: listenQs.length + readQs.length,
      ok: listenOk + readOk,
      timeUsed,
      at: Date.now()
    });

    let subOpen = false;
    const submissionsHtml = () => {
      const row = (label, text, blob) => `
        <div class="subrev">
          <div class="subrev__head"><b>${esc(label)}</b><span>${countWords(text)} từ</span></div>
          ${text.trim() ? `<div class="subrev__text">${esc(text)}</div>` : `<div class="subrev__text subrev__text--empty">(Bỏ trống phần này)</div>`}
          ${blob ? `<div class="subrev__audio"><audio controls src="${blob.url}"></audio><a class="btn btn--ghost btn--sm" href="${blob.url}" download="speaking-${blob.ext || "rec"}.webm">Tải bản ghi</a></div>` : ""}
        </div>`;
      return `<div class="sheet sheet--pad" style="margin-bottom:18px">
        <span class="tag">Bài làm đã nộp của bạn — đối chiếu với nhận xét của Giám khảo AI bên dưới</span>
        <div style="margin-top:14px">
          ${row("Writing Task 1 — " + w1Task.type, writeData.w1, null)}
          ${row("Writing Task 2 — " + w2Task.type, writeData.w2, null)}
          ${row("Speaking Part 1 — " + s1Item.topic, speakData.s1, speakBlobs[1])}
          ${row("Speaking Part 2 — " + s2Item.topic, speakData.s2, speakBlobs[2])}
          ${row("Speaking Part 3 — " + s3Item.topic, speakData.s3, speakBlobs[3])}
        </div>
      </div>`;
    };

    const renderResultView = (aiGradingState, aiReportHtml) => {
      const b = badgeInfo(overallScore);
      app.innerHTML = `
        <a href="#/thi-thu" class="backlink">${ICO.prev}<span>Quay lại Phòng thi CBT</span></a>
        <div class="sheet result-head">
          <div>
            <span class="tag">Phiếu điểm VSTEP 4 Kỹ năng (Thời gian làm bài: ${timeUsed})</span>
            <div style="display:flex;gap:36px;margin-top:16px;flex-wrap:wrap">
              <div class="result-score"><div class="big" id="resOverall">${overallScore.toFixed(1)}<small>/10</small></div><div class="lbl">Điểm tổng kết 4 kỹ năng</div></div>
              <div class="result-score"><div class="big">${listenOk + readOk}<small>/${listenQs.length + readQs.length}</small></div><div class="lbl">Trắc nghiệm Nghe &amp; Đọc</div></div>
            </div>
          </div>
          <div class="stamp ${b.cls}" id="resStamp">${b.text}</div>
        </div>
        <div class="result-grid">
          <div class="result-cell">
            <div class="k">1. Nghe hiểu (Listening)</div>
            <div class="v ${listenScore >= 6 ? "v--green" : "v--red"}">${listenScore}<small>/10 (${listenOk}/${listenQs.length})</small></div>
          </div>
          <div class="result-cell">
            <div class="k">2. Đọc hiểu (Reading)</div>
            <div class="v ${readScore >= 6 ? "v--green" : "v--red"}">${readScore}<small>/10 (${readOk}/${readQs.length})</small></div>
          </div>
          <div class="result-cell">
            <div class="k">3. Viết (Writing Task 1 &amp; 2)</div>
            <div class="v ${writeScore >= 6 ? "v--green" : "v--red"}" id="resWriteScore">${writeScore}<small>/10 ${aiGradingState === "done" ? "(AI chấm)" : "(Cục bộ)"}</small></div>
          </div>
          <div class="result-cell">
            <div class="k">4. Nói (Speaking Part 1–3)</div>
            <div class="v ${speakScore >= 6 ? "v--green" : "v--red"}" id="resSpeakScore">${speakScore}<small>/10 ${aiGradingState === "done" ? "(AI chấm)" : "(Cục bộ)"}</small></div>
          </div>
        </div>
        <p style="font-size:12.5px;color:var(--ink-3);margin-top:10px">Điểm Nghe &amp; Đọc quy đổi thang 10 làm tròn đến 0.5 — mức ước lượng gần đúng (bảng quy đổi chính thức của VSTEP được công bố theo từng đợt thi).</p>

        <div style="display:flex;gap:10px;margin:22px 0;flex-wrap:wrap">
          <button class="btn btn--solid" id="cbtBtnAI">${aiGradingState === "loading" ? "Giám khảo AI đang chấm tự động…" : "Chấm lại Viết & Nói bằng Giám khảo AI"}</button>
          <button class="btn btn--teal" id="cbtUpgradeWrite">AI nâng cấp bài Viết lên B2/C1</button>
          <button class="btn btn--teal" id="cbtUpgradeSpeak">AI nâng cấp bài Nói lên B2/C1</button>
          <button class="btn" id="cbtReviewMC">Xem giải thích ${listenQs.length + readQs.length} câu Nghe &amp; Đọc</button>
          <button class="btn" id="cbtSubToggle">${subOpen ? "Ẩn bài đã nộp" : "Xem lại bài đã nộp (Viết & Nói)"}</button>
          <button class="btn btn--ghost" id="cbtPrint">In phiếu điểm</button>
        </div>

        <div id="cbtSubOut">${subOpen ? submissionsHtml() : ""}</div>

        <div id="cbtAIOut">${aiReportHtml || ""}</div>
        <div id="cbtUpgradeOut"></div>
        <div id="cbtReviewOut"></div>`;

      $("#cbtBtnAI").onclick = () => runAIGrading();
      $("#cbtUpgradeWrite").onclick = async () => {
        const outEl = $("#cbtUpgradeOut");
        const combinedW = (writeData.w2 && countWords(writeData.w2) >= countWords(writeData.w1)) ? { task: w2Task, text: writeData.w2 } : { task: w1Task, text: writeData.w1 };
        if(countWords(combinedW.text) < 15){
          outEl.innerHTML = `<div class="notice" style="margin-bottom:16px"><span>Bạn chưa viết đủ nội dung (tối thiểu 15 từ) ở phần thi Viết để AI nâng cấp lên B2/C1.</span></div>`;
          return;
        }
        if(!AI.available()){
          outEl.innerHTML = `<div class="notice" style="margin-bottom:16px"><span>Hãy kết nối API Key tại <a href="#/cai-dat"><b>trang Cài đặt AI</b></a> để sử dụng tính năng nâng cấp B2/C1.</span></div>`;
          return;
        }
        outEl.innerHTML = `<div class="ai-report" style="margin-bottom:16px"><span class="tag">AI đang nâng cấp bài Viết (Task ${combinedW.task.task}) lên B2 &amp; C1…</span></div>`;
        try{
          const res = await AI.upgradeWriting(combinedW.task, combinedW.text);
          outEl.innerHTML = `<div class="ai-report" style="margin-bottom:16px"><span class="tag">Bản nâng cấp bài Viết (Task ${combinedW.task.task}) lên chuẩn B2 &amp; C1</span><div class="ai-md">${mdLite(res)}</div></div>`;
        }catch(e){
          outEl.innerHTML = `<div class="notice" style="margin-bottom:16px"><span>Lỗi AI: ${esc(e.message)}</span></div>`;
        }
      };

      $("#cbtUpgradeSpeak").onclick = async () => {
        const outEl = $("#cbtUpgradeOut");
        const bestS = countWords(speakData.s3) >= 10 ? { item: { ...s3Item, part: 3 }, text: speakData.s3 }
          : countWords(speakData.s2) >= 10 ? { item: { ...s2Item, part: 2 }, text: speakData.s2 }
          : { item: { ...s1Item, part: 1 }, text: speakData.s1 };
        if(countWords(bestS.text) < 10){
          outEl.innerHTML = `<div class="notice" style="margin-bottom:16px"><span>Bạn chưa có nội dung trả lời (tối thiểu 10 từ) ở phần thi Nói để AI nâng cấp lên B2/C1.</span></div>`;
          return;
        }
        if(!AI.available()){
          outEl.innerHTML = `<div class="notice" style="margin-bottom:16px"><span>Hãy kết nối API Key tại <a href="#/cai-dat"><b>trang Cài đặt AI</b></a> để sử dụng tính năng nâng cấp B2/C1.</span></div>`;
          return;
        }
        outEl.innerHTML = `<div class="ai-report" style="margin-bottom:16px"><span class="tag">AI đang nâng cấp bài Nói (Part ${bestS.item.part}) lên B2 &amp; C1…</span></div>`;
        try{
          const res = await AI.upgradeSpeaking(bestS.item, bestS.text);
          outEl.innerHTML = `<div class="ai-report" style="margin-bottom:16px"><span class="tag">Bản nâng cấp bài Nói (Part ${bestS.item.part}) lên chuẩn B2 &amp; C1</span><div class="ai-md">${mdLite(res)}</div></div>`;
        }catch(e){
          outEl.innerHTML = `<div class="notice" style="margin-bottom:16px"><span>Lỗi AI: ${esc(e.message)}</span></div>`;
        }
      };

      $("#cbtReviewMC").onclick = () => {
        const allMC = [
          ...listenQs.map((q, i) => ({ ...q, pick: listenPicks[i], secName: "Listening Part " + q.part })),
          ...readQs.map((q, i) => ({ ...q, pick: readPicks[i], secName: "Reading Passage " + (q.pi + 1) }))
        ];
        $("#cbtReviewOut").innerHTML = allMC.map((q, idx) => {
          const good = q.pick === q.a;
          return `<div class="sheet sheet--pad" style="margin-bottom:14px">
            <div class="q-card__no" style="color:${good ? "var(--green)" : "var(--red)"}">Câu ${idx + 1} (${good ? "Đúng" : "Sai"}) — ${esc(q.secName)}</div>
            <div class="q-card__text" style="font-size:18px">${esc(q.q)}</div>
            <div class="opts">
              ${q.opts.map((o, j) => `<div class="opt ${j === q.a ? "correct" : j === q.pick ? "wrong" : "dim"}"><span class="key">${LETTERS[j]}</span><span>${esc(o)}</span></div>`).join("")}
            </div>
            ${good ? "" : `<div class="explain explain--no"><span class="explain__tag">Đáp án đúng: ${LETTERS[q.a]}${q.pick === undefined ? " (Chưa trả lời)" : ""}</span><p>${q.ex || ""}</p></div>`}
          </div>`;
        }).join("");
        $("#cbtReviewOut").scrollIntoView({ behavior: "smooth" });
      };
      $("#cbtSubToggle").onclick = () => {
        subOpen = !subOpen;
        $("#cbtSubOut").innerHTML = subOpen ? submissionsHtml() : "";
        $("#cbtSubToggle").textContent = subOpen ? "Ẩn bài đã nộp" : "Xem lại bài đã nộp (Viết & Nói)";
      };
      $("#cbtPrint").onclick = () => window.print();
    };

    async function runAIGrading(){
      const hasAnyWritingOrSpeaking = countWords(writeData.w1) + countWords(writeData.w2) + countWords(speakData.s1) + countWords(speakData.s2) + countWords(speakData.s3) >= 10;
      if(!AI.available()){
        renderResultView("local", `<div class="notice" style="margin-bottom:18px"><span><b>Đang hiển thị điểm chấm cục bộ cho Viết &amp; Nói.</b> Để Giám khảo AI chấm tự động toàn bộ 2 bài Viết và 3 phần Nói theo thang VSTEP, bạn hãy kết nối API Key miễn phí tại <a href="#/cai-dat"><b>trang Cài đặt AI</b></a>.</span></div>`);
        return;
      }
      if(!hasAnyWritingOrSpeaking){
        renderResultView("local", `<div class="notice" style="margin-bottom:18px"><span>Bạn đã bỏ trống phần thi Viết và Nói nên điểm 2 kỹ năng này là 0.0/10.</span></div>`);
        return;
      }
      renderResultView("loading", `<div class="ai-report" style="margin-bottom:18px"><span class="tag">Hội đồng Giám khảo AI đang chấm tự động phần Viết &amp; Nói…</span><p style="font-size:13.5px;color:var(--ink-2);margin-top:8px">Đang chấm Task 1, Task 2 (Writing) và Part 1, Part 2, Part 3 (Speaking) theo Rubric VSTEP…</p></div>`);
      try{
        const res = await AI.gradeFullExam({
          w1Task, w1Text: writeData.w1,
          w2Task, w2Text: writeData.w2,
          s1Item, s1Text: speakData.s1,
          s2Item, s2Text: speakData.s2,
          s3Item, s3Text: speakData.s3
        });
        if(res.scores){
          if(typeof res.scores.writing === "number") writeScore = +res.scores.writing.toFixed(1);
          if(typeof res.scores.speaking === "number") speakScore = +res.scores.speaking.toFixed(1);
          overallScore = calcOverall(listenScore, readScore, writeScore, speakScore);
          if(Store.d.mocks[0]) { Store.d.mocks[0].score = overallScore; Store.d.mocks[0].pct = Math.round(overallScore * 10); Store.save(); }
        }
        renderResultView("done", `<div class="ai-report" style="margin-bottom:18px"><span class="tag">Biên bản chấm thi tự động của Giám khảo AI (Writing &amp; Speaking)</span><div class="ai-md">${mdLite(res.report)}</div></div>`);
      }catch(e){
        renderResultView("local", `<div class="notice" style="margin-bottom:18px"><span>Không thể kết nối AI để chấm tự động (${esc(e.message)}). Hệ thống đang giữ điểm ước lượng cục bộ.</span></div>`);
      }
    }

    runAIGrading();
  }

  syncStepper();
  renderStage();
}

const mapGQ = q => ({ id: q.id, section: "Ngữ pháp", q: esc(q.q), opts: q.opts.map(esc), a: q.a, ex: q.ex });
const mapVQ = q => ({ id: q.id, section: "Từ vựng", q: esc(q.q), opts: q.opts.map(esc), a: q.a, ex: q.ex });

function buildMockItems(mode, examIdx){
  const ex = VSTEP_EXAM_SETS[examIdx || 0] || VSTEP_EXAM_SETS[0];
  const rSet = ALL_READING_SETS[ex.readingSetIndex] || ALL_READING_SETS[0];
  const g = mapGQ;
  const v = mapVQ;
  const r = (q, part) => ({ id: q.id, section: "Đọc hiểu", q: esc(q.q), opts: q.opts.map(esc), a: q.a, ex: q.ex, tag: part });
  const fromSetPassage = (p, pi) => p.questions.map(q => ({
    id: (ex.readingSetIndex === 0 ? "ro" + q.n : rSet.id + "_" + q.n),
    section: "Đọc hiểu (" + ex.code + ")",
    q: esc(q.q),
    opts: q.opts.map(esc),
    a: q.a,
    ex: q.ex,
    passage: p,
    tag: "Passage " + (pi + 1)
  }));
  if(mode === "quick"){
    return { label: "Đề nhanh 20 câu", secs: 20 * 60,
      items: [...pickN(GRAMMAR, 5).map(g), ...pickN(VOCAB, 5).map(v), ...pickN(READING_P1, 6).map(q => r(q, "Phần 1")), ...pickN(READING_P2, 4).map(q => r(q, "Phần 2"))] };
  }
  if(mode === "standard"){
    return { label: "Đề tổng hợp 50 câu (" + ex.code + ")", secs: 60 * 60,
      items: [...pickN(GRAMMAR, 10).map(g), ...pickN(VOCAB, 10).map(v),
        ...pickN(READING_P1, 4).map(q => r(q, "Phần 1")), ...pickN(READING_P2, 3).map(q => r(q, "Phần 2")), ...READING_P3.slice(0, 3).map(q => r(q, "Phần 3")),
        ...fromSetPassage(rSet.passages[0], 0), ...fromSetPassage(rSet.passages[1], 1)] };
  }
  return {
    label: "Đề Reading 40 câu (" + ex.code + ")",
    secs: 60 * 60,
    items: rSet.passages.flatMap((p, pi) => fromSetPassage(p, pi))
  };
}

function runMock(mode, examIdx){
  runMockExam(buildMockItems(mode, examIdx), { hash: "#/thi-thu", text: "Quay lại danh sách đề thi" });
}

/* Bộ chạy đề trắc nghiệm bấm giờ — dùng chung cho đề thi thử & mini-test chuyên đề */
function runMockExam(m, back){
  const { label, secs, items } = m;
  back = back || { hash: "#/thi-thu", text: "Quay lại" };
  const picks = new Array(items.length).fill(undefined);
  const flags = new Array(items.length).fill(false);
  let idx = 0, left = secs, timerInt = null, submitted = false;

  app.innerHTML = `
    <div class="exam-head sheet" style="padding:18px 24px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:24px">
      <div>
        <span class="tag">${esc(label)}</span>
        <div class="timer" style="margin-top:6px"><span style="font-size:13px;font-weight:600;color:var(--ink-2)">Thời gian còn lại:</span> <span class="t" id="mTimer">${fmtTime(left)}</span></div>
        <div class="timer-bar" style="width:240px"><i id="mTimerBar" style="transform:scaleX(1)"></i></div>
      </div>
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
        <span style="font-size:13.5px;font-weight:600;color:var(--ink-2)" id="mProg">0/${items.length} câu đã chọn</span>
        <button class="btn btn--solid" id="mSubmit">Nộp bài &amp; Chấm điểm</button>
      </div>
    </div>
    <div class="quiz-layout">
      <div class="quiz-main" id="mBody"></div>
      <aside class="quiz-side">
        <div class="side-block"><h4><span>Phiếu trả lời</span><span>${items.length} câu</span></h4><div class="grid-q" id="mGrid"></div></div>
        <div class="side-block"><h4>Chú giải trạng thái</h4>
          <p style="font-size:12.5px;color:var(--ink-2);line-height:1.8">
          • Nền xanh: Đã chọn đáp án<br>• Viền vàng: Đánh dấu xem lại<br>• Viền đậm: Câu đang mở</p>
          <hr class="hr-dash">
          <p style="font-size:12px;color:var(--ink-3);line-height:1.8"><b>Phím tắt:</b> <code>1–4</code> hoặc <code>A–D</code> chọn đáp án · <code>←</code>/<code>→</code> chuyển câu · <code>F</code> đánh dấu</p>
        </div>
      </aside>
    </div>`;

  const timerEl = $("#mTimer"), barEl = $("#mTimerBar");
  timerInt = setInterval(() => {
    left--;
    timerEl.textContent = fmtTime(left);
    barEl.style.transform = `scaleX(${Math.max(0, left / secs).toFixed(4)})`;
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
    $("#mProg").textContent = picks.filter(p => p !== undefined).length + "/" + items.length + " câu đã chọn";
  };

  function renderQ(){
    const q = items[idx];
    $("#mBody").innerHTML = `
      ${q.passage ? `<div class="sheet passage-panel"><h3>${esc(q.passage.title.replace(/^PASSAGE \d+ - /, ""))}</h3><span class="src">Đề minh họa VSTEP chính thức</span><div class="passage-body" style="max-height:360px;overflow:auto">${esc(q.passage.body)}</div></div>` : ""}
      <div class="sheet q-card sheet--pad">
        <div class="q-card__top">
          <span class="q-card__no">Câu ${idx + 1} / ${items.length}<em>${esc(q.section)}${q.tag ? " | " + esc(q.tag) : ""}</em></span>
          <button class="q-card__flag ${flags[idx] ? "on" : ""}" id="mFlag">${ICO.flag}<span>Đánh dấu xem lại</span></button>
        </div>
        <div class="q-card__text">${q.q}</div>
        <div class="opts" id="mOpts">
          ${q.opts.map((o, i) => `<button class="opt ${picks[idx] === i ? "sel" : ""}" data-i="${i}"><span class="key">${LETTERS[i]}</span><span>${o}</span></button>`).join("")}
        </div>
        <div class="q-nav">
          <button class="btn btn--ghost" id="mPrev" ${idx === 0 ? "disabled" : ""}>${ICO.prev}<span>Câu trước</span></button>
          <span class="q-nav__mid">${idx === items.length - 1 ? "Câu cuối cùng — Kiểm tra phiếu trả lời trước khi nộp" : ""}</span>
          <button class="btn btn--solid" id="mNext" ${idx === items.length - 1 ? "disabled" : ""}><span>Câu tiếp</span>${ICO.next}</button>
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
    if(!auto && unanswered > 0 && !confirm("Bạn còn " + unanswered + " câu chưa chọn đáp án. Bạn có chắc chắn muốn nộp bài không?")) return;
    submitted = true;
    clearInterval(timerInt);
    document.removeEventListener("keydown", keyHandler);
    if(window.__examKeys === keyHandler) window.__examKeys = null;
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
      <a href="${back.hash}" class="backlink">${ICO.prev}<span>${esc(back.text)}</span></a>
      <div class="sheet result-head">
        <div>
          <span class="tag">Kết quả bài thi: ${esc(label)} (Thời gian làm: ${timeUsed})</span>
          <div style="display:flex;gap:36px;margin-top:16px;flex-wrap:wrap">
            <div class="result-score"><div class="big">${score}<small>/10</small></div><div class="lbl">Điểm quy đổi VSTEP</div></div>
            <div class="result-score"><div class="big">${ok}<small>/${items.length}</small></div><div class="lbl">Số câu trả lời đúng</div></div>
          </div>
        </div>
        <div class="stamp ${pct >= 60 ? "stamp--pass" : "stamp--fail"}">${pct >= 60 ? "Đạt chuẩn B2" : "Chưa đạt B2"}</div>
      </div>
      <div class="result-grid">
        ${Object.entries(perSection).map(([name, s]) => `
          <div class="result-cell"><div class="k">${esc(name)}</div>
          <div class="v ${s.ok / s.total >= 0.6 ? "v--green" : "v--red"}">${s.ok}<small>/${s.total}</small></div></div>`).join("")}
      </div>
      <div style="display:flex;gap:12px;margin:24px 0;flex-wrap:wrap">
        <button class="btn btn--solid" id="rReview">Xem đáp án &amp; giải thích từng câu</button>
        <button class="btn" id="rPrint">In phiếu kết quả</button>
        <a class="btn" href="#/so-loi">Mở Sổ lỗi cá nhân</a>
        <a class="btn btn--ghost" href="#/">Về trang tổng quan</a>
      </div>
      <div id="reviewBody"></div>`;
    $("#rReview").onclick = () => {
      $("#reviewBody").innerHTML = items.map((q, i) => {
        const mine = picks[i], good = mine === q.a;
        return `<div class="sheet sheet--pad" style="margin-bottom:14px">
          <div class="q-card__no" style="color:${good ? "var(--green)" : "var(--red)"}">Câu ${i + 1} (${good ? "Đúng" : "Sai"}) — ${esc(q.section)}</div>
          <div class="q-card__text" style="font-size:18px">${q.q}</div>
          <div class="opts">
            ${q.opts.map((o, j) => `<div class="opt ${j === q.a ? "correct" : j === mine ? "wrong" : "dim"}"><span class="key">${LETTERS[j]}</span><span>${o}</span></div>`).join("")}
          </div>
          ${good ? "" : `<div class="explain explain--no"><span class="explain__tag">Giải thích (Đáp án đúng: ${LETTERS[q.a]}${mine === undefined ? " | Bạn chưa chọn" : ""})</span><p>${q.ex || ""}</p></div>`}
        </div>`;
      }).join("");
      $("#rReview").scrollIntoView({ behavior: "smooth" });
    };
    $("#rPrint").onclick = () => window.print();
  }

  /* Phím tắt: 1–4 / A–D chọn đáp án, ←/→ chuyển câu, F đánh dấu */
  const keyHandler = e => {
    if(submitted) return;
    if(e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    const k = e.key.toLowerCase();
    if(["1", "2", "3", "4"].includes(k) || ["a", "b", "c", "d"].includes(k)){
      const oi = "1234".includes(k) ? +k - 1 : "abcd".indexOf(k);
      if(oi < items[idx].opts.length){ picks[idx] = oi; renderQ(); }
    }
    else if(e.key === "ArrowRight" && idx < items.length - 1){ idx++; renderQ(); }
    else if(e.key === "ArrowLeft" && idx > 0){ idx--; renderQ(); }
    else if(k === "f"){ flags[idx] = !flags[idx]; renderQ(); }
  };
  document.addEventListener("keydown", keyHandler);
  window.__examKeys = keyHandler;

  $("#mSubmit").onclick = () => submit(false);
  renderQ();
}

/* ================= SỔ LỖI ================= */
function viewMistakes(){
  const wrong = Object.entries(Store.d.answers).filter(([id, a]) => !a.ok && !a.resolved);
  const findQ = id => {
    const pools = [GRAMMAR, VOCAB, READING_P1, READING_P2, READING_P3];
    for(const p of pools){ const q = p.find(x => x.id === id); if(q) return { q, src: "Câu hỏi luyện tập" }; }
    for(const g of LISTENING){ const q = g.qs.find(x => x.id === id); if(q) return { q, src: "Nghe hiểu: " + g.title }; }
    const n = id.startsWith("ro") ? +id.slice(2) : null;
    if(n){ for(const p of READING_OFFICIAL){ const q = p.questions.find(x => x.n === n); if(q) return { q: { id, q: q.q, opts: q.opts, a: LETTERS.indexOf(READING_OFFICIAL_KEY[String(n)]), ex: READING_OFFICIAL_EX[String(n)] }, src: "Đọc hiểu: Đề số 01 (Bộ GD&ĐT)" }; } }
    const m = id.match(/^(rset\d+)_(\d+)$/);
    if(m){
      const rSet = ALL_READING_SETS.find(s => s.id === m[1]);
      if(rSet){
        for(const p of rSet.passages){
          const q = p.questions.find(x => x.n === +m[2]);
          if(q) return { q: { id, q: q.q, opts: q.opts, a: q.a, ex: q.ex }, src: "Đọc hiểu: " + rSet.title.split(":")[0] };
        }
      }
    }
    return null;
  };
  const lowWritings = Store.d.writings || [];
  app.innerHTML = moduleHead("Ôn tập cá nhân", "Sổ lỗi cần khắc phục",
    "Tất cả những câu bạn từng chọn sai ở các học phần và bài thi thử, cùng các bài Viết bị chấm dưới 6.0 được tổng hợp tại đây kèm giải thích. Khi đã nắm vững kiến thức, hãy bấm Đã hiểu để hoàn thành.",
    wrong.length + " câu & " + lowWritings.length + " bài viết cần xem lại");
  if(lowWritings.length){
    app.insertAdjacentHTML("beforeend", `
      <div style="margin-bottom:34px">
        <div class="section-head"><span class="section-head__no">Bài viết dưới 6.0</span><h2 style="font-size:22px">Bài Viết cần viết lại</h2><span class="section-head__meta">${lowWritings.length} bài</span></div>
        ${lowWritings.map((w, i) => `
          <div class="sheet sheet--pad" style="margin-bottom:14px">
            <div class="subrev__head" style="margin-bottom:8px">
              <b>Task ${w.task} · ${esc(w.type)}</b>
              <span><span class="tag" style="background:var(--red-soft);border-color:var(--red-border);color:var(--red)">${w.score}/10</span> <span style="font-size:12px;color:var(--ink-3)">${esc(w.code || "")} · ${esc(w.date || "")}</span></span>
            </div>
            <div class="subrev__text">${esc(w.text)}</div>
            <div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap">
              <a class="btn btn--sm" href="#/viet">Viết lại đề này</a>
              <button class="btn btn--sm btn--green" data-wresolve="${i}">✓ Đã cải thiện — Xóa khỏi sổ</button>
            </div>
          </div>`).join("")}
      </div>`);
  }
  if(!wrong.length){
    app.insertAdjacentHTML("beforeend", `<div class="sheet sheet--pad" style="text-align:center;padding:56px 30px"><h2 style="font-size:26px">${lowWritings.length ? "Không còn câu trắc nghiệm nào sai!" : "Sổ lỗi hiện đang trống!"}</h2><p style="color:var(--ink-2);margin-top:8px">Bạn chưa làm sai câu nào hoặc đã ôn tập xong toàn bộ các câu sai trước đó.</p><a class="btn btn--solid" href="#/thi-thu" style="margin-top:18px"><span>Làm bài thi thử mới</span>${ICO.next}</a></div>`);
  } else {
    const groups = {};
    wrong.forEach(([id]) => { const f = findQ(id); if(!f) return; const key = f.src; (groups[key] = groups[key] || []).push([id, f.q]); });
    app.insertAdjacentHTML("beforeend", Object.entries(groups).map(([src, rows]) => `
      <div style="margin-bottom:34px">
        <div class="section-head"><span class="section-head__no">Cần ôn lại</span><h2 style="font-size:22px">${esc(src)}</h2><span class="section-head__meta">${rows.length} câu</span></div>
        ${rows.map(([id, q]) => {
          const a = Store.d.answers[id];
          return `<div class="sheet sheet--pad" style="margin-bottom:14px">
            <div class="q-card__text" style="font-size:18px;margin-top:4px">${esc(q.q)}</div>
            <div class="opts">
              ${q.opts.map((o, j) => `<div class="opt ${j === q.a ? "correct" : j === a.pick ? "wrong" : "dim"}"><span class="key">${LETTERS[j]}</span><span>${esc(o)}</span></div>`).join("")}
            </div>
            <div class="explain explain--no"><span class="explain__tag">Đáp án đúng là ${LETTERS[q.a]}</span><p>${q.ex || ""}</p></div>
            <button class="btn btn--sm btn--green" data-resolve="${id}" style="margin-top:14px">✓ Đã hiểu rõ — Xóa khỏi sổ lỗi</button>
          </div>`;
        }).join("")}
      </div>`).join(""));
  }
  $$("[data-resolve]").forEach(b => b.onclick = () => { Store.resolve(b.dataset.resolve, true); viewMistakes(); });
  $$("[data-wresolve]").forEach(b => b.onclick = () => { Store.resolveWriting(+b.dataset.wresolve); viewMistakes(); });
}

/* ================= CHIẾN THUẬT ================= */
const GUESS_DEMOS = [
  { word: "arduous", sent: "The ascent of the north face is arduous: climbers take twelve hours to cover what looks like a short distance on the map.", opts: ["rất nguy hiểm", "rất gian nan, tốn sức", "rất dốc và trơn", "rất ngắn"], a: 1, clue: "Manh mối: dấu hai chấm + ví dụ theo sau (mất 12 giờ cho quãng đường ngắn) giải thích nghĩa 'gian nan, tốn sức'." },
  { word: "resilient", sent: "Unlike fragile species, mangroves are resilient — they recover quickly after storms and even grow back thicker.", opts: ["dễ tổn thương", "mọc chậm", "có khả năng phục hồi", "khó nhân giống"], a: 2, clue: "Manh mối: 'Unlike fragile' (đối lập) + 'recover quickly' (giải thích) suy ra resilient = bền bỉ, có khả năng phục hồi." },
  { word: "ubiquitous", sent: "Smartphones are now so ubiquitous that finding a student without one is almost impossible.", opts: ["đắt tiền", "có mặt khắp nơi", "bị cấm sử dụng", "đa năng"], a: 1, clue: "Manh mối: mệnh đề kết quả 'finding a student without one is almost impossible' chứng tỏ nghĩa là 'phổ biến, có mặt khắp nơi'." }
];
function viewStrategy(){
  app.innerHTML = moduleHead("Phương pháp", "Chiến thuật làm bài thi VSTEP B2",
    "Hệ thống mẹo phân bổ thời gian, kỹ thuật đoán từ mới trong ngữ cảnh và khung cấu trúc trả lời giúp bạn tối ưu điểm số ở cả 4 kỹ năng.",
    "6 chuyên đề thực chiến") + `

  <div class="strat-grid">
    <div class="sheet sheet--pad strat-card">
      <span class="tag">Chiến thuật 1: Kỹ năng Đọc</span>
      <h3>Đoán nghĩa từ lạ qua 4 manh mối ngữ cảnh</h3>
      <p>Đề Reading VSTEP rất hay hỏi dạng câu “closest in meaning”. Khi gặp từ không biết, hãy đọc câu chứa từ đó và câu kế tiếp để tìm 1 trong 4 dấu hiệu:</p>
      <ul class="tips">
        <li><b>Dấu hiệu định nghĩa:</b> dấu hai chấm (:), gạch ngang (—), “which is”, “meaning” giải thích trực tiếp ngay phía sau.</li>
        <li><b>Dấu hiệu ví dụ:</b> “for instance”, “such as” — nhóm các ví dụ cụ thể sẽ chỉ ra nghĩa chung.</li>
        <li><b>Dấu hiệu đối lập:</b> “unlike”, “however”, “whereas” — từ lạ mang nghĩa trái ngược với từ quen thuộc.</li>
        <li><b>Gốc từ (Tiền tố / Hậu tố):</b> re- (lặp lại), un-/im- (phủ định), -less (không có), -ful (đầy).</li>
      </ul>
      <div style="margin-top:18px;padding-top:16px;border-top:1px solid var(--line-soft)">
        <span class="tag">Thực hành nhanh: Đoán 3 từ qua ngữ cảnh</span>
        <div id="guessDemo" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="sheet sheet--pad strat-card">
      <span class="tag">Chiến thuật 2: Quản lý thời gian Đọc</span>
      <h3>Phân bổ 60 phút cho 4 bài đọc</h3>
      <ul class="tips">
        <li><b>Phần 1 (Thông báo ngắn):</b> 8 câu — đọc câu hỏi trước rồi quét từ khóa trong thông báo. Dành tối đa 8 phút.</li>
        <li><b>Phần 2 (Đối chiếu đoạn văn):</b> Gạch chân điều kiện cốt lõi ở từng câu hỏi (độ tuổi, chi phí, dụng cụ) rồi đối chiếu. Tối đa 12 phút.</li>
        <li><b>Phần 3 (Điền câu vào chỗ trống):</b> Chú ý đại từ chỉ định (this, these, such) và từ nối chuyển ý ở câu liền trước và liền sau. Tối đa 12 phút.</li>
        <li><b>Phần 4 (40 câu đề chuẩn):</b> Câu hỏi luôn sắp xếp theo thứ tự đoạn văn. Câu hỏi từ vựng đọc kỹ 2 dòng quanh từ in đậm.</li>
      </ul>
    </div>

    <div class="sheet sheet--pad strat-card">
      <span class="tag">Chiến thuật 3: Kỹ năng Nghe</span>
      <h3>Tận dụng thời gian đọc trước câu hỏi</h3>
      <ul class="tips">
        <li>Đọc trước 4 đáp án A–D để xác định trọng tâm cần nghe (thời gian, địa điểm, nguyên nhân hay hành động tiếp theo).</li>
        <li>Chú ý cao độ sau các từ chuyển hướng: “however, actually, in fact, but” — đáp án đúng thường xuất hiện ngay sau từ này.</li>
        <li>Cẩn thận bẫy sửa thông tin: người nói thường nêu một con số/giờ hẹn trước rồi đổi ý ở câu sau.</li>
        <li>Luyện tập với trình phát 2 giọng đọc ở mục Nghe với tốc độ 1.0× để quen phản xạ nghe một lần.</li>
      </ul>
    </div>

    <div class="sheet sheet--pad strat-card">
      <span class="tag">Chiến thuật 4: Kỹ năng Viết</span>
      <h3>Lập dàn ý nhanh trong 3 phút đầu</h3>
      <p>Trước khi gõ bài, hãy xác định rõ khung sườn để tránh lạc đề hoặc thiếu chữ:</p>
      <ul class="tips">
        <li><b>Xác định dạng đề:</b> Thảo luận 2 mặt (Discuss both views), Đồng ý/Không đồng ý hay Ưu/Nhược điểm.</li>
        <li><b>Văn phong (Register):</b> Task 2 luôn viết trang trọng (Formal), tuyệt đối tránh viết tắt như “don't, can't, it's”.</li>
        <li><b>Cấu trúc đoạn thân bài:</b> Mỗi đoạn thân bài gồm Câu chủ đề (Topic sentence) + Giải thích (Reason) + Ví dụ thực tế (Example).</li>
        <li><b>Phân bổ độ dài:</b> Task 1 viết khoảng 130–160 từ (trong 20 phút); Task 2 viết khoảng 260–300 từ (trong 40 phút).</li>
        <li><b>Gặp đề lạ không trúng tủ?</b> Mở “Bộ công cụ triển khai ý” ngay trên trang <a href="#/viet"><b>Luyện Viết</b></a> để vặn ý bằng 3 góc nhìn và tra ngân hàng ý vạn năng theo 8 chủ đề.</li>
      </ul>
    </div>

    <div class="sheet sheet--pad strat-card">
      <span class="tag">Chiến thuật 5: Kỹ năng Nói</span>
      <h3>Công thức B-E-R khi gặp câu hỏi khó</h3>
      <ul class="tips">
        <li><b>B (Balanced - Mở đầu cân bằng):</b> “Well, it depends on the situation, really…” giúp bạn có nhịp mở đầu tự nhiên.</li>
        <li><b>E (Experience - Liên hệ thực tế):</b> “In my own experience…” — kể về trải nghiệm cá nhân luôn dễ nói trôi chảy nhất.</li>
        <li><b>R (Rule - Chốt lại khái quát):</b> “Overall, I believe that…” để kết thúc câu trả lời tròn ý và mạch lạc.</li>
        <li>Kết hợp thêm 6 mẫu câu xử lý tình huống ở mục <a href="#/noi"><b>Luyện Nói</b></a>.</li>
      </ul>
    </div>

    <div class="sheet sheet--pad strat-card">
      <span class="tag">Chiến thuật 6: Luyện đề chính thức</span>
      <h3>Lộ trình 3 bước với bộ đề mẫu Bộ GD&amp;ĐT</h3>
      <p>Ứng dụng đã tích hợp trọn bộ bài Đọc, Nghe Part 1, Viết và Nói từ đề minh họa chính thức:</p>
      <ul class="tips">
        <li><b>Bước 1:</b> Vào mục Thi thử CBT làm đề trong 60 phút nghiêm túc để đo điểm chuẩn hiện tại.</li>
        <li><b>Bước 2:</b> Mở Sổ lỗi để đọc kỹ giải thích từng câu sai và tra các từ vựng học thuật chưa biết.</li>
        <li><b>Bước 3:</b> Luyện viết và thu âm bài nói theo đề chính thức, dùng AI chấm theo 4 tiêu chí để hoàn thiện kỹ năng.</li>
      </ul>
    </div>
  </div>`;

  let di = 0, answered = false;
  const demoEl = $("#guessDemo");
  const renderDemo = () => {
    const d = GUESS_DEMOS[di];
    answered = false;
    demoEl.innerHTML = `
      <p style="font-family:var(--serif);font-size:16.5px;line-height:1.7">“${esc(d.sent)}”</p>
      <p style="font-size:13px;font-weight:600;margin:10px 0">Từ cần đoán nghĩa: <b style="color:var(--primary)">${d.word}</b></p>
      <div class="opts" style="max-width:520px">
        ${d.opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="key">${LETTERS[i]}</span><span>${esc(o)}</span></button>`).join("")}
      </div>
      <div id="demoEx"></div>
      <button class="btn btn--ghost btn--sm" id="demoNext" style="margin-top:12px"><span>Thử từ tiếp theo</span>${ICO.next}</button>`;
    $$(".opt", demoEl).forEach(el => el.onclick = () => {
      if(answered) return; answered = true;
      const i = +el.dataset.i, ok = i === d.a;
      Store.addAnswer("guess-" + d.word, i, ok);
      $$(".opt", demoEl).forEach((x, j) => { x.disabled = true; if(j === d.a) x.classList.add("correct"); else if(j === i) x.classList.add("wrong"); else x.classList.add("dim"); });
      $("#demoEx").innerHTML = `<div class="explain ${ok ? "explain--ok" : "explain--no"}"><span class="explain__tag">${ok ? "Chính xác!" : "Đáp án đúng: " + LETTERS[d.a]}</span><p>${esc(d.clue)}</p></div>`;
    });
    $("#demoNext").onclick = () => { di = (di + 1) % GUESS_DEMOS.length; renderDemo(); };
  };
  renderDemo();
}

/* ================= CÀI ĐẶT ================= */
function viewSettings(){
  const c = AI.cfg();
  app.innerHTML = moduleHead("Cấu hình hệ thống", "Cài đặt Trợ lý Giám khảo AI",
    "Toàn bộ ngân hàng đề, từ điển và bộ phân tích cục bộ đều hoạt động miễn phí. Để kích hoạt Giám khảo AI chấm chi tiết bài Viết và bài Nói theo thang VSTEP, bạn có thể nhập API Key cá nhân (chỉ lưu trữ cục bộ trên trình duyệt của bạn).",
    AI.available() ? "Trạng thái: Đã kết nối AI" : "Trạng thái: Chưa kết nối AI") + `
    <div class="sheet sheet--pad" style="max-width:740px">
      <div class="side-stat"><span class="k">Nhà cung cấp mô hình</span>
        <select id="aiProvider" class="ai-input" style="width:310px">
          <option value="gemini" ${c.provider !== "openai" ? "selected" : ""}>Google Gemini (Khuyên dùng - Miễn phí)</option>
          <option value="openai" ${c.provider === "openai" ? "selected" : ""}>OpenAI / Tương thích (OpenRouter, Groq…)</option>
        </select></div>
      <div class="side-stat"><span class="k">API Key của bạn</span>
        <input id="aiKey" type="password" class="ai-input" style="width:310px" placeholder="Dán API Key vào đây…" value="${esc(c.key || "")}"></div>
      <div class="side-stat"><span class="k">Tên Model (tùy chọn)</span>
        <input id="aiModel" class="ai-input" style="width:310px" placeholder="gemini-2.0-flash hoặc gpt-4o-mini" value="${esc(c.model || "")}"></div>
      <div class="side-stat" id="baseUrlRow" style="display:${c.provider === "openai" ? "flex" : "none"}"><span class="k">Base URL (tùy chọn)</span>
        <input id="aiBase" class="ai-input" style="width:310px" placeholder="https://openrouter.ai/api/v1" value="${esc(c.baseUrl || "")}"></div>
      <div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap">
        <button class="btn btn--solid" id="aiSave">Lưu cài đặt</button>
        <button class="btn" id="aiTest">Kiểm tra kết nối</button>
        <button class="btn btn--ghost" id="aiClear">Xóa Key khỏi trình duyệt</button>
      </div>
      <div id="aiTestOut" style="margin-top:16px"></div>
      <hr class="hr-dash">
      <div style="font-size:13.5px;color:var(--ink-2);line-height:1.75">
        <b>Hướng dẫn lấy khóa Gemini miễn phí:</b> Truy cập <code>aistudio.google.com</code> → chọn <b>Get API key</b> bằng tài khoản Google.<br>
        <b>Bảo mật tuyệt đối:</b> Khóa API chỉ được lưu trong <code>localStorage</code> trên máy tính của bạn và gửi yêu cầu trực tiếp tới máy chủ Google/OpenAI.
      </div>
    </div>
    <div class="sheet sheet--pad" style="max-width:740px;margin-top:22px">
      <div class="section-head" style="margin-top:0;margin-bottom:14px"><span class="section-head__no">Dữ liệu</span><h2 style="font-size:22px">Sao lưu &amp; khôi phục</h2></div>
      <p style="font-size:13.5px;color:var(--ink-2);line-height:1.75;margin-bottom:16px">Toàn bộ tiến trình học (lịch sử thi, Sổ lỗi, hộp flashcard, bài thi dở, cấu hình AI) nằm trong trình duyệt. Xuất bản sao lưu để chuyển máy hoặc phòng trường hợp dữ liệu trình duyệt bị xóa.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn btn--solid" id="dataExport">Tải bản sao lưu (.json)</button>
        <button class="btn" id="dataImportBtn">Khôi phục từ tệp…</button>
        <input type="file" id="dataImportFile" accept=".json,application/json" style="display:none">
      </div>
      <div id="dataIoOut" style="margin-top:14px"></div>
      <p style="font-size:12.5px;color:var(--ink-3);margin-top:12px">Tệp sao lưu chứa toàn bộ dữ liệu — kể cả API Key nếu bạn đã lưu — hãy giữ riêng tư và không chia sẻ tệp này.</p>
    </div>`;
  const provSel = $("#aiProvider");
  provSel.onchange = () => { $("#baseUrlRow").style.display = provSel.value === "openai" ? "flex" : "none"; };
  $("#aiSave").onclick = () => {
    AI.saveCfg({ provider: provSel.value, key: $("#aiKey").value.trim(), model: $("#aiModel").value.trim(), baseUrl: $("#aiBase").value.trim() });
    $("#aiTestOut").innerHTML = '<div class="notice"><span><b>Đã lưu cấu hình!</b> Giám khảo AI đã sẵn sàng hoạt động ở học phần Viết và Nói.</span></div>';
  };
  $("#aiTest").onclick = async () => {
    $("#aiTestOut").innerHTML = '<p style="font-size:13.5px;color:var(--ink-2)">Đang kiểm tra kết nối tới máy chủ AI…</p>';
    try{
      const r = await AI.chat("Trả lời đúng một từ: PONG", "Bạn là máy chủ kiểm tra kết nối.");
      $("#aiTestOut").innerHTML = `<div class="notice" style="border-color:var(--green-border);background:var(--green-soft);color:var(--green)"><span><b>Kết nối thành công!</b> Phản hồi từ máy chủ: “${esc(r.trim().slice(0, 60))}”.</span></div>`;
    }catch(e){
      $("#aiTestOut").innerHTML = `<div class="notice"><span><b>Không thể kết nối:</b> ${esc(e.message)}</span></div>`;
    }
  };
  $("#aiClear").onclick = () => { localStorage.removeItem(AI.KEY_STORE); $("#aiKey").value = ""; $("#aiTestOut").innerHTML = '<div class="notice"><span>Đã xóa API Key khỏi trình duyệt.</span></div>'; };
  $("#dataExport").onclick = () => {
    const data = {};
    for(let i = 0; i < localStorage.length; i++){
      const k = localStorage.key(i);
      if(k && k.indexOf("b2.") === 0) data[k] = localStorage.getItem(k);
    }
    const blob = new Blob([JSON.stringify({ app: "phong-thi-b2", v: 1, exportedAt: new Date().toISOString(), data }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "phong-thi-b2-backup-" + todayStr() + ".json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    $("#dataIoOut").innerHTML = `<div class="notice" style="border-color:var(--green-border);background:var(--green-soft);color:var(--green)"><span>Đã xuất ${Object.keys(data).length} mục dữ liệu.</span></div>`;
  };
  $("#dataImportBtn").onclick = () => $("#dataImportFile").click();
  $("#dataImportFile").onchange = e => {
    const f = e.target.files[0];
    e.target.value = "";
    if(!f) return;
    const rd = new FileReader();
    rd.onload = () => {
      try{
        const j = JSON.parse(rd.result);
        const data = j && j.data;
        if(!data || typeof data !== "object") throw new Error("Tệp không đúng định dạng sao lưu.");
        const keys = Object.keys(data).filter(k => k.indexOf("b2.") === 0);
        if(!keys.length) throw new Error("Không tìm thấy dữ liệu hợp lệ trong tệp.");
        if(!confirm(`Khôi phục sẽ GHI ĐÈ toàn bộ dữ liệu hiện tại (${keys.length} mục). Tiếp tục?`)) return;
        keys.forEach(k => localStorage.setItem(k, data[k]));
        location.reload();
      }catch(err){
        $("#dataIoOut").innerHTML = `<div class="notice"><span><b>Không thể khôi phục:</b> ${esc(err.message)}</span></div>`;
      }
    };
    rd.readAsText(f);
  };
}

/* ================= KHỞI ĐỘNG ================= */
Dict.mount();
$("#menuBtn").onclick = () => $("#nav").classList.toggle("open");
if("serviceWorker" in navigator && /^https?:$/.test(location.protocol)){
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
route();
