addAccount() actually adds to CSV
1. Yooo so it's been a while since I touched this project, and we got a banger commit here
2. So finally, addAccount() actually adds to the CSV
3. Some changes have to be done to overhaul the existing non-permanent adding system
  3.1. First off, apparently there's no way to update a CSV straight from the client and only one-way get requests can be done, so I had to set up a bare-bones Node.js+Express server
    3.1.1. Created server.js, a data folder copy of the one in client/public/, and of course account.route.js, which for now only handles two requests, the fetch all and add one routes
  3.2. Changed the type interface for Account in types.ts to reflect the newly added deleted property, and updated the default values for the newAccount in ModalAddAccount() 
  3.3. Created addAccountToCSV() in PageAccounts() triggered on the highest-level form submit
4. Now since the updating of the CSV is done on the server-side, which means the CSV must be in the server, it only made sense that the CSV within the folder should be what the client is fetching and displaying, so I made it so that App.tsx calls the server route instead of fetching the client version of the CSV