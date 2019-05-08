/** Class representing a party item (e.g. music selection, appetizer recipe) */
class PartyItem {

    /**
     * @constructor
     * @param {string} id - ID of this item per its source API
     * @param {string} name - Name of this item
     * @param {string} imageURL - Image URL for this item
     * @param {*} eventCallback - Callback when item is clicked in DOM
     * @param {{}} props - Additional type-specific properties (ex: recipe ingredients)
     */
    constructor(id, name, imageURL, eventCallback, props, badge) {
        this.id = id;
        this.name = name;
        this.imageURL = imageURL;
        this.eventCallback = eventCallback;
        this.props = props;
        this.badge = badge;
        this.card = null;
    }

    /**
     * @param {boolean} selected - Whether or not this is currently selected
     * @returns {*} jQuery wrapper containing a Materialize card with high-level info for this item
     */
    // renderSearch(selected) {
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

        let titleLink = $('<div>')
            .addClass('titleLink')
            .appendTo(cardContent);

        let title = $('<a>')
            .addClass('searchTitle')
            .text(this.name)
            .appendTo(titleLink);

        //recipe modal
        let cardReveal = $('<div>')
            .addClass('modal').attr('id',this.name)
            .appendTo(card);

        $('.modal').modal();

        let modalContent = $('<div>').addClass('modal-content').appendTo(cardReveal);

        let modalFooter = $('<div>').addClass('modal-footer').appendTo(cardReveal);

        let modalFooterContent = $('<button>').addClass('modal-close btn').attr('href','#!').appendTo(modalFooter).text('Close')

        let revealTitle = $('<h5>')
            .addClass('class-title')
            .text(this.name)
            .appendTo(modalContent);

        let closeButton = $('<i>')
            .addClass('material-icons right modal-close')
            .text('close')
            .appendTo(revealTitle);

        // let instructions = $('<p>')
        // .addClass('recipe')
        // .text(this.props.instructions);
        if(this.props.ingredients){
            for(let i = 0; i < this.props.ingredients.length; i++){
                let ingredients = $('<h5>')
                    .addClass('ingredients')
                    .text('- ' + this.props.ingredients[i]);
                modalContent.append(ingredients);
            }
        }

        let addBreak = $('<br>').appendTo(modalContent);

        let revealContent = $('<p>')
            .text(this.props.instructions)
            .appendTo(modalContent);

        let buttonContainer = $('<a>')
            .addClass('btn waves-effect waves-light itemDelete')
            .appendTo(cardContent);

        let button = $('<i>')
            .addClass('material-icons trashIcon')
            .text('delete')
            .appendTo(buttonContainer);

        let modalActivate = $('<a>').addClass('btn waves-effect waves-light buttonStyle modal-trigger').attr('href', ('#'+this.name)).appendTo(cardContent);
        
        let revealIcon = $('<i>')
            .addClass('material-icons')
            .text('more_vert')
            .appendTo(modalActivate);

        card.click(target => this.eventCallback(this, 'view'));
        title.click(target => this.eventCallback(this, 'view'));
        image.click(target => this.eventCallback(this, 'view'));
        button.click(target => {
            card.fadeOut(() => card.remove());
            this.eventCallback(this, button.text());
        });

        closeButton.click(() => cardReveal.hide());
        return card;
    }
}

/** Class representing a recipe-type party item */
class RecipeItem extends PartyItem {
    //Card reveal render Details
    /**
     * @returns jQuery wrapper with DOM showing details of this recipe
     */
    renderDetails(){
        //for old code
        let container = $('<div>')
            .addClass('displayContainer');

        let title = $('<h3>')
            .addClass('detailsTitle')
            .text(this.name);

        let imageContainer = $('<div>')
            .addClass('listImageContainer');

        let image = $('<img>')
            .addClass('detailsImage')
            .attr('src', this.imageURL);

        let infoContainer = $('<div>')
            .addClass('listContentContainer');

        let ingredientList = $('<ul>')
            .addClass('ingredientList');

        for(let i = 0; i < this.props.ingredients.length; i++){
            let ingredients = $('<li>')
                .addClass('ingredients')
                .text(this.props.ingredients[i]);
            ingredientList.append(ingredients);
        }

        let instructions = $('<p>')
            .addClass('recipe')
            .text(this.props.instructions);

        imageContainer.append(image);
        infoContainer.append(ingredientList, instructions)
        container.append(title, imageContainer, infoContainer)
        
        return container;
    }
}

/** Class representing a video-type party item */
class VideoItem extends PartyItem {

    /**
     * @returns jQuery wrapper with DOM showing this video/details
     */
    renderDetails(){
        let container = $('<div>')
            .addClass('videoDisplay');

        let spinner = $('<i>')
            .addClass("fa fa-spinner fa-spin musicSpinner");
        let closeDiv =  $('<div>');
        let closeButton = $('<i>')
            .addClass('material-icons musicDetailClose')
            .text('close')
            .click(target => $('.videoDisplay').hide())
            .css('color', 'white');
        closeDiv.append(closeButton);
        container.append(closeDiv, spinner);

        let video = $('<iframe>')
            .attr({
                type: 'text/html',
                width: '80%',
                height: '90%',
                src: `https://www.youtube.com/embed/${this.id}`,
                fs: '1'
            })
            .addClass('videoIFrame');
            
        container.append(video);
        $('.musicInfo').append(container);
    }
}