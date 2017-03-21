// for any changes in manager.html home tabs

//  browser.cookies.getAll({'storeId':'0'},function(cookies){console.log("All cookies"+cookies);});
browser.cookies.getAll({}).then(function(items){console.log(items);});
document.addEventListener('DOMContentLoaded', function() {
document.getElementById('authURL').style.display = 'none';
});
