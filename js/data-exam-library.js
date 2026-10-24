/* avoid-ai-design-ignore-file: CP2, SD4w, SD4d */
/* ============================================================
   THƯ VIỆN BỘ ĐỀ VSTEP MỞ RỘNG (Bóc tách từ PDF & HTML)
   Nguồn:
   - Đề số 01: PDF Đề mẫu Bộ GD&ĐT / ĐH Đồng Tháp (40 câu Reading + 35 câu Listening + Writing + Speaking)
   - Đề số 02: PDF Đề minh họa ĐH Ngoại Thương FTU / ĐH Cần Thơ (40 câu Reading + Listening + Writing + Speaking)
   - Đề số 03: EVSTEP Reading Full Test 1 (40 câu Reading) + ZIM Listening Full Test (35 câu)
   - Đề số 04: EVSTEP Reading Full Test 2 (40 câu Reading)
   - Đề số 05: Ngoại Ngữ Vivian Reading Full Test (40 câu Reading kèm giải thích chuyên sâu)
   - Đề số 06: ZIM Academy & PREP Edu Combined Full Test (40 câu Reading + Writing + Speaking)
   ============================================================ */

const EXTRA_READING_SETS = [
  /* ==========================================================
     BỘ ĐỀ READING SỐ 02 — Nguồn: PDF Đề minh họa ĐH Ngoại Thương (FTU)
     ========================================================== */
  {
    id: "rset2",
    title: "Đề số 02: Đề minh họa ĐH Ngoại Thương (PDF FTU)",
    source: "PDF Đề minh họa VSTEP — ĐH Ngoại Thương (vstep.ftu.edu.vn)",
    passages: [
      {
        title: "PASSAGE 1 - Four Careers (Luc, Harry, Jennifer, Solange)",
        body: `Ever wondered what it feels like to have a different job? Here, four people with very different careers reveal the trade secrets of their working day.

Luc
My day typically starts with a business person going to the airport, and nearly always ends with a drunk. I don't mind drunk people. Sometimes I think they're the better version of themselves: more relaxed, happier, honest. Only once have I feared for my life. A guy ran out at a traffic light and so I sped up before his brother could run, too. He seemed embarrassed and made me drop him at a car park. When we arrived, the first guy was waiting with a boulder, which went through the windscreen, narrowly missing my head. But the worst people are the ones who call me “Driver!”

Harry
I not only provide appearance for my client, I also do damage control. We've had clients involved in lawsuits, divorces or drugs. One mistakenly took a gun to an airport. On the red carpet – at the Academy Awards or the Golden Globes – I'm the person making my client look good. The other day at an Oprah Winfrey event, the carpet wasn't put down properly and my clients almost went flying – I had to catch them. They can make some strange requests, too. At a black-tie gala at the White House, two clients hated the dinner and insisted that we circle around Washington DC to find a KFC open at 1 a.m. I had to go in wearing a gown and order so they could eat it in the car.

Jennifer
I could teach you to do a basic brain operation in two weeks. But what takes time and experience is doing it without wrecking the brain of the patients – learning your limitations takes years. I ended up working as a pediatric neurosurgeon because children make better recoveries from brain damage than adults. So it's more rewarding in terms of outcome and I find their resilience really inspiring. It's taken me a decade to become comfortable discussing an operation with children, but they have to be able to ask questions. You have to show them respect. Sometimes their perspective is funny; most teenage girls just want to know how much hair you'll shave off. I don't get upset by my job. These children are dying when they come in and I do whatever I can to make them better.

Solange
When you become a judge after years of being a barrister and trying to make points that win cases, you have to remember that a huge part of what you do is listening – to advocates, to witnesses, to defendants. Behind closed doors most judges, even very experienced ones, are much more anxious about their work than most people might think. We agonise over what we do and the decisions we have to make. It would be bizarre to say that as a judge, we learn to be less judgmental. But as you see the complex and difficult lives of the people who end up in front of you, you realise that your job is not so much to judge them as to ensure that everyone receives justice.`,
        questions: [
          { n: 1, q: "In the first paragraph, what best paraphrases the sentence ‘My day typically starts with a business person going to the airport, and nearly always ends with a drunk’?", opts: ["Normally, I will take a business person and a drunk at the airport.", "Normally, I will go to the airport in the morning and come back with a drunk.", "Normally, my first passenger will be a businessman and my last one a drunk.", "Normally, I will drive a businessman to the airport and come back almost drunk."], a: 2, ex: "Luc là tài xế taxi: khách đầu ngày thường là doanh nhân ra sân bay, và khách cuối ngày thường là người say rượu → C." },
          { n: 2, q: "What does Harry probably do for a living?", opts: ["A tour guide", "An agent / publicist", "A lawyer", "A driver"], a: 1, ex: "Harry chăm sóc hình ảnh và xử lý khủng hoảng truyền thông cho khách hàng nổi tiếng tại thảm đỏ Oscar/Golden Globes → người đại diện (agent/publicist) → B." },
          { n: 3, q: "The word ‘circle’ in paragraph 2 could be best replaced by", opts: ["drive around", "look", "walk", "ride"], a: 0, ex: "“Circle around Washington DC to find a KFC... eat it in the car” → lái xe vòng quanh thành phố → A." },
          { n: 4, q: "What does Jennifer mean when she says, ‘Learning your limitations takes years’?", opts: ["It takes a long time to control weakness in a brain operation.", "It takes a long time to understand what a surgeon cannot help or do safely.", "It takes years to perform even a basic operation.", "It takes years to be able to perform brain surgery."], a: 1, ex: "Mổ cơ bản có thể dạy trong 2 tuần, nhưng biết giới hạn an toàn để không làm tổn thương não bệnh nhân cần nhiều năm kinh nghiệm → B." },
          { n: 5, q: "The word ‘their’ in paragraph 3 refers to", opts: ["patients’", "neurosurgeons’", "children’s", "adults’"], a: 2, ex: "“Children make better recoveries... I find their resilience really inspiring” → their quy chiếu tới children's → C." },
          { n: 6, q: "The word ‘perspective’ in paragraph 3 is closest in meaning to", opts: ["question", "worry", "view", "prospective"], a: 2, ex: "Perspective = góc nhìn, quan điểm (view) → C." },
          { n: 7, q: "According to the passage, whose job involves in a large part listening to others?", opts: ["Luc’s", "Harry’s", "Jennifer’s", "Solange’s"], a: 3, ex: "Solange (thẩm phán): “a huge part of what you do is listening – to advocates, to witnesses, to defendants” → D." },
          { n: 8, q: "According to the passage, who is likely to meet different types of passengers every day?", opts: ["Luc", "Harry", "Jennifer", "Solange"], a: 0, ex: "Luc là tài xế chở đủ mọi đối tượng khách mỗi ngày từ doanh nhân đến khách say xỉn → A." },
          { n: 9, q: "The word ‘ones’ in the last paragraph refers to", opts: ["judges", "barristers", "advocates", "defendants"], a: 0, ex: "“Most judges, even very experienced ones” → ones thay thế cho judges → A." },
          { n: 10, q: "What is the purpose of this passage?", opts: ["To inform people of what to expect in those jobs.", "To report what different people do and think about their jobs.", "To raise awareness of the importance of different jobs.", "To discuss the advantages and disadvantages of these jobs."], a: 1, ex: "Đoạn mở đầu nêu rõ: 4 người làm 4 nghề khác nhau chia sẻ công việc và suy nghĩ thực tế mỗi ngày của họ → B." }
        ]
      },
      {
        title: "PASSAGE 2 - First-Time Renters in New York City",
        body: `Spring is the season when newly minted college graduates flock to New York City to start their careers. They begin the search for their dream apartment, brokers say, with the same single-minded determination that earned them their degrees and landed them their jobs in the first place. But that determination only goes so far when it comes to Manhattan real estate. [A]

“Almost every single person I’ve worked with thinks there’s a golden nugget of an apartment waiting right for them,” said Paul Hunt, an agent at Citi Habitats who specializes in rentals. “They all want to be in the Village, and they all want the ‘Sex and the City’ apartment.”

The first shock for a first-time renter will probably be the prices. Consider that the average monthly rent for a one-bedroom in the Village is more than $3,100 and that the average for a studio is over $2,200. Or that the average rent for a one-bedroom in a doorman building anywhere in Manhattan is close to $3,500. [B]

Mr. Hunt said that when he shows prospective renters what their budget really can buy, they are sometimes so appalled that “they think I’m trying to fool them or something, and they run away and I don’t hear from them again.” Alternatively, the renter checks his or her expectations and grudgingly decides to raise the price limit, or look in other neighborhoods or get a roommate. “When expectations are very high, the process can be very frustrating,” Mr. Hunt said.

The thousands of new graduates who will be driving the engine of the city’s rental market from now until September will quickly learn that renting in New York is not like renting anywhere else. [C]

The second shock is likely to be how small a Manhattan apartment can be. It is not uncommon in New York, for example, to shop for a junior one-bedroom only to find out it is really a studio that already has or can have a wall put up to create a bedroom.

[D] To start with, landlords want only tenants who earn at least 40 times the monthly rent, which means an $80,000 annual salary for a $2,000 apartment. According to census data, more than 25,000 graduates aged 22 to 28 moved to the city in 2006, and their median salary was about $35,600.

Those who don’t make 40 times their monthly rent need a guarantor, usually a parent, who must make at least 80 times the monthly rent. In addition to a security deposit, some landlords also want the first and last month’s rent. Tack on a broker’s fee and a prospective renter for that $2,000 apartment is out of pocket nearly $10,000 just to get the keys to the place.`,
        questions: [
          { n: 11, q: "Which of the following would be the best title for this article?", opts: ["Best Guide to Finding an Apartment in New York City", "New York City - Haven for First-time Renters", "Surprises Await First-time Renters in New York City", "Sure You Can Afford it in New York City?"], a: 2, ex: "Bài viết xoay quanh các cú sốc (The first shock... The second shock... yêu cầu tài chính khắt khe) với người mới thuê nhà ở NYC → C." },
          { n: 12, q: "On average, how much do tenants have to pay for a studio in New York City?", opts: ["About $2,000", "More than $2,000", "More than $3,100", "Less than $3,500"], a: 1, ex: "Đoạn 3: “the average for a studio is over $2,200” (tức hơn $2,000) → B." },
          { n: 13, q: "Which of the following words can best replace the word ‘prospective’ in paragraph 4?", opts: ["Apparent", "Prosperous", "Potential", "Upcoming"], a: 2, ex: "Prospective renters = những khách thuê tiềm năng (potential renters) → C." },
          { n: 14, q: "Which of the following is NOT listed by Mr. Hunt as a reaction of prospective renters when he informs them of the prices?", opts: ["They think the broker is meaning to deceive them.", "They decide to move to another city.", "They decide to look for a place in a different neighborhood.", "They find someone to share the accommodation with."], a: 1, ex: "Đoạn 4 nêu họ nghĩ môi giới lừa họ, hoặc tăng ngân sách, tìm khu khác, tìm người ở ghép; không nói họ chuyển sang thành phố khác → B." },
          { n: 15, q: "According to Mr. Hunt, what would make the process of finding an apartment challenging?", opts: ["Renters do not trust the brokers.", "Renters over-expect about places they can rent.", "Landlords expect tenants to have secured income.", "Renters want to bargain with landlords."], a: 1, ex: "“When expectations are very high, the process can be very frustrating” → kỳ vọng quá cao → B." },
          { n: 16, q: "Which of the following would best describe the attitude of renters who decide to raise their price limit after being informed of the price?", opts: ["Willing", "Hopeful", "Reluctant", "Frustrated"], a: 2, ex: "“Grudgingly decides to raise the price limit” — grudgingly = miễn cưỡng (reluctant) → C." },
          { n: 17, q: "In which space (marked A, B, C and D in the passage) will the following sentence fit? “Aside from the realities of price and space, the requirements set by New York landlords are also bound to help turn a bright-eyed first-time renter’s outlook grim.”", opts: ["[A]", "[B]", "[C]", "[D]"], a: 3, ex: "Sau khi đã nói về cú sốc giá cả (price) và diện tích nhỏ (space), câu ở vị trí [D] chuyển sang các yêu cầu khắt khe của chủ nhà (landlords want only tenants who earn at least 40 times...) → D." },
          { n: 18, q: "Why did the writer mention the income of college graduates in 2006?", opts: ["To demonstrate that graduates can earn a decent salary if they work in New York City", "To indicate that less than 50% of the surveyed graduates could afford apartments in New York City", "To suggest that New York City is not a place for graduates", "To prove that to guarantee a place in New York City is financially out of reach for an average graduate"], a: 3, ex: "Chủ nhà đòi thu nhập $80,000/năm trong khi lương trung vị của sinh viên mới ra trường chỉ $35,600 → vượt quá khả năng tài chính tự bảo lãnh → D." },
          { n: 19, q: "What does the word ‘Those’ in the last paragraph refer to?", opts: ["Landlords", "Graduates", "Guarantors", "Parents"], a: 1, ex: "“Those who don’t make 40 times their monthly rent” quy chiếu tới những sinh viên mới tốt nghiệp (graduates) đi thuê nhà → B." },
          { n: 20, q: "Which of the following sentences would best complete the last paragraph?", opts: ["On top of that, every owner also has their own requirements, so just because you qualified here doesn’t mean you’ll qualify there.", "So you had better accept that you’ll never have what you want no matter how hard you work.", "So the key to finding that first apartment is to learn as much as possible about the market before arriving in the city and to keep an open mind.", "You have to be flexible and you have to come to the city armed with information and financial paperwork."], a: 2, ex: "Câu kết tổng hợp lời khuyên hợp lý nhất cho sinh viên mới: tìm hiểu kỹ thị trường trước khi đến và giữ tâm thế cởi mở → C." }
        ]
      },
      {
        title: "PASSAGE 3 - Melting Greenland & Climate Policy",
        body: `‘Ladies and gentlemen’, the captain's voice crackled over the plane's public address system. "If you look out of the window on the right side of the aircraft," he said, "you will have a clear view of Greenland. In my 15 years of flying, I have not seen a scene like this." I opened the window shade, and I understood what had so startled the pilot. Instead of the habitual snowy landscape and frozen glaciers, a wide swathe of black water was visible as it flowed into the Atlantic. It was late spring, but the giant icebox that is Greenland was already melting.

The fleeting image that I saw from 30,000 feet in early May is consistent with massive amounts of climate data gathered from across the planet. It is now clear that on average, the global surface temperature has increased by about one degree Celsius since 1900 and has been the cause of extreme climate events across the planet.

At times, warming climate combined with soot in the air thrown by wildfire has accelerated the melting. Warm weather is leading ice sheets to break up and turning glaciers into flowing streams. In May, NASA scientists concluded that the rapidly melting glacial region of Antarctica has passed "the point of no return", threatening to increase sea levels by as much as 13 feet within the next few centuries. [A] The fact that the melting is taking place slowly and its effect may not be felt for a few decades seems to offer comfort to those who want to continue their lifestyle relying on fossil fuels. Unwilling to believe in global warming or make the sacrifices needed to face the challenge, politicians have been finding excuses to do nothing. [B]

American President Barack Obama, not hobbled by the need to fight elections, has now broken ranks with such politicians. Unable to pass legislation in the face of Republican (and sometimes Democratic) opposition, he instructed the Environmental Protection Agency to announce regulatory policies to curb emissions from power plants in the United States by 30 per cent by 2030. He hopes that regulations would influence the US states to adopt aggressive market interventions to address global warming. Of course, execution of the policy still lies in the hands of many state governors who would find ways to resist, saying that regulations would raise the cost to the economy and cause unemployment among coal workers. As President Obama told Thomas Friedman of the New York Times: "One of the hardest things in politics is getting a democracy to deal with something now where the payoff is long term or the price of inaction is decades away." [C]

The price of inaction could be raised – if the coming global summit on climate in Paris could do what other summits have failed to do: agree on a fixed target for greenhouse gas emissions and a rigorous system for monitoring. China has hinted at capping coal burning in the next 15 years, adding weight in favour of action. [D] Meanwhile, melting in Greenland and the Antarctica will continue as the sun scorches the fields and rising water threatens the coastal areas.`,
        questions: [
          { n: 21, q: "In paragraph 1, what does the pilot mean by saying, ‘In my 15 years of flying, I have not seen a scene like this’?", opts: ["This scene is very unusual.", "The pilot is not an attentive person.", "The scene makes flying worthy.", "This scene is very magnificent."], a: 0, ex: "Phi công bay 15 năm chưa từng thấy cảnh băng tan thành dòng nước đen lớn như vậy vào cuối xuân → cảnh tượng hết sức bất thường → A." },
          { n: 22, q: "What is the author’s purpose when recounting the scene he saw from the plane?", opts: ["To introduce the idea of global warming", "To give specific detail to support his point that global warming needs public awareness", "To express his opinion towards research on global surface temperature", "To contrast with what the pilot is saying"], a: 0, ex: "Tác giả mở đầu bằng hình ảnh thực tế nhìn từ máy bay để dẫn nhập vào chủ đề nóng lên toàn cầu → A." },
          { n: 23, q: "What is ‘offer comfort’ in paragraph 3 closest in meaning to?", opts: ["Warm up", "Reassure", "Discourage", "Assist"], a: 1, ex: "Offer comfort = làm yên lòng, trấn an (reassure) những người muốn tiếp tục lối sống phụ thuộc nhiên liệu hóa thạch → B." },
          { n: 24, q: "What is the main idea of paragraph 3?", opts: ["Hot weather combined with wildfire soot has been melting glaciers.", "There has been enough evidence that global warming is an urgent issue.", "Global warming is evident but some are not willing to deal with this.", "The earliest effects of melting glaciers can only be seen in centuries."], a: 2, ex: "Đoạn 3 nêu bằng chứng băng tan rõ rệt (NASA kết luận đã qua điểm không thể đảo ngược) nhưng nhiều người và chính trị gia vẫn viện cớ không hành động → C." },
          { n: 25, q: "Who does ‘such politicians’ in paragraph 4 refer to?", opts: ["Those who have protested against Obama’s views.", "Those who are not at the same rank as Obama.", "Those who take no actions against global warming.", "Those who do not believe in global warming."], a: 2, ex: "Câu cuối đoạn 3 nhắc tới “politicians have been finding excuses to do nothing” → những chính trị gia không chịu hành động → C." },
          { n: 26, q: "In which space (marked A, B, C and D in the passage) will the following sentence fit? “India, the world's third largest user of coal, may have to take measures on its own or face isolation.”", opts: ["[A]", "[B]", "[C]", "[D]"], a: 3, ex: "Câu trước vị trí [D] nói về Trung Quốc gợi ý giới hạn đốt than trong 15 năm tới; câu chèn tiếp nối về Ấn Độ (quốc gia tiêu thụ than lớn thứ 3) → D." },
          { n: 27, q: "According to paragraph 4, the author's attitude toward Obama’s actions can be best described as", opts: ["skeptical", "appreciative", "sympathetic", "supportive"], a: 3, ex: "Tác giả ghi nhận nỗ lực vượt rào cản chính trị của Obama để cắt giảm 30% khí thải nhưng cũng chỉ rõ khó khăn thực thi từ các thống đốc bang → ủng hộ/đồng tình (supportive) → D." },
          { n: 28, q: "What can the word ‘scorches’ in the last paragraph be best replaced by?", opts: ["shines", "warms up", "burns", "heats up"], a: 2, ex: "Scorches = thiêu đốt, làm cháy khô (burns) → C." },
          { n: 29, q: "Which of the following best describes the tone of the author in this passage?", opts: ["skeptical", "concerned", "indifferent", "pessimistic"], a: 1, ex: "Giọng văn thể hiện sự lo ngại sâu sắc (concerned) trước tốc độ băng tan và sự chậm trễ chính sách → B." },
          { n: 30, q: "Which of the following could best describe the message that the author wants to pass to readers?", opts: ["Fossil fuel should be replaced in the future.", "Solutions to global warming need political support.", "Rapid glacial melt has reached an irreversible point.", "Politicians play a key role in resolving global issues."], a: 1, ex: "Toàn bộ nửa sau bài nhấn mạnh rằng dữ liệu khoa học đã rõ, nhưng giải pháp cho biến đổi khí hậu cần quyết tâm và sự ủng hộ chính trị → B." }
        ]
      },
      {
        title: "PASSAGE 4 - Origin of Life & The RNA World",
        body: `The earliest evidence for life on Earth comes from fossilized mats of cyanobacteria called stromatolites in Australia that are about 3.4 billion years old. Ancient as their origins are, these bacteria, which are still around today, are already biologically complex—they have cell walls protecting their protein-producing DNA, so scientists think life must have begun much earlier, perhaps as early as 3.8 billion years ago. But despite knowing approximately when life first appeared on Earth, scientists are still far from answering how it appeared.

Today, there are several competing theories for how life arose on Earth. Some question whether life began on Earth at all, asserting instead that it came from a distant world or the heart of a fallen comet or asteroid. Some even say life might have arisen here more than once.

Most scientists agree that life went through a period when RNA was the head-honcho molecule, guiding life through its nascent stages. According to this "RNA World" hypothesis, RNA was the crux molecule for primitive life and only took a backseat when DNA and proteins—which perform their jobs much more efficiently than RNA—developed.

RNA is very similar to DNA, and today carries out numerous important functions in each of our cells, including acting as a transitional-molecule between DNA and protein synthesis, and functioning as an on-and-off switch for some genes.

But the RNA World hypothesis doesn't explain how RNA itself first arose. Like DNA, RNA is a complex molecule made of repeating units of thousands of smaller molecules called nucleotides that link together in very specific, patterned ways. While there are scientists who think RNA could have arisen spontaneously on early Earth, others say the odds of such a thing happening are astronomical.

"The appearance of such a molecule, given the way chemistry functions, is incredibly improbable. It would be a once-in-a-universe long shot," said Robert Shapiro, a chemist at New York University. "To adopt this, you have to believe we were incredibly lucky."

But "astronomical" is a relative term. In his book, The God Delusion, biologist Richard Dawkins entertains another possibility, inspired by work in astronomy and physics. Suppose, Dawkins says, the universe contains a billion planets, a conservative estimate, he says, then the chances that life will arise on one of them is not really so remarkable. Furthermore, if, as some physicists say, our universe is just one of many, and each universe contained a billion planets, then it's nearly a certainty that life will arise on at least one of them.

Shapiro doesn't think it's necessary to invoke multiple universes or life-laden comets crashing into ancient Earth. Instead, he thinks life started with molecules that were smaller and less complex than RNA, which performed simple chemical reactions that eventually led to a self-sustaining system involving the formation of more complex molecules. "If you fall back to a simpler theory, the odds aren't astronomical anymore," Shapiro concluded.`,
        questions: [
          { n: 31, q: "The word ‘they’ in paragraph 1 refers to", opts: ["mats", "origins", "bacteria", "DNA"], a: 2, ex: "“These bacteria, which are still around today, are already biologically complex—they have cell walls...” → they quy chiếu tới bacteria → C." },
          { n: 32, q: "According to the passage, what is RNA?", opts: ["A protein", "A molecule", "A nucleotide", "A cell"], a: 1, ex: "Đoạn 3: “RNA was the head-honcho molecule... RNA was the crux molecule” → B." },
          { n: 33, q: "The phrase ‘took a backseat’ in paragraph 3 is closest in meaning to", opts: ["enjoyed more dominance", "turned to be useless", "stepped back to its place", "became less important"], a: 3, ex: "Take a backseat = nhường vị trí chính, trở nên ít quan trọng hơn khi DNA và protein xuất hiện → D." },
          { n: 34, q: "According to the passage, what is NOT true about RNA?", opts: ["It is the crux of a widely accepted theory on the origin of life.", "It is believed to be most important for early life.", "Like DNA, it executes many duties in human cells.", "There is still disagreement over how RNA first appeared."], a: 2, ex: "Đoạn 4 nói RNA rất giống DNA và thực hiện nhiều chức năng trong tế bào (chuyển tiếp giữa DNA và tổng hợp protein), chứ không nói “giống như DNA, nó thực hiện nhiều nhiệm vụ” theo cùng cách; tuy nhiên câu D/A/B đều được khẳng định trực tiếp → C." },
          { n: 35, q: "What does Robert Shapiro mean when he says, ‘To adopt this, you have to believe we were incredibly lucky’?", opts: ["Supporters of RNA world hypothesis must think that humans were extremely blessed.", "Humans were incredibly lucky because the RNA was the first form of life on Earth.", "He believes it is near impossible that RNA accidentally arose on Earth.", "Humans were unlucky because the RNA world hypothesis is highly improbable."], a: 2, ex: "Shapiro nói sự xuất hiện ngẫu nhiên của phân tử phức tạp như RNA là “incredibly improbable” (gần như bất khả thi) → C." },
          { n: 36, q: "Which of the following statements would Dawkins most probably support?", opts: ["As there are a countless number of planets, it is surprising that life arose on Earth only.", "Life may exist on planets other than Earth and in universes other than ours.", "There are many universes like ours, which contain an incredible number of planets.", "Given the colossal number of planets, the appearance of life on one of them was not unusual."], a: 3, ex: "Dawkins lập luận: nếu vũ trụ có hàng tỷ hành tinh thì xác suất sự sống xuất hiện trên ít nhất một hành tinh không có gì đáng kinh ngạc (“not really so remarkable”) → D." },
          { n: 37, q: "According to the passage, which is most likely supported by Robert Shapiro?", opts: ["Life on Earth first came from outer space.", "It is highly possible that DNA was present in earliest stages of life.", "Earliest life might not have arisen in the form of complex molecules.", "Life has arisen more than once on Earth."], a: 2, ex: "Đoạn cuối: “he thinks life started with molecules that were smaller and less complex than RNA” → C." },
          { n: 38, q: "Which of the following is NOT mentioned as a hypothesis of life origin?", opts: ["Life was formed elsewhere and then came to Earth.", "Life was brought to Earth with crashing comets.", "RNA played a central role in the early form of life.", "DNA is more efficient than RNA for primitive life."], a: 3, ex: "Bài nói DNA hiệu quả hơn nên phát triển SAU, chứ không phải giả thuyết nguồn gốc sự sống nguyên thủy bắt đầu bằng DNA → D." },
          { n: 39, q: "Which of the following conclusions can be drawn from this passage?", opts: ["Among many hypotheses for life origin on Earth, RNA remains the most important one.", "Many theories of the origin of life have been proposed but no fully accepted theory exists.", "Trying to explain what happened billions of years ago is an extremely difficult but possible task.", "The answer to the question of how life appeared would have important implications for the likelihood of finding life elsewhere in the universe."], a: 1, ex: "Nhiều giả thuyết cạnh tranh nhau (ngoài hành tinh, thế giới RNA, phân tử nhỏ hơn RNA) nhưng chưa có lời giải thống nhất hoàn toàn → B." },
          { n: 40, q: "Which of the following best describes the organization of this passage?", opts: ["A general presentation followed by a detailed discussion of both sides of an issue.", "A list of possible answers to a question followed by a discussion of their strengths and weaknesses.", "A general statement of an issue followed by a discussion of possible answers.", "A discussion of different aspects wrapped up by an answer to the question."], a: 2, ex: "Mở đầu nêu vấn đề (chưa rõ sự sống bắt đầu thế nào), sau đó thảo luận các giả thuyết khả dĩ (RNA World, Dawkins, Shapiro) → C." }
        ]
      }
    ]
  },

  /* ==========================================================
     BỘ ĐỀ READING SỐ 03 — Nguồn: EVSTEP Reading Full Test 1
     ========================================================== */
  {
    id: "rset3",
    title: "Đề số 03: EVSTEP Reading Full Test 1",
    source: "Chứng chỉ tiếng Anh EVSTEP (vstep-elearning.edu.vn)",
    passages: [
      {
        title: "PASSAGE 1 - Free Clinic in Ha Noi's Giap Bat Ward",
        body: `For 20 years, Dang Thi Nhan, 67, has been waking up about 30 minutes earlier each day to bake cakes or prepare tea for two retired doctors in a clinic near her house in Ha Noi’s Giap Bat Ward. That is all Nhan can offer as thanks to doctors who provide free health checks for herself, her paralyzed husband, and their 43-year-old disabled son. “If one day they cannot take care of themselves and need someone to look after them, I will do it voluntarily till the day they are gone,” Nhan said.

The small clinic, situated on Kim Dong Street, has become familiar to many people in Ha Noi. It was established in 1992 by Dr. Truong Thi Hoi To, 84, a former principal of Nam Dinh Medical College, Le Thi Soc, 87, a retired nurse from Saint Paul Municipal Hospital, and Le Thanh Thuoc, the late deputy director of the Viet Nam National Cancer Hospital, who died last year. The clinic used to open every Monday and Thursday. However, after doctor Thuoc died and due to the deteriorating health of the two other medics, the clinic now only opens on Monday mornings at 8 am. Patients not only receive health checks, but they also receive free medicine. [A]

Since 2014, the clinic has treated about 8,500 patients, according to Giap Bat ward’s Red Cross Association. On its first days, the clinic faced numerous difficulties due to lack of money. Mrs. To, founder of the clinic, had to spend her own pension and encourage her children and relatives to donate money to purchase medical equipment and medicine. The clinic also had to relocate seven times, as To and her co-workers could not afford high rents. Despite these difficulties, they never thought of giving up. “Being able to help my patients brings me unspeakable joy. This is also my life target, it warms my heart to see the happy faces of the patients,” To said. [B]

Tran Thi Toan, 64, a patient from Nam Dinh Province, now works as a servant in Ha Noi. She is grateful to Dr. To and Nurse Soc not just for the free treatment, but for their caring manner. Toan said: “They give me meticulous treatment and clear, detailed instruction as well as advise me on a healthy and happy lifestyle”. Toan feels shy about her job, so the doctors’ care and compassionate attitude have become her inspiration in life. [C]

To the doctors, the most precious thing they receive from their patients is confidence in their skills, which can only be achieved through ethics and medical excellence. “The success of a doctor does not lie in how much money they earn, but how many people they help”, Soc said. Sharing Soc’s opinion, To said that “Medical practitioners should not consider their profession as a tool to get rich. They should not benefit from their patients’ pain. Patients come first, not money.” [D]`,
        questions: [
          { n: 1, q: "How old was Dang Thi Nhan when she first started to bake cakes or prepare tea for the two doctors?", opts: ["20", "67", "43", "47"], a: 3, ex: "Bà Nhàn hiện 67 tuổi và đã làm việc này suốt 20 năm: 67 - 20 = 47 tuổi → D." },
          { n: 2, q: "The word “they” in paragraph 1 refers to ______.", opts: ["Two doctors", "Husband and son", "Health checks", "Cakes"], a: 0, ex: "“If one day they cannot take care of themselves...” — bà Nhàn nói về hai vị bác sĩ đã khám miễn phí cho gia đình bà → A." },
          { n: 3, q: "The word “late” in paragraph 2 is closest in meaning to ______.", opts: ["Last-minute", "Behind", "Delayed", "Deceased"], a: 3, ex: "“The late deputy director... who died last year” — late trước danh từ chỉ người nghĩa là quá cố (deceased) → D." },
          { n: 4, q: "The word “its” in paragraph 3 refers to ______.", opts: ["Red Cross Association", "The clinic", "Medicine", "Pension"], a: 1, ex: "“On its first days, the clinic faced numerous difficulties” → its quy chiếu tới the clinic → B." },
          { n: 5, q: "Who probably did not work in a hospital before retirement?", opts: ["Le Thi Soc", "Le Thanh Thuoc", "Truong Thi Hoi To", "All of them"], a: 2, ex: "Bà Trương Thị Hội Tố nguyên là Hiệu trưởng Trường Cao đẳng Y tế Nam Định (Nam Dinh Medical College), không phải làm ở bệnh viện → C." },
          { n: 6, q: "In which paragraph does the author mention the deteriorating health condition of the doctors?", opts: ["Paragraph 1", "Paragraph 2", "Paragraph 3", "Paragraph 4"], a: 1, ex: "Đoạn 2: “due to the deteriorating health of the two other medics, the clinic now only opens on Monday mornings” → B." },
          { n: 7, q: "The word “donate” in paragraph 3 could be best replaced by ______.", opts: ["Give", "Take", "Keep", "Get"], a: 0, ex: "Donate = quyên góp, trao tặng (give) → A." },
          { n: 8, q: "What has helped Mrs. Tran Thi Toan gain confidence in her life?", opts: ["Her job as a servant", "Her gratitude to all doctors", "Her healthy and happy lifestyle", "Doctors’ caring manner and free treatment at the clinic"], a: 3, ex: "Đoạn 4: “the doctors’ care and compassionate attitude have become her inspiration in life” → D." },
          { n: 9, q: "In which space (A, B, C, or D) will the sentence fit best? “They treat me as a close member of their family. There is no discrimination between the rich and the poor. Everyone is treated equally.”", opts: ["[A]", "[B]", "[C]", "[D]"], a: 2, ex: "Lời chia sẻ trực tiếp ở ngôi thứ nhất (“They treat me...”) tiếp nối lời bà Toàn ở cuối đoạn 4, ngay vị trí [C] → C." },
          { n: 10, q: "The last paragraph indicates Mrs. Soc’s opinion that a doctor is successful if ______.", opts: ["He/she earns a lot of money", "He/she is confident in his/her skills", "He/she helps a lot of patients", "He/she benefits from patients’ pain"], a: 2, ex: "“The success of a doctor does not lie in how much money they earn, but how many people they help” → C." }
        ]
      },
      {
        title: "PASSAGE 2 - Global Warming & Stabilization Wedges",
        body: `The evidence that humans are causing global warming is strong, but the question of what to do about it remains controversial. Economics, sociology, and politics are all important factors in planning for the future.

Even if we stopped emitting greenhouse gases (GHGs) today, the Earth would still warm by another degree Fahrenheit or so. But what we do from today forward makes a big difference. Depending on our choices, scientists predict that the Earth could eventually warm by as little as 2.5 degrees or as much as 10 degrees Fahrenheit.

A commonly cited goal is to stabilize GHG concentrations around 450-550 parts per million (ppm), or about twice pre-industrial levels. This is the point at which many believe the most damaging impacts of climate change can be avoided. Current concentrations are about 380 ppm, which means there isn’t much time to lose. According to the IPCC, we’d have to reduce GHG emissions by 50% to 80% of what they’re on track to be in the next century to reach this level.

Is this possible? Many people and governments are already working hard to cut greenhouse gases, and everyone can help.

Researchers Stephen Pacala and Robert Socolow at Princeton University have suggested one approach that they call “stabilization wedges.” This means reducing GHG emissions from a variety of sources with technologies available in the next few decades, rather than relying on an enormous change in a single area. They suggest 7 wedges that could each reduce emissions, and all of them together could hold emissions at approximately current levels for the next 50 years, putting us on a potential path to stabilize around 500 ppm.

There are many possible wedges, including improvements to energy efficiency and vehicle fuel economy (so less energy has to be produced), and increases in wind and solar power, hydrogen produced from renewable sources, biofuels (produced from crops), natural gas, and nuclear power. There is also the potential to capture the carbon dioxide emitted from fossil fuels and store it underground—a process called “carbon sequestration.”

In addition to reducing the gases we emit to the atmosphere, we can also increase the amount of gases we take out of the atmosphere. Plants and trees absorb CO2 as they grow, “sequestering” carbon naturally. Increasing forestlands and making changes to the way we farm could increase the amount of carbon we’re storing.

Some of these technologies have drawbacks, and different communities will make different decisions about how to power their lives, but the good news is that there are a variety of options to put us on a path toward a stable climate.`,
        questions: [
          { n: 11, q: "The word “we” in paragraph 2 refers to _____.", opts: ["humans", "economists, sociologists, and politicians", "animals", "scientists"], a: 0, ex: "“We” chỉ chung nhân loại (humans) đã được nhắc ở câu đầu bài → A." },
          { n: 12, q: "According to paragraph 2, how many degrees could the Earth warm up?", opts: ["2.5", "2.5 or 10", "10", "from 2.5 to 10"], a: 3, ex: "“Warm by as little as 2.5 degrees or as much as 10 degrees Fahrenheit” → từ 2.5 đến 10 độ F → D." },
          { n: 13, q: "According to paragraph 3, why should we stabilize GHG concentrations around 450–550 ppm?", opts: ["to avoid the most serious effects of climate change", "to avoid all damaging impacts of climate change", "to mend the most damaging impacts of climate change", "to stop climate change"], a: 0, ex: "“This is the point at which many believe the most damaging impacts of climate change can be avoided” → A." },
          { n: 14, q: "What does “which” in paragraph 3 refer to?", opts: ["current concentrations", "that current concentrations are about 380 ppm", "380 ppm", "ppm"], a: 1, ex: "“Current concentrations are about 380 ppm, which means there isn’t much time to lose” → which thay cho cả mệnh đề phía trước → B." },
          { n: 15, q: "Why does the author mention Stephen Pacala and Robert Socolow?", opts: ["To introduce two researchers in the field", "To prove that researchers are working to reduce GHG emissions", "To introduce one way to reduce GHG emissions", "To introduce Princeton University"], a: 2, ex: "Tác giả dẫn hai nhà nghiên cứu này để giới thiệu phương pháp “stabilization wedges” nhằm cắt giảm khí thải → C." },
          { n: 16, q: "What stabilization wedges are NOT mentioned in the passage?", opts: ["create environment-friendly building materials", "capture and store carbon dioxide underground", "increase the use of renewable energy", "grow more trees"], a: 0, ex: "Đoạn 6 và 7 nêu: thu giữ carbon dưới lòng đất, tăng năng lượng tái tạo, trồng thêm rừng; không đề cập tạo vật liệu xây dựng thân thiện môi trường → A." },
          { n: 17, q: "What does “them” in paragraph 5 refer to?", opts: ["Researchers", "Humans", "Renewable resources", "Wedges"], a: 3, ex: "“They suggest 7 wedges... and all of them together could hold emissions” → them = wedges → D." },
          { n: 18, q: "What is the best title for this passage?", opts: ["Arguments over global warming", "Global warming and its causes", "Global warming solutions", "Global warming’s effects on Earth"], a: 2, ex: "Toàn bài tập trung vào mục tiêu và các giải pháp cắt giảm khí nhà kính để ổn định khí hậu → C." },
          { n: 19, q: "“Sequestering” in paragraph 7 is closest in meaning to _____.", opts: ["absorbing and storing", "isolating", "releasing", "emitting"], a: 0, ex: "“Plants and trees absorb CO2 as they grow, ‘sequestering’ carbon naturally” → hấp thụ và lưu giữ carbon → A." },
          { n: 20, q: "Why does the writer mention “drawbacks” in the last paragraph?", opts: ["To introduce the disadvantages of solutions in the following paragraph", "To acknowledge limitations of the solutions mentioned in previous paragraphs", "To recommend that readers not use the solutions", "To emphasize the advantages of the solutions in different contexts"], a: 1, ex: "Tác giả nhìn nhận một số công nghệ nêu ở đoạn trước có nhược điểm, nhưng tổng thể vẫn có nhiều lựa chọn khả thi → B." }
        ]
      },
      {
        title: "PASSAGE 3 - Visual Perception & Appreciation of Art",
        body: `Art communicates to us primarily through our eyes. We look at art, and we try to find some meaning in the experience. If we are to begin to think about art more seriously, we might do well to become more aware of the process of seeing itself.

Science tells us that seeing is a mode of perception, or the recognition and interpretation of sensory data—in other words, how information comes in our senses, and what we make of it. In visual perception, our eyes take in information in the form of light patterns; the brain processes these patterns to give them meaning. The mechanics of perception work much the same way for everyone, yet in a given situation we do not all see the same things.

We can take great pleasure in merely looking at art, just as we take pleasure in the view of a distant mountain range or watching the sun set over the ocean. But art, unlike nature, is a human creation. It is one of the many ways we express ourselves and attempt to communicate. A work of art is the product of human intelligence, and we can meet it with our own intelligence on equal footing. This is where study comes in.

The understanding of process – the how – often contributes quite a lot to our appreciation of art. If you understand why painting in watercolor may be different from painting in oil, why clay responds differently to the artist’s hand than does wood or glass, you will have a richer appreciation of the artist’s expression.

Knowing the place of a work of art in history – what went before and came after – can also deepen your understanding. Artists learn to make art by studying the achievements of the past and observing the efforts of their contemporaries. They adapt ideas to serve their own needs and then bequeath those ideas to future generations of artists. For example, Matisse assumed that his audience would know that Venus was the ancient Roman goddess of love. But he also hoped that they would be familiar with one Venus in particular, a famous Greek statue known as the Venus de Milo.

An artist may create a specific work for any of a thousand reasons. An awareness of the why may give some insight as well. Looking at Van Gogh’s The Starry Night, it might help you know that Van Gogh was intrigued by the belief that people journeyed to a star after their death, and that there they continued their lives. “Just as we take the train to get to Tarascon or Rouen,” he wrote in a letter, “we take death to reach a star.” This knowledge might help you understand why Van Gogh felt so strongly about the night sky, and what his painting might have meant to him.

But no matter how much you study, Van Gogh’s painting will never mean for you exactly what it meant for him, nor should it. Great works of art hold many meanings. The greatest of them seem to speak anew to each generation and to each attentive observer. The most important thing is that they mean something for you, that your own experiences, thoughts, and emotions find a place in them.`,
        questions: [
          { n: 21, q: "According to paragraph 2, the process of visual perception _____.", opts: ["is not the same for all people", "begins with patterns of light", "is not very scientific", "requires other senses to function"], a: 1, ex: "“In visual perception, our eyes take in information in the form of light patterns” → B." },
          { n: 22, q: "What did Matisse reinterpret?", opts: ["A goddess from mythology / an ancient Greek statue", "A painting by another artist", "A modern landscape", "A Roman temple"], a: 0, ex: "Đoạn 5: Matisse lấy cảm hứng từ nữ thần tình yêu Venus và bức tượng Hy Lạp cổ đại Venus de Milo → A." },
          { n: 23, q: "The word “them” in the last paragraph refers to _____.", opts: ["each attentive observer", "thoughts and emotions", "a lifetime of experiences", "great works of art"], a: 3, ex: "“Great works of art hold many meanings. The greatest of them...” → them = great works of art → D." },
          { n: 24, q: "The word “bequeath” in paragraph 5 is closest in meaning to _____.", opts: ["make out", "pass on", "look over", "take in"], a: 1, ex: "Bequeath = truyền lại cho thế hệ tương lai (pass on to future generations) → B." },
          { n: 25, q: "The author mentions all of the following ways to enhance appreciation of art EXCEPT _____.", opts: ["understanding the artistic process", "becoming familiar with history", "experiencing the art by copying", "knowing about the life of the artist"], a: 2, ex: "Bài nhắc tới: tìm hiểu kỹ thuật/chất liệu (the how), lịch sử (history), và động cơ/cuộc đời nghệ sĩ (the why); không nhắc việc chép tranh (copying) → C." },
          { n: 26, q: "What is the main topic of the passage?", opts: ["Visual perception of sensory material", "Historical context for artistic expression", "Studying Van Gogh’s The Starry Night", "Appreciation of works of art"], a: 3, ex: "Toàn bài bàn về cách cảm thụ và thấu hiểu các tác phẩm nghệ thuật sâu sắc hơn → D." },
          { n: 27, q: "Which sentence best expresses the idea: “The mechanics of perception work much the same way for everyone, yet in a given situation we do not all see the same things”?", opts: ["We see images differently because of the mode of perception", "Although we see images differently, the mode of perception is similar", "Since the mode of perception is similar, we see images in the same way", "When the mode of perception is the same, we see the same images"], a: 1, ex: "Cơ chế thị giác giống nhau ở mọi người, nhưng mỗi người lại cảm nhận hình ảnh khác nhau → B." },
          { n: 28, q: "Why might Van Gogh have painted The Starry Night?", opts: ["To symbolize the journey of life after death", "To create contrast with the sky", "To place a strong foreground image", "To include early life experiences"], a: 0, ex: "Van Gogh bị cuốn hút bởi niềm tin rằng sau khi qua đời con người sẽ đi tới một vì sao → A." },
          { n: 29, q: "“Intrigued” in paragraph 6 is closest in meaning to _____.", opts: ["very pleased", "very confused", "very interested", "very surprised"], a: 2, ex: "Intrigued = rất hứng thú, bị thu hút (very interested) → C." },
          { n: 30, q: "What can be inferred from the last paragraph?", opts: ["Great artworks are impossible to understand", "The author has negative views on modern art", "People need a degree to understand art", "Interpretation of art depends on personal experience"], a: 3, ex: "Câu cuối: điều quan trọng nhất là trải nghiệm, suy nghĩ và cảm xúc riêng của người xem tìm thấy sự đồng điệu trong tác phẩm → D." }
        ]
      },
      {
        title: "PASSAGE 4 - Antibiotics & Drug-Resistant Bacteria",
        body: `Antibiotics block the life cycle of bacteria that invade the human body. The first of these antibiotics, penicillin, works by blocking the molecules that construct the cell walls of particular bacteria. The bacteria, with incomplete cell walls, are not able to reproduce.

When penicillin was introduced during World War II, it was truly a “miracle drug.” Until that time, anyone who was cut or wounded stood a great risk of infection. Once penicillin became available, the situation changed. Wounded soldiers, children with ear infections, and many others began to benefit from the ability to block the growth of bacteria.

While humanity may have won that particular battle against bacteria, the war is far from over. The reason is that in any bacterial population, there are bound to be a few bacteria that, for one reason or another, are not affected by a particular antibiotic. For example, they may have a slightly differently shaped enzyme that builds cell walls, so that penicillin will not fit onto that particular shape of the enzyme. These bacteria will not be affected by that particular drug.

For that small group, the antibiotic is a real godsend. It doesn’t affect them, but it does wipe out all of their competition. They are thus free to multiply, and, over time, all of the bacteria will have whatever properties made those individuals resistant.

Traditionally, medical scientists have dealt with this phenomenon by developing a large number of antibiotics, each of which intervenes in the bacterial life cycle in a slightly different way. Consequently, if you happen to have a bacterium that is resistant to one antibiotic, it will probably succumb to the action of another. You may, in fact, have had the experience of going to a doctor with an infection, being given an antibiotic, and then finding that it didn’t work. In all likelihood, all your doctor had to do then was prescribe a different antibiotic, and everything was fine.

The problem is that as time has passed, more and more bacteria have become resistant to antibiotics. In fact, currently, there is one strain of bacteria—Staphylococcus—that is resistant to every commercially available antibiotic except one, and in 1996, a bacterium with lowered resistance to that last antibiotic appeared in Japan.

The appearance of drug-resistant bacteria is not particularly surprising; in fact, it probably should have been anticipated. Nevertheless, in the late 1980s, there was a general sense of complacency among scientists on the antibiotic question. Little profit was to be made by developing the one-hundred-and-first antibiotic. Drug companies concentrated their efforts on other areas. Therefore, a gap developed between the production of new antibiotics and the development of resistance among bacteria.

By the early 1990s, this gap was recognized and highlighted in several national news magazines. More companies returned to develop new kinds of antibiotics, and currently, a number are undergoing clinical trials. By early in the twenty-first century, some of these new drugs will start to come on the market, and the problem will be “solved,” at least for the moment.`,
        questions: [
          { n: 31, q: "How do antibiotics treat infections?", opts: ["They interfere with the reproductive cycle of bacteria", "They construct cell walls to resist bacteria", "They inject enzymes into cells", "They increase the mitosis of healthy cells"], a: 0, ex: "Đoạn 1: “Antibiotics block the life cycle of bacteria... The bacteria, with incomplete cell walls, are not able to reproduce” → A." },
          { n: 32, q: "The word “them” in paragraph 4 refers to _____.", opts: ["properties", "resistant bacteria", "their competition", "antibiotics"], a: 1, ex: "“For that small group [of resistant bacteria], the antibiotic is a real godsend. It doesn’t affect them...” → B." },
          { n: 33, q: "“Anticipated” in paragraph 7 is closest in meaning to _____.", opts: ["predicted", "concealed", "investigated", "disregarded"], a: 0, ex: "Anticipated = được dự đoán trước (predicted) → A." },
          { n: 34, q: "What is the main idea of the passage?", opts: ["Penicillin as a miracle drug", "The growing challenge of drug-resistant bacteria", "Staphylococcus infections in Japan", "Gene therapy in the 21st century"], a: 1, ex: "Toàn bài nói về cơ chế kháng kháng sinh của vi khuẩn và cuộc chạy đua phát triển thuốc mới → B." },
          { n: 35, q: "Why do some bacteria benefit from antibiotics?", opts: ["Antibiotics kill competing bacteria, allowing resistant ones to multiply", "They become stronger by eating the antibiotic", "They reproduce with non-resistant types", "They absorb antibiotic properties"], a: 0, ex: "Đoạn 4: “It doesn’t affect them, but it does wipe out all of their competition. They are thus free to multiply” → A." },
          { n: 36, q: "“Complacency” in paragraph 7 is closest in meaning to _____.", opts: ["agreement", "fear", "lack of concern / self-satisfaction", "awareness"], a: 2, ex: "Complacency = sự chủ quan, tự mãn, thiếu lo ngại → C." },
          { n: 37, q: "Which of the following best expresses the reason some bacteria resist penicillin?", opts: ["Some antibiotics work better than others", "Some bacteria have a natural variation in enzyme shape", "Antibiotics bind all bacteria equally", "Some bacteria are naturally harmless"], a: 1, ex: "Đoạn 3: một số vi khuẩn có enzyme tạo thành tế bào mang hình dạng hơi khác nên penicillin không gắn vào được → D/B (chọn B/D theo đáp án gốc)." },
          { n: 38, q: "Which is NOT a reason for the rise of drug resistance mentioned in the passage?", opts: ["Lack of profit incentive for drug companies in the 1980s", "Natural variation in bacterial populations", "Manufacturers intentionally making weaker antibiotics", "Elimination of competing non-resistant bacteria"], a: 2, ex: "Bài không hề nói các hãng dược cố tình làm thuốc yếu đi → C." },
          { n: 39, q: "It can be inferred from the passage that _____.", opts: ["New antibiotics won’t be needed in the future", "Scientists in the 1980s were overly cautious", "Antibiotics are free to produce", "Developing and testing new drugs takes considerable time"], a: 3, ex: "Từ đầu thập niên 1990 các công ty quay lại nghiên cứu và phải qua thử nghiệm lâm sàng (clinical trials) tới đầu thế kỷ 21 mới ra thị trường → D." },
          { n: 40, q: "Which of the following is NOT a main point of the passage?", opts: ["Resistance is increasing among bacteria", "Government funding has solved the problem permanently", "Early antibiotics like penicillin were highly effective", "New drugs are currently being developed"], a: 1, ex: "Bài không nói ngân sách chính phủ đã giải quyết vĩnh viễn vấn đề (thậm chí nhấn mạnh chỉ giải quyết “at least for the moment”) → B." }
        ]
      }
    ]
  },

  /* ==========================================================
     BỘ ĐỀ READING SỐ 04 — Nguồn: EVSTEP Reading Full Test 2
     ========================================================== */
  {
    id: "rset4",
    title: "Đề số 04: EVSTEP Reading Full Test 2",
    source: "Chứng chỉ tiếng Anh EVSTEP (vstep-elearning.edu.vn)",
    passages: [
      {
        title: "PASSAGE 1 - The Epidemic of Smoking in China",
        body: `A new study, conducted by scientists from Oxford University, the Chinese Academy of Medical Sciences, and the Chinese Center for Disease Control, has warned that a third of all men currently under the age of 20 in China will eventually die prematurely if they do not give up smoking.

The research, published in The Lancet medical journal, says two-thirds of men in China now start to smoke before 20. Around half of those men will die from the habit, it concludes.

In 2010, around one million people in China died from tobacco usage. But researchers say that if current trends continue, that will double to two million people – mostly men – dying every year by 2030, making it a “growing epidemic of premature death”.

But co-author Richard Peto said there was hope – if people can be persuaded to quit. “The key to avoiding this huge wave of deaths is cessation, and if you are a young man, don’t start,” he said.

In many parts of China, meals often fit a comfortable pattern. After putting down their chopsticks, men commonly push their chairs back from the table and light cigarettes. No wonder China has struggled to impose a smoking ban in public places. Here, relationships are often built amid clouds of smoke.

Expensive cigarette brands, often decorated with gold detailing on their cartons, are given as gifts. And ordinary brands are affordable to all but the very poor, costing just 2.5 yuan ($0.4; £0.25) a pack.

In a country where smoking is so ingrained in daily life, few understand the harmful effects of tobacco use. According to the World Health Organization (WHO), only 25% of Chinese adults can list the specific health hazards of smoking, from lung cancer to heart disease.

Perhaps it should come as no surprise, then, that only 10% of Chinese smokers quit by choice. Instead, most are forced to give up their cigarettes because they’re too sick to continue.

While smoking rates have fallen in developed countries to less than one in five in the US, they have risen in China, as cigarettes have become more available and consumers have become richer.

Authorities have shown concern over the rise, with Beijing even introducing a public smoking ban. But the habit’s popularity has hampered efforts, and its usefulness as a source of tax – the government collects about 428 billion yuan (£44 billion, $67 billion) in tobacco taxes each year. Globally, tobacco kills up to half of its users, according to the World Health Organization.`,
        questions: [
          { n: 1, q: "How many Chinese men start to smoke before the age of 20?", opts: ["one-third", "two-thirds", "half", "all of them"], a: 1, ex: "Đoạn 2: “two-thirds of men in China now start to smoke before 20” → B." },
          { n: 2, q: "What does the phrase “those men” in paragraph 2 refer to?", opts: ["Men who start to smoke before the age of 20", "Men who smoke above the age of 20", "Men who give up smoking", "Men who smoke in public"], a: 0, ex: "Câu trước nhắc tới “men in China now start to smoke before 20”, câu sau “Around half of those men” → A." },
          { n: 3, q: "By 2030, how many people in China may die from smoking every year?", opts: ["one million", "two million", "three million", "four million"], a: 1, ex: "Đoạn 3: “that will double to two million people – mostly men – dying every year by 2030” → B." },
          { n: 4, q: "In many areas of China, when do men usually smoke?", opts: ["Before a meal", "After a meal", "Before they go to sleep", "When they get up"], a: 1, ex: "Đoạn 5: “After putting down their chopsticks, men commonly push their chairs back from the table and light cigarettes” → B." },
          { n: 5, q: "According to WHO, only _____ of Chinese adults can list bad effects of smoking.", opts: ["one-third", "one-fourth", "one-fifth", "a half"], a: 1, ex: "Đoạn 7: “only 25% of Chinese adults can list the specific health hazards” (25% = 1/4 = one-fourth) → B." },
          { n: 6, q: "“Beijing” in paragraph 10 refers to _____.", opts: ["China", "The city of Beijing", "The Chinese government / authorities", "People who live in Beijing"], a: 2, ex: "“Authorities have shown concern over the rise, with Beijing even introducing a public smoking ban” → chính quyền/chính phủ → C." },
          { n: 7, q: "What is Richard Peto’s attitude toward smoking in China?", opts: ["He doesn’t believe that people will give up smoking", "He is disappointed with the Chinese government", "He thinks that people can possibly stop smoking if persuaded", "He is sure about the rise of future deaths in China"], a: 2, ex: "Đoạn 4: “Richard Peto said there was hope – if people can be persuaded to quit” → C." },
          { n: 8, q: "Which of the following words is closest in meaning to “hamper” in paragraph 10?", opts: ["basket", "assist", "prohibit", "restrict / hinder"], a: 3, ex: "Hamper = cản trở, gây trở ngại (restrict/hinder) → D." },
          { n: 9, q: "What is the writer’s main purpose in this article?", opts: ["To argue over the smoking policy in China", "To support smoking in China", "To criticize Chinese culture", "To report the results of a research paper and the context of smoking in China"], a: 3, ex: "Bài báo tường thuật kết quả nghiên cứu đăng trên tạp chí The Lancet và bối cảnh hút thuốc tại Trung Quốc → D." },
          { n: 10, q: "What does the writer imply about the Chinese authorities?", opts: ["They do not want to stop people from smoking", "They have tried to stop people from smoking in public but with limited success", "They have tried to close tobacco companies", "They do not care about smoking"], a: 1, ex: "Đoạn 5 & 10: giới chức đã ban hành lệnh cấm hút thuốc nơi công cộng nhưng thói quen phổ biến và nguồn thu thuế lớn khiến nỗ lực bị cản trở → B." }
        ]
      },
      {
        title: "PASSAGE 2 - Finding a Job in Your 50s",
        body: `We hear it all the time: People who are over 50 take longer to find jobs than younger people. Connie Wanberg, a professor at the Carlson School of Management at the University of Minnesota, had long heard gloom-and-doom stories to that effect, but she wondered how strong the data was to support them.

Very, as it turned out. According to a study by Professor Wanberg and others, job seekers over 50 were unemployed 5.8 weeks longer than those aged 30 to 49. That number rose to 10.6 weeks when the comparison group was from 20 to 29. Professor Wanberg and three other researchers — Darla J. Hamann, Ruth Kanfer, and Zhen Zhang — arrived at those numbers by analyzing and synthesizing hundreds of studies by economists, sociologists, and psychologists.

But it is important not to jump to conclusions about the cause, Professor Wanberg said. “It’s not very unusual for everybody to think that the reason for the difficulty in finding jobs in their 50s is discrimination,” she said. That can sometimes be the case, but the reality is that the behavior required to find work does not play to many older people’s strengths. Once they become aware of this, they can act to compensate.

In their study, the researchers found that older people, on average, had smaller social networks than younger people, Professor Wanberg said. This is not necessarily bad — as we age, many of us find that the quality of our relationships is more important than the quantity. But in the job search process, the number of connections we maintain in our professional and personal networks is often critical.

As people age, they also tend to stay in the same job longer, consistent with a pattern of wanting to put down roots. During that time, the skills people have learned and the job search strategies they once used may become outdated — especially as technology evolves ever more quickly.

The cure for these drawbacks is fairly straightforward. Once you hit your early 40s, even if you are not looking for a job, work to learn new skills and stretch yourself, Professor Wanberg said. Also, keep your networks strong by staying in touch with former colleagues and classmates, along with current co-workers and clients whom you don’t see regularly, she said.

Finding a job after 50 doesn’t have to be as discouraging as it is often portrayed to be, Professor Wanberg said. Just recognize that some of the obstacles you face are inherent to the aging process, she said. She stressed that her findings reflected only averages and that individual behavior varies greatly. Certainly, many older people maintain wide social circles and often learn skills. But in general, older job seekers must take more steps to find employment than younger ones, she said.

Once older workers do find a new employer, they can use their knowledge, wisdom, and emotional intelligence — qualities that older people often possess in abundance — to thrive in their new positions.`,
        questions: [
          { n: 11, q: "The word “gloom-and-doom” in paragraph 1 could be best replaced by ______.", opts: ["Hopeless", "Interesting", "Cheerful", "Strange"], a: 0, ex: "Gloom-and-doom = bi quan, ảm đạm, tuyệt vọng (hopeless) → A." },
          { n: 12, q: "According to the study, which age group has the shortest unemployment time among those compared?", opts: ["Less than 20", "From 20 to 29", "From 30 to 49", "Over 50"], a: 1, ex: "Người trên 50 tuổi thất nghiệp lâu hơn nhóm 30–49 là 5.8 tuần và lâu hơn nhóm 20–29 tới 10.6 tuần → nhóm 20–29 tìm việc nhanh nhất → B." },
          { n: 13, q: "Which sentence best paraphrases Professor Wanberg's statement in paragraph 3?", opts: ["People do not usually think about the cause of discrimination in their 50s.", "People do not usually think discrimination is the reason.", "People believe finding jobs causes discrimination.", "People commonly believe discrimination makes job search harder in their 50s."], a: 3, ex: "“It’s not very unusual for everybody to think that the reason... is discrimination” (không hiếm = rất phổ biến khi mọi người nghĩ nguyên nhân là phân biệt tuổi tác) → D." },
          { n: 14, q: "The word “their” in paragraph 4 refers to ______.", opts: ["The researchers", "Older people", "Social networks", "Younger people"], a: 1, ex: "“In their study” / “quality of our relationships” — theo đáp án gốc câu hỏi quy chiếu tới Older people → B." },
          { n: 15, q: "The word “critical” in paragraph 4 could be best replaced by ______.", opts: ["Huge", "Demanding", "Trivial", "Important"], a: 3, ex: "Critical = vô cùng quan trọng, thiết yếu (important) → D." },
          { n: 16, q: "What advice does Professor Wanberg give to people in their early 40s?", opts: ["Maintain small but strong networks", "Only focus on current job strengths", "Learn new skills and keep wide professional networks", "Stay in the same job longer"], a: 2, ex: "Đoạn 6: “work to learn new skills and stretch yourself... Also, keep your networks strong” → C." },
          { n: 17, q: "“These drawbacks” in paragraph 6 refers to ______.", opts: ["Outdated skills and job search strategies (and smaller networks)", "Small salaries", "Lost pensions", "Low-quality relationships"], a: 0, ex: "Đoạn 5 nêu kỹ năng và chiến lược tìm việc bị lỗi thời do làm một chỗ quá lâu → A." },
          { n: 18, q: "Which of the following statements is NOT true according to the passage?", opts: ["Finding a job after 50 is not hopeless", "Older people hardly ever learn new skills", "Older people have valuable qualities like wisdom and emotional intelligence", "The study findings reflect averages and do not apply to every individual"], a: 1, ex: "Đoạn 7 khẳng định: “Certainly, many older people maintain wide social circles and often learn skills” nên nói người lớn tuổi hầu như không học kỹ năng mới là SAI → B." },
          { n: 19, q: "What is Professor Wanberg’s overall attitude toward finding a job after 50?", opts: ["Hopeless", "Frustrated", "Optimistic", "Discouraging"], a: 2, ex: "Đoạn 7 & 8: Bà khẳng định việc tìm việc sau tuổi 50 không đáng nản lòng nếu chủ động chuẩn bị, và người lớn tuổi có nhiều phẩm chất quý giá → lạc quan (optimistic) → C." },
          { n: 20, q: "What is the main purpose of the passage?", opts: ["To report the difficulties of aging", "To compare the advantages and disadvantages of young workers", "To warn people against staying in a job", "To stress the importance of updating skills and maintaining networks for older job seekers"], a: 3, ex: "Bài viết phân tích nguyên nhân thực tế và nhấn mạnh giải pháp học kỹ năng mới + duy trì mạng lưới quan hệ từ tuổi 40 → D." }
        ]
      },
      {
        title: "PASSAGE 3 - Mary’s First Job at a Country Hotel",
        body: `When I was just fifteen, my father purchased an old hostel in the country where we lived and decided to turn it into a luxury hotel. In the early stages of the hotel, he experimented with everything. None of us had ever worked in a hotel before, but my dad had a vision of what guests wanted. His standards were extremely high, and he believed that to reach those standards, the most important thing was work.

For a month that summer, I worked as a waitress at breakfast and dinner. As part of the crew, I had to lay the tables in the dining room beforehand and clean up afterwards. This gave me the middle of the day free for studying; my school report predictably had not lived up to my father’s high expectations.

Like all the other waitresses, I was equipped with a neat uniform and told to treat the guests as though they were special visitors in my own home. Although I felt more like a stranger in theirs, I did not express my feelings. Instead, I concentrated on doing the job as well as, if not better than, the older girls.

In the kitchen, I learned how to deal with Gordon, the chef, who I found rather daunting. He had an impressive chef’s hat and a terrifying ability to lose his temper and get violent for no clear reason. I avoided close contact with him and always grabbed the dishes he gave me with a cold look on my face. Then, as I walked from the kitchen to the dining room, my cold expression used to change into a charming smile.

I found waiting at breakfast was more enjoyable than at dinner. The guests came wandering into the dining room from seven-thirty onwards, staring with pleasure at the view of the sea and the islands through the dining room window. I always made sure that everyone got their order quickly, and I enjoyed getting on well with the people at each table.

In the evenings, it was funny how differently people behaved; they talked with louder, less friendly voices, and did not always return my smile. However, that all changed when Dad created a special role for me, which improved my status considerably.

I started by making simple cakes for guests’ picnics and soon progressed to more elaborate cakes for afternoon teas. I found that recipes were easy to follow and it was amusing to improvise. This led to a nightly event known as Mary’s Sweet Trolley. I used to enter the dining room every evening, pushing a trolley carrying an extraordinary collection of puddings, cakes, and other desserts. Most of them were of my own invention; I had cooked them all myself, and some were undeniably strange.`,
        questions: [
          { n: 21, q: "The word “it” in paragraph 1 refers to ______.", opts: ["An old hostel", "The country", "A luxury hotel", "Mary’s first job"], a: 0, ex: "“My father purchased an old hostel... and decided to turn it into a luxury hotel” → it = an old hostel → A." },
          { n: 22, q: "What did the people working at the hotel have in common at the beginning?", opts: ["They knew what guests expected", "They shared all the jobs equally", "They lacked prior experience working in a hotel", "They all enjoyed the work"], a: 2, ex: "“None of us had ever worked in a hotel before” → thiếu kinh nghiệm làm khách sạn → C." },
          { n: 23, q: "Mary’s working schedule gave her ______.", opts: ["Time for her schoolwork in the middle of the day", "Experience in hotel management", "Plenty of time for afternoon relaxation", "Time to spend with her father"], a: 0, ex: "“This gave me the middle of the day free for studying” → A." },
          { n: 24, q: "What does Mary mean by “my school report predictably had not lived up to my father’s high expectations”?", opts: ["The school reported her expectations to her father", "Her father was not satisfied with her school results", "Her school report was easy to predict", "Her father expected no report from school"], a: 1, ex: "Live up to expectations = đạt kỳ vọng; not lived up to = cha cô không hài lòng với kết quả học tập của cô → B." },
          { n: 25, q: "The word “daunting” in paragraph 4 is closest in meaning to ______.", opts: ["Disgusting", "Frightening / intimidating", "Interesting", "Strange"], a: 1, ex: "Đầu bếp Gordon có khả năng nổi nóng đáng sợ (“terrifying ability to lose his temper”) nên daunting = đáng sợ, gây e ngại (frightening) → B." },
          { n: 26, q: "While walking from the kitchen to the dining room, Mary ______.", opts: ["Smiled warmly at Gordon", "Avoided touching the plates", "Checked the food carefully", "Changed her expression to look friendlier"], a: 3, ex: "“As I walked from the kitchen to the dining room, my cold expression used to change into a charming smile” → D." },
          { n: 27, q: "Why did Mary prefer serving at breakfast rather than dinner?", opts: ["She could enjoy the view of the sea", "She had better relations with the guests", "The guests were more punctual", "Gordon was not in the kitchen"], a: 1, ex: "Đoạn 5 & 6: Buổi sáng khách vui vẻ và cô thích trò chuyện thân thiện với từng bàn, còn buổi tối khách nói to và kém thân thiện hơn → B." },
          { n: 28, q: "How did Mary’s father improve her position in the hotel?", opts: ["By making her the dining room manager", "By giving her an entertainment role", "By giving her responsibility for making cakes and desserts", "By buying her a new uniform"], a: 2, ex: "Đoạn 6 & 7: Cha giao cho cô làm bánh picnic, bánh trà chiều và xe đẩy tráng miệng buổi tối (Mary’s Sweet Trolley) → C." },
          { n: 29, q: "Why was the food on Mary’s Sweet Trolley special?", opts: ["It followed strict traditional recipes", "It was the same as the picnic food", "She made it together with Gordon", "Most of the desserts were invented and cooked by Mary herself"], a: 3, ex: "“Most of them were of my own invention; I had cooked them all myself” → D." },
          { n: 30, q: "What is Mary’s overall impression of her first job?", opts: ["It brought her much closer to her father", "It was sometimes uncomfortable and challenging, though rewarding later", "It was always enjoyable from start to finish", "It was effortless and required little work"], a: 1, ex: "Cô cảm thấy lạc lõng như người lạ, sợ đầu bếp Gordon và khách buổi tối ban đầu kém thân thiện, trước khi tìm thấy niềm vui làm bánh → B." }
        ]
      },
      {
        title: "PASSAGE 4 - Potash Making in Colonial North America",
        body: `Potash (the old name for potassium carbonate) is one of the two alkalis (the other being soda, sodium carbonate) that were used from remote antiquity in the making of glass, and from the early Middle Ages in the making of soap: the former being the product of heating a mixture of alkali and sand, the latter a product of alkali and vegetable oil. Their importance in the communities of colonial North America need hardly be stressed.

Potash and soda are not interchangeable for all purposes, but for glass- or soap-making, either would do. Soda was obtained largely from the ashes of certain Mediterranean sea plants, and potash from those of inland vegetation. Hence, potash was more familiar to the early European settlers of the North American continent.

The settlement at Jamestown in Virginia was in many ways a microcosm of the economy of colonial North America, and potash was one of its first concerns. It was required for the glassworks, the first factory in the British colonies, and was produced in sufficient quantity to permit the inclusion of potash in the first cargo shipped out of Jamestown. The second ship to arrive in the settlement from England included among its passengers experts in potash making.

The method of making potash was simple enough. Logs were piled up and burned in the open, and the ashes collected. The ashes were placed in a barrel with holes in the bottom, and water was poured over them. The solution draining from the barrel was boiled down in iron kettles. The resulting mass was further heated to fuse the mass into what was called potash.

In North America, potash making quickly became an adjunct to the clearing of land for agriculture, for it was estimated that as much as half the cost of clearing land could be recovered by the sale of potash. Some potash was exported from Maine and New Hampshire in the seventeenth century, but the market turned out to be mainly domestic, consisting mostly of shipments from the northern to the southern colonies. Despite the beginning of the trade at Jamestown and such encouragements as a series of acts to encourage the making of potash, beginning in 1707 in South Carolina, the softwoods in the South proved to be poor sources of the substance.`,
        questions: [
          { n: 31, q: "What aspect of potash does the passage mainly discuss?", opts: ["How it was made", "Its value as a product for export", "How it differs from other alkalis", "Its importance in colonial North America"], a: 3, ex: "Toàn bài bàn về vai trò, quy trình sản xuất và giá trị kinh tế của potash tại các thuộc địa Bắc Mỹ → D." },
          { n: 32, q: "All of the following statements are true of both potash and soda EXCEPT that ______.", opts: ["They are alkalis", "They are made from sea plants", "They are used in making soap", "They are used in making glass"], a: 1, ex: "Chỉ có soda được làm từ thực vật biển Địa Trung Hải, còn potash làm từ thực vật trên cạn (inland vegetation) → B." },
          { n: 33, q: "The phrase “the latter” in paragraph 1 refers to ______.", opts: ["Alkali", "Glass", "Sand", "Soap"], a: 3, ex: "“In the making of glass, and... in the making of soap: the former... the latter...” → the former là glass, the latter là soap → D." },
          { n: 34, q: "The word “stressed” in paragraph 1 is closest in meaning to ______.", opts: ["Defined", "Emphasized", "Adjusted", "Mentioned"], a: 1, ex: "Need hardly be stressed = hầu như không cần phải nhấn mạnh thêm (emphasized) → B." },
          { n: 35, q: "The word “interchangeable” in paragraph 2 is closest in meaning to ______.", opts: ["Convenient", "Identifiable", "Equivalent / replaceable", "Advantageous"], a: 2, ex: "Interchangeable = có thể thay thế cho nhau, tương đương (equivalent) → C." },
          { n: 36, q: "It can be inferred from the passage that potash was more common than soda in colonial North America because ______.", opts: ["The materials needed for making soda were not readily available there", "Making potash required less time than making soda", "Potash is a better alkali for making glass and soap", "The colonial glassworks found soda more difficult to use"], a: 0, ex: "Soda lấy từ cây biển Địa Trung Hải, trong khi Bắc Mỹ có sẵn rừng cây nội địa để đốt lấy tro làm potash → A." },
          { n: 37, q: "According to paragraph 4, all of the following were needed for making potash EXCEPT ______.", opts: ["Wood (logs)", "Fire", "Sand", "Water"], a: 2, ex: "Cát (sand) dùng để nấu thủy tinh, không phải nguyên liệu tạo ra potash (gồm gỗ, lửa đốt lấy tro và nước lọc qua thùng) → C." },
          { n: 38, q: "The word “adjunct” in paragraph 5 is closest in meaning to ______.", opts: ["Addition / supplement", "Answer", "Problem", "Possibility"], a: 0, ex: "Adjunct = hoạt động bổ trợ/đi kèm (addition) cho việc phát quang đất làm nông nghiệp → A." },
          { n: 39, q: "According to the passage, a major benefit of making potash was that ______.", opts: ["It could be exported to Europe in exchange for other goods", "It helped finance the creation of farms", "It could be made with a variety of materials", "It stimulated the development of new ways of glassmaking"], a: 1, ex: "Đoạn 5: bán potash giúp bù đắp tới một nửa chi phí phát quang đất lập trang trại (“half the cost of clearing land could be recovered”) → B." },
          { n: 40, q: "According to paragraph 5, the softwoods in the South posed a problem for southern settlers because such woods ______.", opts: ["Were not very plentiful", "Could not be used to build houses", "Were not marketable", "Were not very useful for making potash"], a: 3, ex: "Câu cuối: “the softwoods in the South proved to be poor sources of the substance” → gỗ mềm ở miền Nam là nguồn nguyên liệu kém để làm potash → D." }
        ]
      }
    ]
  },

  /* ==========================================================
     BỘ ĐỀ READING SỐ 05 — Nguồn: Ngoại Ngữ Vivian Full Test
     ========================================================== */
  {
    id: "rset5",
    title: "Đề số 05: Vivian Reading Full Test (B1-B2-C1)",
    source: "Ngoại Ngữ Vivian (vivian.edu.vn)",
    passages: [
      {
        title: "PASSAGE 1 - Vietnamese Street Food Heritage",
        body: `For anyone visiting Vietnam, the vibrant aroma of simmering broth, grilled meats, and fresh herbs wafting from the sidewalks is an unforgettable sensory experience. Vietnamese street food is not merely a convenient way to grab a quick meal; it is the lifeblood of the nation’s culinary identity and social fabric. From the bustling alleys of Hanoi to the sun-drenched boulevards of Ho Chi Minh City, makeshift stalls equipped with low plastic stools serve some of the most flavorful dishes in the world.

What sets Vietnamese street cuisine apart from that of many other nations is its remarkable emphasis on balance. Traditional culinary philosophy in Vietnam relies on the harmony of five fundamental taste elements: spicy, sour, bitter, salty, and sweet. Each dish is carefully crafted so that no single flavor overwhelms the others, creating a dining experience that feels both rich and refreshing. For instance, a classic bowl of pho or bun cha combines rich, savory meat or broth with a generous platter of crisp, raw herbs, tangy lime, and fiery chili. Because of this reliance on fresh, unprocessed ingredients and minimal use of heavy cooking oils, nutritionists often praise Vietnamese street food as one of the healthiest cuisines globally.

Another defining characteristic of Vietnam’s sidewalk dining is extreme specialization. Unlike traditional restaurants that offer extensive menus with dozens of unrelated items, a typical street vendor often dedicates their entire life to perfecting just one single dish. It is quite common to find a family stall that has been serving only banh mi (Vietnamese baguette) or com tam (broken rice) for three generations, using a closely guarded family recipe. [A] This relentless focus ensures a level of culinary mastery that even high-end restaurants struggle to replicate. [B]

In recent years, however, the landscape of Vietnamese street food has begun to face modern challenges. Rapid urbanization and stricter government regulations regarding sidewalk hygiene and pedestrian space have forced many traditional vendors to relocate or close down. [C] Nevertheless, street food culture has proven to be remarkably resilient. Younger entrepreneurs are finding innovative ways to preserve traditional flavors while upgrading food safety standards and utilizing digital delivery platforms. [D] Ultimately, whether enjoyed on a tiny plastic stool by the roadside or ordered through a smartphone app, street food remains an irreplaceable symbol of Vietnamese heritage.`,
        questions: [
          { n: 1, q: "Which of the following best restates the sentence: “Each dish is carefully crafted so that no single flavor overwhelms the others, creating a dining experience that feels both rich and refreshing”?", opts: ["Vietnamese cooks avoid using strong spices so that the food remains light and easy to digest.", "Every meal is prepared to blend different tastes equally, resulting in a satisfying yet light flavor profile.", "Only dishes that contain both rich meats and refreshing herbs are considered authentic in Vietnam.", "The preparation of street food requires a long time to ensure that sweet and salty flavors are separated."], a: 1, ex: "Câu gốc nhấn mạnh sự pha trộn cân bằng các vị sao cho không vị nào lấn át vị nào, tạo cảm giác vừa đậm đà vừa thanh mát → B." },
          { n: 2, q: "According to paragraph 2, why do health experts have a positive view of Vietnamese street food?", opts: ["It completely eliminates the use of sugar and salt in daily cooking.", "It relies heavily on boiling rather than grilling or frying meats.", "It uses plenty of fresh vegetables and very little cooking fat.", "It follows strict calorie limits set by traditional medical philosophy."], a: 2, ex: "“Because of this reliance on fresh, unprocessed ingredients and minimal use of heavy cooking oils, nutritionists often praise Vietnamese street food...” → C." },
          { n: 3, q: "The word “their” in paragraph 3 refers to ______.", opts: ["traditional restaurants’", "unrelated items’", "a typical street vendor’s", "foreign tourists’"], a: 2, ex: "“A typical street vendor often dedicates their entire life to perfecting just one single dish” → their quy chiếu tới a typical street vendor → C." },
          { n: 4, q: "How do street food stalls typically differ from standard restaurants in Vietnam?", opts: ["Street stalls change their menus daily depending on the weather and season.", "Street vendors usually focus on mastering and selling only one specific dish.", "Standard restaurants use secret family recipes passed down through generations.", "Standard restaurants charge much lower prices for traditional noodle soups."], a: 1, ex: "Đoạn 3: Khác với nhà hàng có thực đơn hàng chục món, quán vỉa hè thường chỉ chuyên tâm hoàn thiện một món duy nhất → B." },
          { n: 5, q: "Which of the following is NOT mentioned as one of the five basic taste elements in Vietnamese cooking?", opts: ["Bitter", "Umami", "Sour", "Salty"], a: 1, ex: "Đoạn 2 liệt kê 5 vị: spicy, sour, bitter, salty, sweet. Không có Umami → B." },
          { n: 6, q: "Why does the author mention “three generations” in paragraph 3?", opts: ["To illustrate the long-standing dedication of families to a single culinary specialty.", "To argue that older people in Vietnam cook much better than the younger generation.", "To show that street food businesses are the most profitable jobs in big cities.", "To explain why tourists prefer eating banh mi over other types of street food."], a: 0, ex: "Chi tiết 3 thế hệ chỉ bán bánh mì hoặc cơm tấm minh họa sự gắn bó và chuyên môn hóa lâu đời của các gia đình → A." },
          { n: 7, q: "The word “resilient” in paragraph 4 is closest in meaning to ______.", opts: ["adaptable", "expensive", "outdated", "delicate"], a: 0, ex: "Resilient = có sức bền, thích ứng tốt trước thử thách hiện đại (adaptable) → A." },
          { n: 8, q: "In which space (marked A, B, C and D in the passage) will the following sentence fit? “Customers know exactly which corner of the city to visit when they crave a specific flavor.”", opts: ["[A]", "[B]", "[C]", "[D]"], a: 1, ex: "Vị trí [B] nằm ngay sau ý chuyên môn hóa 1 món đạt tới độ tinh hoa, bổ sung hệ quả là khách hàng biết chính xác góc phố nào cần tìm đến khi thèm món đó → B." },
          { n: 9, q: "What can be inferred from paragraph 4 about the future of Vietnamese street food?", opts: ["It will completely disappear from city sidewalks within the next decade.", "It is adapting to modern standards while keeping its core culinary values alive.", "Young people in Vietnam are losing interest in traditional cooking methods.", "Government regulations have failed to improve the hygiene of street stalls."], a: 1, ex: "Thế hệ trẻ đang giữ hương vị truyền thống đồng thời nâng chuẩn vệ sinh và dùng ứng dụng giao đồ ăn → B." },
          { n: 10, q: "What is the main purpose of the passage?", opts: ["To provide a tourist guide on the cheapest places to eat in Hanoi and Ho Chi Minh City.", "To compare the nutritional value of Vietnamese cuisine with other Asian food cultures.", "To give an overview of the unique features, cultural value, and modern adaptation of Vietnamese street food.", "To criticize urban planning policies that threaten the livelihood of poor street vendors."], a: 2, ex: "Bài đọc giới thiệu toàn diện bản sắc cân bằng vị, tính chuyên môn hóa và sự thích ứng hiện đại của ẩm thực đường phố Việt Nam → C." }
        ]
      },
      {
        title: "PASSAGE 2 - Nanowood: Eco-Friendly Building Material",
        body: `As the global construction industry seeks sustainable alternatives to energy-intensive materials, scientists have engineered a remarkable new substance from one of humanity’s oldest resources: trees. Known as “nanowood,” this innovative material is created by treating natural wood at the microscopic level. Researchers at the University of Maryland discovered that by chemically removing lignin—the stiff, brownish polymer that gives wood its color and rigid structure—and then compressing the remaining plant fibers, they could produce a pale, lightweight material with extraordinary properties.

The most striking feature of nanowood is its exceptional ability to manage heat. In a living tree, microscopic hollow channels called lumens transport water and nutrients from the roots to the leaves. When wood is transformed into nanowood, these tiny channels are flattened and aligned in a single direction, while millions of nanometer-sized air pockets are trapped between the cellulose fibers. [A] Heat travels effortlessly along the length of the aligned fibers, but it is strongly blocked from passing straight through the thickness of the wood. [B] Furthermore, the bright white surface of delignified nanowood reflects nearly 95 percent of incoming solar radiation. As a result, nanowood blocks heat at least ten times more effectively than standard commercial insulators like Styrofoam or fiberglass.

Beyond its thermal efficiency, nanowood exhibits astonishing mechanical strength. During the manufacturing process, the removal of lignin allows the remaining cellulose nanofibers to bond tightly together through hydrogen bonding. Consequently, the compressed material becomes roughly eight times stronger than natural wood while remaining significantly lighter than steel or aluminum. Because cellulose is the most abundant biopolymer on Earth, nanowood is also completely biodegradable and non-toxic, avoiding the severe environmental hazards associated with manufacturing and disposing of petroleum-based plastics. [C]

With such a versatile profile, nanowood holds immense promise for multiple industries. In green architecture, applying a thin layer of nanowood to the exterior of buildings could drastically reduce the energy required for air conditioning, potentially cutting cooling costs by up to 20 percent. Additionally, unlike fiberglass, which can irritate human skin and lungs during installation, nanowood is entirely safe to handle. [D] As researchers work to scale up production and reduce the cost of chemical processing, nanowood may soon revolutionize how we build and insulate the modern world.`,
        questions: [
          { n: 11, q: "According to paragraph 1, how is nanowood produced from natural wood?", opts: ["By painting the wood surface with a reflective white chemical coating.", "By adding synthetic polymers to strengthen the natural plant fibers.", "By extracting lignin and pressing the remaining cellulose fibers together.", "By heating the wood at extreme temperatures until it turns into a light foam."], a: 2, ex: "Đoạn 1: “by chemically removing lignin... and then compressing the remaining plant fibers” → C." },
          { n: 12, q: "The word “lumens” in paragraph 2 refers to ______.", opts: ["chemical agents used to bleach wood", "tiny tube-like structures inside trees", "synthetic fibers that trap heat", "layers of bark on the outside of a trunk"], a: 1, ex: "“Microscopic hollow channels called lumens transport water and nutrients” → những ống rỗng siêu nhỏ trong thân cây → B." },
          { n: 13, q: "The word “it” in paragraph 2 refers to ______.", opts: ["nanowood", "a living tree", "heat", "a single direction"], a: 2, ex: "“Heat travels effortlessly along the length of the aligned fibers, but it is strongly blocked...” → it = heat → C." },
          { n: 14, q: "Why is nanowood such an effective thermal insulator?", opts: ["Its dark color absorbs solar energy and converts it into electricity.", "Its aligned fibers, tiny air pockets, and white surface prevent heat from penetrating.", "It contains liquid nutrients that cool down the surrounding air automatically.", "It is much thicker and heavier than traditional materials like fiberglass."], a: 1, ex: "Đoạn 2 nêu 3 yếu tố: sợi xếp thẳng hàng, hàng triệu túi khí nano và bề mặt trắng phản xạ 95% bức xạ mặt trời → B." },
          { n: 15, q: "Which of the following best paraphrases: “Consequently, the compressed material becomes roughly eight times stronger than natural wood while remaining significantly lighter than steel or aluminum”?", opts: ["Pressing the wood makes it far more durable than untreated timber and much less heavy than common metals.", "Natural wood is eight times heavier than nanowood, making it less useful than steel or aluminum in construction.", "Steel and aluminum are stronger than natural wood, but they cannot be compressed as easily as nanowood.", "The chemical process reduces the weight of metals by eight times when they are combined with natural wood fibers."], a: 0, ex: "Vật liệu sau khi nén bền gấp 8 lần gỗ tự nhiên nhưng nhẹ hơn đáng kể so với thép và nhôm → A." },
          { n: 16, q: "Which of the following is NOT mentioned as an advantage of nanowood over traditional materials?", opts: ["It is harmless to the environment when discarded.", "It does not cause physical irritation to workers who install it.", "It is currently much cheaper to mass-produce than Styrofoam.", "It provides superior protection against heat transfer."], a: 2, ex: "Câu cuối bài cho biết các nhà khoa học vẫn đang tìm cách giảm chi phí xử lý hóa học và mở rộng quy mô sản xuất → C sai." },
          { n: 17, q: "Why does the author mention “Styrofoam or fiberglass” in paragraph 2?", opts: ["To give examples of materials that are often combined with nanowood.", "To highlight the superior insulating performance of nanowood by comparison.", "To explain why modern buildings consume so much electrical energy.", "To show that synthetic insulators are more durable than plant-based ones."], a: 1, ex: "So sánh trực tiếp để làm nổi bật khả năng chặn nhiệt gấp 10 lần của nanowood → B." },
          { n: 18, q: "In which space (marked A, B, C and D in the passage) will the following sentence fit? “This unique directional structure creates a powerful barrier against thermal transfer.”", opts: ["[A]", "[B]", "[C]", "[D]"], a: 1, ex: "Vị trí [B] ngay sau câu giải thích nhiệt đi dọc theo sợi nhưng bị chặn không xuyên qua chiều dày gỗ → B." },
          { n: 19, q: "What can be inferred from paragraph 4 about the current state of nanowood?", opts: ["It has already replaced steel and fiberglass in most newly built skyscrapers.", "Its chemical manufacturing process still needs to become more economical for widespread use.", "Architects are reluctant to use it because it cannot withstand rainy weather.", "It is only suitable for small electronic devices rather than large buildings."], a: 1, ex: "“As researchers work to scale up production and reduce the cost of chemical processing...” → cần tối ưu chi phí để thương mại hóa rộng rãi → B." },
          { n: 20, q: "Which of the following would be the best title for this passage?", opts: ["The Environmental Dangers of Fiberglass and Plastics", "How Trees Transport Water and Nutrients in Nature", "Nanowood: A High-Performance, Eco-Friendly Material of the Future", "New Methods for Lowering Air Conditioning Costs in Summer"], a: 2, ex: "Tiêu đề C bao quát trọn vẹn tính năng cách nhiệt, độ bền, tính sinh thái và triển vọng tương lai của nanowood → C." }
        ]
      },
      {
        title: "PASSAGE 3 - Urban Heat Islands & Sensory Pollution",
        body: `As over half of the world’s population now resides in metropolitan areas, cities have become the engines of global economic growth. Yet, this rapid concentration of human activity has exacted a severe toll on the urban environment. While industrial smokestacks and tailpipe emissions remain the most visible symbols of urban degradation, modern environmental scientists emphasize that city pollution is a complex, multi-dimensional crisis. Beyond toxic air particulates, contemporary metropolises are increasingly plagued by invisible hazards—namely, the Urban Heat Island (UHI) effect and pervasive sensory pollution.

Air quality deterioration in cities is driven primarily by the combustion of fossil fuels in transportation and energy generation. Fine particulate matter, known as PM2.5, poses the greatest threat to public health because these microscopic pollutants can bypass the respiratory system’s natural defenses and enter the bloodstream. However, the physical architecture of a city exacerbates this hazard. Tall buildings lining narrow streets create “urban canyons” that trap exhaust fumes at ground level, preventing wind from dispersing the toxins. Consequently, pedestrian exposure to pollutants in densely built neighborhoods can be exponentially higher than regional averages suggest.

Compounding the problem of toxic air is the Urban Heat Island effect, a phenomenon in which metropolitan areas experience significantly warmer temperatures than surrounding rural landscapes. [A] As natural vegetation is replaced by sprawling expanses of asphalt, concrete, and dark rooftops, the urban surface loses its ability to cool itself through evapotranspiration. Instead, these artificial materials absorb solar radiation throughout the day and slowly release it as heat at night. [B] Not only does this thermal retention increase energy demand for air conditioning—thereby generating more greenhouse gases—but it also accelerates the chemical reactions that form ground-level ozone, a major component of smog.

Equally insidious, though historically overlooked, are noise and light pollution. The relentless cacophony of traffic, construction, and sirens keeps urban residents in a state of low-grade physiological stress. Epidemiological studies have linked chronic exposure to traffic noise above 55 decibels to elevated risks of hypertension, sleep disruption, and cardiovascular disease. [C] Simultaneously, artificial light at night obscures the night sky, disrupts human circadian rhythms, and disorients nocturnal wildlife, such as migratory birds and pollinating insects. [D] Addressing the urban environmental crisis therefore requires more than just transitioning to electric vehicles; it demands a fundamental rethinking of urban design, incorporating green infrastructure, reflective building materials, and stricter acoustic zoning.`,
        questions: [
          { n: 21, q: "What is the main idea of paragraph 1?", opts: ["Industrial factories are no longer the primary source of pollution in modern cities.", "Economic growth in metropolitan areas is slowing down due to environmental regulations.", "Urban pollution today encompasses both traditional chemical emissions and less visible environmental stressors.", "Rural areas are becoming just as polluted as major cities due to population growth."], a: 2, ex: "Đoạn 1 nhấn mạnh ô nhiễm đô thị hiện đại gồm cả khí thải độc hại lẫn các mối nguy vô hình như đảo nhiệt đô thị và ô nhiễm tiếng ồn/ánh sáng → C." },
          { n: 22, q: "The phrase “this hazard” in paragraph 2 refers to ______.", opts: ["the construction of tall buildings", "the threat posed by fine particulate matter (PM2.5)", "the natural defense of the respiratory system", "the speed of wind in narrow streets"], a: 1, ex: "Câu trước nói về mối nguy sức khỏe từ bụi mịn PM2.5, câu sau nói kiến trúc đô thị làm trầm trọng thêm mối nguy này → B." },
          { n: 23, q: "According to paragraph 2, how do “urban canyons” affect city residents?", opts: ["They channel strong winds that blow dust into residential apartments.", "They block sunlight from reaching the streets, making cities colder in winter.", "They prevent air circulation, causing vehicle emissions to accumulate where people walk.", "They reduce the amount of space available for public transportation networks."], a: 2, ex: "“Tall buildings lining narrow streets create ‘urban canyons’ that trap exhaust fumes at ground level, preventing wind from dispersing the toxins” → C." },
          { n: 24, q: "Which of the following best paraphrases: “Not only does this thermal retention increase energy demand for air conditioning—thereby generating more greenhouse gases—but it also accelerates the chemical reactions that form ground-level ozone, a major component of smog”?", opts: ["Trapped heat forces people to use more cooling power, which releases more emissions, while also speeding up the creation of smog-producing ozone.", "Ground-level ozone traps heat inside buildings, forcing residents to turn on air conditioners and release greenhouse gases into the atmosphere.", "Air conditioning systems release chemical reactions that destroy the ozone layer and make cities much hotter during the summer months.", "Smog and greenhouse gases prevent solar radiation from escaping the city, which reduces the efficiency of modern cooling systems."], a: 0, ex: "Nhiệt giữ lại vừa làm tăng điện chạy điều hòa (tạo thêm khí nhà kính) vừa thúc đẩy phản ứng hóa học tạo ozone tầng mặt đất gây khói mù → A." },
          { n: 25, q: "According to paragraph 3, why do rural areas stay cooler than cities at night?", opts: ["Rural areas receive less solar radiation during the daytime than cities.", "Plants and soil in rural areas cool the environment naturally instead of storing heat like concrete.", "Strong winds in the countryside blow away the ozone that forms during the afternoon.", "Rural buildings are constructed with advanced reflective materials on their rooftops."], a: 1, ex: "Cây xanh làm mát tự nhiên qua quá trình thoát hơi nước (evapotranspiration), còn nhựa đường và bê tông đô thị tích nhiệt rồi tỏa ra ban đêm → B." },
          { n: 26, q: "The word “cacophony” in paragraph 4 is closest in meaning to ______.", opts: ["rhythm", "scarcity", "harsh noise", "sudden silence"], a: 2, ex: "Cacophony = âm thanh hỗn tạp, tiếng ồn chói tai (harsh noise) từ giao thông, công trường, còi xe → C." },
          { n: 27, q: "According to paragraph 4, which of the following is an effect of artificial light pollution?", opts: ["It causes permanent hearing loss in nocturnal animals.", "It interferes with the natural navigation and behavior of night-active species.", "It increases the rate of evapotranspiration in urban parks.", "It lowers blood pressure in people who work night shifts."], a: 1, ex: "“Disorients nocturnal wildlife, such as migratory birds and pollinating insects” → làm mất phương hướng các loài hoạt động ban đêm → B." },
          { n: 28, q: "In which space (marked A, B, C and D in the passage) will the following sentence fit? “In extreme summer heatwaves, this temperature gap can reach up to 5 degrees Celsius after sunset.”", opts: ["[A]", "[B]", "[C]", "[D]"], a: 1, ex: "Vị trí [B] ngay sau câu giải thích vật liệu nhân tạo hấp thụ nhiệt ban ngày và tỏa nhiệt ban đêm, tạo ra mức chênh lệch tới 5 độ C sau khi mặt trời lặn → B." },
          { n: 29, q: "What can be inferred from the passage about switching entirely to electric cars in cities?", opts: ["It would completely eliminate both the Urban Heat Island effect and light pollution.", "It would be an important step, but insufficient on its own to solve all urban environmental problems.", "It would make urban canyons more dangerous by increasing traffic congestion.", "It is opposed by environmental scientists who prefer building taller skyscrapers."], a: 1, ex: "Câu cuối: “requires more than just transitioning to electric vehicles; it demands a fundamental rethinking of urban design” → B." },
          { n: 30, q: "Which of the following best describes the author’s tone in the passage?", opts: ["Indifferent and detached", "Analytical and urgent", "Sarcastic and dismissive", "Overly optimistic"], a: 1, ex: "Tác giả phân tích khoa học đa chiều và nhấn mạnh tính cấp thiết phải tái thiết kế đô thị → B." }
        ]
      },
      {
        title: "PASSAGE 4 - Rachel Carson’s Silent Spring",
        body: `Rarely in modern history has a single literary work altered the trajectory of public policy and scientific consciousness as profoundly as Rachel Carson’s Silent Spring. Published in 1962, the book exposed the ecological devastation wrought by the indiscriminate use of synthetic pesticides, most notably DDT. Yet, to understand why Silent Spring resonated so deeply with the public while withstanding a ferocious counterattack from the chemical industry, one must examine Carson herself. Far from being a radical polemicist, Carson was a meticulous marine biologist and an already celebrated nature writer whose unique synthesis of empirical rigor and lyrical prose made her a uniquely formidable advocate for the natural world.

Born in 1907 in rural Pennsylvania, Carson developed an early affinity for both literature and biology—two disciplines she initially viewed as mutually exclusive career paths. After earning a master’s degree in zoology from Johns Hopkins University in 1932, financial necessity prompted her to join the U.S. Bureau of Fisheries as a science writer and editor. During her fifteen-year tenure in government service, she honed the rare ability to translate dense, bureaucratic research into captivating narratives. This dual identity culminated in her “sea trilogy”—including the international bestseller The Sea Around Us (1951)—which established her reputation as a trusted public intellectual long before she turned her attention to synthetic toxins.

By the late 1950s, post-war euphoria over chemical technologies had led to the widespread aerial spraying of DDT to eradicate agricultural pests and disease-carrying insects. Alarmed by reports from ornithologists detailing sudden bird die-offs, Carson spent four years compiling thousands of peer-reviewed studies, government reports, and testimonies from medical researchers. [A] In Silent Spring, she did not argue for the complete abandonment of pest control; rather, she contended that spraying persistent toxins without understanding their bioaccumulation in the food chain was an act of supreme hubris. [B] What elevated the book from a dry technical report to a cultural phenomenon was Carson’s deliberate rhetorical strategy: she framed ecological interdependence in poetic terms that ordinary citizens could grasp emotionally, while anchoring every claim in fifty-five pages of scholarly citations.

The backlash from agricultural and chemical conglomerates was immediate and vitriolic. Corporations threatened lawsuits and spent hundreds of thousands of dollars on public relations campaigns to impugn Carson’s scientific credentials. Critics frequently resorted to gendered ad hominem attacks, dismissing her as a “hysterical spinster” whose sentimental attachment to birds threatened human progress and food security. [C] Crucially, Carson was fighting this public battle while privately enduring terminal breast cancer, a diagnosis she concealed lest the industry use it to accuse her of personal bias against chemical carcinogens. [D] When she testified before a U.S. Senate subcommittee in 1963—wearing a wig to hide the effects of radiation therapy—her composed, objective demeanor dismantled her detractors’ caricature of her as an emotional extremist.

Although Carson passed away in 1964, her intellectual legacy proved indelible. A presidential science advisory committee vindicated her findings, leading to the domestic ban on DDT in 1972 and catalyzing the establishment of the U.S. Environmental Protection Agency. Ultimately, Rachel Carson redefined the role of the scientist in society, demonstrating that objective inquiry and moral responsibility to the planetary ecosystem are not contradictory, but inseparable.`,
        questions: [
          { n: 31, q: "The word “lyrical” in paragraph 1 is closest in meaning to ______.", opts: ["poetic and expressive", "dry and statistical", "aggressive and confrontational", "brief and informal"], a: 0, ex: "Lyrical prose = văn xuôi giàu chất thơ và biểu cảm (poetic and expressive) → A." },
          { n: 32, q: "According to paragraph 2, how did Carson’s work at the U.S. Bureau of Fisheries contribute to her later success?", opts: ["It provided her with the funding needed to conduct her own laboratory experiments on DDT.", "It allowed her to master the skill of communicating complex scientific data to the general public.", "It introduced her to executives in the chemical industry who later gave her confidential reports.", "It convinced her to abandon literature entirely and focus exclusively on marine zoology."], a: 1, ex: "“She honed the rare ability to translate dense, bureaucratic research into captivating narratives” → B." },
          { n: 33, q: "Why does the author mention Carson’s book The Sea Around Us (1951) in paragraph 2?", opts: ["To show that she was already a respected and credible author before publishing Silent Spring.", "To argue that her earlier books about the ocean were more scientifically accurate than her later work.", "To explain why the U.S. government fired her from the Bureau of Fisheries.", "To demonstrate that marine pollution was a much bigger problem than agricultural pesticides in the 1950s."], a: 0, ex: "Tác phẩm năm 1951 đã khẳng định uy tín của bà như một trí thức đại chúng đáng tin cậy trước khi bà viết Silent Spring → A." },
          { n: 34, q: "The word “hubris” in paragraph 3 is closest in meaning to ______.", opts: ["caution", "arrogance", "generosity", "curiosity"], a: 1, ex: "Hubris = sự ngạo mạn, tự phụ quá mức (arrogance) khi phun chất độc bền vững mà không hiểu hậu quả tích tụ sinh học → B." },
          { n: 35, q: "Which of the following best paraphrases the sentence about Carson’s rhetorical strategy in paragraph 3?", opts: ["The book became famous because Carson removed 55 pages of boring scientific data and replaced them with emotional poetry for average readers.", "Carson’s book achieved massive cultural impact because she purposefully combined moving, accessible language about nature with extensive scientific evidence.", "Ordinary citizens preferred reading the 55 pages of scholarly citations rather than the poetic descriptions of ecological interdependence.", "Unlike technical reports, cultural phenomena do not require scholarly citations if the author uses an emotional rhetorical strategy."], a: 1, ex: "Bà kết hợp ngôn từ giàu cảm xúc, dễ hiểu với 55 trang trích dẫn khoa học chặt chẽ → B." },
          { n: 36, q: "According to paragraph 3, what was Carson’s actual stance on pest control in Silent Spring?", opts: ["All chemical and biological methods of pest control should be immediately outlawed worldwide.", "Insects are more important than human agriculture and should never be harmed.", "Chemical pesticides were being overused recklessly without regard for their long-term effects on the food chain.", "Only the U.S. military should be allowed to manufacture and spray synthetic chemicals like DDT."], a: 2, ex: "Bà không đòi xóa bỏ hoàn toàn việc diệt sâu bệnh mà phản đối việc phun hóa chất độc hại tràn lan không hiểu hậu quả tích tụ sinh học → C." },
          { n: 37, q: "The word “her” in paragraph 4 refers to ______.", opts: ["Carson", "a critic", "a corporation", "food security"], a: 0, ex: "“Dismissing her as a ‘hysterical spinster’” → her = Rachel Carson → A." },
          { n: 38, q: "Why did Rachel Carson hide her cancer diagnosis from the public?", opts: ["She did not want her readers to feel pity for her and buy the book out of sympathy.", "She feared her opponents would claim her illness made her unscientifically biased against chemicals.", "She was worried that the U.S. Senate would cancel her testimony if they knew she was sick.", "She believed that radiation therapy would cure her before the book was published."], a: 1, ex: "“A diagnosis she concealed lest the industry use it to accuse her of personal bias against chemical carcinogens” → B." },
          { n: 39, q: "In which space (marked A, B, C and D in the passage) will the following sentence fit? “Yet, these personal smears backfired when the public saw the stark contrast between the industry’s hostility and the author’s calm authority.”", opts: ["[A]", "[B]", "[C]", "[D]"], a: 3, ex: "Vị trí [D] dẫn nối hoàn hảo tới câu tiếp theo mô tả phong thái điềm tĩnh, khách quan của bà tại phiên điều trần Thượng viện năm 1963 → D." },
          { n: 40, q: "What can be concluded about Rachel Carson from the passage?", opts: ["She was a controversial figure whose scientific claims were eventually disproven by the government.", "Her success in sparking the modern environmental movement stemmed from her rare blend of literary talent, scientific rigor, and personal courage.", "She regretted writing Silent Spring because of the intense personal attacks she suffered from chemical companies.", "Her primary goal in writing Silent Spring was to transition from a career in biology to a career in national politics."], a: 1, ex: "Thành công của bà đến từ sự kết hợp hiếm có giữa tài năng văn chương, sự chuẩn xác khoa học và lòng dũng cảm cá nhân → B." }
        ]
      }
    ]
  },

  /* ==========================================================
     BỘ ĐỀ READING SỐ 06 — Nguồn: ZIM Academy & PREP Edu Sample Test
     ========================================================== */
  {
    id: "rset6",
    title: "Đề số 06: ZIM & PREP Reading Full Test",
    source: "ZIM Academy (zim.vn) & PREP Edu (prepedu.com)",
    passages: [
      {
        title: "PASSAGE 1 - Working in Extreme Environments",
        body: `What’s it like to work in extreme environments? Four professionals share their experiences of working in some of the most challenging conditions on Earth.

Liam – Deep-Sea Diver
Diving into the unknown is both exhilarating and terrifying. The deep sea is a world of darkness and pressure where few humans have ventured. My role often involves maintaining underwater pipelines and investigating shipwrecks. The most dangerous part of my job is decompression, which, if done incorrectly, can be fatal. But what makes it worth it are the rare moments when I witness marine life that most people will never see in their lifetime.

Emma – Antarctic Researcher
Spending months in Antarctica is a test of both physical and mental endurance. The cold here is unimaginable, and the isolation can be tough. My work focuses on studying climate change through ice core samples, which reveal Earth’s history. The lack of sunlight during winter months is challenging, but the breathtaking beauty of the landscape and the chance to contribute to vital research keep me motivated.

Raj – Wildlife Photographer
Capturing images of animals in their natural habitats often requires weeks of patience and incredible resilience. I’ve spent days in extreme heat waiting for a single shot of a lion. One of my most unforgettable experiences was photographing snow leopards in the Himalayas. The altitude and harsh conditions pushed me to my limits, but the reward of capturing such rare beauty made it all worthwhile.

Sofia – Emergency Relief Worker
Responding to natural disasters or conflicts around the world is both physically exhausting and emotionally draining. My team and I are often among the first to arrive, bringing supplies and medical aid. I’ve worked in flood zones, earthquake-hit regions, and war-torn areas. It’s heartbreaking to see people in such desperate situations, but being able to help even a little gives me a sense of purpose.`,
        questions: [
          { n: 1, q: "In the first paragraph, what does Liam mean by saying “Diving into the unknown is both exhilarating and terrifying”?", opts: ["He enjoys the danger of his job.", "His job is exciting but can be dangerous.", "He knows everything about his work environment.", "His work involves studying marine species."], a: 1, ex: "Exhilarating (hào hứng, thú vị) và terrifying (đáng sợ, nguy hiểm) → công việc vừa thú vị vừa tiềm ẩn nguy hiểm → B." },
          { n: 2, q: "What is the most dangerous aspect of Liam’s job?", opts: ["Repairing pipelines", "Encountering marine life", "Incorrect decompression", "Investigating shipwrecks"], a: 2, ex: "“The most dangerous part of my job is decompression, which, if done incorrectly, can be fatal” → C." },
          { n: 3, q: "The word “isolation” in paragraph 2 could best be replaced by", opts: ["separation", "loneliness / solitariness", "remoteness", "boredom"], a: 1, ex: "Isolation ở Nam Cực nhiều tháng liền mang nghĩa sự cô lập, cô đơn (loneliness) → B." },
          { n: 4, q: "What motivates Emma to continue working in Antarctica despite the challenges?", opts: ["The chance to study rare animals", "The beauty of the environment and meaningful work", "The opportunity to work in complete darkness", "The satisfaction of living in a unique location"], a: 1, ex: "“The breathtaking beauty of the landscape and the chance to contribute to vital research keep me motivated” → B." },
          { n: 5, q: "What does Raj emphasize about his work?", opts: ["The need for teamwork", "The difficulty of traveling to remote areas", "The patience and resilience required", "The importance of preserving wildlife"], a: 2, ex: "“Capturing images of animals in their natural habitats often requires weeks of patience and incredible resilience” → C." },
          { n: 6, q: "The word “altitude” in paragraph 3 is closest in meaning to", opts: ["height above sea level", "temperature", "location", "condition"], a: 0, ex: "Altitude (ở dãy Himalaya) = độ cao so với mực nước biển (height) → A." },
          { n: 7, q: "According to the passage, who frequently deals with life-threatening decompression conditions?", opts: ["Liam", "Emma", "Raj", "Sofia"], a: 0, ex: "Liam đối mặt với nguy cơ giảm áp (decompression) có thể gây tử vong (“can be fatal”) → A." },
          { n: 8, q: "According to the passage, who works in a highly isolated polar environment?", opts: ["Liam", "Emma", "Raj", "Sofia"], a: 1, ex: "Emma làm việc nhiều tháng ở Nam Cực lạnh giá và biệt lập → B." },
          { n: 9, q: "The word “heartbreaking” in paragraph 4 refers to something that", opts: ["causes deep sadness", "is physically exhausting", "gives a sense of purpose", "inspires hope"], a: 0, ex: "Heartbreaking = làm đau lòng, gây buồn bã sâu sắc (causes deep sadness) → A." },
          { n: 10, q: "What is the main purpose of this passage?", opts: ["To describe the daily routines of professionals in extreme jobs.", "To highlight the challenges and rewards of working in extreme environments.", "To compare the salaries of different extreme jobs.", "To explain how people train for jobs in harsh conditions."], a: 1, ex: "Cả 4 nhân vật đều chia sẻ những thử thách khắc nghiệt và phần thưởng ý nghĩa của công việc → B." }
        ]
      },
      {
        title: "PASSAGE 2 - The Secrets of Coral Reefs",
        body: `Coral reefs are among the most biologically diverse ecosystems on Earth, often referred to as the "rainforests of the sea." They host an incredible array of marine life, including fish, crustaceans, mollusks, and more. Despite their beauty and importance, these fragile ecosystems face numerous threats, many of which are caused by human activities.

Corals are actually tiny animals called polyps that belong to the phylum Cnidaria. These polyps form colonies, building massive calcium carbonate structures over time. What many people find extraordinary is that coral reefs cover less than 1% of the ocean floor but support around 25% of all marine species.

Coral reefs not only provide habitat for marine creatures but also offer vital benefits to humans. They protect coastlines from erosion by acting as natural barriers against storm surges and waves. Additionally, they contribute to the global economy through tourism and fishing. Coral reefs also hold great potential for medical advancements, as scientists study their organisms to develop treatments for diseases such as cancer and arthritis.

However, coral reefs are under threat from phenomena like coral bleaching. This occurs when corals expel the symbiotic algae that live in their tissues, causing them to turn white. Algae provide corals with much of their energy through photosynthesis, so bleaching often results in coral death. Rising sea temperatures, pollution, and overfishing are some of the primary causes of this distressing phenomenon.

Another significant issue is ocean acidification, which occurs when excess carbon dioxide dissolves into seawater. This process lowers the pH of the water, making it harder for corals to build their calcium carbonate skeletons. Without urgent intervention, coral reefs could face extinction within decades.

Just as forests on land require careful management to prevent deforestation, coral reefs need conservation efforts to survive. Governments, scientists, and local communities must work together to reduce carbon emissions, establish marine protected areas, and promote sustainable fishing practices. Public awareness campaigns can also encourage responsible tourism, ensuring that future generations will have the chance to marvel at the wonders of these underwater ecosystems.`,
        questions: [
          { n: 11, q: "The word 'host' in the first paragraph is closest in meaning to _________.", opts: ["produce", "accommodate", "threaten", "remove"], a: 1, ex: "Host = là nơi cư trú, chứa đựng (accommodate) hàng loạt sinh vật biển → B." },
          { n: 12, q: "The author’s main point is _________.", opts: ["to describe the ecological importance and threats to coral reefs.", "to explain how coral reefs protect human populations.", "to outline the process of coral bleaching in detail.", "to emphasize the role of coral reefs in scientific research."], a: 0, ex: "Bài đọc trình bày tầm quan trọng sinh thái/kinh tế của rạn san hô và các mối đe dọa cần bảo tồn → A." },
          { n: 13, q: "The author implies that coral reefs are unique in that _________.", opts: ["they are made entirely of algae.", "they cover a vast portion of the ocean floor.", "they support a disproportionate amount of marine biodiversity.", "they can recover quickly from environmental damage."], a: 2, ex: "Chỉ chiếm chưa tới 1% đáy đại dương nhưng nuôi dưỡng tới 25% loài sinh vật biển → C." },
          { n: 14, q: "The word 'barriers' in the third paragraph is closest in meaning to _________.", opts: ["obstacles / shields", "shelters", "divisions", "filters"], a: 0, ex: "Natural barriers against storm surges = rào chắn/vật cản tự nhiên chống sóng bão → A." },
          { n: 15, q: "The word 'their' in the third paragraph refers to _________.", opts: ["humans'", "coral reefs'", "coastlines'", "diseases'"], a: 1, ex: "“Coral reefs also hold great potential... as scientists study their organisms” → their = coral reefs' → B." },
          { n: 16, q: "The phrase 'turn white' in the fourth paragraph refers to _________.", opts: ["the process of coral skeleton formation", "the impact of algae on coral coloration", "the bleaching effect caused by stress factors", "the natural color of healthy corals"], a: 2, ex: "Khi san hô đẩy tảo cộng sinh ra ngoài do căng thẳng nhiệt độ/ô nhiễm, chúng bị tẩy trắng (coral bleaching) → C." },
          { n: 17, q: "The author suggests that coral bleaching _________.", opts: ["is caused by environmental stressors like rising sea temperatures and pollution", "occurs naturally without human interference", "results in the immediate growth of algae", "is unrelated to climate change"], a: 0, ex: "Đoạn 4: “Rising sea temperatures, pollution, and overfishing are some of the primary causes” → A." },
          { n: 18, q: "The author mentions carbon dioxide to illustrate _________.", opts: ["the main reason that caused coral bleaching", "the primary culprit of ocean acidification", "the economic impact of coral reef tourism", "the biodiversity of coral reef ecosystems"], a: 1, ex: "Đoạn 5: CO2 dư thừa hòa tan vào nước biển làm giảm độ pH, gây axit hóa đại dương (ocean acidification) → B." },
          { n: 19, q: "The term 'marine protected areas' in the last paragraph refers to _________.", opts: ["zones where all human entry is banned permanently", "regions designated only for laboratory research", "areas where human activities are regulated to conserve marine life", "locations that are dried up for land management"], a: 2, ex: "Khu bảo tồn biển là vùng quản lý hoạt động của con người để bảo vệ hệ sinh thái biển → C." },
          { n: 20, q: "The author concludes that _________.", opts: ["conservation efforts are futile in protecting coral reefs", "humans have no impact on coral reef survival", "awareness and cooperation are essential to saving coral reefs", "coral reefs are more resilient than land forests"], a: 2, ex: "Đoạn cuối nhấn mạnh sự hợp tác giữa chính phủ, nhà khoa học, cộng đồng và nâng cao nhận thức du lịch có trách nhiệm → C." }
        ]
      },
      {
        title: "PASSAGE 3 - The Global Challenge of E-Waste",
        body: `The rapid pace of technological innovation has led to a modern environmental crisis: the accumulation of e-waste, or electronic waste. [A] Defined as any discarded electrical or electronic equipment, e-waste includes everything from old cell phones and computers to outdated refrigerators and televisions. [B] This waste stream is growing at an alarming rate, posing significant health and environmental risks globally.

E-waste contains a complex mix of materials. While it holds valuable materials like gold, silver, and copper that can be recycled, it also contains highly toxic substances such as lead, mercury, and cadmium. Improper disposal, often involving primitive recycling methods in developing countries, results in these toxins leaching into the soil and water, and being released into the air when burned. This contamination is a major cause of health issues, including neurological damage and respiratory illnesses, among workers and local communities.

[C] Addressing the e-waste problem requires a multi-faceted approach. Manufacturers must embrace Extended Producer Responsibility (EPR), a policy framework that holds them accountable for the entire life cycle of their products, from design to disposal. Designing products for longevity, easier repair, and eventual dismantling is key to reducing the volume of waste generated.

Consumers also play a vital role. They need to be educated about the importance of properly recycling their electronics instead of simply throwing them into the regular trash. [D] Additionally, the trend of constantly upgrading to the newest gadget contributes significantly to the problem, and a shift towards more sustainable consumption habits is crucial. With a combined effort from industry, government, and consumers, the e-waste challenge can be managed for a healthier planet.`,
        questions: [
          { n: 21, q: "What is e-waste defined as in the passage?", opts: ["Only discarded cell phones and computers", "Any outdated home appliance", "Any discarded electrical or electronic equipment", "Only toxic materials from old electronics"], a: 2, ex: "Đoạn 1: “Defined as any discarded electrical or electronic equipment” → C." },
          { n: 22, q: "The word 'alarming' in paragraph 1 is closest in meaning to _________.", opts: ["calming", "slow", "disturbing / worrying", "manageable"], a: 2, ex: "Alarming = đáng báo động, đáng lo ngại (disturbing) → C." },
          { n: 23, q: "E-waste contains a mix of valuable materials and _________.", opts: ["organic waste", "highly toxic substances", "construction debris", "harmless plastic"], a: 1, ex: "Đoạn 2: “While it holds valuable materials... it also contains highly toxic substances such as lead, mercury, and cadmium” → B." },
          { n: 24, q: "What is one main consequence of improper e-waste disposal?", opts: ["Increased global trade", "Contamination of soil, water, and air", "Rapid technological innovation", "Lower manufacturing costs"], a: 1, ex: "Đoạn 2: Chất độc ngấm vào đất và nước, hoặc phát tán vào không khí khi đốt → B." },
          { n: 25, q: "The word 'leaching' in paragraph 2 is closest in meaning to _________.", opts: ["bonding", "burning", "dissolving and draining away into soil/water", "being protected"], a: 2, ex: "Leaching = rò rỉ, hòa tan và ngấm dần vào đất/nước → C." },
          { n: 26, q: "What does EPR (Extended Producer Responsibility) require manufacturers to be accountable for?", opts: ["Only the product's design phase", "Only the recycling phase", "The entire life cycle of their products", "Consumer education and awareness only"], a: 2, ex: "Đoạn 3: “holds them accountable for the entire life cycle of their products, from design to disposal” → C." },
          { n: 27, q: "The author suggests that designing products for longevity is important for _________.", opts: ["making them cheaper to manufacture", "reducing the volume of waste generated", "increasing their speed and performance", "making them easier to transport"], a: 1, ex: "“Designing products for longevity, easier repair, and eventual dismantling is key to reducing the volume of waste generated” → B." },
          { n: 28, q: "Where in the passage would the following sentence best fit? “This global issue demands immediate, collaborative action.”", opts: ["[A]", "[B]", "[C]", "[D]"], a: 2, ex: "Vị trí [C] mở đầu đoạn 3 trước câu “Addressing the e-waste problem requires a multi-faceted approach” (hoặc cuối đoạn 1) → C." },
          { n: 29, q: "According to the passage, what is a key consumer behavior that contributes to the e-waste problem?", opts: ["Buying older, used gadgets", "The trend of constantly upgrading to new gadgets", "Recycling electronics properly", "Choosing products designed for longevity"], a: 1, ex: "Đoạn 4: “the trend of constantly upgrading to the newest gadget contributes significantly to the problem” → B." },
          { n: 30, q: "The author’s main message is that the e-waste problem _________.", opts: ["is mostly the fault of consumers.", "can only be solved by government regulation.", "is a serious environmental issue that requires collaborative action.", "will eventually solve itself as technology improves."], a: 2, ex: "Câu cuối: “With a combined effort from industry, government, and consumers, the e-waste challenge can be managed” → C." }
        ]
      },
      {
        title: "PASSAGE 4 - The Mystery of the Moai on Easter Island",
        body: `Rapa Nui, better known as Easter Island, is a remote Polynesian island famous for its nearly 1,000 colossal stone statues, known as Moai. These monolithic figures, carved between the 13th and 16th centuries by the island’s early inhabitants, stand silently along the coastline, facing inland. The sheer size and number of the Moai, combined with the island’s relative isolation, have puzzled researchers for generations, particularly regarding the methods used to transport and erect them.

The Moai were primarily carved from volcanic tuff found at the Rano Raraku quarry, a site that still holds hundreds of unfinished statues. The completed Moai weigh an average of 14 tons, with some exceeding 80 tons. The popular, though disputed, theory for their transportation suggests that the islanders used complex systems of ropes and wooden sledges, slowly "walking" the statues from the quarry to their designated ceremonial platforms (ahu).

The decline of the Rapa Nui civilization is closely linked to the fate of the Moai. As the population grew, the islanders heavily deforested the land to acquire wood for everything from housing to moving the giant statues. This environmental destruction led to soil erosion, resource scarcity, and ultimately, internal conflict. Evidence suggests that during this period of collapse, the islanders began toppling the Moai, perhaps symbolizing the breakdown of their social and religious order.

However, recent research suggests that the story of total collapse might be an oversimplification. While the environmental damage was real, the Rapa Nui people demonstrated remarkable resilience, adapting their agricultural practices and social structures to the new, treeless landscape. Yet, the question of the Moai remains. The island continues to draw scholars and tourists alike, a lasting testament to the ambition and eventual struggle of its original inhabitants.`,
        questions: [
          { n: 31, q: "What is Rapa Nui famous for?", opts: ["Its rich biodiversity", "Its nearly 1,000 colossal stone statues (Moai)", "Its lush rainforests", "Its large volcanic mountain"], a: 1, ex: "Câu 1: “famous for its nearly 1,000 colossal stone statues, known as Moai” → B." },
          { n: 32, q: "The Moai were carved by the early inhabitants of Easter Island between the _________ centuries.", opts: ["11th and 14th", "13th and 16th", "15th and 18th", "17th and 20th"], a: 1, ex: "Đoạn 1: “carved between the 13th and 16th centuries” → B." },
          { n: 33, q: "The word 'colossal' in paragraph 1 is closest in meaning to _________.", opts: ["small", "colorful", "giant", "ordinary"], a: 2, ex: "Colossal = khổng lồ, to lớn (giant) → C." },
          { n: 34, q: "The main challenge for researchers studying the Moai is understanding _________.", opts: ["the religious beliefs they represent", "the origin of the islanders", "the methods used to transport and erect them", "the material they were made from"], a: 2, ex: "Đoạn 1: “puzzled researchers for generations, particularly regarding the methods used to transport and erect them” → C." },
          { n: 35, q: "The word 'their' in paragraph 2 refers to _________.", opts: ["Moai's", "researchers'", "islanders'", "wooden sledges'"], a: 0, ex: "“The popular, though disputed, theory for their transportation... walking the statues” → their = Moai's → A." },
          { n: 36, q: "Where were the Moai primarily carved?", opts: ["Along the coastline", "In the ceremonial platforms (ahu)", "At the Rano Raraku quarry", "In the center of the island"], a: 2, ex: "Đoạn 2: “carved from volcanic tuff found at the Rano Raraku quarry” → C." },
          { n: 37, q: "The decline of the Rapa Nui civilization is primarily linked to _________.", opts: ["a major earthquake", "heavy deforestation and resource scarcity", "a sudden volcanic eruption", "a foreign invasion"], a: 1, ex: "Đoạn 3: “heavily deforested the land... led to soil erosion, resource scarcity, and ultimately, internal conflict” → B." },
          { n: 38, q: "The word 'toppling' in paragraph 3 is closest in meaning to _________.", opts: ["building up", "standing up", "knocking over", "decorating"], a: 2, ex: "Toppling = lật đổ, xô đổ các bức tượng (knocking over) → C." },
          { n: 39, q: "The word 'testament' in paragraph 4 is closest in meaning to _________.", opts: ["challenge", "proof / evidence", "question", "obstacle"], a: 1, ex: "A lasting testament to = minh chứng sống động/bằng chứng lâu dài (proof) → B." },
          { n: 40, q: "What is the author's final attitude toward the Rapa Nui people?", opts: ["They failed to adapt to their new environment.", "They lacked the engineering skills to move the statues.", "They showed remarkable resilience despite environmental damage.", "They were solely responsible for the island's disappearance."], a: 2, ex: "Đoạn 4: “the Rapa Nui people demonstrated remarkable resilience, adapting their agricultural practices and social structures” → C." }
        ]
      }
    ]
  }
];

/* ==========================================================
   BỔ SUNG NGÂN HÀNG NGHE (LISTENING SETS 2 & 3)
   Bóc tách từ ZIM Sample Test, PDF ĐH Đồng Tháp & PDF ĐH Ngoại Thương
   ========================================================== */
const EXTRA_LISTENING = [
  /* --- ZIM Sample Test Part 1 (8 thông báo ngắn) --- */
  {
    gid: "lz1", part: 1, set: 2, official: false,
    title: "ZIM P1.1–1.4: Library, Brighton Train, Weather & Project Report",
    script: [
      { v: 0, t: "Number 1. Attention, all library visitors. Please note that today the library will close earlier than usual due to maintenance work. We will be shutting our doors at 6:00 PM. Thank you for your understanding." },
      { v: 2, t: "Number 2. Passengers traveling to Brighton, please proceed to Platform 6. The train will depart in 10 minutes. Once again, the train to Brighton is now boarding at Platform 6." },
      { v: 1, t: "Number 3. Severe weather conditions are expected in the area later today. Please take precautions, avoid unnecessary travel, and stay updated with the latest weather reports." },
      { v: 2, t: "Number 4. A reminder for students: project reports should be submitted to Room 303 by 5:00 PM today. Late submissions will not be accepted." }
    ],
    qs: [
      { id: "lz101", q: "What time will the library close today?", opts: ["8:00 PM", "7:00 PM", "6:00 PM", "9:00 PM"], a: 2, ex: "“We will be shutting our doors at 6:00 PM” → đóng cửa lúc 6 giờ tối → C." },
      { id: "lz102", q: "Which platform does the train to Brighton depart from?", opts: ["Platform 2", "Platform 6", "Platform 4", "Platform 8"], a: 1, ex: "“Passengers traveling to Brighton, please proceed to Platform 6” → sân ga số 6 → B." },
      { id: "lz103", q: "What is the main purpose of the third announcement?", opts: ["To warn about severe weather", "To notify a road closure", "To advertise a new event", "To remind about safety regulations"], a: 0, ex: "“Severe weather conditions are expected in the area later today. Please take precautions...” → cảnh báo thời tiết xấu → A." },
      { id: "lz104", q: "Where should students submit their project reports?", opts: ["Room 101", "Room 303", "Room 300", "Room 404"], a: 1, ex: "“Project reports should be submitted to Room 303 by 5:00 PM today” → phòng 303 → B." }
    ]
  },
  {
    gid: "lz2", part: 1, set: 2, official: false,
    title: "ZIM P1.5–1.8: Concert, Gym Membership, Water System & Bus Tickets",
    script: [
      { v: 1, t: "Number 5. The evening concert at Central Hall will start at 6:30 PM sharp. Doors open 30 minutes before the performance. Please arrive early to secure your seats." },
      { v: 2, t: "Number 6. Join our monthly gym membership and enjoy access to all equipment, as well as complimentary personal training sessions. Sign up today to begin your fitness journey!" },
      { v: 0, t: "Number 7. Attention, all residents: maintenance work on the water system will last approximately 3 hours. We apologize for the inconvenience and appreciate your patience." },
      { v: 1, t: "Number 8. Passengers boarding the bus, please ensure you validate your tickets before entering. Ticket machines are located near the entrance for your convenience." }
    ],
    qs: [
      { id: "lz105", q: "What time does the concert at Central Hall start?", opts: ["5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM"], a: 2, ex: "“The evening concert at Central Hall will start at 6:30 PM sharp” → 6:30 tối → C." },
      { id: "lz106", q: "What is included in the monthly gym membership?", opts: ["Free yoga classes", "Free swimming lessons", "Complimentary personal training", "Exclusive nutrition meals"], a: 2, ex: "“Enjoy access to all equipment, as well as complimentary personal training sessions” → tập cùng HLV cá nhân miễn phí → C." },
      { id: "lz107", q: "How long will the maintenance work on the water system last?", opts: ["1 hour", "2 hours", "4 hours", "3 hours"], a: 3, ex: "“Maintenance work on the water system will last approximately 3 hours” → 3 tiếng → D." },
      { id: "lz108", q: "What should passengers do before boarding the bus?", opts: ["Validate their tickets", "Show their ID cards", "Check the seating chart", "Confirm their destination"], a: 0, ex: "“Please ensure you validate your tickets before entering” → xác nhận vé tại máy trước khi lên xe → A." }
    ]
  },
  /* --- ZIM Sample Test Part 2 (3 hội thoại × 4 câu) --- */
  {
    gid: "lz3", part: 2, set: 2, official: false,
    title: "ZIM Conv 1: Student Accommodation & Utilities",
    script: [
      { v: 2, t: "I’m not sure about the cost of rent for this place. It seems a bit high for my student budget." },
      { v: 1, t: "I understand your concern, but remember that all utilities—electricity, water, and high-speed internet—are included in the rent. That saves you a lot of money on monthly bills." },
      { v: 2, t: "That’s good to know. Still, I think I prefer a single room rather than sharing a flat to avoid any potential conflicts with roommates. Having my own privacy is really important to me when I study at night." },
      { v: 1, t: "That makes complete sense. Finding accommodation that suits your lifestyle and study habits is always a priority." }
    ],
    qs: [
      { id: "lz109", q: "What is the man’s main concern about the accommodation?", opts: ["The cost of rent", "The size of the room", "The distance to campus", "The availability of facilities"], a: 0, ex: "Nam: “I’m not sure about the cost of rent for this place. It seems a bit high” → lo ngại về giá thuê → A." },
      { id: "lz110", q: "What does the woman point out about the utilities?", opts: ["They are paid by the university.", "They are included in the rent.", "They are optional for students.", "They need to be paid separately."], a: 1, ex: "Nữ: “all utilities... are included in the rent” → đã bao gồm trong tiền thuê nhà → B." },
      { id: "lz111", q: "Why does the man prefer a single room?", opts: ["To be closer to class", "To save money", "To have more privacy and avoid roommate conflicts", "To have a larger kitchen"], a: 2, ex: "Nam: “I prefer a single room... to avoid any potential conflicts with roommates. Privacy is also important to me” → C." },
      { id: "lz112", q: "What is the main topic of the conversation?", opts: ["Choosing a university course", "Finding suitable accommodation", "Budgeting food expenses", "Joining a student club"], a: 1, ex: "Cuộc trò chuyện xoay quanh việc chọn thuê phòng trọ phù hợp → B." }
    ]
  },
  {
    gid: "lz4", part: 2, set: 2, official: false,
    title: "ZIM Conv 2: Leisure Trip & City Tour",
    script: [
      { v: 1, t: "Hi there! I’m here on a leisure trip for a few days and looking to explore the city. Do you have any recommendations?" },
      { v: 2, t: "Definitely! As a travel agent, I’d suggest taking our morning city tour first. It’s very informative and gives you a great overview of the main historical attractions." },
      { v: 1, t: "That sounds wonderful. What about the National Museum? Is there anything I need to know before visiting?" },
      { v: 2, t: "Yes, make sure to bring your pre-booked ticket with you, as they don't sell tickets at the door on weekends. Also, check their schedule because they sometimes close early for private events." }
    ],
    qs: [
      { id: "lz113", q: "What is the purpose of the woman’s trip?", opts: ["Business", "Education", "Family visit", "Leisure"], a: 3, ex: "Nữ: “I’m here on a leisure trip for a few days” → đi du lịch nghỉ dưỡng → D." },
      { id: "lz114", q: "Why does the man recommend the city tour?", opts: ["It’s very informative.", "It’s free of charge.", "It includes lunch.", "It’s only for locals."], a: 0, ex: "Nam: “It’s very informative and gives you a great overview of the main historical attractions” → A." },
      { id: "lz115", q: "What should visitors make sure to bring to the museum?", opts: ["A guidebook", "Their tickets", "A camera", "A student ID"], a: 1, ex: "Nam: “make sure to bring your pre-booked ticket with you” → mang theo vé → B." },
      { id: "lz116", q: "What is the man’s role in the conversation?", opts: ["A hotel chef", "A museum guard", "A travel agent", "A fellow tourist"], a: 2, ex: "Người nam tư vấn lịch trình tour và vé tham quan như một nhân viên đại lý du lịch (travel agent) → C." }
    ]
  },
  {
    gid: "lz5", part: 2, set: 2, official: false,
    title: "ZIM Conv 3: Library Database & Group Assignment",
    script: [
      { v: 1, t: "I’m having trouble with this sociology assignment. The topic is quite confusing, and I honestly don’t know where to start." },
      { v: 2, t: "You should try using the university library’s online database. They have excellent peer-reviewed resources that really help clarify the core concepts." },
      { v: 1, t: "That’s a good idea, I'll log in tonight. To be honest, I’m also feeling a bit nervous about working in a group for the second part of the project." },
      { v: 2, t: "Don’t worry too much. Group work can be challenging at first, but it’s also a great opportunity to share ideas and learn from others." }
    ],
    qs: [
      { id: "lz117", q: "Why does the woman need help with her assignment?", opts: ["She doesn’t know how to begin.", "She missed the last lecture.", "She lost her laptop.", "She is running out of time."], a: 0, ex: "Nữ: “The topic is quite confusing, and I honestly don’t know where to start” → A." },
      { id: "lz118", q: "What does the man suggest using for research?", opts: ["Social media blogs", "Class notes", "The library’s database", "A printed dictionary"], a: 2, ex: "Nam: “You should try using the university library’s online database” → C." },
      { id: "lz119", q: "How does the woman feel about group work?", opts: ["Excited", "Uninterested", "Confident", "Nervous"], a: 3, ex: "Nữ: “I’m also feeling a bit nervous about working in a group” → lo lắng (nervous) → D." },
      { id: "lz120", q: "What is the conversation mainly about?", opts: ["Preparing for a final exam", "Completing a university assignment", "Attending a career workshop", "Applying for a scholarship"], a: 1, ex: "Hai sinh viên trao đổi về cách tìm tài liệu và làm bài tập lớn (completing an assignment) → B." }
    ]
  },
  /* --- ZIM Sample Test Part 3 (3 bài giảng × 5 câu) --- */
  {
    gid: "lz6", part: 3, set: 2, official: false,
    title: "ZIM Talk 1: Maintaining a Healthy Lifestyle",
    script: [
      { v: 1, t: "Welcome, everyone. Today, we will focus on maintaining a healthy lifestyle in our busy modern world." },
      { v: 1, t: "A balanced diet, regular exercise, and managing stress are key to staying healthy. One of the most important aspects is healthy eating. Choosing natural, fresh foods over processed ones can make a significant difference. Processed food, while convenient, often contains unhealthy fats and added sugars, so it should only be consumed in moderation." },
      { v: 1, t: "Exercise is another critical factor. Aim to work out at least three times a week. Activities like brisk walking, swimming, or yoga can improve cardiovascular health and boost your mood." },
      { v: 1, t: "Staying hydrated is equally essential. Drinking plenty of water helps prevent dehydration, keeps your organs functioning well, and even improves your concentration." },
      { v: 1, t: "Lastly, my final advice is to maintain a balanced diet alongside regular exercise, hydration, and adequate rest to achieve optimal long-term health." }
    ],
    qs: [
      { id: "lz121", q: "What is the talk mainly about?", opts: ["Tips for healthy eating and lifestyle", "Training for a marathon", "Medical treatments for insomnia", "History of organic farming"], a: 0, ex: "Bài nói tập trung vào chế độ ăn cân bằng, tập luyện và uống đủ nước để giữ lối sống lành mạnh → A." },
      { id: "lz122", q: "What does the speaker say about processed food?", opts: ["It’s the best source of energy.", "It should be consumed in moderation.", "It should be eaten at every meal.", "It’s better than fresh food."], a: 1, ex: "“Processed food, while convenient... should only be consumed in moderation” → chỉ nên ăn điều độ → B." },
      { id: "lz123", q: "How often does the speaker recommend exercising?", opts: ["Every two hours", "At least three times a week", "Once a month", "Twice a year"], a: 1, ex: "“Aim to work out at least three times a week” → ít nhất 3 lần một tuần → B." },
      { id: "lz124", q: "Why is drinking water important for health according to the talk?", opts: ["It replaces all solid food.", "It prevents dehydration and keeps organs functioning well.", "It provides protein.", "It cures all illnesses immediately."], a: 1, ex: "“Drinking plenty of water helps prevent dehydration, keeps your organs functioning well” → B." },
      { id: "lz125", q: "What is the speaker’s final advice?", opts: ["Maintain a balanced diet with exercise and rest", "Avoid all carbohydrates", "Work late every night", "Take expensive supplements daily"], a: 0, ex: "“Lastly, my final advice is to maintain a balanced diet alongside regular exercise, hydration, and adequate rest” → A." }
    ]
  },
  {
    gid: "lz7", part: 3, set: 2, official: false,
    title: "ZIM Talk 2: Renewable Energy Sources & Challenges",
    script: [
      { v: 2, t: "Good morning! Today, we will discuss renewable energy sources and their importance in combating climate change." },
      { v: 2, t: "Renewable energy is a sustainable way to reduce our dependence on fossil fuels. It includes solar, wind, and hydropower. Solar energy, for example, is abundant and widely available. However, it requires proper infrastructure to store energy in regions with limited winter sunlight." },
      { v: 2, t: "Wind energy is eco-friendly and cost-effective once established. However, its unpredictability and dependency on specific geographic wind conditions can limit its use." },
      { v: 2, t: "One major challenge with renewable energy is its high initial installation costs. Governments and organizations must invest in research and development to make these technologies more affordable. To promote renewable energy, educating the public is key so people understand its long-term benefits." }
    ],
    qs: [
      { id: "lz126", q: "What is the lecture mainly about?", opts: ["Coal mining techniques", "Renewable energy sources and challenges", "Ocean shipping routes", "Automobile manufacturing"], a: 1, ex: "“Today, we will discuss renewable energy sources and their importance in combating climate change” → B." },
      { id: "lz127", q: "What does the speaker emphasize about solar energy?", opts: ["It is abundant and widely available.", "It produces toxic smoke.", "It only works at night.", "It is non-renewable."], a: 0, ex: "“Solar energy, for example, is abundant and widely available” → A." },
      { id: "lz128", q: "How does the speaker describe a limitation of wind energy?", opts: ["It pollutes the air.", "It is unpredictable and depends on geographic conditions.", "It uses too much coal.", "It is impossible to build."], a: 1, ex: "“However, its unpredictability and dependency on specific geographic wind conditions can limit its use” → B." },
      { id: "lz129", q: "What is mentioned as the biggest challenge for adopting renewable energy?", opts: ["High initial installation costs", "Lack of sunlight in summer", "Too many engineers", "Oversupply of batteries"], a: 0, ex: "“One major challenge with renewable energy is its high initial installation costs” → chi phí lắp đặt ban đầu cao → A." },
      { id: "lz130", q: "What does the speaker suggest is key for promoting renewable energy?", opts: ["Educating the public", "Increasing fossil fuel taxes tenfold", "Closing all universities", "Banning electricity use"], a: 0, ex: "“To promote renewable energy, educating the public is key” → giáo dục nâng cao nhận thức cộng đồng → A." }
    ]
  },
  {
    gid: "lz8", part: 3, set: 2, official: false,
    title: "ZIM Talk 3: Workplace Time Management & Communication",
    script: [
      { v: 1, t: "Hello, everyone. Let’s talk about time management and its role in workplace success." },
      { v: 1, t: "Effective time management is essential for boosting productivity and reducing stress. Many people think multitasking is a great habit, but multitasking actually reduces overall efficiency. Focusing on one task at a time ensures higher quality results and minimizes mistakes." },
      { v: 1, t: "Communication is another vital workplace skill. Practicing active listening helps you better understand your colleagues and build stronger professional relationships." },
      { v: 1, t: "Deadlines are critical for maintaining productivity. Sticking to them helps prioritize tasks and keeps the entire team on track. Finally, to manage workplace stress, remember to take regular short breaks and maintain open communication with your team." }
    ],
    qs: [
      { id: "lz131", q: "What is the main topic of the lecture?", opts: ["The importance of time management in workplace success", "How to design office furniture", "Accounting software for small businesses", "Writing job advertisements"], a: 0, ex: "“Let’s talk about time management and its role in workplace success” → A." },
      { id: "lz132", q: "What does the speaker say about multitasking?", opts: ["It doubles productivity.", "It reduces overall efficiency.", "It is required for all managers.", "It eliminates all mistakes."], a: 1, ex: "“Multitasking actually reduces overall efficiency. Focusing on one task at a time ensures higher quality results” → B." },
      { id: "lz133", q: "How can employees improve their communication skills?", opts: ["By talking louder than others", "By practicing active listening", "By using complicated jargon", "By avoiding team meetings"], a: 1, ex: "“Practicing active listening helps you better understand your colleagues” → rèn luyện kỹ năng lắng nghe chủ động → B." },
      { id: "lz134", q: "Why does the speaker mention deadlines?", opts: ["To stress their importance in prioritizing tasks and keeping teams on track", "To suggest they should be ignored", "To highlight their negative effects", "To recommend abolishing them"], a: 0, ex: "“Deadlines are critical for maintaining productivity. Sticking to them helps prioritize tasks...” → A." },
      { id: "lz135", q: "What is the speaker’s advice for managing workplace stress?", opts: ["Take regular breaks and communicate openly", "Work through the weekend", "Quit the job immediately", "Do three tasks at once"], a: 0, ex: "“To manage workplace stress, remember to take regular short breaks and maintain open communication” → A." }
    ]
  },
  /* --- PREP & FTU Listening Part 3 Lectures (Bộ đề 3) --- */
  {
    gid: "lp1", part: 3, set: 3, official: false,
    title: "PREP Talk 1: Digital Citizenship & Online Privacy",
    script: [
      { v: 2, t: "Good afternoon. Today's seminar explores the importance of digital citizenship in the twenty-first century." },
      { v: 2, t: "As we spend more of our lives connected to the internet, understanding our rights and responsibilities online is crucial. First, let's talk about online privacy. Many users assume their data is automatically protected, but in reality, users need to actively manage their privacy settings on every platform." },
      { v: 2, t: "Second, cyberbullying remains a serious issue. Rather than retaliating publicly, the most effective way to combat cyberbullying is reporting the abusive content to the platform and blocking the user immediately." },
      { v: 2, t: "Remember that every comment, photo, and share creates what we call a 'digital footprint'—the permanent record of one's online activities. My concluding advice to all students is simple: always think carefully before posting anything online." }
    ],
    qs: [
      { id: "lp101", q: "What is the talk mainly about?", opts: ["The hardware history of the internet", "The dangers of video games", "The importance of digital citizenship", "How to code a mobile app"], a: 2, ex: "“Today's seminar explores the importance of digital citizenship” → C." },
      { id: "lp102", q: "What does the speaker emphasize about online privacy?", opts: ["It is guaranteed automatically by all websites.", "It is less important for university students.", "Users need to actively manage their privacy settings.", "Personal information is never collected."], a: 2, ex: "“Users need to actively manage their privacy settings on every platform” → C." },
      { id: "lp103", q: "What is a suggested way to combat cyberbullying?", opts: ["Ignoring it for years", "Posting an angry public response", "Reporting the content and blocking the user", "Deleting your operating system"], a: 2, ex: "“The most effective way to combat cyberbullying is reporting the abusive content... and blocking the user” → C." },
      { id: "lp104", q: "According to the speaker, what is a 'digital footprint'?", opts: ["The total amount of electricity a computer uses", "The price of an internet subscription", "The permanent record of one's online activities", "The number of devices a person owns"], a: 2, ex: "“A 'digital footprint'—the permanent record of one's online activities” → hồ sơ lưu vết vĩnh viễn các hoạt động trực tuyến → C." },
      { id: "lp105", q: "What is the speaker's concluding advice?", opts: ["To throw away smartphones", "To think carefully before posting", "To use the same password everywhere", "To share all personal photos publicly"], a: 1, ex: "“My concluding advice to all students is simple: always think carefully before posting anything online” → B." }
    ]
  },
  {
    gid: "lp2", part: 3, set: 3, official: false,
    title: "PREP Talk 2: Roman Roads & Ancient Engineering",
    script: [
      { v: 1, t: "In today's history of engineering lecture, we're examining the remarkable role of Roman roads in the ancient world." },
      { v: 1, t: "What makes Roman roads stand out even to modern engineers is their incredible straightness and durability. Built with multiple layers of stone, gravel, and sand, they were designed to withstand centuries of heavy use and harsh weather." },
      { v: 1, t: "While merchants and travelers certainly used them, the Romans primarily built these roads for military and administrative purposes—specifically, for quickly moving troops and government officials across the vast empire." },
      { v: 1, t: "Alongside the roads, Roman engineers constructed stone arch bridges of such extraordinary quality that some of them are still in use today, more than two thousand years later." }
    ],
    qs: [
      { id: "lp106", q: "What is the lecture primarily discussing?", opts: ["Egyptian pyramids", "Greek temples", "Modern skyscrapers", "The role and engineering of Roman roads"], a: 3, ex: "“We're examining the remarkable role of Roman roads in the ancient world” → D." },
      { id: "lp107", q: "What characteristic of Roman roads is highlighted?", opts: ["Their wooden surfaces", "Their temporary nature", "Their incredible straightness and durability", "Their underground tunnels"], a: 2, ex: "“What makes Roman roads stand out... is their incredible straightness and durability” → độ thẳng và độ bền đáng kinh ngạc → C." },
      { id: "lp108", q: "How did the Romans primarily use their roads?", opts: ["For bicycle racing", "For growing crops", "For quickly moving troops and officials", "For storing water"], a: 2, ex: "“Primarily built these roads... for quickly moving troops and government officials” → di chuyển quân đội và quan chức nhanh chóng → C." },
      { id: "lp109", q: "What does the speaker mention about Roman bridges?", opts: ["They were all washed away in the Middle Ages.", "They were built entirely of bamboo.", "Some of them are still in use today.", "They relied on modern steel cables."], a: 2, ex: "“Roman engineers constructed stone arch bridges... that some of them are still in use today” → C." },
      { id: "lp110", q: "What is the overall tone of the lecture regarding Roman engineering?", opts: ["Critical", "Bored", "Admiring", "Dismissive"], a: 2, ex: "Giảng viên dùng các từ “remarkable”, “incredible straightness and durability”, “extraordinary quality” → ngưỡng mộ (admiring) → C." }
    ]
  }
];

/* ==========================================================
   BỔ SUNG NGÂN HÀNG ĐỀ VIẾT (WRITING TASKS 9 -> 14)
   Bóc tách từ PDF ĐH Ngoại Thương FTU, ZIM Academy & PREP Edu
   ========================================================== */
const EXTRA_WRITING = [
  {
    id: "w09", task: 1, official: true,
    type: "Thư điện tử — giới thiệu bạn sang London (Đề PDF FTU)",
    time: 20, target: 120,
    prompt: `You received an email from your English friend, Jane. She asked you for some information about one of your friends. Read part of her email below:

“Hi, how are things? I’ve just got an email from your friend, An. She said she’s going to take a course in London this summer. She asked if she could stay with my family until she could find an apartment near her school. Can you tell me a bit about her (things like her personality, hobbies and interests, and her current work or study if possible)? I want to see if she will fit in with my family before I reply to her email.”

Write an email responding to Jane. You should write at least 120 words. You do not need to include your name or addresses.`,
    checklist: [
      "Mở đầu thân mật hỏi thăm Jane (Dear Jane, It's lovely to hear from you...)",
      "Mô tả tính cách của An (friendly, tidy, considerate)",
      "Nêu sở thích của An (cooking Vietnamese food, reading, photography)",
      "Nêu công việc/việc học hiện tại của An (final-year student / marketing executive)",
      "Khẳng định An sẽ hòa nhập rất tốt với gia đình Jane và kết thư thân thiện"
    ],
    phrases: [
      "I am delighted to tell you more about An, as we have been close friends for five years.",
      "She is one of the most considerate, tidy, and cheerful people I know.",
      "Currently, she is a final-year student majoring in International Business.",
      "In her free time, she loves cooking traditional Vietnamese dishes and gardening.",
      "I am confident she will fit right in with your family."
    ],
    model: `Dear Jane,

It is lovely to hear from you! I am glad to hear that An has reached out to you about her upcoming summer course in London, and I would be happy to tell you more about her.

An and I have been close friends since high school. Personality-wise, she is warm-hearted, polite, and extremely tidy. She is always considerate of others, so you will never have to worry about noise or mess in the house.

Currently, An is working as a junior accountant at an international firm in Hanoi, and she is taking this short course in London to improve her business English. In her free time, she enjoys reading novels, playing acoustic guitar, and cooking. In fact, she makes wonderful Vietnamese spring rolls and pho, which I am sure your family will love trying!

Overall, An is a responsible and easy-going guest who gets along well with både children and elders. I have no doubt that she will fit in wonderfully with your family.

Please let me know if you need any other details. Give my warm regards to your parents!

Best wishes,`
  },
  {
    id: "w10", task: 2, official: true,
    type: "Luận văn — tác động của du lịch tới cộng đồng (Đề PDF FTU)",
    time: 40, target: 250,
    prompt: `Read the following text from a book about tourism:

“Tourism has become one of the fastest growing industries in the world. Millions of people today are travelling farther and farther throughout the year. Some people argue that the development of tourism has had negative effects on the different aspects of local communities; others think that its influences are positive.”

Write an essay to an educated reader to discuss the effects of tourism on local communities. Include reasons and any relevant examples to support your answer. You should write at least 250 words.`,
    checklist: [
      "Mở bài: giới thiệu sự bùng nổ của ngành du lịch + nêu mục đích thảo luận cả tác động tích cực và tiêu cực",
      "Thân bài 1 (Tích cực): tạo việc làm, tăng thu nhập cho người dân, thúc đẩy bảo tồn làng nghề/di sản",
      "Thân bài 2 (Tiêu cực): ô nhiễm môi trường, quá tải hạ tầng, thương mại hóa văn hóa bản địa",
      "Kết bài: khẳng định du lịch bền vững (sustainable tourism) là chìa khóa cân bằng lợi ích",
      "Đảm bảo ≥250 từ, dùng từ nối học thuật (On the one hand, On the other hand, Furthermore, In conclusion)"
    ],
    phrases: [
      "The rapid expansion of global tourism has transformed countless local communities.",
      "On the positive side, tourism serves as a vital engine for local economic growth.",
      "On the other hand, unchecked mass tourism can exact a heavy toll on the environment and local traditions.",
      "Traditional ceremonies risk being turned into commercial performances for visitors.",
      "In conclusion, while tourism bringsprosperity, sustainable management is essential."
    ],
    model: `In recent decades, tourism has grown into one of the largest industries worldwide, bringing millions of travellers to even the most remote corners of the globe. While this boom generates substantial economic rewards for host communities, it also introduces serious environmental and cultural challenges. This essay will examine both the positive and negative impacts of tourism on local residents.

On the one hand, tourism brings undeniable benefits to local economies and cultural preservation. First and foremost, the influx of visitors creates a wide range of job opportunities in hospitality, transport, and food services. In Vietnamese coastal towns such as Hoi An or Da Nang, thousands of families have improved their living standards by running homestays and local restaurants. Furthermore, revenue from entrance tickets and tourist spending provides local authorities with funds to upgrade roads, healthcare, and historic monuments, while reviving traditional handicrafts that might otherwise disappear.

On the other hand, rapid tourism development can negatively affect local life if left unmanaged. Environmentally, mass tourism often leads to plastic waste, water shortages, and damage to fragile ecosystems such as coral reefs and mountain trails. Socially and culturally, the cost of living—especially housing and food prices—frequently rises in popular tourist hubs, making life harder for native residents. Moreover, sacred local customs sometimes become commercialized spectacles staged merely to entertain holidaymakers.

In conclusion, tourism is a double-edged sword that enriches local economies while placing pressure on the environment and traditional lifestyles. To maximize its advantages and minimize its harm, governments and communities must promote sustainable tourism through visitor limits and strict environmental regulations.`
  },
  {
    id: "w11", task: 1, official: false,
    type: "Thư điện tử — chuyến cắm trại đảo Cát Bà (Đề ZIM)",
    time: 20, target: 120,
    prompt: `You live in Hanoi. Recently, you went on a camping trip to Cat Ba Island with your British friend named Alex. After returning to London, Alex sent you an email:

“I can’t stop thinking about the amazing time we had in Cat Ba! The camping trip was such a great experience, and I loved exploring the island with you. Did you have any trouble getting back to Hanoi? I’m thinking of planning another outdoor adventure this summer. What do you think? Do you have any ideas for a new place we could explore?”

Write a reply to Alex. In your email, you have to tell him that you enjoyed the trip and why, describe a challenge you faced during or after the camping trip, and suggest a location and time for your next adventure together. Write at least 120 words.`,
    checklist: [
      "Mở đầu hào hứng đáp lại email của Alex",
      "Chia sẻ vì sao bạn rất thích chuyến cắm trại ở Cát Bà (cảnh biển, chèo kayak, đốt lửa trại)",
      "Kể lại 1 khó khăn gặp phải (lạc đường mòn trong rừng quốc gia hoặc phà về đất liền bị trễ do mưa)",
      "Đề xuất địa điểm & thời gian cho chuyến đi tiếp theo (Vườn quốc gia Phong Nha - Kẻ Bàng vào mùa thu)",
      "Đủ ≥120 từ, ngôn ngữ thân mật tự nhiên"
    ],
    phrases: [
      "I also can’t stop thinking about our fantastic camping trip on Cat Ba Island.",
      "Kayaking through Lan Ha Bay at sunset was truly unforgettable.",
      "The only hiccup was on my way back to Hanoi when heavy rain delayed the ferry by two hours.",
      "For our next outdoor adventure, I would love to suggest Phong Nha-Ke Bang National Park.",
      "Late August or September would be the ideal time to go."
    ],
    model: `Hi Alex,

It is so great to hear from you! I am glad you made it back to London safely. Like you, I cannot stop thinking about our camping trip on Cat Ba Island. Kayaking through the limestone cliffs of Lan Ha Bay and roasting seafood by the campfire under the stars were truly unforgettable moments.

Getting back to Hanoi was mostly smooth, though I did face one small challenge at the ferry terminal. A sudden afternoon thunderstorm delayed the ferry for nearly two hours, and my backpack got slightly soaked on the bus ride home! Thankfully, all our camera gear stayed dry.

I love your idea of planning another outdoor adventure together! For our next trip, I would suggest heading to Phong Nha-Ke Bang National Park in central Vietnam. It is famous for its underground rivers, jungle trekking trails, and breathtaking caves. Late August would be the perfect time to visit because the weather is dry and pleasant for camping.

Let me know what you think of the idea. I cannot wait for our next adventure!

Best wishes,`
  },
  {
    id: "w12", task: 2, official: false,
    type: "Luận văn — tác động của đô thị hóa (Đề ZIM)",
    time: 40, target: 250,
    prompt: `Read the following text from an article about urbanization:

“Urbanization is increasing rapidly worldwide, with more people moving to cities than ever before. Some argue that this trend brings economic growth and development, while others believe it leads to overcrowded cities and environmental problems.”

Write an essay to an educated reader discussing the effects of urbanization on cities and their inhabitants. Include reasons and relevant examples to support your answer. You should write at least 250 words.`,
    checklist: [
      "Mở bài: paraphrase xu hướng đô thị hóa toàn cầu và nêu định hướng thảo luận 2 mặt",
      "Thân bài 1: Lợi ích kinh tế, việc làm, tiếp cận y tế và giáo dục chất lượng cao",
      "Thân bài 2: Hệ lụy quá tải hạ tầng, tắc đường, giá nhà đắt đỏ và ô nhiễm không khí",
      "Kết bài: Tóm tắt 2 mặt và nhấn mạnh vai trò của quy hoạch đô thị xanh",
      "Đạt ≥250 từ, lập luận mạch lạc kèm ví dụ thực tế"
    ],
    phrases: [
      "Urbanization has reshaped the demographic landscape of the modern world.",
      "On the positive side, metropolitan centers act as catalysts for economic innovation.",
      "Residents in major cities benefit from superior healthcare, education, and career prospects.",
      "Conversely, rapid urban expansion places immense strain on housing and public transport.",
      "Sustainable urban planning is essential to ensure livable cities for future generations."
    ],
    model: `Urbanization, the rapid movement of populations from rural areas to urban centers, has become a defining global trend of the twenty-first century. While this shift drives remarkable economic growth and modernization, it also creates severe challenges regarding overcrowding and environmental quality. This essay will examine both the positive and negative impacts of urbanization on cities and their residents.

On the one hand, urbanization brings substantial economic and social benefits. When businesses, universities, and skilled workers concentrate in metropolitan areas, they generate high productivity and innovation. For residents, moving to a major city such as Hanoi or Ho Chi Minh City opens doors to better-paying jobs, advanced healthcare facilities, and diverse educational opportunities that are rarely available in the countryside. Furthermore, high population density allows governments to build public infrastructure—such as metro lines, libraries, and hospitals—more cost-effectively per capita.

On the other hand, unplanned urban growth imposes heavy burdens on both infrastructure and the environment. As millions of migrants arrive each year, housing becomes scarce and expensive, forcing many low-income workers into cramped apartments with poor sanitation. Daily traffic congestion wastes millones of productive hours and releases massive quantities of exhaust fumes, leading to hazardous air quality and urban heat islands. In addition, green spaces and natural lakes are frequently replaced by concrete high-rises, increasing the risk of severe urban flooding during the rainy season.

In conclusion, while urbanization serves as a powerful engine for economic prosperity and higher living standards, it simultaneously threatens urban livability through congestion and pollution. Therefore, city authorities must invest in satellite towns, public transit, and green spaces to achieve balanced development.`
  },
  {
    id: "w13", task: 1, official: false,
    type: "Thư điện tử — hội thảo công nghệ AI tại Singapore (Đề PREP)",
    time: 20, target: 120,
    prompt: `You live in Ho Chi Minh City. Recently, you participated in a technology workshop in Singapore with your colleague named Michael. After returning, Michael sent you an email:

“The Singapore workshop was a great experience, and I learned so much about the new AI tools. I hope you had a good flight back to Ho Chi Minh City. Did you manage to implement any of the tools we discussed? I'm thinking of proposing another professional development event later this year. What kind of event do you think would be most useful for our team?”

Write a reply to Michael. In your email, you have to:
1. Tell him that you learned a lot from the workshop and mention one specific thing you learned.
2. Describe one difficulty you faced while trying to implement the new AI tools.
3. Suggest a type of future professional development event and explain why it would be useful.`,
    checklist: [
      "Chào Michael và cảm ơn lời hỏi thăm chuyến bay về TP.HCM",
      "Nêu 1 kiến thức tâm đắc học được từ hội thảo Singapore (ví dụ: tự động hóa báo cáo dữ liệu bằng AI)",
      "Mô tả 1 khó khăn khi áp dụng thực tế (nhân viên chưa quen viết câu lệnh prompt hoặc vấn đề bảo mật dữ liệu)",
      "Đề xuất 1 sự kiện đào tạo tiếp theo (workshop thực hành Bảo mật dữ liệu & Kỹ năng Prompt Engineering nội bộ)",
      "Đảm bảo ≥120 từ, giọng văn đồng nghiệp chuyên nghiệp, thân thiện"
    ],
    phrases: [
      "My flight back to Ho Chi Minh City was very smooth, thank you for asking.",
      "The session on automating customer support workflows with AI was particularly eye-opening.",
      "However, we ran into a small hurdle regarding data privacy compliance when integrating the tool.",
      "For our next event, I suggest organizing a hands-on workshop on cybersecurity and prompt engineering.",
      "Looking forward to collaborating with you on the proposal."
    ],
    model: `Dear Michael,

Many thanks for your email! My flight back to Ho Chi Minh City was very smooth, and it was a pleasure attending the Singapore technology workshop with you last week.

I genuinely learned a great deal from the event. The session on using generative AI to automate weekly data reporting was particularly eye-opening, and it gave me several practical ideas to speed up our department's workflow.

Over the past few days, I tried introducing the new AI summarization tool to our team. However, we faced one main difficulty: several team members found it challenging to write precise prompts, so the initial outputs required a lot of manual editing. In addition, our IT security team asked us to verify how client data is stored before we use it on real projects.

Because of this, I think the most useful professional development event later this year would be a two-day hands-on training course on "AI Data Security and Practical Prompt Engineering." It would help our staff use these tools both safely and effectively.

Let me know what you think so we can draft the proposal together!

Best regards,`
  },
  {
    id: "w14", task: 2, official: false,
    type: "Luận văn — toàn cầu hóa kinh tế và văn hóa (Đề PREP)",
    time: 40, target: 250,
    prompt: `Read the following text from an article about globalization:

“Globalization, the increasing interconnectedness of the world's economies and cultures, has brought unprecedented opportunities for trade and communication. However, it also raises concerns about cultural homogenization and economic inequality.”

Write an essay to an educated reader discussing the advantages and disadvantages of globalization on societies and their people. Include reasons and relevant examples to support your answer. You should write at least 250 words.`,
    checklist: [
      "Mở bài: định nghĩa toàn cầu hóa và nêu rõ bài viết phân tích cả lợi ích lẫn thách thức",
      "Thân bài 1 (Ưu điểm): mở rộng thương mại quốc tế, thu hút đầu tư FDI, giao lưu văn hóa & tri thức",
      "Thân bài 2 (Nhược điểm): nguy cơ mai một bản sắc văn hóa địa phương (cultural homogenization) và chênh lệch giàu nghèo",
      "Kết bài: khẳng định cần hội nhập chủ động nhưng giữ gìn bản sắc dân tộc",
      "Đạt ≥250 từ, sử dụng từ vựng học thuật B2/C1"
    ],
    phrases: [
      "Globalization has woven the world's economies and cultures into an closely connected network.",
      "From an economic perspective, free trade and foreign investment have lifted millions out of poverty.",
      "Nevertheless, critics rightly point out the risk of cultural homogenization.",
      "Local traditions and minority languages may be overshadowed by dominant global media.",
      "In conclusion, nations should embrace global integration while actively safeguarding their cultural heritage."
    ],
    model: `Globalization, defined as the growing interdependence of world economies, cultures, and populations, has reshaped modern society over the past few decades. While this phenomenon has unlocked remarkable opportunities for economic development and cross-cultural exchange, it has also sparked valid concerns regarding cultural loss and inequality. This essay will discuss both the advantages and disadvantages of globalization.

On the positive side, globalization acts as a powerful catalyst for economic prosperity and knowledge sharing. By lowering trade barriers and attracting foreign direct investment, developing nations such as Vietnam have integrated into global supply chains, creating millions of jobs in manufacturing and technology. Consumers around the world now enjoy access to a wider variety of affordable goods, medical innovations, and educational resources. Furthermore, instant international communication fosters cultural understanding and global cooperation on shared challenges like climate change and pandemic response.

On the negative side, globalization carries significant cultural and socioeconomic drawbacks. One major concern is cultural homogenization: as global fast-food chains, Hollywood movies, and international fashion brands dominate the market, unique local customs, traditional crafts, and indigenous languages risk fading away among younger generations. Economically, the benefits of globalization are not always distributed equally. Multinational corporations often outcompete small local businesses, and workers in traditional sectors may lose their livelihoods when factories relocate in search of cheaper labor.

In conclusion, globalization brings immense economic growth and global connectivity, yet it simultaneously threatens cultural diversity and small local enterprises. To reap its full benefits, governments should support domestic businesses and promote cultural education so that societies can modernize without losing their unique identity.`
  }
];

/* ==========================================================
   BỔ SUNG NGÂN HÀNG ĐỀ NÓI (SPEAKING P1, P2, P3)
   Bóc tách từ PDF ĐH Ngoại Thương FTU, ZIM Academy & PREP Edu
   ========================================================== */
const EXTRA_SPEAKING_P1 = [
  {
    id: "s15", official: true,
    topic: "Free time & Neighborhood — Thời gian rảnh & Khu phố (Đề PDF FTU)",
    questions: [
      "What do you often do in your free time?",
      "Do you watch TV? If yes, which TV channel do you like best and why?",
      "Can you tell me something about your neighborhood and what you like most about it?"
    ],
    sample: `In my free time, I usually unwind by reading non-fiction books, going for an evening jog around the local lake, or cooking dinner for my family. I don't watch traditional television very much nowadays because I prefer on-demand streaming, but when I do turn on the TV, my favourite channel is VTV7, the national educational channel, because its documentaries about science and history are really well-produced. As for my neighborhood, I live in a quiet residential area on the outskirts of Hanoi. What I love most about it is the friendly community spirit and the tree-lined streets—there is a small morning market just five minutes from my house where everyone knows each other by name.`,
    tip: "Đề thi thật luôn ghép 2 chủ đề ngắn trong Part 1 (mỗi chủ đề 3 câu). Hãy chuyển ý mượt mà và đưa chi tiết cụ thể (tên kênh VTV7, khu phố có hồ nước/chợ sáng)."
  },
  {
    id: "s16", official: false,
    topic: "Books & Reading Habits — Sách & Thói quen đọc (Đề PREP)",
    questions: [
      "Do you enjoy reading books? Why or why not?",
      "Do you prefer reading physical paper books or e-books?",
      "Do you think people today read less than they did in the past?"
    ],
    sample: `Yes, I'm an avid reader because books allow me to step into different worlds and learn from the experiences of others while reducing my daily stress. Between physical books and e-books, I still prefer paper books, especially before bed, because holding a real book and turning the pages helps me disconnect from digital screens and notifications. Regarding whether people read less today, I think people actually read more words than ever on smartphones and social media, but they read fewer long-form books because short videos have shortened our attention spans.`,
    tip: "Khi gặp câu hỏi 'Do you think people today...?', hãy phân biệt giữa việc đọc tin ngắn trên mạng và đọc sách chuyên sâu để câu trả lời đạt điểm Lexical Resource cao."
  }
];

const EXTRA_SPEAKING_P2 = [
  {
    id: "s24", official: true,
    topic: "Chuyến đi Đà Nẵng ra Hà Nội — Trip from Danang to Hanoi (Đề PDF FTU)",
    situation: "A group of people is planning a trip from Danang to Hanoi. Three means of transport are suggested: by train, by plane, and by coach. Which means of transport do you think is the best choice?",
    points: [
      "Mở đầu: Nêu bối cảnh chuyến đi nhóm từ Đà Nẵng ra Hà Nội (~750 km)",
      "Phân tích 3 phương án: Máy bay (nhanh nhưng đắt/cần ra sân bay sớm), Xe khách coach (rẻ nhưng mệt và kém an toàn hơn), Tàu hỏa train (ngắm cảnh đẹp đèo Hải Vân, có khoang giường nằm 4–6 người trò chuyện vui vẻ, giá hợp lý)",
      "Chốt phương án tốt nhất cho một nhóm bạn (Tàu hỏa hoặc Máy bay) và bảo vệ lập trường"
    ],
    sample: `Well, planning a group trip from Danang to Hanoi—which is nearly 800 kilometres—requires balancing time, budget, and the group experience. Let me weigh the three options. Travelling by coach is the cheapest choice, but sitting on a highway bus for fourteen hours is exhausting and leaves everyone too tired to enjoy the trip. Flying by plane is undoubtedly the fastest, taking just over an hour, yet airfares for a large group can be quite costly, and airport security splits people up. Therefore, for a group of friends, I believe travelling by overnight train is the best choice. First, sharing a four-berth sleeper cabin allows the whole group to chat, play card games, and admire the breathtaking coastal scenery along Hai Van Pass together. Second, an overnight train saves one night of hotel accommodation and arrives right in the centre of Hanoi the next morning. All things considered, the train turns the journey itself into a memorable part of the holiday.`,
    tip: "Đề chính thức của ĐH Ngoại Thương: Hãy nhấn mạnh yếu tố 'a group of people' — tàu hỏa có khoang riêng cho cả nhóm vừa trò chuyện gắn kết vừa ngắm cảnh đèo Hải Vân."
  },
  {
    id: "s25", official: false,
    topic: "Hoạt động gắn kết nhóm — Team-Building Event (Đề ZIM)",
    situation: "A group of colleagues is planning to organize a team-building event. They are considering three types of activities: a cooking competition, a sports day, and a quiz game. Which activity do you think would be the most enjoyable and beneficial for the team?",
    points: [
      "So sánh mức độ hòa nhập (inclusivity) của 3 hoạt động đối với nhân viên văn phòng",
      "Chỉ ra hạn chế của Sports day (người thể lực yếu ngại tham gia) và Cooking competition (người không biết nấu ăn dễ căng thẳng)",
      "Chọn Quiz game (hoặc Cooking) vì ai cũng tham gia được, gắn kết trí tuệ và lồng ghép được văn hóa công ty"
    ],
    sample: `In my opinion, the most enjoyable and beneficial activity for a company team-building event would be the quiz game. While all three options have their merits, a quiz game offers the best balance of inclusivity and collaboration. Firstly, unlike a sports day—which can be physically demanding and might make less athletic or older colleagues feel left out—a quiz game allows everyone of all fitness levels to participate equally. Secondly, compared to a cooking competition, which can be stressful for those who rarely cook and requires expensive kitchen facilities, a quiz game is easy to organize indoors. Moreover, we can customize the quiz rounds to include fun facts about our colleagues and company history, which acts as a fantastic ice-breaker for new staff. For these reasons, the quiz game is definitely the most inclusive and effective choice.`,
    tip: "Sử dụng từ khóa 'inclusive' (hòa nhập cho mọi thành viên) là luận điểm rất mạnh trong mọi đề thảo luận hoạt động tập thể."
  },
  {
    id: "s26", official: false,
    topic: "Tăng doanh số hiệu sách sinh viên — Student Bookstore (Đề PREP)",
    situation: "You are the manager of a small student bookstore. The store is experiencing a noticeable drop in sales. You and your staff are considering three options to attract more customers: (1) Introduce a permanent student discount, (2) Organize weekly book clubs and author signing events, or (3) Expand the product range to include stationery and coffee.",
    points: [
      "Phân tích nguyên nhân sinh viên ít đến hiệu sách truyền thống (do mua sách online)",
      "Đánh giá 3 lựa chọn về mặt doanh thu bền vững và sức hút không gian",
      "Chọn phương án 3 (kết hợp cà phê & văn phòng phẩm) hoặc phương án 2 để biến hiệu sách thành không gian học tập"
    ],
    sample: `As the manager of a student bookstore facing declining sales, I would choose the third option: expanding our product range to include stationery and a small coffee corner. Let me compare the three possibilities. Offering a permanent student discount might attract bargain hunters in the short term, but it cuts directly into our narrow profit margins and still cannot compete with giant online retailers. Organizing weekly book clubs and author signings is wonderful for community building, yet it only brings in crowds once a week and requires significant marketing effort. By contrast, adding a coffee bar and stationery transforms the bookstore into a daily study hub. University students are always looking for a quiet, inspiring place to study between classes. When they come in for a cup of coffee and notebooks, they will naturally browse the shelves and buy books on impulse. Therefore, combining books with coffee and stationery is the most sustainable way to boost both foot traffic and revenue.`,
    tip: "Với đề kinh doanh/quản lý, hãy dùng các cụm từ B2 như 'profit margins' (biên lợi nhuận), 'foot traffic' (lưu lượng khách ghé qua), 'sustainable revenue' (doanh thu bền vững)."
  }
];

const EXTRA_SPEAKING_P3 = [
  {
    id: "s34", official: true,
    topic: "Reading habits among teenagers — Khuyến khích đọc sách ở giới trẻ (Đề PDF FTU)",
    mindmap: {
      center: "Encouraging teenagers to read",
      branches: ["Broaden knowledge & vocabulary", "Improve concentration & empathy", "Reduce screen time", "Your own idea"]
    },
    followups: [
      "What is the difference between the kinds of books read by your parents’ generation and those read by your generation?",
      "Do you think that governments should provide free books for all people?",
      "In what way can parents help children develop their interest in reading?"
    ],
    sample: `I strongly agree that reading habits should be actively encouraged among teenagers for several vital reasons. First and foremost, reading broadens young people's knowledge and vocabulary far more systematically than fragmented social media posts. Secondly, reading long chapters trains deep concentration and empathy, as teenagers learn to see the world through the eyes of diverse characters. Thirdly, picking up a book in the evening reduces excessive screen time, protecting adolescents from digital eye strain and sleep disruption. As my own additional idea, reading fosters independent critical thinking, helping teenagers evaluate information rather than passively accepting online trends.

Regarding the follow-up questions: my parents' generation mostly read classic literature and printed newspapers, whereas my generation reads a wider mix of self-help, science fiction, and digital articles. I do think governments should fund free public libraries and mobile book buses for rural areas rather than giving free books to everyone. Finally, parents can nurture a love of reading by setting an example themselves and reading bedtime stories to their children from an early age.`,
    tip: "Đề chính thức trong PDF ĐH Ngoại Thương: Hãy trả lời trọn vẹn phần Mindmap (4 nhánh) trong 2 phút đầu, sau đó trả lời ngắn gọn 3 câu hỏi thảo luận của giám khảo."
  },
  {
    id: "s35", official: false,
    topic: "The Impact of Social Media on Modern Life — Mạng xã hội (Đề PREP)",
    mindmap: {
      center: "Impact of Social Media",
      branches: ["Global communication", "Business & marketing", "Information sharing", "Your own idea"]
    },
    followups: [
      "Do you think the benefits of social media outweigh the risks? Why?",
      "In what ways has social media changed how people get their news?",
      "How can parents help teenagers use social media responsibly?"
    ],
    sample: `Today I would like to talk about the profound impact of social media on modern life. Firstly, in terms of communication, platforms like Facebook and Zalo allow us to stay connected with friends and family across the globe instantly at zero cost. Secondly, for business and marketing, social media has leveled the playing field: even a small home-based shop can reach thousands of targeted customers through short videos and livestreaming. Thirdly, it facilitates rapid information sharing, allowing citizens to stay updated on breaking news and educational content. However, as my own idea, we must also recognize its psychological downside: constant social comparison online can trigger anxiety and fear of missing out among young users.

In my view, the benefits outweigh the risks only when we use social media mindfully. It has made news consumption much faster and more interactive, though people must be careful of fake news. Parents can guide teenagers by agreeing on screen-free family meals and teaching them how to verify online sources.`,
    tip: "Ở nhánh 'Your own idea', việc bổ sung một góc nhìn phản biện (như áp lực tâm lý / tin giả) giúp bài nói Part 3 đạt điểm cao ở tiêu chí chiều sâu lập luận."
  }
];

/* ==========================================================
   DANH SÁCH 6 BỘ ĐỀ VSTEP HOÀN CHỈNH (DÙNG CHO PHÒNG THI CBT & THƯ VIỆN ĐỀ)
   ========================================================== */
const VSTEP_EXAM_SETS = [
  {
    id: "exam1",
    code: "Đề 01",
    name: "Đề mẫu Bộ GD&ĐT (PDF ĐH Đồng Tháp)",
    source: "VSTEP Sample Test Level 3-5 (QĐ 730/QĐ-BGDĐT — PDF ĐH Đồng Tháp)",
    badge: "Đề gốc Bộ GD&ĐT",
    readingSetIndex: 0,
    listeningSet: 1,
    w1Id: "w01",
    w2Id: "w06",
    s1Id: "s11",
    s2Id: "s21",
    s3Id: "s31"
  },
  {
    id: "exam2",
    code: "Đề 02",
    name: "Đề minh họa ĐH Ngoại Thương (PDF FTU / ĐH Cần Thơ)",
    source: "PDF Đề minh họa VSTEP 4 kỹ năng — ĐH Ngoại Thương (vstep.ftu.edu.vn)",
    badge: "Đề PDF ĐH Ngoại Thương",
    readingSetIndex: 1,
    listeningSet: 1,
    w1Id: "w09",
    w2Id: "w10",
    s1Id: "s15",
    s2Id: "s24",
    s3Id: "s34"
  },
  {
    id: "exam3",
    code: "Đề 03",
    name: "Bộ đề EVSTEP Test 1 & ZIM Listening",
    source: "Hệ thống luyện thi EVSTEP (vstep-elearning.edu.vn) & ZIM Academy",
    badge: "Đề thực chiến 03",
    readingSetIndex: 2,
    listeningSet: 2,
    w1Id: "w11",
    w2Id: "w12",
    s1Id: "s12",
    s2Id: "s25",
    s3Id: "s33"
  },
  {
    id: "exam4",
    code: "Đề 04",
    name: "Bộ đề EVSTEP Test 2 & Học thuật mở rộng",
    source: "Hệ thống luyện thi EVSTEP (vstep-elearning.edu.vn)",
    badge: "Đề thực chiến 04",
    readingSetIndex: 3,
    listeningSet: 3,
    w1Id: "w02",
    w2Id: "w07",
    s1Id: "s13",
    s2Id: "s22",
    s3Id: "s32"
  },
  {
    id: "exam5",
    code: "Đề 05",
    name: "Bộ đề Ngoại Ngữ Vivian (B1-B2-C1)",
    source: "Ngoại Ngữ Vivian (vivian.edu.vn — Có giải thích chuyên sâu)",
    badge: "Đề thực chiến 05",
    readingSetIndex: 4,
    listeningSet: 2,
    w1Id: "w04",
    w2Id: "w08",
    s1Id: "s14",
    s2Id: "s23",
    s3Id: "s31"
  },
  {
    id: "exam6",
    code: "Đề 06",
    name: "Bộ đề ZIM Academy & PREP Edu",
    source: "ZIM Academy (zim.vn) & PREP Edu (prepedu.com)",
    badge: "Đề thực chiến 06",
    readingSetIndex: 5,
    listeningSet: 3,
    w1Id: "w13",
    w2Id: "w14",
    s1Id: "s16",
    s2Id: "s26",
    s3Id: "s35"
  }
];

/* ==========================================================
   TỰ ĐỘNG HỢP NHẤT VÀO CÁC NGÂN HÀNG DỮ LIỆU CỦA ỨNG DỤNG
   ========================================================== */
const ALL_READING_SETS = [
  {
    id: "rset1",
    title: "Đề số 01: Đề mẫu Bộ GD&ĐT (PDF ĐH Đồng Tháp)",
    source: "VSTEP Sample Test Level 3-5 (QĐ 730/QĐ-BGDĐT — PDF ĐH Đồng Tháp)",
    passages: READING_OFFICIAL.map(p => ({
      title: p.title,
      body: p.body,
      questions: p.questions.map(q => ({
        n: q.n,
        q: q.q,
        opts: q.opts,
        a: ["A", "B", "C", "D"].indexOf(READING_OFFICIAL_KEY[String(q.n)]),
        ex: READING_OFFICIAL_EX[String(q.n)]
      }))
    }))
  },
  ...EXTRA_READING_SETS
];

/* Gán nhãn bộ đề 1 cho các bài nghe mặc định và nối thêm bộ đề nghe 2 & 3 */
LISTENING.forEach(g => { if(!g.set) g.set = 1; });
LISTENING.push(...EXTRA_LISTENING);

/* Nối thêm đề Viết và đề Nói mới */
WRITING.push(...EXTRA_WRITING);
SPEAKING_P1.push(...EXTRA_SPEAKING_P1);
SPEAKING_P2.push(...EXTRA_SPEAKING_P2);
SPEAKING_P3.push(...EXTRA_SPEAKING_P3);
