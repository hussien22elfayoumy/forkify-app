import View from './view';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      console.log(gotoPage);

      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const page = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // TODO: Page 1, and there are other pages
    if (page === 1 && numPages > 1) {
      return `
					<button data-goto="${page + 1}" class="btn--inline pagination__btn--next">
						<span>Page ${page + 1}</span>
						<svg class="search__icon">
							<use href="${icons}#icon-arrow-right"></use>
						</svg>
					</button>
			`;
    }

    // TODO: Last Page
    if (page === numPages && numPages > 1)
      return `
				<button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
					<svg class="search__icon">
						<use href="${icons}#icon-arrow-left"></use>
					</svg>
					<span>Page ${page - 1}</span>
				</button>
		`;

    // TODO: Middle Page
    if (page < numPages)
      return `
				<button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
					<svg class="search__icon">
						<use href="${icons}#icon-arrow-left"></use>
					</svg>
					<span>Page ${page - 1}</span>
				</button>
		
				<button data-goto="${page + 1}"  class="btn--inline pagination__btn--next">
					<span>Page ${page + 1}</span>
					<svg class="search__icon">
						<use href="${icons}#icon-arrow-right"></use>
					</svg>
				</button>
		`;

    // TODO: Page 1, and there are no other pages
    return '';
  }
}

export default new PaginationView();
