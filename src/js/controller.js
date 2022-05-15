import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookmarkView from './views/bookmarkView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOS_SEC } from './config.js';

import icons from 'url:../img/icons.svg'; //parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpiner();
    // 0) update search
    resultView.update(model.getSearchResultPage());

    // 1) load repice
    await model.loadRecipe(id);

    // 2) render recipe
    recipeView.render(model.state.recipe);
    // update bookmarks
    bookmarkView.update(model.state.bookmarks);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    resultView.renderSpiner();
    // get query
    const query = searchView.getQuery();
    if (!query) return;
    //load search
    await model.loadSearchResult(query);
    // render result
    resultView.render(model.getSearchResultPage());
    // render initial page
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  // render new result
  resultView.render(model.getSearchResultPage(goToPage));
  // render new initial page
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update repice servings (in state)
  model.updateServings(newServings);
  // Update the recipe  view
  recipeView.update(model.state.recipe);
  console.log(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // update recipe view
  recipeView.render(model.state.recipe);
  //  render bookmark
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // load spinner
    addRecipeView.renderSpiner();

    await model.uploadRecipe(newRecipe);

    // render recipe
    recipeView.render(model.state.recipe);
    // RENDER success
    addRecipeView.renderMessage();
    //render bookmark view
    bookmarkView.render(model.state.bookmarks);
    //change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //  close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOS_SEC * 1000);
  } catch (error) {
    console.log(error);
    addRecipeView.renderError(error.message);
  }
  //
};

const newFeature = function () {
  console.log('Hello Đinh Thế Anh');
};

const init = function () {
  recipeView.addHandlerRendered(controlRecipes);
  recipeView.addhandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  bookmarkView.addHandleRender(controlBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  newFeature();
};
init();
