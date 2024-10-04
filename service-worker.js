self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    const action = event.action;

    if (action === 'confirm') {
        console.log('Пользователь подтвердил напоминание');
        notification.close();
        clearInterval(countdownTimer); // Останавливаем таймер
        clearTimeout(notificationTimeout); // Очищаем таймаут
        notificationScheduled = false; // Сброс флага
        document.getElementById('title').textContent = 'Выпить воды'; // Возвращаем исходный текст
        document.getElementById('title').style.animation = 'slideIn 1s ease-in-out';
    } else if (action === 'cancel') {
        console.log('Пользователь отклонил напоминание');
        notification.close();
        clearInterval(countdownTimer); // Останавливаем таймер
        clearTimeout(notificationTimeout); // Очищаем таймаут
        notificationScheduled = false; // Сброс флага
        document.getElementById('title').textContent = 'Выпить воды'; // Возвращаем исходный текст
        document.getElementById('title').style.animation = 'slideIn 1s ease-in-out';
    } else {
        console.log('Пользователь кликнул на уведомление');
        notification.close();
        clearInterval(countdownTimer); // Останавливаем таймер
        clearTimeout(notificationTimeout); // Очищаем таймаут
        notificationScheduled = false; // Сброс флага
        document.getElementById('title').textContent = 'Выпить воды'; // Возвращаем исходный текст
        document.getElementById('title').style.animation = 'slideIn 1s ease-in-out';
    }
});