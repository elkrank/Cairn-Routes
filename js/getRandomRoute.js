
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

    // "/routes/route.html?id=Spider Legs" -> "Spider Legs"
    const newRouteName = randomPage.split("?id=").pop()
    const currentPage = window.location.href
    console.log("Current page:", currentPage)
    console.log("New route name:", newRouteName)
    if (currentPage.includes(newRouteName)) {
        return getRandomRoute()
    }

    // Navigate to the root directory
    const subDomain = /:\/\/[^\/]+(.*)$/.exec(currentPage)[1];
    const subLevels = subDomain.match(/\//g)
    const subLevelsCount = Math.max(subLevels.length - 1, 0);
    const directoryNaviation = "/..".repeat(subLevelsCount);

    window.location.href = directoryNaviation + randomPage
}