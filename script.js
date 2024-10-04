document.getElementById('notifyButton').addEventListener('click', () => {
    // Проверяем, поддерживает ли браузер Notification API
    if (!('Notification' in window)) {
        alert('Ваш браузер не поддерживает уведомления.');
        return;
    }

    // Запрашиваем разрешение на отправку уведомлений
    if (Notification.permission === 'granted') {
        registerServiceWorker();
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                registerServiceWorker();
            } else {
                alert('Разрешение на уведомления не предоставлено.');
            }
        }).catch(error => {
            console.error('Ошибка при запросе разрешения:', error);
        });
    } else {
        alert('Разрешение на уведомления не предоставлено.');
    }
});

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker зарегистрирован:', registration);
                scheduleNotification(registration);
            })
            .catch(error => {
                console.log('Ошибка регистрации Service Worker:', error);
            });
    }
}

function scheduleNotification(registration) {
    setTimeout(() => {
        showNotification(registration);
    }, 60000);
}

function showNotification(registration) {
    const options = {
        body: 'Это ваше напоминание!',
        actions: [
            { action: 'confirm', title: 'Подтвердить' },
            { action: 'cancel', title: 'Отмена' }
        ]
    };

    registration.showNotification('Напоминание', options)
        .then(() => {
            console.log('Уведомление показано');
        })
        .catch(error => {
            console.error('Ошибка при показе уведомления:', error);
        });
}