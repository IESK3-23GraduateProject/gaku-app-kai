export function requestNotificationPermission(): Promise<void> {
  if ("Notification" in window) {
    return Notification.requestPermission().then((permission) => {
      console.log(`Notification permission: ${permission}`);
    });
  }
  return Promise.resolve();
}

export function showNotification(
  title: string,
  options?: NotificationOptions
): Promise<void> {
  if ("serviceWorker" in navigator) {
    return navigator.serviceWorker.ready.then(
      (registration: ServiceWorkerRegistration) => {
        console.log("Service Worker is ready:", registration);
        return registration.showNotification(title, options);
      }
    );
  }
  console.error("Service Worker not supported.");
  return Promise.resolve();
}

(window as any).showNotification = showNotification;
