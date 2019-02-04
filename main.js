$(document).ready(initApp);

let app = null;

function initApp() {
<<<<<<< HEAD
    music = document.getElementById("player");
    music.playbackRate = 1.32;
    party = new Party();
    party.start();
    $('.main').on('click','.section', showAccordion);
    $('.startButton').on('click', hideLanding);
    $('.datepicker').datepicker({format: 'mm/dd/yyyy'});
    $('.details .informationContainer .btn').css('margin', '20px');
    //sky added
    
=======
    app = new App();
>>>>>>> 65120abccc420137e01c32a6eda5b13a5ef5728a
}

