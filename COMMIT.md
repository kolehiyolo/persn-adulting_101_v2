Set default values for ModalAddAccount > accountData
1. YOOOO alright so now, ModalAddAccount sets default values for the accountData properties, which, at the minimum, will pass all the type requirements that the lists need to properly show an account
2. It also accepts changes to the name and balances via the GUI form, so that's a cool little unintentional thing I didn't really plan on but came with GPT's sample code for using react-modal
3. I am having quite the trouble, though, with setting the default value, in that I'm not sure if the code knows when I want the accountData to be reset, which is for every opening of ModalAddAccount
  3.1. The problem stems from the fact that ModalAddAccount is mounted at App load, not when isOpen is triggered
  3.2. That of course introduces stupid issues, such as the fact that it sometimes breaks when some props are not yet ready at mount, such as defaultCurrency or activeSubTab
  3.3. I will have to refactor this, and I'm adding it to the TODO so I don't forget