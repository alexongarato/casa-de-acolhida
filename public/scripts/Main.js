var Main = {
	init:function()
	{
		console.info("Starting app...");

		window.addEventListener("load", function () 
		{
			var loader = document.getElementById("loader");
			loader.setAttribute("class", "hidden");

			console.info("App is ready.");
		});
	}
}

Main.init();