document.addEventListener("DOMContentLoaded", () => {
    // Select selectors matching your exact HTML layout structures
    const searchInput = document.querySelector(".tracker-form input[type='text']");
    const priceSorter = document.getElementById("pricesorter");
    const productsContainer = document.querySelector(".stock-check-panel"); // Parent container wrapping items

    // Ensure elements exist before execution to prevent script runtime failures
    if (searchInput && priceSorter) {
        // 1. Text Search Filter Action Layer
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase().trim();
            // Looks for your dynamic item display cards
            const itemCards = document.querySelectorAll(".product-item-card, .product-card");

            itemCards.forEach(card => {
                const titleText = card.textContent.toLowerCase();
                if (titleText.includes(query)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });

        // 2. Pricing Sort Array Configuration Logic
        priceSorter.addEventListener("change", () => {
            const criterion = priceSorter.value;
            const itemCards = Array.from(document.querySelectorAll(".product-item-card, .product-card"));
            
            if (itemCards.length === 0) return;

            // Sort logic parsing values dynamically
            itemCards.sort((cardA, cardB) => {
                // Extracts numbers from an element with class "price" or textContent
                const priceA = parseFloat(cardA.querySelector(".price")?.textContent.replace(/[^0-9.]/g, '') || 0);
                const priceB = parseFloat(cardB.querySelector(".price")?.textContent.replace(/[^0-9.]/g, '') || 0);

                if (criterion === "low-high") return priceA - priceB;
                if (criterion === "high-low") return priceB - priceA;
                return 0; // Default case
            });

            // Re-append items cleanly in sorted chronological sequence order
            itemCards.forEach(card => card.parentElement.appendChild(card));
        });
    }
});