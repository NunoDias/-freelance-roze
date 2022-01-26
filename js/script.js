var swiperRozetin = new Swiper(".swiper-rozetin");
var popup = document.getElementById("stucture-popUp");
var home = document.getElementById("home");

var currentTimeEvent = "";

function trackTime(eventID) {
  if (currentTimeEvent != "") {
    try {
      Tracking.endEvent(currentTimeEvent);
    } catch (error) {
      console.log(error);
    }
    currentTimeEvent = "";
  }

  if (eventID != "") {
    var stringEventID = eventID.toString();
    try {
      Tracking.startEvent(stringEventID, stringEventID, null, true).then(
        function (idEvent) {
          currentTimeEvent = idEvent;
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}

function trackTimeEvent(element){
  let currentPageEvent = element.find('.swiper-slide.swiper-slide-active').attr('data-md-event-id');
  console.log(element.find('.swiper-slide.swiper-slide-active').attr('data-md-event-id'))
  trackTime(currentPageEvent);
}


swiperRozetin.on('slideChangeTransitionEnd', function () {
  trackTimeEvent($('#rozetin'));
});


// When the user clicks on <div>, open the popup
function openStucture() {
  var popup = document.getElementById("stucture-popUp");
  popup.classList.toggle("show");
}

function showPopup(elementId) {
  document.getElementById(elementId).classList.toggle("show");
}

function closePopup(elementId) {
  document.getElementById(elementId).classList.remove("show");
}

function interacaoPopUp() {
  var logo = document.getElementById("interacao-top");
  logo.scrollIntoView({ block: "center" });
  document.getElementById("interacao-popUp").classList.toggle("show");
}

function closeInteracaoPopUp() {
  document.getElementById("interacao-popUp").classList.remove("show");
}

/* Thumbnails */

function clickHome() {
  popup.classList.remove("show");
  swiperRozetin.slideTo(0, 1000, true);
}

function clickPage2() {
  popup.classList.remove("show");

  swiperRozetin.slideTo(1, 1000, true);
}

function clickPage3() {
  popup.classList.remove("show");

  swiperRozetin.slideTo(2, 1000, true);
}

function clickPage4() {
  popup.classList.remove("show");

  swiperRozetin.slideTo(3, 1000, true);
}

function clickPage5() {
  popup.classList.remove("show");

  swiperRozetin.slideTo(4, 1000, true);
}

function clickPage6() {
  popup.classList.remove("show");

  swiperRozetin.slideTo(5, 1000, true);
}

function clickPage7() {
  popup.classList.remove("show");

  swiperRozetin.slideTo(6, 1000, true);
}

function clickPage8() {
  popup.classList.remove("show");

  swiperRozetin.slideTo(7, 1000, true);
}

function refsopUp() {
  var logo = document.getElementById("ref-top");
  logo.scrollIntoView({ block: "center" });
  document.getElementById("ref-popUp").classList.toggle("show");
}

function closeRefsPopUp() {
  closePopup("ref-popUp");
}

function openIcrm() {
  var logo = document.getElementById("icrm-popUp");
  logo.scrollIntoView({ block: "center" });
  document.getElementById("icrm-popUp").classList.toggle("show");
}

function closeIcrm() {
  closePopup("icrm-popUp");
}

function closeStucture() {
  popup.classList.remove("show");
}

window.addEventListener(
  "DOMContentLoaded",
  function (e) {
    var myHilitor2 = new Hilitor("playground");
    myHilitor2.setMatchType("left");
    document.getElementById("keywords").addEventListener(
      "keyup",
      function (e) {
        myHilitor2.apply(this.value);
        var element = document.querySelectorAll("mark");
        if (element.length > 0) {
          element[0].scrollIntoView({ behavior: "smooth", block: "center" });
        }
      },
      false
    );
  },
  false
);

document.getElementById("search-icon").addEventListener(
  "click",
  function (e) {
    var myHilitor2 = new Hilitor("playground");
    myHilitor2.setMatchType("left");
    console.log(this.value);
    const value = document.getElementById("keywords").value;
    myHilitor2.apply(value);
    var element = document.querySelectorAll("mark");
    console.log(element);
    if (element.length > 0) {
      element[0].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  },
  false
);

window.addEventListener(
  "DOMContentLoaded",
  function (e) {
    var myHilitor21 = new Hilitor("hilighters");
    myHilitor21.setMatchType("left");
    document.getElementById("keywordss").addEventListener(
      "keyup",
      function (e) {
        myHilitor21.apply(this.value);
        var element = document.querySelectorAll("mark");
        if (element.length > 0) {
          element[0].scrollIntoView({ behavior: "smooth", block: "center" });
        }
      },
      false
    );
  },
  false
);
document.getElementById("search-icons").addEventListener(
  "click",
  function (e) {
    var myHilitor211 = new Hilitor("hilighters");
    myHilitor211.setMatchType("left");
    console.log(this.value);
    const value = document.getElementById("keywordss").value;
    myHilitor211.apply(value);
    var element = document.querySelectorAll("mark");
    console.log(element);
    if (element.length > 0) {
      element[0].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  },
  false
);

var myHilitor = new Hilitor("hilighters"); // id of the element to parse
myHilitor.apply("highlight words");

function analyzePage4Chart1PopUp() {
  showPopup("analyze-page-4-chart-1-popUp");
}

function closeanalyzePage4Chart1PopUp() {
  closePopup("analyze-page-4-chart-1-popUp");
}

/* IECRCM */

function IECRCM() {
  showPopup("icrm-popUp");
}

function closeIcrm() {
  closePopup("icrm-popUp");
}

/* Slide 2 - GAZILION BTNS */
function gazilionPopUp() {
  closePopup("rozetinButtons2-PopUp");
  showPopup("rozetinButtons-PopUp");
}

function closeGazilionPopUp() {
  closePopup("rozetinButtons-PopUp");
}
function gazilionPopUp2() {
  closePopup("rozetinButtons-PopUp");
  showPopup("rozetinButtons2-PopUp");
}

function closeGazilionPopUp2() {
  closePopup("rozetinButtons2-PopUp");
}

/* Slide 3 - Novo Paradima */

function rozetinParadigmaPopUp() {
  showPopup("rozetinParadigma-PopUp");
}

function closerozetinParadigmaPopUp() {
  closePopup("rozetinParadigma-PopUp");
}

/* Slide 4 */

function rozetinAlvosLDLPopUp() {
  showPopup("rozetinReducaoLDLEstrategias-PopUp");
}

function closerozetinAlvosLDLPopUp() {
  closePopup("rozetinReducaoLDLEstrategias-PopUp");
}

/* Slide 5 */

/* C-LDL */
function rozetinLDLPopUp() {
  showPopup("rozetinReducaoLDL-PopUp");
}
function closerozetinLDLPopUp() {
  closePopup("rozetinReducaoLDL-PopUp");
}

/* Redução Placas Coronárias*/
function rozetinPlacasCoronariasPopUp() {
  showPopup("rozetinReducaoPlacasCoronarias-PopUp");
}
function closerozetinPlacasCoronariasPopUp() {
  closePopup("rozetinReducaoPlacasCoronarias-PopUp");
}

/* Redução Eventos CardioVasculares */
function rozetinReducaoEventosCardioPopUp() {
  showPopup("rozetinEventosCardiovasculares-PopUp");
}
function closerozetinReducaoEventosCardioPopUp() {
  closePopup("rozetinEventosCardiovasculares-PopUp");
}

/* Slide 6 */

function rozetinFarmacosInibidoresPopUp() {
  showPopup("rozetinFarmacosInibidores-PopUp");
}

function closerozetinFarmacosInibidoresPopUp() {
  closePopup("rozetinFarmacosInibidores-PopUp");
}
/* New Slide 8 */

function rozetinIndicacacoesTerapeuticasPopUp() {
  showPopup("rozetinIndicacoesTerapeuticas-popUp");
}

function closerozetinIndicacacoesTerapeuticasPopUp() {
  closePopup("rozetinIndicacoesTerapeuticas-popUp");
}

function rozetinDosagemPopUp() {
  showPopup("rozetin-slide-8-dosagem-popUp");
}

function closeRozetinDosagemPopUp() {
  closePopup("rozetin-slide-8-dosagem-popUp");
}

function rozetinChegarCoracaoPopUp() {
  showPopup("rozetin-slide-8-seguranca-popUp");
}

function closeozetinChegarCoracaoPopUp() {
  closePopup("rozetin-slide-8-seguranca-popUp");
}
