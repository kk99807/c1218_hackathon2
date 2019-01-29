class Party {
    constructor() {
        this.partyOrganizer = {
            foods: new FoodItems(
                $('.searchModalExample'),
                [new PartyItem(1, 'HotDogs', 'Mini HotDogs', 'ImageUrl', 'linkURL')]
            )
        }
    }

    start() {
        this.partyOrganizer.foods.showList();        
    }
}