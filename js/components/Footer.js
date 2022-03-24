export default class Footer extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        const content = `
    <section class="footer">
      <p><strong>Call Us On: +230 5733 9143</strong></p>
      <p class="email"><strong>message@happy-plans.com</strong></p>
      <p><strong>Happy-plans@2022</strong></p>
  </section>
    `;
        this.innerHTML = content;
    }
}