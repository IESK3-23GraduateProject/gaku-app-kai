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

export async function sendPushNotification(
  title: string,
  body: string,
  newsId: number
) {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.ready;
    registration.showNotification(title, {
      body,
      icon: "/android-chrome.png",
      badge: "/android-chrome.png",
      data: { url: `http://localhost:4321/news/${newsId}` }, // Pass URL to open
    });
  } else {
    console.error("Service Worker is not registered.");
  }
}
