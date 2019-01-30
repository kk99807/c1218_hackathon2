class CocktailItems extends PartyItems {
    constructor(domElement, items) {
        super(domElement, items);

        this.handleSearch = this.handleSearch.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this.hideSearch = this.hideSearch.bind(this);

        this.domElement.find('.searchButton').click(this.handleSearch);
        this.domElement.find('.searchContainer .closeButton ').click(this.hideSearch);
        this.domElement.find('.addNew').click(this.showSearch);
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
                success: function(data){
                    console.log(data);
                    // let items = data.drinks.map(item => new PartyItem(item.id, item.name, item.descriptionn, item.image, item.linkURL));
                    let items = data.drinks.map(item => new PartyItem(item.idDrink, item.strDrink, item.strDrinkThumb, {}));
                    resolve(items);
                    
                },
                error: function(error){
                    throw new Exception("You're data request failed");
                    console.log('Your data request failed: ', error);
                }
            });

        });
    }

    asyncGetDetails( item ) {
        console.log('In CocktailItems.asyncGetDetails');
    }

    showDetails() {
        super.showDetails();
        
        console.log('PartyItems.showDetails');
    }
}