export default class FilterBox extends HTMLElement {
    constructor() {
        super();
        const info = window.pageInfo;
        this.pagename = window.pageName && window.pageName.toUpperCase();
        this.info = info || {};
        this.render(this);
    }
    render({ pagename, info }) {
        const filter = info.filter;
        const content = `
      <div class="filter-area">
          <div class="filter-box">
              <h3 style="color: var(--app-theme-color)">${pagename}</h3>
              <p>
                 ${(filter && filter.description) || "..."}
              </p>
              <h3>${(filter && filter.subtext) || "..."}</h3>
            <app-dropdown version ="v2" options = "${filter.options }"></app-dropdown>
          </div>
      </div>
`;
        this.innerHTML = content;
    }
}