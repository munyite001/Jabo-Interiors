
$(function() {

  "use strict";

  $(document).ready(function() {
    $('html').addClass('is-animating');
    anime({
      targets: '.qrt-preloader .qrt-preloader-content',
      opacity: [0, 1],
      delay: 200,
      duration: 600,
      easing: 'linear',
      complete: function(anim) {

      }
    });
    anime({
      targets: '.qrt-preloader',
      opacity: [1, 0],
      delay: 2200,
      duration: 400,
      easing: 'linear',
      complete: function(anim) {
        $('.qrt-preloader').css('display', 'none');
        $('html').removeClass('is-animating');
      }
    });
  });

  var bar = new ProgressBar.Line(preloader, {
    strokeWidth: 1.7,
    easing: 'easeInOut',
    duration: 1400,
    delay: 750,
    trailWidth: 1.7,
    svgStyle: {
      width: '100%',
      height: '100%'
    },
    step: (state, bar) => {
      bar.setText(Math.round(bar.value() * 100) + ' %');
    }
  });

  bar.animate(1);

  const cursor = document.querySelector('#cursor');
  const cursorRadius = Math.round(cursor.getBoundingClientRect().width / 1.2);

  const mouse = {
    x: 300,
    y: 300
  };
  const pos = {
    x: 0,
    y: 0
  };
  const ratio = 0.07;

  const draw = () => {
    pos.x += (mouse.x - cursorRadius - pos.x) * ratio;
    pos.y += (mouse.y - cursorRadius - pos.y) * ratio;
    cursor.style.transform = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';
  };

  const update = e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  window.addEventListener('mousemove', update, {
    capture: false,
    passive: true
  });

  function animate() {
    draw();
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  const options = {
    containers: ['#qrt-dynamic-content', '#qrt-dynamic-menu'],
    animateHistoryBrowsing: true,
    linkSelector: '.qrt-menu a:not([data-no-swup]), .qrt-anima-link:not([data-no-swup])',
    animationSelector: '[class="qrt-dynamic-content"]'
  };

  const swup = new Swup(options);

  Scrollbar.use(OverscrollPlugin);
  var scrollbar = Scrollbar.init(document.querySelector('#qrt-scroll-content'), {
    damping: 0.17,
    renderByPixel: true,
    continuousScrolling: true,
    plugins: {
      overscroll: {
        effect: 'bounce',
        damping: 0.15,
        maxOverscroll: 80
      },
      mobile: {
        speed: 0.2,
        alwaysShowTracks: false
      }
    },
  });

  Scrollbar.use(OverscrollPlugin);
  Scrollbar.init(document.querySelector('#qrt-scroll-info'), {
    damping: 0.17,
    renderByPixel: true,
    continuousScrolling: true,
    plugins: {
      overscroll: {
        effect: 'bounce',
        damping: 0.15,
        maxOverscroll: 80
      },
      mobile: {
        speed: 0.2,
        alwaysShowTracks: false
      }
    },
  });

  var fixedElem = document.getElementById('fixed');

  if ($(window).width() > 1200) {
    scrollbar.addListener(function(status) {
      var offset = status.offset;

      fixed.style.top = offset.y + 'px';
      fixed.style.left = offset.x + 'px';
    });
  }

  $(window).resize(function() {
    if ($(window).width() > 1200) {
      scrollbar.addListener(function(status) {
        var offset = status.offset;

        fixed.style.top = offset.y + 'px';
        fixed.style.left = offset.x + 'px';
      });
      $(fixedElem).css('position', 'relative')
    }
    if ($(window).width() < 1200) {
      scrollbar.addListener(function(status) {
        var offset = status.offset;

        fixed.style.top = offset.y + 'px';
        fixed.style.left = offset.x + 'px';
      });
      $(fixedElem).css('position', 'static')
    }
  });

  var swiper = new Swiper('.qrt-main-slider', {
    slidesPerView: 1,
    speed: 800,
    parallax: true,
    mousewheel: true,
    mousewheel: {
      releaseOnEdges: true,
    },
    keyboard: true,
    autoplay: {
      delay: 6000,
    },
    pagination: {
      el: '.swiper-main-pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.qrt-main-next',
      prevEl: '.qrt-main-prev',
    },
  });

  var swiper = new Swiper('.qrt-main-slider-onepage', {
    slidesPerView: 1,
    speed: 800,
    parallax: true,
    keyboard: true,
    autoplay: {
      delay: 6000,
    },
    pagination: {
      el: '.swiper-main-pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.qrt-main-next',
      prevEl: '.qrt-main-prev',
    },
  });

  var swiper = new Swiper('.qrt-testimonials-slider', {
    slidesPerView: 2,
    speed: 800,
    spaceBetween: 20,
    autoplay: {
      delay: 6000,
    },
    pagination: {
      el: '.swiper-testi-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.qrt-testi-next',
      prevEl: '.qrt-testi-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 1,
      },
    },
  });

  // brands slider
  var swiper = new Swiper('.qrt-brands-slider', {
    slidesPerView: 4,
    speed: 6000,
    loop: true,
    spaceBetween: 20,
    autoplay: {
      delay: 0,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
    },
  });

  // latest works slider
  var swiper = new Swiper('.qrt-latest-works-slider', {
    slidesPerView: 2,
    speed: 800,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-latest-works-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.qrt-latest-works-next',
      prevEl: '.qrt-latest-works-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 1,
      },
    },
  });

  var swiper = new Swiper('.qrt-pop-post-slider', {
    slidesPerView: 2,
    speed: 800,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pp-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.qrt-pp-next',
      prevEl: '.qrt-pp-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 1,
      },
    },
  });

  $('[data-fancybox="diploma"]').fancybox({
    animationEffect: "zoom-in-out",
    animationDuration: 600,
    transitionDuration: 1000,
    buttons: [
      "zoom",
      "slideShow",
      "thumbs",
      "close",
    ],
  });

  $('[data-fancybox="recommendation"]').fancybox({
    animationEffect: "zoom-in-out",
    animationDuration: 600,
    transitionDuration: 1000,
    buttons: [
      "zoom",
      "slideShow",
      "thumbs",
      "close",
    ],
  });

  $('[data-fancybox="works"]').fancybox({
    animationEffect: "zoom-in-out",
    animationDuration: 600,
    transitionDuration: 1000,
    buttons: [
      "zoom",
      "slideShow",
      "thumbs",
      "close",
    ],
  });

  $.fancybox.defaults.hash = false;

  // portfolio filter
  $('.qrt-filter a').on('click', function() {
    $('.qrt-filter .qrt-current').removeClass('qrt-current');
    $(this).addClass('qrt-current');

    var selector = $(this).data('filter');
    $('.qrt-masonry-grid').isotope({
      filter: selector
    });
    return false;
  });

  $('.qrt-masonry-grid').isotope({
    filter: '*',
    itemSelector: '.qrt-masonry-grid-item',
    percentPosition: true,
    masonry: {
      columnWidth: '.qrt-grid-sizer'
    }
  });

  $('.qrt-counter').each(function() {
    $(this).prop('Counter', 0).animate({
      Counter: $(this).text()
    }, {
      duration: 2000,
      easing: 'linear',
      step: function(now) {
        $(this).text(Math.ceil(now));
      }
    });
  });

  $(".qrt-lock").on('click', function() {
    $('.qrt-map').toggleClass('qrt-active');
    $('.qrt-lock').toggleClass('qrt-active');
    $('.qrt-lock .fas').toggleClass('fa-unlock');
  });

  $(".qrt-menu nav ul li a").on('click', function() {
    if ($(this).hasClass("qrt-mobile-fix")) {
      $('.qrt-menu , .qrt-menu-btn').addClass('qrt-active');
    } else {
      $('.qrt-menu , .qrt-menu-btn').removeClass('qrt-active');
    }
  });

  $('.qrt-info-btn').on('click', function() {
    $('.qrt-info , .qrt-info-btn , .qrt-curtain').toggleClass('qrt-active');
    $('.qrt-menu , .qrt-menu-btn').removeClass('qrt-active');
    $('.qrt-search , .qrt-search-btn').removeClass('qrt-active');
  });

  $('.qrt-info-frame a').on('click', function() {
    $('.qrt-info , .qrt-info-btn , .qrt-curtain').removeClass('qrt-active');
  });

  $(document).on('click', function(e) {
    var el = '.qrt-info , .qrt-info-btn';
    if (jQuery(e.target).closest(el).length) return;
    $('.qrt-info , .qrt-info-btn , .qrt-curtain').removeClass('qrt-active');
  });

  $('.qrt-menu-btn').on('click', function() {
    $('.qrt-menu , .qrt-menu-btn').toggleClass('qrt-active');
    $('.qrt-info , .qrt-info-btn , .qrt-curtain').removeClass('qrt-active');
    $('.qrt-search , .qrt-search-btn').removeClass('qrt-active');
  });

  $(document).on('click', function(e) {
    var el = '.qrt-menu , .qrt-menu-btn';
    if (jQuery(e.target).closest(el).length) return;
    $('.qrt-menu , .qrt-menu-btn').removeClass('qrt-active');
  });

  $('.qrt-search-btn').on('click', function() {
    $('.qrt-search , .qrt-search-btn').toggleClass('qrt-active');
    $('.qrt-menu , .qrt-menu-btn').removeClass('qrt-active');
    $('.qrt-info , .qrt-info-btn , .qrt-curtain').removeClass('qrt-active');
  });

  $(document).on('click', function(e) {
    var el = '.qrt-search , .qrt-search-btn';
    if (jQuery(e.target).closest(el).length) return;
    $('.qrt-search , .qrt-search-btn').removeClass('qrt-active');
  });

  $('.current-menu-item a').clone().prependTo('.qrt-current-page-title');

  anime({
    targets: '.qrt-follower',
    scale: 0,
  });

  $(".qrt-menu nav ul li a").mouseover(function() {
    anime({
      targets: '.qrt-follower',
      scale: 1,
      background: 'rgba(222,225,230,1)',
    });
  });
  $(".qrt-menu nav ul li a").mouseout(function() {
    anime({
      targets: '.qrt-follower',
      scale: 0,
      background: '#fff',
    });
  });

  $(".qrt-menu nav ul li ul li a").mouseover(function() {
    anime({
      targets: '.qrt-follower',
      scale: 1,
      background: '#fff',
    });
  });
  $(".qrt-menu nav ul li ul li a").mouseout(function() {
    anime({
      targets: '.qrt-follower',
      scale: 0,
      background: '#fff',
    });
  });

  $(".qrt-cursor-scale , .qrt-btn").mouseover(function() {
    anime({
      targets: '.qrt-follower',
      scale: 1,
    });
  });
  $(".qrt-cursor-scale , .qrt-btn").mouseout(function() {
    anime({
      targets: '.qrt-follower',
      scale: 0,
    });
  });

  $(".qrt-cursor-color").mouseover(function() {
    anime({
      targets: '.qrt-follower',
      background: 'rgba(222,225,230,1)',
    });
  });
  $(".qrt-cursor-color").mouseout(function() {
    anime({
      targets: '.qrt-follower',
      background: '#fff',
    });
  });

  $('.qrt-input').keyup(function() {
    if ($(this).val()) {
      $(this).addClass('qrt-active');
    } else {
      $(this).removeClass('qrt-active');
    }
  });

  if ($("div").is("#map")) {
    mapboxgl.accessToken = 'pk.eyJ1IjoibXVueWl0ZTAwMSIsImEiOiJjbHYyYmxheGkwZHluMmlyeWdiaWwxYTVrIn0.-lAOGSexrKEQkxtoBm4OjQ';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [36.82389459391292, -1.2833118709052815], 
      zoom: 14

    });

    var marker = new mapboxgl.Marker()
      .setLngLat([36.82389459391292, -1.2833118709052815])
      .addTo(map);
  }

  // reinit
  document.addEventListener("swup:contentReplaced", function() {

    Scrollbar.use(OverscrollPlugin);
    var scrollbar = Scrollbar.init(document.querySelector('#qrt-scroll-content'), {
      damping: 0.17,
      renderByPixel: true,
      continuousScrolling: true,
      plugins: {
        overscroll: {
          effect: 'bounce',
          damping: 0.15,
          maxOverscroll: 80
        },
        mobile: {
          speed: 0.2,
          alwaysShowTracks: false
        }
      },
    });

    Scrollbar.use(OverscrollPlugin);
    Scrollbar.init(document.querySelector('#qrt-scroll-info'), {
      damping: 0.17,
      renderByPixel: true,
      continuousScrolling: true,
      plugins: {
        overscroll: {
          effect: 'bounce',
          damping: 0.15,
          maxOverscroll: 80
        },
        mobile: {
          speed: 0.2,
          alwaysShowTracks: false
        }
      },
    });

    var fixedElem = document.getElementById('fixed');

    if ($(window).width() > 1200) {
      scrollbar.addListener(function(status) {
        var offset = status.offset;

        fixed.style.top = offset.y + 'px';
        fixed.style.left = offset.x + 'px';
      });
    }

    $(window).resize(function() {
      if ($(window).width() > 1200) {
        scrollbar.addListener(function(status) {
          var offset = status.offset;

          fixed.style.top = offset.y + 'px';
          fixed.style.left = offset.x + 'px';
        });
        $(fixedElem).css('position', 'relative')
      }
      if ($(window).width() < 1200) {
        scrollbar.addListener(function(status) {
          var offset = status.offset;

          fixed.style.top = offset.y + 'px';
          fixed.style.left = offset.x + 'px';
        });
        $(fixedElem).css('position', 'static')
      }
    });

    var swiper = new Swiper('.qrt-main-slider', {
      slidesPerView: 1,
      speed: 800,
      parallax: true,
      mousewheel: true,
      mousewheel: {
        releaseOnEdges: true,
      },
      keyboard: true,
      autoplay: {
        delay: 6000,
      },
      pagination: {
        el: '.swiper-main-pagination',
        type: 'progressbar',
      },
      navigation: {
        nextEl: '.qrt-main-next',
        prevEl: '.qrt-main-prev',
      },
    });

    var swiper = new Swiper('.qrt-main-slider-onepage', {
      slidesPerView: 1,
      speed: 800,
      parallax: true,
      keyboard: true,
      autoplay: {
        delay: 6000,
      },
      pagination: {
        el: '.swiper-main-pagination',
        type: 'progressbar',
      },
      navigation: {
        nextEl: '.qrt-main-next',
        prevEl: '.qrt-main-prev',
      },
    });

    var swiper = new Swiper('.qrt-testimonials-slider', {
      slidesPerView: 2,
      speed: 800,
      spaceBetween: 20,
      autoplay: {
        delay: 6000,
      },
      pagination: {
        el: '.swiper-testi-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.qrt-testi-next',
        prevEl: '.qrt-testi-prev',
      },
      breakpoints: {
        992: {
          slidesPerView: 1,
        },
      },
    });

    // brands slider
    var swiper = new Swiper('.qrt-brands-slider', {
      slidesPerView: 4,
      speed: 6000,
      loop: true,
      spaceBetween: 20,
      autoplay: {
        delay: 0,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      },
    });

    // latest works slider
    var swiper = new Swiper('.qrt-latest-works-slider', {
      slidesPerView: 2,
      speed: 800,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-latest-works-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.qrt-latest-works-next',
        prevEl: '.qrt-latest-works-prev',
      },
      breakpoints: {
        992: {
          slidesPerView: 1,
        },
      },
    });

    var swiper = new Swiper('.qrt-pop-post-slider', {
      slidesPerView: 2,
      speed: 800,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pp-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.qrt-pp-next',
        prevEl: '.qrt-pp-prev',
      },
      breakpoints: {
        992: {
          slidesPerView: 1,
        },
      },
    });

    $('[data-fancybox="diploma"]').fancybox({
      animationEffect: "zoom-in-out",
      animationDuration: 600,
      transitionDuration: 1000,
      buttons: [
        "zoom",
        "slideShow",
        "thumbs",
        "close",
      ],
    });

    $('[data-fancybox="recommendation"]').fancybox({
      animationEffect: "zoom-in-out",
      animationDuration: 600,
      transitionDuration: 1000,
      buttons: [
        "zoom",
        "slideShow",
        "thumbs",
        "close",
      ],
    });

    $('[data-fancybox="works"]').fancybox({
      animationEffect: "zoom-in-out",
      animationDuration: 600,
      transitionDuration: 1000,
      buttons: [
        "zoom",
        "slideShow",
        "thumbs",
        "close",
      ],
    });

    $.fancybox.defaults.hash = false;

    // portfolio filter
    $('.qrt-filter a').on('click', function() {
      $('.qrt-filter .qrt-current').removeClass('qrt-current');
      $(this).addClass('qrt-current');

      var selector = $(this).data('filter');
      $('.qrt-masonry-grid').isotope({
        filter: selector
      });
      return false;
    });

    $('.qrt-masonry-grid').isotope({
      filter: '*',
      itemSelector: '.qrt-masonry-grid-item',
      percentPosition: true,
      masonry: {
        columnWidth: '.qrt-grid-sizer'
      }
    });

    $('.qrt-counter').each(function() {
      $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
      }, {
        duration: 2000,
        easing: 'linear',
        step: function(now) {
          $(this).text(Math.ceil(now));
        }
      });
    });

    $(".qrt-lock").on('click', function() {
      $('.qrt-map').toggleClass('qrt-active');
      $('.qrt-lock').toggleClass('qrt-active');
      $('.qrt-lock .fas').toggleClass('fa-unlock');
    });

    $(".qrt-menu nav ul li a").on('click', function() {
      if ($(this).hasClass("qrt-mobile-fix")) {
        $('.qrt-menu , .qrt-menu-btn').addClass('qrt-active');
      } else {
        $('.qrt-menu , .qrt-menu-btn').removeClass('qrt-active');
      }
    });

    $('.current-menu-item a').clone().prependTo('.qrt-current-page-title');

    anime({
      targets: '.qrt-follower',
      scale: 0,
    });

    $(".qrt-menu nav ul li a").mouseover(function() {
      anime({
        targets: '.qrt-follower',
        scale: 1,
        background: 'rgba(222,225,230,1)',
      });
    });
    $(".qrt-menu nav ul li a").mouseout(function() {
      anime({
        targets: '.qrt-follower',
        scale: 0,
        background: '#fff',
      });
    });

    $(".qrt-menu nav ul li ul li a").mouseover(function() {
      anime({
        targets: '.qrt-follower',
        scale: 1,
        background: '#fff',
      });
    });
    $(".qrt-menu nav ul li ul li a").mouseout(function() {
      anime({
        targets: '.qrt-follower',
        scale: 0,
        background: '#fff',
      });
    });

    $(".qrt-cursor-scale").mouseover(function() {
      anime({
        targets: '.qrt-follower',
        scale: 1,
      });
    });
    $(".qrt-cursor-scale").mouseout(function() {
      anime({
        targets: '.qrt-follower',
        scale: 0,
      });
    });

    $(".qrt-cursor-color").mouseover(function() {
      anime({
        targets: '.qrt-follower',
        background: 'rgba(222,225,230,1)',
      });
    });
    $(".qrt-cursor-color").mouseout(function() {
      anime({
        targets: '.qrt-follower',
        background: '#fff',
      });
    });

    $('.qrt-input').keyup(function() {
      if ($(this).val()) {
        $(this).addClass('qrt-active');
      } else {
        $(this).removeClass('qrt-active');
      }
    });
    if ($("div").is("#map")) {
      mapboxgl.accessToken = 'pk.eyJ1Ijoic3Rvc2NhciIsImEiOiJja2VpbDE4b2UwbDg3MnNwY2d3YzlvcDV5In0.e26tLedpKwxrkOmPkWhQlg';
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/stoscar/ckggs77460wxw19ob8q5wldwf',
        center: [-79.394900, 43.643102],
        zoom: 14

      });

      var marker = new mapboxgl.Marker()
        .setLngLat([-79.394900, 43.643102])
        .addTo(map);
    }
  });
});


//Dynamically load the portfolio items

// DYNAMICALLY LOADS PORTFOLIO IMAGES

var gallery = [];

function fetchImages() {
  fetch("/admin/images")
    .then(response => response.json())
    .then(data => {
      gallery.push(...data["images"]);
      // Once the images are fetched, update the grid items
      updateGridItems();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function updateGridItems() {
  var portfolio = document.querySelector('.portfolio-image-grid');
  if (gallery.length < 1) {
    portfolio.textContent = '<p>No Images To Show </p>';
  } else {
    portfolio.innerHTML = gallery.map((image) => {
      return `
      <div class="qrt-masonry-grid-item ${image.category.toLowerCase()}">
            <div class="qrt-work-item">
                <a data-fancybox="works" href="${image.filepath}" class="qrt-cursor-scale qrt-work-cover-frame"><img src="${image.filepath}" alt="work cover">
                    <div class="qrt-item-zoom qrt-cursor-color"><i class="fas fa-expand"></i></div>
                    <div class="qrt-work-category"><span>${image.category}</span></div>
                </a>
                <div class="qrt-work-descr">
                    <h4 class="qrt-cursor-color qrt-white"><a href="#" class="qrt-anima-link">${image.filename}</a></h4>
                </div>
            </div>
        </div>`;
    }).join('');
  }
}

// Filter function
function filterItems(category) {
  var gridItems = document.querySelectorAll('.qrt-masonry-grid-item');
  gridItems.forEach(item => {
    if (category === '*' || item.classList.contains(category.slice(1))) {
      item.style.display = 'block'; // Show items in selected category
    } else {
      item.style.display = 'none'; // Hide items not in selected category
    }
  });
}

// Event listener for filter buttons
const filterButtons = document.querySelectorAll('.qrt-work-category');
filterButtons.forEach(button => {
  button.addEventListener('click', function() {
    const category = this.getAttribute('data-filter');
    filterItems(category);
  });
});
fetchImages();


//  Handle form submits
const form = document.getElementById('form');
const modal = document.getElementById('success-modal');

form.addEventListener('submit', (e) => {
  e.preventDefault()
  sendMessage()
})

//  Function to send the message to the server
function sendMessage() {
  // Get the form data
  let formData = new FormData(form);

  // Send a POST request to the server
  fetch('/messages', {
      method: 'POST',
      body: formData
  })
  .then(response => {
      if (response.ok) {
          // Display a success message or modal
          console.log('Message sent successfully');
          modal.style.display="flex"
          setTimeout(() => {
            modal.style.display="none"
          }, 1500)
          document.getElementById('name').value= ''
          document.getElementById('email').value= ''
          document.getElementById('message').value= ''
      } else {
          // Handle the error
          console.error('Failed to send message');
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
}
