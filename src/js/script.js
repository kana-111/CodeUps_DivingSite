jQuery(function ($) {});

loading;
const loading = document.querySelector(".js-loading");
const body = document.querySelector(".js-body");
window.addEventListener("load", () => {
  function loadingAnime() {
    body.classList.toggle("is-active");
    gsap
      .timeline()
      .from(".js-loading-text", {
        duration: 0.5,
        autoAlpha: 0,
      })
      .from(".loading__image", {
        duration: 1,
        autoAlpha: 0,
        y: 800,
        stagger: {
          each: 0.1,
        },
      })
      .from(".js-loading-text-white", {
        delay: 0.5,
        duration: 1,
        autoAlpha: 0,
      })
      .to(".js-loading-text-white,.js-loading", {
        delay: 1,
        duration: 0.5,
        autoAlpha: 0,
        onComplete: function () {
          body.classList.toggle("is-active");
        },
      });
  }
  loadingAnime();
});

// ハンバーガーメニュー
$(function () {
  $(".js-hamburger,.js-drawer").click(function () {
    $(".js-hamburger").toggleClass("is-active");
    $(".body").toggleClass("is-active");
    $(".js-drawer").fadeToggle();
  });
});

//MVスワイパー
let mv__slider = new Swiper(".js-mv-slider", {
  loop: true,
  effect: "fade",
  autoplay: {
    delay: 4000,
    disableOnInteraction: false, // ユーザーが操作しても自動再生を継続
  },
  speed: 4000,
  allowTouchMove: false,
  allowSlideNext: true,
  allowSlidePrev: true,
});

//Campaignスワイパー
const campaign__slider = new Swiper(".js-campaign-slider", {
  allowTouchMove: true,
  allowSlideNext: true,
  allowSlidePrev: true,
  slidesPerView: "auto",
  spaceBetween: 24,
  loop: true,
  autoHeight: false,
  freeMode: true,
  breakpoints: {
    767: {
      spaceBetween: 40,
    },
  },
  navigation: {
    nextEl: ".campaign__slider-next",
    prevEl: ".campaign__slider-prev",
  },
});

//imgアニメーション
var box = $(".colorbox"),
  speed = 700;

box.each(function () {
  $(this).append('<div class="color"></div>');
  var color = $(this).find($(".color")),
    image = $(this).find("img");
  var counter = 0;

  image.css("opacity", "0");
  color.css("width", "0%");

  color.on("inview", function () {
    if (counter == 0) {
      $(this)
        .delay(200)
        .animate({ width: "100%" }, speed, function () {
          image.css("opacity", "1");
          $(this).css({ left: "0", right: "auto" });
          $(this).animate({ width: "0%" }, speed);
        });
      counter = 1;
    }
  });
});

//page-top
//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
  var scroll = $(window).scrollTop(); //スクロール値を取得
  if (scroll >= 500) {
    //500pxスクロールしたら
    $(".page-top").removeClass("DownMove"); // DownMoveというクラス名を除去して
    $(".page-top").addClass("UpMove"); // UpMoveというクラス名を追加して出現
  } else {
    //それ以外は
    if ($(".page-top").hasClass("UpMove")) {
      //UpMoveというクラス名が既に付与されていたら
      $(".page-top").removeClass("UpMove"); //  UpMoveというクラス名を除去し
      $(".page-top").addClass("DownMove"); // DownMoveというクラス名を追加して非表示
    }
  }

  var wH = window.innerHeight; //画面の高さを取得
  var footerPos = $(".footer").offset().top; //footerの位置を取得
  if (scroll + wH >= footerPos + 13) {
    var pos = scroll + wH - footerPos + 13; //スクロールの値＋画面の高さからfooterの位置＋8pxを引いた場所を取得し
    $(".page-top").css("bottom", pos); //.page-topに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
  } else {
    //それ以外は
    if ($(".page-top").hasClass("UpMove")) {
      //UpMoveというクラス名がついていたら
      $(".page-top").css("bottom", "20px"); // 下から20pxの位置にページリンクを指定
    }
  }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on("load", function () {
  PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
});

// .page-topをクリックした際の設定
$(".page-top").click(function () {
  $("body,html").animate(
    {
      scrollTop: 0, //ページトップまでスクロール
    },
    400
  ); //ページトップスクロールの速さ。数字が大きいほど遅くなる
  return false; //リンク自体の無効化
});

//about-gallery
jQuery(function ($) {
  $(".js-modal-open").each(function () {
      $(this).on("click", function (e) {
          e.preventDefault();
          var target = $(this).data("target");
          var modal  = document.getElementById(target);
          $(modal).addClass("is-active");
          $(modal).fadeIn();
          $("html,body").css("overflow", "hidden");
      });
  });
  $(".js-modal-close").on("click", function () {
    $(".modal").removeClass("is-active");
      $(".js-modal").fadeOut();
      $("html,body").css("overflow", "initial");
  });
});

//tab切り替え
//任意のタブにURLからリンクするための設定
function GethashID(hashIDName) {
  if (hashIDName) {
    $(".tab__item")
      .find("a")
      .each(function () {
        //タブ内のaタグ全てを取得
        var idName = $(this).attr("href"); //タブ内のaタグのリンク名（例）#lunchの値を取得
        if (idName == hashIDName) {
          //リンク元の指定されたURLのハッシュタグ（例）http://example.com/#lunch←この#の値とタブ内のリンク名（例）#lunchが同じかをチェック
          var parentElm = $(this).parent(); //タブ内のaタグの親要素（li）を取得
          $(".tab__item").removeClass("active"); //タブ内のliについているactiveクラスを取り除き
          $(parentElm).addClass("active"); //リンク元の指定されたURLのハッシュタグとタブ内のリンク名が同じであれば、liにactiveクラスを追加
          //表示させるエリア設定
          $(".tab__content-area").removeClass("is-active"); //もともとついているis-activeクラスを取り除き
          $(hashIDName).addClass("is-active"); //表示させたいエリアのタブリンク名をクリックしたら、表示エリアにis-activeクラスを追加
        }
      });
  }
}

//タブをクリックしたら
$(".tab__item a").on("click", function () {
  var idName = $(this).attr("href"); //タブ内のリンク名を取得
  GethashID(idName); //設定したタブの読み込みと
  return false; //aタグを無効にする
});

// 上記の動きをページが読み込まれたらすぐに動かす
$(window).on("load", function () {
  $(".tab__item:first-of-type").addClass("active"); //最初のliにactiveクラスを追加
  $(".tab__content-area:first-of-type").addClass("is-active"); //最初の.areaにis-activeクラスを追加
  var hashName = location.hash; //リンク元の指定されたURLのハッシュタグを取得
  GethashID(hashName); //設定したタブの読み込み
});
