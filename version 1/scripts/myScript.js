/* Javascript Functions */
/* ******************************** */
/* Splash screen: regarless of load */
/* ******************************** */

var reader = new FileReader();
var genericTechResumeBody, genericCoverletter, genericEmailletter;

//flags
//var flagObjects = {templateFlag: false, coverletterFlag: false};
var resumeTemplateFlags = {mycontactFlag: false, companyFlag: false, industryFlag: false, whatIofferFlag: false, templatetypeFlag: false, emaillettertypeFlag: false};
var csvLogArr; //this will be an accumulating array, not used in this version

var progressResult = document.getElementById('percentDiv'), currentPercent = 0;

var showPercent = window.setInterval( function() {

  if (currentPercent < 100) {
	currentPercent += 1;
	progressResult.innerHTML = "Loading: <br>" + currentPercent + "%";
	
  } else {
	// progress bar related
	clearInterval(showPercent); //stop timer
	document.getElementById('load').innerHTML = "loading is complete";
	progressResult.innerHTML = "<br><br><i class='fa fa-sign-in w3-center' style='font-size:30px;color:purple;'> Continue...</i>";
  }
}, 40);

function hide() {
	var bar = document.getElementById('loading');
	var status = bar.offsetWidth;
	
	if (status === 190) {
		//close splash screen
		document.getElementById('lightSplash').style.display = 'none';
		document.getElementById('fadeSplash').style.display = 'none';
		
		//make the main app visible
		document.getElementsByClassName("mask")[0].style.visibility = 'visible'; // mask splash screen
		document.getElementsByClassName("mask")[0].style.display = 'block'; // mask splash screen
	} else {
		document.getElementById('load').innerHTML = "wait unill load is complete";
	}
}

/* ******************************* */
/* Global String Vars              */
/* Prewritten formatted text       */
/* ******************************* */

function displayformalTime(id) {
	'use strict';
	var date, year, month, months, d, day, days, datetimestamp;
	
	date = new Date();
	year = date.getFullYear();
	month = date.getMonth();
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December');

	d = date.getDate();
	day = date.getDay();
	days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
	
	datetimestamp =  months[month] + ' ' + d + ', ' + + year;
	document.getElementById(id).innerHTML = datetimestamp;
	
	setTimeout('displayformalTime("' + id + '");', '1000');
}

function displayfullTime(id) {
	'use strict';
	var date = new Date();
	document.getElementById(id).innerHTML = date;	
	setTimeout('displayfullTime("' + id + '");', '1000');
}

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

function flagMissedVariables() {
	
	var myArr, i;
	
	myArr = Object.keys(resumeTemplateFlags).map(function (key) {return resumeTemplateFlags[key]; }); //convert object to array
	
	for (i = 0; i < myArr.length; i += 1) {
		//higlight selected words from Object
		argStr = myArr[i];
		if (argStr === false) {
			state = false;
			return state;
		}
	}
	state = true;
	return state;
}

/* ******************************* */
/* Dropdown combobox               */
/* ******************************* */

function templatelayoutDropdown() {
'use strict';
	var sel = document.getElementById('templateLayoutDropdown');
	sel = sel.options[sel.selectedIndex].value;	

	switch (sel) {
		case '0':
			resumeTemplateFlags.templatetypeFlag = false;
			break;			
		case '1':
			// in the multi-resume version, this is where I where i willl call a function to call a pre written document
			resumeTemplateFlags.templatetypeFlag = true;
			break;
		case '2':
			break;
		case '3':
			break;
		default:
			resumeTemplateFlags.templatetypeFlag = false;
	}
}

function basicTemplate(prewrittenDocumentObject) {
	//DOM Display
	//pre written adlib bocuments
	
	'use strict';
	var sel;
	
	sel = document.getElementById('templateLayoutDropdown');
	sel = sel.options[sel.selectedIndex].value;	

	switch (sel) {
		case '0':
			document.getElementById('genericresumepreset').innerHTML = "";
			document.getElementById('genericcoverletterpreset').innerHTML = "";
			break;
		case '1':
		// generic
			document.getElementById('genericresumepreset').innerHTML = prewrittenDocumentObject.resume ;
			document.getElementById('genericcoverletterpreset').innerHTML = prewrittenDocumentObject.coverletter;
			break;
		default:
			sel = '1';
			document.getElementById('genericresumepreset').innerHTML = "";
			document.getElementById('genericcoverletterpreset').innerHTML = "";
	}
}

function joblead(nameofselection) {
	   'use strict';
	   
	/* [joblead] [researchlead] */
	
	var sel, x, i, dropdownplaceholder1 , dropdownplaceholder2, lead, learning;
	sel = nameofselection.value;
	lead = document.getElementById('leaddescriptionInput1');
	learning = document.getElementById('leaddescriptionInput2');

	dropdownplaceholder2 = "Enter research efforts other than the company's web site";
		
	switch (sel) {
		
		case '0':
		//nothing
			lead.disabled = false;
			learning.disabled = false;
			dropdownplaceholder1 = "select a contact type from the dropdown (optional)";
			dropdownplaceholder2 = "Enter research efforts other than the company's web site (optional)";
			break;
		case '1':
		// word of mouth
			lead.disabled = false;
			learning.disabled = false;
			dropdownplaceholder1 = "I learned about your company through ... (person, media)";
			dropdownplaceholder2 = "Based on what I learned from ... (social networking)";
			break;
		case '2':
		// walkin
			lead.disabled = false;
			learning.disabled = false;
			dropdownplaceholder1 = "I learned about your company through ... (site visit / store front)";
			dropdownplaceholder2 = "Based on what I learned from ... (recon)";
			break;
		case '3':
		// fair
			lead.disabled = false;
			learning.disabled = false;
			dropdownplaceholder1 = "I learned about your company through ... (event)";
			dropdownplaceholder2 = "Based on what I learned from ... (booths, web, talks with other applicants)";
			break;
		
		case '4':
		// online
			lead.disabled = false;
			learning.disabled = false;
			dropdownplaceholder1 = "I learned about your company through ... (posting)";
			dropdownplaceholder2 = "Based on what I learned from ... (web source)";
			break;
		default:
			lead.disabled = true;
			learning.disabled = true;
	}
	
	lead.placeholder = dropdownplaceholder1;
	learning.placeholder = dropdownplaceholder2;
	
	lead.value = "";
	learning.value = "";
}

/* ************** */

function updateLetterPreview() {
	var sel, lead, research, settingSituation, inputString1, inputString2, tempLongString;
	
	sel = document.getElementById('leadDropdownSelect');
	sel = sel.options[sel.selectedIndex].value;
	
	research = document.getElementById('websiteInput').value;	
	inputString1 = document.getElementById('leaddescriptionInput1').value;
	inputString2 = document.getElementById('leaddescriptionInput2').value;
	tempLongString = document.getElementById("emailletterTemplate").innerHTML;
	settingSituation = document.getElementById("attsituationsettingInput").value;
	
	switch (sel) {
		
		case '0':
		//nothing
			if (inputString1 === "") {
				lead = "searching for companies who are developing technologies I am interested in";
			} else {
				lead = inputString1;
			}
			break;
		case '1':
		// word of mouth
			if (inputString1 === "") {
				lead = "word of mouth";
			} else {
				lead = inputString1;
			}
			break;
		case '2':
		// walkin
			if (inputString1 === "") {				
				if (settingSituation === "") {
					lead = "a cold call walk-in at your store front";
				} else {
					lead = settingSituation;
				}
			} else {
				lead = inputString1;
			}
			break;
		case '3':
		// fair
			if (inputString1 === "") {
				lead = "a company listing on a hiring event";
			} else {
				lead = inputString1;
			}
			break;
		case '4':
		// online
			if (inputString1 === "") {
				if (research === "") {
					lead = "an online recruiting service";
				} else {
					lead = settingSituation;
				}
				
			} else {
				lead = inputString1;
			}
			
			break;
		default:
		//default
			if (inputString1 === "") {
				if (research === "") {
					lead = "searching for companies who are developing technologies I am interested in.";
				} else {
					lead = settingSituation;
				}
				
			} else {
				lead = inputString1;
			}
	}
	
	if (inputString2 !== '') {
		research = inputString2 + " and " + research;
	} else {
		if (research === '') {
			research = "online research";
		} else {
			//do nothing
		}
	}
	
	//replace words in email letter
	lead = '<span class="highlightChange">' + lead + '</span>';
	tempLongString = tempLongString.replace(/\[joblead\]/gi, lead);
	
	research = '<span class="highlightChange">' +research + '</span>';
	tempLongString = tempLongString.replace(/\[researchlead\]/gi, research);
	
	document.getElementById("emailletterTemplate").innerHTML = tempLongString;
	
	//flagObjects.coverletterFlag = true;
	resumeTemplateFlags.emaillettertypeFlag = true;
	
}

function initializeBrowser(manuscriptObject, prewrittenDocumentObject) {
	'use strict';
	
	var initlogVar;
	
	checkFileAPI(); // used for file inputs	
	
	// Adlib template guide
	manuscriptObject.emailletterBlank = '<div id="emailletterletterTime"> </div> <br> Dear <font color="red">[attnInput]</font>,<br><br><p class="tab">My name is <font color="red">[myfirstNameInput] [mylastNameInput]</font>. I learned about your company, <font color="red">[companynameInput]</font>, through <font color="red">[joblead]</font>. I understand you are currently in the process of hiring a <font color="red">[jobnameInput]</font>. I am seeking employment in this area of technology. Based on what I learned from <font color="red">[researchlead]</font>, I see that your company <font color="red">[companydescription]</font>. Your customers <font color="red">[companycustomers]</font>. You are looking for talent who have skills in <font color="red">[myskillarray]</font>. Your organization <font color="red">[companyphilosophy]</font>. <font color="red">[companydistinguish]</font>. This appeals to me, and I would like the opportunity to try out for your team.</p><textarea class="customParagrapInput" id="customemailletterparagraphResumeInput" placeholder="[Enter custom email letter content]"></textarea> <p class="tab" id="customemailletterparagraphResumeOutput"></p><p class="tab"> May I send you my cover letter and resume? I hope it may inspire talking points regarding my eligibility for this position. My confidence, as an applicant, is directed at an entry-level position, but my abilities are perhaps reflective of a mid-level position. I would like to have a conversation about the work culture at <font color="red">[companynameInput]</font> and learn what you, <font color="red">[attnInput]</font>, believe are key ingredients for employee success at your organization.</p><p id="genericemailletterpreset"></p> <br> Respectfully,<br> <div class="signatureSpace"></div><font color="red"> [myfirstNameInput] [mymiddleNameInput] [mylastNameInput]<br> [myEmailInput]</font>';
	
	manuscriptObject.resumeBlank = '<p align="center"> <font color="red">[myfirstNameInput] [mymiddleNameInput] [mylastNameInput]<br> [myAddressInput], [myCityInput], [myStateInput], [myZipInput]<br> [myPhoneInput], [myEmailInput]<br></font><h3 align="center">Resume</h3><hr> </p> <p>I am applying for the  <font color="red">[jobnameInput]</font> position, <font color="red">[jobidInput]</font>, for <font color="red">[companynameInput]</font> in <font color="red">[companycityInput]</font>, <font color="red">[companystateInput]</font>. <textarea class="customParagrapInput" id="customresumeparagraphResumeInput" placeholder="[Enter custom resume content]"></textarea>&nbsp;<i class="tab" id="customresumeparagraphResumeOutput"></i></p><p id="genericresumepreset"></p>';
								
	manuscriptObject.coverletterBlank = '<p></p> <div class="w3-left-align" id="coverletterTime"></div> <br> <font color="red">[attnInput]</font><br> <font color="red">[companynameInput]</font><br> <font color="red">[companyaddressInput]</font><br> <font color="red">[companycityInput]</font>, <font color="red">[companystateInput]</font>, <font color="red">[companyzipInput]</font><br> <br> Dear [attnInput], <p></p><br> <p class="tab">My name is <font color="red">[myfirstNameInput]</font> <font color="red">[mymiddleNameInput]</font> <font color="red">[mylastNameInput]</font>. I am applying for the <font color="red">[jobnameInput]</font> position at <font color="red">[companynameInput]</font>, in <font color="red">[companycityInput]</font>. I possess skills in <font color="red">[myskillarray]</font>. As a <font color="red">[myapplicationidentity]</font>, my abilities include <font color="red">[myabilityarray]</font>, and I <font color="red">[myknowledgearray]</font>. <textarea class="customParagrapInput" id="customcoverletterparagraphResumeInput" placeholder="[Enter custom cover letter content]"></textarea></p> <div class="tab" id="customcoverletterparagraphResumeOutput"></div> <p class="tab" id="genericcoverletterpreset"></p><br> <p>Sincerely,<br></p> <p></p> <div class="signatureSpace"></div><font color="red"> [myfirstNameInput] [mymiddleNameInput] [mylastNameInput]<br> [myAddressInput], [myCityInput], [myStateInput], [myZipInput]<br> [myEmailInput]</font> <p></p>';	
	
	// a backup used for section resets
	manuscriptObject.emailletterFilled = manuscriptObject.emailletterBlank;
	manuscriptObject.resumeFilled = manuscriptObject.resumeBlank;
	manuscriptObject.coverletterFilled = manuscriptObject.coverletterBlank;	
	
	// untouched full blob of text
	genericTechResumeBody = "<br><p><b>Services</b></p><br><p><center><table class='documentFont'><tr><td>Embedded System Analysis</td><td>Debugging &amp; Troubleshooting</td><td>Testing &amp; Documentation</td></tr><tr><td>Software Development</td><td>Requirements Management</td><td>Project Management</td></tr><tr><td>Coding &amp; Scripting</td><td>GUI Design</td><td>Database Design</td></tr></table></center></p><p><br><b>Technology Summary</b></p><br><p><u>Programming</u>: C, C ++, C#, XML, CSV, SVG, MySQL, MSSql, HTML, VB.Net, ASP.NET, ADO.NET, LINQ, Java, JavaScript, CSS, and PHP</p><p><u>Development Tools</u>: MS Visual Studio 2012, MS Sql Server Management Studio, MySql Workbench, WAMP Server, Oracle NetBeans IDE, Notepad ++, Inkscape and Sketchup (CAD), MS Office Suite (Access, Word, Excel, PowerPoint, and Visio)</p><p><u>Systems</u>: Windows, Dot NET</p><p><br><b>Education</b></p><br><p><u>Gannon University Erie, PA | B.S. Electrical/Computer Engineering, 2006</u><br>Electrical Engineering, Computer Engineering, Embedded Systems<br>Published Scientific Journal on Artificial Intelligence</p><p></p><p><br><u>TCC, Tallahassee, FL | (Continued Education) Environmental Science, 2014</u><br>Environmental Systems, Plant Biology, Environmental Law/Regulations</p><br><p><u>Gannon University Erie, PA | (Masters Schooling) Information Analytics, 2015</u><br>Database Management, Requirements for Software Systems</p><p><br><b>Professional Experience</b></p><p><br><u>Independent Green Technologies (IGT) - Tallahassee, FL</u><br>CAD Specialist, 2014</p><p>My responsibility in the company focused on using computer aided design (CAD) tools to model price and cost projections for large-scale commercial organizations and residential stakeholders. The models were used to appraise and simulate design efficiency and feasibility to construct.</p><p><br><u>United States Coast Guard Cutter Mustang (WPB 1310) - Seward, AK</u><br>Machinery Technician, 2011-2013</p><p>As a member of a ship's engineering staff, I took the initiative to enhance our machinery related catalog and inventory database. Because of this initiative, enhancements were implemented service wide on that ship class. I used MS Access to develop a parts inventory catalog for EATON/Aeroquip brand high pressure hoses. This application was used to manage the preventative maintenance schedule, parts and pricing, and for ordering replacements for worn or damaged equipment and accessory parts.</p><p><br><u>Coast Guard Station Venice - Venice, LA</u><br>Search and Rescue, Boarding Officer, 2008-2011</p><p>In conjunction with search and rescue response duties, I developed a computer application to enhance safety and productivity. I used my computer technology skills to develop an HTML, CSS and RSS feed based application to gather weather, sea state and tidal information to assist in risk assessment for boats deploying in search and rescue operations.</p>";

	genericCoverletter = "<p class='tab'>I am seeking to diversify my technology portfolio and develop a career as a computer programmer. I have developed a variety of program applications which perform tasks directed at social networking, GPS, weather, document preparation, databases, audio processing, telecommunications networking, and agriculture. I have labor, retail, mechanic, and legal employment experience and graduate school leadership in databases and robotics. I posses  the adaptability to apply the skills needed to work as a<font color='red'> [jobnameInput] </font> within<font color='red'> [companynameInput]</font>.</p><p class='tab'>Within the last year I have developed the following technology applications: a plant identification and imaging identification application, a Windows 8-10 tablet satellite global positioning system without wi-fi app, and an interactive tablet e-Book with an independent serve library database and  A web conferencing app. These projects were an opportunity to express my understanding and ability to perform a variety of different philosophical approaches, intellectual processes, and techniques which have value in a variety of technical markets.</p><p class='tab'>The Plant Identification and Imaging Identification Assistant is a Windows OS application that performs comprehensive plant identification that is based upon human observations and traits of a plant specimen. The plant identification algorithm is based on a dichotomous key that associates genetic taxonomy and leaf shape morphology. The functionality of this application is dependent on both a camera image input and a person's sense of sight and feel. I used the following skills in developing my plant identification application: C#, Sql, MySql Database, plant biology taxonomy, image detection, EmguCV, front-end/back-end software development, and user interface design.</p><p class='tab'>The tablet global positioning system app I developed is a cross-platform mobile device which inputs GPS signals from a USB COM port and displays the users current position, altitude, and speed. This application is not dependent on Internet signals. There is an additional celestial navigation modular component feature which is  currently under construction, which will be added as a plugin. Development of my GPS application skills includes: HTML, JavaScript, serial COM Port interface, object oriented VB.Net, and GPS serial string parsing.</p><p class='tab'>The interactive tablet E-Book, book library database,  web conferencing app is a social prayer/meditation application which serves as an e-book library, LAN chat room and forum, interactive touch screen tablet, and teleconferencing tool. This device is plug and play, provided that a dedicated server is actively online on a shared network. Multiple users can log in and out in a shared event experience and influence each others' experience by changing the environment content. This App uses  ASP/WCF, C#, MySql, ADO.Net, Networked Conferencing, chat room techniques, E-Book, Database, TCP/IP, front-end/back-end development, language localization, and plug and play networking.</p><p class='tab'><font color='red'>[attnInput] </font>, thank you for taking the time to read and consider my cover letter for employment with [companynameInput]. I have multiple technical skills an diverse work experiences that will integrate well within your organization and its business culture. I welcome the opportunity to discuss your observations and my prospects of joining your organization and making an immediate contribution to your productivity.</p>";
	
	
	prewrittenDocumentObject.resume = genericTechResumeBody;
	prewrittenDocumentObject.coverletter = genericCoverletter;
	
	//initialize dropboxes
	var dropbox1 = document.getElementById('templateLayoutDropdown');
	dropbox1.options[dropbox1.selectedIndex].value = 1; //default to basic
	
	var dropbox2 = document.getElementById('leadDropdownSelect');
	dropbox2.options[dropbox2.selectedIndex].value = 4; //default to online job lead
	
	document.getElementById('logContainer').innerHTML = getSession('sessonsaveLogVar'); //pull log from browser memory
	//check the log div to prevent empty-cells
	initlogVar = document.getElementById('logContainer').innerHTML;
	if (initlogVar.length === 0) {
		initlogVar = "<table class='logBorders'> <tr><th>jobName</th> <th>jobId</th><th>full/part</th> <th>company</th><th>address</th> <th>city</th><th>state</th><th>zip</th> <th>website</th> <th>Attn:</th><th>email</th><th>phone</th> <th>lead</th> <th>date</th></tr></table>";
		document.getElementById('logContainer').innerHTML = initlogVar;
		setSession(initlogVar);
	}
}

function hilightRendering(inputObject, filledText) {
	// Highlight changes made to Personal contact Information on template
	
	'use strict';
	
	var myArr, argStr, i, inner, index, replaceVar;
	
	inner = filledText;
	myArr = Object.keys(inputObject).map(function (key) {return inputObject[key]; }); //convert object to array
		
	for (i = 0; i < myArr.length; i += 1) {
		
		//higlight selected words from Object
		argStr = myArr[i];
		if (argStr.length > 1) {
			replaceVar = new RegExp(argStr, "g");		
			inner = inner.replace(replaceVar, '<span class="highlightChange">' + argStr + '</span>' );
		}
	}
	
	return inner;
}

/* ******************************* */
/* My Persona Info                 */
/* ******************************* */

function inputmycontactInfo(mycontactObject, longString) {
	// job my contact input to resume and cover letter template Regex gi
	'use strict';
	var replaceText;
	
	replaceText = longString.replace(/\[myfirstNameInput\]/gi, mycontactObject.firstName);
	longString = replaceText;
	replaceText = longString.replace(/\[mymiddleNameInput\]/gi, mycontactObject.middleName);
	longString = replaceText;
	replaceText = longString.replace(/\[mylastNameInput\]/gi, mycontactObject.lastName);
	longString = replaceText;
	replaceText = longString.replace(/\[myAddressInput\]/gi, mycontactObject.Address);
	longString = replaceText;
	replaceText = longString.replace(/\[myCityInput\]/gi, mycontactObject.City);
	longString = replaceText;
	replaceText = longString.replace(/\[myStateInput\]/gi, mycontactObject.State);
	longString = replaceText;
	replaceText = longString.replace(/\[myZipInput\]/gi, mycontactObject.Zip);
	longString = replaceText;
	replaceText = longString.replace(/\[myPhoneInput\]/gi, mycontactObject.Phone);
	longString = replaceText;
	replaceText = longString.replace(/\[myEmailInput\]/gi, mycontactObject.Email);
	longString = replaceText;
	replaceText = longString.replace(/\[myUrllInput\]/gi, mycontactObject.myUrl);
	longString = replaceText;
	
	return longString;
}

function mycontactInfo(mycontactObject, manuscriptObject) {
	'use strict';

	// Define Variables
	mycontactObject.firstName = document.getElementById("myfirstNameInput").value;
	mycontactObject.middleName = document.getElementById("mymiddleNameInput").value;
	mycontactObject.lastName = document.getElementById("mylastNameInput").value;
	mycontactObject.Address = document.getElementById("myAddressInput").value;
	mycontactObject.City = document.getElementById("myCityInput").value;
	mycontactObject.State = document.getElementById("myStateInput").value;
	mycontactObject.Zip = document.getElementById("myZipInput").value;
	mycontactObject.Phone = document.getElementById("myPhoneInput").value;
	mycontactObject.Email = document.getElementById("myEmailInput").value;
	mycontactObject.myUrl = document.getElementById("myUrllInput").value;

	//inject words into filled template
	manuscriptObject.emailletterFilled = inputmycontactInfo(mycontactObject, manuscriptObject.emailletterFilled);	
	manuscriptObject.resumeFilled = inputmycontactInfo(mycontactObject, manuscriptObject.resumeFilled);
	manuscriptObject.coverletterFilled = inputmycontactInfo(mycontactObject, manuscriptObject.coverletterFilled);
}

/* ******************************* */
/* Job Opening                     */
/* ******************************* */

function inputCompanyInfo(companyInfoObject, longString) {
	// job Company input to resume and cover letter template
	'use strict';
	
	var replaceText;
	
	replaceText = longString.replace(/\[jobnameInput\]/gi, companyInfoObject.jobname);
	longString = replaceText;
	replaceText = longString.replace(/\[jobidInput\]/gi, companyInfoObject.jobid);
	longString = replaceText;
	replaceText = longString.replace(/\[fulltimeInput\]/gi, companyInfoObject.jobfulltime);
	longString = replaceText;
	replaceText = longString.replace(/\[companynameInput\]/gi, companyInfoObject.name);
	longString = replaceText;
	replaceText = longString.replace(/\[companyaddressInput\]/gi, companyInfoObject.address);
	longString = replaceText;
	replaceText = longString.replace(/\[companycityInput\]/gi, companyInfoObject.city);
	longString = replaceText;
	replaceText = longString.replace(/\[companystateInput\]/gi, companyInfoObject.state);
	longString = replaceText;
	replaceText = longString.replace(/\[companyzipInput\]/gi, companyInfoObject.zip);
	longString = replaceText;
	replaceText = longString.replace(/\[websiteInput\]/gi, companyInfoObject.website);
	longString = replaceText;
	replaceText = longString.replace(/\[attnInput\]/gi, companyInfoObject.attn);
	longString = replaceText;
	replaceText = longString.replace(/\[attnemailInput\]/gi, companyInfoObject.attnemail);
	longString = replaceText;
	replaceText = longString.replace(/\[attphoneInput\]/gi, companyInfoObject.phone);
	longString = replaceText;	
	
	return longString;
}

function companyInfo(companyInfoObject, manuscriptObject, prewrittenDocumentObject) {
	// job opening input to resume and cover letter template
	'use strict';
	
	// Define Variables
	companyInfoObject.jobname = document.getElementById("jobnameInput").value;
	companyInfoObject.jobid = document.getElementById("jobidInput").value;
	companyInfoObject.jobfulltime = document.getElementById("fulltimeInput").value;
	companyInfoObject.name = document.getElementById("companynameInput").value;
	companyInfoObject.address = document.getElementById("companyaddressInput").value;
	companyInfoObject.city = document.getElementById("companycityInput").value;
	companyInfoObject.state = document.getElementById("companystateInput").value;
	companyInfoObject.zip = document.getElementById("companyzipInput").value;
	companyInfoObject.website = document.getElementById("websiteInput").value;
	companyInfoObject.attn = document.getElementById("attnInput").value;
	companyInfoObject.attnemail = document.getElementById("attnemailInput").value;
	companyInfoObject.phone = document.getElementById("attphoneInput").value;
	companyInfoObject.situation = document.getElementById("attsituationsettingInput").value;
	
	//blank entry catch
	if (companyInfoObject.jobid === '') {
		companyInfoObject.jobid = " posted on " + companyInfoObject.situation;
		document.getElementById("jobidInput").value = companyInfoObject.jobid;
	}
	
	if (companyInfoObject.attn === '') {
		companyInfoObject.attn = companyInfoObject.name;
		document.getElementById("attnInput").value = companyInfoObject.attn;
	}
	
	//inject words into filled template
	manuscriptObject.emailletterFilled = inputCompanyInfo(companyInfoObject, manuscriptObject.emailletterFilled);
	
	manuscriptObject.resumeFilled = inputCompanyInfo(companyInfoObject, manuscriptObject.resumeFilled);
	
	prewrittenDocumentObject.coverletter = inputCompanyInfo(companyInfoObject, prewrittenDocumentObject.coverletter);
	manuscriptObject.coverletterFilled = inputCompanyInfo(companyInfoObject, manuscriptObject.coverletterFilled);
}

/* ******************************* */
/* Industry Theme Paragraph Inputs */
/* ******************************* */

function inputIndustryInfo(industryThemesObject, longString) {
	// job Company input to resume and cover letter template
	'use strict';
	var replaceText;
	replaceText = longString.replace(/\[companydescription\]/gi, industryThemesObject.companydescription);
	longString = replaceText;
	replaceText = longString.replace(/\[companyphilosophy\]/gi, industryThemesObject.companyphilosophy);
	longString = replaceText;
	replaceText = longString.replace(/\[companycustomers\]/gi, industryThemesObject.companycustomers);
	longString = replaceText;
	replaceText = longString.replace(/\[companydistinguish\]/gi, industryThemesObject.companydistinguish);
	longString = replaceText;
	return longString;
}

function industryThemes(industryThemesObject, manuscriptObject) {
	'use strict';
	var templateID, tempLongString, i;
	
	// Define Variables
	industryThemesObject.companydescription = document.getElementById("companyDescriptionInput").value;
	industryThemesObject.companyphilosophy = document.getElementById("companyPhilosophyInput").value;
	industryThemesObject.companycustomers = document.getElementById("companyCustomersInput").value;
	industryThemesObject.companydistinguish = document.getElementById("companyDistinguishInput").value;
	
	//inject words into filled template
	manuscriptObject.emailletterFilled = inputIndustryInfo(industryThemesObject, manuscriptObject.emailletterFilled);	
	manuscriptObject.resumeFilled = inputIndustryInfo(industryThemesObject, manuscriptObject.resumeFilled);
	
	genericCoverletter = inputCompanyInfo(manuscriptObject, genericCoverletter);
	manuscriptObject.coverletterFilled = inputIndustryInfo(industryThemesObject, manuscriptObject.coverletterFilled);
}

/* ******************************* */
/* Position Info Paragraph Inputs  */
/* ******************************* */

function whatIofferInfo(whatIofferObject, longString) {
	// job Company input to resume and cover letter template
	'use strict';
	var replaceText;
	replaceText = longString.replace(/\[myapplicationidentity\]/gi, whatIofferObject.applicationidentity);
	longString = replaceText;
	replaceText = longString.replace(/\[myskillarray\]/gi, whatIofferObject.skillarray);
	longString = replaceText;
	replaceText = longString.replace(/\[myknowledgearray\]/gi, whatIofferObject.knowledgearray);
	longString = replaceText;
	replaceText = longString.replace(/\[myabilityarray\]/gi, whatIofferObject.abilityarray);
	longString = replaceText;
	return longString;
}

function whatIoffer(whatIofferObject, manuscriptObject) {
	// job opening input to resume and cover letter template
	'use strict';
	var templateID, tempLongString, i;
	// Define Variables	
	
	whatIofferObject.applicationidentity = document.getElementById("myapplicationidentity").value;
	whatIofferObject.skillarray = document.getElementById("myskillarray").value;
	whatIofferObject.knowledgearray = document.getElementById("myknowledgearray").value;
	whatIofferObject.abilityarray = document.getElementById("myabilityarray").value;
	
	//inject words into filled template
	manuscriptObject.emailletterFilled = whatIofferInfo(whatIofferObject, manuscriptObject.emailletterFilled);	
	manuscriptObject.resumeFilled = whatIofferInfo(whatIofferObject, manuscriptObject.resumeFilled);
	
	genericCoverletter = inputCompanyInfo(whatIofferObject, genericCoverletter);
	manuscriptObject.coverletterFilled = whatIofferInfo(whatIofferObject, manuscriptObject.coverletterFilled);
}

/* ******************************* */
/* Paragraph Input                 */
/* ******************************* */

function paragraphInput(previewWriteInTextareaObject) {
	'use strict';
	// take out of textarea before everthing is farced
	
	var email, resume, letter;
	
	email = document.getElementById("customemailletterparagraphResumeInput").value;
	resume = document.getElementById("customresumeparagraphResumeInput").value;
	letter = document.getElementById("customcoverletterparagraphResumeInput").value;
	
	if (email.length > 0) {previewWriteInTextareaObject.emailletter = email;}
	if (resume.length > 0) {previewWriteInTextareaObject.resume = resume;}
	if (letter.length > 0) {previewWriteInTextareaObject.coverletter = letter;}
	
}

function paragraphOutput(previewWriteInTextareaObject) {
	'use strict';
	// put paragrapg into tag after the parcing
	var email, resume, letter;
	
	email = document.getElementById("customemailletterparagraphResumeOutput");
	resume = document.getElementById("customresumeparagraphResumeOutput");
	letter = document.getElementById("customcoverletterparagraphResumeOutput");
	
	if (previewWriteInTextareaObject.emailletter.length > 0) {email.innerHTML = previewWriteInTextareaObject.emailletter;}
	if (previewWriteInTextareaObject.resume.length > 0) {resume.innerHTML = previewWriteInTextareaObject.resume;}
	if (previewWriteInTextareaObject.coverletter.length > 0) {letter.innerHTML = previewWriteInTextareaObject.coverletter;}
}

function removecolorandhighlightformat(divContents) {
	//filter and replace html for final html rendering
	'use strict';
	var replaceText;
	
	replaceText = divContents.replace(/\<font color=\"red\"\>/gi, '');
	divContents = replaceText;
	replaceText = divContents.replace(/\<\/font\>/gi, '');
	divContents = replaceText;
	replaceText = divContents.replace(/\<span class=\"highlightChange\"\>/gi, '');
	divContents = replaceText;
	replaceText = divContents.replace(/\<\/span\>/gi, '');
	divContents = replaceText;
	replaceText = divContents.replace(/\s\s+/g, ''); //remove mutiple spaces, Regex
	divContents = replaceText;
	replaceText = divContents.replace(" .", '.');
	divContents = replaceText;
	replaceText = divContents.replace("..", '.');
	divContents = replaceText;
	replaceText = divContents.replace(/\<textarea class=\"customParagrapInput\" id=\"customresumeparagraphResumeInput\" placeholder=\"\[Enter custom resume content\]\"\>/gi, '');
	divContents = replaceText;
	replaceText = divContents.replace(/\<textarea class=\"customParagrapInput\" id="customcoverletterparagraphResumeInput\" placeholder=\"\[Enter custom cover letter content\]\"\>/gi, '');
	divContents = replaceText;
	replaceText = divContents.replace(/\<textarea class=\"customParagrapInput\" id=\"customemailletterparagraphResumeInput\" placeholder=\"\[Enter custom email letter content\]\"\>/gi, '');
	divContents = replaceText;
	replaceText = divContents.replace(/\<\/textarea\>/gi, '');
	divContents = replaceText;
	
	return replaceText;
}

//refresh after a button is pressed or re-presses
function postingButton(mycontactObject, companyInfoObject, industryThemesObject, whatIofferObject, previewWriteInTextareaObject, manuscriptObject, prewrittenDocumentObject, highlightcategory) {

	// resumeTemplateFlags is a global
	//paragraphInput(previewWriteInTextareaObject);
	
	if (resumeTemplateFlags.mycontactFlag === true) {
		paragraphInput(previewWriteInTextareaObject);
		mycontactInfo(mycontactObject, manuscriptObject, prewrittenDocumentObject);
		paragraphOutput(previewWriteInTextareaObject);
	}
	
	if (resumeTemplateFlags.companyFlag === true) {
		paragraphInput(previewWriteInTextareaObject);
		companyInfo(companyInfoObject, manuscriptObject, prewrittenDocumentObject);
		paragraphOutput(previewWriteInTextareaObject);
	}
	
	if (resumeTemplateFlags.industryFlag === true) {
		paragraphInput(previewWriteInTextareaObject);
		industryThemes(industryThemesObject, manuscriptObject, prewrittenDocumentObject);
		paragraphOutput(previewWriteInTextareaObject);
	}
	
	if (resumeTemplateFlags.whatIofferFlag === true) {
		paragraphInput(previewWriteInTextareaObject);
		whatIoffer(whatIofferObject, manuscriptObject, prewrittenDocumentObject);
		paragraphOutput(previewWriteInTextareaObject);
	}
	
	switch (highlightcategory) {
		case 1:
			document.getElementById("emailletterTemplate").innerHTML = hilightRendering(mycontactObject, manuscriptObject.emailletterFilled);
			document.getElementById("resumeTemplate").innerHTML = hilightRendering(mycontactObject, manuscriptObject.resumeFilled);
			document.getElementById("coverletterTemplate").innerHTML = hilightRendering(mycontactObject, manuscriptObject.coverletterFilled);
		break;
		
		case 2:
			document.getElementById("emailletterTemplate").innerHTML = hilightRendering(companyInfoObject, manuscriptObject.emailletterFilled);
			document.getElementById("resumeTemplate").innerHTML = hilightRendering(companyInfoObject, manuscriptObject.resumeFilled);
			document.getElementById("coverletterTemplate").innerHTML = hilightRendering(companyInfoObject, manuscriptObject.coverletterFilled);
		break;
		
		case 3:
			document.getElementById("emailletterTemplate").innerHTML = hilightRendering(industryThemesObject, manuscriptObject.emailletterFilled);
			document.getElementById("resumeTemplate").innerHTML = hilightRendering(industryThemesObject, manuscriptObject.resumeFilled);
			document.getElementById("coverletterTemplate").innerHTML = hilightRendering(industryThemesObject, manuscriptObject.coverletterFilled);
		break;
		
		case 4:
			document.getElementById("emailletterTemplate").innerHTML = hilightRendering(whatIofferObject, manuscriptObject.emailletterFilled);
			document.getElementById("resumeTemplate").innerHTML = hilightRendering(whatIofferObject, manuscriptObject.resumeFilled);
			document.getElementById("coverletterTemplate").innerHTML = hilightRendering(whatIofferObject, manuscriptObject.coverletterFilled);
		break;
		
		default:
	}
	paragraphOutput(previewWriteInTextareaObject);
	basicTemplate(prewrittenDocumentObject);
	
}

/* ******************************* */
/* Clear Button                    */
/* ******************************* */

function clearinputfields(selectedDiv) {
	'use strict';
	var parent_div, input_elements, textarea_elements, elem, i;
	
	parent_div = document.getElementById(selectedDiv);
	input_elements = parent_div.getElementsByTagName('input');
	textarea_elements = parent_div.getElementsByTagName('textarea');
	elem = input_elements;
	for (i = 0; i < elem.length; i += 1) {
		elem[i].value = '';
	}
	elem = textarea_elements;
	for (i = 0; i < elem.length; i += 1) {
		elem[i].value = '';
	}
	
	resumeTemplateFlags.mycontactFlag = false;
	resumeTemplateFlags.companyFlag = false;
	resumeTemplateFlags.industryFlag = false;
	resumeTemplateFlags.whatIofferFlag = false;
	resumeTemplateFlags.templatetypeFlag = false;
	resumeTemplateFlags.emaillettertypeFlag = false;
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
	
	textToWrite = inputHtm.replace(/\s\s+/g, ''); //remove mutiple spaces, this is Extra Overkill, but it is just housekeeping
	desiredFileName = desiredFileName.replace(',', ' '); //remove coma from date
	
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

function finishHtmlFile(companyInfoObject, prewrittenDocumentObject, dateCreated, fontSize, divtagBlob) {
	'use strict';
	
	var outputHtmlscript, formattingstyle, docOutHtml, fileName, fontSize, i, favicon, filenameType;
	
	// email letter final	
	docOutHtml = document.getElementById(divtagBlob).innerHTML;
	
	outputHtmlscript = docOutHtml;

	for (i = 0; i < 15; i += 1) {
		//flesh out decorative formatting
		outputHtmlscript = removecolorandhighlightformat(outputHtmlscript);
	}
		
	switch (divtagBlob) {
		case 'resumeTemplate':
			formattingstyle = "<style> .tab { text-indent: 40px; } table, tr, th, td {text-align: center;} table {width: 100%;} .signatureSpace {border: 0; height: 30px;} .resumeTitleBorder {border-bottom: solid;border-width: 1px;} p { margin:0; }.documentFont {font: " + fontSize + " tahoma;} </style>";
			
			if (resumeTemplateFlags.templatetypeFlag === true) {
				outputHtmlscript = outputHtmlscript + prewrittenDocumentObject.resume;
			}

			filenameType = "Resume";
			favicon = '<link rel="icon" href="http://paulferrett.com/fontawesome-favicon/generate.php?icon=file-text-o&fg=222" type="image/x-icon">';

			break;
		case 'coverletterTemplate':
			formattingstyle = "<style> .tab { text-indent: 40px; } table, tr, th, td {text-align: center;} table {width: 100%;} .signatureSpace {border: 0; height: 30px;} .resumeTitleBorder {border-bottom: solid;border-width: 1px;} p { margin:0; }.documentFont {font: " + fontSize + " tahoma;} </style>";

			filenameType = "CoverLetter";
			favicon = '<link rel="icon" href="http://paulferrett.com/fontawesome-favicon/generate.php?icon=file-text-o&fg=222" type="image/x-icon">';
			break;
		case 'emailletterTemplate':
			formattingstyle = "<style> .tab { text-indent: 40px; } table, tr, th, td {text-align: center;} table {width: 100%;} .signatureSpace {border: 0; height: 30px;} .resumeTitleBorder {border-bottom: solid;border-width: 1px;} p { margin:0; }.documentFont {font: " + fontSize + " tahoma;} </style>";

			filenameType = "EmailLetter";
			favicon = '<link rel="icon" href="http://paulferrett.com/fontawesome-favicon/generate.php?icon=envelope-o&fg=222" type="image/x-icon">';

			break;
		default:
			formattingstyle = "<style> .tab { text-indent: 40px; } table, tr, th, td {text-align: center;} table {width: 100%;} .signatureSpace {border: 0; height: 30px;} .resumeTitleBorder {border-bottom: solid;border-width: 1px;} p { margin:0; }.documentFont {font: " + fontSize + " tahoma;} </style>";
			
			filenameType = "";
			favicon = '<link rel="icon" href="http://paulferrett.com/fontawesome-favicon/generate.php?icon=file-text-o&fg=222" type="image/x-icon">';
	}
	
	
	
	
	
	outputHtmlscript = "<html class='documentFont'><head>" + favicon + formattingstyle + "</head><body>" + outputHtmlscript + "</body></html>";	
	fileName = companyInfoObject.jobid + "-" + companyInfoObject.name + "-" + dateCreated + "_" + filenameType + "(Michael Jerome Todd)";	
	saveHtmlAsFile(outputHtmlscript, fileName);
}

function finishingOutput(companyInfoObject, prewrittenDocumentObject, dateCreated) {
	'use strict';
	
	var divtagBlob, fontSize;
	
	//resume
	divtagBlob = "resumeTemplate";
	fontSize = '13px'; // i always want the resume clear and readable
	finishHtmlFile(companyInfoObject, prewrittenDocumentObject, dateCreated, fontSize, divtagBlob);
	
	//cover letter
	divtagBlob = "coverletterTemplate";
	fontSize = '14px';
	finishHtmlFile(companyInfoObject, prewrittenDocumentObject, dateCreated, fontSize, divtagBlob);
	
	//email letter
	divtagBlob = "emailletterTemplate";
	fontSize = '15px'; // i always want the resume clear and readable
	finishHtmlFile(companyInfoObject, prewrittenDocumentObject, dateCreated, fontSize, divtagBlob);
}

/* ******************************* */
/* Make Application Log            */
/* ******************************* */

function temporaryLogHtmlRecord(existingRecordLog, dateCreated, recordArray) {
	//this is used to display a cleaner table form of the log record	
	var i, tdRecord, tableOut;
	
	for (i = 0; i < 20; i += 1) {
		existingRecordLog = existingRecordLog.replace('<table class="logBorders">', ''); //remove <table> for css formatting
		existingRecordLog = existingRecordLog.replace('</table>', ''); //remove </table> for css formatting
	}
	
	tdRecord = "<tr class='logBorders'>";	
	for (i = 0; i < recordArray.length; i += 1) {
		tdRecord += "<td>" + recordArray[i] + "</td>";
	}
	tableOut = '<table class="logBorders">' + existingRecordLog + tdRecord + '<td>' + dateCreated + '</td></tr></table>';
	
	//store in browser so i dont loose data on refresh
	setSession(tableOut);
	
	return tableOut;
}

function displayLog(companyInfoObject, dateCreated) {
	'use strict';
	var newRecord, recordArray, i, tableFormatting, existingRecordLog;
	
	dateCreated = dateCreated.replace(",", '_'); //remove comma from time css formatting
	recordArray = Object.keys(companyInfoObject).map(function (key) {return companyInfoObject[key]; }); //convert object to array	

	//display output in DOM
	existingRecordLog = document.getElementById('logContainer').innerHTML;
	tableFormatting = temporaryLogHtmlRecord(existingRecordLog, dateCreated, recordArray);
	document.getElementById('logContainer').innerHTML = tableFormatting;
	
	//Update the table array for CSV print later
	recordArray = recordArray + '\n';
	
	//csvLogArr = recordArray;
}

function logLoadFile(filePath) {
	'use strict';
	var newRecord, output;
	output = "";
	reader.onload = function (e) {
		output = e.target.result;
		document.getElementById('logContainer').innerHTML += output;
		
	}; //end onload()
	reader.readAsText(filePath.files[0]);
}

function saveLogAsCsv(csvLogArr, desiredFileName) {
	'use strict';
	/* https://jsfiddle.net/nekyouto/gokpfr00/ */
	var fileNameToSaveAs, downloadLink, textFileAsBlob, textToWrite, loopcount;
	
	textToWrite = csvLogArr; //the long html string to save
	
	//Check if browser supports Blob
	if (window.Blob) {
		textFileAsBlob = new Blob([textToWrite], { type: "text/csv;charset=utf-8;" });
		
		//Need to specify the filename that we are going to set here
		fileNameToSaveAs = desiredFileName + '.csv';
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
			//downloadLink.click();
		}		
	} else {
		/* Error/Solution Catch: used for IE8 */
		//saveContents(textToWrite);
	}
}

function openInNewTab(url) {
	var win = window.open(url, '_blank')
	win.focus();
}

/* ******************************* */
/* GUI Animations Events           */
/* ******************************* */

function toggleTabContainer(evt, tabidName) {
	'use strict';
	var i, x, tablinks, toggleState;

	x = document.getElementsByClassName("ApplicationTabContainer");
	toggleState = document.getElementById(tabidName).style.display;

	if (toggleState === "none") {
		for (i = 0; i < x.length; i += 1) {
			x[i].style.display = "none"; //close all tabs
		}

		tablinks = document.getElementsByClassName("tablink");
		for (i = 0; i < x.length; i += 1) {
			tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
		}

		document.getElementById(tabidName).style.display = "block"; //display the selected tab
		evt.currentTarget.firstElementChild.className += " w3-border-red";
	} else {

		for (i = 0; i < x.length; i += 1) {
			x[i].style.display = "none";
		}

		tablinks = document.getElementsByClassName("tablink");
		for (i = 0; i < x.length; i += 1) {
			tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
		}

		document.getElementById(tabidName).style.display = "close";
		evt.currentTarget.firstElementChild.className += " w3-border-gainsboro";
	}
}

// Accordions
function myAccFunc(id) {
	'use strict';
	var x = document.getElementById(id);

	if (x.className.indexOf(" w3-show") === -1) {
		x.className += " w3-show";
	} else {
		x.className = x.className.replace(" w3-show", "");
	}
}

function forcecloseAccordion(id) {
	var x = document.getElementById(id);
	
	if (x.className.indexOf(" w3-show") !== -1) {
		x.className = x.className.replace(" w3-show", "");
	}
}

function forcecloseTabs(id) {
'use strict';
	var i, x;

	x = document.getElementsByClassName("ApplicationTabContainer");

	for (i = 0; i < x.length; i += 1) {
		x[i].style.display = "none"; //close all tabs
	}
}

function minimizeAll() {

	forcecloseAccordion('emailletterAcc');
	forcecloseAccordion('resumeAcc');
	forcecloseAccordion('coverletterAcc');
	forcecloseAccordion('logAcc');
	
	forcecloseTabs('companyTab');
	forcecloseTabs('industryTab');
	forcecloseTabs('desirabiltyTab');
}
/* ******************************* */
/* Session Browser Storage         */
/* ******************************* */

function setSession(tableStr) {
	sessionStorage.setItem('sessonsaveLogVar', tableStr);
}

function getSession(sessionVar) {
	var data = sessionStorage.getItem(sessionVar);
	return data;
}

function removeSession(sessionVar) {
	sessionStorage.removeItem(sessionVar);
}

function clearSession() {
	sessionStorage.clear();
}

function alertDiv() {
	//flag if something is missing
	//confirm what is not missing
	'use strict';
	var outputString = '';
	var buttonFormat = '';
	var terminalScreen = document.getElementById('fade');
	var building = '<i class="fa fa-building-o"> </i>',
	briefcase = '<i class="fa fa-briefcase"> </i>',
	diamond = '<i class="fa fa-diamond"> </i>',
	pencil = '<i class="fa fa-pencil"> </i>',
	handshake = '<i class="fa fa-handshake-o"> </i> ',
	paperclip = '<i class="fa fa-paperclip"> </i>',
	fax = '<i class="fa fa-fax"> </i>';
	
	terminalScreen.innerHTML = outputString; //reset error msg.
	
	if (resumeTemplateFlags.mycontactFlag === false) { outputString += '<p style="color:red;">' + fax + ' My Contact: Info button was not entered ' + pencil + '</p>';  } else { outputString += '<p style="color:lime;">' + fax + ' My Contact: Input button was pressed ' + pencil + '</p>'; }
	if (resumeTemplateFlags.companyFlag === false) {outputString += '<p style="color:red;">' + building + ' Company Info.: Info button was not entered ' + pencil + '</p>'; } else {outputString += '<p style="color:lime;">' + building + ' Company Info.: Input button is pressed ' + pencil + '</p>'; }
	if (resumeTemplateFlags.industryFlag === false) {outputString += '<p style="color:red;">' + briefcase + ' Industry Info.: Info button was not entered ' + pencil + '</p>'; } else {outputString += '<p style="color:lime;">' + briefcase + ' Industry Info.: Input button is pressed ' + pencil + '</p>'; }
	if (resumeTemplateFlags.whatIofferFlag === false) {outputString += '<p style="color:red;">' + diamond + ' Desirability Info.: Info button was not entered ' + pencil + '</p>'; } else {outputString += '<p style="color:lime;">' + diamond + ' Desirability Info.: Input button is pressed ' + pencil + '</p>'; }
	
	if (resumeTemplateFlags.templatetypeFlag === false) {outputString += '<p style="color:red;"> ' + handshake + ' Template Dropdown: A dropdown resume template was not selected ' + handshake + '</p>'; } else {outputString += '<p style="color:lime;">' + handshake + ' Template Dropdown: A resume template dropdown is selected ' + handshake + '</p>'; }
	
	if (resumeTemplateFlags.emaillettertypeFlag === false) { outputString += '<p style="color:red;">' + paperclip + ' Email Dropdown: A dropdown email subject was not selected ' + paperclip + '</p>';  } else { outputString += '<p style="color:lime;">' + paperclip + ' Email Dropdown: Email letter dropdown topic is selected ' + paperclip + '</p>';  }
	
	terminalScreen.style.display='block';

	buttonFormat = "<hr><button class='w3-btn w3-red roundedCorners'";
	buttonFormat += 'onclick=document.getElementById("fade").style.display="none">';
	buttonFormat += "<i class='fa fa-window-close' style='font-size:16px;color:white;'> </i> Close</button><br><br>";

	terminalScreen.innerHTML = "<h2 style='color:white;'>List of mandatory inputs:</h2>" + outputString + buttonFormat;
}

/* ******************************* */
/* Onload main()                   */
/* ******************************* */

window.onload = function () {
	'use strict';
	
	// div contents
	var manuscriptObject = {emailletterFilled: "", emailletterBlank: "", resumeFilled: "", resumeBlank: "", coverletterFilled: "", coverletterBlank: ""};
	var prewrittenDocumentObject = {resume: "", coverletter: ""};
	
	//declare objects contining variables
	var mycontactObject = {firstName: "", middleName: "", lastName: "", Address: "", City: "", State: "", Zip: "", Phone: "", Email: "", myUrl: ""};
	var companyInfoObject = {jobname: "", jobid: "", jobfulltime: "", name: "", address: "", city: "", state: "", zip: "", website: "", attn: "", attnemail: "", phone:"", situation:""};
	var industryThemesObject = {companydescription: "", companyphilosophy: "", companycustomers: "", companydistinguish: "" };
	var whatIofferObject = {applicationidentity: "", skillarray: "", knowledgearray: "", abilityarray: ""};
	var previewWriteInTextareaObject = {emailletter: "", resume: "", coverletter: ""};
	var i;
	var sel = document.getElementById('templateLayoutDropdown');
	
	sel.selectedIndex = 0; // reset Template Layout Dropdown
	
	// initialize variables
	initializeBrowser(manuscriptObject, prewrittenDocumentObject); //initial presets
	
	//Display blank ready-to-go adlib DOM
	document.getElementById("emailletterTemplate").innerHTML = manuscriptObject.emailletterBlank;
	document.getElementById("resumeTemplate").innerHTML = manuscriptObject.resumeBlank;
	document.getElementById("coverletterTemplate").innerHTML = manuscriptObject.coverletterBlank;
	
	//time display
	displayfullTime('nowTime'); //perpetual elaborate clock
	displayformalTime('emailletterletterTime'); //update only on reload, simple
	displayformalTime('coverletterTime'); //update only on reload, simple
	
	document.getElementById("lightSplash").onclick = function () {
		hide();
	};

	/* ******************************* */
	/* onmouseover                     */
	/* ******************************* */
	
	document.getElementById("myurlLink").onmouseover = function () {
		//moseover even to myUrlLink
		var url = document.getElementById("myUrllInput").value;
		
		this.style.backgroundColor = '#607d8b';
		this.style.font = '18px bold';
		this.style.color = 'white';
		
		this.setAttribute('href', url);
		
		this.getElementById("myurlLink").onclick = function () {
			openInNewTab(url);
		}		
	};
	document.getElementById("myurlLink").onmouseout = function () {
		
		this.style.backgroundColor = 'white';
		this.style.font = 'initial';
		this.style.color = 'black';
	};
	
	/* ******************************* */
	/* onClick                         */
	/* ******************************* */
	
	document.getElementById("mycontactInfo").onclick = function () {
		resumeTemplateFlags.mycontactFlag = true;
		initializeBrowser(manuscriptObject, prewrittenDocumentObject);
		
		postingButton(mycontactObject, companyInfoObject, industryThemesObject, whatIofferObject, previewWriteInTextareaObject, manuscriptObject, prewrittenDocumentObject, 1);
		
		resumeTemplateFlags.emaillettertypeFlag = false;
	};
	document.getElementById("jobandcompanyInfo").onclick = function () {
		
		resumeTemplateFlags.companyFlag = true;
		initializeBrowser(manuscriptObject, prewrittenDocumentObject);
		
		postingButton(mycontactObject, companyInfoObject, industryThemesObject, whatIofferObject, previewWriteInTextareaObject, manuscriptObject, prewrittenDocumentObject, 2);
			
		resumeTemplateFlags.emaillettertypeFlag = false;
	};
	document.getElementById("industryInfo").onclick = function () {
		resumeTemplateFlags.industryFlag = true;
		initializeBrowser(manuscriptObject, prewrittenDocumentObject);
		
		postingButton(mycontactObject, companyInfoObject, industryThemesObject, whatIofferObject, previewWriteInTextareaObject, manuscriptObject, prewrittenDocumentObject, 3);
		
		resumeTemplateFlags.emaillettertypeFlag = false;
		
	};
	document.getElementById("mypersonaInfoButton").onclick = function () {
		resumeTemplateFlags.whatIofferFlag = true;
		initializeBrowser(manuscriptObject, prewrittenDocumentObject);
		
		postingButton(mycontactObject, companyInfoObject, industryThemesObject, whatIofferObject, previewWriteInTextareaObject, manuscriptObject, prewrittenDocumentObject, 4);
		
		resumeTemplateFlags.emaillettertypeFlag = false;
		
	};
	
	//update mini paragraph buttons
	var genericCustomParagraphUpdateButton = document.getElementsByClassName("genericCustomParagraphUpdateButton");
	for (i = 0; i < genericCustomParagraphUpdateButton.length; i += 1) {
		genericCustomParagraphUpdateButton[i].onclick = function () {
			paragraphInput(previewWriteInTextareaObject);
			paragraphOutput(previewWriteInTextareaObject);			
			basicTemplate(prewrittenDocumentObject);
		}
	}
	
	/* ******************************* */
	/* reset buttons                   */
	/* ******************************* */
	
	document.getElementById("resetEmailLetterButton").onclick = function () {
		manuscriptObject.emailletterFilled = manuscriptObject.emailletterBlank;
		document.getElementById("emailletterTemplate").innerHTML = manuscriptObject.emailletterFilled;
		
		previewWriteInTextareaObject.emailletter = "";
	
	
		resumeTemplateFlags.mycontactFlag = false;
		resumeTemplateFlags.companyFlag = false;
		resumeTemplateFlags.industryFlag = false;
		resumeTemplateFlags.whatIofferFlag = false;
		
		basicTemplate(prewrittenDocumentObject);
	}
	document.getElementById("resetResuemButton").onclick = function () {
		manuscriptObject.resumeFilled = manuscriptObject.resumeBlank;
		document.getElementById("resumeTemplate").innerHTML = manuscriptObject.resumeFilled;

		previewWriteInTextareaObject.resume = "";
	
		resumeTemplateFlags.mycontactFlag = false;
		resumeTemplateFlags.companyFlag = false;
		resumeTemplateFlags.industryFlag = false;
		resumeTemplateFlags.whatIofferFlag = false;
		
		basicTemplate(prewrittenDocumentObject);
	}
	document.getElementById("resetCoverLetterLetterButton").onclick = function () {		
		manuscriptObject.coverletterFilled = manuscriptObject.coverletterBlank;
		document.getElementById("coverletterTemplate").innerHTML = manuscriptObject.coverletterFilled;
		
		previewWriteInTextareaObject.coverletter = "";
	
		resumeTemplateFlags.mycontactFlag = false;
		resumeTemplateFlags.companyFlag = false;
		resumeTemplateFlags.industryFlag = false;
		resumeTemplateFlags.whatIofferFlag = false;
		
		basicTemplate(prewrittenDocumentObject);
		
	}
	document.getElementById("clearSession").onclick = function () {
		
		minimizeAll();
		
		//used for the pop experience
		document.getElementById('fade').innerHTML = '';
		document.getElementById('light').style.display='block';
		document.getElementById('fade').style.display='block';
	}
	document.getElementById("resetResume").onclick = function () {
		//used for the pop up experience
		
		minimizeAll();
		
		document.getElementById('fade').innerHTML = '';
		
		document.getElementById('light').style.display='block';
		document.getElementById('fade').style.display='block';
	}
	
	/* ******************************* */
	/* final save                      */
	/* ******************************* */
	
	document.getElementById("logButton").onclick = function () {
		var divLog, fileName, cssstyle, favicon;
		
		divLog = document.getElementById('logContainer').innerHTML;
		
		fileName = document.getElementById("coverletterTime").innerHTML + " ResumeLog";
		
		//saveLogAsCsv(csvLogArr, fileName); //csv
		
		favicon = '<link href="http://paulferrett.com/fontawesome-favicon/generate.php?icon=table&fg=222" rel="icon" type="image/x-icon" />';
			
		cssstyle = "<style>table{border-collapse: collapse;} table,th,td{border: 1px solid #ddd; text-align:left; padding:8px;}</style>";
		
		divLog = "<html> <head>" + favicon + cssstyle + "</head><body>" + divLog + "</body></html>";
		saveHtmlAsFile(divLog, fileName);	//html
	};
	document.getElementById("saveResume").onclick = function () {
		var  dateCreated = document.getElementById("coverletterTime").innerHTML;
		
		// true = all required items are in place
		if (flagMissedVariables() === true) {
			if (companyInfoObject.jobname.length > 0) {
				finishingOutput(companyInfoObject, prewrittenDocumentObject, dateCreated); //renders my deliverable document (15px=11pt)
				displayLog(companyInfoObject, dateCreated); // everytime I print, i want to display the resume settings
				clearinputfields('leftColDiv');
				initializeBrowser(manuscriptObject, prewrittenDocumentObject); //initial presets
				sel.selectedIndex = 0; // reset Template Layout Dropdown
			} else {
				minimizeAll();
				alertDiv();
				document.getElementById('fade').innerHTML += "<p style='color:red;'> !!! Enter an appropriate Position ID or Genre, found within the Company Info. Tab. !!!</p>";
			}
		} else {
			minimizeAll();
			alertDiv();			
			document.getElementById('fade').innerHTML += "<p style='color:red;'>Ensure the List of mandatory inputs is green.</p>";
		}
	};
	document.getElementById("saveResumeAlternative").onclick = function () {
		var  dateCreated = document.getElementById("coverletterTime").innerHTML;
		
		paragraphInput(previewWriteInTextareaObject);
		mycontactInfo(mycontactObject, manuscriptObject);
		paragraphOutput(previewWriteInTextareaObject);
		basicTemplate(prewrittenDocumentObject);
		resumeTemplateFlags.mycontactFlag = true;
		
		// true = all required items are in place
		if (flagMissedVariables() === true) {
			if (companyInfoObject.jobname.length > 0) {
				
				finishingOutput(companyInfoObject, prewrittenDocumentObject, dateCreated); //renders my deliverable document (15px=11pt)
				displayLog(companyInfoObject, dateCreated); // everytime I print, i want to display the resume settings
				
				clearinputfields('leftColDiv');
				
				initializeBrowser(manuscriptObject, prewrittenDocumentObject); //initial presets
			} else {
				minimizeAll();
				alertDiv();		
				document.getElementById('fade').innerHTML += "<p style='color:red;'> !!! Enter an appropriate Position ID or Genre, found within the Company Info. Tab. !!!</p>";
			}
		} else {
			minimizeAll();
			alertDiv();
			document.getElementById('fade').innerHTML += "<p style='color:red;'>Ensure the List of mandatory inputs is green.</p>";
		}
	};
};
