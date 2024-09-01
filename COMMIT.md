Rendered dummyDUMMY data
1. Alright so while my dummy data is quite ready, I had to first make sure the UI is capable of rendering in the first place
2. I created a subcomponent DivAccountsList() that expects an accounts array, which then renders each item into an <li>, simple
3. The problem is, apparently TypeScript is incredibly finicky when it comes to props management, so I had to do this big shebang of type-declaring the array, and each account's properties
4. This was a nice refresher, for sure, for TypeScript, and of course ChatGPT claims that this type-safety is good for DX, and I can imagine it, sure, but yeah seeing how much boilerplate is needed to make even just this one little functionality to work is kinda bonkers lol
5. Then again, I recognize that the benefits of TypeScript can only come at scale, so we'll see how this goes as we code more
6. As this was too big a step, I decided to not even make the component fetch the actual dummy data CSV, but instead declare an in-script dummyDUMMY array