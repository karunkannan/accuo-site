var currentPane = 0;
var bubbleTimer = null;
var loadingTimer = null;
var loadingTime = 0;

// emily stuff, thanks 2 the internet for this i love u internet
(function ( $, window, document, undefined ) {

  $.fn.rift = function () {

    return this.each(function () {

      // Vurribles
      var element = $(this),
          elemImg = element.find('img'),
          imgSrc  = elemImg.attr('src');

      // We be chainin'  
      element
        .prepend('<span class="top-span"></span>')
        .append('<span class="btm-span"></span>')
        .find('span.top-span')
        .css('background', 'url(' + imgSrc + ') no-repeat center top')
        .css('background-size', '100%')
        .parent()
        .find('span.btm-span')
        .css('background', 'url(' + imgSrc + ') no-repeat center bottom')
        .css('background-size', '100%');
    });
  };
})( jQuery, window, document );

$('.rift').rift();

function removeHamburger() {
    $("#ham1").removeClass("ham1-clicked");
    $("#ham2").removeClass("ham2-clicked");
    $("#ham3").removeClass("ham3-clicked");
    $(".menu").removeClass("menu-active");
}

$(".hamburger").click(function() {
    if (!$(".menu").hasClass("menu-active")) {
        $("#ham1").addClass("ham1-clicked");
        $("#ham2").addClass("ham2-clicked");
        $("#ham3").addClass("ham3-clicked");
        $(".menu").addClass("menu-active");
    } else {
        removeHamburger();
    }
});

$(".menu-title").hover(function() {
    $(this).children(".menu-underline").addClass("menu-underline-active");
    $(this).children(".menu-sub").addClass("menu-sub-active");
}, function() {
    $(this).children(".menu-underline").removeClass("menu-underline-active");
    $(this).children(".menu-sub").removeClass("menu-sub-active");
    $(this).children(".menu-sub").removeClass("menu-sub-clicked");
});

$(".menu-title").click(function() {
    if ($(this).children(".menu-sub").css("opacity") == 0) {
        $(this).children(".menu-sub").addClass("menu-sub-clicked");
    }
    removeHamburger();
});

$(".menu-subtitle").click(function() {
    $(this).parent().parent().children(".menu-underline").removeClass("menu-underline-active");
    $(this).parent().removeClass("menu-sub-active");
    $(this).parent().removeClass("menu-sub-clicked");
});

$(document).ready(function() {
    $(".bubble-cont").each(function() {
        $(this).css("top", 30 * $(".bubble-cont").index($(this))); 
    });
    
    var scroll = $(window).scrollTop() + (window.innerHeight/2);
    var pane = parseInt(scroll/window.innerHeight);
    
    currentPane = pane;
    
    resize();
    
    /**$(".article").each(function() {
        $(this).css("height", $(this).css("height"));
        $(this).children(".popout").children(".body").css("height", "auto");
        $(this).children(".popout").children(".body").css("padding-bottom", "10px");
    });**/
    
    setTimeout(scrollEvent, 1000);
});

function loading() {
    loadingTime = loadingTime + 0.1;

    if (loadingTime >= Math.PI * 2) {
        loadingTime = 0;
    }
    
    var x = Math.cos(loadingTime) * 20;
    var y = Math.sin(loadingTime) * 20;
    
    $(".loading-bubble").css("left", x + 14.5);
    $(".loading-bubble").css("top", y + 14.5);
}

function endLoading() {
    clearInterval(loadingTimer);
}

function startLoading() {
    loadingTimer = setInterval(loading, 16);
    $(".pure-button").addClass("button-loading");
    $(".send").text("");
    $(".loading-bubble").addClass("loading-bubble-active");
}

function resize() {
    $(".video-cont").css("height", 0.58 * parseInt($(".video-cont").css("width")));
}

$( window ).resize(function() {
    resize();
});

$(window).scroll(function (event) {
    scrollEvent();
});

function scrollEvent() {
    var scroll = $(window).scrollTop() + (window.innerHeight/2);
    var pane = 0;
    
    $(".pane").each(function() {
        if (scroll > $(this).position().top) {
            pane = $(".pane").index($(this));
        }
    });
    
    if (pane != currentPane) {
        $(".bubble-cont").children(".bubble").removeClass("big-bubble");
        $(".bubble-cont").children(".bubble-title").removeClass("bubble-title-show");

        $(".bubble-cont").eq(pane).children(".bubble").addClass("big-bubble");
        $(".bubble-cont").eq(pane).children(".bubble-title").addClass("bubble-title-show");

        clearTimeout(bubbleTimer);
        
        bubbleTimer = setTimeout(function() {
            $(".bubble-cont").children(".bubble-title").removeClass("bubble-title-show");
        }, 3000);
        currentPane = pane;
        
        if (currentPane == 5) {
            $(".bubble").removeClass("bubble-white");
            $(".bubble").removeClass("big-bubble-white");
            $(".team-bubble-title").addClass("team-bubble-title-white");
        } else if (currentPane == 6) {
            $(".bubble").addClass("bubble-white");
            $(".bubble").removeClass("big-bubble-white");
            $(".bubble").eq(currentPane).addClass("big-bubble-white");
            $(".news-bubble-title").addClass("news-bubble-title-white");
        } else {
            $(".bubble").removeClass("bubble-white");
            $(".bubble").removeClass("big-bubble-white");
            $(".news-bubble-title").removeClass("news-bubble-title-white");
            $(".team-bubble-title").removeClass("team-bubble-title-white");
        }
    }
    
    if (pane == 3 && window.innerWidth > 700) { 
        var tool_scroll = (-850 + scroll - $("#tech").position().top)/8;
        if (tool_scroll < -5) {
            $(".tech-image-tool").css("top", tool_scroll);  
        }
    }
}

$("input").focusin(function() {
    if (!$(this).siblings("label").hasClass("input-label-active")) {
        $(this).siblings("label").addClass("input-label-active");
    }
    $(this).addClass("input-active");
});

$("input").focusout(function() {
    if ($(this).val().length == 0) {
        $(this).siblings("label").removeClass("input-label-active");
    }
    $(this).removeClass("input-active");   
    if ($(this).attr("id") == "email") {
        $(".email-invalid").removeClass("email-invalid-active");
    } else if ($(this).attr("id") == "name") {
        $(".name-invalid").removeClass("email-invalid-active");
    }
});

$("textarea").focusin(function() {
    if (!$(this).siblings("label").hasClass("input-label-active")) {
        $(this).siblings("label").addClass("input-label-active");
    }
    $(this).addClass("input-active");
});

$("textarea").focusout(function() {
    if ($(this).val().length == 0) {
        $(this).siblings("label").removeClass("input-label-active");
    }
    $(this).removeClass("input-active");
});

$("#home-click").click(function() {
    $("html, body").animate({
        scrollTop: $("#home").offset().top
    });
});

$("#mission-click").click(function() {
    $("html, body").animate({
        scrollTop: $("#mission").offset().top
    });
});

$("#problem-click").click(function() {
    $("html, body").animate({
        scrollTop: $("#problem").offset().top
    });
});

$("#tech-click").click(function() {
    $("html, body").animate({
        scrollTop: $("#tech").offset().top
    });
});

$("#solution-click").click(function() {
    $("html, body").animate({
        scrollTop: $("#solution").offset().top
    });
});

$("#team-click").click(function() {
    $("html, body").animate({
        scrollTop: $("#team").offset().top
    });
});

$("#news-click").click(function() {
    $("html, body").animate({
        scrollTop: $("#news").offset().top
    });
});

$("#contact-click").click(function() {
    $("html, body").animate({
        scrollTop: $("#contact").offset().top
    });
});

/**$(".article").hover(function() {
    var article_height = parseInt($(this).css("height"));
    var popout_height = parseInt($(this).children(".popout").outerHeight());
    var body_height = parseInt($(this).children(".popout").children(".body").css("height")) 
    
    var diff = popout_height - article_height;
    
    if (diff < 0) {
        diff = 0;
    } else {
        $(this).addClass("article-active");
    }
    
    
    $(this).children(".popout").css("top", -1 * parseInt($(this).children(".popout").children(".body").outerHeight()) + diff);
    
    if (diff > 0) {
        $(this).children(".popout").children(".body").css("height", body_height - diff);
    }
    
    $(this).children(".popout").children(".exit").addClass("exit-active");
}, function() {
    removePopup($(this));
});**/

function removePopup(article) {
    $(article).children(".popout").css("top", "0px");
    $(article).children(".popout").children(".body").animate({ scrollTop: 0 }, "fast");
    $(article).removeClass("article-active");
    $(article).children(".popout").children(".exit").removeClass("exit-active");
}

$(".exit").click(function() {
    console.log("lol");
    removePopup($(this).parent().parent());
});

$(".team-image-cont").hover(function() {
    $(this).children(".panel-left").addClass("panel-move-left");
    $(this).children(".panel-right").addClass("panel-move-right");
    $(this).children(".panel-overlay-left").addClass("panel-overlay-move-left");
    $(this).children(".panel-overlay-right").addClass("panel-overlay-move-right");
    $(this).children(".panel-border-left").addClass("panel-border-move-left");
    $(this).children(".panel-border-right").addClass("panel-border-move-right");
}, function() {
    $(this).children(".panel-left").removeClass("panel-move-left");
    $(this).children(".panel-right").removeClass("panel-move-right");
    $(this).children(".panel-overlay-left").removeClass("panel-overlay-move-left");
    $(this).children(".panel-overlay-right").removeClass("panel-overlay-move-right");
    $(this).children(".panel-border-left").removeClass("panel-border-move-left");
    $(this).children(".panel-border-right").removeClass("panel-border-move-right");
});