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

(function( $ ){

    $.fn.compare = function() {

        return this.each(function() {

            var $this = $(this);

            var element = this;

            var img = $($this.find('img')[1]);


            //Задаем ширину и высоту родительского блока, относительно параметров изображения
            $this.width( img.width() ).height( img.height() );

            var separator = '<div class="compare_separator">'+
                '<div class="arrows">'+
                '<span class="left_arrow"> < </span>'+
                '<span class="right_arrow"> > </span>'+
                '</div>'+
                '</div>';

            //Добавляем разделитель
            if( $this.prepend(separator) ) {

                var arrows = $this.find(".arrows");
                arrows.css({"top": ( $this.height() - arrows.height() )/2 + "px" });

            }


            //Оборачиваем второе изображение в блок
            img.wrap('<div class="moved_block"></div>');

            //Двигаем мышью
            function go_position(e, x) {

                //Позиция compare блока на странице
                var r = element.getBoundingClientRect();

                //Насколько переместилась мышь влево от левого края блока compare
                if( x === false || x === undefined ) var left = e.clientX - r.left;
                else var left = x;

                //Двигаем разделитель и блок обрезки
                if( left >= 0 && left <= $(element).width() ) {
                    $(element).find(".compare_separator, .moved_block").css({"left": left+'px'});
                    img.css({"left": -left+"px"});

                    //Защита от дурака
                } else if( left < 0 ) {
                    $(element).find(".compare_separator, .moved_block").css({"left": 0+'px'});
                    img.css({"left": 0+"px"});

                } else if( left > $(element).width() ) {
                    $(element).find(".compare_separator, .moved_block").css({"left": $(element).width()+'px'});
                    img.css({"left": -$(element).width()+"px"});
                }

            }

            //Функция посредник, для передачи данных
            var move_separator = function(e) {

                go_position(e, false);

            }

            //Функция привязки событий
            var bind_move = function() {
                $(document).bind('mousemove', move_separator);
            }

            //Отвязываем события когда отпускаем левую кнопку мыши
            var unbind_move = function() {
                $(document).unbind('mousemove', move_separator);
            }


            $($this.find(".arrows")).bind("mousedown", bind_move);
            $(document).bind("mouseup", unbind_move);

            //При клике по блоку compare перемещаем на соответсвующую позицию
            $(element).bind("click", function(e) {
                go_position(e);
            });

            //Отцентровка
            go_position(false, $(element).width() / 2 );

        })
    }
})( jQuery );

$('.compare').compare();

