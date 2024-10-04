self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    const action = event.action;

    if (action === 'confirm') {
        console.log('Подтверждено');
    } else if (action === 'cancel') {
        console.log('Отменено');
    }

    notification.close();
});

self.addEventListener('install', event => {
    console.log('Service Worker установлен');
});

self.addEventListener('activate', event => {
    console.log('Service Worker активирован');
});