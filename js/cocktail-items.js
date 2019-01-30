class CocktailItems extends PartyItems {
    constructor(domElement, items) {
        super(domElement, items);
        this.bindEvents();
    }

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
                    console.log(data);
                    // let items = data.drinks.map(item => new PartyItem(item.id, item.name, item.descriptionn, item.image, item.linkURL));
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
                    console.log('items: ', items);
                    resolve(items);
                    
                },
                error: function(error){
                    throw new Exception("You're data request failed");
                }
            });

        });
    }
}