// =========================
// EMAILJS INITIALIZATION
// =========================

(function () {
    emailjs.init({
        publicKey: "CTcaDp_19xyfZxSfT"
    });
})();


// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const button = contactForm.querySelector(".form-btn");

    // Change button text
    button.disabled = true;
    button.innerHTML = "Sending...";

    formStatus.textContent = "";
    formStatus.className = "";

    // Send form through EmailJS
    emailjs.sendForm(
        "service_g8isigb",
        "template_vvkimzn",
        contactForm
    )
    .then(function () {

        // Success message
        formStatus.textContent = "i will connect to you soon! ✓";
        formStatus.className = "success";

        // Clear form
        contactForm.reset();

        // Restore button
        button.disabled = false;
        button.innerHTML = 'Send Message <span>↗</span>';

    })
    .catch(function (error) {

        console.error("EmailJS Error:", error);

        // Error message
        formStatus.textContent =
            "Failed to send message. Please try again.";
        formStatus.className = "error";

        // Restore button
        button.disabled = false;
        button.innerHTML = 'Send Message <span>↗</span>';

    });

});