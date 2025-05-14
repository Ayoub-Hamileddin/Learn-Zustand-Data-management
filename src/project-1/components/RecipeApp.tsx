import React, { useState } from "react";
import { UseRecipeStore } from "../store/RecipeStore";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
}

const RecipeApp = () => {
  const { recipes, addRecipe, removeRecipe } = UseRecipeStore();
  const [name, setName] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  const HandleAddRecipe = () => {
    if (
      name.trim() === "" ||
      ingredients.trim() === "" ||
      instructions.trim() === ""
    ) {
      return;
    }

    addRecipe({
      id: Date.now(),
      name,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
      instructions,
    });
    setName("");
    setIngredients("");
    setInstructions("");
  };

  //   -------------remove--------------
  const handleRemoveRecipe = (id: number) => {
    removeRecipe(id);
  };

  //   -----------------edit-----------------
  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setName(recipe.name);
    setIngredients(recipe.ingredients.join(","));
    setInstructions(recipe.instructions);
  };

  //   -------------update-----------
  const handleUpdateRecipe = () => {
    if (editingRecipe) {
      removeRecipe(editingRecipe.id);
      addRecipe({
        id: Date.now(),
        name,
        ingredients: ingredients
          .split(",")
          .map((ingredient) => ingredient.trim()),
        instructions,
      });
    }
    setEditingRecipe(null);
  };
  const handleCancelRecipe = () => {
    setEditingRecipe(null);
  };

  return (
    <div>
      <div className="min-h-screen bg-green-100 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-4xl mb-6 font-semibold text-center text-green-800 text-shadow-amber-50 capitalize  ">
            Recipe App
          </h2>
          <div className="space-y-4 mb-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full  px-4 py-2 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="name of recipe"
            />
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full  px-4 py-2 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your ingredients (comma seperate) "
            />
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full  px-4 py-2 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Instructions"
            />
          </div>

          {editingRecipe ? (
            <div className="flex justify-between">
              <button
                className="  px-4 py-2 bg-green-300  cursor-pointer rounded-2xl font-bold  "
                onClick={handleUpdateRecipe}
              >
                update
              </button>
              <button
                className=" px-4 py-2 bg-gray-400  cursor-pointer rounded-2xl text-sm font-bold "
                onClick={handleCancelRecipe}
              >
                cancel
              </button>
            </div>
          ) : (
            <div>
              <button
                className=" w-full px-4 py-2 bg-green-100  cursor-pointer"
                onClick={HandleAddRecipe}
              >
                Add
              </button>
            </div>
          )}

          <ul className="space-y-4 my-4  ">
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <h2 className="text-2xl font-semibold text-gray-500 ">
                  {recipe.name}:
                </h2>
                <p className="">
                  <strong className="text-shadow-md">ingredients: </strong>{" "}
                  {recipe.ingredients.join(", ")}
                </p>
                <p className="">
                  <strong> {recipe.instructions} </strong>
                </p>
                <div className=" space-y-5 mt-3 flex justify-between">
                  <button
                    className=" px-4 py-2 bg-red-500  cursor-pointer rounded-2xl text-sm font-bold "
                    onClick={() => handleRemoveRecipe(recipe.id)}
                  >
                    remove
                  </button>
                  <button
                    className="  px-4 py-2 bg-yellow-200  cursor-pointer rounded-2xl font-bold  "
                    onClick={() => handleEditRecipe(recipe)}
                  >
                    edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeApp;
