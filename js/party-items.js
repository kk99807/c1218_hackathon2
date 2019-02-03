/** Base class for searching and managing a set of party items. */
class PartyItems {

    /**
     * @constructor
     * @param {*} domElement - jQuery selector for the top-level DOM element used to visualize this set of items
     * @param {[]} items - OPTIONAL List of initial party items
     */
    constructor(domElement, nextElement, items) {
        this.domElement = domElement;
        this.domSearchResults = this.domElement.find('.listItems');
        this.domList = this.domElement.find('.contentContainer');
        this.nextElement = nextElement;

        this.items = items || [];
    }

    /**
     * Bind event handlers and attach to DOM elements
     */
    bindEvents() {
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this.hideSearch = this.hideSearch.bind(this);
        this.hideDetails = this.hideDetails.bind(this);

        this.domElement.find('.searchButton').click(this.handleSearch);
        this.domElement.find('.searchIcon').click(this.handleSearch);
        
        this.domElement.find('.searchContainer .closeButton ').click(this.hideSearch);
        this.domElement.find('.informationContainer .closeButton').click(this.hideDetails);
        this.domElement.find('.addItems').click(this.showSearch);

    }

    /**
     * Perform search using async search method implemented in subclasses & display results
     */
    handleSearch(target) {
        let spinner = $('<i>').addClass('fa fa-spinner fa-spin');
        $('.listItemContainer').append(spinner);

        this.asyncSearch(target)
            .then(items => items.map(item => item.renderSearch()))
            .then(items => {
                this.domSearchResults.empty().append(items);
                $('.fa-spinner').remove();
            });
    }

    /**
     * Add or delete a party item from current selection or view its details
     * 
     * @param {PartyItem} item - The party item represented by the clicked DOM element
     * @param {string} eventType - add|delete|view
     */
    handleItemClick(item, eventType) {
        if (eventType === 'view') {
            this.showDetails(item);
        } else if (eventType === 'delete') {
            M.toast({html:'Item has been deleted', displayLength:1000});
            $('.toast').css('background-color', 'red');
            this.data = this.data.filter(element => element !== item);
            item.fadeOut(() => item.remove());
        } else if (eventType === 'add') {
            console.log(item);
            console.log(item instanceof VideoItem);
            this.items.push(item);   
            this.domList.append(item.renderSearch(true));
            M.toast({html:'Item has been added', displayLength:1000}); 
            $('.toast').css('background-color', 'green');
        }
    }

    /**
     * Show the list of selected party items of this type
     */
    showList() {
        let renderedItems = this.items.map(item => item.renderSearch(true));
        this.domList.append(renderedItems);
    }

    /**
     * Show a search screen for party items of this type
     */
    showSearch() {
        setAccordion(false);
        this.domElement.find('.searchContainer').show();
    }

    /**
     * Show details for a selected Party Item
     * @param {PartyItem} item 
     */
    showDetails(item) {
        setAccordion(false);
        this.domElement.find('.informationContainer .displayContainer')
            .empty()
            .append(item.renderDetails());
        this.domElement.find('.informationContainer').show();
    }

    /**
     * Hide the search screen for items of this type
     */
    hideSearch() {
        setAccordion(true);
        this.domElement.find('.searchContainer').hide();
    }

    /**
     * Hide the details screen for items of this type
     */
    hideDetails() {
        setAccordion(true);
        this.domElement.find('.informationContainer').hide();       
    }
}