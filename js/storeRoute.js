function storeRoute(routeID) {
  localStorage.setItem("routeID", routeID);
  window.location.href = "/routes/route.html"
}