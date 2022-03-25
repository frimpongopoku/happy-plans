import { onDropdownClick } from "../functions.js";
import { getElement } from "../utils/utils.js";

export default class Dropdown extends HTMLElement {
    constructor() {
        super();
        this.options = "Ranking, Date of Establishment, Student Population";
        this.render(this);
    }

    static get observedAttributes() {
        return ["version", "options", "isarray"];
    }

    connectedCallback() {
        this.render(this);
        this.initialiseClicking();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[name] = newValue;
        this.render(this);
    }

    initialiseClicking() {
        const elements = getElement(".c-drop-option", true);
        elements.forEach((el) => {
            el.addEventListener("click", function() {
                const key = el.getAttribute("data-key");
                onDropdownClick(key);
            });
        });

        const select = getElement("#c-select");
        select.addEventListener("change", function() {
            console.log("I have changed bruH")
        })
        console.log("I am the select bro", select);


    }

    render({ version, options }) {
        const v2 = version === "v2" ? true : false;
        // create menu items by inflating the html markup with the name of the dynamically provided option, then flatten the array back into a string literal that can be read back as proper HTML mark up
        var items = (options || "").split(",").map((op) => op.split("-")[0]);

        items = items
            .map(
                (op) =>
                ` <option class="c-drop-option" data-key="${
            op.split("-")[1] || "no-key"
          }" value="${op}">${op}</option>`
            )
            .join();
        const content = `
        <div  class="custom-select ${
          v2 ? " select-theme-2" : ""
        }">
            <select name ="dropdown" id="c-select" style="text-align: left">
        ${items}
        </select>
        </div>
    `;
        this.innerHTML = content;

    }
}