document.addEventListener("DOMContentLoaded", function() {
    const postText = document.getElementById('postText');
    const photoVideo = document.getElementById('photoVideo');
    const postButton = document.getElementById('postButton');
    const postContainer = document.getElementById('postContainer');


    let mediaFiles = [];


    // Enable/disable the post button based on input
    function togglePostButton() {
        const hasText = postText.value.trim().length > 0;
        const hasMedia = mediaFiles.length > 0;
        postButton.disabled = !(hasText || hasMedia);
    }


    // Add event listeners
    postText.addEventListener('input', togglePostButton);
    photoVideo.addEventListener('change', (event) => {
        mediaFiles = Array.from(event.target.files);
        togglePostButton();
    });


    postButton.addEventListener('click', () => {
        const postData = {
            author: "Michael Hunt", // Change to actual user name
            timestamp: "Just now",
            content: postText.value.trim(),
            likes: 0 // Initialize likes to 0
        };


        createPost(postData);


        // Reset input fields
        postText.value = '';
        photoVideo.value = '';
        mediaFiles = [];
        togglePostButton();
    });


    function createPost(postData) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');


        const postUser = document.createElement('div');
        postUser.classList.add('postUser');
        const userProfileImg = document.createElement('img');
        userProfileImg.src = "Images/user-1.png"; // Change to actual user profile image
        postUser.appendChild(userProfileImg);
        const postUserInfo = document.createElement('div');
        const postUserName = document.createElement('h1');
        postUserName.textContent = postData.author;
        postUserInfo.appendChild(postUserName);
        const postTime = document.createElement('small');
        postTime.textContent = postData.timestamp;
        postUserInfo.appendChild(postTime);
        postUser.appendChild(postUserInfo);
        postElement.appendChild(postUser);


        if (postData.content) {
            const postContent = document.createElement('p');
            postContent.textContent = postData.content;
            postElement.appendChild(postContent);
        }


        if (mediaFiles.length > 0) {
            const postMediaElement = document.createElement('div');
            postMediaElement.classList.add('post-media');
            mediaFiles.forEach((file) => {
                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.height = 600;
                    postMediaElement.appendChild(img);
                } else if (file.type.startsWith('video/')) {
                    const video = document.createElement('video');
                    video.src = URL.createObjectURL(file);
                    video.controls = true;
                    postMediaElement.appendChild(video);
                }
            });
            postElement.appendChild(postMediaElement);
        }


        const postInteractions = document.createElement('div');
        postInteractions.classList.add('postInteractions');
        const likeButton = document.createElement('button');
        likeButton.textContent = "Like";
        postInteractions.appendChild(likeButton);
        const commentButton = document.createElement('button');
        commentButton.textContent = "Comment";
        postInteractions.appendChild(commentButton);
        const shareButton = document.createElement('button');
        shareButton.textContent = "Share";
        postInteractions.appendChild(shareButton);
        postElement.appendChild(postInteractions);


        postContainer.insertBefore(postElement, postContainer.firstChild);
    }
});
