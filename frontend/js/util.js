/**
 * Helper functions
 * 
 * */
var app = app || {};
app.setFocus = function(form) {
	//console.log('now setting focus', form);
	form.find("input:first").focus();
}

app.authenticate = function() {
	if (!app.state.isLoggedIn) {
		app.router.navigate("login", {'trigger':true}) //redirect to login page
		return false;
	} else {
		return true;
	}
}

app.signout = function() {
	//app.router.navigate("/login", {'trigger': true});
	app.state.user = null;
	app.state.isLoggedIn = false;
	app.dbs.saveState();
}


app.loadTemplate = function(filename, selector) {
	console.log('loading template ', filename, selector);
	console.log('loadTemplate: ', app.state.user);
	var selector = selector || "#div-main";
	//var promise = new Promise();
	return new Promise(function(resolve) {
		$("<div></div>").load(filename  + "?" + Date.now(), function() {
			//console.log('div.app contents: ', $("div.app").html());
			var tempstr =  $(this).html(); //$("div.app").html();
			//console.log("template: ", tempstr);
			template = _.template(tempstr);
			//var ss = template.apply({'escape':true});
			var html = template({"users": app.users.toJSON()});
			//console.log('output: ', html);
			//thtml
			$ctrl = $(html);
			//console.log("jquery output: ", $ctrl.html());
			$(selector).html($ctrl.html()).show();
			//$("div.app").append("<h1>test</h1>").show();
			//if (callback != undefined) callback();
			resolve();
		});
	});
}


//setTimeout re-implemented using Promise API
app.sleep = function(interval) {
	return new Promise(function(resolve){
		setTimeout(resolve, interval);
		//resolve(100);
	});
}