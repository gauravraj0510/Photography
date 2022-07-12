(function ($) {
  "use strict";

  $("body").imagesLoaded({ background: ".hero" }, function () {
    var introTween = new TimelineMax().to("#wrapper, .fadein, .hero", 0.7, {
      css: { autoAlpha: 1 },
      onComplete: docLoaded,
    });

    function docLoaded() {
      $("body").addClass("loaded");
    }

    $(".anchor").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var href = $(this).attr("href");
      $("html,body").animate({
        scrollTop: $(href).offset().top + "px",
      });
    });

    $(".responsive-nav").on("click", function (e) {
      $(this).toggleClass("active");
      $(".main-nav, .brand").toggleClass("active");
      $(".main-nav ul").slideToggle();
      if ($("body").hasClass("no-scroll-after")) {
        $("body").removeClass("no-scroll-after").addClass("no-scroll");
        return;
      }
      if ($("body").hasClass("no-scroll")) {
        $("body").removeClass("no-scroll").addClass("no-scroll-after");
        return;
      }
    });

    $(".main-nav li").hover(
      function () {
        $(this).addClass("hover");
      },
      function () {
        $(this).removeClass("hover");
      }
    );

    $(".main-nav a").on("click", function (e) {
      $(this).parent().siblings().removeClass("hover");
      if (
        !$(this).hasClass("clicked") &&
        $(".main-nav").hasClass("active") &&
        $(this).parent().find(".dropdown").length
      ) {
        e.preventDefault();
        e.stopPropagation();
        $(this).addClass("clicked");
        $(this).parent().siblings().find("a").removeClass("clicked");
      } else {
        $(".main-nav li.hover").removeClass("hover");
      }
    });

    $(window).on("scroll", function () {
      window.requestAnimationFrame(parallax); // Parallax
    });

    var parallaxSpeed = 0.15;

    function parallax() {
      $(".parallax").each(function () {
        var el = $(this);
        var yOffset = $(window).scrollTop(),
          parallaxOffset = yOffset * parallaxSpeed,
          parallaxOffset = +parallaxOffset.toFixed(2);
        if (el.hasClass("fs")) {
          el.css(
            "transform",
            "translate3d(-50%,-" + (50 - parallaxOffset * 0.15) + "%,0)"
          );
        } else {
          el.css("transform", "translate3d(0," + parallaxOffset + "px,0)");
        }
      });
    }

    $(window).bind("pageshow", function (event) {
      if (event.originalEvent.persisted) {
        window.location.reload();
      }
    });

    var introTL = new TimelineLite(),
      header = $("header");
    introTL.from(
      header,
      1,
      { opacity: 0, y: -100, ease: Power2.easeInOut },
      0.6
    );

    $("body").on(
      "click",
      "a[href!=#][data-toggle!=tab][data-toggle!=collapse][target!=_blank][class!=anchor]",
      function (e) {
        var href = $(this).attr("href");
        var fadeTween = new TimelineMax().to("body", 0.5, {
          opacity: 0,
          ease: Power2.easeOut,
          onComplete: nextPage,
        });
        function nextPage() {
          window.location = href;
        }
        e.preventDefault();
      }
    );

    var $grid = $(".img-grid");
    $grid.masonry({
      columnWidth: ".item-sizer",
      percentPosition: true,
    });

    function gridReset() {
      $grid.masonry("layout");
    }

    gridReset();

    $("#filters a").on("click", function (e) {
      var filter = $(this).attr("data-filter");
      $("#filters a").removeClass("active");
      $(this).addClass("active");
      $(".img-grid")
        .find(".item:not(" + filter + ")")
        .addClass("invis");
      $(".img-grid").find(filter).show(0).removeClass("invis");
      setTimeout(function () {
        $(".img-grid")
          .find(".item:not(" + filter + ")")
          .hide(0);
        gridReset();
      }, 300);
      e.preventDefault();
    });

    $("#filters").on("click", function () {
      setTimeout(function () {
        $("#filters").fadeOut();
      }, 500);
    });

    $(".category-trigger").on("click", function (e) {
      $("#filters").fadeIn().css("display", "flex");
    });
  });
})(jQuery);

$(document).bind("contextmenu", function (e) {
  e.preventDefault();
});

// $(document).keydown(function (e) {
//   if (e.which === 123) {
//     return false;
//   }
// });

// document.onkeydown = function (e) {
//   if (event.keyCode == 123) {
//     return false;
//   }
//   if (e.ctrlKey && e.keyCode == "E".charCodeAt(0)) {
//     return false;
//   }
//   if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
//     return false;
//   }
//   if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
//     return false;
//   }
//   if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
//     return false;
//   }
//   if (e.ctrlKey && e.keyCode == "S".charCodeAt(0)) {
//     return false;
//   }
//   if (e.ctrlKey && e.keyCode == "H".charCodeAt(0)) {
//     return false;
//   }
//   if (e.ctrlKey && e.keyCode == "A".charCodeAt(0)) {
//     return false;
//   }
//   if (e.ctrlKey && e.keyCode == "F".charCodeAt(0)) {
//     return false;
//   }
//   if (e.ctrlKey && e.keyCode == "E".charCodeAt(0)) {
//     return false;
//   }
// };


