// Function to calculate the estimated cost per guest 
function calculateEstimate() {
    const eventType = document.getElementById("eventType").value;
    const guests = parseInt(document.getElementById("guests").value, 10);
    const budget = parseFloat(document.getElementById("budget").value);

    const estimateElement = document.getElementById("estimate");

    if (!guests || guests <= 0 || isNaN(guests)) {
        estimateElement.innerHTML = 
            `<span class='error'>Please enter a valid number of guests.</span>`;
        return;
    }

    if (!budget || budget <= 0 || isNaN(budget)) {
        estimateElement.innerHTML = 
            `<span class='error'>Please enter a valid budget.</span>`;
        return;
    }

    const costPerGuest = budget / guests;
    estimateElement.innerHTML = 
        `<strong>Estimated cost per guest for your ${eventType} is <span class='highlight'>Ksh. ${costPerGuest.toFixed(2)}</span>.</strong>`;
}

// Slideshow functionality
let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide) => (slide.style.display = "none")); // Hide all slides
    slideIndex = (slideIndex >= slides.length) ? 0 : slideIndex;
    slides[slideIndex].style.display = "block"; // Display the current slide
    slideIndex++;
    setTimeout(showSlides, 7000); // Change slide every 7 seconds
}

// Allow manual slide navigation
function plusSlides(n) {
    slideIndex += n - 1; // Adjust slide index
    showSlides();
}

// Toggle for package details (Standard/Premium)
document.addEventListener("DOMContentLoaded", function() {
    // Get all toggle buttons
    const toggleButtons = document.querySelectorAll('.package-toggle button');
    
    // Get all package details sections
    const packageDetails = document.querySelectorAll('.package-details');

    // Add event listeners to the toggle buttons
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageCard = button.closest('.package-card');
            const isPremium = button.textContent.toLowerCase() === 'premium';

            // Reset active states for all buttons and details
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            packageDetails.forEach(detail => detail.classList.remove('active'));

            // Set the active state for the clicked button
            button.classList.add('active');

            // Show the appropriate details
            packageCard.querySelector(`.package-details.${isPremium ? 'premium' : 'standard'}`)
                       .classList.add('active');
        });
    });

    // Initialize slideshow
    showSlides(); // Start the slideshow
});

// Modal functionality for MPesa payment
document.addEventListener("DOMContentLoaded", () => {
    // Constants for modal elements
    const modal = document.getElementById("paymentModal");
    const paymentButton = document.getElementById("paymentButton");
    const closeModal = document.getElementById("closeModal");
    const paymentForm = document.getElementById("paymentForm");
    const confirmationMessage = document.getElementById("confirmationMessage");

    // Function to open the modal
    function openModal() {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Prevent scrolling in the background
    }

    // Function to close the modal
    function closeModalHandler() {
        modal.style.display = "none";
        confirmationMessage.style.display = "none"; // Reset confirmation message
        document.body.style.overflow = "auto"; // Re-enable background scrolling
    }

    // Open modal on button click
    paymentButton.addEventListener("click", openModal);

    // Close modal on close button click
    closeModal.addEventListener("click", closeModalHandler);

    // Close modal when clicking outside the content area
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModalHandler();
        }
    });
    // JavaScript for Vendor Form and Reviews Section

document.addEventListener("DOMContentLoaded", () => {
    // Handle Vendor Form Submission
    const vendorForm = document.querySelector(".vendor-form");
    vendorForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const eventDate = document.getElementById("event-date").value;
        const venue = document.getElementById("venue").value.trim();
        const eventType = document.getElementById("event-type").value;

        if (!eventDate || !venue || !eventType) {
            alert("Please fill out all fields before submitting.");
            return;
        }

        alert(`Event Details Submitted:\nDate: ${eventDate}\nVenue: ${venue}\nType: ${eventType}`);
        vendorForm.reset();
    });

    // Handle Review Form Submission
    const reviewForm = document.querySelector(".review-form");
    const reviewsList = document.getElementById("reviews-list");

    reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const reviewerName = document.getElementById("review-name").value.trim();
        const reviewText = document.getElementById("review").value.trim();

        if (!reviewerName || !reviewText) {
            alert("Please fill out your name and review.");
            return;
        }

        // Create and append new review to the list
        const newReview = document.createElement("li");
        newReview.innerHTML = `<strong>${reviewerName}:</strong> "${reviewText}"`;
        reviewsList.appendChild(newReview);

        alert("Thank you for your review!");
        reviewForm.reset();
    });

    // Highlight reviews on hover
    reviewsList.addEventListener("mouseover", (e) => {
        if (e.target.tagName === "LI") {
            e.target.style.background = "rgba(108, 99, 255, 0.1)";
        }
    });

    reviewsList.addEventListener("mouseout", (e) => {
        if (e.target.tagName === "LI") {
            e.target.style.background = "none";
        }
    });
});


    // Handle form submission for payment
    paymentForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission

        const phoneNumber = document.getElementById("phoneNumber").value.trim();
        const eventCharge = parseFloat(document.getElementById("eventCharge").value);
        const mpesaPin = document.getElementById("mpesaPin").value.trim();

        if (!phoneNumber || phoneNumber.length < 10) {
            alert("Please enter a valid phone number.");
            return;
        }

        if (!eventCharge || isNaN(eventCharge) || eventCharge <= 0) {
            alert("Please enter a valid event charge.");
            return;
        }

        if (!mpesaPin || mpesaPin.length < 4) {
            alert("Please enter a valid MPesa PIN.");
            return;
        }

        confirmationMessage.style.display = "block";
        confirmationMessage.innerHTML = 
            `<p>A payment prompt has been sent to your MPesa number. Please complete the payment process.</p>`;
        closeModalHandler(); // Close modal after submission
    });
});
