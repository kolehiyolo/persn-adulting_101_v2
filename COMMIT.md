Fix BoxIcon so it only needs color and icon_name
1. Alright so now BoxIcon needs color and icon_name, instead of account and icon_name
  1.1. I said in the previous commit that it should be color and icon_id, and I realized the icon_id is not a good idea since it forces BoxIcon to still find the source file name of the icon via the ID over the iconsData, which is excessive to do per icon
  1.2. Instead, it will only get the color and the name, and whatever mounts BoxIcon should already have the name ready based on the icon_id
2. I altered BoxAccountsItem, which is the first to use BoxIcon, and it was a very easy change
3. I also even went ahead and mounted BoxIcon in ModalCustomizeIcon, and I had to add another state iconName and the function to find it from iconsData to handle the prop dependency of BoxIcon