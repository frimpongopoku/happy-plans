import { onDropdownClick } from "../functions.js";
import { getElement } from "../utils/utils.js";

export default class Dropdown extends HTMLElement {
    constructor() {
        super();
        this.options = "Ranking, Date of Establishment, Student Population";
        this.defaultvalue = "";
        this.render(this);
    }

    static get observedAttributes() {
        return ["version", "options", "identifier", "defaultvalue"];
    }

    connectedCallback() {
        this.render(this);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[name] = newValue;

        this.render(this);
    }

    initialiseClicking() {
        const identifier = this.identifier;
        const select = getElement("#" + identifier, false, this.root);
        if (!select) return;
        select.addEventListener("change", function() {
            const value = select.value;
            onDropdownClick(value, identifier);
        });
    }

    render({ version, options, defaultvalue }) {
        const v2 = version === "v2" ? true : false;

        // create menu items by inflating the html markup with the name of the dynamically provided option, then flatten the array back into a string literal that can be read back as proper HTML mark up
        var items = (options || "").split(",").map((op) => op.split("-")); // split the string into array like: [["first item", "key"], ["second item", "key"]]
        items = items
            .map((op) => {
                const key = op[1] && op[1].toLowerCase();
                const isSelected = defaultvalue === key;
                return ` <option ${
          isSelected ? "selected='selected'" : ""
        } class="c-drop-option" data-key="${key || "no-key"}" value="${key}">${
          op[0]
        }</option>`;
            })
            .join();

        const content = `
        <div  class="custom-select ${v2 ? " select-theme-2" : ""}">
            <select name ="${this.identifier}" id ="${
      this.identifier
    }"  style="text-align: left">
        ${items}
        </select>
        </div>
    `;
        this.innerHTML = content;
        this.initialiseClicking()
    }
}