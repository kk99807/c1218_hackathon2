class MusicItems extends PartyItems {
    constructor(domElement, items) {
        super(domElement, items);

        this.handleSearch = this.handleSearch.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this.hideSearch = this.hideSearch.bind(this);

        this.domElement.find('.searchButton').click(this.handleSearch);
        this.domElement.find('.searchContainer .closeButton ').click(this.hideSearch);
        this.domElement.find('.addNew').click(this.showSearch);
    }

    asyncSearch() {
        return new Promise((resolve, reject) => {
            $.ajax({
                method: 'post',
                dataType: 'json',
                url: 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
                data: {q: 'techno', maxResults: 5},
                success: function(data){
                    console.log(data);
                    // let items = data.drinks.map(item => new PartyItem(item.id, item.name, item.descriptionn, item.image, item.linkURL));
                    let items = data.video.map(item => new PartyItem(item.id, item.title, `http://i3.ytimg.com/vi/${item.id}/hqdefault.jpg`, {}));
                    resolve(items);
                    
                },
                error: function(error){
                    throw new Exception("You're data request failed");
                }
            });
        });
    }

    renderVideo(item){
        var video = $('<iframe>').attr({
            type: 'text/html',
            width: '100%',
            height: '100%',
            src: `https://www.youtube.com/embed/${item.id}`
        })
        return video;
    }

    asyncGetDetails( item ) {
        console.log('In CocktailItems.asyncGetDetails');
    }

    showDetails() {
        super.showDetails();
        
        console.log('PartyItems.showDetails');
    }
}