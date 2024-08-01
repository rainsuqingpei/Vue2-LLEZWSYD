export function getQueryVariable (variable) {
  var query = window.location.href.substring(1);
  var queryArr = query.split("?");
  var vars = queryArr[1].split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}
