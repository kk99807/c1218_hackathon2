class FoodItems extends PartyItems {
    constructor(domElement, items) {
        super(domElement, items);

        this.showSearch = this.showSearch.bind(this);

        this.domElement.find('.btnSearch').click(this.showSearch);
    }

    asyncSearch() {
        console.log('In FoodItems.asyncSearch');
        return new Promise((resolve, reject) => {
            // Example:
            // FB.api(`/${userId}/friends`, 'GET', {}, response => resolve(response.data));

            let response = {
                data: [
                    {id: 1, name: 'Mini HotDogs', description: 'Mini HotDogs by Stella', imageURL: 'an image URL', linkURL: 'a link URL'}
                ]
            };

            let items = response.data.map(item => new PartyItem(item.id, item.name, item.description, item.imageURL, item.linkURL));
            resolve(items);
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