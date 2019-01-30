class FoodItems extends PartyItems {
    constructor(domElement, items) {
        super(domElement, items);
        this.bindEvents();
    }

    asyncSearch() {
        console.log(this)
    
        // chicken: https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=5&offset=0&type=appetizer&query=chicken

        // beef: https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=5&offset=0&type=appetizer&query=beef

        // vegetarian: https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=5&offset=0&type=appetizer&query=vegetarian

        return new Promise((resolve, reject) => {

            $.ajax({
                method: 'get',
                dataType: 'json',
                headers: {[API_KEY_KEY]: API_KEY},
                url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1&tags=appetizer',
                success: data => {
                    console.log(data);
                    let items = data.recipes.map(item => new RecipeItem(
                        item.id, 
                        item.title, 
                        item.image, 
                        this.handleItemClick, 
                        {ingredients: item.extendedIngredients, instructions: item.instructions}
                    ));
                    resolve(items);
                    
                },
                error: function(error){
                    throw new Exception("You're data request failed")
                    console.log('Your data request failed: ', error);
                }
            });

        });
    }
}