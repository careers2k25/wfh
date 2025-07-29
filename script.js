// Set today's date as default when page loads
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
});

// Form submission
document.getElementById('workFromHomeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const date = document.getElementById('date').value;
    
    if (username && date) {
        // Submit form data to Netlify
        submitToNetlify(this);
    }
});

// Function to submit form to Netlify
function submitToNetlify(form) {
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
    })
    .then(() => {
        // Show success message
        showSuccessMessage();
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error submitting the form. Please try again.');
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('active');
}

// Cancel button functionality
document.querySelector('.cancel-btn').addEventListener('click', function() {
    // Reset form
    document.getElementById('workFromHomeForm').reset();
    
    // Set today's date again
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
});

// Close success message when clicking on it
document.getElementById('successMessage').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
    }
});

// Close success message with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.getElementById('successMessage').classList.remove('active');
    }
});