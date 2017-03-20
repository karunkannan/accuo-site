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
});