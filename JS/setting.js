document.addEventListener("DOMContentLoaded", () => {
    // Toggle advanced settings visibility
    const advancedSettingsToggle = document.getElementById("advanced-settings-toggle");

    if (advancedSettingsToggle) {
        advancedSettingsToggle.addEventListener("click", function () {
            const advancedSettings = document.getElementById("advanced-settings");
            advancedSettings.classList.toggle("visible");
            advancedSettingsToggle.textContent = advancedSettings.classList.contains("visible")
                ? "Hide Advanced Settings"
                : "Show Advanced Settings";
        });
    }

    // Handle form submissions in the Settings section
    const settingsForm = document.getElementById("settings-form");

    if (settingsForm) {
        settingsForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the default form submission

            // Get form field values
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const notifications = document.getElementById("notifications").checked;
            const theme = document.getElementById("theme").value;

            // Validate inputs (example: name and email are required)
            if (!name || !email) {
                alert("Please fill in all required fields.");
                return;
            }

            // Log values (or send them to a server)
            console.log("Name:", name);
            console.log("Email:", email);
            console.log("Password Updated:", password ? "Yes" : "No");
            console.log("Notifications Enabled:", notifications);
            console.log("Theme Selected:", theme);

            // Optionally, reset the form after submission
            settingsForm.reset();
            alert("Your settings have been updated successfully!");
        });
    }

    // Handle theme selection
    const themeSelector = document.getElementById("theme");

    if (themeSelector) {
        themeSelector.addEventListener("change", function () {
            const selectedTheme = themeSelector.value;
            document.body.className = selectedTheme; // Apply the selected theme to the body
            console.log("Theme changed to:", selectedTheme);
        });
    }

    // Handle two-factor authentication toggle
    const twoFactorToggle = document.getElementById("two-factor-toggle");

    if (twoFactorToggle) {
        twoFactorToggle.addEventListener("change", function () {
            const isEnabled = twoFactorToggle.checked;
            console.log("Two-Factor Authentication:", isEnabled ? "Enabled" : "Disabled");
            alert(`Two-Factor Authentication ${isEnabled ? "Enabled" : "Disabled"}`);
        });
    }

    // Handle export data button
    const exportDataButton = document.getElementById("export-data");

    if (exportDataButton) {
        exportDataButton.addEventListener("click", function () {
            console.log("Exporting data...");
            alert("Your data has been exported successfully!");
        });
    }

    // Handle contact support button
    const contactSupportButton = document.querySelector(".cta-btn");

    if (contactSupportButton) {
        contactSupportButton.addEventListener("click", function () {
            console.log("Redirecting to support...");
            window.location.href = "contact.html"; // Redirect to the support page
        });
    }
});