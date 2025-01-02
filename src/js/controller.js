import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipe-view.js';
import searchView from './views/search-view.js';
import searchResultView from './views/search-result-view.js';
import paginationView from './views/pagination-view.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

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

controlSearchResults();

const controlPagination = function (page) {
  // TODO: Render  the NEW results
  searchResultView.render(model.getSearchResultsPage(page));

  // TODO: Render the NEW  Pagination buttons
  paginationView.render(model.state.search);
};

// 3) TODO: render the recipe on load and hashchange
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
