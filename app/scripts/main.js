'use strict';
(function() {

    $(function(){

        // INIT WOW
        var wow = new WOW(
            {
                boxClass:     'wow',      // default
                animateClass: 'animated', // default
                offset:       0,          // default
                mobile:       true,       // default
                live:         true        // default
            }
        );
        wow.init();

        /* INITIAL LOADER */
        var colors = new Array(
            [55,255,241],
            [57,197,255],
            [56,112,255],
            [85,68,255]);

            var step = 0;
            //color table indices for:
            // current color left
            // next color left
            // current color right
            // next color right
            var colorIndices = [0,1,2,3];

            //transition speed
            var gradientSpeed = 0.002;

            function updateGradient(){

                if ( $===undefined ) return;

                var c0_0 = colors[colorIndices[0]];
                var c0_1 = colors[colorIndices[1]];
                var c1_0 = colors[colorIndices[2]];
                var c1_1 = colors[colorIndices[3]];

                var istep = 1 - step;
                var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
                var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
                var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
                var color1 = "rgb("+r1+","+g1+","+b1+")";

                var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
                var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
                var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
                var color2 = "rgb("+r2+","+g2+","+b2+")";

                $('#initial-loader').css({
                    background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
                        background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

                    step += gradientSpeed;
                    if ( step >= 1 )
                    {
                        step %= 1;
                        colorIndices[0] = colorIndices[1];
                        colorIndices[2] = colorIndices[3];

                        //pick two new target color indices
                        //do not pick the same as the current one
                        colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
                        colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

                    }
        }
        setInterval(updateGradient,5);

        /* GAME */
        var neededNumber = 1;
        var maxNumber = 8;

        var checkGame = function(event){
            event.stopPropagation();
            var elementNumber = event.data.elementNumber;

            if (elementNumber !== neededNumber){
                $('.game .overlay').show();
                setTimeout(function(){$('.game .overlay').hide()}, 200);
            }
            else{
                neededNumber++;
                $('#mcard'+elementNumber).flip(true);
                $('#dcard'+elementNumber).flip(true);
                if(neededNumber === maxNumber){
                    setTimeout(function(){
                        $('#game').fadeOut(1000, function(){
                            $('main').fadeIn(1000);
                        });
                    }, 1000);
                }
            }
        }

        for (var i=1; i<8; i++){
            $('#mcard'+i).flip({
                trigger: 'manual'
            });
            $('#dcard'+i).flip({
                trigger: 'manual'
            });
            $('#mcard'+i).click({elementNumber: i}, checkGame);
            $('#dcard'+i).click({elementNumber: i}, checkGame);
        }

        /* NAVIGATION */
        function goToSection(event){
            event.stopPropagation();
            var section = event.data.section;

            if(section === "blog"){
                $('main .section.blog .section.hero').css('height','100vh');
                startVegas();
            }

            $('#menu').fadeOut(1000, function(){
                $('#'+section).fadeIn(1000);
            });
        }

        function goToMenu(event){
            event.stopPropagation();
            var section = event.data.section;
            $('#'+section).fadeOut(1000, function(){
                $('#menu').fadeIn(1000);
            });
        }

        function sectionToSection(event){
            event.stopPropagation();
            var actualSection = event.data.actualSection;
            var section = event.data.section;
            $('#'+actualSection).fadeOut(1000, function(){
                $('#'+section).fadeIn(1000);
            });
        }

        $('main .menu #part1').click({section:'me'}, goToSection);
        $('main .menu #part2').click({section:'edu'}, goToSection);
        $('main .menu #part3').click({section:'personal'}, goToSection);
        $('main .menu #part4').click({section:'blog'}, goToSection);

        $('main .me nav a').click({section:'me'}, goToMenu);
        $('main .edu nav a').click({section:'edu'}, goToMenu);
        $('main .personal nav a').click({section:'personal'}, goToMenu);
        $('main .blog nav a').click({section:'blog'}, goToMenu);

        $('main .edu .toMe').click({actualSection: 'edu', section:'me'}, sectionToSection);


        function startVegas(){
            $('main .section.blog .section.hero').vegas({
                timer: false,
                cover: true,
                animation: 'kenburns',
                transitionDuration: 2000,
                slides: [
                    { src: 'images/bg1.jpg' },
                    { src: 'images/bg2.jpg' },
                    { src: 'images/bg3.jpg' },
                    { src: 'images/bg4.jpg' }
                ],
                walk: function (index, slideSettings) {
                    if(index === 0){
                        $('main .section.blog .section.hero p.claim').html('una oportunidad?')
                    }
                    else if (index === 1){
                        $('main .section.blog .section.hero p.claim').html('click en el botón!')
                    }
                    else if (index === 2){
                        $('main .section.blog .section.hero p.claim').html('para aprender')
                    }
                    else if (index === 3){
                        $('main .section.blog .section.hero p.claim').html('o reirte un poco')
                    }
                }
            });
        }

        function getCookie(cname) {
            var name = cname + '=';
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)===' ') {c = c.substring(1);}
                if (c.indexOf(name) === 0) {return c.substring(name.length,c.length);}
            }
            return '';
        }

        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = 'expires='+d.toUTCString();
            document.cookie = cname + '=' + cvalue + '; ' + expires;
        }

        // // NAVBAR Toggle Bug
        // $('.navbar-toggle').on('click', function () {
        //   $($(this).data('target')).collapse('toggle');
        //   });

        // Do not delay load of page with async functionality: Wait for window load
        window.addEventListener('load',function(){
            //$('#initial-loader').remove();
            $('#initial-loader').fadeOut(6000, function(){
                $('#initial-loader').remove();
                $('main').show();
                $('#me').fadeIn(1000);
            });


            // var scrollId = 'inicio';
            //
            // var elements = [
            //     'inicio',
            //     'quiensoy',
            //     'ebook',
            //     'testimonios',
            //     'descargas',
            //     'sinbarreras',
            //     'contacto',
            //     'footer'
            // ];
            //
            // var elementsYposition = [
            //     $('#inicio').offset().top,
            //     $('#quiensoy').offset().top,
            //     $('#ebook').offset().top,
            //     $('#testimonios').offset().top,
            //     $('#descargas').offset().top,
            //     $('#sinbarreras').offset().top,
            //     $('#contacto').offset().top,
            //     $('#footer').offset().top
            // ];
            //
            // $(window).scroll(function() {
            //     for(var i = 0; i < elementsYposition.length; i++){
            //         if(window.pageYOffset >= elementsYposition[i] && window.pageYOffset < elementsYposition[i+1]){
            //             scrollId = elements[i];
            //         }
            //     }
            //     $('.navbar-nav li a').removeClass('active');
            //     $('.navbar-nav li a[href$="#'+scrollId+'"]').addClass('active');
            // });
            //
            $('a.smooth').click(function(e) {
                //if (e.preventDefault) e.preventDefault();
                var $link = $(this);
                var anchor = $link.attr('href');
                $('html, body').stop().animate({
                    scrollTop : $(anchor).offset().top
                }, 500);
                return false;
            });
            //
            //
            // Headroom Config
            // grab an element
            var myElement = document.querySelector('#main-nav3');
            // construct an instance of Headroom, passing the element
            var headroom  = new Headroom(myElement);
            // initialise
            headroom.init();


        }); // End of window load

    }); // End of jQuery context

})(); // End of use strict
