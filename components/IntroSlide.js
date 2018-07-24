customElements.define('intro-slide',
  class extends HTMLElement {
    constructor() {
      super();

      let template = document.getElementById('intro-slide');
      let templateContent = template.content;

      const shadowRoot = this.attachShadow({mode: 'open'})
        .appendChild(templateContent.cloneNode(true));
    }
  }
);