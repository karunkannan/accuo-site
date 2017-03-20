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
    $(this).children(".menu-sub").addClass("menu-sub-clicked");
    removeHamburger();
});