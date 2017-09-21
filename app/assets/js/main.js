"use strict";


jQuery(document).ready(function ($) {
	$(window).load(function () {
		$(".loaded").fadeOut();
		$(".preloader").delay(1000).fadeOut("slow");
	});

    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
    $('#navbar-collapse').find('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 40)
                }, 1000);
                if ($('.navbar-toggle').css('display') != 'none') {
                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
                }
                return false;
            }
        }
    });
	

	/*---------------------------------------------*
     * Menu Background Change
     ---------------------------------------------*/
	
	var windowWidth = $(window).width();
    if (windowWidth > 757) {

        
          
            $(window).scroll(function () {
                if ($(this).scrollTop() >200) {
                    $('.navbar').fadeIn(200);
                    $('.navbar').addClass('menu-bg');

                } else {
                    
                    $('.navbar').removeClass('menu-bg');
                }
            });
        
    }
		$('#bs-example-navbar-collapse-1').localScroll();
		
	/*---------------------------------------------*
     * Scroll Up
     ---------------------------------------------*/	
		$(window).scroll(function(){
        if ($(this).scrollTop() > 600) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
		});
		
		$('.scrollup').click(function(){
			$("html, body").animate({ scrollTop: 0 },1000);
			return false;
		});
		
	


    /*---------------------------------------------*
     * STICKY scroll
     ---------------------------------------------*/

		$.localScroll();



    /*---------------------------------------------*
     * Counter 
     ---------------------------------------------*/

//    $('.statistic-counter').counterUp({
//        delay: 10,
//        time: 2000
//    });




    /*---------------------------------------------*
     * WOW
     ---------------------------------------------*/

//        var wow = new WOW({
//            mobile: false // trigger animations on mobile devices (default is true)
//        });
//        wow.init();


    /* ---------------------------------------------------------------------
     Carousel
     ---------------------------------------------------------------------= */

//    $('.testimonials').owlCarousel({
//        responsiveClass: true,
//        autoplay: false,
//        items: 1,
//        loop: true,
//        dots: true,
//        autoplayHoverPause: true
//
//    });


    //End

    //--- CUSTOM CODE ---
    $('#btnEnviarContacto').on('click', enviarContactoEvt);
});

//----- CUSTOM CODE -----

function enviarContactoEvt(e){

    if(document.getElementById("nombre").value==""){

        alertify.warning('Formulario incompleto: Nombre');

    }else if(document.getElementById("email").value==""){

        alertify.warning('Formulario incompleto: Email');

    }else if(document.getElementById("telefono").value==""){

        alertify.warning('Formulario incompleto: Teléfono');

    }else if(document.getElementById("web").value==""){

        alertify.warning('Formulario incompleto: Sitio Web');

    }else{

        $('#btnEnviarContacto').button('loading');

        var contactData = {};

        $('.input_contacto').each(function(index, element){

            contactData[element.id] = element.value;
        });

        $.ajax({
            url: './services/contacto.php/',
            method: 'POST',
            data: {cd:contactData},
            success: function(){

                $('.input_contacto').val('');

                alertify.success('Hemos recibido sus datos. Pronto nos contactaremos con usted.');
            },
            error: function(){

                alertify.error('No hemos podido recibir sus datos. Inténtelo nuevamente.');
            },
            complete: function(){

                $('#btnEnviarContacto').button('reset');
            }
        });
    }
}