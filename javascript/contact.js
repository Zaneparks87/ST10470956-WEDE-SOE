document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("catalogueInquiryForm");
    const feedback = document.getElementById("formFeedbackBox");

    if (!form || !feedback) {
        return;
    }

    const nameInput = document.getElementById("customerName");
    const emailInput = document.getElementById("customerEmail");
    const departmentInput = document.getElementById("targetCatalogue");
    const messageInput = document.getElementById("messageBody");

    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.className = "feedback-box " + type;
    }

    function clearError(input) {
        input.classList.remove("input-error");
        input.removeAttribute("aria-invalid");
    }

    function markError(input) {
        input.classList.add("input-error");
        input.setAttribute("aria-invalid", "true");
    }

    const fields = [
        nameInput,
        emailInput,
        departmentInput,
        messageInput
    ];

    fields.forEach(function (field) {
        field.addEventListener("input", function () {
            clearError(field);
        });

        field.addEventListener("change", function () {
            clearError(field);
        });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        fields.forEach(clearError);
        feedback.className = "feedback-box";

        let valid = true;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const department = departmentInput.value;
        const message = messageInput.value.trim();

        if (name.length < 2) {
            markError(nameInput);
            valid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            markError(emailInput);
            valid = false;
        }

        if (department === "") {
            markError(departmentInput);
            valid = false;
        }

        if (message.length < 10) {
            markError(messageInput);
            valid = false;
        }

        if (!valid) {
            showFeedback(
                "Please check your details. Enter your name, a valid email, select a department, and write a message of at least 10 characters.",
                "error-msg"
            );

            const firstInvalid = fields.find(function (field) {
                return field.classList.contains("input-error");
            });

            if (firstInvalid) {
                firstInvalid.focus();
            }

            return;
        }

        showFeedback(
            "Validation successful! Your details are correct. Your message has NOT been sent because a message-processing service is not connected yet.",
            "success-msg"
        );

        form.reset();
        fields.forEach(clearError);
    });
});
