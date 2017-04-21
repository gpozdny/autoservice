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

    // Создаем ломаную с помощью вспомогательного класса Polyline.
    var myPolyline = new ymaps.Polyline([
        // Указываем координаты вершин ломаной.
        [48.785628, 44.577351],
        [48.784561, 44.579164],
        [48.784409, 44.578965],
        [48.784146, 44.579392],
        [48.783868, 44.579025]
    ], {
        // Описываем свойства геообъекта.
        // Содержимое балуна.
        balloonContent: "Ломаная линия"
    }, {
        // Задаем опции геообъекта.
        // Отключаем кнопку закрытия балуна.
        balloonCloseButton: false,
        // Цвет линии.
        strokeColor: "#ff1c26",
        // Ширина линии.
        strokeWidth: 4,
        // Коэффициент прозрачности.
        strokeOpacity: 0.9
    });

    // Добавляем линии на карту.


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
    myMap.geoObjects
        .add(myPlacemark)
        .add(myPolyline);
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
                btn.show(300, function () {
                    if( $(this).is(":visible") ) $(this).css("display", "flex");
                });

            }
        }   else    {
            btn.hide();
        }
    });


});


// gallery

$(document).on("click", "#gallery--pic .preview", function(e) {

    var t = $(this);

    var src = t.attr("src");

    var currentImg =  $('.gallery__pictures-pic[src="'+src+'"]');

    var next = currentImg.parent("li").next("li").find(".gallery__pictures-pic");

    if( !next.length ) {
        var next = $(".gallery__pictures-pic:first-child");
    }

    goImg( next.attr("src") );

    e.preventDefault();
    e.stopPropagation();

});



function goImg( src ) {

    var gallery = $("#gallery--pic");


    //Если нет галереи, добавляем
    if( !gallery.length ) {


        if( $("body").append('<div id="gallery--pic" class="fixed">'+
                '<div class="container__pic">'+
                '<i class="fa fa-times-circle close"></i>'+
                '<img class="preview" />'+
                '</div>'+
                '</div>') ) {

            var gallery = $("#gallery--pic");

            gallery.find(".preview").attr({"src": src});
            gallery.fadeIn(300);


        }

        //Иначе просто показываем и меняем ссылку у превью
    } else {

        gallery.find(".preview").attr({"src": src});
        gallery.fadeIn(300);

    }


    $("body, html").css({"overflow":"hidden"});


}

$(".gallery__pictures-pic").click(function() {

    var t = $(this);

    var src = t.attr("src");

    goImg( src );

});

$(document).on("click", ".fixed", function() {

    $("#gallery--pic").fadeOut(300);
    $("body, html").css({"overflow":"auto"});

});

// comparison
$(document).ready(function () {
    $('#myImageCompare, #myImageCompare1').imagesCompare();
});

// slider section

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

(function( $ ){

    $.fn.mySlider = function(contentClass, slideClass, time, interval) {

        var t = this;

        var content = t.find(contentClass);
        var slides = t.find(slideClass);

        var pointsClass = "points";
        var pointClass = "point";


        //Добавляем точки
        function renderPoints() {

            if( t.append('<div class="'+pointsClass+'"></div>') ) {

                var points = t.find("."+pointsClass);

                slides.each(function(i) {

                    $(this).attr({"slide": i});

                    points.append('<span class="'+pointClass+'" item="'+i+'"></span>');

                });

            }

            return true;

        }


        //Интервал карусели
        function sliderInterval() {

            return setInterval(function() {

                var active = t.find(".active_slide");


                var next = active.next(slideClass);

                //Если слайды закончились
                if( !next.length ) {

                    var i = 0;

                    content.animate({"left": 0}, time);

                    active.removeClass("active_slide");
                    t.find(slideClass+":first").addClass("active_slide");

                    $(".active_point").removeClass("active_point");
                    t.find("."+pointClass+'[item='+i+']').addClass("active_point");


                    return true;

                }

                content.stop().animate({"left": -next.position().left }, time, function() {

                    var i = next.attr("slide");

                    active.removeClass("active_slide");
                    next.addClass("active_slide");

                    $(".active_point").removeClass("active_point");
                    t.find("."+pointClass+'[item='+i+']').addClass("active_point");

                });


            }, interval);

        }

        var sliderIntervalID = sliderInterval();



        //Вешаем обработчик на батоны
        $(document).on("click", "."+pointsClass+" ."+pointClass, function() {

            var _this = $(this);

            if( _this.hasClass("active_point") ) return true;

            clearInterval( sliderIntervalID );

            var i = _this.attr("item");
            var next = t.find('[slide='+ i +']');

            var active = $(".active_slide");


            content.stop().animate({"left": -next.position().left }, time, function() {


                active.removeClass("active_slide");
                next.addClass("active_slide");

                $(".active_point").removeClass("active_point");
                t.find("."+pointClass+'[item='+i+']').addClass("active_point");

                //Запускаем интервал
                sliderIntervalID = sliderInterval();

            });

        })

        //Если батоны добавились, добавляем класс первой кнопке
        if( renderPoints() ) {

            t.find("."+pointsClass+" ."+pointClass+ ":first").addClass("active_point");
            t.find(slideClass+":first").addClass("active_slide");

        }

    };
})( jQuery );

$("#slider").mySlider(".slider__list", ".slider__item", 1000, 4000);
$("#feedback__slider").mySlider(".feedback__slider-list", ".feedback__slider-item", 1000, 4000);


// smooth scroll to ads

$(document).ready(function () {

    $('.slider__link').click(function (e) {

        var href = $(this).attr('href');

        $('html, body').animate({
            scrollTop:  $(href).offset().top - ($(window).height()) / 4
        }, 500);

        e.preventDefault();
    });
});

// slider
