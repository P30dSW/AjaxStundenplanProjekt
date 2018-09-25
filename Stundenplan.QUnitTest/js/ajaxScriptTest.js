QUnit.test("getLaborListTEST", function(a){
    
    $.ajax = function(options) {
        
        options.success("SUCCESS");
    };
    var test = getLaborList();
    a.equal(test[1], "SUCCESS");
});