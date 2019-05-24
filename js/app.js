class App {

    /**
     * @constructor
     * @param {[]} parties - Array of parties already created by user
     */
    constructor( parties ) {
        this.parties = parties || [];
        this.currentPartyIndex = null;

        this.initDOM();
    }

    initDOM() {
        this.hideLanding = this.hideLanding.bind(this);
        this.startNewParty = this.startNewParty.bind(this);

        $('.startButton').on('click', this.hideLanding);
        $('.btnNewParty').on('click', this.startNewParty);
        $('.backToParties').click(this.goToParties);
        $('.details, .cocktail, .food, .music, .parties, .editParty, .addedItems, .itemInfo').hide();
        $('.datepicker').datepicker({format: 'mm/dd/yyyy', autoClose: true});
        $('.timepicker').timepicker();
        $('.collapsible').collapsible();
        $('.tabs').tabs();
        $('.searchResults').slick({
            slidesToShow: 2,
            slidesToScroll: 3,
            autoplay: true,
            autoplaySpeed: 1500,
            swipe: true,
            adaptiveHeight: true,
            touchMove: true,
            centerMode: true,
        });

        $('.btnNext').click(event => this.currentParty.showNextContainer());

        $( "#detailsForm" ).submit( event => {
            this.currentParty.handleUpdateDetails();
            event.preventDefault();
        });
    }
    
    hideLanding(){
        $('.landing').hide();

        if (localStorage.data) {
            this.load();
            this.showParties();
        } else {
            this.startNewParty();
        }
    }

    goToParties(){
        $('.editParty').hide();
        $('.parties').show();
    }

    startNewParty() {
        $('.badge').text("0");

        // Create new Party instance
        let party = new Party(`Untitled Party ${this.currentPartyIndex}`);
        this.parties.push(party);
        this.currentPartyIndex = this.parties.length - 1;

        // Hide Parties page
        $('.parties').hide();

        // Show Details
        party.showNextContainer();
    }

    showParties() {
        let container = $('.parties').find('.partyDetails');
        container.empty();

        let partyElements = this.parties.map(party => {
            let html = $('#templatePartyCard').html();
            html = $(html);
            html.find('.card-title').text(party.title);
            html.find('.startTS').text(`${party.startDate} ${party.startTime}`);
            html.find('.endTS').text(`${party.endDate} ${party.endTime}`);
            html.find('.cocktailsCount').text( party.cocktailItems.items.length );
            html.find('.foodCount').text( party.foodItems.items.length );
            html.find('.musicCount').text( party.musicItems.items.length );
            html.find('.btnEditParty').click( event => this.showParty(party) );
            return html;
        });
        container.append(partyElements);
        
        $('.parties').show();
    } 

    showParty( party ) {

        // Clear previous display
        $('.detailsBody').empty();
        $('.cocktailsBody').empty();
        $('.foodBody').empty();
        $('.musicBody').empty();

        // Add display for current party
        party.cocktailItems.items.map(item => {
            let partyItemContainer = $('<div>');
            partyItemContainer.append(item.renderSearch(true));
            partyItemContainer.appendTo($('.cocktailsBody'));
            $('.modal').modal();
        });
        party.foodItems.items.map(item => {
            let partyItemContainer = $('<div>');
            partyItemContainer.append(item.renderSearch(true));
            partyItemContainer.appendTo($('.foodBody'));
            $('.modal').modal();
        });
        party.musicItems.items.map(item => {
            let partyItemContainer = $('<div>');
            let videoContainer = $('<div>').addClass('musicInfo editMusicInfo');
            partyItemContainer.append(item.renderSearch(true), videoContainer);
            partyItemContainer.appendTo($('.musicBody'));

        });
        let startDate = $('<p>').text(`Start Date: ${party.startDate}`);
        let startTime = $('<p>').text(`Start Time: ${party.startTime}`);
        let endDate = $('<p>').text(`End Date: ${party.endDate}`);
        let endTime = $('<p>').text(`End Time: ${party.endTime}`);
        $('.detailsBody').append(startDate, startTime, endDate, endTime);

        // Show display
        $('.parties').hide();
        $('.editParty').show();
    }

    /**
     * @returns {Party} - the Party actively being edited
     */
    get currentParty() {
        return this.parties[this.currentPartyIndex];
    }

    /**
     * Save data to local storage
     */
    save() {
        const getItemInfo = item => {
            return {
                id: item.id, 
                name: item.name, 
                imageURL: item.imageURL, 
                props: item.props
            }
        };

        const data = this.parties.map(party => {
            const {title, startDate, startTime, endDate, endTime} = party;
            return {
                title, 
                startDate, 
                startTime, 
                endDate, 
                endTime,
                cocktailItems: party.cocktailItems.items.map(getItemInfo),
                foodItems: party.foodItems.items.map(getItemInfo),
                musicItems: party.musicItems.items.map(getItemInfo)
            }
        });

        localStorage.data = JSON.stringify(data);
    }

    /**
     * Load data from local storage
     */
    load() {
        if (!localStorage.data) return;

        const data = JSON.parse(localStorage.data);

        this.parties = data.map(partyInfo => {
            const {title, startDate, startTime, endDate, endTime} = partyInfo;
            const party = new Party(title, startDate, startTime, endDate, endTime);

            const containers = {
                cocktailItems: RecipeItem,
                foodItems: RecipeItem, 
                musicItems: VideoItem
            };

            Object.entries(containers).forEach(([container, itemConstructor]) => {
                partyInfo[container].forEach(itemInfo => {
                    const {id, name, imageURL, props, badgeSelector} = itemInfo;
                    const eventCallback = party[container].handleItemClick;
                    const badge = party[container].domElement.find('.badge');
                    const item = new itemConstructor(id, name, imageURL, eventCallback, props, badge);
                    party[container].items.push(item);
                });
            });

            return party;
        });
    }
}