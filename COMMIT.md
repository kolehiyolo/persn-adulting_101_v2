ModalAddAccount handles some inputs
1. Okay so yeah now I can input values for name, description, balance, type, and goal
2. I organized the HTML, nesting the input within the labels, and grouping the buttons within a <div>
3. I then added type, description, and goal fields, with goal only showing if type=funds
4. I had to fix some stuff to make the whole thing work, as there were some bugs
  4.1. On submit, the goal is being overriden to 10000 if the type is funds
  4.2. The problem with type is, it's set to 'regular' by default, so what happens is, when the Modal is triggered from the Debts or Funds subtab, it's the type-selector field is automatically set to 'regular' instead of the active subtab
    4.2.1. With that, I finally had to set the type so that by default, it is set to whatever the active subtab is, but since it doesn't work on mount, I had it so that if activeSubTab is undefiend, set the value to 'regular', then just change once activeSubTab is defined
    4.2.2. I then got to remove the on submit type declaration, which takes the activeSubTab value, because sometimes, even if I open the modal in Debts, I should have the power to change the type to the other 2
5. Some of the properties I don't need to create inputs for, namely the id, date, time, archived, order, and tag, since those already have default values
6. Currency is a big one that I can't do yet, or rather would rather not do, since it seems complex to have to do, not to mention it's not needed for my personal use case, for now
7. The next step is to enable customizing the icon_id and color values, and that's a big challenge, I know, since the original 1Money implementation is having a separate modal for this, but yeah I definitely need to do it if we're gonna complete this Add Account functionality