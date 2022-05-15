import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';
class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmark ;)';
  _message = 'Susccess';

  addHandleRender(handle) {
    window.addEventListener('load', handle);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkView();
