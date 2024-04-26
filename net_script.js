document.addEventListener('DOMContentLoaded', function () {
    //var imgSrc = pic;
    //pic.style.height = '40px';
    //pic.style.width = '40px';

    // Sample data for connections and suggestions
    let connectionRequests = [
        { name: "Alice Johnson", profession: "Web Developer", imgSrc: "Images/user-4.png", id: 1 }
    ];


    let connections = [
        { name: "Jane Doe", profession: "Software Engineer", imgSrc: "Images/user-2.png", id: 2 }
    ];


    let suggestions = [
        { name: "Bob Brown", profession: "Data Scientist", imgSrc: "Images/user-3.png", id: 3 }
    ];
    // DOM elements
    const connectionRequestsList = document.getElementById('connectionRequests');
    const connectionsList = document.getElementById('connectionsList');
    const suggestionsList = document.getElementById('suggestionsList');


    function populateList(list, container, type) {
        container.innerHTML = ''; // Clear existing content
        list.forEach(item => {
            const div = document.createElement('div');
            div.className = 'profile';
            div.innerHTML = `
                <img src="${item.imgSrc}" alt="Profile picture of ${item.name}">
                <div class="info">
                    <strong>${item.name}</strong>
                    <p>${item.profession}</p>
                </div>
            `;


            // Adding specific buttons based on type
            const button = document.createElement('button');
            if (type === 'request') {
                button.textContent = 'Accept';
                button.onclick = () => acceptConnection(item.id);
            } else if (type === 'suggestion') {
                button.textContent = 'Connect';
                button.onclick = () => sendRequest(item.id);
            }
            div.appendChild(button);
            container.appendChild(div);
        });
    }


    function acceptConnection(id) {
        // Move from requests to connections
        const index = connectionRequests.findIndex(item => item.id === id);
        if (index !== -1) {
            connections.push(connectionRequests[index]);
            connectionRequests.splice(index, 1);
            populateList(connectionRequests, connectionRequestsList, 'request');
            populateList(connections, connectionsList, 'connection');
        }
    }


    function sendRequest(id) {
        // Move from suggestions to requests
        const index = suggestions.findIndex(item => item.id === id);
        if (index !== -1) {
            connectionRequests.push(suggestions[index]);
            suggestions.splice(index, 1);
            populateList(suggestions, suggestionsList, 'suggestion');
            populateList(connectionRequests, connectionRequestsList, 'request');
        }
    }


    // Initial population of lists
    populateList(connectionRequests, connectionRequestsList, 'request');
    populateList(connections, connectionsList, 'connection');
    populateList(suggestions, suggestionsList, 'suggestion');
});
// Your existing JavaScript for populating connections...


// Function to open the modal
function openModal(name, title, about, imgSrc) {
    document.getElementById('profileModal').style.display = 'block';
    document.getElementById('profileName').innerText = name;
    document.getElementById('profileTitle').innerText = title;
    document.getElementById('profileAbout').innerText = about;
    document.getElementById('profilePic').src = imgSrc;
}


// Function to close the modal
function closeModal() {
    document.getElementById('profileModal').style.display = 'none';
}


// Example use within your connection list (you will adapt this to your data structure)
document.getElementById('connectionsList').addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        // Extract the data attributes from the button (you'll need to set these when creating the buttons)
        const name = event.target.getAttribute('data-name');
        const title = event.target.getAttribute('data-title');
        const about = event.target.getAttribute('data-about');
        const imgSrc = event.target.getAttribute('data-img');
        openModal(name, title, about, imgSrc);
    }
});


// Close modal when user clicks on <span> (x)
document.querySelector('.close').addEventListener('click', closeModal);


// Close the modal when user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target === document.getElementById('profileModal')) {
        closeModal();
    }
};


// Your existing JavaScript...
