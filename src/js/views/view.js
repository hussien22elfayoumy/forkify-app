import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];

      // TODO updata Changed text
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }

      //  TODO updata Changed attributes
      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          currEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
					<div class="spinner">
						<svg>
								<use href="${icons}#icon-loader"></use>
							</svg>
					</div>
			`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(errMsg = this._errorMsg) {
    const markup = `
					<div class="error">
							<div>
								<svg>
									<use href="${icons}#icon-alert-triangle"></use>
								</svg>
							</div>
							<p> ${errMsg}</p>
					</div>
			`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(msg = this._message) {
    const markup = `
					<div class="message">
							<div>
								<svg>
									<use href="${icons}#icon-smile"></use>
								</svg>
							</div>
							<p> ${msg}</p>
					</div>
			`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
