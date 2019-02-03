/** Main Application Class - Used to initialize app & holds collections of party items. */
class Party {
    
    /**
     * Create initial collections that can be used to search and manage party items.
     * @constructor
     */
    constructor(title, date, startTime, endTime) {
        this.title = title;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.eventKey = null;

        this.addInviteDOM = $('.details .informationContainer');

        this.partyOrganizer = {
            music: new MusicItems($('.music'))
        };
        this.partyOrganizer.foods = new FoodItems($('.food'), this.partyOrganizer.music);
        this.partyOrganizer.cocktails =  new CocktailItems($('.cocktail'), this.partyOrganizer.foods);

        this.handleUpdateDetails = this.handleUpdateDetails.bind(this);

        $('.readyToPartyButton').click(this.handleUpdateDetails);
        this.addInviteDOM.find('.closeButton').click(target => this.addInviteDOM.hide());
    }

    /**
     * Start the app
     */
    // start() {
    //     this.partyOrganizer.foods.showList();
    //     this.partyOrganizer.cocktails.showList();
    //     this.partyOrganizer.music.showList();
    // }

    /**
     * Save Event Details and create a calendar entry on user request to update details
     */
    handleUpdateDetails() {
        this.title = $('#inputTitle').val();
        this.date = $('#pickDate').val();
        this.startTime = $('#pickStartTime').val();
        this.endTime = $('#pickEndTime').val();

        this.asyncCreateCalendarEntry()
            .then(eventKey => {
                this.eventKey = eventKey;
                $('.eventLink').attr('href', `http://evt.to/${eventKey}`);
                this.addInviteDOM.show();
            });
    }

    /**
     * @returns {Promise} a Promise to return an eventKey from the Calendar Invite API
     */
    asyncCreateCalendarEntry() {
        const {title, date, startTime, endTime} = this;
        const CALENDAR_API_URL = 'https://www.addevent.com/dir/link/add/';
        
        let data = {
            client: CALENDAR_API_CLIENT_ID,
            start: `${date} ${startTime}`,
            end: `${date} ${endTime}`,
            title: title
        };

        return new Promise((resolve, reject) => {
            $.getJSON( CALENDAR_API_URL, data, response => resolve(response.data.uniquekey));
        });
    }
}