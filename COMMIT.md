understood DateCard row rendering
1. aight I get it now
2. basically, this is just a simple loop ish thing
3. it's a loop that runs as long as rowIndex is less than 6, and rowIndex starts at 6 and increments 1 per run
4. the goal of each run is to find rowDates, which is the next 7 DateCards in the allDates queue
  4.1. we do allDates.slice(start, end), with start being rowIndex * 7, and end being start + 7
  4.2. so for example, for the first row, we will get allDates.slice(0, 7), getting the first 7 DateCards in allDates
  4.3. then, the 2nd row will get allDates.slice(7, 14), getting the next 7 DateCards, and so on
5. each rowDates is then mapped, each DateCard being rendered until all 7 per rowDates has run out
6. cleverclever