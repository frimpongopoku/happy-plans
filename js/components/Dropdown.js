export default class Dropdown extends HTMLElement {
    constructor() {
        super();
        this.options = "Ranking, Date of Establishment, Student Population";
        this.render(this);
    }

    static get observedAttributes() {
        return ["version", "options"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[name] = newValue;
        this.render(this);
    }
    render({ version, options }) {
        const v2 = version === "v2" ? true : false;
        // create menu items by inflating the html markup with the name of the dynamically provided option, then flatten the array back into a string literal that can be read back as proper HTML mark up 
        const items = (options || "")
            .split(",")
            .map((op) => ` <option>${op}</option>`).join();
        const content = `
    <div class="custom-select ${v2 ? " select-theme-2" : ""}">
        <select style="text-align: left">
      ${items}
      </select>
    </div>
    `;
        this.innerHTML = content;
    }
}