document.addEventListener("DOMContentLoaded", function () {

    const accordionButtons = document.querySelectorAll(".accordion-trigger");

    accordionButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const accordionItem = button.closest(".accordion-item");

            if (!accordionItem) {
                return;
            }

            const panel = accordionItem.querySelector(".accordion-panel");
            const icon = button.querySelector(".accordion-icon");

            if (!panel) {
                return;
            }

            const isOpen = button.getAttribute("aria-expanded") === "true";

            if (isOpen) {

                button.setAttribute("aria-expanded", "false");
                panel.style.maxHeight = "0";
                accordionItem.classList.remove("active");

                if (icon) {
                    icon.textContent = "+";
                }

            } else {

                button.setAttribute("aria-expanded", "true");
                accordionItem.classList.add("active");
                panel.style.maxHeight = panel.scrollHeight + "px";

                if (icon) {
                    icon.textContent = "−";
                }
            }

        });

    });


    const enquiryForm = document.getElementById("enquiryForm");
    const feedback = document.getElementById("enquiryFeedback");

    if (enquiryForm && feedback) {

        enquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const nameInput = document.getElementById("enquiryName");
            const emailInput = document.getElementById("enquiryEmail");
            const topicInput = document.getElementById("enquiryTopic");
            const messageInput = document.getElementById("enquiryMessage");

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const topic = topicInput.value;
            const message = messageInput.value.trim();

            feedback.textContent = "";
            feedback.className = "feedback-box";

            if (!name || !email || !topic || !message) {
                feedback.textContent = "Please complete all required fields.";
                feedback.classList.add("error");
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                feedback.textContent = "Please enter a valid email address.";
                feedback.classList.add("error");
                emailInput.focus();
                return;
            }

            if (message.length < 10) {
                feedback.textContent =
                    "Please enter at least 10 characters in your question.";
                feedback.classList.add("error");
                messageInput.focus();
                return;
            }

            feedback.textContent =
                "Thank you, " + name +
                "! Your enquiry has been validated successfully. " +
                "Please note that this demonstration does not send your enquiry.";

            feedback.classList.add("success");

            enquiryForm.reset();

        });
    }
})