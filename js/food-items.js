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
        this.domElement.find('.foodSearchButton').click(this.handleSearch);
    }

    /**
     * Called by PartyItems superclass when user requests a search to retrieve food recipes
     * @returns {Promise} a Promise to retrieve an array of RecipeItem of the specified type (chicken|beef|vegetarian)
     */
    asyncSearch() {
        let query = $('.foodSearchInput').val();
        let i = 1;

        const BASEURL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=10&tags=';

        return new Promise((resolve, reject) => {
            $.ajax({
                method: 'get',
                dataType: 'json',
                headers: {'X-RapidAPI-Key': API_KEY},
                url: BASEURL + query,
                success: data => {
                    console.log(data)
                    let items = data.recipes.map(item => {
                        let ingredients = [];
                        for(let i = 0; i < item.extendedIngredients.length; i++){
                            let ingredient = item.extendedIngredients[i].original;
                            ingredients.push(ingredient);
                        }

                        $(`.item${i} img`).attr('src', item.image);
                        $(`.item${i} p`).text(item.title);
                        i++

                        // if no image....

                        return new RecipeItem(
                            item.id, 
                            item.title, 
                            item.image, 
                            this.handleItemClick, 
                            {ingredients: ingredients, instructions: item.instructions}
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