class Party {
    constructor() {
        this.partyOrganizer = {
            foods: new FoodItems($('.food')),
            cocktails: new CocktailItems($('.cocktail'))
        }
    }

    start() {
        this.partyOrganizer.foods.showList();        
    }
}