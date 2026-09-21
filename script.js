/* =========================================================
   SAFEFLOW PLUMBING SERVICES
   FINAL script.js
========================================================= */


/* =========================================================
   PAGE NAVIGATION
========================================================= */

const pages = [
    "index.html",
    "about.html",
    "contact.html"
];


/* Get current page */
function getCurrentPage() {
    let page = window.location.pathname.split("/").pop();

    if (!page || page === "") {
        page = "index.html";
    }

    return page;
}


/* Go to next page */
function nextPage() {
    const currentPage = getCurrentPage();
    const currentIndex = pages.indexOf(currentPage);

    if (currentIndex === -1) {
        window.location.href = "index.html";
        return;
    }

    const nextIndex = (currentIndex + 1) % pages.length;

    window.location.href = pages[nextIndex];
}


/* Go to previous page */
function previousPage() {
    const currentPage = getCurrentPage();
    const currentIndex = pages.indexOf(currentPage);

    if (currentIndex === -1) {
        window.location.href = "index.html";
        return;
    }

    const previousIndex =
        (currentIndex - 1 + pages.length) % pages.length;

    window.location.href = pages[previousIndex];
}


/* =========================================================
   MOBILE NAVIGATION MENU
========================================================= */

function toggleMenu() {
    const navLinks = document.getElementById("navLinks");

    if (!navLinks) {
        return;
    }

    navLinks.classList.toggle("active");
}


/* Close mobile menu after clicking a link */
document.addEventListener("click", function (event) {

    const navLinks = document.getElementById("navLinks");

    if (!navLinks) {
        return;
    }

    const clickedLink = event.target.closest("#navLinks a");

    if (clickedLink) {
        navLinks.classList.remove("active");
    }
});


/* =========================================================
   FOOTER YEAR
========================================================= */

function updateFooterYear() {

    const yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });
}


/* =========================================================
   BOOK A SERVICE
========================================================= */

function bookService(serviceName) {

    if (!serviceName) {
        return;
    }

    /* Save selected service */
    localStorage.setItem(
        "selectedService",
        serviceName
    );

    /* Open contact page */
    window.location.href = "contact.html";
}


/* =========================================================
   CONTACT PAGE SETUP
========================================================= */

function setupContactPage() {

    const bookingForm =
        document.getElementById("bookingForm");

    const dateInput =
        document.getElementById("bookingDate");

    const serviceSelect =
        document.getElementById("service");


    /* -----------------------------------------------------
       SET MINIMUM DATE
    ----------------------------------------------------- */

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();

        const month =
            String(today.getMonth() + 1).padStart(2, "0");

        const day =
            String(today.getDate()).padStart(2, "0");

        const todayString =
            `${year}-${month}-${day}`;

        dateInput.min = todayString;
    }


    /* -----------------------------------------------------
       LOAD SELECTED SERVICE
    ----------------------------------------------------- */

    if (serviceSelect) {

        const savedService =
            localStorage.getItem("selectedService");

        if (savedService) {

            const matchingOption =
                Array.from(serviceSelect.options)
                    .find(function (option) {
                        return option.value === savedService;
                    });

            if (matchingOption) {
                serviceSelect.value = savedService;
            }

            localStorage.removeItem("selectedService");
        }
    }


    /* -----------------------------------------------------
       BOOKING FORM
    ----------------------------------------------------- */

    if (!bookingForm) {
        return;
    }


    bookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* ---------------------------------------------
               GET FORM VALUES
            --------------------------------------------- */

            const customerName =
                document
                    .getElementById("customerName")
                    ?.value
                    .trim() || "";

            const customerPhone =
                document
                    .getElementById("customerPhone")
                    ?.value
                    .trim() || "";

            const service =
                document
                    .getElementById("service")
                    ?.value || "";

            const location =
                document
                    .getElementById("location")
                    ?.value
                    .trim() || "";

            const bookingDate =
                document
                    .getElementById("bookingDate")
                    ?.value || "";

            const bookingTime =
                document
                    .getElementById("bookingTime")
                    ?.value || "";

            const description =
                document
                    .getElementById("message")
                    ?.value
                    .trim() || "";


            /* ---------------------------------------------
               PAYMENT METHOD
            --------------------------------------------- */

            const selectedPayment =
                document.querySelector(
                    'input[name="payment"]:checked'
                );

            const paymentMethod =
                selectedPayment
                    ? selectedPayment.value
                    : "Not selected";


            /* ---------------------------------------------
               VALIDATION
            --------------------------------------------- */

            if (!customerName) {
                alert("Please enter your full name.");
                return;
            }

            if (!customerPhone) {
                alert("Please enter your phone number.");
                return;
            }

            if (!service) {
                alert("Please select a plumbing service.");
                return;
            }

            if (!location) {
                alert("Please enter your location.");
                return;
            }

            if (!bookingDate) {
                alert("Please select your preferred date.");
                return;
            }

            if (!bookingTime) {
                alert("Please select your preferred time.");
                return;
            }


            /* ---------------------------------------------
               PREVENT PAST DATES
            --------------------------------------------- */

            const selectedDate =
                new Date(
                    bookingDate + "T00:00:00"
                );

            const today =
                new Date();

            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {

                alert(
                    "Please select today or a future date."
                );

                return;
            }


            /* ---------------------------------------------
               CREATE WHATSAPP MESSAGE
            --------------------------------------------- */

            const whatsappMessage =

`Hello SafeFlow Plumbing Services 👋

I would like to book a plumbing service.

━━━━━━━━━━━━━━━━━━
CUSTOMER DETAILS
━━━━━━━━━━━━━━━━━━

Name: ${customerName}
Phone: ${customerPhone}

━━━━━━━━━━━━━━━━━━
BOOKING DETAILS
━━━━━━━━━━━━━━━━━━

Service: ${service}
Location: ${location}
Date: ${bookingDate}
Time: ${bookingTime}
Payment Method: ${paymentMethod}

━━━━━━━━━━━━━━━━━━
DESCRIPTION
━━━━━━━━━━━━━━━━━━

${description || "No additional description provided."}

Thank you.
SafeFlow Plumbing Services`;


            /* ---------------------------------------------
               SAFEFLOW WHATSAPP NUMBER
            --------------------------------------------- */

            const whatsappNumber =
                "27605658110";


            /* Encode WhatsApp message */
            const encodedMessage =
                encodeURIComponent(
                    whatsappMessage
                );


            /* Create WhatsApp URL */
            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


            /* Open WhatsApp */
            window.open(
                whatsappURL,
                "_blank"
            );
        }
    );
}


/* =========================================================
   INITIALIZE WEBSITE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateFooterYear();

        setupContactPage();

    }
);