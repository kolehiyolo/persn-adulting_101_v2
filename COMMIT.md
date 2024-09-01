Add progress bar to accounts with goals
1. AWESOME yeah got myself circular progress bars
2. So I used react-circular-progressbar, which is so straightforward in its tooling
3. I created DivCircularProgress as a component, and it receives percentage as props, which then will determine the color of the elements depending on a value range
4. Also updated BoxAccountsItem as before, the progress bar goes below the info instead of to the right of it