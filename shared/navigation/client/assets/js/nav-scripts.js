var BootstrapHacks = (function () {
    function popoverImprovement() {
        //close other popovers when click on anywhere in the html
        $('body').on('click touchend', function (e) {
            $('[data-toggle="popover"]').each(function () {
                if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                    $(this).popover('hide');
                }
            });
        });
    }

    function enableIframeScrolling() {
        if (/iPhone|iPod|iPad/.test(navigator.userAgent)){
            $('iframe').wrap(function () {
                var $this = $(this);
                return $('<div />').css({
                    width: $this.attr('width'),
                    height: $this.attr('height'),
                    overflow: 'scroll',
                    '-webkit-overflow-scrolling': 'touch'
                });
            });
        }
    }

    return {
        popoverImprovement: popoverImprovement,
        enableIframeScrolling: enableIframeScrolling
    };
})();

$(document).ready(function () {
    BootstrapHacks.popoverImprovement();
    BootstrapHacks.enableIframeScrolling();
});