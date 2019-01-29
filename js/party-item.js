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

        return $('<p>').text('PartyItem');
    }
}