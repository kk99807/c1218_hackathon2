class PartyItems {
    constructor(domElement, items) {
        this.domElement = domElement;
        this.domSearch = this.domElement.find('.search');
        this.domSearchResults = this.domElement.find('.listItems');
        this.domList = this.domElement.find('.contentContainer');

        this.items = items || [];
    }

    bindEvents() {
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this.hideSearch = this.hideSearch.bind(this);

        this.domElement.find('.searchButton').click(this.handleSearch);
        this.domElement.find('.searchContainer .closeButton ').click(this.hideSearch);
        this.domElement.find('.addNew').click(this.showSearch); 
    }

    handleSearch() {
        this.asyncSearch()
            .then(items => items.map(item => item.renderSearch()))
            .then(items => this.domSearchResults.empty().append(items));
    }

    /**
     * 
     * @param {PartyItem} item 
     * @param {string} eventType - add|remove|view
     */
    handleItemClick(item, eventType) {
        console.log('PartyItems::handleItemClick item=', item, '; eventType=', eventType);
        if (eventType === 'view') {
            this.showDetails(item);
        }
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

    showDetails(item) {
        setAccordion(false);
        this.domElement.find('.informationContainer').append(item.renderDetails()).show();
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