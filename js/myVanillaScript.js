/* Used for simple localStorage manipulation */
    var mycontactObject = {firstName: "", middleName: "", lastName: "", address: "", city: "", state: "", zip: "", phone: "", email: "", myUrl: ""};
    var companyInfoObject = {jobname: "", jobid: "", hours: "", name: "", address: "", city: "", state: "", zip: "", website: "", attn: "", attnemail: "", phone:"", situation:""};
    var industryThemesObject = {companydescription: "", companyphilosophy: "", companycustomers: "", companydistinguish: "" };
    var whatIofferObject = {applicationidentity: "", skillarray: "", knowledgearray: "", abilityarray: ""};

    var emailletterObject = {lead:"", research:"", letter:""}; //unused in this version
    var resumeObject = {template1:"", template2:"", template3:""}; //unused in this version
    var coverletterObject = {template1:"", template2:"", template3:""}; //unused in this version
    var powerButton = false;

/* Old school Java Script */

       var reader = new FileReader();

       /* ************************************* */
       /* *** Read Write File in JavaScript *** */
       /* ************************************* */

       function checkFileAPI() {
           'use strict';
           if (window.File && window.FileReader && window.FileList && window.Blob) {
               reader = new FileReader();
               return true;
           } else {
               alert('The File APIs are not fully supported by your browser. Fallback required.');
               return false;
           }
       }

       function logLoadFile(filePath) {
           'use strict';
           var inputContents;

           reader.onload = function (e) {
               inputContents = e.target.result;
               inputContents = inputContents.replace(/\<\!(.*)\"en\"\>/g, '<tr>'); //remove header
               inputContents = inputContents.replace(/\<\/html\>/g, ''); //remove footer

               document.getElementById('loginputPreviewDiv').innerHTML = inputContents;
           }; //end onload()
           reader.readAsText(filePath.files[0]);
       }

       function inputLog2OutputLog() {
           'use strict';
           var inputlogDiv, outputlogDiv;

           inputlogDiv = document.getElementById('loginputPreviewDiv').innerHTML;
           inputlogDiv = inputlogDiv.replace(/\<table(.*)\<tbody\>/gi, '<tr>'); //remove header
       }

       function openInNewTab(url) {
           var win = window.open(url, '_blank');
           win.focus();
       }

       function inputResumeTemplateFile(filePath) {
           'use strict';
           var inputContents;

           reader.onload = function (e) {
               inputContents = e.target.result;
           }; //end onload()
           reader.readAsText(filePath.files[0]);
       }

       /* ******************************* */
       /* Save File and Finishing Output  */
       /* ******************************* */

       function saveContents(textToWrite) {
           /* intended for IE8 */
           'use strict';
           var oWin, success;
           if (document.execCommand) {
               oWin = window.open("about:blank", "_blank");
               //To add a new line, you need to use <br>
               oWin.document.writeln(textToWrite); //convert from list html to table html);
               oWin.document.close();
               //Need to specify the filename that we are going to set here
               success = oWin.document.execCommand('SaveAs', true, "output.html");
               oWin.close();
           }
       }

       function destroyClickedElement(event) {
           'use strict';
           document.body.removeChild(event.target);
       }

       function saveHtmlAsFile(inputHtm, desiredFileName) {
           'use strict';
           /* https://jsfiddle.net/nekyouto/gokpfr00/ */
           var fileNameToSaveAs, downloadLink, textFileAsBlob, textToWrite;
           var formattingstyle = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>" + desiredFileName + "</title> <link rel= 'icon' href = 'data:image/x-icon;base64,R0lGODlhEAAQAPIAAAAAABQs///+ps/Pz////wAAAAAAAAAAACH5BAlkAAUAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAD6ggAAAAAAAAAAAAQQgghxDAMwzAMAEAABEEQBDEAAAAMAEAABEEQBAIBIAgABgAAgUAgEAgEAgEQEAAGAACBQCAQCAQCASAIAAYAAIFAIBAIBAIBAAAABgAAgUAgEAgEBAQEBAMDAwAABAQEBAQEBAQEBAMDAwMAAAQEBAQEBAQEBAQDAwMDAAAEBAQEBAQEBAQDAwMDAwAABAQEBAQEBAQEAwMDAwMAAAQEBAQEBAQEBAMDAwMDAAAEBAQEBAQEBAMDAwMDAwAABAQEBAQEAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAASAAAh+QQJMgAFACwAAAAAEAAQAAAD6ggAAAAAAAAAAAAQQgghxDAMwzAMAEAABEAAADAAAAAMAEAAAAAABAABIAgABgAAgUAgEAgEAgEQEAAGAACBQCAQCAQCASAIAAYAAIFAIBAIBAIBAAAABgAAgUAgEAgEBAQEBAMDAwAABAQEBAQEBAQEBAMDAwMAAAQEBAQEBAQEBAQDAwMDAAAEBAQEBAQEBAQDAwMDAwAABAQEBAQEBAQEAwMDAwMAAAQEBAQEBAQEBAMDAwMDAAAEBAQEBAQEBAMDAwMDAwAABAQEBAQEAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAASAAAh+QQJZAAFACwAAAAAEAAQAAAD6ggAAAAAAAAAAAAQQgghxDAMwzAMAEAABEAAADAAAAAMAEAAAAAABAABIAgABgAAgUAgEAgEAgEQEAAGAAABAAAAAAQCASAIAAYAAIFAIBAIBAIBAAAABgAAgUAgEAgEBAQEBAMDAwAABAQEBAQEBAQEBAMDAwMAAAQEBAQEBAQEBAQDAwMDAAAEBAQEBAQEBAQDAwMDAwAABAQEBAQEBAQEAwMDAwMAAAQEBAQEBAQEBAMDAwMDAAAEBAQEBAQEBAMDAwMDAwAABAQEBAQEAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAASAAAh+QQJZAAFACwAAAAAEAAQAAAD6ggAAAAAAAAAAAAQQgghxDAMwzAMAEAABEAAADAAAAAMAEAAAAAABAABIAgABgAAgUAgEAgEAgEQEAAGAAABAAAAAAQCASAIAAYAAIFAIBAIBAIBAAAABgAAAQAAAAAABAQEBAMDAwAABAQEBAQEBAQEBAMDAwMAAAQEBAQEBAQEBAQDAwMDAAAEBAQEBAQEBAQDAwMDAwAABAQEBAQEBAQEAwMDAwMAAAQEBAQEBAQEBAMDAwMDAAAEBAQEBAQEBAMDAwMDAwAABAQEBAQEAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAASAAAh+QQJZAAFACwAAAAAEAAQAAAD6ggAAAAAAAAAAAAQQgghxDAMwzAMAEAABEAAADAAAAAMAEAAAAAABAABIAgABgAAgUAgEAgEAgEQEAAGAAABAAAAAAQCASAIAAYAAIFAIBAIBAIBAAAABgAAAQAAAAAABAQEBAMDAwAABAQEBAQEBAQEBAMDAwMAAAQAAAAAAAAAAAAAAAMDAAAEBAQEBAQEBAQDAwMDAwAABAQEBAQEBAQEAwMDAwMAAAQEBAQEBAQEBAMDAwMDAAAEBAQEBAQEBAMDAwMDAwAABAQEBAQEAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAASAAAh+QQJZAAFACwAAAAAEAAQAAAD6ggAAAAAAAAAAAAQQgghxDAMwzAMAEAABEAAADAAAAAMAEAAAAAABAABIAgABgAAgUAgEAgEAgEQEAAGAAABAAAAAAQCASAIAAYAAIFAIBAIBAIBAAAABgAAAQAAAAAABAQEBAMDAwAABAQEBAQEBAQEBAMDAwMAAAQAAAAAAAAAAAAAAAMDAAAEBAQEBAQEBAQDAwMDAwAABAAAAAQAAAAEAAAAAwMAAAQEBAQEBAQEBAMDAwMDAAAEBAQEBAQEAwMDAwMDAwAABAQEBAQEAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAASAAAh+QQJZAAFACwAAAAAEAAQAAAD6ggAAAAAAAAAAAAQQgghxDAMwzAMAEAABEAAADAAAAAMAEAAAAAABAABIAgABgAAgUAgEAgEAgEQEAAGAAABAAAAAAQCASAIAAYAAIFAIBAIBAIBAAAABgAAAQAAAAAABAQEBAMDAwAABAQEBAQEBAQEBAMDAwMAAAQAAAAAAAAAAAAAAAMDAAAEBAQEBAQEBAQDAwMDAwAABAAAAAQAAAAEAAAAAwMAAAQEBAQEBAQEBAMDAwMDAAAEAAAAAAAABAAAAAADAwAABAQEBAQEAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAASAAA7' type='image/x-icon'><style type='text/css'> .tab { text-indent: 40px; } table, tr, th, td {text-align: center;} table {width: 100%;} </style></head>";

           inputHtm = formattingstyle + inputHtm + "</html>";

           textToWrite = inputHtm.replace(/\s\s+/g, ''); //remove mutiple spaces, this is Extra Overkill, but it is just housekeeping
           //desiredFileName = desiredFileName.replace(',', ' '); //remove coma from date

           //Check if browser supports Blob
           if (window.Blob) {
               textFileAsBlob = new Blob([textToWrite], { type: 'html' });

               //Need to specify the filename that we are going to set here
               fileNameToSaveAs = desiredFileName + ".html";
               downloadLink = document.createElement("a");
               downloadLink.download = fileNameToSaveAs;
               downloadLink.innerHTML = "Download File";
               if (window.webkitURL != null) {
                   // Chrome allows the link to be clicked without actually adding it to the DOM.
                   downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
               } else {
                   // Firefox requires the link to be added to the DOM before it can be clicked.
                   downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                   downloadLink.onclick = destroyClickedElement;
                   downloadLink.style.display = "none";
                   document.body.appendChild(downloadLink);
               }

               if (navigator.msSaveBlob) {
                   navigator.msSaveBlob(textFileAsBlob, fileNameToSaveAs);
               } else {
                   downloadLink.click();
               }

           } else {
               /* Error/Solution Catch: used for IE8 */
               saveContents(textToWrite);
           }
       }

       function printLog() {
           var log = document.getElementById('angularjsLogTable').innerHTML;
           var docTime = document.getElementById('myCornerClock2').innerHTML;
           saveHtmlAsFile(log, "-SessionLog-" + docTime);
       }

       function printDocs(jobname, name, state) {

           var emailDoc, coverletterDoc, resumeDoc, docTime, fileName;

           emailDoc = document.getElementById('emailletterTemplate').innerHTML;
           coverletterDoc = document.getElementById('coverletterTemplate').innerHTML;
           resumeDoc = document.getElementById('resumeTemplate').innerHTML;

           docTime = document.getElementById('myCornerClock2').innerHTML; //coverletterTime // myCornerClock2

           fileName = jobname + "_" + name + "_" + state + "_" + docTime + "(Email Letter).html";
           saveHtmlAsFile(emailDoc, fileName);

           fileName = jobname + "_" + name + "_" + jobname + "_" + docTime + "(Cover Letter Letter).html";
           saveHtmlAsFile(coverletterDoc, fileName);

           fileName = jobname + "_" + state + "_"+jobname + "_" + docTime + "(Resume Letter).html";
           saveHtmlAsFile(resumeDoc, fileName);
           return;
       }

       /* ******************************* */
       /* Session Browser Storage         */
       /* ******************************* */

       function setSession(tableStr) {
           localStorage.setItem('sessonsaveLogVar', tableStr);
       }

       function getSession(sessionVar) {
           'use strict';
           var data = localStorage.getItem(sessionVar);
           return data;
       }

       function removeSession(sessionVar) {
           localStorage.removeItem(sessionVar);
       }

       function clearSession() {
           window.localStorage.clear();
       }

       function restoreLastSession() {
           'use strict';
           var cacheStrIn = getSession('sessonsaveLogVar');
           var inputlogDiv;

           if (cacheStrIn) {
               inputlogDiv = document.getElementById('loginputPreviewDiv').innerHTML;
               inputlogDiv = inputlogDiv.replace(/\<\/tbody\>/g, ''); //remove footer
               inputlogDiv = inputlogDiv.replace(/\<\/table\>/g, '');

               cacheStrIn = cacheStrIn.replace(/\<table(.*)\<tbody\>/gi, '<tr>'); //remove header
               cacheStrIn = cacheStrIn.replace(/\<tr(.*)\<\/tr\>/, ''); //remove duplicate header

               document.getElementById('loginputPreviewDiv').innerHTML =  inputlogDiv + cacheStrIn;
           }
       }

       function getBrowser() {
           //https://jsfiddle.net/311aLtkz/
           // Opera 8.0+
           var isOpera = (window.opr && opr.addons) || window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
           // Firefox 1.0+
           var isFirefox = typeof InstallTrigger !== 'undefined';
           // Safari 3.0+ "[object HTMLElementConstructor]"
           var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
           // Internet Explorer 6-11
           var isIE = /*@cc_on!@*/false || document.documentMode;
           // Edge 20+
           var isEdge = !isIE && window.StyleMedia;
           // Chrome 1+
           var isChrome = window.chrome && window.chrome.webstore;
           // Blink engine detection
           var isBlink = (isChrome || isOpera) && window.CSS;

           if (isChrome) {
               return "<br><i class='fa fa-chrome titlebrowser' aria-hidden='true'  style='color:red' ng-if = 'true'><span class='fontDancingScript'>Chrome</span></i>";
           } else if (isOpera) {
               return "<br><i class='fa fa-opera titlebrowser' aria-hidden='true'  style='color:red' ng-if = 'true'><span class='fontDancingScript'>Opera</span></i>";
           } else if (isIE) {
               return " <i class='fa fa-internet-explorer titlebrowser' aria-hidden='true'  style='color:#336699' ng-if='true'><span class='fontDancingScript'>IE</span></i>";
           } else if (isSafari) {
               return "<br><i class='fa fa-safari titlebrowser' aria-hidden='true'  style='color:#42d9f4' ng-if = 'true'><span class='fontDancingScript'>Safari</span></i>";
           } else if (isFirefox) {
               return "<br><i class='fa fa-firefox titlebrowser' aria-hidden='true'  style='color:#E66000' ng-if = 'true'><span class='fontDancingScript'>Firefox</span></i>";
           } else if (isBlink) {
               return "<br><i class='fa fa-chrome titlebrowser' aria-hidden='true' style='color:#6699ff' ng-if = 'true'><span class='fontDancingScript'>Chromium</span></i>";
           } else {
               return " :)";
           }
       }

       function getBrowserClock() {

           if (document.documentMode) {
               //return "<div style='width: 50vw;'>My `Decorative Analog SVG Clock` animation technique is not supported in this browser, which means you are most likely using IE 11 or older at the moment.<br><br>Here is a bland time-stamp: {{today}}<br><br>Current time is: <span my-current-time='format'></span></div>"; // IE browser DOES NOT SUPPPORT my analog svg clock yet, i found this solution, but I have not applied it /* http://quicksilver.be.washington.edu/courses/arch482/4.Common%20Patterns/3.Dynamic%20HTML/e.SVG%20clock.html */

               return 1;
           } else {
               return 0; //"<svg width='300px' height='300px' viewBox='0 0 300 300'><use xlink:href='#myClockSvgId' ng-if = 'true'></use></svg>"; // browser DOES SUPPORT my alaog clock svg
           }
       }

       function closeApp() {
           powerButton = true;
           window.close(); //close current tab in 'some' browser
       }

       /* **************** */
       /* Page Load Evenet */
       /* **************** */
       window.onload = function() {
           'use strict';
           document.getElementById('btnSplashTitle').innerHTML += getBrowser(); //show which browser is being used
           document.getElementById('browserClockSvg').innerHTML += "<svg width='300px' height='300px' viewBox='0 0 300 300'><use xlink:href='#myClockSvgId' ng-if = 'true'></use></svg>"; //getBrowserClock(); //show clock based on which browser is being used
       };

       /* ********************* */
       /* Warning Dialog Popups */
       /* ********************* */
       window.onbeforeunload = function (event) {
           var message = 'Exit this app?';
           if (powerButton === false){
               if (typeof event == 'undefined') {
                   event = window.event;
               }
               if (event) {
                   event.returnValue = message;
               }
               return message;
           }
       }
