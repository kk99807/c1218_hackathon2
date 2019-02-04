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

        this.containers = [
            new DetailsContainer($('.details')),
            new CocktailItems($('.cocktail')),
            new FoodItems($('.food')),
            new MusicItems($('.music'))
        ];

        this.currentContainerIndex = -1;

        this.bindEvents();
    }

    bindEvents() {
        this.handleUpdateDetails = this.handleUpdateDetails.bind(this);
        this.showNextContainer = this.showNextContainer.bind(this);

        // $('.readyToPartyButton').click(this.handleUpdateDetails);
        $('.btnNext').click(this.showNextContainer);
        this.addInviteDOM.find('.closeButton').click(target => this.addInviteDOM.hide());
    }

    showNextContainer() {
        this.containers.forEach(container => container.domElement.hide());

        this.currentContainerIndex++;
        if (this.currentContainerIndex === this.containers.length) {
            $('.parties').show();
        } else {
            let container = this.containers[this.currentContainerIndex];
            container.preloadData();
            container.domElement.show();
        }
    }

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