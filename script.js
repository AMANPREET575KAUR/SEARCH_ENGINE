// Selecting DOM elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const historyList = document.getElementById('historyList');

// Load search history when the page loads
window.onload = function() {
    loadHistory();
};

// Function to load history from localStorage
function loadHistory() {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    historyList.innerHTML = '';

    // Dynamically create list items for each history term
    searchHistory.forEach((term, index) => {
        const li = document.createElement('li');
        li.textContent = term;

        // Create a delete button for each history item
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');

        // Create an icon element
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-trash-alt'); // Font Awesome trash icon

        // Append the icon to the delete button
        deleteBtn.appendChild(icon);
        deleteBtn.appendChild(document.createTextNode(' Delete')); // Add text after icon
        deleteBtn.setAttribute('data-index', index); // Store index for reference

        // Append the delete button to the list item
        li.appendChild(deleteBtn);
        historyList.appendChild(li);
    });

    // Add event listener to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteHistoryItem);
    });
}

// Add search functionality
searchBtn.addEventListener('click', function() {
    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        searchHistory.push(searchTerm);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

        loadHistory(); // Reload the history list
        searchInput.value = ''; // Clear input
    }
});

// Function to delete individual history items
function deleteHistoryItem(event) {
    const index = event.target.getAttribute('data-index');
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Remove the item at the specified index
    searchHistory.splice(index, 1);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    loadHistory(); // Reload the history list after deletion
}

// Clear all history
clearHistoryBtn.addEventListener('click', function() {
    localStorage.removeItem('searchHistory');
    loadHistory(); // Reload the history list
});
