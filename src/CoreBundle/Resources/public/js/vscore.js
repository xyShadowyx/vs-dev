/**
 * Created by Viktor Schröder on 28.01.2015.
 */

/*+function ($) {
    'use strict';
    $(window).on('load', function () {
        $('[data-dialog="signin"]').each(function () {
            $(this).on("click", function(event) {

                event.preventDefault();
            });
        })
    })
}(jQuery);*/

+function ($) {
    'use strict';
    $(window).on('load', function () {
        $('[data-href]').each(function () {
            $(this).on("click", function(event) {
                window.location = $(this).data("href");
                event.preventDefault();
            });
        })
    })
}(jQuery);

+function ($) {
    'use strict';
    $(window).on('load', function () {
        // click on row counter only once
        $('td[data-corcoo="true"]').each(function () {
            $(this).parent().one("click", {_this: this}, function(event) {
                event.data._this.innerHTML++;
                event.preventDefault();
            });
        })
    })
}(jQuery);

+function ($) {
    'use strict';
    $(window).on('load', function () {
        function updatePosition($element) {
            var height = $(window).height();
            var scrollPos = $(window).scrollTop();
            var elementHeight = $element.height();
            var elementOffset = $element.offset().top;

            if (scrollPos < elementOffset + elementHeight && scrollPos + height > elementOffset) {
                var elementCenter = elementOffset + (elementHeight / 2);
                var windowCenter = scrollPos + (height / 2);

                var distper = ((windowCenter - elementCenter) / (height + elementHeight)) * 100;
                if($element.data("effect") == "scan") {
                    distper = -distper;
                }
                var coords = '50% ' + (50 + distper) + '%';
                $element.css({backgroundPosition: coords});
            }
        }

        $('div[data-effect]').each(function () {
            var $bgobj = $(this);
            updatePosition($bgobj);
            $(window).scroll(function () {
                updatePosition($bgobj);
            });
            $(window).resize(function () {
                updatePosition($bgobj);
            });
        });
    });
}(jQuery);