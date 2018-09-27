$(document).ready(function(){
    //TODO: cookie check

    if(Cookies.get("beruf_id") != undefined){
        //console.log("dsffds");
        readCookies();
    }
    getLaborList();
    $(document).on("click",".addSelectionLaborList",changeDropDownSelectionLaborList);
    $(document).on("click",".addSelectionLaborClass",changeDropDownSelectionLaborClass);
});
/**
 * Return the LaborList as Object
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
 * gives out a classList from a laborId
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
 * gives back classPlan from classID
 * @param  {string} classId - ID of selected Class
 * @returns Array of classplans and State of Connection
 */
function getClassPlan(classId){

    return classPlans;
}

/**
 * Gets array of labors and adds it to the dom
 * @param  {Object} listArray - Array of the Labors
 */
function LaborListToDOM(listArray){
    var loabors = listArray[0];
    $.each(loabors ,function(i){
        //console.log(loabors[i].beruf_name);
        $("#LaborListDropDownMenu").append(" <a class=\"dropdown-item addSelectionLaborList\" value=\"" + loabors[i].beruf_id + "\" >" +loabors[i].beruf_name + "</a>");

       
    });
}
/**
 * Gets array of laborClasses and adds it to the dom
 * @param  {Object} classList - Array of the Classes
 */
function LaborClassToDOM(classList){
    var loaborClasses = classList[0];
    
    $.each(loaborClasses ,function(i){
        console.log(loaborClasses[i]);
        $("#LaborClassDropDownMenu").append(" <a class=\"dropdown-item addSelectionLaborClass\" value=\"" + loaborClasses[i].klasse_id + "\" >" +loaborClasses[i].klasse_longname + "</a>");
    });
}
/**
 * TODO: Documentation ENG
 */
function changeDropDownSelectionLaborList(){
    //TODO: coockie check
    $("#LaborClassdropDownBtn").text("");
    $("#LaborClassDropDownMenu").html("");
    $("#ClassListCard").fadeOut();
    //html sorgt dafür, dass der alte eintrag gelöscht wird
    $("#LaborListdropDownBtn").html($(this).text());
    
    $("#ClassListCard").fadeIn(1000);
    Cookies.set("beruf_id",$(this).attr("value"));
    Cookies.set("beruf_name",$(this).text());
    //console.log(Cookies.get());
    //set beruf_id
    getLaborClasses($(this).attr("value"));
}
/**
 * TODO: Documentation ENG
 */
function changeDropDownSelectionLaborClass(){
    $("#LaborClassdropDownBtn").html($(this).text());
}
/**
 * Setzt alle vorhandenen Infos im Dom hinein
 */
function readCookies(){

    $("#LaborListdropDownBtn").html(Cookies.get("beruf_name"));
    //console.log(Cookies.get("beruf_name"));
    $("#ClassListCard").show();
    //set beruf_id
    getLaborClasses(Cookies.get("beruf_id"));
    // if(Cookies.get() != undefined){


        // if(Cookies.get() != undefined){

    // }
    // }
}
