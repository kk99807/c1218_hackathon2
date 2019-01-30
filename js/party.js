/** Main Application Class - Used to initialize app & holds collections of party items. */
class Party {
    
    /**
     * Create initial collections that can be used to search and manage party items.
     * @constructor
     */
    constructor() {
        this.partyOrganizer = {
            foods: new FoodItems($('.food')),
            cocktails: new CocktailItems($('.cocktail')),
            music: new MusicItems($('.music'))
        }
    }

    /**
     * Start the app
     */
    start() {
        this.partyOrganizer.foods.showList();
        this.partyOrganizer.cocktails.showList();
        this.partyOrganizer.music.showList();
    }
}