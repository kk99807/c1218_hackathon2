const WIZARD_MODE = 0;
const EDIT_MODE = 1;

class App {

    /**
     * @constructor
     * @param {[]} parties - Array of parties already created by user
     */
    constructor( parties ) {
        this.mode = WIZARD_MODE;
        this.parties = parties || [];
        this.currentPartyIndex = null;

        this.initDOM();
    }

    initDOM() {
        this.hideLanding = this.hideLanding.bind(this);
        this.startNewParty = this.startNewParty.bind(this);
        this.deleteCurrentParty = this.deleteCurrentParty.bind(this);

        $('.startButton').on('click', this.hideLanding);
        $('.btnNewParty').on('click', this.startNewParty);
        $('#deletePartyConfirm').on('click', this.deleteCurrentParty);
        $('.editParty').on('click', '.backToParties', this.goToParties);
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

        $('.modal').modal();
    }

    hideLanding(){
        $('.landing').hide();

        if (localStorage.data) {
            this.load();
        }

        if (this.parties.length) {
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

    deleteCurrentParty() {
        this.parties.splice(this.currentPartyIndex, 1);
        this.save();
        this.showParties();
    }

    showParties() {
        let container = $('.parties').find('.partyDetails');
        container.empty();
        var addPartyButton = $('<button>').addClass('btn-large btnNewParty').text('New Party').on('click', this.startNewParty);
        $('.partyDetails').append(addPartyButton);
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
            html.find('.btnDeleteParty').click( event => {
                this.currentParty = party;
                $('#deletePartyModal').modal('open');
            });
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

        // Buttons
        const searchIcon = $('<i>').addClass('material-icons').text('search');
        const backIcon = $('<i>').addClass('material-icons').text('arrow_back');
        const searchButton = $('<button>').addClass('btn-floating btn-large searchFromEdit');
        const backButton = $('<button>').addClass('btn-floating btn-large backToParties');
        const buttonPanel = $('<div>').addClass('floatingButtonPanel');

        searchButton.append(searchIcon);
        backButton.append(backIcon);
        buttonPanel.append(searchButton, backButton);

        const containers = [$('.cocktailsBody'),$('.foodBody'),$('.musicBody'),$('.detailsBody')];
        containers.forEach((container, index) => {
            const buttons = buttonPanel.clone();
            container.append(buttons);

            buttons.find('.searchFromEdit').click(event => {
                app.currentParty = party;

                // Index will be incremented in party.showNextContainer
                party.currentContainerIndex = index;
                party.showNextContainer();
            });
        })

        // Add display for current party
        party.cocktailItems.items.map(item => {
            let partyItemContainer = $('<div>');
            partyItemContainer.append(item.renderSearch(true));
            partyItemContainer.appendTo($('.cocktailsBody'));
        });
        party.foodItems.items.map(item => {
            let partyItemContainer = $('<div>');
            partyItemContainer.append(item.renderSearch(true));
            partyItemContainer.appendTo($('.foodBody'));
        });
        party.musicItems.items.map(item => {
            let partyItemContainer = $('<div>');
            let videoContainer = $('<div>').addClass('musicInfo editMusicInfo');
            partyItemContainer.append(item.renderSearch(true), videoContainer);
            partyItemContainer.appendTo($('.musicBody'));

        });
        $('.modal').modal();

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
     * @param {Party} party - the Party to make active
     */
    set currentParty(party) {
        let index = this.parties.indexOf(party);
        if (index != -1) this.currentPartyIndex = index;       
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