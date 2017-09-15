function preloader() {
	if (document.getElementById) {
		document.getElementById("img1").style.background = "url(http://domain.tld/image-01.png) no-repeat -9999px -9999px";
		document.getElementById("img2").style.background = "url(http://domain.tld/image-02.png) no-repeat -9999px -9999px";
		document.getElementById("img3").style.background = "url(http://domain.tld/image-03.png) no-repeat -9999px -9999px";
	}
}
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}
addLoadEvent(preloader);