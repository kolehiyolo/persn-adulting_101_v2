ModalCustomizeIcon files ready
1. Alright so I have a new modal setup, and I already even wrote the code for it, but I can't test it yet so we'll see if it's perfect
2. It doesn't render the icon and color options yet dynamically, and now I just have 3 predefined values as options just for dummy
3. It is theoretically working, though, where it expects iconStyle as input, to be passed by its parent, and then it will update the iconStyle properties (icon_id and color) on submit
  3.1. When I get to mounting this via ModalAddAccount, I have to make sure to create the iconStyle state, which is then what's gonna be passed as input
4. I want there to be a preview of what the icon looks like while the user is picking the icons and the colors, and when trying to mount BoxIcon, I realized the props dependencies for BoxIcon is trash, in that it expects accountData and icon_name when it should be just icon_id and color
  4.1. Before everything else, I think should fix this, which will ruffle some feathers for sure