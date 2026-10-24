/* BANK NGHE — 25 câu
   Part 1 (8 câu): câu hỏi & đáp án lấy từ VSTEP Sample Test chính thức (Level 3-5).
   File audio gốc không công bố kèm văn bản, nên script là phần biên soạn lại
   sao cho khớp 100% đáp án chính thức (in đậm nguồn ở từng item).
   Part 2 & 3: biên soạn riêng, mô phỏng format chính thức. */

const LISTENING = [
/* ---------------- PART 1: 8 thông báo/hướng dẫn ngắn ---------------- */
{gid:"l1",part:1,title:"Announcement 1 — On board a plane",official:true,
 script:[{v:0,t:"Good evening, ladies and gentlemen, and welcome aboard. This is your captain speaking. We'll be landing in Dublin in about two hours and fifty minutes. On behalf of the whole crew, thank you for flying with us from Madrid tonight."}],
 qs:[
 {id:"l101",q:"Where is the flight travelling?",opts:["From Spain to Ireland","From Iceland to Spain","From Spain to Iceland","From Ireland to Spain"],a:0,ex:"“Landing in Dublin” + “flying with us from Madrid” → bay từ Madrid (TBN) sang Dublin (Ai-len) → A. (Đáp án theo đề mẫu chính thức.)"}]},
{gid:"l2",part:1,title:"Announcement 2 — A teacher, last period",official:true,
 script:[{v:0,t:"Right, class, listen carefully. Tomorrow morning we'll be doing painting with the little ones, so your last job today is simple: cover your desks with the old newspapers I'm handing out, right up to the edges, so the paint doesn't get onto the wood. Off you go."}],
 qs:[
 {id:"l102",q:"What does the teacher want the students to do?",opts:["Take everything out of their desks","Put the painting supplies in plastic bags","Bring paints with them to school on Monday","Put covers on their desks to keep the paint off"],a:3,ex:"“Cover your desks with the old newspapers... so the paint doesn't get onto the wood” → phủ bàn để không dính sơn → D. (Đáp án theo đề mẫu chính thức.)"}]},
{gid:"l3",part:1,title:"Announcement 3 — A new classmate",official:true,
 script:[{v:0,t:"Now, before we start, everyone — this is Paavo, and he's just joined us from Estonia. I want you all to give him a really warm welcome and show him where everything is when we break for lunch. Right, Paavo, let's find you a seat."}],
 qs:[
 {id:"l103",q:"What does the teacher want the students to do?",opts:["Introduce themselves to the new student","Welcome the new student","Introduce the new student to the teaching staff","Tell the new student what to learn"],a:1,ex:"“Give him a really warm welcome” → chào đón học sinh mới → B. (Đáp án theo đề mẫu chính thức.)"}]},
{gid:"l4",part:1,title:"Announcement 4 — Weather forecast",official:true,
 script:[{v:0,t:"And now the outlook for the weekend. The fine weather we've enjoyed finally breaks down on Friday. Saturday and Sunday will bring a good deal of cloud, with temperatures no higher than fifteen degrees — feeling rather cool, but at least it should stay dry."}],
 qs:[
 {id:"l104",q:"What will the weather be like at the weekend?",opts:["Hot and sunny","Cool and cloudy","Cool and rainy","Cold and snowy"],a:1,ex:"“A good deal of cloud” + “no higher than fifteen degrees — feeling rather cool, but stay dry” → mát và nhiều mây (không mưa) → B. (Đáp án theo đề mẫu chính thức.)"}]},
{gid:"l5",part:1,title:"Announcement 5 — A woman talking",official:true,
 script:[{v:0,t:"Honestly, it's been strange. Ever since that documentary went out last month, people keep stopping me in the supermarket to ask about my garden. I had no idea the history channel had so many viewers!"}],
 qs:[
 {id:"l105",q:"What can be known about the woman?",opts:["She's been on television.","She's divorced.","She's just had a holiday.","She's having a baby."],a:0,ex:"“Since that documentary went out... the history channel had so many viewers” → bà đã xuất hiện trên truyền hình → A. (Đáp án theo đề mẫu chính thức.)"}]},
{gid:"l6",part:1,title:"Announcement 6 — A woman's savings",official:true,
 script:[{v:0,t:"I've finally decided what to do with my savings. Rather than leaving everything in the bank earning almost nothing, I'm going to buy shares in a few solid companies. My brother says the market has performed well for three years running, so it seems a sensible moment."}],
 qs:[
 {id:"l106",q:"What is the woman talking about?",opts:["Investing in the Stock Exchange","Starting up her own new company","Having problems with her bank","Expecting a promotion"],a:0,ex:"“Buy shares in a few solid companies... the market has performed well” → định đầu tư chứng khoán → A. (Đáp án theo đề mẫu chính thức.)"}]},
{gid:"l7",part:1,title:"Announcement 7 — Car park loudspeaker",official:true,
 script:[{v:0,t:"May I have your attention, please. Vehicles left outside the marked bays will be removed by the tow truck, entirely at the owner's expense. May I repeat: cars not parked legally will be towed away."}],
 qs:[
 {id:"l107",q:"What is done to cars that are NOT parked legally?",opts:["They are fined.","They are towed.","They are ticketed.","They are reparked."],a:1,ex:"“Removed by the tow truck / will be towed away” → xe bị kéo đi → B. (Đáp án theo đề mẫu chính thức.)"}]},
{gid:"l8",part:1,title:"Announcement 8 — Museum recorded message",official:true,
 script:[{v:0,t:"Thank you for calling the City Museum. We are open every day of the week except Mondays. On weekdays, doors open at nine; at weekends, from ten. Last admission is one hour before closing."}],
 qs:[
 {id:"l108",q:"On which day is the museum closed?",opts:["Sunday","Monday","Thursday","Friday"],a:1,ex:"“Open every day of the week except Mondays” → đóng cửa thứ Hai → B. (Đáp án theo đề mẫu chính thức.)"}]},

/* ---------------- PART 2: 3 hội thoại × 3 câu ---------------- */
{gid:"l9",part:2,title:"Conversation 1 — At the hotel desk",official:false,
 script:[
  {v:1,t:"Good evening. Welcome to the Harbour Hotel. How can I help you?"},
  {v:2,t:"Hi, I have a reservation under the name Tran — T-r-a-n. Two nights."},
  {v:1,t:"Let me check... Yes, here it is. A single room, fourth floor, city view. Could I see your passport, please?"},
  {v:2,t:"Here you are. Look, there's one problem — I asked for a quiet room when I booked online, away from the lift."},
  {v:1,t:"I'm afraid the fourth-floor rooms near the lift are the only singles left tonight. The hotel is fully committed because of the food festival. What I can do is move you tomorrow to a room at the back, overlooking the garden — it's our quietest side."},
  {v:2,t:"That would help, thanks. And breakfast is included, isn't it?"},
  {v:1,t:"It is — from seven to ten, in the restaurant behind the lobby. If you leave earlier than that, the kitchen can pack you a box with a roll and fruit — just tell reception the night before."},
  {v:2,t:"Perfect. I'm leaving at six forty-five, so I'll take the box. What time does the festival open, by the way?"},
  {v:1,t:"The stalls open at eleven, but the opening parade starts an hour earlier in the square. Most guests watch it from the rooftop terrace — you're welcome up there from ten."}],
 qs:[
 {id:"l109",q:"What is the guest's problem tonight?",opts:["Her room faces the street.","Her room is next to the lift.","The hotel has lost her booking.","Breakfast is not included."],a:1,ex:"Khách “asked for a quiet room away from the lift” nhưng “the fourth-floor rooms near the lift are the only singles left tonight” → phòng gần thang máy → B."},
 {id:"l110",q:"Why can't the receptionist change the room tonight?",opts:["The guest arrived too late.","There is a festival and the hotel is full.","The garden rooms are being repaired.","The guest did not book directly."],a:1,ex:"“The hotel is fully committed because of the food festival” → khách sạn kín vì lễ hội ẩm thực → B."},
 {id:"l111",q:"What will the guest do tomorrow morning?",opts:["Watch the parade from the square.","Have breakfast in the restaurant.","Leave before breakfast is served.","Move to a hotel near the festival."],a:2,ex:"Nhà hàng mở cửa từ 7 giờ, khách rời lúc 6h45 — trước giờ mở cửa — nên nhận suất ăn mang đi (“I'll take the box”) → C."}]},
{gid:"l10",part:2,title:"Conversation 2 — Two students plan a presentation",official:false,
 script:[
  {v:1,t:"Okay, so we've got fifteen minutes for our presentation on renewable energy. Should we split it — you do wind, I do solar?"},
  {v:2,t:"Hmm, everyone does wind and solar. What if we did something closer to home — like the campus itself? We could call it “How our university could go carbon-neutral by 2035.”"},
  {v:1,t:"That's actually more interesting. But isn't that more work? We'd need real numbers."},
  {v:2,t:"The facilities office published an energy report last spring — the library's electricity use is all in there. My cousin works in that office; she can send us the file."},
  {v:1,t:"Brilliant. Then I'll build the comparison table between the library and the sports hall. What about visuals? Slides again?"},
  {v:2,t:"I'd rather not. Last time half the class was asleep by slide six. Let's do a short video tour instead — film the solar panels on the gym roof, then interview two or three students about what they'd change."},
  {v:1,t:"The video might be great, but don't forget Dr Marsh wants to see our sources listed on one page. With a video, the references are harder to show."},
  {v:2,t:"We'll hand out a one-page sheet with the links. Simple. Shall we meet Thursday to draft the script?"},
  {v:1,t:"Thursday's bad — my part-time shift. Friday morning, before the seminar? And I'll book the camera from the media centre by then."}],
 qs:[
 {id:"l112",q:"What topic do the students finally choose?",opts:["Wind versus solar energy","Making the campus carbon-neutral","How to sleep better in lectures","The history of the facilities office"],a:1,ex:"“How our university could go carbon-neutral by 2035” — phân tích năng lượng cho chính trường → B."},
 {id:"l113",q:"How will they get the data they need?",opts:["From Dr Marsh's reading list","By measuring the gym roof","Through a contact at the facilities office","From last year's class project"],a:2,ex:"“My cousin works in that office; she can send us the file” (báo cáo năng lực của phòng cơ sở vật chất) → C."},
 {id:"l114",q:"What will the man do before Friday?",opts:["Draft the presentation script","Film the solar panels","Interview three students","Reserve a camera from the media centre"],a:3,ex:"Nam: “I'll book the camera from the media centre by then” → đặt máy quay ở trung tâm truyền thông → D."}]},
{gid:"l11",part:2,title:"Conversation 3 — Phoning a bike workshop",official:false,
 script:[
  {v:1,t:"Good morning, Riverside Cycles, Tim speaking. How can I help?"},
  {v:2,t:"Morning. My gears keep slipping whenever I put pressure on the pedals — it's an eight-speed city bike, about four years old."},
  {v:1,t:"Slipping under load usually means the gear cable has stretched, or the mechanism just needs a service. Have you had it looked at recently?"},
  {v:2,t:"Not since the shop where I bought it closed down, so... two years? Maybe three."},
  {v:1,t:"That'll be it, then. A full service — cables, chain, brake check — is thirty-five pounds and takes about an hour if you leave the bike with us."},
  {v:2,t:"An hour's fine. Could I wait while you do it? I was hoping to cycle to work afterwards."},
  {v:1,t:"Today's tight, to be honest — we've got five bikes ahead of you. If you can leave it now, it'll be ready by four. Or come tomorrow at nine and we'll do it while you have a coffee next door."},
  {v:2,t:"Tomorrow at nine works. Do I need to pay anything now?"},
  {v:1,t:"No deposit for a service. Just bring the bike ten to nine so we can book it in — and if the cable's worn we'll replace it, that's an extra six pounds, but I'll call you before touching anything."},
  {v:2,t:"Great, see you at ten to nine."}],
 qs:[
 {id:"l115",q:"What is wrong with the customer's bike?",opts:["The brakes keep failing.","The gears slip under pressure.","The chain has broken.","The bike is too old to fix."],a:1,ex:"“My gears keep slipping whenever I put pressure on the pedals” → đề đang trượt khi đạp mạnh → B."},
 {id:"l116",q:"Why can't the shop service the bike immediately?",opts:["The mechanic is on holiday.","They close early today.","There are five bikes ahead of it.","The needed part is out of stock."],a:2,ex:"“We've got five bikes ahead of you” → còn 5 xe xếp trước → C."},
 {id:"l117",q:"What arrangement do they finally make?",opts:["The customer waits an hour today.","The bike is collected from her home.","She leaves the bike now and pays a deposit.","She brings the bike at 8.50 tomorrow."],a:3,ex:"“Come tomorrow at nine... bring the bike ten to nine” → 8h50 ngày mai mang xe đến → D."}]},

/* ---------------- PART 3: 2 bài nói dài × 4 câu ---------------- */
{gid:"l12",part:3,title:"Talk 1 — Welcome to the city bike-share scheme",official:false,
 script:[
  {v:0,t:"Hello everyone, and welcome to your induction for PedalPoint, the city's new bike-share scheme. I'll keep this short because I know you all want to get out there. First, how it works. Each of the forty docking stations around the city holds between twelve and twenty bikes. You unlock one with the app or your membership card, ride it, and return it to any station — not necessarily the one you took it from. The first thirty minutes of every ride are free; after that, you pay one pound for each additional half hour. So if you're commuting, the trick is simple: park the bike near your office before the half hour ends, and start a new ride later. Now, a few rules. Helmets are not provided, so we strongly recommend bringing your own. By law you must have front and rear lights after dark, and all our bikes have them built in — just press the small button on the left handlebar. Please stick to cycle lanes where they exist; that's a condition of your membership, and riders who repeatedly ignore it can have their accounts suspended for a week. Finally, maintenance. Every bike is inspected when it's redocked, but if you find one with a flat tyre or a damaged brake, press the fault button in the app — that bike gets locked out of the system, and you'll get five pounds of credit for reporting it. Right — any questions before we hand out the cards?"}],
 qs:[
 {id:"l118",q:"What is the speaker doing?",opts:["Selling city bikes to commuters","Training new members of a bike-share scheme","Explaining changes to traffic law","Advertising a new bike shop"],a:1,ex:"“Welcome to your induction for PedalPoint, the city's new bike-share scheme” — bài hướng dẫn cho hội viên mới → B."},
 {id:"l119",q:"How much does a 45-minute ride cost?",opts:["Nothing at all","One pound","One pound fifty","Four pounds fifty"],a:1,ex:"30 phút đầu miễn phí, mỗi 30 phút tiếp theo 1 bảng → 45 phút = 30 (miễn phí) + 15 phút (1 bảng vì đã chạm mốc nửa giờ) → 1 bảng → B."},
 {id:"l120",q:"What can happen to members who repeatedly ride outside cycle lanes?",opts:["They lose their licence.","They must pay a fine to the city.","Their accounts are suspended for a week.","They get extra free minutes."],a:2,ex:"“Riders who repeatedly ignore it can have their accounts suspended for a week” → tài khoản bị khoá 1 tuần → C."},
 {id:"l121",q:"What do members get for reporting a broken bike?",opts:["A new helmet","Five pounds of credit","A free year's membership","Priority at docking stations"],a:1,ex:"“You'll get five pounds of credit for reporting it” → 5 bảng tín dụng → B."}]},
{gid:"l13",part:3,title:"Talk 2 — A lecture on urban beekeeping",official:false,
 script:[
  {v:0,t:"Today I want to challenge a common assumption: that honey bees belong in the countryside, not in cities. In fact, urban beekeeping is booming, and the bees may be better off downtown than down on the farm. Consider food sources. A rural monoculture — fields and fields of a single crop — flowers for two or three weeks, then offers nothing. A city, by contrast, is a patchwork: parks, balconies, railway embankments, waste ground, all planted at different times. From a bee's point of view, that's a buffet that never closes. Studies in several European capitals have found urban hives produce, on average, a heavier honey harvest than rural ones in the same region. Temperature helps too: towns are a degree or two warmer, so bees fly earlier in spring and later in autumn. Does that mean city honey is safe from pollution? Largely, yes — researchers tested honey from city hives for heavy metals and found levels well below legal limits for food, probably because bees filter their own environment surprisingly well. The real challenge is not chemistry but space and neighbours: hives need a water source and a flight path that doesn't cross a busy pavement, and one nervous neighbour with a sting allergy can end a project. Experienced keepers site hives high — on flat roofs — so the bees fly above head height and most people never notice them. Next week, we'll look at what this means for policy: should cities treat beehives like community gardens?"}],
 qs:[
 {id:"l122",q:"What is the main idea of the lecture?",opts:["City bees can thrive better than rural bees in some ways.","Beekeeping should be banned in the countryside.","Urban honey is dangerous to eat.","Cities are too warm for most insects."],a:0,ex:"Giảng viên “challenge a common assumption” và chứng minh: đô thị có nguồn hoa đa dạng quanh năm, mật ong thành phố nặng hơn, ô nhiễm thấp → ong có thể sống tốt hơn ở phố → A."},
 {id:"l123",q:"Why does the lecturer compare a rural monoculture with a city?",opts:["To show the city offers bees food all year round","To prove rural bees make sweeter honey","To argue cities should plant more crops","To explain why bees fly faster in summer"],a:0,ex:"Đồng một loại cây chỉ hoa 2-3 tuần; thành phố là “patchwork” trồng các thời điểm khác nhau → “a buffet that never closes” = thức ăn quanh năm → A."},
 {id:"l124",q:"What did researchers find about heavy metals in urban honey?",opts:["Levels far above food safety limits","Levels well below legal limits","No difference between city and farm honey","Rising levels each year"],a:1,ex:"“Found levels well below legal limits for food” → dưới ngưỡng pháp luật cho phép → B."},
 {id:"l125",q:"Why do experienced beekeepers place hives on flat roofs?",opts:["To protect hives from wind","To keep bees flying above people","To collect rainwater for the bees","To make honey easier to transport"],a:1,ex:"“Site hives high — on flat roofs — so the bees fly above head height and most people never notice them” → ong bay trên đầu người, đỡ phiền hàng xóm → B."}]}
];
