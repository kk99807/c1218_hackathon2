/** Class for searching and managing cocktail selections. */
class CocktailItems extends PartyItems {

    /**
     * @constructor
     * @param {*} domElement - jQuery selector for the top-level DOM element used to visualize this set of items
     * @param {*} items - OPTIONAL List of initial cocktail selections
     */
    constructor(domElement, items) {
        super(domElement, items);
        this.bindEvents();
    }

    /**
     * Called by PartyItems superclass when user requests a search to retrieve cocktail recipes
     * @returns {RecipeItem} a Promise to retrieve an array of RecipeItem
     */
    asyncSearch() {
        return new Promise((resolve, reject) => {

            $.ajax({
                method: 'get',
                dataType: 'json',
                url: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
                data:{
                    'api-key':'1'
                },
                success: data => {
                    let items = data.drinks.map(item => {
                        let ingredients = [];
                        for (let i = 1; i < 16; i++) {
                            let ingredient = item['strIngredient'+i];
                            if (ingredient) ingredients.push(ingredient);
                        }

                        return new RecipeItem(
                            item.idDrink, 
                            item.strDrink, 
                            item.strDrinkThumb, 
                            this.handleItemClick, 
                            {ingredients: ingredients, instructions: item.strInstructions}
                        );
                    });
                    resolve(items);
                    
                },
                error: function(error){
                    throw new Exception("You're data request failed");
                }
            });

        });
    }
}