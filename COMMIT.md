DateCard rows now fill space properly
1. alright so there's a bunch of small changes across multiple files that were required to make this work
2. the key is to make most, if not all elements go flex-grow:1, which triggers sorta the Figma equivalent of "height/width: fill"
3. I had to do this on App, Main, CalendarMonth, row, and DateCard
4. I then had to set some preliminary styling for CalendarMonth, which I will have to recheck later and refactor HEAVILY
5. another thing needed doing is making it so that calendarMonth body displays 6 rows, each row containing 7 DateCrads, instead of calendarMonth body containing 42 DateCards that wrap to the next line to simulate 6 rows with 7 DateCards each
  5.1. this makes it a lot easier for me to control each DateCard's positioning in the x-y axis, and mass control each's dimensions
6. I have not taken a strong look at what GPT did to make this work, but I wanna go commit now before I do a review of it and possibly change it to fit my conventions