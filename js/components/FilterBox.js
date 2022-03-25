export class FilterBox extends HTMLElement {
    constructor() {
        super();
        const info = window.pageInfo;
        this.pagename = window.pageName && window.pageName.toUpperCase();
        this.info = info || {};
        this.render(this);
    }
    render({ pagename, info }) {
        const content = `
      <div class="filter-area">
          <div class="filter-box">
              <h3 style="color: var(--app-theme-color)">${pagename}</h3>
              <p>
                 ${(info.filter && info.filter.description) || "..."}
                  
              </p>
              <h3>${(info.filter && info.filter.subtext) || "..."}</h3>
              <div class="custom-select select-theme-2">
                  <select style="text-align: left">
          <option>Ranking</option>
          <option>Date of Establishment</option>
          <option>Student Population</option>
        </select>
              </div>
          </div>
      </div>
`;
        this.innerHTML = content;
    }
}