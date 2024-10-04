let notificationScheduled = false;
let notificationTimeout;
let countdownTimer;

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0; // Сбрасываем звук на начало
    sound.play();
}

document.getElementById('notifyButton').addEventListener('click', () => {
    const seconds = parseInt(document.getElementById('secondsInput').value, 10);
    if (isNaN(seconds) || seconds < 1) {
        alert('Пожалуйста, введите корректное количество секунд.');
        return;
    }

    if (!('Notification' in window)) {
        alert('Ваш браузер не поддерживает уведомления.');
        return;
    }

    if (Notification.permission === 'granted') {
        registerServiceWorker(seconds);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                registerServiceWorker(seconds);
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

function registerServiceWorker(seconds) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker зарегистрирован:', registration);
                scheduleNotification(registration, seconds);
            })
            .catch(error => {
                console.log('Ошибка регистрации Service Worker:', error);
            });
    }
}

function scheduleNotification(registration, seconds) {
    if (notificationScheduled) {
        console.log('Уведомление уже запланировано');
        return;
    }

    notificationScheduled = true;
    const timeUntilNotification = seconds * 1000;
    const endTime = Date.now() + timeUntilNotification;

    setTimeout(() => {
        countdownTimer = setInterval(() => {
            const timeLeft = Math.max(0, endTime - Date.now());
            const secondsLeft = Math.ceil(timeLeft / 1000);
            document.getElementById('title').textContent = `Жди уведомление через ${secondsLeft} сек.`;
            document.getElementById('title').style.animation = 'none';
            document.getElementById('title').offsetHeight; /* trigger reflow */
            document.getElementById('title').style.animation = null; 

            if (timeLeft <= 0) {
                clearInterval(countdownTimer);
            }
        }, 1000);
    }, 1000); // Задержка в 1 секунду перед запуском таймера

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
            if (document.getElementById('soundCheckbox').checked) {
                playSound('notificationSound'); // Воспроизводим звук
            }
            clearInterval(countdownTimer); // Останавливаем таймер
            clearTimeout(notificationTimeout); // Очищаем таймаут
            notificationScheduled = false; // Сброс флага
            document.getElementById('title').textContent = 'Выпить воды'; // Возвращаем исходный текст
            document.getElementById('title').style.animation = 'slideIn 1s ease-in-out';
        })
        .catch(error => {
            console.error('Ошибка при показе уведомления:', error);
            clearInterval(countdownTimer); // Останавливаем таймер
            clearTimeout(notificationTimeout); // Очищаем таймаут
            notificationScheduled = false; // Сброс флага
            document.getElementById('title').textContent = 'Выпить воды'; // Возвращаем исходный текст
            document.getElementById('title').style.animation = 'slideIn 1s ease-in-out';
        });
}

