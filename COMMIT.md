Compartmentalized BoxAccountsItem
1. Alright so cool I reworked each Accounts item to be its own component
  1.1. In the process, I realized that I also have to declare the Account type there, which I feel is too redundant, knowing full well I will be using the exact same type across the site
  1.2. As per GPT-kun's suggestion I decided to use a types.ts where I explicitly declare all types I will be using, at least non-react-state types (types for the useState set-state functions, I can't declare here)
  1.3. I imagine this as nothing more than a client-side schema, same as what I did with MongoDB+Mongoose on the server-side
2. Updated App.tsx so that the default route is /accounts, for now, as that's what I'm working on right now
3. Updated public/manifest.json, removing the image/png declarations, as I removed those files and Chrome is throwing errors because of that
  3.1. Might revert later, of course, but for now it's just clutter