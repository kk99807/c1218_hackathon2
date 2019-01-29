class Party {
    constructor() {
        this.partyOrganizer = {
            foods: new FoodItems(
                $('.foods'),
                [new PartyItem(1, 'HotDogs', 'Mini HotDogs', 'ImageUrl', 'linkURL')]
            )
        }
    }

    start() {
        this.partyOrganizer.foods.showList();        
    }
}