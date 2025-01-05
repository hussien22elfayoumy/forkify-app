import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipe-view.js';
import searchView from './views/search-view.js';
import searchResultView from './views/search-result-view.js';
import paginationView from './views/pagination-view.js';
import bookmarksView from './views/bookmarks-view.js';
import addRecipeView from './views/add-recipe-view.js';
import { MODAL_CLOSE_SEC } from './configs.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    // TODO: update rsults view to mark selected recipe
    searchResultView.update(model.getSearchResultsPage());

    // TODO: Updata bookmarks view to mark the selected recipe
    bookmarksView.update(model.state.bookmarks);

    // 1) TODO: loading the recipe
    await model.loadRecipe(id);

    // 2) TODO: rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // TODO: Get Search query
    const query = searchView.getQuery();
    if (!query) return;

    searchResultView.renderSpinner();
    // TODO: Load search results
    await model.loadSearchResults(query);

    // TODO: Render the results
    // searchResultView.render(model.state.search.result);
    searchResultView.render(model.getSearchResultsPage());

    // TODO: Render the initial Pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
    searchResultView.renderError();
  }
};

const controlPagination = function (page) {
  // TODO: Render  the NEW results
  searchResultView.render(model.getSearchResultsPage(page));

  // TODO: Render the NEW  Pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // TODO: Updata the recipe servings (in state)
  model.updateServings(newServings);
  // TODO: updata the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // TODO: Re render the recipe view to update bookmark button
  recipeView.update(model.state.recipe);

  // TODO: Render the bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarksRender = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (recipe) {
  try {
    // TODO: show Loading spinner
    addRecipeView.renderSpinner();

    // TODO: upload new recipe
    await model.upladRecipe(recipe);

    // TODO: render the new recipe on screen
    recipeView.render(model.state.recipe);

    // TODO: render the bookmarks with new add own recipe
    bookmarksView.render(model.state.bookmarks);

    // TODO: render sucess msg
    addRecipeView.renderMessage();

    // TODO: close the form window
    setTimeout(() => addRecipeView.toggleWindow(), MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarksRender);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdataServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
