async function templateFill() {
  var routeID = localStorage.getItem("routeID");
  localStorage.clear();

  const content = JSON.parse(sessionStorage.getItem("allRoutes"));

  buffs = "";
  if (content[routeID].buffs['Burst'] === true) {
    buffs += "<img src=\"/imgs/burst.png\" alt=\"Burst buff\">";
  }
  if (content[routeID].buffs['Grip'] === true) {
    buffs += "<img src=\"/imgs/grip.png\" alt=\"Grip buff\">";
  }
  if (content[routeID].buffs['Focus'] === true) {
    buffs += "<img src=\"/imgs/focus.png\" alt=\"Focus buff\">";
  }
  if (content[routeID].buffs['Chalk'] === true) {
    buffs += "<img src=\"/imgs/extra_grip.png\" alt=\"Chalk bag\">";
  }
  if (content[routeID].buffs['Grit'] === true) {
    buffs += "<img src=\"/imgs/grit.png\" alt=\"Grit buff\">";
  }
  if (buffs === "") {
    buffs += "<img src=\"/imgs/none.png\" alt=\"Crossed through circle\">";
  }
  document.getElementById('route-title').innerHTML = content[routeID].route_name;
  document.getElementById('route-name').innerHTML = content[routeID].route_name;
  document.getElementById('route-location').innerHTML = "<img src=\"/imgs/pin-map.svg\" alt=\"Map pin\"> " + content[routeID].route_location;
  document.getElementById('route-first-ascent-name').innerHTML = content[routeID].first_ascent_name;
  document.getElementById('route-first-ascent-date').innerHTML = content[routeID].first_ascent_date;
  document.getElementById('route-first-redpoint-name').innerHTML = content[routeID].first_redpoint_name;
  document.getElementById('route-first-redpoint-date').innerHTML = content[routeID].first_redpoint_date;
  document.getElementById('route-buffs-used').innerHTML = buffs;
  document.getElementById('route-description').innerHTML = content[routeID].route_description;
  document.getElementById('route-image').innerHTML = "<img src=\"" + content[routeID].img_path + "\" class=\"img-fluid rounded\"></img>";
  document.getElementById('route-first-ascent-video').innerHTML = "<iframe width=\"560\" height=\"315\" src=\"" + content[routeID].first_ascent_video_url + "\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>";
  document.getElementById('route-first-redpoint-video').innerHTML = "<iframe width=\"560\" height=\"315\" src=\"" + content[routeID].first_redpoint_video_url + "\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>";
}