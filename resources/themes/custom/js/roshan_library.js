// FUNCTION : Cookie Setter
function setCookie(c_name, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
}

// FUNCTION : Query-string grabber
function getParameterByName(name) {
	if (typeof queryString === "undefined") {
		queryString = document.location.search;
	}
	var start_char = queryString.toLowerCase().indexOf("?" + name.toLowerCase() + '=') + 1;
	if (start_char === 0) {
		start_char = queryString.toLowerCase().indexOf("&" + name.toLowerCase() + '=') + 1;
	}
	var parameter_length = name.length + 1;

	if (start_char !== 0) {
		var querystring_value = queryString.substring(start_char + parameter_length).split('&')[0];
	}
	if (querystring_value) {
		return querystring_value
	} else {
		return "";
	}
}