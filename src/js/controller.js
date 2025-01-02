import * as model from './model.js';
import recipeView from './views/recipe-view.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1) TODO: loading the recipe
    await model.loadRecipe(id);
    // 2) TODO: rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
  }
}
// 3) TODO: render the recipe on load and hashchange
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
