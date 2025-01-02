import View from './view';
import icons from '../../img/icons.svg';

class SearchResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMsg = 'No recipes found four you query! Try another one';
  _message = '';

  _generateMarkup() {
    const markup = this._data.map(this._generateMarkupPreview).join('');
    return markup;
  }

  _generateMarkupPreview(res) {
    return `
					<li class="preview">
            <a class="preview__link" href="#${res.id}">
              <figure class="preview__fig">
                <img src="${res.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${res.title}</h4>
                <p class="preview__publisher">${res.publisher}</p>
              </div>
            </a>
          </li>
			`;
  }
}

export default new SearchResultView();
