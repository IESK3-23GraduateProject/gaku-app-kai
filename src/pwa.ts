import { registerSW } from "virtual:pwa-register";
import { requestNotificationPermission } from "./pwa/notifications";

registerSW({
  immediate: true,
  onRegisteredSW(swScriptUrl) {
    // eslint-disable-next-line no-console
    console.log("SW registered: ", swScriptUrl);
  },
  onOfflineReady() {
    // eslint-disable-next-line no-console
    console.log("PWA application ready to work offline");
  },
});

requestNotificationPermission();
