let notificationScheduled = false;
let notificationTimeout;
let countdownTimer;

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
    if (notificationScheduled) {
        console.log('Уведомление уже запланировано');
        return;
    }

    notificationScheduled = true;
    const timeUntilNotification = 60000; // 1 минута
    const endTime = Date.now() + timeUntilNotification;

    // Запускаем таймер для обновления текста в <h1>
    countdownTimer = setInterval(() => {
        const timeLeft = Math.max(0, endTime - Date.now());
        const secondsLeft = Math.ceil(timeLeft / 1000);
        document.getElementById('title').textContent = `Водопойка через ${secondsLeft} сек.`;

        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
        }
    }, 1000);

    notificationTimeout = setTimeout(() => {
        console.log('Создание уведомления запланировано');
        showNotification(registration);
    }, timeUntilNotification);
}

function showNotification(registration) {
    const options = {
        body: 'Пора попить водички',
        actions: [
            { action: 'confirm', title: 'Подтвердить' },
            { action: 'cancel', title: 'Отмена' }
        ]
    };

    registration.showNotification('Напоминание', options)
        .then(() => {
            console.log('Уведомление успешно создано и показано');
            clearInterval(countdownTimer); // Останавливаем таймер
            clearTimeout(notificationTimeout); // Очищаем таймаут
            notificationScheduled = false; // Сброс флага
            document.getElementById('title').textContent = 'Выпить воды'; // Возвращаем исходный текст
        })
        .catch(error => {
            console.error('Ошибка при показе уведомления:', error);
            clearInterval(countdownTimer); // Останавливаем таймер
            clearTimeout(notificationTimeout); // Очищаем таймаут
            notificationScheduled = false; // Сброс флага
            document.getElementById('title').textContent = 'Выпить воды'; // Возвращаем исходный текст
        });
}