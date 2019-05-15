/** Main Application Class - Used to initialize app & holds collections of party items. */

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

        $('#startDate').on('change', event => validateDetailsForm());
        $('#endDate').on('change', event => validateDetailsForm());

        $('.btnNext').click(this.showNextContainer);
        this.addInviteDOM.find('.closeButton').click(target => this.addInviteDOM.hide());
    }

    showNextContainer() {
        // Clear any previous display
        $('.results-wrapper').empty();

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
        app.save();

        this.showNextContainer();
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

}