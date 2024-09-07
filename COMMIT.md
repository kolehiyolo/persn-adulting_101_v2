ModalCustomizeIcon working
1. Alright so I went beyond just ModalAddAccount mounts ModalCustomizeIcon
2. It's working now, which is awesome, but I had to figure out why submitting ModalCustomizeIcon submits ModalAddAccount too
3. There were also some mishaps with massing the IconStyle values in ModalCustomizeIcon to ModalAddAccount, and vice versa, and also the fact that ModalCustomizeIcon doesn't reset the values when ModalAddAccount is submitted, although ModalAddAccount's IconStyle are clearly reset
4. Honestly, my brain is barely working so I'll just commit without explaining exactly what I did, and I even recognize that the code for both files is MESSYYY, so I think I'll do some major refactoring later