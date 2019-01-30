class PartyItems {
    constructor(domElement, items) {
        this.domElement = domElement;
        this.domSearch = this.domElement.find('.search');
        this.domSearchResults = this.domElement.find('.listItems');
        this.domList = this.domElement.find('.contentContainer');

        this.items = items || [];
    }

    bindEvents() {
        this.handleSearch = this.handleSearch.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this.hideSearch = this.hideSearch.bind(this);

        this.domElement.find('.searchButton').click(this.handleSearch);
        this.domElement.find('.questionIcon').click(this.handleSearch);
        
        this.domElement.find('.searchContainer .closeButton ').click(this.hideSearch);
        this.domElement.find('.addItems').click(this.showSearch);
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
        let renderedItems = this.items.map(item => item.renderSearch(true));
        this.domList.append(renderedItems);
    }

    showSearch() {
        setAccordion(false);
        this.domElement.find('.searchContainer').show();
    }

    showDetails() {
        setAccordion(false);
        this.domElement.find('.informationContainer').show();
    }

    hideList() {
        this.domElement.find('.contentContainer').hide();
    }

    hideSearch() {
        setAccordion(true);
        this.domElement.find('.searchContainer').hide();
    }

    hideDetails() {
        setAccordion(true);
        this.domElement.find('.informationContainer').hide();       
    }
}