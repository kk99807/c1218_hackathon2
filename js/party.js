class Party {
    constructor() {
        this.partyOrganizer = {
            foods: new FoodItems(
                $('.food')
            )
        }
    }

    start() {
        this.partyOrganizer.foods.showList();        
    }
}