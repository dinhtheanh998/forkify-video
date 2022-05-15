import View from './View.js';
import icons from 'url:../../img/icons.svg';
class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'Thêm thành công';
  constructor() {
    super();
    this._addHanlerShowWindow();
    this._addHanlerHiddenWindow();
  }
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHanlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHanlerHiddenWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handle) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      //   lấy tất cả các cặp giá trị trong form (name, value)
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handle(data);
    });
  }

  _generateMarkup() {}
}

export default new addRecipeView();
