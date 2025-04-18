CalendarMonth begun refactoring
1. on my way to making runningTotal work, I ended up realizing that I need to refactor CalendarMonth's processing as a whole
  1.1. I believe rendering is okay, might need some tweaking, but mostly solid and just need cleaning
2. changes done
  2.1. I've now grouped the codeblocks as I did with the other components
  2.2. turned the component functional
  2.3. DateObject turned to DateData
  2.4. DateData moved to types.ts as a global interface
  2.5. moved getMonthName() inside the component as an internal helper function
3. now, I do the rendering

