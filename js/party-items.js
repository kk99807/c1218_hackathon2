class PartyItems {
    constructor(domElement, items) {
        this.domElement = domElement;
        this.domSearch = this.domElement.find('.search');
        this.domSearchResults = this.domElement.find('.listItems');
        this.domList = this.domElement.find('.contentContainer');

        this.items = items || [];

        // TODO: Used for testing - remove
        this.items = [
            new PartyItem(1, 'PartyItem1', '', '', ''),
            new PartyItem(2, 'PartyItem2', '', '', '')
        ];
    }

    handleSearch() {
        this.asyncSearch()
            .then(items => items.map(item => item.renderSearch()))
            .then(items => this.domSearchResults.empty().append(items));
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
        this.hideSearch();
        this.hideDetails();
        console.log('PartyItems.showList');
        let renderedItems = this.items.map(item => item.renderSearch(true));
        this.domList.append(renderedItems);
    }

    showSearch() {
        this.hideDetails();
        this.domElement.find('.searchContainer').show();
    }

    showDetails() {
        this.hideSearch();
        this.domElement.find('.informationContainer').show();
    }

    hideSearch() {
        this.domElement.find('.searchContainer').hide();
    }

    hideDetails() {
        this.domElement.find('.informationContainer').hide();       
    }
}