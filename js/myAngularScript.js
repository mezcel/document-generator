/* angular APP Module, Controller, Directive, Filter, Directive */
var app;

// App Module 'ngSanitize'
app = angular.module('myApp', ['ngSanitize']);

// App Module Controller
app.controller('myAppCtrl', ['$scope', '$interval', '$interpolate','myAppFactoryJson', 'myAppFactoryJsonDEMO',  function($scope, $interval,  $interpolate, myAppFactoryJson, myAppFactoryJsonDEMO) {
    var tabIndex;

    $scope.toggleClock = false; /* toggle tab(0) and tab(10) colors */
    $scope.togglePaper = false; /* toggle paper colors */
    $scope.togglePrieview = false; /* toggle file input preview display */
    $scope.recieverBtnEnterBool = false; /* Confirm Enter Button Is Pressed Flag  */
    $scope.tab = 8; /* intial tab view is set to greetings quote page */
    $scope.today = new Date(); /* Time Date, used in document writeup */
    $scope.format = 'M/d/yy h:mm:ss a'; /* time format used in app.controller.directive */
    $scope.format2 = '(MM-dd-yyyy)'; /* time format used in app.controller.directive, this applies to file nameing */

    $scope.hourstype = myAppFactoryJson.receiverTemplateJSON.hours; // initial fill dropbox in tab(2): reciever/audience dropdown input options

    /* show/hide tab pages */
    $scope.tabShow = function(newTab) {
        if ($scope.tab !== newTab){
            $scope.tab = newTab;
            tabIndex = newTab;
        }
    };
    /* matches the clicked tab with that tags class */
    $scope.tabclassActive = function(tabNum) {
        if (tabNum === 10){
            $scope.demoKeyUp(); //i want to ensure the prgress bars reflect the current update status
        }
        return $scope.tab === tabNum;
    };

    /* show start app */
    $scope.starApp = function() {
        $('#myCoverPage').hide();
        $('#myCoverPage').css('display: none;');
        $('#mainContainer').show();
        $('#loadingFooter').hide();
        $('#loadingFooter').css('display: none;');
    };

    /* Clear Button, clear inputs from the current div in view */
    $scope.clearSelectedInputTabs = function() {

        var mycontactObjectClear = myAppFactoryJson.senderTemplateJSON;
        var companyInfoObjectClear = myAppFactoryJson.receiverTemplateJSON;
        var industryThemesObjectClear = myAppFactoryJson.environmentTemplateJSON;
        var whatIofferObjectClear = myAppFactoryJson.relationshipTemplateJSON;
        var emailletterClear = {"emailletterTemplateJSON":{"leadtype":"Stackoverflow Jobs","followup":"web research"}};

        switch (tabIndex) {
            case 1:
                $scope.user = angular.copy(mycontactObjectClear);
                break;
            case 2:
                $scope.audience = angular.copy(companyInfoObjectClear);
                $scope.recieverBtnEnterBool = false;
                break;
            case 3:
                $scope.environmentsetting = angular.copy(industryThemesObjectClear);
                break;
            case 4:
                $scope.desirability = angular.copy(whatIofferObjectClear);
                break;
            case 5:
                /*
                Template import tab, clear with template
                this was a way for me to sneak in a process without making a unique one. the problem with this technique is force undoing of previousely typed in inputs
                */
                if ($scope.frmTemplates.rdoResumeTemplate == 3) {
                    $scope.user = angular.copy(mycontactObjectClear);
                    $scope.audience = angular.copy(companyInfoObjectClear);
                    $scope.environmentsetting = angular.copy(industryThemesObjectClear);
                    $scope.desirability = angular.copy(whatIofferObjectClear);
                    $scope.leads = angular.copy(emailletterClear);
                }

                break;
            case 11:
                $scope.leads = angular.copy(emailletterClear);
                break;
            case 15:
            //clear all
                $scope.user = angular.copy(mycontactObjectClear);
                $scope.audience = angular.copy(companyInfoObjectClear);
                $scope.environmentsetting = angular.copy(industryThemesObjectClear);
                $scope.desirability = angular.copy(whatIofferObjectClear);
                $scope.leads = angular.copy(emailletterClear);

                $scope.recieverBtnEnterBool = false;
                $scope.frmTemplates.rdoResumeTemplate = 3;
                $scope.dbxTemplate = '1';

                break;
            default:
                break;
        }
        $scope.outputPreview(); //my fake wana-be ng-update ng-model updater // this is just a '$watch', but it feels like more of a hack than a $watch
    };

    /* Enter Button */
    $scope.btnEnter = function() {

        $scope.outputPreview(); //my fake wana-be ng-update ng-model updater

        switch (tabIndex) {
            case 1:
                mycontactObject.firstName = $scope.user.firstName;
                mycontactObject.middleName = $scope.user.middleName;
                mycontactObject.lastName = $scope.user.lastName;
                mycontactObject.address = $scope.user.address;
                mycontactObject.city = $scope.user.city;
                mycontactObject.state = $scope.user.state;
                mycontactObject.zip = $scope.user.zip;
                mycontactObject.phone = $scope.user.phone;
                mycontactObject.email = $scope.user.email;
                mycontactObject.myUrl = $scope.user.myUrl;

                localStorage.setItem("sessonsaveAngularmycontactVar", JSON.stringify(mycontactObject)); // save in browser memory for crash/close backup

                break;
            case 2:
                companyInfoObject = angular.copy($scope.audience);
                localStorage.setItem("sessonsaveAngularcompanyInfoVar", JSON.stringify(companyInfoObject)); // save in browser memory for crash/close backup

                $scope.recieverBtnEnterBool = true; //flag that "enter" was applied to Reciever Tab(2) Form

                break;
            case 3:
                industryThemesObject.companydescription = $scope.environmentsetting.companydescription;
                industryThemesObject.companyphilosophy = $scope.environmentsetting.companyphilosophy;
                industryThemesObject.companycustomers = $scope.environmentsetting.companycustomers;
                industryThemesObject.companydistinguish = $scope.environmentsetting.companydistinguish;

                localStorage.setItem("sessonsaveAngularindustryThemesVar", JSON.stringify(industryThemesObject)); // save in browser memory for crash/close backup

                break;
            case 4:
                whatIofferObject.applicationidentity = $scope.desirability.applicationidentity;
                whatIofferObject.skillarray = $scope.desirability.skillarray;
                whatIofferObject.knowledgearray = $scope.desirability.knowledgearray;
                whatIofferObject.abilityarray = $scope.desirability.abilityarray;

                localStorage.setItem("sessonsaveAngularwhatIofferVar", JSON.stringify(whatIofferObject)); // save in browser memory for crash/close backup

                break;
            case 11:
                break;
            default:
                break;
        }
    };

    /* Simpulated Key press */ /* this simulates a users keyup and triggers the progressbars */
    $scope.demoKeyUp = function() {
        var e = $.Event("keyup");
        $("#formUserID input").trigger(e);
        $("#formReceiverID input").trigger(e);
        $("#formEnvironmentID textarea").trigger(e);
        $("#formRelationshipID textarea").trigger(e);
        $("#formEmailID input").trigger(e);
    }

    /* clear log preview */
    $scope.btnClrLogPast = function() {
        $scope.JobTblPast = '';
        btnHideClrInputLogWarning();
    }
    $scope.btnClrLog = function() {
        $scope.JobTbl = '';
        btnHideClrOutputLogWarning();
    }
    /* ********************************************* */
    /* ******** Angular Table Sort/Filter ********** */
    /* ********************************************* */

    $scope.companyInfoObjectForTable;
    $scope.timeObject;
    $scope.JobTbl = [];

    // Apply the final step of record history input of completed documents
    $scope.angularTableSortFilterFunction = function() {

        $scope.sortType = 'jobname'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.searchJob = ''; // set the default search/filter term

        timeObject = {"today": $scope.today};
        companyInfoObjectForTable = $scope.audience;
        companyInfoObjectForTable.hours = $scope.audience.hours.workduration;

        angular.extend(companyInfoObjectForTable, timeObject);
        $scope.JobTbl.push(companyInfoObjectForTable); // used to populate my jobs table

        var setterJobTbl = [];
        setterJobTbl = $scope.JobTbl;
        localStorage.setItem("sessonsaveAngularLogVar", JSON.stringify(setterJobTbl));
    }

    /* *********************************** */
    /* ******** Browser Memory  ********** */
    /* *********************************** */

    /* restore table from unexpected window close */
    $scope.restoreLastSessionAngularLog = function() {

        $scope.sortTypePast = 'jobname'; // set the default sort type
        $scope.sortReversePast = false;  // set the default sort order
        $scope.searchJobPast = ''; // set the default search/filter term

        //var storedArr = JSON.parse(localStorage.getItem("sessonsaveAngularLogVar"));
        // log history
        $scope.JobTblPast = JSON.parse(localStorage.getItem("sessonsaveAngularLogVar"));

        // Sender Input Form - from Browser
        $scope.user = JSON.parse(localStorage.getItem("sessonsaveAngularmycontactVar"));
        // Receiver Input Form - from Browser
        $scope.audience = JSON.parse(localStorage.getItem("sessonsaveAngularcompanyInfoVar"));
        // Environment Input Form - from Browser
        $scope.environmentsetting = JSON.parse(localStorage.getItem("sessonsaveAngularindustryThemesVar"));
        // Relationship Input Form - from Browser
        $scope.desirability = JSON.parse(localStorage.getItem("sessonsaveAngularwhatIofferVar"));

    }

    $scope.lastSession2thisSession = function() {
        angular.extend($scope.JobTbl, $scope.JobTblPast);
    }

    /* print documents */
    $scope.btnPrintDocs = function() {
        //'use strict';
        var pos, co, st;
        pos = $scope.audience.jobname;
        co = $scope.audience.name;
        st = $scope.audience.state;

        printDocs(pos, co, st);

        $scope.documentName = $scope.audience.jobname + " | " + $scope.audience.name + " | " + $scope.audience.state;

        $scope.angularTableSortFilterFunction(); //Send result to output log and other finishing checkout events

        $scope.clearSelectedInputTabs();
    }

    /* print log record */
    $scope.btnPrintLog = function () {
        var docTime = document.getElementById('myCornerClock2').innerHTML;
        var jsonTable = $scope.JobTbl;
        var log;
        log = "<table id='dataTable'> <tr> <th>jobname</th><th>jobid</th><th>hours</th><th>name</th><th>address</th><th>city</th><th>state</th><th>zip</th><th>website</th><th>attn</th><th>attnemail</th><th>phone</th><th>situation</th><th>today</th> </tr>";
        var i;
        for (i=0; i < jsonTable.length; i++) {
            log += "<tr>";
            log += "<td>" + jsonTable[i].jobname + "</td>";
            log += "<td>" + jsonTable[i].jobid + "</td>";
            log += "<td>" + jsonTable[i].hours + "</td>";
            log += "<td>" + jsonTable[i].name + "</td>";
            log += "<td>" + jsonTable[i].address + "</td>";
            log += "<td>" + jsonTable[i].city + "</td>";
            log += "<td>" + jsonTable[i].state + "</td>";
            log += "<td>" + jsonTable[i].zip + "</td>";
            log += "<td>" + jsonTable[i].website + "</td>";
            log += "<td>" + jsonTable[i].attn + "</td>";
            log += "<td>" + jsonTable[i].attnemail + "</td>";
            log += "<td>" + jsonTable[i].phone + "</td>";
            log += "<td>" + jsonTable[i].situation + "</td>";
            log += "<td>" + jsonTable[i].today + "</td>";
            log += "</tr>";

        }
        log += "</table>";
        saveHtmlAsFile(log, "SessionLog " + docTime);
    }

    /* input log record */
    $scope.fileInputLog = function(filePath) {
        var inputContents;
        reader.onload = function(e) {
            inputContents = e.target.result;
            $('#loginputPreviewDiv').html(inputContents); //this is just an extra optional preview
            $scope.importedTableLog = htmlTableString2Json(inputContents);


        }; //end onload()
        reader.readAsText(filePath.files[0]);
    }

    /* commit file input to $scope.JobTblPast array */
    $scope.btnCommitPreviewToScope = function() {
        /*
        //i dont need this anymore, but i feel i may need it again
        var array = [];
        var headers = [];
        if (document.getElementById('dataTable')) {
            $('#dataTable th').each(function(index, item) {
                headers[index] = $(item).html();
            });
            $('#dataTable tr').has('td').each(function() {
                var arrayItem = {};
                $('td', $(this)).each(function(index, item) {
                    arrayItem[headers[index]] = $(item).html();
                });
                array.push(arrayItem);
            });
            $scope.JobTblPast = array;
        }
        */
        if (jQuery.isEmptyObject($scope.importedTableLog) === false) {
            $scope.JobTblPast = $scope.importedTableLog;
        }
    }

    /* ********************** */
    /* * Templates Related  * */
    /* ********************** */
    $scope.importedJsonFile ='';

    /* templateInput input JSON File*/
    $scope.fileInputResumeJSON = function(filePath) {
        var inputContents;
        reader.onload = function(e) {
            inputContents = e.target.result;
            inputContents = JSON.parse(inputContents);

            $scope.importedJsonFile = inputContents;
            $scope.outputPreview(); //my fake wana-be ng-update ng-model updater
            $scope.$apply();

            $scope.fileInputResumeJSONInputOverwite(); console.log("Called: $scope.fileInputResumeJSONInputOverwite();");
            $scope.clearSelectedInputTabs(); //force update
        }; //end onload()
        reader.readAsText(filePath.files[0]);
    }

    /* new input presets associated with inported JSON */
    /* note: in the JSON, empty quotes should be regarded as NA to avoid unintentional overwrite and clearing */
    $scope.fileInputResumeJSONInputOverwite = function() {
        console.log("this is a new function/argument: $scope.fileInputResumeJSONInputOverwite", "debug test");
        $scope.user = angular.copy($scope.importedJsonFile.senderTemplateJSON);
        $scope.audience = angular.copy($scope.importedJsonFile.receiverTemplateJSON);
        $scope.environmentsetting = angular.copy($scope.importedJsonFile.environmentTemplateJSON);
        $scope.desirability = angular.copy($scope.importedJsonFile.relationshipTemplateJSON);

        //email tab form
        $scope.leads = angular.copy($scope.importedJsonFile.emailletterTemplateJSON);
        $scope.leads.leadtype = $scope.leads.lead;
        $scope.leads.followup = $scope.leads.research;
    }

    /* resume template selector */
    $scope.loadResumeTemplateStrings = function(val) {

        switch (val) {
            case '1': // json file input
                $scope.outputPreview(); //my fake wana-be ng-update ng-model updater
                break;
            case '2':
                break;
            case '3': //default

                $scope.importedJsonFile = myAppFactoryJson;
                $scope.outputPreview(); //my fake wana-be ng-update ng-model updater

                break;
            default:
                break;
        }

        $scope.clearSelectedInputTabs(); //force update
    };

    // Manual ng Update
    // i hate make my ng-bind update like this, but i dont know how to $scope.$apply() or $watch the right way to replace this
    $scope.outputPreview = function() {

        var jsonVar;
        var templateText;

        if (angular.isUndefined($scope.importedJsonFile)) {
            return; //this just means the document preview content value is nothing since my app doesent use this variable yet
        } else {
            jsonVar = $scope.importedJsonFile;
        };

        if (angular.isUndefined(jsonVar.emailletterTemplateJSON)) {
            jsonVar.emailletterTemplateJSON;
        } else {
            // manually update angular email inputs
            templateText = jsonVar.emailletterTemplateJSON.body;
            $scope.emailletterPreviewBody = $interpolate(templateText)($scope);
        }

        if (angular.isUndefined(jsonVar.coverletterTemplateJSON)) {
            jsonVar.coverletterTemplateJSON;
        } else {
            // manually update angular cover letter inputs
            templateText = jsonVar.coverletterTemplateJSON.header;
            $scope.coverletterPreviewHead = $interpolate(templateText)($scope);
            templateText = jsonVar.coverletterTemplateJSON.body;
            $scope.coverletterPreviewBody = $interpolate(templateText)($scope);
            templateText = jsonVar.coverletterTemplateJSON.footer;
            $scope.coverletterPreviewFoot = $interpolate(templateText)($scope);
        }

        if (angular.isUndefined(jsonVar.resumeTemplateJSON)) {
            jsonVar.resumeTemplateJSON;
        } else {
            // manually update angular resume inputs
            templateText = jsonVar.resumeTemplateJSON.header;
            $scope.resumePreviewHead = $interpolate(templateText)($scope);
            templateText = jsonVar.resumeTemplateJSON.body;
            $scope.resumePreviewBody = $interpolate(templateText)($scope);
        }

        if (angular.isUndefined(jsonVar.resumeTemplateJSON)) {
            jsonVar.resumeTemplateJSON;
        } else {
            // manually update angular input prompts
            templateText = jsonVar.relationshipTemplateJSON.abilityarrayinputPrompt;
            $scope.desirability.abilityarrayinputPrompt = $interpolate(templateText)($scope);
        }
    };

    /* ************************ */
    /* * Word Usage Analytics * */
    /* ************************ */

    $scope.emailwordanalyticsTbl =[];
    $scope.resumewordanalyticsTbl =[];
    $scope.coverletterwordanalyticsTbl =[];

    $scope.wordcounterCleaner = function(value) {

        value = value.replace(/\<div (.*?)\>/g, ' '); value = value.replace(/\<div\>/g, ' ');
        value = value.replace(/\<table\>/g, ' '); value = value.replace(/\<\/table\>/g, ' ');
        value = value.replace(/\<\tbody\>/g, ' '); value = value.replace(/\<\/tbody\>/g, ' ');
        value = value.replace(/\<tr\>/g, ' '); value = value.replace(/\<\/tr\>/g, ' ');
        value = value.replace(/\<td\>/g, ' '); value = value.replace(/\<\/td\>/g, ' ');
        value = value.replace(/\<center\>/g, ' '); value = value.replace(/\<\/center\>/g, ' ');

        value = value.replace(/\<br\>/g, ' ');
        value = value.replace(/\<p(.*?)\>/g, ' '); value = value.replace(/\<\/p\>/g, ' ');
        value = value.replace(/\<span(.*?)\>/g, ' '); value = value.replace(/\<\/span\>/g, ' ');

        value = value.replace(/\<b\>/g, ' '); value = value.replace(/\<\/b\>/g, ' ');
        value = value.replace(/\<u\>/g, ' '); value = value.replace(/\<\/u\>/g, ' ');
        value = value.replace(/\<i\>/g, ' '); value = value.replace(/\<\/i\>/g, ' ');

        value = value.replace(/\,/g, ' ');
        value = value.replace(/\:/g, ' ');
        value = value.replace(/\./g, ' ');
        value = value.replace(/\//g, ' '); value = value.replace(/\\/g, ' ');
        value = value.replace(/\(/g, ' '); value = value.replace(/\)/g, ' ');
        value = value.replace(/\{/g, ' '); value = value.replace(/\}/g, ' ');
        value = value.replace(/\[/g, ' '); value = value.replace(/\]/g, ' ');
        value = value.replace(/\</g, ' '); value = value.replace(/\>/g, ' ');
        value = value.replace(/\&amp;/g, ' '); //value = value.replace("&amp", ' ');
        value = value.replace(/\;/g, ' ');

        value = value.replace(/\t/g, ' '); //tabs
        value = value.replace(/\r/g, ' '); //carrage return
        value = value.replace(/\n/g, ' '); //new line
        value = value.replace(/(\s+)/g, ' '); //all multiple white space

        return value;
    }

    $scope.wordcounterObjectArray = function(value) {

        var array_elements = value.split(" "); array_elements.sort();
        var current = '';
        var cnt = 0;

        var tempTbl =[];
        var tempObject;

        for (var i = 0; i < array_elements.length; i++) {
            if (array_elements[i] != current) {
                if (cnt > 0) {
                    tempObject ={"word": current, "count": cnt};
                    tempTbl.push(tempObject);
                }
                current = array_elements[i];
                cnt = 1;

            } else {
                cnt++;
            }
        }

        return tempTbl;
    }

    $scope.analyticsWordCounter = function() {
        $scope.sortTypeAnalytics1 = 'word'; // set the default sort type
        $scope.sortReverseAnalytics1 = false;  // set the default sort order

        $scope.sortTypeAnalytics2 = 'word'; // set the default sort type
        $scope.sortReverseAnalytics2 = false;  // set the default sort order

        $scope.sortTypeAnalytics3 = 'word'; // set the default sort type
        $scope.sortReverseAnalytics3 = false;  // set the default sort order

        var regex = /\s+/gi; // spaces

        var value =  $('#emailletterTemplate').html();
        $('#wordCount').html(value.trim().replace(regex, ' ').split(' ').length);
        $('#totalChars').html(value.length);
        $('#charCount').html(value.trim().length);
        $('#charCountNoSpace').html(value.replace(regex, '').length);
        value = $scope.wordcounterCleaner(value);
        $scope.emailwordanalyticsTbl = $scope.wordcounterObjectArray(value); //table of words
        //
        value =  $('#coverletterTemplate').html();
        $('#wordCountCoverLetter').html(value.trim().replace(regex, ' ').split(' ').length);
        $('#totalCharsCoverLetter').html(value.length);
        $('#charCountCoverLetter').html(value.trim().length);
        $('#charCountNoSpaceCoverLetter').html(value.replace(regex, '').length);
        value = $scope.wordcounterCleaner(value);
        $scope.coverletterwordanalyticsTbl = $scope.wordcounterObjectArray(value); //table of words
        //
        value =  $('#resumeTemplate').html();
        $('#wordCountResume').html(value.trim().replace(regex, ' ').split(' ').length);
        $('#totalCharsResume').html(value.length);
        $('#charCountResume').html(value.trim().length);
        $('#charCountNoSpaceResume').html(value.replace(regex, '').length);
        value = $scope.wordcounterCleaner(value);
        $scope.resumewordanalyticsTbl = $scope.wordcounterObjectArray(value); //table of words
    }

    /* *********************************** */
    /* ******** DEMO APPLICATION ********* */
    /* *********************************** */

    /* form inputs demo button */
    /* form inputs demo button */
    $scope.btnDemo = function() {
        //user tab form
        $scope.user = angular.copy(myAppFactoryJsonDEMO.senderTemplateJSON);
        $scope.frmUser.userFirstName.$dirty = true;
        $scope.frmUser.userLastName.$dirty = true;
        $scope.frmUser.userAddress.$dirty = true;
        $scope.frmUser.userCity.$dirty = true;
        $scope.frmUser.userState.$dirty = true;
        $scope.frmUser.userZip.$dirty = true;
        $scope.frmUser.userPhone.$dirty = true;
        $scope.frmUser.userEmail.$dirty = true;
        $scope.frmUser.userMyUrl.$dirty = true;

        //audience tab form
        $scope.audience = angular.copy(myAppFactoryJsonDEMO.receiverTemplateJSON);
        $scope.frmAudience.audienceJobname.$dirty = true;
        $scope.frmAudience.audienceJobid.$dirty = true;
        $scope.audience.hours = $scope.hourstype[2];
        $scope.frmAudience.audienceHours.$dirty = true;
        $scope.frmAudience.audienceName.$dirty = true;
        $scope.frmAudience.audienceAddress.$dirty = true;
        $scope.frmAudience.audienceCity.$dirty = true;
        $scope.frmAudience.audienceState.$dirty = true;
        $scope.frmAudience.audienceZip.$dirty = true;
        $scope.frmAudience.audienceWebsite.$dirty = true;
        $scope.frmAudience.audienceAttn.$dirty = true;
        $scope.frmAudience.audienceAttnemail.$dirty = true;
        $scope.frmAudience.audiencePhone.$dirty = true;
        $scope.frmAudience.audienceSituation.$dirty = true;

        //environmentsetting tab form
        $scope.environmentsetting = angular.copy(myAppFactoryJsonDEMO.environmentTemplateJSON);
        $scope.frmEnvironment.environmentsettingCompanydescription.$dirty = true;
        $scope.frmEnvironment.environmentsettingCompanyphilosophy.$dirty = true;
        $scope.frmEnvironment.environmentsettingCompanycustomers.$dirty = true;
        $scope.frmEnvironment.environmentsettingCompanydistinguish.$dirty = true;

        //desirability tab form
        $scope.desirability = angular.copy(myAppFactoryJsonDEMO.relationshipTemplateJSON);
        $scope.frmDesirability.desirabilityApplicationidentity.$dirty = true;
        $scope.frmDesirability.desirabilitySkillarray.$dirty = true;
        $scope.frmDesirability.desirabilityKnowledgearray.$dirty = true;
        $scope.frmDesirability.desirabilityAbilityarray.$dirty = true;

        //email tab form
        $scope.leads = angular.copy(myAppFactoryJson.emailletterTemplateJSON); //technically, myAppFactoryJson is also a demo input version
        $scope.leads.leadtype = $scope.leads.leadtype;
        $scope.leads.followup = $scope.leads.followup;

        $scope.frmEmailLetter.leadsLeadtype.$dirty = true;
        $scope.frmEmailLetter.leadsFollowup.$dirty = true;

        //settings
        $scope.importedJsonFile = myAppFactoryJson;
        $scope.outputPreview();
        $scope.frmTemplates.rdoResumeTemplate = 3;
        $scope.dbxTemplate = '1';
    };

    /* a demonstaration of past log data inputs */
    $scope.btnDemoLogPast = function() {
        //$scope.JobTblPast = demoObjArrTableHistory;
        $scope.JobTblPast = myAppFactoryJsonDEMO.demoObjArrTableHistory;
    }

}]);

// App Module Directive
app.directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {
        // https://docs.angularjs.org/api/ng/service/$interval
        // return the directive link function. (compile function not needed)
        return function(scope, element, attrs) {
            var format, stopTime;

            // used to update the UI
            function updateTime() {
                element.text(dateFilter(new Date(), format));
                Run(); //refresh the Spinning/Ticking Gears SVG

                if (getBrowserClock() === 1) {
                    setClock(); //IE clock tick refresh
                }
            }

            // watch the expression, and update the UI on change.
            scope.$watch(attrs.myCurrentTime, function(value) {
                format = value;
                updateTime();
            });

            stopTime = $interval(updateTime, 1000); //updates ever minute

            // listen on DOM destroy (removal) event, and cancel the next UI update to prevent updating time after the DOM element was removed.
            element.on('$destroy', function() {
                $interval.cancel(stopTime);
            });
        }
}]);

// App Module Filter
app.filter('unsafe', function($sce){
    // i dont need this anymore, but i anticipate resurecting its usage, 'angular-sanitize.js' handles unsafe and interpolation filters for me now // used for formatting html contained as a text // ng-bind-html = 'scopeVar | unsafe'
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

// App Factory
app.factory('myAppFactoryJson', function(){
    var factoryObj = {
        "senderTemplateJSON":
        {
            "firstName": "Michael",
            "middleName": "Jerome",
            "lastName": "Todd",
            "address": "78 River Court",
            "city": "Crawfordville",
            "state": "FL",
            "zip": "32327",
            "phone": "850-XXX-XXXX",
            "email": "mezcel@mail.com",
            "myUrl": "https://github.com/mezcel"
        },
        "receiverTemplateJSON":
        {
            "jobnameinputPrompt":"Position:",
            "jobname": "",
            "jobidinputPrompt":"Job Code:",
            "jobid": "",
            "hours":  [ {"id":'0', "workduration" : "temp"}, {"id":'1', "workduration" : "full-time"}, { "id":'2', "workduration" : "part-time" }, { "id":'3', "workduration" : "hourly"}, { "id":'4', "workduration" : "seasonal"}, { "id":'5', "workduration" : "salary"} ],
            "name": "",
            "address": "",
            "city": "",
            "state": "",
            "zip": "",
            "website": "",
            "attn": "",
            "attnemail": "",
            "phone":"",
            "situation":""
        },
        "environmentTemplateJSON":
        {
            "companydescriptioninputPrompt":"I see that your company ...",
            "companydescription": "",
            "companyphilosophyinputPrompt":"Your organization ...",
            "companyphilosophy": "",
            "companycustomersinputPrompt":"Your customers ...",
            "companycustomers": "",
            "companydistinguishinputPrompt":"Blog, News, Advertisement",
            "companydistinguish": ""
        },
        "relationshipTemplateJSON":
        {
            "applicationidentityinputPrompt":"As a ...",
            "applicationidentity": "",
            "skillarrayinputPrompt":"You are looking for talent who have skills in ...",
            "skillarray": "",
            "knowledgearrayinputPrompt":"... , and I ...",
            "knowledgearray": "",
            "abilityarrayinputPrompt":"... , my abilities include ...",
            "abilityarray": ""
        },
        "emailletterTemplateJSON":
        {
            "leadtype":"Stackoverflow Jobs",
            "followup":"web research",
            "header":"",
            "body":"<p class=\"w3-left-align\">{{today | date}}</p> <br> Dear <span class=\"highlighterDiv\">{{audience.attn}}</span>, <br><br> <p class=\"tab\">My name is <span class=\"highlighterDiv\">{{user.firstName}}</span> <span class=\"highlighterDiv\">{{user.lastName}}</span>. I learned about your company, <span class=\"highlighterDiv\">{{audience.name}}</span>, through <span class=\"highlighterDiv\">{{leads.leadtype}}</span>. I understand you are currently in the process of hiring a <span class=\"highlighterDiv\">{{audience.jobname}}</span>. I am seeking employment in this discipline of technology. Based on what I learned from <span class=\"highlighterDiv\">{{leads.followup}}</span>, I see that your company <span class=\"highlighterDiv\">{{environmentsetting.companydescription}}</span>. Your customers <span class=\"highlighterDiv\">{{environmentsetting.companycustomers}}</span>. You are looking for talent who have skills in <span class=\"highlighterDiv\">{{desirability.skillarray}} </span>. Your organization <span class=\"highlighterDiv\">{{environmentsetting.companyphilosophy}}</span>. <span class=\"highlighterDiv\">{{environmentsetting.companydistinguish}}</span>. This appeals to me, and I would like the opportunity to try out for your team.</p> <p class=\"tab\"> May I send you my cover letter and resume? I hope it may inspire talking points regarding my eligibility for this position. My confidence, as an applicant, is directed at an entry-level position, but my abilities are perhaps reflective of a mid-level position. I would like to have a conversation about the work culture at <span class = \"highlighterDiv\">{{audience.name}}</span> and learn what you,<span class = \"highlighterDiv\">{{audience.attn}}</span>, believe are key ingredients for employee success at your organization.</p> <br> Respectfully,<br> <span class = \"highlighterDiv\">{{user.firstName}}</span> <span class = \"highlighterDiv\"> {{user.middleName}} </span> <span class = \"highlighterDiv\">{{user.lastName}}</span> <br> <span class=\"highlighterDiv\">{{user.myUrl}}</span> <p></p>",
            "footer":""
        },
        "resumeTemplateJSON":
        {
            "header":"<p align='center'><span class=\"highlighterDiv\">{{user.firstName}} {{user.middleName}} {{user.lastName}}<br>{{user.address}}, {{user.city}}, {{user.state}}, {{user.zip}}<br> {{user.phone}} {{user.email}}</span></p> <h3 align='center'>Resume</h3><hr> <p>I am applying for the <span class=\"highlighterDiv\">{{audience.jobname}}</span> position, <span class=\"highlighterDiv\">{{audience.jobid}}</span>, for <span class=\"highlighterDiv\">{{audience.name}}</span> in <span class=\"highlighterDiv\">{{audience.city}}</span>, <span class=\"highlighterDiv\">{{audience.state}}</span>.</p>",
            "body":"<p><b>Services</b></p><p><center><table><tr><td>Embedded System Analysis</td> <td>Debugging and Troubleshooting</td><td>Testing &amp; Documentation</td></tr><tr><td>Software Development</td><td>Requirements Management</td><td>Project Management</td></tr><tr><td>Coding &amp; Scripting</td><td>GUI Design</td><td>Database Design</td></tr></table></center></p><p><b>Technology Summary</b></p><p> <u>Programming</u>: C, C ++, C#, XML, CSV, SVG, MySQL, MSSql, HTML, VB.Net, ASP.NET, ADO.NET, LINQ, Java, JavaScript, AngularJS, jQuery, CSS, and PHP</p><p><u>Development Tools</u>: MS Visual Studio 2012, MS Sql Server Management Studio, MySql Workbench, WAMP Server, Oracle NetBeans IDE, Notepad ++, Atom for Mac, Inkscape, Sketchup 3D(CAD), MS Office Suite</p><p><u>Systems</u>: Windows, Dot NET</p><p><b>Education</b></p><p><u>Gannon University Erie, PA | B.S. Electrical/Computer Engineering, 2006</u><br>Electrical Engineering, Computer Engineering, Embedded SystemsPublished Scientific Journal on Artificial Intelligence</p><p></p><p><u>TCC, Tallahassee, FL | (Continued Education) Environmental Science, 2014</u><br>Environmental Systems, Plant Biology, Environmental Law/Regulations</p><p><u>Gannon University Erie, PA | (Masters Schooling) Information Analytics, 2015</u><br>Database Management, Requirements for Software Systems</p><p><b>Professional Experience</b></p><p><u>Independent Green Technologies (IGT) - Tallahassee, FL</u><br>CAD Specialist, 2014</p><p>My responsibility in the company focused on using computer aided design (CAD) tools to model price and cost projections for large-scale commercial organizations and residential stakeholders. The models were used to appraise and simulate design efficiency and feasibility to construct.</p><p><u>United States Coast Guard Cutter Mustang (WPB 1310) - Seward, AK</u><br>Machinery Technician, 2011-2013</p><p>As a member of a ship's engineering staff, I took the initiative to enhance our machinery related catalog and inventory database. Because of this initiative, enhancements were implemented service wide on that ship class. I used MS Access to develop a parts inventory catalog for EATON/Aeroquip brand high pressure hoses. This application was used to manage the preventative maintenance schedule, parts and pricing, and for ordering replacements for worn or damaged equipment and accessory parts.</p><p><u>Coast Guard Station Venice - Venice, LA</u><br>Search and Rescue, Boarding Officer, 2008-2011</p><p>In conjunction with search and rescue response duties, I developed a computer application to enhance safety and productivity. I used my computer technology skills to develop an HTML, CSS and RSS feed based application to gather weather, sea state and tidal information to assist in risk assessment for boats deploying in search and rescue operations.</p>",
            "footer":""
        },
        "coverletterTemplateJSON":
        {
            "header": "<p class='w3-left-align'>{{today | date}}</p><p><span class=\"highlighterDiv\">{{audience.attn}}</span><br><span class=\"highlighterDiv\">{{audience.name}}</span><br><span class=\"highlighterDiv\">{{audience.address}}</span><br><span class=\"highlighterDiv\">{{audience.city}}</span>, <span class=\"highlighterDiv\">{{audience.state}}</span>, <span class=\"highlighterDiv\">{{audience.zip}}</span></p><br>",
            "body": "<p>Dear <span class=\"highlighterDiv\">{{audience.attn}}</span>,</p> <p class=\"tab\">My name is <span class=\"highlighterDiv\">{{user.firstName}}</span> <span class=\"highlighterDiv\">{{user.middleName}}</span> <span class=\"highlighterDiv\">{{user.lastName}}</span>. I am applying for the <span class=\"highlighterDiv\">{{audience.jobname}}</span> position at <span class=\"highlighterDiv\">{{audience.name}}</span>, in <span class=\"highlighterDiv\">{{audience.city}}</span>. I possess skills in <span class=\"highlighterDiv\">{{desirability.skillarray}}</span>. As a <span class=\"highlighterDiv\">{{desirability.applicationidentity}}</span>, my abilities include <span class=\"highlighterDiv\">{{desirability.abilityarray}}</span>, and I <span class = \"highlighterDiv\">{{desirability.knowledgearray}}</span>. </p> <p class=\"tab\">I am seeking to diversify my technology portfolio and develop a career as a <span class = \"highlighterDiv\">{{desirability.applicationidentity}}</span>. I have developed a variety of program applications which perform tasks directed at social networking, GPS, weather, document preparation, databases, audio processing, telecommunications networking, and agriculture. I have labor, retail, mechanic, and legal employment experience and graduate school leadership in databases and robotics. I posses  the adaptability to apply the skills needed to work as a <span class=\"highlighterDiv\">{{audience.jobname}}</span> within <span class=\"highlighterDiv\">{{audience.name}}</span>.</p> <p class=\"tab\">Within the last year I have developed the following technology applications: a plant identification and imaging identification application, a Windows 8-10 tablet satellite global positioning system without wi-fi app, and an interactive tablet e-Book with an independent serve library database and  A web conferencing app. These projects were an opportunity to express my understanding and ability to perform a variety of different philosophical approaches, intellectual processes, and techniques which have value in a variety of technical markets.</p> <p class=\"tab\">The Plant Identification and Imaging Identification Assistant is a Windows OS application that performs comprehensive plant identification that is based upon human observations and traits of a plant specimen. The plant identification algorithm is based on a dichotomous key that associates genetic taxonomy and leaf shape morphology. The functionality of this application is dependent on both a camera image input and a person's sense of sight and feel. I used the following skills in developing my plant identification application: C#, Sql, MySql Database, plant biology taxonomy, image detection, EmguCV, front-end/back-end software development, and user interface design.</p> <p class=\"tab\">The tablet GPS app I developed is a cross-platform mobile device which inputs GPS signals from a USB COM port and displays the users current position, altitude, and speed. This application is not dependent on Internet signals. There is an additional celestial navigation modular component feature which is  currently under construction, which will be added as a plugin. Development of my GPS application skills includes: HTML, JavaScript, serial COM Port interface, object oriented VB.Net, and GPS serial string parsing.</p> <p class=\"tab\">The interactive tablet E-Book, book library database,  web conferencing app is a social prayer/meditation application which serves as an e-book library, LAN chat room and forum, interactive touch screen tablet, and teleconferencing tool. This device is plug and play, provided that a dedicated server is actively online on a shared network. Multiple users can log in and out in a shared event experience and influence each others' experience by changing the environment content. This App uses  ASP/WCF, C#, MySql, ADO.Net, Networked Conferencing, chat room techniques, E-Book, Database, TCP/IP, front-end/back-end development, language localization, and plug and play networking.</p> <p class=\"tab\"><span class=\"highlighterDiv\">{{audience.attn}}</span>, thank you for taking the time to read and consider my cover letter for employment with <span class=\"highlighterDiv\">{{audience.name}}</span>. I have multiple technical skills an diverse work experiences that will integrate well within your organization and its business culture. I welcome the opportunity to discuss your observations and my prospects of joining your organization and making an immediate contribution to your productivity.</p> ",
            "footer": "<p>Sincerely,</p><br><br> <p><span class=\"highlighterDiv\">{{user.firstName}}</span> <span class=\"highlighterDiv\">{{user.middleName}}</span> <span class=\"highlighterDiv\">{{user.lastName}}</span><br><span class=\"highlighterDiv\">{{user.address}}</span>, <span class=\"highlighterDiv\">{{user.city}}</span>, <span class=\"highlighterDiv\">{{user.state}}</span>, <span class=\"highlighterDiv\">{{user.zip}}</span><br><span class=\"highlighterDiv\">{{user.email}}</span></p>"
        }
    };

    return factoryObj;
});
app.factory('myAppFactoryJsonDEMO', function(){
    var factoryObj = {
        "senderTemplateJSON":
        {
            "firstName": "Mezcel",
            "middleName": "",
            "lastName": "Matters",
            "address": "123 Address Ln.",
            "city": "Sim City",
            "state": "ST",
            "zip": "12345",
            "phone": "123-456-7890",
            "email": "mezcel@mail.com",
            "myUrl": "https://github.com/mezcel"
        },
        "receiverTemplateJSON":
        {
            "jobnameinputPrompt":"Position:",
            "jobname": "Programmer",
            "jobidinputPrompt":"Job Code:",
            "jobid": "software developer",
            "hours":  [ {"id":'0', "workduration" : "temp"}, {"id":'1', "workduration" : "full-time"}, { "id":'2', "workduration" : "part-time" }, { "id":'3', "workduration" : "hourly"}, { "id":'4', "workduration" : "seasonal"}, { "id":'5', "workduration" : "salary"} ],
            "name": "ACME",
            "address": "1011 Bitmap",
            "city": "Megatropolis",
            "state": "MT",
            "zip": "67890",
            "website": "wwww.website.com",
            "attn": "Mr. Smith",
            "attnemail": "name@mail.com",
            "phone":"987-654-3210",
            "situation":"Stackoverflow Jobs"
        },
        "environmentTemplateJSON":
        {
            "companydescriptioninputPrompt":"I see that your company ...",
            "companydescription": "is developing cutting-edge software that streamlines the processes related to prescribing, distributing, and administering specialty medications",
            "companyphilosophyinputPrompt":"Your organization ...",
            "companyphilosophy": "increases speed to therapy by revolutionizing health care technology by integrating with third-party networks",
            "companycustomersinputPrompt":"Your customers ...",
            "companycustomers": "work in specialized pharmaceutical industries",
            "companydistinguishinputPrompt":"Blog, News, Advertisement",
            "companydistinguish": "You design custom solutions that improve productivity and benefit all stakeholders"
        },
        "relationshipTemplateJSON":
        {
            "applicationidentityinputPrompt":"As a ...",
            "applicationidentity": "front-end developer",
            "skillarrayinputPrompt":"You are looking for talent who have skills in ...",
            "skillarray": "C#, ASP.NET MVC, and Angular Java Script",
            "knowledgearrayinputPrompt":"... , and I ...",
            "knowledgearray": "have experience debugging, troubleshooting, and managing entity relationship databases on server and client side software. I am capable of being up-to-date with the latest developments in various technical fields",
            "abilityarrayinputPrompt":"... , my abilities include ...",
            "abilityarray": "solid theoretical foundations in various areas of computing, including algorithms & data structures, databases and especially distributed computing. I have experience appraising software requirements, management and applying database design"
        },
        "demoObjArrTableHistory":
    [
        {
            "jobname": ".NET Developer",
            "jobid": "software developer",
            "hours": "contract",
            "name": "Ascentis",
            "address": "8657 Baypine Road Suite 201",
            "city": "Jacksonville",
            "state": "FL",
            "zip": "32256", "website": "http://www.ascentis.com/",
            "attn": "Ascentis Regional Office",
            "attnemail": "http://www.ascentis.com/about-us/contact-us/",
            "phone":"1.800.229.2713",
            "situation":"Stack Overflow Jobs",
            "today":"t1"
        },
        {
            "jobname": "Applications Architect", "jobid": "(118349)", "hours": "contract", "name": "UPS Information Technology", "address": "340 Macarthur Blvd", "city": "Mahwah", "state": "NJ", "zip": "07430", "website": "https://www.commercialcafe.com/commercial-property/us/nj/mahwah/ups-world-technology-headquarters/", "attn": "UPS World Technology Headquarters", "attnemail": "https://www.jobs-ups.com/information-technology", "phone":"201-934-4176", "situation":"Stack Overflow Jobs", "today":"t2"
        },
        {
            "jobname": "Cleared SharePoint/.NET Developers", "jobid": "(1483)", "hours": "contract", "name": "Applied Information Sciences (AIS)", "address": "11400 Commerce Park Dr # 600", "city": "Reston", "state": "VA", "zip": "20191", "website": "https://www.appliedis.com/", "attn": "Applied Information Sciences", "attnemail": "recruiting@appliedis.com", "phone":"703.860.7808 ", "situation":"Stack Overflow Jobs", "today":"t3"
        },
        {
            "jobname": ".NET Developer", "jobid": "software developer", "hours": "contract", "name": "Greenshades", "address": "7020 AC Skinner Parkway Suite 100", "city": "Jacksonville", "state": "FL", "zip": "32256", "website": "https://www.greenshades.com/", "attn": "Greenshades", "attnemail": "http://www.greenshades.com/about-contact-us.php", "phone":"888-255-3815", "situation":"Stack Overflow Jobs", "today":"t4"
        },
        {
            "jobname": "C# Software Engineer", "jobid": "software developer", "hours": "contract", "name": "Industrial Color", "address": "32 Ave. of the America – 22nd Floor", "city": "New York", "state": "NY ", "zip": "10013", "website": "http://industrialcolor.com/", "attn": "Industrial Color", "attnemail": "icny@industrialcolor.com", "phone":"(212) 334 3353", "situation":"Stack Overflow Jobs", "today":"t5"
        },
        {
            "jobname": "Staff Help", "jobid": "go-for", "hours": "peon", "name": "Mezcel Inc.", "address": "123 Address Ln. – 2nd Floor", "city": "New Crawfordville", "state": "AB ", "zip": "12345", "website": "https://github.com/mezcel", "attn": "Mr. Mezcel", "attnemail": "mezcel@mail.com", "phone":"(000) 000-000", "situation":"a friend of a stranger", "today":"t6"
        }
    ]
    };
    return factoryObj;
});
