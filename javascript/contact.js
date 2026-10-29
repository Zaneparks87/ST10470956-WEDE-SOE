   document.addEventListener("DOMContentLoaded", () => {
            initContactFormPipeline();
        });

        function initContactFormPipeline() {
            const form = document.getElementById("catalogueInquiryForm");
            if (!form) return;

            form.addEventListener("submit", async function(event) {
                event.preventDefault(); // Halt browser page refresh loop

                // Field Selector Mappings
                const name = document.getElementById("customerName");
                const email = document.getElementById("customerEmail");
                const dept = document.getElementById("targetCatalogue");
                const msg = document.getElementById("messageBody");
                const feedback = document.getElementById("formFeedbackBox");

                // Reset past error borders and hidden text layers
                [name, email, dept, msg].forEach(field => field.classList.remove("input-error"));
                feedback.className = "feedback-box";
                feedback.innerText = "";

                // Strict Regex Evaluators
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                // Validation Logical Suite Checks
                if (name.value.trim().length < 3) {
                    flagInvalidField(name, "❌ Name field must consist of at least 3 character characters.", feedback);
                    return;
                }

                if (!emailRegex.test(email.value.trim())) {
                    flagInvalidField(email, "❌ Please input a legitimate, conforming electronic email address setup.", feedback);
                    return;
                }

                if (dept.value === "") {
                    flagInvalidField(dept, "❌ Please specify an active catalogue tracking department channel destination.", feedback);
                    return;
                }

                if (msg.value.trim().length < 10) {
                    flagInvalidField(msg, "❌ Detail commentary text must extend beyond 10 character parameters.", feedback);
                    return;
                }

                // ==========================================================================
                // AJAX TRANSACTION INITIATION
                // ==========================================================================
                feedback.className = "feedback-box loading-msg";
                feedback.innerText = "⏳ Connecting to ZaneparksHyper communication engine database stream via AJAX...";

                try {
                    // Simulating API network processing latency constraints
                    await new Promise(resolve => setTimeout(resolve, 1400));

                    feedback.className = "feedback-box success-msg";
                    feedback.innerText = "✅ Submission Dispatched! Asynchronous data packets processed by AJAX cleanly. System generated a support logging index reference.";
                    form.reset();
                } catch (err) {
                    feedback.className = "feedback-box error-msg";
                    feedback.innerText = "❌ Connection Fault: Failed transmission processing network data nodes.";
                }
            });
        }

        function flagInvalidField(fieldElement, errorMessageText, outputMessageBox) {
            fieldElement.classList.add("input-error");
            fieldElement.focus();
            outputMessageBox.className = "feedback-box error-msg";
            outputMessageBox.innerText = errorMessageText;
        }