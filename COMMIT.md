Show activeTab and activeSubTab working in render
1. YEY so yeah I created a new state, activeSubTab, which is basically an object, with three keys, each key representing the options for activeTab
2. Basically, activeSubTab will host 3 values, one value per activeTab, so that if a user switches between activeTab options, the previous activeSubTab will not be lost if a user returns to that parent activeTab
3. Idunno if that makes sense lol but basically this allows for nested tabs, and retainment of previously active inner tabs
4. To test, I just have it displayed in plain text in Header.tsx, and I change the values in the initialization to see it actively changing in the UI