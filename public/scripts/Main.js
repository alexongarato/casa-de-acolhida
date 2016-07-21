var _animaTimeFast = 0.1;
var _animaTimeDef = 0.3;
var _animaTimeSlow = 0.5;
var Main = {
	init:function()
	{
		console.info("Starting app...");

		window.addEventListener("load", function () 
		{
			var loader = document.getElementById("loader");
			loader.setAttribute("class", "hidden");

			console.info("App is ready.");

			Main.animateHome();
		});
	},
	animateHome:function()
	{
		var delay = 0;
		var ease = Back.easeOut;
		var marginTop = 20;

		$("section#place .link").addClass("active");
		TweenMax.set($("section#place .link"), {opacity:0, top:marginTop, position:"relative"});
		TweenMax.set($("section#place .anchor"), {opacity:0, bottom:-30});

		$("section#place .line").each(function(i,e)
		{
			delay += _animaTimeFast;
			TweenMax.set(e, {opacity:0, top:marginTop, position:"relative"});
			TweenMax.to(e, _animaTimeDef, {opacity:1, top:0, delay:delay, clearProps:"all", ease:ease});
		});
		delay += _animaTimeFast;
		TweenMax.to($("section#place .link"), _animaTimeDef, {opacity:1, top:0, delay:delay, clearProps:"all", ease:ease, onComplete:function()
		{
			$("section#place .link").removeClass("active");
		}});
		delay += _animaTimeDef*4;
		TweenMax.to($("section#place .anchor"), 0, {opacity:1, bottom:-10, delay:delay, clearProps:"all"});

	}
}

Main.init();