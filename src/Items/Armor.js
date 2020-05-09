import Item from "./Item";

import armorImage from "~/assets/inventory/armor.png";

class Helmet extends Item {
  equipped = false;
  constructor() {
    super();
    this.image = armorImage;
    this.type = "armor";
    this.id = "basic_armor";
    this.bonus = 15;
  }
}

export default Helmet;
