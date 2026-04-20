(async function() {
    const STORAGE_KEY = "allRoutes";
    console.log("Initializing session...");

    if (!sessionStorage.getItem(STORAGE_KEY)) {
        const response = await fetch("/routes.json");
        const data = await response.json();

        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        console.log("Session initialized.");
    }
})();
