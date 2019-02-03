$(document).ready(initApp);

let party = null;
let music;

function initApp() {
    music = document.getElementById("player");
    //music.playbackRate = 1.32;
    party = new Party();
    party.start();
    $('.main').on('click','.section', showAccordion);
    $('.startButton').on('click', hideLanding);
    $('.datepicker').datepicker({format: 'mm/dd/yyyy'});
    $('.details .informationContainer .btn').css('margin', '20px');

    $('.searchResults').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        swipe: true,
        adaptiveHeight: true,
        touchMove: true,
        centerMode: true,
    });

    $('.slick-prev, .slick-next').text('');
}

function setAccordion( active ) {
    if (active) {
        $('.main').on('click','.section', showAccordion);
    } else {
        $('.main').off('click');
    }
}

function showAccordion(){
    $('.sectionTitle').show();
    $('.contentContainer, .contentContainerTitle, .wholeContainer').hide();
    $('.section').css('flex','1');
    $(this).find('.sectionTitle').hide();
    $(this).css('flex','7 30%');
    $(this).find('.wholeContainer').show();
    $(this).find('.contentContainerTitle').show();
    $(this).find('.contentContainer').show(); 
}

function hideLanding(){
    $('.landing').hide();
    music.pause();
}












