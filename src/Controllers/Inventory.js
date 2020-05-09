class Inventory {
  items;
  capacity;
  constructor(items = [], capacity = 7) {
    this.items = items;
    this.capacity = capacity;
    this.container = document.querySelector(".inventory");
  }

  addItem = item => {
    if (this.items.length < this.capacity) {
      this.items.push(item);
      this.redraw();
    }
  };

  redraw = () => {
    for (let i = 0; i < this.items.length; i++) {
      while (this.container.children[i].firstChild) {
        this.container.children[i].removeChild(
          this.container.children[i].firstChild
        );
      }
      const oldChild = this.container.children[i];
      const newChild = oldChild.cloneNode(true);
      this.container.replaceChild(newChild, oldChild);
      const event = new CustomEvent("toggleEquip", {
        detail: {
          toggleEquip: player => {
            player.toggleEquip(this.items[i]);
          },
          item: this.items[i]
        }
      });
      this.container.children[i].addEventListener(
        "click",
        () => {
          window.dispatchEvent(event);
        },
        {
          once: true
        }
      );
      const image = new Image();
      image.src = this.items[i].image;
      this.container.children[i].appendChild(image);
      if (this.items[i].getEquipped()) {
        this.container.children[i].style.backgroundColor =
          "rgba(51, 35, 188, 0.57)";
      } else {
        this.container.children[i].style.backgroundColor = "transparent";
      }
    }
  };
}

export default Inventory;
