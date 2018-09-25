$(document).ready(function(){
    getLaborList();
});

/**
 * Return the LaborList as Object
 * @returns Array OF laborlist and State of Connection
 */
function getLaborList(){
    var laborList = null;
    $.ajax({
  url: "http://sandbox.gibm.ch/berufe.php",
  dataType: "jsonp",
  error: function(){ 
    laborList = [null, "ERROR"];
},
success: function(json){
    laborList = [json,"SUCCESS"];
}
    });
    return laborList;
}
/**
 * gives out a classList from a laborId
 * @param  {string} laborId - Id of a selected Labor
 * @returns Array of Class and State of Connection
 */
function getLaborWork(laborId){

    return classList;
}
/**
 * gives back classPlan from classID
 * @param  {string} classId - ID of selected Class
 * @returns Array of classplans and State of Connection
 */
function getClassPlan(classId){

    return classPlans;
}



