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

        $('.startButton').on('click', this.hideLanding);
        $('.goToDetails').click(this.goToDetails);
        $('.backToParties').click(this.goToParties);
        $('.details, .cocktail, .food, .music, .parties, .editParty, .addedItems, .itemInfo').hide();
        $('.datepicker').datepicker({format: 'mm/dd/yyyy'});
        $('.timepicker').timepicker();
        $('.collapsible').collapsible();
    
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
    }
    
    hideLanding(){
        $('.landing').hide();

        if (this.parties.length === 0) {
            let party = this.newParty();
            party.showNextContainer();
        } else {
            // TODO: Show Parties Page
        }
    }

    goToDetails(){
        $('.parties').hide();
        $('.details').show();
    }

    goToParties(){
        $('.editParty').hide();
        $('.parties').show();
    }

    newParty() {
        this.currentPartyIndex = this.parties.length;
        let party = new Party(`Untitled Party ${this.currentPartyIndex}`);
        this.parties.push(party);

        return party;
    }

    showParties() {
        let partyElements = this.parties.map(party => {
            let html = $('#templatePartyCard').html();
            html = $(html);
            html.find('.card-title').text(party.title);
            html.find('.datetime').text(`${party.date} ${party.startTime} - ${party.date} ${party.endTime}`);
            html.find('.cocktailsCount').text( party.cocktailItems.items.length );
            html.find('.foodCount').text( party.foodItems.items.length );
            html.find('.musicCount').text( party.musicItems.items.length );
            html.find('.btnAddToCalendar').attr('href', `http://evt.to/${party.eventKey}`);
            html.find('.btnEditParty').click( event => this.showParty(party) );
            return html;
        });
        $('.parties').find('.partyDetails').append(partyElements);
        $('.parties').show();
    } 

    showParty( party ) {

        $('.parties').hide();
        $('.editParty').show();

        party.cocktailItems.items.map(item => {
            let partyItemContainer = $('<div>');
            partyItemContainer.append(item.card);
            partyItemContainer.appendTo($('.cocktailsBody'));
        });
        party.foodItems.items.map(item => {
            let partyItemContainer = $('<div>');
            partyItemContainer.append(item.card);
            partyItemContainer.appendTo($('.foodBody'));
        });
        party.musicItems.items.map(item => {
            let partyItemContainer = $('<div>');
            partyItemContainer.append(item.card);
            partyItemContainer.appendTo($('.musicBody'));
        });
        let date = $('<p>').text(`Date: ${party.date}`);
        let startTime = $('<p>').text(`Start Time: ${party.startTime}`);
        let endTime = $('<p>').text(`End Time: ${party.endTime}`);
        $('.detailsBody').append(date, startTime, endTime);
    }
}