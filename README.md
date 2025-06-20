# persn-adulting_101_v2

hey. I'm making this money-tracking app, with the primary focus of planning future expenses and forecasting financial goals. like we're talking as long-term as what happens to me and my money on retirement and even on death. I call it adulting 101. now I already have a chat with you about this but its' becoming real slow to chat with you there now, so i figured i'll do another chat. I'm building it right now with React.js with SASS, and the DB is right now a bunch of CSVs lol. there's not even CRUD yet within the UI, it's all read-only from the CSVs. if any data edits are needed, I do it straight in the CSVs. I just want the DB to be so easily manipulated both in terms of data but also even the structure while not affecting the front-end so much for now. this also makes editing the front-end easier especially as I'm trying to figure out the UX despite a figma prototype I already have sorta ready

now the app is default on a calendar view, where each date is a box with transaction cards inside. each date will show the "change" amount, which is the difference of income and expenses for that day, and also the running total amount. right now it's in a monthly view, but I inevitably want it so that you can view it weekly, and annually. 

besides this calendar view, you should also be able to see a "table view" of all transactions, listed in ascending order of dates. the eventual idea is that you can CRUD the transactions here, and that you will have a manual and/or automated way of prioritizing the order of transactions

I'll elaborate further on that later, but that part I think is what makes this app a powerhouse. the eventual use case is this:
1. you tell the app your non-negotiable recurring expenses, such as rent, utilities, etc
2. you tell the app your flexible non-negotiables recurring expenses, such as groceries, where you can set minimum and ideal limits each instance
3. you also tell the app your goals, such as hitting a set amount of savings, or settling a debt, or saving up for a big expense
4. you can also tell the app a minimum amount of "buffer" money that you want, which means whatever happens, the running total must never go below that, which of course can be overridden in the direst of circumstances
5. with all that set, you should now be able to tell the app when you have a sudden expense that needs to be taken care of, and the app will automatically adjust the numbers by calculating your priorities all so you can manage the new expense, while trying to ensure the buffer isn't hit, the other priorities higher than the new expense is not hit, the non-negotiables aren't hit, and if any goals are affected, such as a savings goal now being delayed, you should be notified
6. the idea here is, the app should be able to understand what your priorities are, and be capable of recommending when best to commit to certain expenses and how your goals are affected

this whole prioritization model is what's gonna totally supercharge the app as not just a tracking tool, but an intelligent automated assistant that just runs on a set of user-imposed rules aka priority structures

tell me you understand then I'll tell you more

awesome. very beautifully put. just to add to that, we also want this to be a tool where you can map out "scenarios". scenarios are simply the instance of whatever data set or "plan" you have right now setup with the platform, including your set preferences, goals, and any one time expenses. what that means is, users can clone their current default scenario, which we'll call "Now"

for "Now", the user set their actual current & expected income and expenses, and even their goals for the future up to retirement at age 60 and projected death at 90. BUT, the user now wants to know, what if they quit their job earlier? they should then clone "Now" and create a new scenario called "Retire at 45". in the app, user should be able to see that their savings, as they're currently set, is only gonna last them until they're 76. so, knowing this, they can then adjust SO many things with "Retire at 45" with the goal of making this scenario work. they can choose to strive for bigger income, lesser monthly expenses, less retirement withdrawals, and if all else fail and are too improbable, they can adjust the retirement age goal accordingly

the point is, this app should be their future calculator. this is what users will go to to fully and confidently satiate their financial what ifs. at least for me, if this eventually becomes fully working as I imagine it, this will either affirm that I am on the right track in my life, my current and expected income and expenses as well as my financial goals, OR, this will show me in sheer numbers that something has to change if I am to reach my goals. either way, this'll help me reach my goals, or at least show me why I'm not gonna get there

especially when making some of the biggest life decisions, this app should be the go-to consultant that I would like to always have by my side to tell me how a decision will impact my future and goals. should I move to a bigger but more expensive rented apartment? when can I afford the dream house we want priced 5 million pesos? should I get a brand new car, or settle with a cheaper second-hand one knowing I'll sell it to upgrade anyways? should I lend my friend the money he's asking for? should I take this job offer that's gonna take me to another country where expenses are this much? how long before I can afford that dream guitar if I choose to buy that dream drum set first? and as a follow-up to all those questions above, how does all that affect my goals, my retirement, my target financial independence and peace?

tell me you understand, then I'll explain more

alright I absolutely love that. you nailed it in the head. the term "life simulation engine" is soo so so good.

onto the meat. what I will eventually need your help with is thinking that prioritization model through, cuz I need it to be absolutely robust. I want to be giving you scenarios, and I need you to be throwing me what ifs, follow up questions, edge cases, etc. I need you to hit me hard with the harshest of criticism if an idea isn't worth pursuing. capiche?

tell me you understand and i'll tell you more