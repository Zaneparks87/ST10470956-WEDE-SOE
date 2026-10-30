document.addEventListener("DOMContentLoaded", function () {
    const mapContainer = document.getElementById("storeMap");

    if (!mapContainer) {
        console.warn("Map container #storeMap was not found on this page.");
        return;
    }

    const mapFrame = document.createElement("iframe");

    mapFrame.src = "https://www.google.com/maps?q=Johannesburg,+South+Africa&output=embed";
    mapFrame.title = "Map of Johannesburg, South Africa";
    mapFrame.width = "100%";
    mapFrame.height = "400";
    mapFrame.style.border = "0";
    mapFrame.style.borderRadius = "8px";
    mapFrame.loading = "lazy";
    mapFrame.referrerPolicy = "no-referrer-when-downgrade";
    mapFrame.allowFullscreen = true;

    mapContainer.replaceChildren(mapFrame);
});