import PreviewView from './preview-view';
import View from './view';

class BookmarkView extends PreviewView {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMsg = ' No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarkView();
