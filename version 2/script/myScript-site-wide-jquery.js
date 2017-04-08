/* Site-wide jQuery, Angular, Bootstrap */


/* navbar close on click, this applies to small screen mode */
$(document).on('click.nav', '.navbar-collapse.in', function(e) {
	if($(e.target).is('a')) {
		$(this).removeClass('in').addClass('collapse');
	}
});

/* File Input Button/Input */
/* https://www.abeautifulsite.net/whipping-file-inputs-into-shape-with-bootstrap-3 */
$(function() {
	$(document).on('change', ':file', function() {
		var input = $(this), numFiles = input.get(0).files ? input.get(0).files.length : 1, label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		input.trigger('fileselect', [numFiles, label]);
	});
	// watch for custom `fileselect` event
	$(document).ready( function() {
		$(':file').on('fileselect', function(event, numFiles, label) {
			var input = $(this).parents('.input-group').find(':text'), log = numFiles > 1 ? numFiles + ' files selected' : label;
			if( input.length ) {
				input.val(log);
			} else {
				if( log ) alert(log);
			}
		});
	});
});

$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip(); /* tooltip */
	$('[data-toggle="popover"]').popover(); /* popover */
});

/* ********************************* */
/* ******** Progress Bars ********** */
/* ********************************* */ /* Watch Form to affect Progress Bar Events */ /* 31 total user text inputs */
$("#formUserID input").keyup(function() {
	var numValid = 0;

	$("#formUserID input[required]").each(function() {
		if (this.validity.valid) {
			numValid++;
		}
	});
	//var progress = $("#progress");
	$('#progressSender').css('width', numValid/9*29.03+'%').attr('aria-valuenow', numValid);
	$("#progressSenderMsg").html('<i class="fa fa-user" aria-hidden="true"></i> '+Math.round(numValid/9*100)+'%');

	$('#progressSender2').css('width', numValid/9*100+'%').attr('aria-valuenow', numValid);
	$("#progressSenderMsg2").html('<i class="fa fa-user" aria-hidden="true"></i> Sender: '+Math.round(numValid/9*100)+'%');


});
$("#formReceiverID input").keyup(function() {
	var numValid = 0;

	$("#formReceiverID input[required]").each(function() {
		if (this.validity.valid) {
			numValid++;
		}
	});
	var progress = $("#progress");
	$('#progressReceiver').css('width', numValid/12*38.70+'%').attr('aria-valuenow', numValid);
	$("#progressReceiverMsg").html('<i class="fa fa-phone" aria-hidden="true"></i> '+Math.round(numValid/12*100)+'%');

	$('#progressReceiver2').css('width', numValid/12*100+'%').attr('aria-valuenow', numValid);
	$("#progressReceiverMsg2").html('<i class="fa fa-phone" aria-hidden="true"></i> Receiver: '+Math.round(numValid/12*100)+'%');

});
$("#formEnvironmentID textarea").keyup(function() {
	var numValid = 0;

	$("#formEnvironmentID textarea[required]").each(function() {
		if (this.validity.valid) {
			numValid++;
		}
	});
	var progress = $("#progress");
	$('#progressEnvironment').css('width', numValid/4*12.90+'%').attr('aria-valuenow', numValid);
	$("#progressEnvironmentMsg").html('<i class="fa fa-building-o" aria-hidden="true"></i> '+Math.round(numValid/4*100)+'%');

	$('#progressEnvironment2').css('width', numValid/4*100+'%').attr('aria-valuenow', numValid);
	$("#progressEnvironmentMsg2").html('<i class="fa fa-building-o" aria-hidden="true"></i>  Environment: '+Math.round(numValid/4*100)+'%');

});
$("#formRelationshipID textarea").keyup(function() {
	var numValid = 0;

	$("#formRelationshipID textarea[required]").each(function() {
		if (this.validity.valid) {
			numValid++;
		}
	});
	var progress = $("#progress");
	$('#progressRelationship').css('width', numValid/4*12.90+'%').attr('aria-valuenow', numValid);
	$("#progressRelationshipMsg").html('<i class="fa fa-handshake-o" aria-hidden="true"></i> ' + Math.round(numValid/4*100)+'%');

	$('#progressRelationship2').css('width', numValid/4*100+'%').attr('aria-valuenow', numValid);
	$("#progressRelationshipMsg2").html('<i class="fa fa-handshake-o" aria-hidden="true"></i> Relationship: '+Math.round(numValid/4*100)+'%');

});
$("#formEmailID input").keyup(function() {
	var numValid = 0;

	$("#formEmailID input[required]").each(function() {
		if (this.validity.valid) {
			numValid++;
		}
	});
	var progress = $("#progress");
	$('#progressEmail').css('width', numValid/2*6.45+'%').attr('aria-valuenow', numValid);
	$("#progressEmailMsg").html('<i class="fa fa-envelope-o" aria-hidden="true"></i> ' + Math.round(numValid/2*100)+'%');

	$('#progressEmail2').css('width', numValid/2*100+'%').attr('aria-valuenow', numValid);
	$("#progressEmailMsg2").html('<i class="fa fa-envelope-o" aria-hidden="true"></i>  Email: '+Math.round(numValid/2*100)+'%');
});

// convert an html table string to JSON
var htmlTableString2Json = function(inputContents) {
	var table = $(inputContents).tableToJSON({ignoreHiddenRows: false}); //tabletojson.js
	//return JSON.stringify(table);
	return table;
};

/* ****************************************** */
/* ******** Warning buttons popups ********** */
/* ****************************************** */
var btnShowClrOutputLogWarning =  function(){
	$('#warning-popup-log-output').show();
};
var btnHideClrOutputLogWarning = function(){
	$('#warning-popup-log-output').hide();
};
var btnShowClrInputLogWarning =  function(){
	$('#warning-popup-log-input').show();
};
var btnHideClrInputLogWarning = function(){
	$('#warning-popup-log-input').hide();
};
var btnShowExitAppWarning =  function(){
	$('#warning-popup-exit-app').show();
};
var btnHideExitAppWarning = function(){
	$('#warning-popup-exit-app').hide();
};
var exitApp = function() {
	closeApp();
	$('#mainContainer').hide();
	$('#warning-popup-exit-app').hide("slow");

	$('body').html('Just close out... window.close() is not working on this browser, brobably Firefox. <p>The sages foretold this fault would occur on: '+$('#myCornerClock2').html()+'</p>');
};