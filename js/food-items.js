class FoodItems extends PartyItems {
    constructor(domElement, items) {
        super(domElement, items);
        this.handleSearch = this.handleSearch.bind(this);
        this.domElement.find('.searchButton').click(this.handleSearch);
    }

    asyncSearch() {
        console.log('In FoodItems.asyncSearch');
        return new Promise((resolve, reject) => {

            $.ajax({
                method: 'get',
                dataType: 'json',
                headers: {[API_KEY_KEY]: API_KEY},
                url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1&tags=appetizer',
                success: function(data){
                    console.log(data);
                    let items = data.recipes.map(item => new PartyItem(item.id, item.title, item.image, {ingredients: item.extendedIngredients, instructions: item.instructions}));
                    resolve(items);
                    
                },
                error: function(error){
                    throw new Exception("You're data request failed")
                    console.log('Your data request failed: ', error);
                }
            });

        });
    }

    asyncGetDetails( item ) {
        console.log('In FoodItems.asyncGetDetails');
    }

    showDetails() {
        super.showDetails();
        
        console.log('PartyItems.showDetails');
    }
}