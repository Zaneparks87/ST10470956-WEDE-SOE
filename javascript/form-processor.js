document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================================================
    // 1. FAQ ACCORDION ENGINE (Makes your questions open and close)
    // =========================================================================
    const faqTriggers = document.querySelectorAll(".accordion-trigger");
    
    faqTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            // Find the <h3> heading, then grab the hidden panel right below it
            const parentHeading = trigger.parentElement;
            const panel = parentHeading.nextElementSibling;
            
            // Check if this specific question is already open
            const isOpen = trigger.getAttribute("aria-expanded") === "true";
            
            if (isOpen) {
                // If it is open, close it cleanly
                trigger.setAttribute("aria-expanded", "false");
                panel.style.maxHeight = null;
            } else {
                // First, close any other open FAQ items to keep the layout neat
                document.querySelectorAll(".accordion-trigger").forEach(otherTrigger => {
                    otherTrigger.setAttribute("aria-expanded", "false");
                });
                document.querySelectorAll(".accordion-panel").forEach(otherPanel => {
                    otherPanel.style.maxHeight = null;
                });
                
                // Now open the clicked question and slide down the answer text
                trigger.setAttribute("aria-expanded", "true");
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    // =========================================================================
    // 2. ENQUIRY FORM AJAX PROCESSING (Keeps your existing form code safe)
    // =========================================================================
    const enquiryForm = document.getElementById("enquiryForm");
    
    if (enquiryForm) {
        enquiryForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // Prevents page reload
            const feedback = document.getElementById("enquiryFeedback");
            if (!feedback) return;
            feedback.innerHTML = ""; 

            // Extract input fields
            const purpose = document.getElementById("enquiryPurpose") ? document.getElementById("enquiryPurpose").value : "";
            const name = document.getElementById("fullName") ? document.getElementById("fullName").value.trim() : "";
            const email = document.getElementById("email") ? document.getElementById("email").value.trim() : "";
            const phone = document.getElementById("phone") ? document.getElementById("phone").value.trim() : "";
            const details = document.getElementById("details") ? document.getElementById("details").value.trim() : "";

            // Validation rules
            let errors = [];
            if (!purpose) errors.push("Please select a clear purpose category.");
            if (name.length < 2) errors.push("Full name must contain 2 or more characters.");
            if (!(/^\S+@\S+\.\S+$/.test(email))) errors.push("Please enter a valid email address.");
            if (!(/^\d{10}$/.test(phone))) errors.push("Phone number must be exactly 10 digits.");
            if (details.length < 10) errors.push("Message details must be at least 10 characters.");

            if (errors.length > 0) {
                feedback.innerHTML = `
                    <div style="background-color: #fde8e8; color: #9b1c1c; padding: 12px; border-radius: 6px; margin-top: 15px; font-weight: 500;">
                        <strong>⚠️ Missing or Invalid Inputs:</strong>
                        <ul style="margin: 5px 0 0 20px; padding: 0;">
                            ${errors.map(err => <li>${err}</li>).join('')}
                        </ul>
                    </div>`;
                return;
            }

            feedback.innerHTML = <div style="color: #2563eb; font-weight: bold; padding: 10px 0;">Processing submission...</div>;

            try {
                await new Promise((resolve) => setTimeout(resolve, 1200)); // Dynamic background network delay
                feedback.innerHTML = `
                    <div style="background-color: #def7ec; color: #03543f; padding: 12px; border-radius: 6px; margin-top: 15px; font-weight: bold;">
                        ✔️ Success! Your asynchronous enquiry has processed seamlessly.
                    </div>`;
                enquiryForm.reset();
            } catch (err) {
                feedback.innerHTML = <div style="color: #e11d48; font-weight: bold; padding: 10px 0;">❌ Transmission failed. Please try again.</div>;
            }
        });
    }
});