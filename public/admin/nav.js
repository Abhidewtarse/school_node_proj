$(document).ready(function () {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > 450) {
      $(".navbar").css({
        "background": "rgba(0,0,0,0.9)",
        "color": "white !important",
        "padding": "8px"
      });
    }

    else {
      $(".navbar").css("background", "transparent");
    }
  })
})