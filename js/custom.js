document.addEventListener('DOMContentLoaded', () => {


  var doc = document.documentElement;
  var w = window;

  var prevScroll = w.scrollY || doc.scrollTop;
  var curScroll;
  var direction = 0;
  var prevDirection = 0;

  var header = document.querySelector('.site-header');
  var headerHeight = header.offsetHeight
  var checkScroll = function () {

    /*
    ** Find the direction of scroll
    ** 0 - initial, 1 - up, 2 - down
    */

    curScroll = w.scrollY || doc.scrollTop;
    if (curScroll > prevScroll) {
      //scrolled up
      direction = 2;
    }
    else if (curScroll < prevScroll) {
      //scrolled down
      direction = 1;
    }

    if (direction !== prevDirection) {
      toggleHeader(direction, curScroll);
    }

    prevScroll = curScroll;
  };

  var toggleHeader = function (direction, curScroll) {
    if (direction === 2 && curScroll > headerHeight) {

      //replace 52 with the height of your header in px

      header.classList.add('hide');
      prevDirection = direction;
    }
    else if (direction === 1) {
      header.classList.remove('hide');
      prevDirection = direction;
    }
  };

  window.addEventListener('scroll', checkScroll);


})


var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})// Serch
function searchToggle(obj, evt) {
  var container = $(obj).closest('.search-wrapper');
  if (!container.hasClass('active')) {
    container.addClass('active');
    evt.preventDefault();
  }
  else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
    container.removeClass('active');
    // clear input
    container.find('.search-input').val('');
  }
} $(document).ready(function () {
  $(window).scroll(function () {
    var sc = $(window).scrollTop()
    if (sc > 150) {
      $(".site-header.fixed").addClass("fixedActive")
    } else {
      $(".site-header.fixed").removeClass("fixedActive")
    }
  });
  // Truncate Text
  function truncateText(characterLimit, containerClassName) {
    var showChar = characterLimit;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "more";
    var lesstext = "less";


    $(containerClassName).each(function () {
      var content = $(this).html();

      if (content.length > showChar) {

        var c = content.substr(0, showChar);
        var h = content.substr(showChar, content.length - showChar);

        var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

        $(this).html(html);
      }

    });


    $(".morelink").on('click', function () {
      if ($(this).hasClass("less")) {
        $(this).removeClass("less");
        $(this).html(moretext);
      } else {
        $(this).addClass("less");
        $(this).html(lesstext);
      }
      $(this).parent().prev().toggle();
      $(this).prev().toggleClass("more-content-show");
      return false;
    });
  };

  truncateText(50, '.truncateText');

  $(".edit-package-btn").on('click', function (e) {
    e.preventDefault()
    targetID = $(this).attr('data-package');
    $('body').find(targetID).addClass('active');
    $("#" + targetID).addClass('active');
    $('body').find(".plan-info").addClass("plan-info-hidden")

  });
  $('.btn-action').on('click', function (e) {
    e.preventDefault()
    $(this).next(".card-post__content-right").toggleClass("active")
  })
});




function upload(uploadFileName, uploadBtOuter, uploadedView, fileRemove, errorMsg) {
  // Upload Photo
  var btnUpload = $(uploadFileName),
    btnOuter = $(uploadBtOuter);
  btnUpload.on("change", function (e) {
    var ext = btnUpload.val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
      $(errorMsg).text("Not an Image...");
    } else {
      $(errorMsg).text("");
      btnOuter.addClass("file_uploading");
      setTimeout(function () {
        btnOuter.addClass("file_uploaded");
      }, 3000);
      var uploadedFile = URL.createObjectURL(e.target.files[0]);
      setTimeout(function () {
        $(uploadedView).append('<img src="' + uploadedFile + '" />').addClass("show");
      }, 3500);
    }
  });
  $(fileRemove).on("click", function (e) {
    $(uploadedView).removeClass("show");
    $(uploadedView).find("img").remove();
    btnOuter.removeClass("file_uploading");
    btnOuter.removeClass("file_uploaded");
  });
}

upload('#upload_file', '.button_outer', '#uploaded_view', '.file_remove', '.error_msg');
upload('#upload_file1', '.button_outer1', '#uploaded_view1', '.file_remove1', '.error_msg1');


$('.sidebar, .main-content-wrapper').addClass("active")
$('.sidebar-toggle').on('click', function (e) {
  e.preventDefault();
  $(this).parent().toggleClass("active");
  $(this).parent().parent().toggleClass("active");

})
if ($(".custom-tab").length > 0) {
  var nav = $('.custom-tab');
  var line = $('<div />').addClass('line');

  line.appendTo(nav);

  var active = nav.find('.active');
  var pos = 0;
  var wid = 0;

  if (active.length) {
    pos = active.position().left;
    wid = active.width();
    line.css({
      left: pos,
      width: wid
    });
  }

  nav.find('ul li a').click(function (e) {
    e.preventDefault();
    if (!$(this).parent().hasClass('active') && !nav.hasClass('animate')) {

      nav.addClass('animate');

      var _this = $(this);

      nav.find('ul li').removeClass('active');

      var position = _this.parent().position();
      var width = _this.parent().width();

      if (position.left >= pos) {
        line.animate({
          width: ((position.left - pos) + width)
        }, 300, function () {
          line.animate({
            width: width,
            left: position.left
          }, 150, function () {
            nav.removeClass('animate');
          });
          _this.parent().addClass('active');
        });
      } else {
        line.animate({
          left: position.left,
          width: ((pos - position.left) + wid)
        }, 300, function () {
          line.animate({
            width: width
          }, 150, function () {
            nav.removeClass('animate');
          });
          _this.parent().addClass('active');
        });
      }

      pos = position.left;
      wid = width;
    }
  });
}



// upload Video
function uploadVideo(uploadVideoFileName, uploadVideoBtnOuter, uploadedVideoView, videoFileRemove, errorVideoMsg) {
  var btnVideoUpload = $(uploadVideoFileName),
    btnVideoOuter = $(uploadVideoBtnOuter);
  btnVideoUpload.on("change", function (e) {
    var ext = btnVideoUpload.val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['webm', 'mp4', 'ogg']) == -1) {
      $(errorVideoMsg).text("Not a video...");
    } else {
      $(errorVideoMsg).text("");
      btnVideoOuter.addClass("file_video_uploading");
      setTimeout(function () {
        btnVideoOuter.addClass("file_video_uploaded");
      }, 3000);
      var uploadedFile1 = URL.createObjectURL(e.target.files[0]);
      setTimeout(function () {
        $(uploadedVideoView).append('<video width="150" height="150" src="' + uploadedFile1 + '" />').addClass("show");
      }, 3500);
    }
  });
  $(videoFileRemove).on("click", function (e) {
    $(uploadedVideoView).removeClass("show");
    $(uploadedVideoView).find("video").remove();
    btnVideoOuter.removeClass("file_video_uploading");
    btnVideoOuter.removeClass("file_video_uploaded");
  });
}
uploadVideo('#upload_video_file', '.button_video_outer', '#uploaded_video_view', '.file_video_remove', '.error_video_msg');


$('.card-detail-tab a').on('click', function (e) {
  var href = $(this).attr('data-attr');
  $('html, body').animate({
    scrollTop: $(href).offset().top
  }, '300');
  e.preventDefault();

});


var btn = $('.backToTop');

$(window).scroll(function () {
  if ($(window).scrollTop() > 400) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, '300');
});

