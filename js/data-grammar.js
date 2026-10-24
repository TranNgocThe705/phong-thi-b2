/* BANK ĐỀ NGỮ PHÁP — 60 câu · 12 chủ đề (mức B2, phong cách VSTEP) */
const GRAMMAR = [
/* --- 1. Hiện tại hoàn thành vs quá khứ đơn --- */
{id:"g01",topic:"Thì hoàn thành",q:"Since she moved to Hanoi last March, Lan ______ in three different flats.",opts:["lived","has lived","lives","is living"],a:1,ex:"Cụm “Since + mốc quá khứ (last March)” đi với hiện tại hoàn thành. Chọn <b>has lived</b>."},
{id:"g02",topic:"Thì hoàn thành",q:"Shakespeare ______ at least 37 plays during his lifetime.",opts:["has written","wrote","had written","writes"],a:1,ex:"Nói về người đã chết (Shakespeare) với “during his lifetime” — chu kỳ đã khép lại, dùng quá khứ đơn <b>wrote</b>."},
{id:"g03",topic:"Thì hoàn thành",q:"This is the first time I ______ Vietnamese street food this spicy.",opts:["eat","ate","have eaten","had eaten"],a:2,ex:"Cấu trúc “This is the first time + S + <b>have/has + V3</b>”: lần đầu tiên làm gì tính đến hiện tại."},
{id:"g04",topic:"Thì hoàn thành",q:"I ______ my homework yet, so I can't go out with you tonight.",opts:["haven't finished","didn't finish","don't finish","hadn't finished"],a:0,ex:"“Yet” trong câu phủ định ở hiện tại → hiện tại hoàn thành phủ định: <b>haven't finished</b>."},
{id:"g05",topic:"Thì hoàn thành",q:"While the engineers ______ the bridge, they discovered a serious design fault.",opts:["have inspected","were inspecting","inspect","had been inspected"],a:1,ex:"“While + quá khứ tiếp diễn” diễn tả hành động đang diễn ra thì hành động khác xen vào (discovered). Chọn <b>were inspecting</b>."},

/* --- 2. Câu bị động --- */
{id:"g06",topic:"Câu bị động",q:"The final exam results ______ to students by email next Friday.",opts:["will send","will be sent","will be sending","are sending"],a:1,ex:"Chủ ngữ results “được gửi” → bị động tương lai: <b>will be sent</b>."},
{id:"g07",topic:"Câu bị động",q:"The old market hall is currently ______ into a public library.",opts:["converted","converting","being converted","been converting"],a:2,ex:"Bị động tiếp diễn: is + <b>being + V3</b> — “đang được chuyển đổi”."},
{id:"g08",topic:"Câu bị động",q:"By the time the fire brigade arrived, the whole warehouse ______.",opts:["was destroyed","had been destroyed","has been destroyed","destroyed"],a:1,ex:"Hành động bị xảy ra trước một quá khứ khác (arrived) → bị động quá khứ hoàn thành: <b>had been destroyed</b>."},
{id:"g09",topic:"Câu bị động",q:"The applicant should ______ to bring all supporting documents to the interview.",opts:["tell","be told","be telling","have told"],a:1,ex:"Bị động với modal: should + <b>be + V3</b> — “nên được nhắc”."},
{id:"g10",topic:"Câu bị động",q:"Rarely ______ such dedication in a first-year intern.",opts:["we have seen","we see","have we seen","we had seen"],a:2,ex:"Đảo ngữ sau trạng từ phủ định đầu câu (Rarely): <b>have we seen</b> — hiếm khi chúng ta thấy."},

/* --- 3. Câu điều kiện --- */
{id:"g11",topic:"Câu điều kiện",q:"If I ______ you were allergic to peanuts, I wouldn't have ordered this dish.",opts:["knew","had known","would know","have known"],a:1,ex:"Điều kiện loại 3 (điều trái quá khứ): If + S + <b>had V3</b>, S + would have V3."},
{id:"g12",topic:"Câu điều kiện",q:"______ more time, she could easily finish the writing task.",opts:["If she has","Had she had","She has","Should she have"],a:1,ex:"Điều kiện loại 3 bỏ “if” đảo “had”: <b>Had she had</b> more time = If she had had more time."},
{id:"g13",topic:"Câu điều kiện",q:"Unless the council ______ the noise rules, residents will keep complaining.",opts:["enforces","doesn't enforce","enforced","will enforce"],a:0,ex:"“Unless = If ... not” nên mệnh đề if luôn khẳng định, chia hiện tại đơn: <b>enforces</b>."},
{id:"g14",topic:"Câu điều kiện",q:"I wish the landlord ______ the heating fixed before winter — it's freezing in here.",opts:["gets","got","would get","will get"],a:2,ex:"“Wish + S + would + V” diễn tả mong muốn người khác thay đổi hành động ở hiện tại/tương lai: <b>would get</b>."},
{id:"g15",topic:"Câu điều kiện",q:"It's high time you ______ studying for the B2 exam instead of scrolling your phone.",opts:["start","started","will start","have started"],a:1,ex:"Cấu trúc “It's (high) time + S + <b>V2</b>” (quá khứ giả định): started."},

/* --- 4. Câu tường thuật --- */
{id:"g16",topic:"Câu tường thuật",q:"The tour guide asked me where ______ from.",opts:["do I come","did I come","I came","I come"],a:2,ex:"Câu hỏi Wh khi tường thuật đổi sang trật tự câu trần thuật, lùi thì: asked me where <b>I came</b> from — không giữ trợ động từ do/did."},
{id:"g17",topic:"Câu tường thuật",q:"She reminded her roommate ______ the electricity bill before the deadline.",opts:["paying","to pay","pay","to paying"],a:1,ex:"Remind somebody <b>to do</b> something — nhắc ai làm gì."},
{id:"g18",topic:"Câu tường thuật",q:"He apologised ______ so rude at the meeting the previous day.",opts:["for being","to be","being","to being"],a:0,ex:"Apologise <b>for + V-ing</b> — xin lỗi vì đã làm gì."},
{id:"g19",topic:"Câu tường thuật",q:"The manager insisted ______ the report himself before it went out.",opts:["to check","on checking","checking","for checking"],a:1,ex:"Insist <b>on + V-ing</b> — kiên quyết làm gì."},
{id:"g20",topic:"Câu tường thuật",q:"My friend suggested ______ the 7 a.m. train to avoid the rush.",opts:["to take","taking","we taking","take"],a:1,ex:"Suggest <b>+ V-ing</b> (hoặc suggest + that + S + V) — gợi ý làm gì."},

/* --- 5. Mệnh đề quan hệ --- */
{id:"g21",topic:"Mệnh đề quan hệ",q:"The candidate ______ CV impressed the panel most will be invited back.",opts:["who","whom","whose","which"],a:2,ex:"Sở hữu cho người (CV <i>của</i> ứng viên) → <b>whose</b>."},
{id:"g22",topic:"Mệnh đề quan hệ",q:"The coastal town ______ we spent our holiday has changed beyond recognition.",opts:["which","where","that","when"],a:1,ex:"Nơi chốn và phía sau là mệnh đề không thiếu tân ngữ → dùng <b>where</b> (= in which)."},
{id:"g23",topic:"Mệnh đề quan hệ",q:"Her thesis, ______ was supervised by Professor Gray, won a national award.",opts:["that","which","who","it"],a:1,ex:"Mệnh đề quan hệ không hạn định (giữa hai dấu phẩy) chỉ dùng <b>which</b>, không dùng that."},
{id:"g24",topic:"Mệnh đề quan hệ",q:"Nguyen Du, ______ wrote “The Tale of Kieu”, is honoured as a cultural icon.",opts:["that","whose","who","which"],a:2,ex:"Chỉ người, làm chủ ngữ → <b>who</b>."},
{id:"g25",topic:"Mệnh đề quan hệ",q:"Students ______ submit the form after Friday will lose their priority status.",opts:["which","who","whose","whom"],a:1,ex:"Chỉ người (Students) và làm chủ ngữ của mệnh đề → <b>who</b>."},

/* --- 6. Gerund & Infinitive --- */
{id:"g26",topic:"Gerund/Infinitive",q:"I'll never forget ______ the sunrise over Ha Long Bay for the first time.",opts:["to see","seeing","to seeing","see"],a:1,ex:"Forget + <b>V-ing</b> = quên việc đã làm (kỷ niệm); forget to do = quên chưa làm việc gì."},
{id:"g27",topic:"Gerund/Infinitive",q:"The committee postponed ______ a final decision until next month.",opts:["to make","making","make","to making"],a:1,ex:"Postpone + <b>V-ing</b>: trì hoãn việc gì."},
{id:"g28",topic:"Gerund/Infinitive",q:"We stopped ______ directions because the GPS signal kept dropping.",opts:["to ask","asking","ask","for asking"],a:0,ex:"Stop <b>to do</b> = dừng lại để làm việc khác (hỏi đường); stop doing = ngừng hẳn việc đang làm."},
{id:"g29",topic:"Gerund/Infinitive",q:"Rather than ______ a taxi, they decided to walk to the conference hall.",opts:["take","taking","to take","took"],a:0,ex:"“Rather than + V nguyên mẫu” (không to) khi đứng đầu câu: <b>take</b>."},
{id:"g30",topic:"Gerund/Infinitive",q:"It's no use ______ about the delay — the train won't come any sooner.",opts:["to complain","complain","complaining","complained"],a:2,ex:"Cấu trúc “It's no use + <b>V-ing</b>” — than phiền cũng vô ích."},

/* --- 7. Mạo từ & determiner --- */
{id:"g31",topic:"Mạo từ",q:"She plays ______ piano beautifully, though she has never had formal lessons.",opts:["a","an","the","no article"],a:2,ex:"Nhạc cụ sau “play” luôn dùng mạo từ xác định <b>the</b> (play the piano)."},
{id:"g32",topic:"Mạo từ",q:"______ unemployment rate among graduates fell for the third year running.",opts:["A","An","The","No article"],a:2,ex:"“Unemployment rate” được xác định bằng ngữ cảnh (xếp hạng/thứ tự, among graduates) → <b>The</b>."},
{id:"g33",topic:"Mạo từ",q:"There were only ______ seats left, so we booked them immediately.",opts:["a little","a few","much","a great deal of"],a:1,ex:"Seats là danh từ đếm được số nhiều → <b>a few</b> (một vài)."},
{id:"g34",topic:"Mạo từ",q:"He gave me ______ advice about choosing a dissertation topic.",opts:["a few","many","a piece of","two"],a:2,ex:"Advice là danh từ không đếm được; muốn đếm phải dùng <b>a piece of advice</b>."},
{id:"g35",topic:"Mạo từ",q:"______ knowledge of two foreign languages gave her an edge in the interview.",opts:["Her","A her","The her","Hers"],a:0,ex:"Tính từ sở hữu đứng trước danh từ: <b>Her</b> knowledge — không dùng mạo từ kèm theo."},

/* --- 8. Giới từ --- */
{id:"g36",topic:"Giới từ",q:"The new intern is not accustomed ______ working night shifts.",opts:["with","to","for","on"],a:1,ex:"Be accustomed <b>to + V-ing</b> — quen với việc gì."},
{id:"g37",topic:"Giới từ",q:"His success is largely due ______ the mentors who guided him early on.",opts:["of","for","to","with"],a:2,ex:"Due <b>to</b> = do vì, nhờ vào."},
{id:"g38",topic:"Giới từ",q:"The seminar was cancelled ______ short notice because the keynote speaker fell ill.",opts:["in","with","at","on"],a:2,ex:"Cụm cố định “<b>at</b> short notice” — thông báo/cho biết trong thời gian rất ngắn."},
{id:"g39",topic:"Giới từ",q:"She has a remarkable talent ______ putting people at ease.",opts:["of","for","in","to"],a:1,ex:"A talent <b>for</b> + V-ing — tài năng về việc gì."},
{id:"g40",topic:"Giới từ",q:"______ principle, I agree with the proposal; ______ practice, it may be costly.",opts:["In/for","On/in","In/in","For/on"],a:2,ex:"Hai cụm cố định: “<b>In</b> principle” (về nguyên tắc) và “<b>in</b> practice” (trên thực tế)."},

/* --- 9. So sánh --- */
{id:"g41",topic:"So sánh",q:"The speaking test was far ______ than I had expected.",opts:["more easier","easier","more easy","the easiest"],a:1,ex:"Easy là tính từ ngắn → so sánh hơn: <b>easier</b>; “far” đứng trước để nhấn mạnh."},
{id:"g42",topic:"So sánh",q:"The longer the essay, ______ it becomes to keep the reader engaged.",opts:["the harder","harder","the hardest","as hard"],a:0,ex:"Cấu trúc so sánh kép “The + comparative, <b>the + comparative</b>”: The longer..., the harder...."},
{id:"g43",topic:"So sánh",q:"This laptop is nowhere near ______ the one advertised in the brochure.",opts:["as powerful as","more powerful than","so powerful than","powerful as"],a:0,ex:"“Nowhere near + as + adj + as” — không gần bằng... Chọn <b>as powerful as</b>."},
{id:"g44",topic:"So sánh",q:"Of the two routes, the mountain road is certainly the ______ scenic.",opts:["least","less","lesser","little"],a:1,ex:"Chỉ so sánh giữa HAI đối tượng nên dùng so sánh hơn: the <b>less</b> scenic — “the least” chỉ dùng từ ba đối tính trở lên."},
{id:"g45",topic:"So sánh",q:"Tickets sold far more quickly ______ the organisers had predicted.",opts:["that","as","than","then"],a:2,ex:"So sánh hơn với “more quickly” phải đi với <b>than</b>."},

/* --- 10. Động từ khuyết thiếu --- */
{id:"g46",topic:"Động từ khuyết thiếu",q:"The lights are off and the gate's locked — the owners ______ have gone away for the weekend.",opts:["must","can't","shouldn't","needn't"],a:0,ex:"Suy diễn chắc chắn về quá khứ dựa trên bằng chứng (đèn tắt, cổng khoá): <b>must</b> have gone — hẳn là đã đi vắng."},
{id:"g47",topic:"Động từ khuyết thiếu",q:"You ______ have told me the interview was rescheduled — I waited for an hour!",opts:["should","must","can","may"],a:0,ex:"Phê phán hành động quá khứ: <b>should</b> have V3 — lẽ ra nên."},
{id:"g48",topic:"Động từ khuyết thiếu",q:"Candidates ______ not bring dictionaries into the examination room.",opts:["may","must","should","could"],a:1,ex:"Cấm đoán chính thức (quy định phòng thi): <b>must</b> not bring."},
{id:"g49",topic:"Động từ khuyết thiếu",q:"You ______ have paid for the museum entry — admission is free on Sundays.",opts:["needn't","mustn't","couldn't","wouldn't"],a:0,ex:"Needn't have V3 = đã làm điều không cần thiết: <b>needn't</b> have paid."},
{id:"g50",topic:"Động từ khuyết thiếu",q:"When I was at school, we ______ wear a uniform every single day.",opts:["must","had to","need to","should"],a:1,ex:"Nghĩa bắt buộc ở quá khứ dùng <b>had to</b> (must không có dạng quá khứ)."},

/* --- 11. Word formation --- */
{id:"g51",topic:"Word formation",q:"The ______ of the old quarter requires careful planning and public consultation.",opts:["redevelop","redevelopment","redeveloping","redeveloped"],a:1,ex:"Cần danh từ sau mạo từ “the”: the <b>redevelopment</b> (việc tái phát triển)."},
{id:"g52",topic:"Word formation",q:"Her presentation was clear, well-organised and ______ persuasive.",opts:["remark","remarkably","remarkable","remarked"],a:1,ex:"Cần trạng từ bổ nghĩa cho tính từ “persuasive”: <b>remarkably</b>."},
{id:"g53",topic:"Word formation",q:"Employers value candidates who show ______ in fast-changing environments.",opts:["adaptable","adapt","adaptability","adapted"],a:2,ex:"Sau “show” cần danh từ làm tân ngữ: <b>adaptability</b> (khả năng thích ứng)."},
{id:"g54",topic:"Word formation",q:"The report highlights a growing ______ between urban and rural incomes.",opts:["divide","divided","dividing","divisional"],a:0,ex:"Sau mạo từ “a” cần danh từ: a growing <b>divide</b> (khoảng cách chia rẽ)."},
{id:"g55",topic:"Word formation",q:"We were impressed by the ______ of the hotel staff throughout our stay.",opts:["courteous","courteously","courtesy","courting"],a:2,ex:"Sau “the” cần danh từ: <b>courtesy</b> — sự lịch thiệp."},

/* --- 12. Liên từ & nhượng bộ --- */
{id:"g56",topic:"Từ nối",q:"______ the heavy rain, the outdoor ceremony went ahead as planned.",opts:["Despite","Although","However","Because of"],a:0,ex:"Sau chỗ trống là cụm danh từ “the heavy rain” → dùng <b>Despite</b> (although phải đi với mệnh đề)."},
{id:"g57",topic:"Từ nối",q:"The lecture was cancelled; ______, the students were asked to watch a recorded video.",opts:["therefore","moreover","nevertheless","for instance"],a:2,ex:"Quan hệ tương phản (đã huỷ — nhưng vẫn phải học): <b>nevertheless</b> (tuy nhiên)."},
{id:"g58",topic:"Từ nối",q:"______ he had prepared thoroughly, the panel's questions still caught him off guard.",opts:["Despite","In spite","Even though","Because of"],a:2,ex:"Phía sau là mệnh đề đầy đủ (he had prepared) → liên từ <b>Even though</b>."},
{id:"g59",topic:"Từ nối",q:"The charity operates on a shoestring; ______, it has helped over 2,000 families.",opts:["therefore","nonetheless","thus","hence"],a:1,ex:"Tương phản giữa nguồn lực ít và kết quả lớn → <b>nonetheless</b> (dù vậy)."},
{id:"g60",topic:"Từ nối",q:"Not only ______ the deadline, but she also exceeded every quality target.",opts:["she met","did she meet","she did meet","met she"],a:1,ex:"“Not only” đầu câu thì đảo trợ động từ: <b>did she meet</b>."}
];
