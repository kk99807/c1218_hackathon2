class PartyItem {
    constructor(id, name, description, imageURL, linkURL) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageURL = imageURL;
        this.linkURL = linkURL;
    }

    render(classes) {
        console.log('In PartyItem render: ', this);
        console.log('In PartyItem render; Classes: ', classes);

        let container = $('<div>').addClass('listItemContainer');

        let imageContainer = $('<div>').addClass('listImageContainer');
        let image = $('<img>').attr('src', this.imageURL);

        let itemConatiner = $('<div>').addClass('listContentContainer');
        let title = $('<h3>').text(this.name);
        let description = $('<p>').addClass('listItemDetails');
        let buttonContainer = $('<div>').addClass('addButtonContainer');
        let button = $('<button>').addClass('addButton').text('Add');

        imageContainer.append(image);
        itemConatiner.append(title, description);
        buttonContainer.append(button);
        container.append(imageContainer, itemConatiner, buttonContainer);

        return container
    }
}