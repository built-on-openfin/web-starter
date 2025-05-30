import { create, hide, type NotificationOptions, show } from "@openfin/web-notifications-client";
import { init } from "../platform/api";

window.addEventListener("DOMContentLoaded", async () => {
	await init();
	await initializeDom();
});

/**
 * Initialize the DOM elements.
 */
async function initializeDom(): Promise<void> {
	const btnShowCenter = document.querySelector("#btnShowCenter");
	if (btnShowCenter) {
		btnShowCenter.addEventListener("click", showCenter);
	}

	const btnHideCenter = document.querySelector("#btnHideCenter");
	if (btnHideCenter) {
		btnHideCenter.addEventListener("click", hideCenter);
	}

	const btnNotificationSimple = document.querySelector("#btnNotificationSimple");
	if (btnNotificationSimple) {
		btnNotificationSimple.addEventListener("click", async () => showSimpleNotification());
	}
}

/**
 * Show the notification center
 */
function showCenter(): void {
	show();
}

/**
 * Hide the notification center
 */
function hideCenter(): void {
	hide();
}

/**
 * Display a very basic simple notification.
 */
async function showSimpleNotification(): Promise<void> {
	const notification: NotificationOptions = {
		title: "Simple Notification",
		body: "This is a simple notification",
		toast: "transient",
		template: "markdown",
		id: globalThis.crypto.randomUUID(),
		soundOptions: {
			mode: "silent"
		},
		platform: "web-notifications-platform"
	};

	await create(notification);
}
