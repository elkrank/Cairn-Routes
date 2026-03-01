
async function getRandomRoute() {
    // Page containg all routes
    const response = await fetch("/all-routes.html")
    const text = await response.text()

    // Parse the page as html and get all links
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const links = Array
        .from(doc.querySelectorAll('a[href^="/routes/"]'))
        .map(a => a.getAttribute('href'));

    // Choose a random page from list
    const rng = Math.floor(Math.random() * links.length)
    const randomPage = links[rng]

    // "/routes/Chocolate-Chimney.html" -> "Chocolate-Chimney"
    const newRouteName = randomPage.split("/").pop().split(".")[0]
    const currentPage = window.location.href
    if (currentPage.includes(newRouteName)) {
        return getRandomRoute()
    }

    // Navigate to the root directory
    const subdomain = /:\/\/[^\/]+(.*)$/.exec(currentPage)[1];
    const sublevels = (subdomain.match(/\//g) || []).length - 1;
    const directoryNaviation = "/..".repeat(sublevels);

    window.location.href = directoryNaviation + randomPage
}