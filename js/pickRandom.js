async function getRandomRoute() {
    const response = await fetch(new URL("all-routes.html", document.baseURI));
    const text = await response.text();

    // Parse the page as HTML and get all route links.
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    const links = Array
        .from(doc.querySelectorAll("a[href]"))
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
