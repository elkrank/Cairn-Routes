
async function getRandomRoute() {
    // Page containg all routes
    const response = await fetch("/all-routes.html")
    const text = await response.text()

    // Parse the page as html and get all links
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const links = Array
        .from(doc.querySelectorAll('a[href^="./routes/"]'))
        .map(a => a.getAttribute('href'));

    // Choose a random page from list
    const rng = Math.floor(Math.random() * links.length)
    const randomPage = links[rng]

    // "./routes/Chocolate-Chimney.html" -> "Chocolate-Chimney"
    const newRouteName = randomPage.split("/").pop().split(".")[0]
    const currentPage = window.location.href
    if (currentPage.includes(newRouteName)) {
        return getRandomRoute()
    }

    if (window.location.href.includes("routes/")) {
        window.location.href = "." + randomPage
    } else {
        window.location.href = randomPage
    }
}
