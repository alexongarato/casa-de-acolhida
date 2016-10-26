var _animaTimeFast = 0.09;
var _animaTimeDef = 0.3;
var _animaTimeSlow = 0.5;
var _sections;
var _currentPage = undefined;
var _currentIndex = -1;
// var _lockScroll = false;
var _scrollTimeout = undefined;
var Main = {
	init:function()
	{
		console.info("Starting app...");

		window.addEventListener("load", function () 
		{
			var loader = document.getElementById("loader");
			loader.setAttribute("class", "hidden");

			//esconde todas as seções
			_sections = $("section");
			_sections.css("visibility", "hidden");

			//aplica imagem de fundo na seção parceiros
			$("section#partners .container").each(function(i,e)
			{
				$(e).attr("style", "background-image:url("+$($(e).find("img")).attr("src")+")");
			});

			Main.onResizeHandler();
			Main.EnableMainMenu();
			// Main.onScrollHandler();
			Main.ShowPage(0);

			console.info("App is ready.");
		});

		window.addEventListener("resize", Main.onResizeHandler);
		// window.addEventListener("scroll", Main.onScrollHandler);
	},/*
	onScrollHandler:function()
	{
		if(_scrollTimeout)
		{
			clearTimeout(_scrollTimeout);
			_scrollTimeout = undefined;
		}

		_scrollTimeout = setTimeout(function()
		{
			console.log("test current page");
			
			var h = $(window).height() * 0.4;
			var top = $(window).scrollTop() + h;
			
			var currSetionTop = 0;
			var currSetionHeight = 0;
			$("section").each(function(i,e)
			{
				currSetionTop = $(e).position().top;
				currSetionHeight = $(e).height();
				if(top >= currSetionTop && top <= (currSetionTop + currSetionHeight))
				{
					console.log('opened', i);
					Main.ShowPage(i);
					return;
				}
			});
		}, 30);
	},*/
	onResizeHandler:function()
	{
		console.log("on resize");
		_sections.css("min-height", $(window).height());
	},
	EnableMainMenu:function()
	{
		$("body>nav>ul>li").each(function(i,e)
		{
			$(e).click(function(evt)
			{
				var index = $(evt.currentTarget).index();
				var newYPos = index == 0 ? 0 : $(_sections[index]).position().top;
				// TweenLite.to($(window), _animaTimeSlow, {scrollTo:{y:newYPos}, ease:Power2.easeInOut });
				Main.ShowPage($(this).index());
			});
		});

		$("section .anchor").each(function(i,e)
		{
			var index = i + 1;
			$(e).click(function(e)
			{
				e.preventDefault();
				//Main.ShowPage($(this).parents("section").index());
				$("body>nav>ul>li")[index].click();
			});
		});
	},
	ShowPage:function(index)
	{
		// _lockScroll = true;

		//atualiza o status do menu principal.
		$("body>nav>ul>li.active").removeClass("active");
		$($("body>nav>ul>li")[index]).addClass("active");
		$("header>h1").removeClass("big").addClass($($("body>nav>ul>li")[index]).data("logo"));

		var newPage = $(_sections[index]);
		var oldPage = _currentPage;

		console.log("newPage:", newPage);
		console.log("oldPage:", oldPage);

		if(newPage.css("visibility") == "hidden")
		{
			var delay = Main.HidePage(oldPage, index);

			if(newPage.find(".anchor").length > 0)
			{
				newPage.find(".anchor").show();
			}

			$("body").attr('class', newPage.data("bg-class"));

			TweenMax.to(newPage, 0, {visibility:"visible", delay:delay});
			
			var ease = Back.easeInOut;
			var marginTop = index < _currentIndex ? -20 : 20;

			//ativa o link de acao da pagina
			newPage.find(".link").addClass("active");
			TweenMax.set(newPage.find(".link"), {opacity:0, top:marginTop, position:"relative"});
			TweenMax.set(newPage.find(".anchor"), {opacity:0, bottom:-30});
			
			//anima a entrada do texto principal da pagina
			newPage.find(".line").each(function(i,e)
			{
				TweenMax.set(e, {opacity:0, top:marginTop, position:"relative"});
				TweenMax.to(e, _animaTimeDef, {opacity:1, top:0, delay:delay, clearProps:"all", ease:ease});
				delay += 0.05;
			});
			
			//adiciona delay para entrada do link principal
			delay += _animaTimeFast;
			TweenMax.to(newPage.find(".link"), _animaTimeDef, {opacity:1, top:0, delay:delay, clearProps:"all", ease:ease, onComplete:function()
			{
				newPage.find(".link").removeClass("active");
			}});

			//adiciona delay para entrada da âncora
			if(newPage.find(".anchor").length > 0)
			{
				newPage.find(".anchor").show();
				delay += _animaTimeDef*4;
				TweenMax.to(newPage.find(".anchor"), 0, {opacity:1, bottom:-10, delay:delay, clearProps:"all"});
			}

			_currentPage = newPage;
			_currentIndex = index;
		}
	},
	HidePage:function(oldPage, newIndex)
	{
		var delay = 0;

		if(oldPage)
		{
			if(oldPage.find(".anchor").length > 0)
			{
				oldPage.find(".anchor").hide();
			}
			
			var ease = Back.easeInOut;
			var marginTop;
			var total = oldPage.find(".line").length;

			if(newIndex > _currentIndex)
			{
				marginTop = -20;
				for(var i = 0; i < total; i++)
				{
					var e = $(oldPage.find(".line")[i]);
					TweenMax.set(e, {position:"relative"});
					TweenMax.to(e, _animaTimeDef, {opacity:0, top:marginTop, delay:delay, ease:ease});
					delay += 0.05;
				}
			}
			else
			{
				marginTop = 20;
				for(var i = total; i >= 0; i--)
				{
					var e = $(oldPage.find(".line")[i]);
					TweenMax.set(e, {position:"relative"});
					TweenMax.to(e, _animaTimeDef, {opacity:0, top:marginTop, delay:delay, ease:ease});
					delay += 0.05;
				}
			}

			TweenMax.to(oldPage, 0, {visibility:"hidden", delay:delay});
		}
		// delay += 0.5;

		return delay;
	}
	/*,
	DissmissPage:function(targetObject, nextIndex)
	{
		console.log("Hidding old page...");
		TweenMax.to(targetObject, _animaTimeFast, {marginTop:parseInt(targetObject.css("margin-top")) - 30, opacity:0, clearProps:"all", onComplete:function()
		{
			targetObject.hide();
			
			console.log("Calling new page...");
			Main.ShowPage(nextIndex);
		}});
	}*/
}

Main.init();