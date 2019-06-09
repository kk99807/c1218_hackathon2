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

        this.domElement.find('.collection-item').click(this.badgeClickHandler);

        this.domElement.find('.searchButton').click(this.handleSearch);
        // this.domElement.find('.searchContainer .closeButton ').click(this.hideSearch);
        // this.domElement.find('.informationContainer .closeButton').click(this.hideDetails);
        // this.domElement.find('.addItems').click(this.showSearch);

        // this.domElement.find('.musicSearchButton').click(this.newPageSearchHandler);
        // this.domElement.find('.newSearchCloseButton').click(this.newSearchCloseButtonHandler);
    }

    /**
     * Perform search using async search method implemented in subclasses & display results
     */
    handleSearch() {
/*
        let spinner = $('<i>').addClass('fa fa-spinner fa-spin');
        $('.listItems').append(spinner);
        $('.newPageSearchContainer').append(spinner);

        this.asyncSearch()
            .then(items => items.map(item => item.renderSearch()))
            .then(items => {
                this.domSearchResults.empty().append(items);
                this.domElement.find('.newPageSearchContainer').append(items);
                $('.fa-spinner').remove();
            });
*/
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
            if(item instanceof VideoItem) {
                $('.musicInfo').empty();
                item.renderDetails();
                $('.musicInfo').show();
            }

        } else if (eventType === 'delete') {
            item.badge.text(--badgeValue);

            M.toast({html:'Item has been deleted', classes: 'toastPlacement',displayLength:1000});
            $('.toast').css('background-color', 'red');
            this.items = this.items.filter(element => element !== item);
            $(item.card).fadeOut(() => $(item.card).remove());

        } else if (eventType === 'add') {
            let addedFlag = false;
            for(let i = 0; i < this.items.length; i++){
                if(item.id === this.items[i].id){
                    addedFlag = true;
                    break;
                }
            }
            if(addedFlag){
                M.toast({html:'Item has already been added', classes: 'toastPlacement',displayLength:1000});
                $('.toast').css('background-color', 'blue');
            }else{
                this.items.push(item);
                this.domElement.find('.results-wrapper').append(item.renderSearch(true));
                item.card = item.renderSearch(true);
                item.badge.text(++badgeValue);
                M.toast({html:'Item has been added', displayLength:1000}); 
                $('.toast').css('background-color', 'green');
            }
            
        }

        app.save();
    }

    /**
     * Show details for a selected Party Item
     * @param {PartyItem} item 
     */
    showDetails(item) {
        this.domElement.find('.informationContainer .displayContainer')
            .empty()
            .append(item.renderDetails());
        this.domElement.find('.informationContainer').show();
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
                        slidesToScroll: 3,
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

    // newPageSearchHandler(){
    //     this.domElement.find('.newPageSearchContainer').show();
    //     this.handleSearch();
    // }

    // newSearchCloseButtonHandler() {
    //     this.domElement.find('.newPageSearchContainer').hide();
    // }
}