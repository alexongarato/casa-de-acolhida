var _animaTimeDef = 0.5;
var _animaTimeFast = 0.25;
var _sections;
var _currentPage = undefined;
var _currentIndex = -1;
var _scrollTimeout = undefined;
var Main = {
	init:function()
	{
		console.info("Loading app...");

		window.addEventListener("load", function ()
		{
			//esconde todas as seções
			_sections = $("section");
			_sections.css("visibility", "hidden");

			//aplica imagem de fundo na seção parceiros
			$("section#partners .container").each(function(i,e)
			{
				$(e).attr("style", "background-image:url("+$($(e).find("img")).attr("src")+")");
			});

			var targetSection = 0;
			switch (window.location.hash)
			{
				case "#a-casa":
				targetSection = 1;
				break;
				case "#doacoes":
				targetSection = 2;
				break;
				case "#parceiros":
				targetSection = 3;
				break;
				case "#transparencia":
				targetSection = 4;
				break;
				case "#contato":
				targetSection = 5;
				break;
				default:
				targetSection = 0;
			}

			Main.EnableMainMenu(2);
			Main.ShowPage(targetSection, 1);

			TweenMax.delayedCall(1, function()
			{
				var loader = document.getElementById("loader");
				loader.setAttribute("class", "hidden");
			});

			console.info("App is ready.");
		});
	},
	EnableMainMenu:function(delay)
	{
		var ease = Back.easeInOut;

		TweenMax.set($("body>nav"), {opacity:0});
		TweenMax.to($("body>nav"), _animaTimeDef, {opacity:1, visibility:"visible", delay});

		$("body>nav>ul>li").each(function(i,e)
		{
			$(e).click(function(evt)
			{
				var index = $(evt.currentTarget).index();
				var newYPos = index == 0 ? 0 : $(_sections[index]).position().top;
				Main.ShowPage($(this).index());
			});

			TweenMax.set(e, {opacity:0, visibility:"visible", position:"relative", right: -60});
			TweenMax.to(e, _animaTimeDef*2, {opacity:1, right: 0, clearProps:"all", delay:delay, ease:ease});
			delay += 0.05;
		});

		$("section .anchor").each(function(i,e)
		{
			var index = i + 1;
			$(e).click(function(e)
			{
				e.preventDefault();
				$("body>nav>ul>li")[index].click();
			});
		});
	},
	ShowPage:function(index, delay = 0)
	{
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
			delay += Main.HidePage(oldPage, index);

			if(newPage.find(".anchor").length > 0)
			{
				newPage.find(".anchor").show();
			}

			TweenMax.to(newPage, 0, {opacity:1, visibility:"visible", delay:delay, onComplete:function()
			{
				$("body").attr('class', newPage.data("bg-class"));
			}});

			var ease = Back.easeInOut;
			var marginTop = index < _currentIndex ? -20 : 20;

			//ativa o link de acao da pagina
			newPage.find(".link").addClass("active");
			TweenMax.set(newPage.find(".link"), {opacity:0, top:marginTop});
			TweenMax.set(newPage.find(".anchor"), {opacity:0, bottom:-20});

			if(index > _currentIndex)
			{
				//anima a entrada do texto principal da pagina
				newPage.find(".line").each(function(i,e)
				{
					TweenMax.set(e, {opacity:0, top:marginTop, position:"relative"});
					TweenMax.to(e, _animaTimeDef, {opacity:1, top:0, delay:delay, clearProps:"all", ease:ease});
					delay += 0.08;
				});
			}
			else
			{
				var total = newPage.find(".line").length;
				for(var i = total; i >= 0; i--)
				{
					var e = $(newPage.find(".line")[i]);
					TweenMax.set(e, {opacity:0, top:marginTop, position:"relative"});
					TweenMax.to(e, _animaTimeDef, {opacity:1, top:0, delay:delay, clearProps:"all", ease:ease});
					delay += 0.08;
				}
			}

			//adiciona delay para entrada do link principal
			TweenMax.to(newPage.find(".link"), _animaTimeDef, {opacity:1, top:0, delay:delay, clearProps:"all", ease:ease, onComplete:function()
			{
				newPage.find(".link").removeClass("active");
			}});

			//adiciona delay para entrada da âncora
			if(newPage.find(".anchor").length > 0)
			{
				newPage.find(".anchor").show();
				delay += _animaTimeDef;
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
				marginTop = -50;
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
				marginTop = 50;
				for(var i = total; i >= 0; i--)
				{
					var e = $(oldPage.find(".line")[i]);
					TweenMax.set(e, {position:"relative"});
					TweenMax.to(e, _animaTimeDef, {opacity:0, top:marginTop, delay:delay, ease:ease});
					delay += 0.05;
				}
			}

			TweenMax.to(oldPage, _animaTimeFast, {opacity:0, delay:delay, onComplete:function()
			{
				TweenMax.set(oldPage, {visibility:"hidden"});
			}});

			delay += 0.05;
		}

		return delay;
	}
}

Main.init();
