$(document).ready(function () {
  // Initialize Superslides
  $("#slides").superslides({
    animation: "fade",
    play: 5000,
    pagination: false,
  });

  // Initialize Typed.js for animated typing effect
  new Typed(".typed", {
    strings: ["Jr. Full-Stack", "Video Editor", "Discord Bot Developer"],
    typeSpeed: 60,
    startDelay: 900,
    showCursor: false,
    loop: true,
    backDelay: 900,
    backSpeed: 40,
  });

  // Initialize Owl Carousel
  $(".owl-carousel").owlCarousel({
    loop: true,
    items: 4,
    responsive: {
      0: { items: 1 },
      480: { items: 2 },
      768: { items: 3 },
      938: { items: 4 },
    },
  });

  // Detect scroll position for triggering animations
  var skillsSectionOffset = $(".skillsSection").offset().top;
  var statsSectionOffset = $(".statsSection").offset().top;
  var countUpTriggered = false;

  $(window).scroll(function () {
    // Activate EasyPieChart when the skills section comes into view
    if (window.pageYOffset > skillsSectionOffset - $(window).height() + 200) {
      $(".chart").easyPieChart({
        easing: "easeInOut",
        barColor: "#fff",
        trackColor: false,
        scaleColor: false,
        lineWidth: 4,
        size: 152,
        onStep: function (from, to, percent) {
          $(this.el).find(".percent").text(Math.round(percent));
        },
      });
    }

    // Activate CountUp animation for statistics section
    if (!countUpTriggered && window.pageYOffset > statsSectionOffset - $(window).height() + 200) {
      $(".counter").each(function () {
        var element = $(this);
        var endValue = parseInt(element.text(), 10);
        element.countup(endValue);
      });
      countUpTriggered = true;
    }
  });

  // Initialize Fancybox for media popups
  $("[data-fancybox]").fancybox();

  // Filter portfolio items using Isotope
  $("#filters a").click(function () {
    $("#filters .current").removeClass("current");
    $(this).addClass("current");

    var filterValue = $(this).attr("data-filter");

    $(".items").isotope({
      filter: filterValue,
      animationOptions: {
        duration: 1500,
        easing: "linear",
        queue: false,
      },
    });

    return false;
  });

  // Smooth scrolling for navigation links
  $("#navigation li a").click(function (e) {
    e.preventDefault();
    var targetElement = $(this).attr("href");
    var targetPosition = $(targetElement).offset().top;

    $("html, body").animate({ scrollTop: targetPosition - 50 }, "slow");
  });

  // Sticky Navigation Bar
  const nav = $("#navigation");
  const navTopOffset = nav.offset().top;

  $(window).on("scroll", handleStickyNavigation);

  function handleStickyNavigation() {
    var body = $("body");
    if ($(window).scrollTop() >= navTopOffset) {
      body.css("padding-top", nav.outerHeight() + "px").addClass("fixedNav");
    } else {
      body.css("padding-top", 0).removeClass("fixedNav");
    }
  }
});
