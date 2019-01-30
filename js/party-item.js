class PartyItem {
    constructor(id, name, imageURL, props) {
        this.id = id;
        this.name = name;
        this.imageURL = imageURL;
        this.props = props;
    }

    renderSearch(classes) {
        let container = $('<div>').addClass('listItemContainer');

        let imageContainer = $('<div>').addClass('listImageContainer');
        let image = $('<img>').addClass('searchImage').attr('src', this.imageURL);

        let itemContainer = $('<div>').addClass('listContentContainer');
        let title = $('<h3>').addClass('searchTitle').text(this.name);

        let buttonContainer = $('<div>').addClass('addButtonContainer');
        let button = $('<button>').addClass('addButton').text('Add');

        imageContainer.append(image);
        itemContainer.append(title);
        buttonContainer.append(button);
        container.append(imageContainer, itemContainer, buttonContainer);

        return container
    }

    renderDetails(classes){
        let container = $('<div>').addClass('displayContainer');

        let title = $('<h3>').addClass('detailsTitle').text(this.name);

        let imageContainer = $('<div>').addClass('listImageContainer');
        let image = $('<img>').addClass('detailsImage').attr('src', this.imageURL);

        let infoContainer = $('<div>').addClass('listContentContainer');
        let ingredientList = $('<ul>').addClass('ingredientList');

        for(let i = 0; i < this.props.ingredients.length; i++){
            let ingredients = $('<li>').addClass('ingredients').text(this.props.ingredients[i]);
            ingredientList.append(ingredients);
        }

        let instructions = $('<p>').addClass('recipe').text(this.props.instructions);

        imageContainer.append(image);
        infoContainer.append(ingredientList, instructions)
        container.append(title, imageContainer, infoContainer)
        
        return container
    }
}