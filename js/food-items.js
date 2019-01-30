/** Class for searching and managing food selections. */
class FoodItems extends PartyItems {

    /**
     * @constructor
     * @param {*} domElement - jQuery selector for the top-level DOM element used to visualize this set of items
     * @param {*} items - OPTIONAL List of initial food selections
     */
    constructor(domElement, items) {
        super(domElement, items);
        this.bindEvents();
    }

    /**
     * Called by PartyItems superclass when user requests a search to retrieve food recipes
     * @returns {Promise} a Promise to retrieve an array of RecipeItem of the specified type (chicken|beef|vegetarian)
     */
    asyncSearch(target) {
        let buttonClass = target.currentTarget.attributes.class.nodeValue;
        let query;

        if(buttonClass === 'searchIcon beefIcon'){
            query = 'appetizer%2C+beef';
        } else if(buttonClass === 'searchIcon chickenIcon'){
            query = 'appetizer%2C+chicken';
        } else if(buttonClass === 'searchIcon veggieIcon'){
            query = 'appetizer%2C+vegetarian';
        } else if(buttonClass === 'searchIcon questionIcon'){
            query = 'appetizer';
        }

        const BASEURL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1&tags=';

        return new Promise((resolve, reject) => {
            $.ajax({
                method: 'get',
                dataType: 'json',
                headers: {[API_KEY_KEY]: API_KEY},
                url: BASEURL + query,
                success: data => {
                    let ingredients = [];
              
                    for(let i = 0; i < data.recipes[0].extendedIngredients.length; i++){
                        let ingredient = data.recipes[0].extendedIngredients[i].original;
                        ingredients.push(ingredient);
     
                    }
                        
                    let items = data.recipes.map(item => new RecipeItem(
                        item.id, 
                        item.title, 
                        item.image, 
                        this.handleItemClick, 
                        {ingredients: ingredients, instructions: item.instructions}
                    ));
                    resolve(items);
                    
                },

                error: function(error){
                    throw new Exception("You're data request failed");
                }
            });

        });
    }
}