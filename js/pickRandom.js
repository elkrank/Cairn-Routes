async function getRandomRoute() {
    // Page containing all routes
    const isRoutePage = window.location.pathname.includes("/routes/")
    const response = await fetch(isRoutePage ? "../all-routes.html" : "all-routes.html")
    const text = await response.text()

    // Parse the page as html and get all route links
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const links = Array
        .from(doc.querySelectorAll('a[href*="routes/"]'))
        .map((a) => a.getAttribute('href'))
        .filter(Boolean);

    // Choose a random page from list
    const rng = Math.floor(Math.random() * links.length)
    const randomPage = links[rng]

    // "routes/Chocolate-Chimney.html" -> "Chocolate-Chimney"
    const newRouteName = randomPage.split("/").pop().split(".")[0]
    const currentPage = window.location.href
    if (currentPage.includes(newRouteName)) {
        return getRandomRoute()
    }

    // Navigate while preserving compatibility for root pages and routes/* pages
    const targetPath = isRoutePage ? `../${randomPage}` : randomPage
    window.location.href = new URL(targetPath, window.location.href).href
}
