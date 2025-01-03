import PreviewView from './preview-view';

class SearchResultView extends PreviewView {
  _parentElement = document.querySelector('.results');
  _errorMsg = 'No recipes found four you query! Try another one';
  _message = '';
}

export default new SearchResultView();
