var counter = function(e) {

    var wrapper = $(".form__text");
    var length = wrapper.val().length;
    var maxLength = 650;


    if (length >= maxLength && ( e.keyCode != 8 ||  e.keyCode != 46 ) ) {

        $(".textarea__counter .textarea__counter-text").html( length );

        $(".textarea__counter-max").addClass("red");


    } else	{

        $(".textarea__counter-max").removeClass("red");
        $(".textarea__counter .textarea__counter-text").html( length );

    }




};

$(".form__text").bind('keyup', counter);
$(".form__text").bind('keydown', counter);


//Placeholder
$(".placeholder").focus(function() {

    $(this).removeClass("italic");

}).blur(function() {

    if( !$(this).val().length ) $(this).addClass("italic");

});

// accord

$(".service__button").on("click", function(){
    var t = $(this);


    $(".service__prices").stop().slideUp(300);

    t.next(".service__prices").stop().slideToggle(300, function () {

        if( $(this).is(":visible") ) $(this).css("display", "flex");

    });

});

// map

ymaps.ready(init);
var myMap,
    myPlacemark;

function init(){
    myMap = new ymaps.Map("map", {
        center: [48.783943, 44.578888],
        zoom: 17,
        controls : []
    });

    myPlacemark = new ymaps.Placemark([48.783943, 44.578888], {
        hintContent: 'АвтоДоп',
        balloonContent: 'Автосервис \ Мойка'
    });

    // Ползунок изменения масштаба
    myMap.controls.add('zoomControl', {
        float: 'none',
        position: { left: 10, top: 44 }
    });
    myMap.behaviors.disable(['scrollZoom']);
    myMap.geoObjects.add(myPlacemark);
}

// smooth scroll

$(document).ready(function () {
    $('.header__item-link').click(function (e) {

        var href = $(this).attr('href');

        $('html, body').animate({
            scrollTop:  $(href).offset().top
        }, 500);

        e.preventDefault();
    })
});

// button up

$(document).ready(function () {
    var btn = $('.wrapper__button');

    btn.on('click', function (e) {
       $('html, body').animate({
           scrollTop: 0
       }, 500);

        e.preventDefault();
    });

    $(window).on('scroll', function () {

        var t = $(this),
            height = t.height(),
            top = t.scrollTop();

        if(top > height) {
            if(!btn.is(':visible')) {
                btn.show();
            }
        }   else    {
            btn.hide();
        }

    });


});