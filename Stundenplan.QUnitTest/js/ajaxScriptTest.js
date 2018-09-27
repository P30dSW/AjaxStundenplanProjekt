QUnit.test("getLaborListTEST", function(a){
    /*Good to know https://code.tutsplus.com/tutorials/how-to-test-your-javascript-code-with-qunit--net-9077
     https://api.qunitjs.com/assert/timeout
     */
     stop(1000);
    getLaborList(function(){
        a.ok(true);
    });
    setTimeout(function() {
        start();
    }, 2000);
});
