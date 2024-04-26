document.addEventListener('DOMContentLoaded', function () {
    const notifications = [
        { id: 1, text: 'New connection request', read: false },
        { id: 2, text: 'New message from Jane Doe', read: false },
        { id: 3, text: 'Reminder: Meeting at 3PM today', read: true }
    ];


    const notificationList = document.getElementById('notificationList');


    function createNotificationItem(notification) {
        const li = document.createElement('li');
        li.className = 'notification-item';
        if (notification.read) {
            li.style.background = '#e8e8e8';
        }
        li.innerHTML = `
            <p>${notification.text}</p>
            <div>
                <button class="button read-button" onclick="markAsRead(${notification.id})">Mark as Read</button>
                <button class="button delete-button" onclick="deleteNotification(${notification.id})">Delete</button>
            </div>
        `;
        return li;
    }


    notifications.forEach(notification => {
        notificationList.appendChild(createNotificationItem(notification));
    });


    window.markAsRead = function (id) {
        const notification = notifications.find(n => n.id === id);
        if (notification && !notification.read) {
            notification.read = true;
            renderNotifications();
        }
    };


    window.deleteNotification = function (id) {
        const index = notifications.findIndex(n => n.id === id);
        if (index !== -1) {
            notifications.splice(index, 1);
            renderNotifications();
        }
    };


    function renderNotifications() {
        notificationList.innerHTML = '';
        notifications.forEach(notification => {
            notificationList.appendChild(createNotificationItem(notification));
        });
    }
});