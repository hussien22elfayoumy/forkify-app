import * as model from './model.js';
import recipeView from './views/recipe-view.js';

import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const BASE_URL = 'https://forkify-api.jonas.io/api/v2/recipes';
const url = `${BASE_URL}?search=pizza`;
console.log(url);
console.log(url);

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
    alert(err);
  }
}

['load', 'hashchange'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
