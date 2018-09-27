/*Good to know https://code.tutsplus.com/tutorials/how-to-test-your-javascript-code-with-qunit--net-9077
   https://api.qunitjs.com/assert/timeout
*/

QUnit.test("getLaborListTEST", function(a){
    var done = a.async();
    getLaborList().done(function(json) {
        if(typeof json, "object"){
            a.ok(true,"Der Webservice Response is ein Objekt");
        }else{
            a.ok(false,"Der Webservice Response is kein Objekt");
        }
        done();
      });
});

QUnit.test("getLaborClassesTEST", function(a){
    var done = a.async();
    getLaborClasses(5).done(function(json) {
        if(typeof json, "object"){
            a.ok(true,"Der Webservice Response is ein Objekt");
        }else{
            a.ok(false,"Der Webservice Response is kein Objekt");
        }
        done();
      });
});