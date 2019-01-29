class PartyItems {
    constructor(domElement, items) {
        this.domElement = domElement;
        this.domSearch = this.domElement.find('.search');
        this.domSearchResults = this.domElement.find('.searchResults');
        this.domList = this.domElement.find('.list');

        this.items = items || [];
    }

    handleSearch() {
        console.log('PartyItems.handleSearch');
    }

    handleGetDetails() {
        console.log('PartyItems.handleGetDetails');
    }

    handleAddItem() {
        console.log('PartyItems.handleAddItem');
    }

    handleRemoveItem() {
        console.log('PartyItems.handleRemoveItem');
    }

    showList() {
        console.log('PartyItems.showList');
        let renderedItems = this.items.map(item => item.render());
        this.domList.append(renderedItems);
    }

    showSearch() {
        console.log('PartyItems.showSearch');
        debugger;
        this.asyncSearch()
            .then(items => items.map(item => item.render()))
            .then(items => this.domSearchResults.append(items));
    }

    showDetails() {
        console.log('PartyItems.showDetails');
    }
}