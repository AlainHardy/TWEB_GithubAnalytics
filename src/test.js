module.exports = {
    addition: function(a,b) {
        return a+b;
    },
    hello: function() {
        return "Hello";
    },
    testOfArray: function() {
        var array = [];
        array["abc"] = ["Bonjour", 12];
        array["abc"][1] += 1;
        console.log(array["abc"][1]);
        console.log(array["abc"][0]);
    }
}