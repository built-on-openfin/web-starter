import {
	create,
	hide,
	IndicatorColor,
	type NotificationOptions,
	show
} from "@openfin/web-notifications-client";
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

	const btnNotificationInteractive = document.querySelector("#btnNotificationInteractive");
	if (btnNotificationInteractive) {
		btnNotificationInteractive.addEventListener("click", async () => showInteractiveNotification());
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
		platform: "web-notifications-platform"
	};
	await create(notification);
}

/**
 * Display a
 */
async function showInteractiveNotification(): Promise<void> {
	const notification: NotificationOptions = {
		indicator: {
			color: IndicatorColor.ORANGE,
			fallback: IndicatorColor.ORANGE,
			text: "News Alert"
		},
		icon: "https://cdn.openfin.co/examples/notifications/company-B.png",
		title: "US added 138K jobs; Lower than target 185K",
		body: "After more than a decade of growth, U.S. nonfarm payrolls shrunk by 701,000, and the unemployment rate rose to 4.4%...",
		buttons: [
			{
				title: "Read More",
				type: "button",
				cta: true,
				onClick: () => window.open("https://myexample.com/news/employment", "_blank")
			}
		],
		soundOptions: {
			mode: "silent"
		}
	};
	await create(notification);
}
