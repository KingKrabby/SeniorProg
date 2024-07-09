// Simulated user profile data
let userProfile = {
    name: "Michael Hunt",
    email: "dummy@example.com",
    bio: "Fill in your 'About me' section"
};

// Function to populate form fields with user profile data
function populateForm() {
    document.getElementById('name').value = userProfile.name;
    document.getElementById('email').value = userProfile.email;
    document.getElementById('bio').value = userProfile.bio;
}

// Function to update user profile data
function updateProfile(event) {
    event.preventDefault();
    userProfile.name = document.getElementById('name').value;
    userProfile.email = document.getElementById('email').value;
    userProfile.bio = document.getElementById('bio').value;
    alert("Profile updated successfully!");
}

// Add event listener to form submission
document.getElementById('profile-form').addEventListener('submit', updateProfile);

// Populate form with initial data
populateForm();
