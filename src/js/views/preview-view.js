import View from './view';
import icons from '../../img/icons.svg';

export default class PreviewView extends View {
  _generateMarkup() {
    const markup = this._data.map(this._generateMarkupPreview).join('');
    return markup;
  }

  _generateMarkupPreview(res) {
    const id = window.location.hash.slice(1);

    return `
					<li class="preview">
						<a class="preview__link ${
              res.id === id ? 'preview__link--active' : ''
            }" href="#${res.id}">
							<figure class="preview__fig">
								<img src="${res.image}" alt="Test" />
							</figure>
							<div class="preview__data">
								<h4 class="preview__title">${res.title}</h4>
								<p class="preview__publisher">${res.publisher}</p>
								<div class="preview__user-generated ${res.key ? '' : 'hidden'}">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
							</div>
						</a>
					</li>
			`;
  }
}
