/** Class for searching and managing music selections. */
class MusicItems extends PartyItems {

    /**
     * @constructor
     * @param {*} domElement - jQuery selector for the top-level DOM element used to visualize this set of items
     * @param {*} items - OPTIONAL List of initial music selections
     */
    constructor(domElement, items) {
        super(domElement, items);
        this.bindEvents();
        this.domElement.find('.musicSearchButton').click(this.handleSearch);
    }

    /**
     * Called by PartyItems superclass when user requests a search to retrieve music items
     * @returns {Promise} a Promise to retrieve an array of VideoItem
     */
    asyncSearch() {
        return new Promise((resolve, reject) => {
            var searchQuery = $('.musicSearchInput').val();
            searchQuery = searchQuery || 'bigbang';
            $.ajax({
                method: 'post',
                dataType: 'json',
                url: 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
                data: {q: `${searchQuery} music`, maxResults: 8},
                success: data => {
                    let items = data.video.map(item => new VideoItem(
                        item.id,
                        item.title,
                        `http://i3.ytimg.com/vi/${item.id}/hqdefault.jpg`,
                        this.handleItemClick,
                        {},
                        $('.musicHeader .badge')
                    ));
                    resolve(items);

                },
                error: function (error) {
                    throw new Exception("You're data request failed");
                }
            });
        });
    }


}

