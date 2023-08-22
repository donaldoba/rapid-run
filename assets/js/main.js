/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 50,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SHOW SCROLL UP ===============*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-toggle-right'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-toggle-left' : 'bx-toggle-right'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-toggle-left' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
document.getElementById("tracking-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    const trackingNumber = document.getElementById("tracking-number").value;
    const trackingResult = document.getElementById("tracking-result");

    // Simulate tracking result (replace with actual tracking logic)
    const status = "In Transit"; // Replace with actual status

    // Store tracking information in localStorage
    const trackingInfo = { trackingNumber, status };
    localStorage.setItem("trackingInfo", JSON.stringify(trackingInfo));

    trackingResult.innerHTML = `Tracking Number: ${trackingNumber}<br>Status: ${status}`;
});

// Add this code to retrieve tracking information on page load
document.addEventListener("DOMContentLoaded", function() {
    const trackingResult = document.getElementById("tracking-result");
    const storedTrackingInfo = localStorage.getItem("trackingInfo");

    if (storedTrackingInfo) {
        const { trackingNumber, status } = JSON.parse(storedTrackingInfo);
        trackingResult.innerHTML = `Tracking Number: ${trackingNumber}<br>Status: ${status}`;
    }
});
document.getElementById("order-now-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    // Process the order form data (e.g., send to server, store in localStorage, etc.)

    // Display a success message (you can customize this part)
    alert("Order submitted successfully!");
});

document.getElementById("pickup-location-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    const pickupLocation = document.getElementById("pickup-location").value;

    // Process the pickup location data (e.g., send to server, store in localStorage, etc.)

    // Display a success message (you can customize this part)
    alert("Pickup location submitted successfully!");
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
const statusListItems = document.querySelectorAll(".status-list li");

statusListItems.forEach(item => {
    item.addEventListener("click", function() {
        const selectedStatus = this.getAttribute("data-status");
        const currentStatus = document.getElementById("current-status");

        currentStatus.textContent = selectedStatus;

        // Remove "active" class from all items
        statusListItems.forEach(item => {
            item.classList.remove("active");
        });

        // Add "active" class to the selected item
        this.classList.add("active");
    });
});
// ... (existing code) ...

// Add this code for tracking status selection based on conditions
const statusListItem = document.querySelectorAll(".status-list li");

statusListItems.forEach(item => {
    item.addEventListener("click", function() {
        const selectedStatus = this.getAttribute("data-status");
        const currentStatus = document.getElementById("current-status");

        currentStatus.textContent = selectedStatus;

        // Remove "active" class from all items
        statusListItems.forEach(item => {
            item.classList.remove("active");
        });

        // Add "active" class to the selected item
        this.classList.add("active");
    });
});

// Add this code to automatically set the status based on tracking number's first digit
document.getElementById("tracking-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const trackingNumber = document.getElementById("tracking-number").value;
    const currentStatus = document.getElementById("current-status");
    const firstDigit = trackingNumber.charAt(0);

    if (/[0-5]/.test(firstDigit)) {
        currentStatus.textContent = "Order Accepted";
        statusListItems.forEach(item => {
            if (item.getAttribute("data-status") === "Order Accepted") {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    } else if (/[6-9]/.test(firstDigit)) {
        currentStatus.textContent = "Arrived";
        statusListItems.forEach(item => {
            if (item.getAttribute("data-status") === "Arrived") {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    } else {
        currentStatus.textContent = "On Transit";
        statusListItems.forEach(item => {
            if (item.getAttribute("data-status") === "On Transit") {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const trackingNumberInput = document.getElementById("tracking-number");
    const currentStatus = document.getElementById("current-status");
    const firstDigit = trackingNumberInput.value.charAt(0);

    if (/[0-5]/.test(firstDigit)) {
        currentStatus.textContent = "Order Accepted";
    } else if (/[6-9]/.test(firstDigit)) {
        currentStatus.textContent = "Arrived";
    } else {
        currentStatus.textContent = "On Transit";
    }
});