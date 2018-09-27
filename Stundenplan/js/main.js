$(document).ready(function(){
    //TODO: cookie check
    getLaborList();
    $(document).on("click",".addSelection",changeDropDownSelection);
});
/**
 * Return the LaborList as Object
 * @returns Array OF laborlist and State of Connection
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

function LaborListToDOM(listArray){
    var loabors = listArray[0];
    $.each(loabors ,function(i){
        //console.log(loabors[i].beruf_name);
        $("#DropDownMenu").append(" <a class=\"dropdown-item addSelection\" value=\"" + loabors[i].beruf_id + "\" >" +loabors[i].beruf_name + "</a>");

       
    })
}
/**
 * Wenn eine Selection vom Dropdownliste gewählt wird, updated die methode vom header
 */
function changeDropDownSelection(){
    //TODO: coockie check
    //html sorgt dafür, dass der alte eintrag gelöscht wird
    $("#dropDownBtn").html($(this).text());
}
