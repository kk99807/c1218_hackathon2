/** Main Application Class - Used to initialize app & holds collections of party items. */

const DATE_PATTERN = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
const TIME_PATTERN = /^(2[0-3]|[01][0-9]):[0-5][0-9] [AP]M$/;

class Party {

    /**
     * Create initial collections that can be used to search and manage party items.
     * @constructor
     */
    constructor(title, startDate, startTime, endDate, endTime) {
        this.title = title;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
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

        $( "#detailsForm" ).submit( event => {
            this.handleUpdateDetails();
            event.preventDefault();
        });

        $('#startDate').on('change', event => this.validateInputs());
        $('#endDate').on('change', event => this.validateInputs());

        $('.btnNext').click(this.showNextContainer);
        this.addInviteDOM.find('.closeButton').click(target => this.addInviteDOM.hide());
    }

    validateInputs() {
        // Get DOM elements
        let inputs = {
            startDate: $('#startDate')[0],
            endDate: $('#endDate')[0],
            startTime: $('#pickStartTime')[0],
            endTime: $('#pickEndTime')[0]
        };

        // Initialize all inputs to valid
        Object.values(inputs).forEach(input => {
            input.setCustomValidity("");
        });

        // Parse dates
        let startDate = Date.parse(inputs.startDate.value);
        let endDate = Date.parse(inputs.endDate.value);
        let today = this.getToday();

        // Enforce DATE & TIME formats for use with Materialize Pickers

        // Check Start Date
        if (inputs.startDate.value) {
            if (!DATE_PATTERN.test(inputs.startDate.value) || isNaN(startDate)) {
                inputs.startDate.setCustomValidity("Valid date in MM/DD/YYYY format required");
            } else if (startDate < today) {
                inputs.startDate.setCustomValidity("Cannot create a party in the past");
            }
        } 

        // Check End Date
        if (inputs.endDate.value) {
            if (!DATE_PATTERN.test(inputs.endDate.value) || isNaN(endDate)) {
                inputs.endDate.setCustomValidity("Valid date in MM/DD/YYYY format required");
            } else if (endDate < today) {
                inputs.endDate.setCustomValidity("Cannot create a party in the past");
            }
        }

        // Combined checks
        if (startDate && endDate) {
            if (inputs.startDate.checkValidity() && inputs.endDate.checkValidity() && endDate < startDate) {
                inputs.endDate.setCustomValidity("End date must be or or after start date");
            }

            if (inputs.startTime.value && inputs.endTime.value) {
                let startTime = Date.parse(inputs.startDate.value + ' ' + inputs.startTime.value);
                let endTime = Date.parse(inputs.endDate.value + ' ' + inputs.endTime.value);

                if (!TIME_PATTERN.test(inputs.startTime.value) || isNaN(startTime)) {
                    inputs.startTime.setCustomValidity("Valid time in HH:MM PM format required");
                }

                if (!TIME_PATTERN.test(inputs.endTime.value) || isNaN(endTime)) {
                    inputs.endTime.setCustomValidity("Valid time in HH:MM PM format required");
                }

                if (startTime && endTime && endTime <= startTime) {
                    inputs.endTime.setCustomValidity("End time must be after start time");
                }
            }
        } 
    }

    showNextContainer() {
        this.containers.forEach(container => container.domElement.hide());

        this.currentContainerIndex++;
        if (this.currentContainerIndex === this.containers.length) {
            app.showParties();
        } else {
            let container = this.containers[this.currentContainerIndex];
            container.loadData();
            container.domElement.show();
        }
    }

    /**
     * Save Event Details and create a calendar entry on user request to update details
     */
    handleUpdateDetails() {
        this.title = $('#inputTitle').val();
        this.startDate = $('#startDate').val();
        this.startTime = $('#pickStartTime').val();
        this.endDate = $('#endDate').val();
        this.endTime = $('#pickEndTime').val();

        this.asyncCreateCalendarEntry()
            .then(eventKey => { 
                this.eventKey = eventKey;
                // $('.eventLink').attr('href', `http://evt.to/${eventKey}`);
                // this.addInviteDOM.show();
            });

        this.showNextContainer();
    }

    /**
     * @returns {Promise} a Promise to return an eventKey from the Calendar Invite API
     */
    asyncCreateCalendarEntry() {
        const {title, startDate, startTime, endDate, endTime} = this;
        const CALENDAR_API_URL = 'https://www.addevent.com/dir/link/add/';
        
        let data = {
            client: CALENDAR_API_CLIENT_ID,
            start: `${startDate} ${startTime}`,
            end: `${endDate} ${endTime}`,
            title: title
        };

        return new Promise((resolve, reject) => {
            $.getJSON( CALENDAR_API_URL, data, response => resolve(response.data.uniquekey));
        });
    }

    //**********************************************************************************************/
    // CONVENIENCE METHODS
    //**********************************************************************************************/

    get cocktailItems() {
        return this.containers[1];
    }

    get foodItems() {
        return this.containers[2];
    }

    get musicItems() {
        return this.containers[3];
    }

    /**
     * @returns Today's date without time, as a numeric timestamp
     */
    getToday() {
        let now = new Date();
        let todayText = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate(); 
        return new Date(todayText).getTime();       
    }
}