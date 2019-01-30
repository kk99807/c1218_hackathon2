$(document).ready(initApp);

let party = null;

function initApp() {
    party = new Party();
    party.start();
    $('.main').on('click','.section', showAccordion);
    $('.startButton').on('click', hideLanding)
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
}
