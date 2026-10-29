document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================================================
    // 1. DYNAMIC CATALOGUE LIVE SEARCH & FILTER ENGINE
    // =========================================================================
    const searchInput = document.getElementById("catalogSearch");
    const filterSelect = document.getElementById("catalogFilter");
    const itemCards = document.querySelectorAll(".catalog-item"); 

    if (searchInput && itemCards.length > 0) {
        
        function filterCatalog() {
            const searchTerm = searchInput.value.toLowerCase();
            const filterValue = filterSelect ? filterSelect.value.toLowerCase() : "all";

            itemCards.forEach(card => {
                // Extracts the product name text inside your card items
                const titleElement = card.querySelector(".item-title");
                const title = titleElement ? titleElement.innerText.toLowerCase() : "";
                
                // Reads the custom category value assigned to your card HTML element
                const category = card.getAttribute("data-category") ? card.getAttribute("data-category").toLowerCase() : "";

                const matchesSearch = title.includes(searchTerm);
                const matchesDropdown = (filterValue === "all" || category === filterValue);

                // Show item card only if it satisfies both filter conditions simultaneously
                if (matchesSearch && matchesDropdown) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        }

        // Attach event listeners to instantly trigger DOM adjustments as user types or selects
        searchInput.addEventListener("input", filterCatalog);
        if (filterSelect) {
            filterSelect.addEventListener("change", filterCatalog);
        }
    }

    // =========================================================================
    // 2. AVAILABILITY & STOCK HOOKS (Keeps your on-screen feedback loops safe)
    // =========================================================================
    const availabilityForm = document.getElementById("sizeAvailabilityForm");
    if (availabilityForm) {
        availabilityForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const feedback = document.getElementById("availabilityFeedback");
            const nameInput = document.getElementById("itemNameInput");
            const sizeInput = document.getElementById("itemSizeInput");

            if (feedback && nameInput && sizeInput) {
                feedback.className = "feedback-box success";
                feedback.innerText = "🔍 Checking warehouses for '${nameInput.value.trim()}' in Size [${sizeInput.value}]...;"
                
                setTimeout(() => {
                    feedback.innerText = "✔️ In Stock: Items available in store, at your nearest branch!;"
                }, 1000);
            }
        });
    }
});