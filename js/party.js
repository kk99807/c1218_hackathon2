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
        $('#startDate').on('change', event => validateDetailsForm());
        $('#endDate').on('change', event => validateDetailsForm());
        $('#pickStartTime').on('change', event => validateDetailsForm());
        $('#pickEndTime').on('change', event => validateDetailsForm());

        this.addInviteDOM.find('.closeButton').click(target => this.addInviteDOM.hide());
    }

    showNextContainer() {

        // Clear any previous display
        $('.results-wrapper').empty();

        // Hide other elements
        $('.editParty').hide();
        $('.parties').hide();
        this.containers.forEach(container => container.domElement.hide());

        this.currentContainerIndex++;
        if (this.currentContainerIndex === this.containers.length) {
            app.showParties();
        } else {
            let container = this.containers[this.currentContainerIndex];
            container.loadData();

            const items = container.items || [];
            const cards = items.map(item => item.renderSearch(true));
            container.domElement.find('.results-wrapper').append(cards);
            container.domElement.find('.badge').text(cards.length);

            container.domElement.show();
        }
    }

    /**
     * Save Event Details and create a calendar entry on user request to update details
     */
    handleUpdateDetails() {

        // Capture user inputs
        this.title = $('#inputTitle').val();
        this.startDate = $('#startDate').val();
        this.startTime = $('#pickStartTime').val();
        this.endDate = $('#endDate').val();
        this.endTime = $('#pickEndTime').val();
        app.save();

        // Clear form
        $('#inputTitle').val('');
        $('#startDate').val('');
        $('#pickStartTime').val('');
        $('#endDate').val('');
        $('#pickEndTime').val('');

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