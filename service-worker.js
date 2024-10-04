self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    const action = event.action;

    if (action === 'confirm') {
        // Обработка действия "Подтвердить"
        console.log('Пользователь подтвердил напоминание');
        notification.close();
        clearInterval(countdownTimer); // Останавливаем таймер
        clearTimeout(notificationTimeout); // Очищаем таймаут
        notificationScheduled = false; // Сброс флага
        document.getElementById('title').textContent = 'Выпить воды'; // Возвращаем исходный текст
    } else if (action === 'cancel') {
        // Обработка действия "Отмена"
        console.log('Пользователь отклонил напоминание');
        notification.close();
        clearInterval(countdownTimer); // Останавливаем таймер
        clearTimeout(notificationTimeout); // Очищаем таймаут
        notificationScheduled = false; // Сброс флага
        document.getElementById('title').textContent = 'Выпить воды'; // Возвращаем исходный текст
    } else {
        // Если пользователь просто кликнул на уведомление
        console.log('Пользователь кликнул на уведомление');
        notification.close();
        clearInterval(countdownTimer); // Останавливаем таймер
        clearTimeout(notificationTimeout); // Очищаем таймаут
        notificationScheduled = false; // Сброс флага
        document.getElementById('title').textContent = 'Выпить воды'; // Возвращаем исходный текст
    }
});

self.addEventListener('install', event => {
    console.log('Service Worker установлен');
});

self.addEventListener('activate', event => {
    console.log('Service Worker активирован');
});