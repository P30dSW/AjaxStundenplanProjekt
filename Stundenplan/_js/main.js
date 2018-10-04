
/**
 * This Document has been Documented with JSDoc: https://github.com/jsdoc3/jsdoc
 * @author Pedro dSW.
 */

/**************************************************************** CUSTOM OBJECT DESCRIPTION  ****************************************************************/
/**
            @typedef AJAX_Result
            @type {Object}
            @property {Object} resultObj - Object of The result. If the was a server error then it is null
            @property {string} serverResponse - Response of the server. SUCCESS or ERROR
 * 
 */
/**
            @typedef AJAX_Week_Result
            @type {Object}
            @property {Object} resultObj - Object of The result. If the was a server error then it is null
            @property {boolean} newWeek - true: creates a new date for the calculation of the WeekNumber in the year 
            @property {string} serverResponse - Response of the server. SUCCESS or ERROR
 * 
 */


/**************************************************************** DOM LOADING METHODS AND EVENTS  ****************************************************************/
$(document).ready(function(){
    //TODO: cookie check
    if(Cookies.get("beruf_id") != undefined){
        readCookies();
    }
    getLaborList();
    $(document).on("click",".addSelectionLaborList",changeDropDownSelectionLaborList);
    $(document).on("click",".addSelectionLaborClass",changeDropDownSelectionLaborClass);
    //TODO: week forwards (woche wird im cookie gespeichert)
    $("#weekForwardsBtn").on("click",changeWeekClassListForward);
    //TODO: week backwards(woche wird im cookie gespeichert)
    $("#weekBackwardsBtn").on("click",changeWeekClassListBack);
});

/**************************************************************** AJAX FUNCTIONS  ****************************************************************/

/**
 * AJAX FUNCTION: Return the LaborList as Object
 * @async
 * @returns Ajax Object of the Function
 */
function getLaborList(){

    return $.ajax({
  url: "http://sandbox.gibm.ch/berufe.php",
  dataType: "json",
  error: function(){ 
   
    LaborListToDOM( [null, "ERROR"]);
},
success: function(json){
    
    LaborListToDOM( [json,"SUCCESS"]);
}
    });
    
}

/**
 *  AJAX FUNCTION: gives out a classList from a laborId
 * @async
 * @param  {string} laborId - Id of a selected Labor
 * @returns Ajax Object of the Function
 */
function getLaborClasses(laborId){
    
    return $.ajax({
        url: "http://sandbox.gibm.ch/klassen.php?beruf_id=" + laborId,
        dataType: "json",
        error: function(){ 
         
            LaborClassToDOM( [null, "ERROR"]);
      },
      success: function(json){
          
        LaborClassToDOM( [json,"SUCCESS"]);
      }
          });
}
/**
 *  AJAX FUNCTION: gives back classPlan from classID
 * @async
 * @param  {string} classId - ID of selected Class
 * @param  {string} weekYear - string of the week and year in format ww-yyyy, Def: ""
 * @returns Ajax Object of the Function
 */
function getClassPlan(classId,newWeek,weekYear = ""){
    var url = "";
    if( weekYear != ""){
        url = "http://sandbox.gibm.ch/tafel.php?klasse_id=" + classId + "&woche=" +weekYear.slice(5) + "-" + weekYear.slice(0,4);
    }else{
        url = "http://sandbox.gibm.ch/tafel.php?klasse_id=" + classId;
    }
    return $.ajax({
        url: url,
        dataType: "json",
        error: function(){ 
            ClassWeekToDOM( [null,null, "ERROR"]);
      },
      success: function(json){
        ClassWeekToDOM( [json,newWeek,"SUCCESS"]);
      }
          });
}

/**************************************************************** DOM MANIPULATION FUNCTIONS  ****************************************************************/

/**
 * Gets array of labors and adds it to the dom
 * --DOM manipulating function--
 * @param  {AJAX_Result} listArray - ArrayObj of the AJAX Result
 */
function LaborListToDOM(listArray){
    if(listArray[1] == "ERROR") {
        alert("Es gibt ein fehler mit unseren Servern. Bitte versuchen Sie es Später");
    }else{
    var loabors = listArray[0];
    $.each(loabors ,function(i){
        $("#LaborListDropDownMenu").append(" <a class=\"dropdown-item addSelectionLaborList\" value=\"" + loabors[i].beruf_id + "\" >" +loabors[i].beruf_name + "</a>");

       
    });
}}
/**
 * Gets array of laborClasses and adds it to the dom
 * --DOM manipulating function--
 * @param  {AJAX_Result} classList - ArrayObj of the AJAX result 
 */
function LaborClassToDOM(classList){
    if(classList[1] == "ERROR") {
        alert("Es gibt ein fehler mit unseren Servern. Bitte versuchen Sie es Später");
    }else{
    var loaborClasses = classList[0];
    
    $.each(loaborClasses ,function(i){
        $("#LaborClassDropDownMenu").append(" <a class=\"dropdown-item addSelectionLaborClass\" value=\"" + loaborClasses[i].klasse_id + "\" >" +loaborClasses[i].klasse_longname + "</a>");
    });
    
}
}
/**
 * Sets the class week display by the selected Class
 * --DOM manipulating function--
 * @param  {AJAX_Week_Result} weekObj - Arrayobject of the AJAX result
 * @see getWeekNumber
 */
function ClassWeekToDOM(weekObj) {  
    if(weekObj[2] == "ERROR") {
        alert("Es gibt ein fehler mit unseren Servern. Bitte versuchen Sie es Später");
    }else{
var classWeek = weekObj[0];
$("#ClassWeekTbl").html("");
if(typeof classWeek !== 'undefined' && classWeek.length > 0){
    $.each(classWeek ,function(i){
        // column order: Datum,Wochentag,Von,Bis,Lehrer,Fach,Raum
        $("#ClassWeekTbl").append("<tr>" +
        "<td>" +classWeek[i].tafel_datum + "</td>" +
        "<td>" +convertWeekNumToGerman(classWeek[i].tafel_wochentag) + "</td>" +
        "<td>" +classWeek[i].tafel_von + "</td>" +
        "<td>" +classWeek[i].tafel_bis + "</td>" +
        "<td>" +classWeek[i].tafel_lehrer + "</td>" +
        "<td>" +classWeek[i].tafel_fach + "</td>" +
        "<td>" +classWeek[i].tafel_raum + "</td>" 
        + "</tr>" );
    });
}else{
    $("#ClassWeekTbl").append("<tr><td colspan=\"7\" class=\" text-center \">Schulfreie Zeit</td></tr>");
}

if(weekObj[1] == true){
    
    var weekYear = getWeekNumber(new Date());

    $("#displayBtn").html(weekYear[1] + " " +  weekYear[0]);
    //attribute week
    $("#displayBtn").attr("woche",weekYear);
}
//fadeIn if it isnt already visible
$("#mainDisplayTbl").fadeIn();
    }
}

/**************************************************************** EVENT LISTENER FUNCTIONS  ****************************************************************/

/**
 * fills the class selection by the current labor
 * @see getLaborClasses
 */
function changeDropDownSelectionLaborList(){
    //TODO: coockie check
    $("#LaborClassdropDownBtn").text("");
    $("#LaborClassDropDownMenu").html("");
    //Fades Class list if already visible
    $("#ClassListCard").fadeOut();
    $("#ClassWeekCard").fadeOut();
    //html sorgt dafür, dass der alte eintrag gelöscht wird
    $("#LaborListdropDownBtn").html($(this).text());
    
    $("#ClassListCard").fadeIn(1000);
    
    //Handling Cookies
    Cookies.set("beruf_id",$(this).attr("value"));
    Cookies.set("beruf_name",$(this).text());
    getLaborClasses($(this).attr("value"));
}
/**
 * Fills the week display with the class calendar. Uses getClassPlan
 * @see getClassPlan
 */
function changeDropDownSelectionLaborClass(){
    var thisObj = this;
    //resets the cookie
    Cookies.remove("woche");
    //Fades Class list if already visible
    $("#ClassWeekCard").fadeOut();
    //only proceed if the card if faced out
    $("#ClassWeekCard").promise().done(function(){
        $("#displayBtn").text("");
        $("#ClassWeekTbl").html("");
        //setting Table data
        //fades in 
        $("#ClassWeekCard").fadeIn(1000);
        $("#LaborClassdropDownBtn").html($(thisObj).text());
        //Handling Cookies
        Cookies.set("klasse_id",$(thisObj).attr("value"));
        Cookies.set("klasse_name",$(thisObj).text());
        getClassPlan($(thisObj).attr("value"),true);
        //saves classid at WeekSelectionBtn
        $("#displayBtn").attr("class_id",$(thisObj).attr("value"));
    });

    
}
/**
 * Event function for setting the class week one week backward
 */
function changeWeekClassListBack(){
    $("#mainDisplayTbl").fadeOut();
    $("#mainDisplayTbl").promise().done(function(){
        var weekYear = $("#displayBtn").attr("woche");
        var newWeekNum = Number(weekYear.slice(5)) - 1;
        var newYear = weekYear.slice(0,4);
        //check if it is a new year
        if(newWeekNum == 0){
            newWeekNum = 52;
            newYear -= 1;
        }
        else if(newWeekNum > 52){
            newWeekNum = 1;
            newYear += 1;
        }
        //set on btn value
        $("#displayBtn").attr("woche",newYear + "," + newWeekNum);
        $("#displayBtn").html(newWeekNum + " " +  newYear);
        //set on cookie
        Cookies.set("woche",newYear + "," + newWeekNum);
        //go to ajax
        if($("#displayBtn").attr("class_id") != undefined){
            getClassPlan($("#displayBtn").attr("class_id"),false,newYear + "," + newWeekNum);

        }else if(Cookies.get("klasse_id") != undefined){
            getClassPlan(Cookies.get("klasse_id"),false,newYear + "," + newWeekNum);

        }
    });
    
    
}
/**
 * Event function for setting the class week one week forward
 */
function changeWeekClassListForward(){

    $("#mainDisplayTbl").fadeOut();
    $("#mainDisplayTbl").promise().done(function(){
        var weekYear = $("#displayBtn").attr("woche");
        var newWeekNum = Number(weekYear.slice(5)) + 1;
        var newYear = weekYear.slice(0,4);
        //check if it is a new year
        if(newWeekNum == 0){
            newWeekNum = 52;
            newYear -= 1;
        }
        else if(newWeekNum > 52){
            newWeekNum = 1;
            newYear += 1;
        }
        //set on btn value
        $("#displayBtn").attr("woche",newYear + "," + newWeekNum);
        $("#displayBtn").html(newWeekNum + " " +  newYear);
        //set on cookie
        Cookies.set("woche",newYear + "," + newWeekNum);
        //go to ajax
        if($("#displayBtn").attr("class_id") != undefined){
            getClassPlan($("#displayBtn").attr("class_id"),false,newYear + "," + newWeekNum);

        }else if(Cookies.get("klasse_id") != undefined){
            getClassPlan(Cookies.get("klasse_id"),false,newYear + "," + newWeekNum);

        }
    });
}

/**************************************************************** EXTERNAL LIBRARIES AND PROCESSING FUNCTIONS  ****************************************************************/

/**
 * Manipulates the DOM with preexisting Cookies
 * @see {@link https://github.com/js-cookie/js-cookie}
 */
function readCookies(){

    $("#LaborListdropDownBtn").html(Cookies.get("beruf_name"));

    $("#ClassListCard").show();
    //set beruf_id
    getLaborClasses(Cookies.get("beruf_id"));
     if(Cookies.get("klasse_id") != undefined){
        if(Cookies.get("klasse_name") != undefined){
            $("#LaborClassdropDownBtn").html(Cookies.get("klasse_name"));
        }
        
        $("#ClassWeekCard").fadeIn();
         if(Cookies.get("woche") != undefined){
             
            getClassPlan(Cookies.get("klasse_id"),false,Cookies.get("woche"));
            $("#displayBtn").attr("woche",Cookies.get("woche"));
            var yearWeek = Cookies.get("woche");
            $("#displayBtn").html(yearWeek.slice(5) + " "+ yearWeek.slice(0,4));
     }else{
        getClassPlan(Cookies.get("klasse_id"),true);
     }
     }
}

/**
 * Converts a weekday number to a string in german
 * @example
 * //returns Montag
 * convertWeekNumToGerman(1);
 * @example 
 * //returns NOT_VALID_NUMBER
 * convertWeekNumToGerman(7);
 * @param  {number} num - number of the Weekday 0-sunday 6-saturday
 * @returns string of the Weekday in german
 */
function convertWeekNumToGerman(num){
    var weekDay = "";
switch (num) {
    case "0":
    weekDay = "Sonntag";
        break;
    case "1":
    weekDay = "Montag";
        break;
        case"2":
        weekDay = "Dienstag";
        break;
        case "3":
        weekDay = "Mittwoch";
        break;
        case "4":
        weekDay = "Donnerstag";
        break;
        case "5":
        weekDay = "Freitag";
        break;
        case "6":
        weekDay = "Samstag";
        break;
    default:
    weekDay = "NOT_VALID_NUMBER";
        break;
}
return weekDay;
}
