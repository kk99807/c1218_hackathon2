/** Class for searching and managing cocktail selections. */
class CocktailItems extends PartyItems {

    /**
     * @constructor
     * @param {*} domElement - jQuery selector for the top-level DOM element used to visualize this set of items
     * @param {*} items - OPTIONAL List of initial cocktail selections
     */
    constructor(domElement, items) {
        super(domElement, items);
        this.bindEvents();
        this.searchByAlcohol = this.searchByAlcohol.bind(this);
        this.searchDrinkByName = this.searchDrinkByName.bind(this);
        $('.alcohol').on('click',this.searchByAlcohol);//must have 4 buttons vodka, gin, rum, tequila with class of alcohol
        this.storeDrinksInArray = this.storeDrinksInArray.bind(this);
        this.searchDrinkByAlcohol = this.searchDrinkByAlcohol.bind(this);
        $('.cocktailSearchButton').on('click',this.handleSearch);

    }
    searchByAlcohol( event ){
        let spinner = $('<i>').addClass('fa fa-spinner fa-spin');
        $('.listItemContainer').append(spinner);
        this.searchDrinkByAlcohol( event )
        .then( result => this.storeDrinksInArray(result) )
        .then( result2 => Promise.all(result2.map(this.getJSON)) )
        .then( result4 => this.storeIngredientData(result4) )
        .then( result5 => result5.map(item=>item.renderSearch()))
        .then( result6 => {
            this.domSearchResults.empty().append(result6);
            $('.fa-spinner').remove();
            $('.cocktail .contentContainer').hide();
            $('.cocktail .searchContainer').show();
            
        })
        //.then((result3)=>console.log(result3));
    }

    handleSearch(){
        this.searchDrinkByName().then(items => {
            let itemElements = items.map(item => {
                let p = $('<p>').text(item.name);
                let img = $('<img>').attr('src', item.imageURL);
                let div = $('<div>').addClass('slide');
                img.click(target => {
                    this.handleItemClick(item, 'add');
                });
                div.append(img, p);
                return div;
            });

            this.domSearchResults.slick('slickRemove', null, null, true);
            this.domSearchResults
                .slick('unslick')
                .empty()
                .append(itemElements)
                .slick({
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 1500,
                    swipe: true,
                    adaptiveHeight: true,
                    touchMove: true,
                    centerMode: true
                });
            $('.slick-arrow').addClass('hidden');

            $('.fa-spinner').remove();

        });
    }
    searchDrinkByName(){
        let cocktailName = $('.cocktailSearchInput').val();
        return new Promise((resolve, reject) => {
            $.ajax({
                method: 'get',
                dataType: 'json',
                url: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`,
                data:{
                    'api-key':'1'
                },
                success: data => {
                    if(data.drinks === null){
                        $('.handleSearchError').css('visibility','visible');
                        return;
                    }
                    $('.handleSearchError').css('visibility','hidden');
                    let items = data.drinks.map(item => {
                        let ingredients = [];
                        for (let i = 1; i < 16; i++) {
                            let ingredient = item['strMeasure' + i];
                            let measurement = item['strIngredient'+i];
                            let fullString = "";
                            if (ingredient && measurement){
                                fullString = ingredient + ' ' + measurement;
                                ingredients.push(fullString);
                            } 
                        }
                        return new RecipeItem(
                            item.idDrink, 
                            item.strDrink, 
                            item.strDrinkThumb, 
                            this.handleItemClick, 
                            {ingredients: ingredients, instructions: item.strInstructions},
                            $('.cocktailsHeader .badge')
                        );
                    });
                    resolve(items);
                },
            });
        });
    }
    searchDrinkByAlcohol( event ){
        let clickedText = $( event.target ).text();
        return new Promise((resolve,reject)=>
            {resolve($.getJSON(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${clickedText}`))}
            //.then((json)=>resolve(this.storeDrinksInArray(json)))
        )
    }
    storeDrinksInArray(jsonData){
        let drinksArrayByID = [];
        for(let jsonDataIndex = 0; jsonDataIndex<10; jsonDataIndex++){
            let currentDrinkID = jsonData.drinks[jsonDataIndex].idDrink;
            drinksArrayByID.push(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${currentDrinkID}`)
        }
        return drinksArrayByID;
    }
    getJSON (url) {  
        return new Promise((resolve, reject) => {
          $.getJSON(url)
            .then((json) => {resolve(json)})
        });
    }
    storeIngredientData(ingredientJsonArray){
        let items = ingredientJsonArray.map(item => {
            let ingredients = [];
            for (let i = 1; i < 16; i++) {
                let ingredient = item.drinks[0]['strMeasure' + i];
                let measurement = item.drinks[0]['strIngredient'+i];
                let fullString = "";
                if (ingredient && measurement){
                    fullString = ingredient + '' + measurement
                    ingredients.push(fullString);
                } 
            }
            return new RecipeItem(
                item.drinks[0].idDrink, 
                item.drinks[0].strDrink, 
                item.drinks[0].strDrinkThumb, 
                this.handleItemClick, 
                {ingredients: ingredients, instructions: item.drinks[0].strInstructions}
            );
        });
        return items;
    }

    /**
     * Called by PartyItems superclass when user requests a search to retrieve cocktail recipes
     * @returns {RecipeItem} a Promise to retrieve an array of RecipeItem
     */
    asyncSearch() {
        return new Promise((resolve, reject) => {

            $.ajax({
                method: 'get',
                dataType: 'json',
                url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=blue',
                data:{
                    'api-key':'1'
                },
                success: data => {
                    let items = data.drinks.map(item => {
                        let ingredients = [];
                        for (let i = 1; i < 16; i++) {
                            let ingredient = item['strMeasure' + i];
                            let measurement = item['strIngredient'+i];
                            let fullString = "";
                            if (ingredient && measurement){
                                fullString = ingredient + ' ' + measurement;
                                ingredients.push(fullString);
                            } 
                        }

                        return new RecipeItem(
                            item.idDrink, 
                            item.strDrink, 
                            item.strDrinkThumb, 
                            this.handleItemClick, 
                            {ingredients: ingredients, instructions: item.strInstructions},
                            $('.cocktailsHeader .badge')
                        );
                    });
                    resolve(items);
                    
                },
                error: function(error){
                    throw new Exception("You're data request failed");
                }
            });

        });
    }
}