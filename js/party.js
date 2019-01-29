class Party {
    constructor() {
        this.partyOrganizer = {
            foods: new FoodItems($('.food')),
            cocktails: new CocktailItems($('.cocktail')),
            music: new MusicItems($('.music'))
        }
    }

    start() {
        this.partyOrganizer.foods.showList();        
    }
}