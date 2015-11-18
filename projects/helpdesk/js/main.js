$(document).ready(function(){
	var initialLoadWidth = $(window).width();
    if(initialLoadWidth > 1024) {
        infoblockScroll('.general');
    	infoblockScroll('.help');
    	infoblockScroll('.administration');

        $(window).resize(function(){
            var localWidth = $(window).width();
            console.log(localWidth);
            if(localWidth < 1025) {
                window.location.reload();
            }
        });
    } else {
        $(window).resize(function(){
            var localWidth = $(window).width();
            console.log(localWidth);
            if(localWidth > 1024) {
                window.location.reload();
            }
        });
    }
});


function infoblockScroll(ib) {
    var info = $(ib);
    var off = info.offset();
    var desk = info.find('.infoblock_desk');
    var mainicon = desk.find('.infoblock_desk__mainicon');
    var contact = desk.find('.contact');
    var cells = desk.find('.infoblock_desk_cell');
        
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
        if (scroll >= off.top - 100) {
            desk.addClass('width100');
            mainicon.addClass('main_icon_animate');
            contact.addClass('opacity1');
            for(var i = 1; i <= cells.length; i++) {
                cells.eq(i - 1).addClass('desk_cell' + i + '_scrolled');
            }

            for(var j = 0; j < cells.length; j++) {
                cells.eq(j).find('.desk_cell_info').addClass('desk_cell_info_animate');
            }
        }
    });
}
