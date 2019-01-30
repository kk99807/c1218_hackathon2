class PartyItem {
    constructor(id, name, imageURL, eventCallback, props) {
        this.id = id;
        this.name = name;
        this.imageURL = imageURL;
        this.eventCallback = eventCallback;
        this.props = props;
    }

    renderSearch(selected) {
        // SEE: Horizontal Cards at https://materializecss.com/cards.html
        let card = $('<div>').addClass('card horizontal');

        if (selected) {
            card.addClass('selected');
        }

        let cardImage = $('<div>')
            .addClass('card-image')
            .appendTo(card);

        let image = $('<img>')
            .addClass('searchImage')
            .attr('src', this.imageURL)
            .appendTo(cardImage);

        let cardStacked = $('<div>')
            .addClass('card-stacked')
            .appendTo(card);
        let cardContent = $('<div>')
            .addClass('card-content')
            .appendTo(cardStacked);

        let titleLink = $('<a>')
            .addClass('titleLink')
            .appendTo(cardContent);

        let title = $('<p>')
            .addClass('searchTitle')
            .text(this.name)
            .appendTo(titleLink);

        let buttonDef = selected ? 
            {label:'delete', colors: 'pink lighten-2'} :
            {label:'add', colors: 'purple lighten-2'};

        let buttonContainer = $('<a>')
            .addClass('btn-floating btn-large right-fab waves-effect waves-light ' + buttonDef.colors)
            .appendTo(cardContent);

        let button = $('<i>').addClass('material-icons').text(buttonDef.label)
            .appendTo(buttonContainer);

        title.click(target => this.eventCallback(this, 'view'));

        return card;
    }

    renderDetails(classes){
        debugger;
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