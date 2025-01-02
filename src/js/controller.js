import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipe-view.js';
import searchView from './views/search-view.js';
import searchResultView from './views/search-result-view.js';

if (module.hot) {
  module.hot.accept();
}

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
    searchResultView.render(model.state.search.result);
    console.log(model.state.search.result);
  } catch (err) {
    console.log(err);
    searchResultView.renderError();
  }
};

controlSearchResults();

// 3) TODO: render the recipe on load and hashchange
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
