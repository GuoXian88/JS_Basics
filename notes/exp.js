/*第二面
这是总监面，跟第一面一样，问的问题都是开放性问题，主要看重你是如何解决问题的，看你的思维方式是怎么发散的。比如面试官问我，你为什么觉得你做的产品就比别人好？你为什么要对你们的产品进行性能优化，主要瓶颈在哪里？你是通过什么方式进行优化？你优化的点是怎么考虑的？你在使用第三方服务是处于什么目的，你对它的评价是什么，它们给你带来的好处是什么？如果让你去思考如何更好的为开发者提供服务，你觉得还有什么东西是开发者需要的？你对开发工具类产品感兴趣吗？可以从这些问题看出，面试官并不仅仅看重你的技术能力，还有你对产品的认识。第一面的时候，面试官就谈到说:

我们想找一个比较全面的人，考虑的问题层次不只是说产品某个方面不合理，而是能够推动某个产品的诞生，对产品提出有用的意见。

其实我平时都有关注大公司的技术分享，在面试过程中我就有提到我是如何参考大厂里面的大牛如何解决问题的，并根据他们的实践来完善我们的产品。这两面，有很多细节没有谈到，可以看到面试官想找的人不仅仅要你在技术上有亮点，还有其他方面能吸引到他们，比如面试官在我简历看到我经常写博客，问我出于什么样的目的去写东西，从什么时候开始坚持的，并说这是一个很吸引人的地方。

第三面
顺利通过前面两关，第二个星期进入第三面。这一次面对的是腾讯的部门经理，是一位中年大叔，在腾讯干了十几年技术，跟他交谈的过程中，他给我的感觉都是很平静的。他拿到我的简历，稍微看了一下，就说：挑一个你最熟悉的项目讲讲吧。然后我就说了我是怎么从0到1对项目进行开发和改造的，比如刚开始架构非常混乱，代码结构也不清楚，我是重构了整个项目，并按功能进行分包。然后又问了我是如何进行优化的，在Android中适配是一个很麻烦的问题，你又是怎么做的？这部分我的回答是，尽量不要写死，布局能做到自适应就做到自适应，比如说字体的采用sp，间距采用dp的单位。一般我们都会上传到云测进行机型适配，看反馈的结果，然后再做调整，毕竟要适配所有机型几乎是不可能的事情。然后又问了我怎么做性能优化的问题，我就回答一种是UI上的优化，比如减少过度绘制，不必要嵌套布局，利用include标签来复用控件等等；一种是内存优化，主要通过一些工具检查是否有内存泄露，用一些优化比较好的图片加载框架来按需加载图片，减少内存的消耗。后面就问我有什么要问题，基本上每一轮面试最后都会让你问问题，这一轮我问了关于团队有多少人；当初是怎么把腾讯bugly组建起来的这些需求是从哪里来的；同事们之间的关系怎么样等等。最后，面试官面完之后，就说给我安排HR进入下一轮面试，到了这里我内心其实是很激动的，因为技术面终于结束了，不过HR还是有可能把我刷掉，所以就平复了一下心情进入第四面。

第四面
到了这一轮，基本上你离offer不远了，因为HR很少刷人，除非HR觉得你人品有问题，小巫人品还算不错，所以这一关我很有信心哈。HR问的问题我前面有写过一篇文章，基本上问问题的套路跟这篇文章一样，可以去看看：

求职面试-HR会问什么问题

其实这一面可以说是跟HR之间的博弈，你为什么要离开公司？你在上一家公司负责什么？你是如何跟同事进行交流的？你是如何在一个公司保持自己技术上的更新？你技术上成长最快的是什么时候，为什么？如果你跟产品经理撕逼，如何解决你跟他/她的冲突？你有女朋友么，如果你过来深圳，她怎么办？等等。因为这一关HR是会根据你的回答进行评分的，所以还是得认真对待，尽量展现你个人的能力，规避掉自己的一些缺点，这一关也就没什么大的问题了。

最后
过了几天之后，我就收到HR的口头offer，第二天正式收到offer，刚好那天是我的生日，感觉就像做梦一样。说一下我这次面试腾讯的感受吧，面试官都很友好，问的问题都挺专业。因为我面的是社招岗位，所以不会像招实习生那样考察你的基础，面试官更看重你的工作经验和思维方式，因为这是没办法准备的，经验是你在实际工作中踩坑并填坑所得到的，而像算法、数据结构这些是可以花时间准备，这对有经验的人意义不大。面试过程中，如果你能做到不卑不亢，保持自信的话，你基本已经成功一大半了，你要做的是全面展示你的实力，这样面试官才可能认可你。说到思维方式的锻炼，要给大家安利一个进阶的好地方 stay4it.com 有心课堂。小巫也有在学的。它不仅仅是告诉你需求如何实现，还会教你如何分析，如何选择解决方案以及为什么要这样来实现。让你从每天的复制粘贴，盲目的debug中解放出来，找到解决问题的本质。相信你会有很大的收获。基本上，腾讯的面试经历就这样了，虽然我最终拿到了offer，但觉得有运气的成分在。如果大家还有什么想了解的，可以直接给我留言，我看到会及时回复，最后，感谢大家的阅读。

作者：IT_xiao小巫
链接：https://www.jianshu.com/p/c002b8e7dbce
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

最大的挑战
最快成长
处理冲突 
https://wenku.baidu.com/view/63827f926429647d27284b73f242336c1eb930f0.html

你对我们公司有什么了解？

 

   如果你在这次面试中没有被录用，你会怎么办?

 

   如果你被我们录取了，接下来你将如何开展工作？

 

   你怎么理解你应聘的职位？

 

   你有哪些缺点？
   审美和一般人不太一样
   代码洁癖
   知识的广度，扩展知识面
   说自己喜欢做事讲效率，喜欢雷厉风行，但有时候可能会有些急躁

   五种缺点，帮你提高面试成功率 

    1、我对我认为不对的人或事，容易提出不同意见，导致经常得罪人。这虽然是缺点，但是说明你比较有主见，有一定的原则性； 

    2、我办事比较急，准确性有时不够。这虽然是缺点，但是说明你完成工作速度较快； 

    3、我不太善于过多的交际，尤其是和陌生人交往有一定的难度。这虽然是缺点，但是说明你交友慎重； 

    4、我办事比较死板，有时容易和人较真。这虽然是缺点，但是说明你比较遵守单位既定的工作规范，有一定的原则性； 

    5、对自己从事工作存在的困难，自己琢磨的多，向同事或领导请教的少。这虽然是缺点，但是说明你独立完成工作任务的能力较强。

    1、我脾气太急，具体表现在：①我打心眼里不喜欢磨洋工的人，总想尽快完成工作;②遇到干活投机取巧的人，我常常会不给人家面子，大家说我是“太平洋警察”;③工作要是干不好，我就会跟自己过不去，自寻烦恼。点评：表面上是自责性子急的毛病，其实是在说自己雷厉风行、工作有责任心，老板都喜欢这种员工。2、我很固执，有时过于主观，具体表现在：①我的观点总跟别人不太一样，而且不喜欢被人牵着鼻子走;②犟得像头牛，别人想说服我可不容易，除非能拿出令人信服的证据和事实。点评：在这里，“固执”是“有主见”的代名词，“主观武断”亦是“果敢有魄力”的变相表达。有这些“缺点”的员工，能不受上司的青睐吗?3、我比较粗线条，不拘小节，具体表现在：①我做事大方向一般不错，但细节上有点丢三拉四，处理不好琐碎的事;②不熟悉我的人开始都不太愿意跟我合作，以为我只会指挥不会做事，但熟悉我之后，就会常常向我讨教思路了。点评：大方向不错，基本上可以算优秀，如果再以“小节”来要求，未免有些太苛刻。这实际上是在暗示对方：我是一个做“头”的料!4、我生来胆小、怕羞，没见过大世面，具体表现在：①违法乱纪的事我想都不敢想，跟在别人后面参与也不敢;②我从没见过什么大领导，人多时应付不了，只能干些具体、细碎的工作;③我比较怕别人说我的坏话，尤其是说我工作做得不好。点评：对会计、文秘、保管等岗位来说，胆小怕事不是缺点，而是领导信任的基础。用这样的人，领导比较放心。5、有人说我抠门儿，用钱太吝啬，具体表现在：①我上学时管理班费，同学们说我管钱太死，我知道花的不是自己的钱，却总也改不了;②家里经济条件不太宽裕，所以我比较节俭，用钱都按计划来，不轻易打乱计划。
第三，说出缺点后应该谈谈你正在或将要如何改进这个缺点。既然能够认识到自身的不足，那么积极改变它就是面试官非常乐见的正面态度。“我有时候觉得把任务布置给别人，比自己直接做完更花时间精力。我觉得这样做不太合适，因为现实中很多项目不是像计算题一样非一即二的，加入多个人的想法可以做得更好。我正在积极地改进这一方面，比如我这学期领导/参与了xxx学生组织的活动/课上的项目作业，blah blah blah”这样不但显示了你(1)能认识自己，(2)能完善自己，还可以谈一个面试官没来得及问起的活动或项目。

作者：纸比尔
链接：https://www.zhihu.com/question/20887129/answer/16539714
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
以下直接给出该怎样回答这个问题：1、你当然应该了解自己的缺点，而且，你应该常备两三个缺点，以便在不同的面试里使用。可供参考的答案是：根据以往经验（这句话很重要，会显得你有理有据）a) 在同一时间，我只擅长专注于做一件事，如果手里同时有几件事，我会变得低效；b) 当同时处理几件事的时候，我曾过于专注在特别紧急，但未必最重要的事情上（或反之）；c) 我更擅长做跟人打交道、需要沟通和交流的工作，不擅长需要深度思考的研究型工作（或反之）；

作者：NakedTruth
链接：https://www.zhihu.com/question/20887129/answer/104572185
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

 

   你有哪些主要的优点？

 

   你的好朋友是如何评价你的？

 

   你与上司意见不一致时，该怎么办？

 

   你能说说你的家庭吗？

 

   你认为自己最适合做什么？

 

   你如何看待公司的加班现象？

 

   你的业余爱好是什么？

 

   你和别人发生过争执吗？你怎样解决？
作为这个团队的其中一员，虽然和上司在某些问题上产生了分歧，但是大家最终的目标都是能够更出色地完成任务。意见不一致，可能是思考问题的角度和沟通方式上出了问题。我不会急于去和上司辩论，而是先站在上司的角度去考虑问题，毕竟上司比我有着更丰富的实战经验，是站在大局、宏观的角度考虑问题。 　　回答准备：1、反思自己的沟通方式;2、寻求同事的意见和支持;3、如果涉及公司重大事情和利益，会越级汇报。 　　回答准备：请熟读并理解世界第一CEO的杰克?韦尔奇的话先问自己为什么他为人如此古怪?是他本性如此，还是只给你穿小鞋?甚至只是因为你看不惯任何上级?要找到真正的问题所在。如果你对上司还不错，自己身上也找不到特别的问题，那就只能去找他面谈，了解他是怎么想的。最后问自己一个问题：我为什么留在这里工作呢?是因为你热爱工作内容，还是因为有一群志同道合的朋友?这些是否值得你用糟糕的上司来换取?如果觉得不值得，就制订个退出计划;如果决定留下来，就不要把糟糕的上司看得那么重，他不是工作的全部，更不是生活的全部。
 

   你如何面对压力？


Write it for other humans
Write code for a junior developer who will come to fix issues in your code 2 years from now. This means:

Choose better variable and function names
Explain why(not what) the code does what it does using inline comments
Write better commit messages
Have a README with installation guidelines and coding guidelines
Treat documentation as an integral part of code base that needs constant review and refactoring
Write your codebase as it will be managed by an idiot in future, because eventually, it may be.

PS: Optimising code for machines is important too, but try to abstract that from fellow homo-sapiens.

Write test cases
The best products I’ve worked with have had test coverages between 85–95%. It clearly looks like a big commitment, specially when you’re an indie developer.

It’s not possible to test everything, but at least write test cases for the parts that are likely to fail or change over time.

Writing unit or integration test sometime seems like an expensive affair, but at the end of the day they are always cheaper than fixing issues making it to production.

Stick with your tools
It takes considerable work before you get comfortable with your tools (ex IDE). It takes even more work to make a tool part of your subconscious.

Surprisingly large number of developers change their tools, languages, frameworks on a very frequent basis. I am not against getting the experience of working with all these tools, but I am surely against switching these on a very regular basis.

It’s doesn’t have to be a marriage between you and your tools, but you shouldn’t be having too many one night stands as well. Settle down for some time, kid!

Deploy it!
I’ve lost count of projects that never saw daylight. Most developers have two amazing personality traits:

Perfectionist: The part that doesn’t let you launch anything short of perfect
Procrastinator: That doesn’t let you make anything perfect Don’t let these traits take over and stop you from launching even if you don’t have a good product. Don’t let your dream app die in a private git repo!
Defend your best practices
If the doctor washes his hands before doing your examination, that is considered normal (in fact, a good practice).

But if a developer wants to write test cases before writing actual code, many employers/clients find it weird.

Each trade have some good practices that should be followed religiously. Sometimes being a great salesman is the pathway for being a great programmer. Sell your best practices!

Your client/employer may not know about the best practices in tech. It’s YOUR responsibility to educate them and, if required, even tell them what may happen if you don’t follow the best practices. (It’s ok to scare them with an historical example or two).

Learn a new programming language
Learn a new language every year. If you can use it for work, Awesome! If not, that’s ok. A new language won’t just give you an additional skill, it will also give you new ways to think.

For example, coming from Java and C++ background, it took me some time to digest the fact that we can run a program in PHP without a main function.

After working on PHP-Apache based urls (e.g. home.php), Python’s way of implementing routes and URIs was almost a shock for me.

Learning a new language will help you question the standards in your current language.

Call to action
If you could change one thing about your programming practices, what will it be? Change that. NOW.


1 -- Learn to split large complex goals into small, simpler ones.


Making coffee for four people as specified is the overall goal in this example. However, you can't just "make coffee" as if it was one single action. As anybody who knows how to make coffee could tell you, you need to divide the work into separate smaller tasks. Each of them needs to be simple enough to be easy to tackle at once.

Here is a list of tasks that needs to be done to make the coffee as specified by the main goal:



The ability to split work into tasks is natural to humans, and a required skill to get most things done. Making the above list doesn't require any particular study or practice other than knowing how to make coffee. In other words, more or less anyone can do it.

However, the difference between a practical everyday problem like making coffee and a more complex challenge like software building is that the steps to build software are rarely heavily rehearsed. To be able to list what tasks are necessary to build a particular piece of software requires having done it many times before. That is not very common in software building. That's why experienced software engineers don't jump immediately to writing a task list. Instead, they split the overall problem into more straightforward ones.

Engineers refer to the problems to resolve as the "what," and as the tasks to accomplish as the "how." In the coffee making example, the list of subgoals (the what) could be crafted as follows.

Subgoals:
We have cups ready to be filled.
We have enough ground coffee.
The coffee maker is full of water.
We have a filter filled with ground coffee. This subgoal requires subgoal #2 to be completed.
The filter full of coffee is inside the coffee maker. This subgoal requires #4 to be completed.
The coffee maker is brewing the coffee; requires #3 and #5 to be done.
The coffee maker is done brewing; requires #6 to be done, and enough time to have passed.
We have cups filled with coffee; requires #7 and #1 to be done.
The cream was added to two of the cups; requires #1 to be completed.
Sugar was added to one of the cups with the cream, and one of the cups without cream; requires #1 and #9 to be completed.
The content of each cup is stirred and well mixed; requires #8, #9 and #10 to be completed.
Note how these are not descriptions of tasks or actions. They are descriptions of results that need to be obtained and their dependencies.

A graphical representation can be crafted to visualize the list above. Boxes represent subgoals, and incoming arrows into each box represent requirements to be satisfied for the subgoal to be achievable:



In the case of coffee making it is tempting to just write a list of tasks. That works only for simple problems that you know how to resolve without much planning. However, in software building that is rarely the case.

Planning subgoals allows us to abstract results from actions, and that is a critical difference. For example, subgoal #4, "we have a filter filled with ground coffee," might require going to the store to buy the filter. What matters in a subgoal is the result that needs to be achieved. The "what" is the important abstraction, while the "how" is a tactical choice that depends on the context (i.e., do you have filters or do you need to buy them?)

2 -- Learn to think parallel.


The subgoals presented above could be done one at the time, sequentially, in the order listed. However, that would not be optimal. The dependencies give us a clue on how what needs to be done in a specific order and what doesn't.

For example, you can start grinding the coffee beans first, and while the electric grinder is doing its job, you can fill the coffee maker with water. That's because filling the coffee maker with water doesn't require having the ground coffee ready. Also, grinding the coffee beans only requires to start the grinder, the rest of the time we'd be waiting for the grinder to finish. If the grinder were manual and kept you busy, that'd be a different story.

Moreover, while you are waiting for the coffee maker to brew, you can get the cups out of the cabinet. In fact, nothing depends on the cups to be ready until we need to start pouring ingredients into them.

You can also pour the cream and the sugar in the empty cups, even before the coffee is done. Doing that has the effect of making stirring unnecessary; if you pour lots of hot coffee in cups already containing a little cream and sugar, the coffee ingredients mix naturally eliminating the need to stir. On the other hand, if you pour a little sugar or cream in a cup full of coffee, you need to stir to obtain a homogeneous mix.

Reordering Tasks
Reordering the tasks with the intent of maximizing parallel execution saves time and eliminates one of the steps. The final list of tasks, in the optimal order, is:

Fill the electric grinder with coffee beans, and start it.
While the grinder is doing its job, fill the coffee maker with water.
When the grinder is done, put the ground coffee in the filter.
Put the filter in the coffee maker.
Start the coffee maker.
While the coffee is brewing, get four cups out of the cabinet.
Put cream in two coffee cups.
Put sugar in one coffee cup without cream and in one with cream.
Wait for the coffee to finish to brew.
Pour coffee into each of the coffee cups.
Or, represented as a sequence diagram (click on it to expand):

[

Note how the ordering of tasks doesn't affect the list of subgoals. It depends on it, and it's guided by it, but it doesn't change it. Tasks that are not dependent can be re-ordered in whatever way; that allows to maximize parallelism of execution.

Additionally, thinking about the subgoals first can be done without having to decide how to accomplish any of them. That further splits the overall problem into smaller ones that can be tackled in isolation.

3 -- Learn to abstract, but don't over-abstract.


The goal of making coffee as specified is narrow and prescriptive. If the problem changes and you now have five people instead of 4, and somebody wants vanilla syrup in their coffee, and one person wants decaf, the list of subgoals and tasks would have to be re-designed.

Programmers learn to design solutions so that they don't have to be re-designed every time that some of the parameters change. They learn to abstract problems in ways that allow a solution to resolve any class of problems similar to the original one.

Abstracting Coffee Making
In the coffee example, you might want to abstract the subgoals to account for any number N of people, instead of a fixed 4. You might also want to introduce an abstraction for things like cream and sugar. You might call it "extras." The list could change over time to include syrup, nutmeg, foam, eggnog, vodka or whatever people like to put in their coffee. Such abstraction could allow for any number X of extras that can be added in whatever amount in each of the cups.

Another abstraction could be the type of coffee. Caffeinated and decaf are two obvious ones, but there could be more, like a bold roast, medium roast, light roast, Colombian, breakfast blend, etc.

Since the coffee maker can only brew a type of coffee at the time, you can see how this complicates things substantially. If some of the four people in the original problem asked for caffeinated and others asked for decaf, the requirement of serving the coffee to all of them at the same time and as hot as possible would get complicated to pull off. At that point, you need to abstract away the concept of how many coffee makers you have --- up to Y if you have Y coffee varieties. Also, the parallelism of the operations, if you have Y coffee makers independently running, can become tricky. At that point, a developer might want to consider abstracting the number of baristas. If you have K baristas working together, how does the whole thing change?

Abstracting Some More
At that point, you might realize that coffee is just another ingredient of a beverage, so why make it unique? You could decide that coffee is one of the extras, and eliminate the whole specialized idea of coffee. However, coffee requires special handling and preparation, so maybe all extras should allow for generic special handling and preparation. For example, if eggnog is one of the extras, there could be a whole flow to describe the making of eggnog. But, at that point, you could abstract preparation of anything, and eggnog would merely be another product that you can create.

Over-Engineering
Does your head hurt yet? Welcome inside the twisted world of over-engineering. Do you see how quickly abstractions complicate the picture if you push them too far? We started from one type of coffee, four people to be served, a fixed configuration of extras and one barista. That was easy and natural. If you try to abstract every aspect of making coffee and if you are contemplating the possibility of having N people to serve, X types of extras, Y coffee varieties, K baristas... now that gets complicated, especially if you want to optimize cost and speed of the operation. You quickly go from making coffee to making any product under the sun using any process possible. Ouch.

An idealistic software engineer will try to abstract everything and will end up with a complicated machinery that is most likely planned to be used only to make coffee for a family of four people. An experienced software engineer, however, will abstract things to be able to resolve essential use cases and might consider other possible abstractions, but only to make sure that present decisions don't block future needs.

Balance
When do you stop abstracting? That is an art that experience refines. The rule of thumb is that you should abstract only use cases that you think will be required shortly, and try not to block future abstractions with narrow decisions.

4 -- Learn to Consider Re-Using Existing Solutions


No need to re-invent the wheel.

Not everything has to be re-invented from scratch. Experienced developers always consider using tools that are already available before they start designing a solution from scratch.

For example, instead of making coffee, can you go out and buy it from Starbucks and bring it to your four friends? If you don't have cups, coffee, and a coffee maker, going to Starbucks is a far cheaper and faster solution, especially if you don't plan to make coffee every day for a long time.

Finding and re-using solutions that are ready to go is part of the problem-solving skills a developer needs to acquire.

5 -- Learn to Think in Terms of Data Flows.


After years of practice, experienced developers start thinking of software, and problem-solving in terms of data flows through a system. In the coffee making problem, think of it as a flow of water, coffee, cups and extras from their sources all the way to the destination.

Water starts from the faucet; coffee comes from a bag that you have in your pantry --- the grocery store before that --- cups from your cupboard and the extras come from different sources depending what they are.

These materials (data) flow through a series of steps that manipulate, transform and mix. The initial state is the raw resources located wherever they are stored, and the final state is a series of cups filled with coffee plus extras. The destination is somebody's mouth.

Thinking in terms of data flows allow to visualize the primary goal and its subgoals as a series of boxes and arrows. The boxes represent each action that affects the materials flowing in the system, and the arrows are like pipes where the materials flow through.



