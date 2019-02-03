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
        // this.showSearch = this.showSearch.bind(this);
        // this.hideSearch = this.hideSearch.bind(this);
        // this.hideDetails = this.hideDetails.bind(this);
        this.badgeClickHandler = this.badgeClickHandler.bind(this);
        this.newPageSearchHandler = this.newPageSearchHandler.bind(this);
        this.newSearchCloseButtonHandler = this.newSearchCloseButtonHandler.bind(this);
        this.domElement.find('.badge').click(this.badgeClickHandler);

        this.domElement.find('.searchButton').click(this.handleSearch);
        // this.domElement.find('.searchContainer .closeButton ').click(this.hideSearch);
        // this.domElement.find('.informationContainer .closeButton').click(this.hideDetails);
        // this.domElement.find('.addItems').click(this.showSearch);

        this.domElement.find('.musicSearchButton').click(this.newPageSearchHandler);
        this.domElement.find('.newSearchCloseButton').click(this.newSearchCloseButtonHandler);
    }

    /**
     * Perform search using async search method implemented in subclasses & display results
     */
    handleSearch() {
        let spinner = $('<i>').addClass('fa fa-spinner fa-spin');
        $('.listItems').append(spinner);
        $('.newPageSearchContainer').append(spinner);

        this.asyncSearch()
            // .then(items => items.map(item => item.renderSearch()))
            .then(items => {
                // this.domSearchResults.empty().append(items);
                this.domSearchResults.append(items);
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
            this.items.push(item);   
            this.domList.append(item.renderSearch(true));

            let badgeValue = item.badge.text();
            item.badge.text(++badgeValue);

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

    // /**
    //  * Show a search screen for party items of this type
    //  */
    // showSearch() {
    //     setAccordion(false);
    //     this.domElement.find('.searchContainer').show();
    // }

    // /**
    //  * Show details for a selected Party Item
    //  * @param {PartyItem} item 
    //  */
    // showDetails(item) {
    //     setAccordion(false);
    //     this.domElement.find('.informationContainer .displayContainer')
    //         .empty()
    //         .append(item.renderDetails());
    //     this.domElement.find('.informationContainer').show();
    // }

    // /**
    //  * Hide the search screen for items of this type
    //  */
    // hideSearch() {
    //     setAccordion(true);
    //     this.domElement.find('.searchContainer').hide();
    // }


    // /**
    //  * Hide the details screen for items of this type
    //  */
    // hideDetails() {
    //     setAccordion(true);
    //     this.domElement.find('.informationContainer').hide();       
    // }


    nextHandlerSearch(){
        this.nextElement.asyncSearch()
            .then(items => {
                items.map(item => {

                    let img = $('<img>').attr('src', item.imageURL);

                    let div = $('<div>');
                    img.click(target => {
                        this.nextElement.handleItemClick(item, 'add');
                        div.remove();
                    });
                    div.append(img);
                    $('.searchResults').append(div).slick('unslick').slick({
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 1500,
                        swipe: true,
                        adaptiveHeight: true,
                        touchMove: true,
                        centerMode: true,
                    });


                })
            });
    }

    badgeClickHandler(){
        let addedItemContainer = $('<div>').addClass('addedItemContainer');
        let addedItemContainerHeader = $('<p>').text('Your Selections').css({
            'text-align': 'center',
            'color': 'white'
        });

        let closeButtonAddedItemContainer = $('<i>')
            .addClass('material-icons closeButtonAddedItem')
            .text('close')
            .css('color', 'white')
            .click(this.closeButtonAddedItemHandler);

        addedItemContainer.append(closeButtonAddedItemContainer, addedItemContainerHeader,this.items.map(item => item.renderSearch()));
        this.domElement.append(addedItemContainer);
    }

    closeButtonAddedItemHandler(){
        $('.addedItemContainer').hide();
    }

    newPageSearchHandler(){
        this.domElement.find('.newPageSearchContainer').css('background-color', 'black').show();
        this.handleSearch();
    }

    newSearchCloseButtonHandler() {
        this.domElement.find('.newPageSearchContainer').hide();
    }
}