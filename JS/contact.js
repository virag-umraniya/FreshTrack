document.addEventListener("DOMContentLoaded", () => {
    const supportForm = document.getElementById("support-form");

    if (supportForm) {
        supportForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the default form submission

            // Get form field values
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            // Validate inputs
            if (!name || !email || !subject || !message) {
                alert("Please fill in all fields.");
                return;
            }

            // Log values (or send them to a server)
            console.log("Name:", name);
            console.log("Email:", email);
            console.log("Subject:", subject);
            console.log("Message:", message);

            // Optionally, reset the form after submission
            supportForm.reset();
            alert("Your support request has been submitted. We'll get back to you soon!");
        });
    }
});