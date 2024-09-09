Dynamic icon and color options
1. YOOOO alright so now I have the icons and color options dynamically rendered
2. I had to do some very minor styling changes, namely making the 2 fields be in a column instead of a row, since the color options are significantly less than the icon options, so in a horizontal layout, it looks imbalanced
3. The icon thing was very straightforward, so no problems there
  3.1. Of course the selection of icons themselves is not exactly great, so we'll revisit that later
4. As for the colors, it's a very interesting situation
  4.1. I asked ChatGPT for some color selections, considering that the color will be used as background to a white vector icon, and most of the colors are great
  4.2. The problem is, some of them are too similar to each other, some of them are straight up duplicates, and some of them are not compatible with white after all
  4.3. To fix this, I thought about making them easier to sort, and the best way to do that is by having it in HSL instead of hex, so I can sort by hue first and foremost
  4.4. To test the colors and how the white icon matches, however, I had to use BoxIcon, and BoxIcon only accepts hex colors
  4.5. So, I had a convertHSLToHex() ready to convert the HSL to hex
  4.6. Now, I want to dive deep into sorting the colors via CSV, removing duplicates, colors that are too similar, and colors that don't work with white, and then I will have GPT add more