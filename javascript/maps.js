document.addEventListener("DOMContentLoaded", () => {
            initNewsletterAJAX();
        });

        function initNewsletterAJAX() {
            const form = document.getElementById("storeNewsletterform");
            const emailField = document.getElementById("SubscriberEmail");
            const feedback = document.getElementById("newsletterFeedback");

            form.addEventListener("submit", async function(e) {
                e.preventDefault();
                feedback.className = "feedback-box";
                feedback.innerText = "";

                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value.trim())) {
                    feedback.className = "feedback-box error-msg";
                    feedback.innerText = "❌ Validation Error: Please provide a structurally legitimate email address.";
                    return;
                }

                feedback.className = "feedback-box loading-msg";
                feedback.innerText = "⏳ Directing AJAX processing pipeline data streams... Please hold.";

                try {
                    // Simulate Asynchronous network validation handling delay
                    await new Promise(resolve => setTimeout(resolve, 1200));
                    
                    feedback.className = "feedback-box success-msg";
                    feedback.innerText = "✅ Registration Complete! Your 15% discount voucher code has been dispatched asynchronously via AJAX.";
                    form.reset();
                } catch (err) {
                    feedback.className = "feedback-box error-msg";
                    feedback.innerText = "❌ Network Pipeline Failure updating registration blocks.";
                }
            });
        }