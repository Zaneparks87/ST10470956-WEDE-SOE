document.addEventListener("DOMContentLoaded", () => {
    
    // Grab the newsletter form and its feedback message area
    const newsletterForm = document.getElementById("newsletterForm");
    const feedback = document.getElementById("newsletterFeedback");

    // SAFETY CHECK: Only runs if the newsletter elements exist on the active page
    if (newsletterForm && feedback) {
        
        newsletterForm.addEventListener("submit", async (e) => {
            // Stops the page from refreshing to fulfill the required AJAX standard
            e.preventDefault();
            feedback.innerHTML = ""; // Reset current message states

            const emailField = document.getElementById("newsletterEmail");
            const emailValue = emailField ? emailField.value.trim() : "";

            // 1. FAST REGEX EMAIL VALIDATION
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailValue || !emailPattern.test(emailValue)) {
                feedback.innerHTML = `
                    <div style="color: #9b1c1c; background-color: #fde8e8; padding: 8px 12px; border-radius: 4px; margin-top: 10px; font-size: 0.9rem;">
                        ❌ Error: Please enter a valid email address profile.
                    </div>`;
                return; // Stop execution here
            }

            // 2. DYNAMIC AJAX PROCESSING (Matches your assignment's async code layout)
            feedback.innerHTML = <div style="color: #2563eb; font-weight: bold; margin-top: 10px; font-size: 0.9rem;">Subscribing user...</div>;

            try {
                // Simulating a fast asynchronous server pipeline delay
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Success State Configuration
                feedback.innerHTML = `
                    <div style="color: #03543f; background-color: #def7ec; padding: 8px 12px; border-radius: 4px; margin-top: 10px; font-size: 0.9rem; font-weight: bold;">
                        ✔️ Success! Welcome to our dynamic newsletter list.
                    </div>`;
                
                // Instantly clear the email entry input
                newsletterForm.reset();

            } catch (err) {
                // Fallback catch boundary block
                feedback.innerHTML = `
                    <div style="color: #e11d48; font-weight: bold; margin-top: 10px; font-size: 0.9rem;">
                        ❌ System Error: Subscription transmission failed.
                    </div>`;
            }
        });
    }
});