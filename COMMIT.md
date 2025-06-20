FIXED FormSearchTotal isn't working in some cases
1. I got sidetracked fixing this instead
2. I managed to find the bug, and it's caused by the ff:
  2.1. triggerOnUpdateOfPrcsdCalendarDatesData
  2.2. this originally was to run AFTER triggerOnUserChangingActiveDateOrActiveUser, which means when the user changes activeDate or activeUser with the GUI, triggerOnUserChangingActiveDateOrActiveUser happens, then this
  2.3. the problem was, there's this warning showing with that original setup:
    "React Hook useEffect has a missing dependency: 'activeDate'. Either include it or remove the dependency array.eslintreact-hooks/exhaustive-deps"
  2.4. so, I added activeDate as dependency, but that's what's breaking this
  2.5. what happens is the trigger takes in prcsdCalDates and activeDate and then derives "currentMonthData" from that to use, since we just want the data for the actual month, not our 42 day "render "month
  2.6. that means prcsdCalDates and activeDate must have valid values
  2.7. but or some reason, whenever activeDate is changed and it trips this trigger, by the time the inner processes run, prcsdCalDates is deemed empty
  2.8. triggerOnUserChangingActiveDateOrActiveUser is the one responsible for filling in prcsdCalDates with the new data, but since this trigger also runs simultaneous as triggerOnUserChangingActiveDateOrActiveUser does, maybe that's why prcsdCalDates is deemed empty
  2.9. the solution then is, this trigger should only run AFTER prcsdCalDates is updated, instead of running when activeDate is updated, which is runs the other trigger simultaneous
3. TLDR, the error is possibly due to bad chaining