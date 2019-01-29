function cocktailDB(){
    var randomCocktails = {
        url:'https://www.thecocktaildb.com/api.php',
        dataType:'json',
        data:{
            'api-key':'1'
        },
        success: (result)=>console.log(result),
        error: (result)=>console.log(result)
    }
    $.ajax(randomCocktails)
}