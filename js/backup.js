
//=============== Coverage ==================
function arr_diff (a1, a2) {
    var a = [], diff = [];
    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }
    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }
    for (var k in a) {
        diff.push(k);
    }
    return diff;
}

var uniqueNames = [];
$.each(coveredfunctions, function(i, el){
    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
});

console.log((uniqueNames.length + 5)/allfns.length);
console.log(arr_diff(uniqueNames, allfns));

//==========================================
//snapshot sample location
//http://10.96.1.25:8008/experience/events/interface/snapshot?name=1.jpg&clear=true&quality=75
