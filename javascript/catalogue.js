
document.addEventListener("DOMContentLoaded", function () {



    const productGrid = document.getElementById("productGrid");
    const searchInput = document.getElementById("catalogSearchInput");
    const priceSorter = document.getElementById("pricesorter");

    const sizeForm = document.getElementById("sizeTrackerForm");
    const itemNameInput = document.getElementById("searchItemName");
    const itemSizeInput = document.getElementById("searchItemSize");
    const trackerFeedback = document.getElementById("trackerFeedback");

    const cartButton = document.getElementById("cartTrackerbtn");
    const cartCount = document.getElementById("globalCartCount");

    
    function getProductCards() {
        if (!productGrid) {
            return [];
        }

        return Array.from(productGrid.children).filter(function (element) {
            return element.nodeType === 1;
        });
    }

    function searchProducts() {
        if (!productGrid || !searchInput) {
            return;
        }

        const searchTerm = searchInput.value.trim().toLowerCase();
        const cards = getProductCards();

        let visibleCount = 0;

        cards.forEach(function (card) {
            const productText = card.textContent.toLowerCase();

            const matches = productText.includes(searchTerm);

            card.hidden = !matches;

            if (matches) {
                visibleCount++;
            }
        });

        let noResults = document.getElementById("noProductsMessage");

        if (!noResults) {
            noResults = document.createElement("p");
            noResults.id = "noProductsMessage";
            noResults.setAttribute("role", "status");
            productGrid.insertAdjacentElement("afterend", noResults);
        }

        noResults.textContent = visibleCount === 0
            ? "No products found. Try another search."
            : "";

        noResults.hidden = visibleCount !== 0;
    }

    if (searchInput) {
        searchInput.addEventListener("input", searchProducts);
    }

    

    function getProductPrice(card) {

        if (card.dataset.price !== undefined) {
            const dataPrice = Number(card.dataset.price);

            if (Number.isFinite(dataPrice)) {
                return dataPrice;
            }
        }

    
        const priceElement = card.querySelector(
            "[data-price], .product-price, .price"
        );

        const priceText = priceElement
            ? priceElement.textContent
            : card.textContent;

        const match = priceText.match(
            /R\s*([\d,]+(?:\.\d{1,2})?)/i
        );

        if (!match) {
            return Number.POSITIVE_INFINITY;
        }

        return Number(match[1].replace(/,/g, ""));
    }

    function sortProducts() {
        if (!productGrid || !priceSorter) {
            return;
        }

        const sortOption = priceSorter.value;
        const cards = getProductCards();

        if (sortOption === "featured") {
    
            cards.sort(function (a, b) {
                return Number(a.dataset.originalOrder) -
                    Number(b.dataset.originalOrder);
            });
        } else if (sortOption === "low-high") {
            cards.sort(function (a, b) {
                return getProductPrice(a) - getProductPrice(b);
            });
        } else if (sortOption === "high-low") {
            cards.sort(function (a, b) {
                return getProductPrice(b) - getProductPrice(a);
            });
        }

        cards.forEach(function (card) {
            productGrid.appendChild(card);
        });

        searchProducts();
    }

    if (productGrid) {
        getProductCards().forEach(function (card, index) {
            card.dataset.originalOrder = index;
        });
    }

    if (priceSorter) {
        priceSorter.addEventListener("change", sortProducts);
    }

    

    const stockData = {
        "jeans": ["30", "32", "34", "36"],
        "straight jean": ["30", "32", "34", "36"],

        "home essentials": ["S", "M", "L", "XL"],
        "homeware": ["S", "M", "L", "XL"],

        "kids activewear": ["S", "M", "L"],
        "activewear": ["S", "M", "L"],
        "kids": ["S", "M", "L"],
        "kids' tops": ["S", "M", "L"],

        "kitchenware": ["S", "M", "L", "XL"],

        "women tops": ["S", "M", "L", "XL"],
        "everyday tops": ["S", "M", "L", "XL"],
        "tops": ["S", "M", "L", "XL"],

        "sandals": ["S", "M", "L"]
    };

    function showTrackerFeedback(message, type) {
        if (!trackerFeedback) {
            return;
        }

        trackerFeedback.textContent = message;
        trackerFeedback.className = "feedback-box " + type;
    }

    if (sizeForm && itemNameInput && itemSizeInput) {
        sizeForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const productName = itemNameInput.value
                .trim()
                .toLowerCase();

            const selectedSize = itemSizeInput.value
                .trim()
                .toUpperCase();

            if (trackerFeedback) {
                trackerFeedback.className = "feedback-box";
                trackerFeedback.textContent = "";
            }

            if (!productName || !selectedSize) {
                showTrackerFeedback(
                    "Please enter a product name and select a size.",
                    "error-msg"
                );
                return;
            }

            const availableSizes = stockData[productName];

            if (!availableSizes) {
                showTrackerFeedback(
                    "We could not find that product in the demonstration size list. Check the product name or update the stock data.",
                    "error-msg"
                );
                return;
            }

            if (availableSizes.includes(selectedSize)) {
                showTrackerFeedback(
                    "The selected size is listed as available for " +
                    productName + ". Please confirm actual stock before ordering.",
                    "success-msg"
                );
            } else {
                showTrackerFeedback(
                    "The selected size is not listed as available for " +
                    productName + ". Please try another size.",
                    "error-msg"
                );
            }
        });
    }

   
    function getSavedCartCount() {
        try {
            const savedCount = Number(
                localStorage.getItem("zaneparksCartCount")
            );

            if (Number.isInteger(savedCount) && savedCount >= 0) {
                return savedCount;
            }
        } catch (error) {
           
        }

        return 0;
    }

    function updateCartDisplay(count) {
        if (cartCount) {
            cartCount.textContent = count;
        }
    }

    let currentCartCount = getSavedCartCount();

    updateCartDisplay(currentCartCount);

    function saveCartCount(count) {
        currentCartCount = count;
        updateCartDisplay(currentCartCount);

        try {
            localStorage.setItem(
                "zaneparksCartCount",
                String(currentCartCount)
            );
        } catch (error) {
           
        }
    }

    if (cartButton) {
        cartButton.addEventListener("click", function () {
            alert(
                "Your demonstration cart currently contains " +
                currentCartCount +
                " item(s)."
            );
        });
    }

    

    document.querySelectorAll(".add-to-cart").forEach(function (button) {
        button.addEventListener("click", function () {
            saveCartCount(currentCartCount + 1);

            const originalText = button.textContent;

            button.textContent = "Added to Cart!";

            window.setTimeout(function () {
                button.textContent = originalText;
            }, 1500);
        });
    });

});