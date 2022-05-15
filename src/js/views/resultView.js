import previewView from './previewView.js';
import View from './View.js';
import icons from 'url:../../img/icons.svg';
class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No repice for query, try again';
  _message = 'Susccess';
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new ResultView();
