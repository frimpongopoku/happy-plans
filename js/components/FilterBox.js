/**
 * This component is the floating card that appears on most pages. It is what contains the filter dropdown options.
 *  When included on a page, it directly accesses the page object 
 * and uses the filter object to determine the properties it should should show.
 */
export default class FilterBox extends HTMLElement {
    constructor() {
        super();
        // get the name of the page, and information of the current page from window to be passed on for render
        const info = window.pageInfo;
        this.pagename = window.pageName && window.pageName.toUpperCase();
        this.info = info || {};
        this.render(this);
    }
    render({ pagename, info }) {
            const filter = info.filter;
            if (!filter) return;
            const content = `
      <div class="filter-area scale-in">
          <div class="filter-box">
              <h3 style="color: var(--app-theme-color)">${pagename}</h3>
              <p>
                 ${(filter && filter.description) || "..."}
              </p>
              <h3>${(filter && filter.subtext) || "..."}</h3>
            ${
              !filter.noDropdown
                ? `<app-dropdown version ="v2" options = "${
                    filter && filter.options
                  }" identifier="filter"></app-dropdown>`
                : ""
            }
          </div>
      </div>
`;
    this.innerHTML = content;
  }
}