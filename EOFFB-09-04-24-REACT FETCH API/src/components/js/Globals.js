// // Function to toggle between light and dark modes
// function toggleDarkMode() {
//     const root = document.documentElement;
//     const currentMode = root.getAttribute("data-theme");
  
//     if (currentMode === "dark") {
//       root.setAttribute("data-theme", "light");
//       localStorage.setItem("theme", "light"); // Store preference in localStorage
//     } else {
//       root.setAttribute("data-theme", "dark");
//       localStorage.setItem("theme", "dark"); // Store preference in localStorage
//     }
//   }
  
//   // Function to set the theme based on user's preference stored in localStorage
//   function setThemeFromStorage() {
//     const savedTheme = localStorage.getItem("theme");
//     const prefersDarkMode = window.matchMedia(
//       "(prefers-color-scheme: dark)"
//     ).matches;
  
//     if (savedTheme) {
//       document.documentElement.setAttribute("data-theme", savedTheme);
//     } else if (prefersDarkMode) {
//       document.documentElement.setAttribute("data-theme", "dark");
//     }
//   }
  
//   // Call setThemeFromStorage when the page loads
//   document.addEventListener("DOMContentLoaded", setThemeFromStorage);
  
//   // Event listener for toggling dark mode
//   document
//     .getElementById("toggle-dark-mode")
//     .addEventListener("click", toggleDarkMode);
  











  // document.addEventListener("DOMContentLoaded", function () {
  //   const emailInput = document.getElementById("emailInput");
  //   const validationMessage = document.getElementById("emailValidationMessage");
  //   const placeholderText = "Enter iNumber (e.g., i01000)";
  
  //   // Set placeholder text for the email input field
  //   emailInput.placeholder = placeholderText;
  
  //   // Regular expression for validating iNumber format
  //   const iNumberPattern = /^i\d{5}$/;
  
  //   // Function to validate the entered iNumber
  //   function validateINumber(iNumber) {
  //     if (iNumberPattern.test(iNumber)) {
  //       validationMessage.textContent = ""; // No error message for valid iNumber
  //       validationMessage.classList.remove("error-message"); // Remove error class
  //     } else {
  //       validationMessage.textContent = "Invalid iNumber format (e.g., i01000)";
  //       validationMessage.classList.add("error-message"); // Add error class
  //     }
  //   }
  
  //   // Event listener for the input event on the email input field
  //   emailInput.addEventListener("input", function (event) {
  //     const iNumber = event.target.value.trim();
  //     if (iNumber === "") {
  //       validationMessage.textContent = ""; // Clear error message if input is empty
  //       validationMessage.classList.remove("error-message"); // Remove error class
  //     } else {
  //       validateINumber(iNumber);
  //     }
  //   });
  // });



  
  // function toggleSection(sectionId) {
  //   const sectionContent = document.getElementById(sectionId + "-table");
  //   const icon = document.getElementById(`${sectionId}-icon`);
  
  //   // Toggle section visibility
  //   if (
  //     sectionContent.style.display === "none" ||
  //     !sectionContent.style.display
  //   ) {
  //     sectionContent.style.display = "table"; // Change to whatever appropriate display style
  //     icon.classList.remove("fa-chevron-down");
  //     icon.classList.add("fa-chevron-up");
  //   } else {
  //     sectionContent.style.display = "none";
  //     icon.classList.remove("fa-chevron-up");
  //     icon.classList.add("fa-chevron-down");
  //   }
  // }
  


  
  
//   document.getElementById('executeButton').addEventListener('click', function() {
//       var loadingBar = document.getElementById('loadingBar');
//       loadingBar.classList.add('loading'); // Add the 'loading' class to start the loading animation
    
//       // Simulate a delay for demonstration purposes (replace this with your actual code execution)
//       setTimeout(function() {
//         loadingBar.classList.remove('loading'); // Remove the 'loading' class to stop the loading animation
//       }, 2000); // Change 3000 to your desired duration in milliseconds
//     });
    
  
  
//     document.addEventListener('DOMContentLoaded', function () {
//       const executeButton = document.querySelector('.execute-btn button');
//       const messageBox = document.querySelector('.message-box');
  
//       // Function to show the success message
//       function showSuccessMessage() {
//           messageBox.style.display = 'block'; // Show the message box
//           setTimeout(() => {
//               hideSuccessMessage(); // Hide the message box after 3 seconds
//           }, 3000);
//       }
  
//       // Function to hide the success message
//       function hideSuccessMessage() {
//           messageBox.style.display = 'none'; // Hide the message box
//       }
  
//       // Event listener for the execute button click
//       executeButton.addEventListener('click', function () {
//           // Execute your action here
//           // For demonstration purposes, we'll just show the success message
//           showSuccessMessage();
//       });
  
//       // Event listener for the close button click
//       const closeButton = document.querySelector('.close-button');
//       closeButton.addEventListener('click', function () {
//           hideSuccessMessage();
//       });
//   });
  
  