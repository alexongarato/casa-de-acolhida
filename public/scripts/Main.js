var _animaTimeDef = 0.5;
var _animaTimeFast = 0.25;
var _sections;
var _currentPage = undefined;
var _currentIndex = -1;
var _scrollTimeout = undefined;
var _isMobile = false;
var Main = {
	init:function()
	{
		console.info("Loading app...");

		window.addEventListener("resize", Main.OnResizeHandler);
		window.addEventListener("scroll", Main.OnScrollHandler);
		Main.OnResizeHandler();

		window.addEventListener("load", function ()
		{
			_sections = $("section");

			if(!_isMobile)
			{
				//esconde todas as seções
				_sections.css("visibility", "hidden");
			}
			else
			{
				$("section .anchor").hide(0);
				_sections.css("height", $(window).height());
			}

			//aplica imagem de fundo na seção parceiros
			$("section#parceiros .container").each(function(i,e)
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

			Main.EnableMainMenu(_isMobile ? 1 : 2);
			Main.ShowPage(targetSection, 1);

			TweenMax.delayedCall(1, function()
			{
				var loader = document.getElementById("loader");
				loader.setAttribute("class", "hidden");
			});

			console.info("App is ready.");
		});
	},
	OnScrollHandler:function()
	{
		clearTimeout(_scrollTimeout);
		_scrollTimeout = undefined;
		_scrollTimeout = setTimeout(function()
		{
			console.log("scroll");
			var posY = 0;
			_sections.each(function(i,e)
			{
				posY = parseInt(window.scrollY) - parseInt($(e).position().top) + parseInt($(window).height() / 2);
				console.log(posY);
				if(posY > 0)
				{
					Main.ShowPage(i);
					return;
				}
			});
		}, 300);
	},
	OnResizeHandler:function()
	{
		_isMobile = false;

		// device detection
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
		    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) 
    		_isMobile = true;

    	console.log("isMobile:" + _isMobile);
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

		//se é mobile não anima nada.
		if(_isMobile)
		{
			$("body").attr('class', newPage.data("bg-class"));
			_currentPage = newPage;
			_currentIndex = index;
			return;
		}

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
		//se é mobile não anima a saída.
		if(_isMobile) return;

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
