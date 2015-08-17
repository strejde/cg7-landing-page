


function addBg(elem){
  var bg = document.querySelectorAll(elem), blend, bgcolor, bgop;
  for (var i = 0; i < bg.length; i++) {

    if(bg[i].dataset.bgBlend) {
      blend = bg[i].dataset.bgBlend;
    }
    if(bg[i].dataset.bgColor) {
      bgcolor = bg[i].dataset.bgColor;
    }
    if(bg[i].dataset.bgOpacity) {
      bgop = bg[i].dataset.bgOpacity;
    }

    if(bg[i].classList.contains('parallax')) {
      var pElem = document.createElement('div');
      pElem.setAttribute('class','parallaxing')
      pElem.style.backgroundImage = "url(" + bg[i].dataset.bgSrc + ")";
      if(blend) {
        pElem.style.backgroundColor = bgcolor;
        pElem.style.backgroundBlendMode = blend;
        pElem.style.webkitBackgroundBlendMode = blend;
        pElem.style.opacity = bgop;
      }
      bg[i].insertBefore(pElem, bg[i].firstChild);
    } else {
      bg[i].style.backgroundImage = "url(" + bg[i].dataset.bgSrc + ")";
      if(blend) {
        bg[i].style.backgroundColor = bgcolor;
        bg[i].style.backgroundBlendMode = blend;
        bg[i].style.webkitBackgroundBlendMode = blend;
      }
    }
  };


  function updateScroll() {
    var st = scrollY();
    var parallax = document.querySelectorAll('.parallaxing');

    if(parallax.length > 0) {
      var rect = parallax[0].getBoundingClientRect();
      var pos = document.body.scrollTop;
      var translateY = st*.5,
          translateX = 0,
          scale = 1, 
          opacity = 1,
          viewed = st + getViewportH();

      for (var i = 0; i < parallax.length; i++) {
        if(inViewport(parallax[i])){
          var factor = 0.55;
          var variable = (getViewportH() - parallax[i].offsetHeight) * factor;
          translateY = (viewed - getOffset(parallax[i]).top - parallax[i].offsetHeight)* factor - variable;
          parallax[i].style.WebkitTransform = 'translate3d(' + translateX +'px, ' +   translateY + 'px, 0) scale('+ scale +')';
          parallax[i].style.transform = 'translate3d(' + translateX +'px, ' +   translateY + 'px, 0) scale('+ scale +')';
        }
      }; // for
    
    } // if

  } // onscroll

  window.addEventListener( 'scroll', updateScroll );

}


function loader(){
  var loader = document.getElementById('loading');
  if(loader) {
    // loader.style.display = "block";
    function removeLoader(){
      loader.classList.add('loaded');
      setTimeout(function(){
        document.body.removeChild(loader);
      },700);
    }
    var rl = setTimeout(removeLoader,2000);
    loader.addEventListener('click', function(){
      clearTimeout(rl);
      removeLoader();
    });
  }
}



      













// Utility functions


function testColor(str) {
  var dummy = document.createElement('div');
  dummy.style.color = str;

  // Is the syntax valid?
  if (!dummy.style.color) { return null; }
      
  document.head.appendChild(dummy);
  var normalized = getComputedStyle(dummy).color;
  document.head.removeChild(dummy);
  
  if (!normalized) { return null; }
  var rgb = normalized.match(/\((\d+), (\d+), (\d+)/);
  
  return normalized; // for testing purposes
}

function SelectText(element) {
  var doc = document
      , text = element
      , range, selection
  ;    
  if (doc.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(text);
      range.select();
      /*
      if(range.toString().length === 0){
        range.moveToElementText(text);
        range.select();
      }
      */
  } else if (window.getSelection) {
      selection = window.getSelection();
      if(selection.toString().length === 0){
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
      }
  }
}

var docElem = window.document.documentElement;

function getViewportH() {
  var client = docElem['clientHeight'],
  inner = window['innerHeight'];
  
  if( client < inner ) {
    return inner; 
  } else {
    return client;
  }
}

function scrollY() {
  return window.pageYOffset || docElem.scrollTop;
}

function getOffset( el ) {
  var offsetTop = 0, offsetLeft = 0;
  do {
    if ( !isNaN( el.offsetTop ) ) {
     offsetTop += el.offsetTop;
    }
    if ( !isNaN( el.offsetLeft ) ) {
     offsetLeft += el.offsetLeft;
    }
    } while( el = el.offsetParent )

    return {
    top : offsetTop,
    left : offsetLeft
  }
}

function inViewport( el, h ) {
  var elH = el.offsetHeight,
    scrolled = scrollY(),
    viewed = scrolled + getViewportH(),
    elTop = getOffset(el).top,
    elBottom = elTop + elH,
    h = h || 0;
    return (elTop + elH * h) <= viewed && (elBottom - elH * h) >= scrolled;
}

/* /////////////////////// COUNTDOWN SCRIPT ///////////////////// */

var month = '8';     //  '*' for next month, '0' for this month or 1 through 12 for the month 
var day = '17';       //  Offset for day of month day or + day  
var hour = '14';        //  0 through 23 for the hours of the day
var tz = '-6';         //  Offset for your timezone in hours from UTC
var lab = 'countdown';    //  The id of the page entry where the timezone countdown is to show

function start() {displayTZCountDown(setTZCountDown(month,day,hour,tz),lab);}

    // **    The start function can be changed if required   **
window.onload = start;

////////// ================== //////////////////

function setTZCountDown(month,day,hour,tz) {
	var toDate = new Date();
	if (month == '*')toDate.setMonth(toDate.getMonth() + 1);
		else if (month > 0) 	{ 
			if (month <= toDate.getMonth())toDate.setYear(toDate.getYear() + 1);
			toDate.setMonth(month-1);
		}
		
	if (day.substr(0,1) == '+')  {
		var day1 = parseInt(day.substr(1));
		toDate.setDate(toDate.getDate()+day1);
		}else{
			toDate.setDate(day);
			}
	
	toDate.setHours(hour);
	toDate.setMinutes(0-(tz*60));
	toDate.setSeconds(0);
	
	var fromDate = new Date();
	fromDate.setMinutes(fromDate.getMinutes() + fromDate.getTimezoneOffset());
	
	var diffDate = new Date(0);
	diffDate.setMilliseconds(toDate - fromDate);
	return Math.floor(diffDate.valueOf()/1000);
}

function displayTZCountDown(countdown,tzcd) 	{
	//if (countdown < 0) document.getElementById(tzcd).innerHTML = "Sorry, you are too late."; 
	
	//else { 
	var secs = countdown % 60; 
	
	if (secs < 10) {secs = '0' + secs;}
	var countdown1 = (countdown - secs) / 60;
	var mins = countdown1 % 60; 
	
	
	if (mins < 10) { mins = '0'+mins; }
	countdown1 = (countdown1 - mins) / 60;
	
	var hours = countdown1 % 24;
	var days = (countdown1 - hours) / 24;
	
		var num = "";
		var offset = "";
		var url = "";
		var starthour = (hours-7);
		// ======================================= define button URLs
		var cg7 = "https://nation.campgladiator.com/cg7-link";
		var cg14 = "https://nation.campgladiator.com/cg14-link";
		var cg21 = "https://nation.campgladiator.com/cg21-link";
		var cg28 = "https://nation.campgladiator.com/cg28-link";
		var cg35 = "https://nation.campgladiator.com/cg35-link";
		var cg77 = "https://nation.campgladiator.com/cg77-link";
		var cg0 = "#";
	
	//define waterfall output vars
	if (days <= 0 && hours <= 7) {		
		if (hours === 1){ num = "35"; offset = 0; url = cg35;} 
		if (hours === 2){ num = "28"; offset = 1; url = cg28;} 
		if (hours === 3){ num = "21"; offset = 2; url = cg21;}
		if (hours === 4){ num = "14"; offset = 4; url = cg14;} 
		if (hours === 5){ num = "14"; offset = 4; url = cg14;} 
		if (hours === 6){ num = "7"; offset = 6; url = cg7;} 
		if (hours === 7){ num = "7"; offset = 6; url = cg7;} 
	} else{
		if (days > 0){num = "notStarted"; offset = 0; url = cg0; }
		if (days < 0){num = "ended"; offset = 0; url = cg77;}
	}
	//var mytzcd = tzcd+num;
	
		var showme;
	if (starthour < 1 && days < 1){
		showme = "yes";
	
	//Output HTML
	document.getElementById(tzcd+1).innerHTML = "<div class='col-md-6'><a href='"+ url + "' target='_blank'><img src='assets/img/CG7-SocialSquare-" + num + ".jpg' style='border-radius:100%; width:100%;'></a></div> <div class='col-md-6 '><p class='text-center mt25' style='font-size:20px; padding-top:30px;'>BIRTHDAY PRICE EXPIRES IN</p><h3 class='indie-h text-center color-white mb-20' style='font-size:54px;'>"+(hours-offset) +((hours-offset) === 0 ? '' : 'hr : ') + mins+ 'm : ' + secs + 's' +"</h3><a href='"+ url + "' target='_blank'><button class='btn btn-indie indie-title br text-bold btn-lg btn-block' style='padding:15px 0px;'>Click to Register</button></a><br/><small class='hide'>"+days+" days – "+starthour+"hr - $"+num+ " :: " + showme +"<small>";	
	
	//show before launch		
	jQuery("#beforelaunch").addClass(' hide');

	}else{
	showme = "no";
	//show during launch	
	jQuery("#duringlaunch").addClass(' hide');
	
	//BIG MASTER TIMER
		document.getElementById(tzcd).innerHTML = "Sale starts in "+ days + " day"+(days === 1 ? '' : 's + ')  + starthour +'h : ' + mins+ 'm : ' + secs + 's';
	
	
	
		}
	

	setTimeout('displayTZCountDown('+(countdown-1)+',\''+tzcd+'\');',999);
	
}