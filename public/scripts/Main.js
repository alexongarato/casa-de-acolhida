var _animaTimeFast = 0.09;
var _animaTimeDef = 0.3;
var _animaTimeSlow = 0.5;
var _sections;
var _currentPage = undefined;
var Main = {
	init:function()
	{
		console.info("Starting app...");

		window.addEventListener("load", function () 
		{
			var loader = document.getElementById("loader");
			loader.setAttribute("class", "hidden");

			console.info("App is ready.");

			_sections = $("section");

			Main.EnableMainMenu();
			Main.ShowPage(0);
		});
	},
	EnableMainMenu:function()
	{
		$("header>nav>ul>li").each(function(i,e)
		{
			$(e).click(function(e)
			{
				// console.log($(this).index());
				Main.ShowPage($(this).index());
				$("header>nav>ul>li.active").removeClass("active");
				$(this).addClass("active");
			});
		});
	},
	ShowPage:function(index)
	{
		var newPage = $(_sections[index]);
		var oldPage = _currentPage;

		$("body").attr('class', newPage.data("bg-class"));

		if(oldPage != undefined)
		{
			Main.DissmissPage(_currentPage, index);
			_currentPage = undefined;
			return;
		}

		var delay = 0;
		var ease = Back.easeOut;
		var marginTop = 20;

		//ativa o link de acao da pagina
		newPage.find(".link").addClass("active");
		//link de acao da pagina
		TweenMax.set(newPage.find(".link"), {opacity:0, top:marginTop, position:"relative"});
		//ancora indicadora de mais páginas abaixo
		TweenMax.set(newPage.find(".anchor"), {opacity:0, bottom:-30});
		//anima a entrada do texto principal da pagina
		newPage.find(".line").each(function(i,e)
		{
			delay += _animaTimeFast;
			TweenMax.set(e, {opacity:0, top:marginTop, position:"relative"});
			TweenMax.to(e, _animaTimeDef, {opacity:1, top:0, delay:delay, clearProps:"all", ease:ease});
		});
		//adiciona delay para entrada do link principal
		delay += _animaTimeFast;
		TweenMax.to(newPage.find(".link"), _animaTimeDef, {opacity:1, top:0, delay:delay, clearProps:"all", ease:ease, onComplete:function()
		{
			newPage.find(".link").removeClass("active");
		}});
		//adiciona delay para entrada da âncora
		delay += _animaTimeDef*4;
		TweenMax.to(newPage.find(".anchor"), 0, {opacity:1, bottom:-10, delay:delay, clearProps:"all"});

		newPage.show();

		_currentPage = newPage;
	},
	DissmissPage:function(targetObject, nextIndex)
	{
		console.log("Hidding old page...");
		TweenMax.to(targetObject, _animaTimeFast, {marginTop:parseInt(targetObject.css("margin-top")) - 10, opacity:0, clearProps:"all", onComplete:function()
		{
			targetObject.hide();
			
			console.log("Calling new page...");
			Main.ShowPage(nextIndex);
		}});
	}
}

Main.init();