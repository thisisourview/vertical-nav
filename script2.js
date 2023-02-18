(function () {
    const template = document.createElement("template");
    template.innerHTML = `
  
  <style>
  
  :host {
  display: none;
  }
  .vertical-nav {
    position: fixed;
    display: flex;
    justify-content: left;
    top: 0;
    height: 100%;
    writing-mode: vertical-rl;
      z-index: 10000;
  }
  
  
  a:-webkit-any-link {
  text-decoration: none;
  }
  
 
  ::slotted(*) {
  display: inline-block
  position: relative;
  border: 1px solid transparent;
  }
  ::slotted(a:not(first-of-type)) {
    margin-top: 20px;
  }
  
  ::slotted(*:hover){
      border-left: 1px solid black;
  }
  
  .left {
  left: 5%;
  }
  
  .right {
  right: 5%;
  }
  @media(min-width:768px) {
    :host {
    display: block;
    }
}
  
  </style>
  <div class="vertical-nav">
  <slot></slot></div>
  `;
  
    class VerticalNav extends HTMLElement {
      static get observedAttributes() {
        return ["side"];
      }
  
      get side() {
        return this.hasAttribute("side");
      }
  
      set side(val) {
        if (val) {
          this.setAttribute("side", val);
          console.log(val);
        } else {
          this.removeAttribute("side");
        }
      }
  
      get textColor() {
        return this.hasAttribute("textColor");
      }
  
      set textColor(val) {
        if (val) {
          this.setAttribute("textColor", val);
        } else {
          this.removeAttribute("textColor");
        }
      }
  
      checkSide() {
        var side = this.getAttribute("side");
        var element = this.shadowRoot.querySelector(".vertical-nav");
  
        if (side === "left") {
          element.classList.add("left");
        } else if (side === "right") {
          element.classList.add("right");
        }
      }
  
      checkTextColor() {
        if (!this.hasAttribute("textColor")) return;
        var textColor = this.getAttribute("textColor");
        var style = this.shadowRoot.querySelector("style");
        style.insertAdjacentHTML(
          "beforeend",
          `::slotted(a) {
            color:${textColor};
  }`
        );
      }
  
      constructor() {
        super();
  
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      }
  
      connectedCallback() {
        this.checkSide();
        this.checkTextColor();
      }
    }
    window.customElements.define("vertical-nav", VerticalNav);
  })();
