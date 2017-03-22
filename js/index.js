var currentPane = 0;
var bubbleTimer = null;

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
});

$(window).scroll(function (event) {
    var scroll = $(window).scrollTop() + (window.innerHeight/2);
    var pane = parseInt(scroll/window.innerHeight);
    
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
    }
});

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