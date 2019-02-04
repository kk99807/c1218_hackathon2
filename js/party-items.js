/** Base class for searching and managing a set of party items. */
class PartyItems {

    /**
     * @constructor
     * @param {*} domElement - jQuery selector for the top-level DOM element used to visualize this set of items
     * @param {[]} items - OPTIONAL List of initial party items
     */
    constructor(domElement, items) {
        this.domElement = domElement;
        this.domSearchResults = this.domElement.find('.listItems');
        this.domList = this.domElement.find('.contentContainer');

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
        this.loadData = this.loadData.bind(this);
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
        this.loadData();
    }

    /**
     * Add or delete a party item from current selection or view its details
     * 
     * @param {PartyItem} item - The party item represented by the clicked DOM element
     * @param {string} eventType - add|delete|view
     */
    handleItemClick(item, eventType) {
        let badgeValue = item.badge.text();

        if (eventType === 'view') {
            this.showDetails(item);
        } else if (eventType === 'delete') {

            item.badge.text(--badgeValue);
            M.toast({html:'Item has been deleted', displayLength:1000});
            $('.toast').css('background-color', 'red');
            this.data = this.data.filter(element => element !== item);
            item.fadeOut(() => item.remove());


        } else if (eventType === 'add') {
            this.items.push(item);   
            this.domList.append(item.renderSearch(true));
            this.domElement.find('.addedItems').append(item.renderSearch(true));
            
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

    loadData(){
        let spinner = $('<i>').addClass('fa fa-spinner fa-spin');
        this.domList.append(spinner);

        this.asyncSearch()
            .then(items => {
                let itemElements = items.map(item => {
                    let p = $('<p>').text(item.name);
                    let img = $('<img>').attr('src', item.imageURL);
                    let div = $('<div>').addClass('slide');
                    img.click(target => {
                        this.handleItemClick(item, 'add');
                    });
                    div.append(img, p);
                    return div;
                });

                this.domSearchResults.slick('slickRemove', null, null, true);
                this.domSearchResults
                    .slick('unslick')
                    .empty()
                    .append(itemElements)
                    .slick({
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 1500,
                        swipe: true,
                        adaptiveHeight: true,
                        touchMove: true,
                        centerMode: true
                    });
                $('.slick-arrow').addClass('hidden');

                $('.fa-spinner').remove();

            });
    }

    badgeClickHandler(){
        $('.closeAddedItems').click(this.closeAddedItemsHandler);
        $('.addItems').hide();
        $('.addedItems').show();
    }

    closeAddedItemsHandler(){
        $('.addedItems').hide();
        $('.addItems').show();
    }

    newPageSearchHandler(){
        this.domElement.find('.searchResults').show();
        this.handleSearch();
    }

    newSearchCloseButtonHandler() {
        this.domElement.find('.newPageSearchContainer').hide();
    }

}