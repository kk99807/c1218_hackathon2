function cocktailDB(){
    var randomCocktails = {
        url:'https://www.thecocktaildb.com/api/json/v1/1/random.php',
        dataType:'json',
        data:{
            'api-key':'1'
        },
        success: function(result){
            console.log(result)
        },
    }
    $.ajax(randomCocktails)
}