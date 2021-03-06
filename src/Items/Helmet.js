import Item from "./Item";

import helmetImage from "~/assets/inventory/helmet.png";

class Helmet extends Item {
  equipped = false;
  constructor() {
    super();
    this.image = helmetImage;
    this.type = "helmet";
    this.id = "basic_helmet";
    this.bonus = 15;
  }
}

export default Helmet;
