async function getRandomRoute() {
    const allRoutesCandidates = [
        new URL("all-routes.html", document.baseURI),
        new URL("../all-routes.html", document.baseURI),
    ];

    let allRoutesDocument = null;

    for (const candidateUrl of allRoutesCandidates) {
        try {
            const response = await fetch(candidateUrl);

            if (!response.ok) {
                continue;
            }

            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/html");

            if (doc.querySelector("a[href*='routes/']")) {
                allRoutesDocument = doc;
                break;
            }
        } catch (error) {
            // Ignore invalid candidate and keep trying next path.
        }
    }

    if (!allRoutesDocument) {
        console.warn("Unable to load all-routes.html for random route selection.");
        return;
    }

    const links = Array
        .from(allRoutesDocument.querySelectorAll("a[href]"))
        .map((a) => a.getAttribute("href"))
        .filter((href) => typeof href === "string")
        .filter((href) => href.includes("routes/"))
        .map((href) => new URL(href, document.baseURI));

    if (links.length === 0) {
        console.warn("No route links found in all-routes.html");
        return;
    }

    const currentPageHref = window.location.href;
    const candidateLinks = links.filter((url) => url.href !== currentPageHref);
    const selectableLinks = candidateLinks.length > 0 ? candidateLinks : links;

    const rng = Math.floor(Math.random() * selectableLinks.length);
    const normalizedUrl = selectableLinks[rng];

    window.location.assign(normalizedUrl.href);
}
