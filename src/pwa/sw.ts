(self as unknown as ServiceWorkerGlobalScope).addEventListener("push", ((
  event: PushEvent
) => {
  console.log("Push event received:", event);

  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      (
        self as unknown as ServiceWorkerGlobalScope
      ).registration.showNotification(data.title, {
        body: data.body,
        icon: "/android-chrome.png",
        badge: "/android-chrome.png",
        data: { vibrate: [200, 100, 200] },
      })
    );
  }
}) as EventListener);

(self as unknown as ServiceWorkerGlobalScope).addEventListener(
  "notificationclick",
  ((event: NotificationEvent) => {
    event.notification.close();
    event.waitUntil(
      (self as unknown as ServiceWorkerGlobalScope).clients.openWindow("/")
    );
  }) as EventListener
);
