import type { NotificationOptions } from "@openfin/web-notifications-client";
import { getNotificationsClient, init } from "../platform/api";

const NOTIFICATION_CENTER_EVENT = "notificationCenterSetOpen";
const NOTIFICATION_CENTER_MESSAGE_TYPE = "notification-center-set-open";

/**
 * Sets status text for user feedback.
 * @param message Status message.
 * @param kind Status kind.
 */
function setStatus(message: string, kind: "info" | "error" | "success" = "info"): void {
	const statusElement = document.querySelector<HTMLElement>("#status");
	if (statusElement === null) {
		return;
	}

	statusElement.textContent = message;
	statusElement.classList.remove("status-info", "status-error", "status-success");
	statusElement.classList.add(`status-${kind}`);
}

/**
 * Creates a sample notification.
 * @param notification Notification payload.
 * @param toastType User-facing toast type label.
 */
async function sendNotification(
	notification: NotificationOptions,
	toastType: "transient" | "sticky"
): Promise<void> {
	try {
		await getNotificationsClient().create(notification);
		setStatus(`Created ${toastType} toast notification.`, "success");
	} catch (error) {
		setStatus(
			error instanceof Error ? error.message : "Unable to create notification. Check browser console.",
			"error"
		);
	}
}

/**
 * Sends center visibility intent to the provider host.
 * @param isOpen Should the notification center be open.
 */
function setNotificationCenterOpen(isOpen: boolean): void {
	const visibilityEvent = new CustomEvent<boolean>(NOTIFICATION_CENTER_EVENT, {
		detail: isOpen
	});
	window.dispatchEvent(visibilityEvent);
	window.parent.dispatchEvent(visibilityEvent);
	window.parent.postMessage(
		{
			type: NOTIFICATION_CENTER_MESSAGE_TYPE,
			isOpen
		},
		window.location.origin
	);
}

/**
 * Binds button interactions.
 */
function initializeDom(): void {
	const transientButton = document.querySelector<HTMLButtonElement>("#btnToastTransient");
	const stickyButton = document.querySelector<HTMLButtonElement>("#btnToastSticky");
	const toggleCenterButton = document.querySelector<HTMLButtonElement>("#btnToggleCenter");
	let isNotificationCenterOpen = true;

	/**
	 * Keeps toggle button text aligned with center state.
	 */
	function syncToggleCenterButton(): void {
		if (toggleCenterButton === null) {
			return;
		}
		toggleCenterButton.textContent = isNotificationCenterOpen
			? "Hide Notification Center"
			: "Show Notification Center";
	}

	if (transientButton !== null) {
		transientButton.addEventListener("click", () => {
			sendNotification(
				{
					template: "markdown",
					title: "Market price alert",
					body: "AAPL moved 1.2% in the last five minutes.",
					toast: "transient"
				},
				"transient"
			).catch((error: unknown) => {
				setStatus(error instanceof Error ? error.message : "Unable to create notification.", "error");
			});
		});
	}

	if (stickyButton !== null) {
		stickyButton.addEventListener("click", () => {
			sendNotification(
				{
					template: "markdown",
					title: "Approval required",
					body: "NatWest FX trade 84372 needs a second approver before execution.",
					toast: "sticky"
				},
				"sticky"
			).catch((error: unknown) => {
				setStatus(error instanceof Error ? error.message : "Unable to create notification.", "error");
			});
		});
	}

	if (toggleCenterButton !== null) {
		toggleCenterButton.addEventListener("click", () => {
			isNotificationCenterOpen = !isNotificationCenterOpen;
			setNotificationCenterOpen(isNotificationCenterOpen);
			syncToggleCenterButton();
			setStatus(
				isNotificationCenterOpen ? "Notification Center opened." : "Notification Center hidden.",
				"info"
			);
		});
	}

	syncToggleCenterButton();
}

window.addEventListener("DOMContentLoaded", async () => {
	try {
		await init();
		setStatus("Connected to notifications client. Notification Center is visible by default.", "success");
	} catch (error) {
		setStatus(error instanceof Error ? error.message : "Unable to initialize notifications client.", "error");
	}

	initializeDom();
});
