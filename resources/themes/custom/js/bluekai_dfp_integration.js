/*
################################################################
### ORACLE BLUEKAI : Universal Site Optimisation Integration ###
################################################################

Author : roshan.gonsalkorale@oracle.com, alex.wilton@oracle.com, mike.knott@oracle.com

Notes:

- This will query BlueKai for visitor profile data (campaign IDs and Category IDs) and send to a third party site optimisation platform
	- Supported Services:
		- DFP - https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_setTargeting. Additional page config is required.
		- Google AdWords - Via custom parameters (https://support.google.com/adwords/answer/6325879?hl=en-GB)
		- Adobe Target -  Send using the Adobe Target pixel. 
- The code aims to dispatch BlueKai profile data to the third party system by either finding it via the BlueKai API or using a local storage copy
- It aims to call the third party system as quickly as possible
- All code is asynchronous

Debugger:
	
- add 'bk_so_logger=true' as a query-string parameter in the URL and check the console logs

Implementation Instructions:

	- Host this code and run it in the <head> of your website
	- Ensure the configuration options are set correctly

Code Workflow:

- If visitor profile data hasn't already been returned:
	- it will check for it in local storage and send it also call BlueKai again for the data
- If visitor profile data has been returned:
	- it will parse that
- Whenever BlueKai profile data is found:
	- it will store it for reference in localstorage (and a first party cookie if configured to)
	- it will call send the data to the third party system
	- If the data has already been send to the third party system, it won't do it again
- Use the debugging to check the workflow

 */

window.bk_so_integration = window.bk_so_integration || {};
window.bk_so_integration.functions = window.bk_so_integration.functions || {};
window.bk_so_integration.data = window.bk_so_integration.data || {};
window.bk_so_integration.config = window.bk_so_integration.config || {};

// CONFIG : EDIT THIS PART

// BlueKai Config
window.bk_so_integration.config.bluekai_jsonreturn_id = "35964"; // replace with your JSON Return Container ID
window.bk_so_integration.config.wait_in_ms = 5000; // How long to wait before asking BlueKai for the latest categories and firing data to third party (default 5000ms)
window.bk_so_integration.config.include_audience_names = true; // Set to false to not share audience names to any vendors
window.bk_so_integration.config.enable_cookie = false; // Shares BlueKai data in 1st party cookies (URL encoded)

// Vendor code : Adobe Target
window.bk_so_integration.config.enable_adobetarget = false; // set to true to enable integration
window.bk_so_integration.config.adobe_company = "<customer-id>"; // set to company name (usually in COMPANYNAMEHERE.tt.omtrdc.net in mbox code)

// Vendor code : Google AdWords (RLSA)
window.bk_so_integration.config.enable_googleadwords = false; // set to true to enable integration
window.bk_so_integration.config.adwords_conversionid = 1111111111; // Set to AdWords Conversion ID (See https://support.google.com/adwords/answer/2476688?hl=en-GB for help - the value will show where like "var google_conversion_id = 871982529";)
window.bk_so_integration.config.adwords_trim_audiencename_trim_length = 0; // Set to 0 to not trim audince names being used as custom parameter names (or to a number to trim to X characters). Google recommends 16 characters but doesn't seem to mind

// Vendor code : DFP
window.bk_so_integration.config.enable_dfp = true; // set to true to enable integration

// Vendor code : Optimizely X
window.bk_so_integration.config.enable_optimizely = false; // set to true to enable integration

// Vendor code : Google Optimize
window.bk_so_integration.config.enable_google_optimize = false; // set to true to enable integration

/*
 * ##########################################################################################
 * DO NOT EDIT BELOW THIS LINE
 * ##########################################################################################
 */

// FUNCTION : Local Storage Send
bk_so_integration.functions.localstorage_cookie_sender = function(data, name_of_var) {

	// Set data in first-party cookie if required
	if(window.bk_so_integration.config.enable_cookie || window.bk_so_integration.config.enable_google_optimize){

		// encode cookie value if sending audience names
		var cookie_data = (name_of_var === "bk_audience_names") ? encodeURIComponent(data).replace(/'/g,"%27").replace(/"/g,"%22") : data; 

		document.cookie = name_of_var + "=" + cookie_data + ";path=/;domain=" +
		document.domain + ";expires=Thu, 31 Dec 2099 00:00:00 GMT";

		bk_so_integration.functions.logger("COOKIES : storing '" + JSON.stringify(cookie_data) + "' as '" + name_of_var
				+ "' cookie");
	}
	
	if (typeof (Storage) !== "undefined") {

		bk_so_integration.functions.logger("LOCAL STORAGE : storing '" + JSON.stringify(data) + "' as '" + name_of_var
				+ "' in local storage");
		localStorage.setItem(name_of_var, JSON.stringify(data));

	} else {

		bk_so_integration.functions.logger("LOCAL STORAGE : SEND DATA : HTML 5 NOT SUPPORTED");
		return "no storage"; // HTML 5 NOT SUPPORTED
	}

}

// FUNCTION : Local Storage Retrieve
bk_so_integration.functions.localstorage_retriever = function(name_of_var) {

	if (typeof (Storage) !== "undefined") {

		var result = JSON.parse(localStorage.getItem(name_of_var));
		if (!result) {
			bk_so_integration.functions.logger("Local Storage : no " + name_of_var
					+ " values available in local storage. Setting to empty array.");
			return [];
		}
		bk_so_integration.functions.logger("Local Storage : Retrieved following '" + name_of_var
				+ "' from local storage : " + result);
		return result;
	}

}

// FUNCTION : Local Storage fallback
bk_so_integration.functions.localstorage_fallback = function() {

	bk_so_integration.functions.logger("Local Storage : attempting fallback");

	// category IDs
	if (typeof (Storage) !== "undefined") {

		window.bk_so_integration.data.bk_category_ids = bk_so_integration.functions
				.localstorage_retriever("bk_cat_ids");
		window.bk_so_integration.data.bk_campaign_ids = bk_so_integration.functions
				.localstorage_retriever("bk_campaign_ids");
		if (window.bk_so_integration.config.include_audience_names) {
			window.bk_so_integration.data.bk_audience_names = bk_so_integration.functions
					.localstorage_retriever("bk_audience_names");
		}

		// Send data to DFP
		bk_so_integration.functions.sendTargets();
	} else {
		bk_so_integration.functions.logger("LOCAL STORAGE : SEND DATA : HTML 5 NOT SUPPORTED");
		return "no storage"; // HTML 5 NOT SUPPORTED
	}
}

bk_so_integration.functions.logger = function(message, attribute_object) {

	if (document.location.href.indexOf('bk_so_logger=true') > -1) {

		// session cookie
		document.cookie = "bk_so_logger=" + "true" + ";path=/;domain=" + document.domain + ";expires=";
	}

	if (document.cookie.indexOf('bk_so_logger=true') > -1) {

		if (typeof attribute_object === "undefined") {
			console.log("BLUEKAI SO : " + message);
		} else {
			for (varName in attribute_object) {
				console.log("BLUEKAI SO : " + message + varName + "=" + attribute_object[varName]);
			}
		}
	}

};

bk_so_integration.functions.arrayAddUnique = function(array, entry) {
	if (array.indexOf(entry) < 0) {
		array.push(entry);
	}

}

// FUNCTION : Parse BlueKai data and send to DFP
bk_so_integration.functions.parseBkResults = function() {

	// Parse BlueKai Campaign Results
	window.bk_so_integration.data.bk_category_ids = [];
	window.bk_so_integration.data.bk_campaign_ids = [];
	window.bk_so_integration.data.bk_audience_names = [];

	if (typeof (bk_results) != "undefined") {

		if (typeof (bk_results.campaigns[0]) != "undefined") {

			bk_so_integration.functions.logger("'bk_results' object found");

			for (var i = 0; i < bk_results.campaigns.length; i++) {

				var campaignId = bk_results.campaigns[i].campaign

				bk_so_integration.functions.arrayAddUnique(window.bk_so_integration.data.bk_campaign_ids, campaignId);

				if (window.bk_so_integration.config.include_audience_names) {

					var audience_name = bk_results.campaigns[i].BkDmpAudienceName;

					if (typeof (audience_name) != "undefined") {
						audience_name = decodeURIComponent(audience_name.replace(/\+/g,  " ")); // decode URI
						bk_so_integration.functions.logger("Audience name found: " + audience_name);
						bk_so_integration.functions.arrayAddUnique(window.bk_so_integration.data.bk_audience_names,
								audience_name)
					}

				}
				for (var j = 0; j < bk_results.campaigns[i].categories.length; j++) {

					if (typeof (bk_results.campaigns[i].categories[j].categoryID) != "undefined") {

						var categoryId = bk_results.campaigns[i].categories[j].categoryID;

						bk_so_integration.functions.arrayAddUnique(window.bk_so_integration.data.bk_category_ids,
								categoryId);

					}
				}
			}

			// Send data to Local Storage
			bk_so_integration.functions
					.localstorage_cookie_sender(window.bk_so_integration.data.bk_category_ids, "bk_cat_ids");
			bk_so_integration.functions.localstorage_cookie_sender(window.bk_so_integration.data.bk_campaign_ids,
					"bk_campaign_ids");
			if (window.bk_so_integration.config.include_audience_names) {
				bk_so_integration.functions.localstorage_cookie_sender(window.bk_so_integration.data.bk_audience_names,
						"bk_audience_names");
			}

			// Send data to DFP
			bk_so_integration.functions.sendTargets();

		} else {

			bk_so_integration.functions.logger("No campaigns object");
		}
	}
}

bk_so_integration.functions.sendTargets = function() {

	bk_so_integration.functions.logger("Determine target systems to send data");

	if (window.bk_so_integration.config.enable_dfp) {		
		bk_so_integration.functions.sendDFP();
	}

	if (window.bk_so_integration.config.enable_adobetarget) {		
		bk_so_integration.functions.sendATT();
	}

	if (window.bk_so_integration.config.enable_googleadwords) {		
		bk_so_integration.functions.sendGoogleAdWords();
	}

}

/*
 ################
 ### DFP CODE ###
 ################
 */

// Log config set up quickly



bk_so_integration.functions.sendDFP = function() {
	
	bk_so_integration.functions.logger("DFP : HELP : Ensure you declare 'googletag.pubads().setTargeting('bk_campids', window.bk_so_integration.data.bk_campaign_ids);' when generating your ad call")
	bk_so_integration.functions.logger("DFP : HELP : Ensure you declare 'googletag.pubads().setTargeting('bk_catids', window.bk_so_integration.data.bk_category_ids);' when generating your ad call")
	bk_so_integration.functions.logger("DFP : HELP : Do this before 'googletag.enableServices();' within the same 'googletag.cmd.push(function(){HERE});' as when you generate your ad calls");
	bk_so_integration.functions.logger("DFP : HELP : See 'Page-level customized targeting' in https://support.google.com/dfp_premium/answer/1697712?hl=en");
	
}

/*
################################
GOOGLE ADWORDS CONVERSION : Code
################################
*/

// FUNCTION : Pixel firing

bk_so_integration.functions.sendGoogleAdWordsPixel = function(){

	bk_so_integration.functions.logger("ADWORDS SEND : Checking for audience names");	

	// Generate audiences/pixels
	if(bk_so_integration.data.bk_audience_names && bk_so_integration.data.bk_audience_names[0]){

		bk_so_integration.functions.logger("ADWORDS SEND : Audience Names Found");	

		// generate custom params
		var google_custom_data = {bk_audiencenames:[]};

		for (var i = bk_so_integration.data.bk_audience_names.length - 1; i >= 0; i--) {

			google_custom_data.bk_audiencenames.push(bk_so_integration.data.bk_audience_names[i]); // add to 'audience_names' var

			var audience_name = "bk_" + bk_so_integration.data.bk_audience_names[i].replace(/\ /g,"").toLowerCase(); // Ensure audience name friendly

			// Trim audience name if required
			if(window.bk_so_integration.config.adwords_trim_audiencename_trim_length){

				audience_name = audience_name.substring(0,window.bk_so_integration.config.adwords_trim_audiencename_trim_length);
				bk_so_integration.functions.logger("ADWORDS SEND : Trimming audience name to " + window.bk_so_integration.config.adwords_trim_audiencename_trim_length + " characters : " + audience_name);
				
			} 
			
			google_custom_data[audience_name] = true;

		}		

		bk_so_integration.functions.logger("ADWORDS SEND : Firing AdWords Pixel");	

		var google_data = {
			google_conversion_id: window.bk_so_integration.config.adwords_conversionid,
			google_custom_params: google_custom_data,		
			google_remarketing_only: true
		}

		window.google_trackConversion(google_data);

		bk_so_integration.functions.logger("ADWORDS SEND : AdWords Pixel Fired with following data : " + JSON.stringify(google_data));			

	} else {

		bk_so_integration.functions.logger("ADWORDS SEND : No Audience Names Found - not firing AdWords Pixel");	
	}
    	
}

// FUNCTION : Trigger AdWords code
bk_so_integration.functions.sendGoogleAdWords = function(){

	bk_so_integration.functions.logger("ADWORDS SEND : Checking for AdWords Script");
	if(!window.bk_so_integration.config.adwords_script_loaded){

		bk_so_integration.functions.logger("ADWORDS SEND : Checking for AdWords Script - Not found - call '//www.googleadservices.com/pagead/conversion_async.js'");	
		var bk_google_adwords = document.createElement("script");
		bk_google_adwords.type = "text/javascript";
		bk_google_adwords.charset = "utf-8";
		bk_google_adwords.src = "//www.googleadservices.com/pagead/conversion_async.js";
		bk_google_adwords.onload = function() {

			window.bk_so_integration.config.adwords_script_loaded = true;
			bk_so_integration.functions.sendGoogleAdWordsPixel(); // fire pixel

		}

		document.head.appendChild(bk_google_adwords);

	} else {

		bk_so_integration.functions.logger("ADWORDS SEND : Checking for AdWords Script - Not found - DO NOT call '//www.googleadservices.com/pagead/conversion_async.js'");			
		bk_so_integration.functions.sendGoogleAdWordsPixel(); // fire pixel

	}
	
}

/*
 * ##########################################################################################
 * ADOBE TEST AND TARGET CODE
 * ##########################################################################################
 */

bk_so_integration.functions.sendATT = function() {

	// Parse BlueKai Campaign Results
	window.bk_so_integration.data.insertProfileBKCamps = ("profile.bkCampaignIds=|" + window.bk_so_integration.data.bk_campaign_ids 
			.join("|") + "|");
	window.bk_so_integration.data.insertProfileBKCatIds = ("profile.bkCategoryIds=|" + window.bk_so_integration.data.bk_category_ids
			.join("|")  + "|");
	if (window.bk_so_integration.config.include_audience_names) {
		window.bk_so_integration.data.insertProfileBKAudienceNames = ("profile.bkAudienceNames=|" + window.bk_so_integration.data.bk_audience_names
				.join("|") + "|");
	}

	var img_url = "//" + window.bk_so_integration.config.adobe_company + ".tt.omtrdc.net/m2/"
			+ window.bk_so_integration.config.adobe_company + "/ubox/image?mbox=bk_data_feed&"
			+ window.bk_so_integration.data.insertProfileBKCamps + "&"
			+ window.bk_so_integration.data.insertProfileBKCatIds + "&";
	if (window.bk_so_integration.config.include_audience_names) {

		img_url = img_url + window.bk_so_integration.data.insertProfileBKAudienceNames;
	}

	img_url = img_url + "&mboxDefault\x3dhttp%3A%2F%2Ftags.bkrtx.com%2F1x1.gif";

	// Parse BlueKai Campaign Results
	(new Image).src = img_url;

	bk_so_integration.functions.logger("BLUEKAI ADOBE TARGET : Profile Pixel fired");
	bk_so_integration.functions.logger("BLUEKAI ADOBE TARGET : Pixel URL: " + img_url);

}

// FUNCTION : Call BlueKai
bk_so_integration.functions.callBlueKai = function(bluekai_jsonreturn_id) {
	1
	// Check if JSON return tag and bk_results already there
	if ((window.bk_results)
			&& (document.head && document.head.innerHTML.indexOf(bluekai_jsonreturn_id + '?ret=js') > -1)
			|| (document.body && document.body.innerHTML.indexOf(bluekai_jsonreturn_id + '?ret=js') > -1)) {

		bk_so_integration.functions.logger("JSON Return tag found");
		bk_so_integration.functions.logger("Parsing 'bk_results' directly");
		bk_so_integration.functions.parseBkResults(); // Parse results (don't
		// call JSON ret tag)

	} else {

		bk_so_integration.functions.logger("JSON Return tag NOT found");
		bk_so_integration.functions.localstorage_fallback(); // Grab from
		// local storage
		bk_so_integration.functions.logger("Waiting " + window.bk_so_integration.config.wait_in_ms
				+ "ms before calling JSON Return Tag");

		setTimeout(function() {

			bk_so_integration.functions.logger("Calling JSON Return tag");
			var bk_json_ret = document.createElement("script");
			bk_json_ret.type = "text/javascript";
			bk_json_ret.onload = function() {
				bk_so_integration.functions.logger("JSON Return tag loaded");
				bk_so_integration.functions.logger("Parsing 'bk_results'");
				bk_so_integration.functions.parseBkResults(); // Parse results
			};
			bk_so_integration.functions.parseBkResults(); // Parse results
			bk_json_ret.src = "//tags.bluekai.com/site/" + bluekai_jsonreturn_id
					+ "?ret=js&limit=1&phint=integration=so";

			document.head.appendChild(bk_json_ret);

		}, window.bk_so_integration.config.wait_in_ms);
	}
};

// CONFIG LOGGING : Loop through config and log
for (configs in window.bk_so_integration.config){

	bk_so_integration.functions.logger("CONFIG : " + configs + " = " + window.bk_so_integration.config[configs]);

}

// RUN CODE
bk_so_integration.functions.callBlueKai(window.bk_so_integration.config.bluekai_jsonreturn_id);
