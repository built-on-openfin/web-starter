import type { ButtonOptions, NotificationOptions, TemplateMarkdown } from "@openfin/notifications";
import { getNotificationsClient, init, type NotificationEventMap } from "../platform/api";
import {
	showActionableNotification,
	showBodyDismissActionNotification,
	showBodyDismissNotification,
	showCustomIndicatorNotification,
	showCustomNotification,
	showFormAdvancedNotification,
	showFormNotification,
	showIndicatorNotification,
	showReminderCancelNotification,
	showReminderNotification,
	showSoundNotification,
	showUpdatableNotification
} from "./examples";

const MAX_LOG_ENTRIES = 50;

/**
 * Controls whether a notification appears as a toast, stays visible, or skips toast display.
 */
type ToastMode = "transient" | "sticky" | "none";
/**
 * Categories used to style and label rows in the demo event log.
 */
type LogKind = "create" | "action" | "closed" | "toast-dismissed" | "count" | "info" | "error";

/**
 * Normalized form values used to build notification requests.
 */
interface NotificationFormValues {
	/**
	 * Notification title shown in the toast and Notification Center.
	 */
	title: string;
	/**
	 * Markdown body content rendered by the notification template.
	 */
	body: string;
	/**
	 * Toast display mode selected in the demo form.
	 */
	toast: ToastMode;
	/**
	 * Notification priority passed through to the API.
	 */
	priority: number;
	/**
	 * Whether to include the demo action buttons in the payload.
	 */
	includeButtons: boolean;
}

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
 * Renders the running notification count badge.
 * @param count Current count.
 */
function setCount(count: number): void {
	const countElement = document.querySelector<HTMLElement>("#notificationCount");
	if (countElement !== null) {
		countElement.textContent = String(count);
	}
}

/**
 * Appends an entry to the event log, trimming history past MAX_LOG_ENTRIES.
 * @param kind Log category, drives the row colour.
 * @param message Pre-formatted message text.
 */
function logEvent(kind: LogKind, message: string): void {
	const logElement = document.querySelector<HTMLElement>("#eventLog");
	if (logElement === null) {
		return;
	}

	const entry = document.createElement("div");
	entry.className = `log-entry log-${kind}`;

	const time = document.createElement("span");
	time.className = "log-time";
	time.textContent = new Date().toLocaleTimeString();

	const label = document.createElement("span");
	label.className = "log-kind";
	label.textContent = kind;

	const text = document.createElement("span");
	text.className = "log-message";
	text.textContent = message;

	entry.append(time, label, text);
	logElement.prepend(entry);

	while (logElement.childElementCount > MAX_LOG_ENTRIES) {
		logElement.lastElementChild?.remove();
	}
}

/**
 * Reads the create-notification form into a typed value object.
 * @returns Current form values, or null if any required field is missing.
 */
function readForm(): NotificationFormValues | null {
	const titleInput = document.querySelector<HTMLInputElement>("#nTitle");
	const bodyInput = document.querySelector<HTMLTextAreaElement>("#nBody");
	const toastInput = document.querySelector<HTMLSelectElement>("#nToast");
	const priorityInput = document.querySelector<HTMLSelectElement>("#nPriority");
	const buttonsInput = document.querySelector<HTMLInputElement>("#nIncludeButtons");

	if (
		titleInput === null ||
		bodyInput === null ||
		toastInput === null ||
		priorityInput === null ||
		buttonsInput === null
	) {
		return null;
	}

	const title = titleInput.value.trim();
	const body = bodyInput.value.trim();
	if (title === "" || body === "") {
		setStatus("Title and body are required.", "error");
		return null;
	}

	return {
		title,
		body,
		toast: (toastInput.value as ToastMode) ?? "transient",
		priority: Number.parseInt(priorityInput.value, 10) || 1,
		includeButtons: buttonsInput.checked
	};
}

/**
 * Builds a markdown-template notification payload from the form values.
 * Buttons carry an application-defined `onClick` payload so the action handler can
 * tell which button fired without inspecting DOM state.
 * @param values Form values from readForm().
 * @returns A NotificationOptions ready for create().
 */
function buildNotification(values: NotificationFormValues): NotificationOptions {
	const buttons: ButtonOptions[] | undefined = values.includeButtons
		? [
				{
					title: "Approve",
					onClick: { task: "approve", source: "demo" }
				},
				{
					title: "Dismiss",
					onClick: { task: "dismiss", source: "demo" }
				}
			]
		: undefined;

	const notification: TemplateMarkdown = {
		template: "markdown",
		title: values.title,
		body: values.body,
		toast: values.toast,
		priority: values.priority
	};

	if (buttons !== undefined) {
		notification.buttons = buttons;
	}

	return notification;
}

/**
 * Starts an async task from a synchronous DOM callback, surfacing errors in the status bar.
 * @param task Task to run.
 */
function runAsyncTask(task: () => Promise<void>): void {
	task().catch((error) => {
		console.error("Unexpected async handler failure.", error);
		setStatus(error instanceof Error ? error.message : "An error occurred.", "error");
	});
}

/**
 * Subscribes to a notification event and reports non-fatal subscription failures.
 * @param client Notifications client singleton.
 * @param type Event type to subscribe to.
 * @param handler Event handler.
 */
async function subscribeToNotificationEvent<K extends keyof NotificationEventMap>(
	client: ReturnType<typeof getNotificationsClient>,
	type: K,
	handler: (event: NotificationEventMap[K]) => void
): Promise<void> {
	try {
		await client.on(type, handler);
	} catch (error) {
		console.error(`Unable to subscribe to ${type}.`, error);
	}
}

/**
 * Creates a notification from the current form values.
 */
async function handleCreateClick(): Promise<void> {
	const values = readForm();
	if (values === null) {
		return;
	}

	try {
		const payload = buildNotification(values);
		await getNotificationsClient().create(payload);
		setStatus(`Created ${values.toast} notification "${values.title}".`, "success");
	} catch (error) {
		setStatus(error instanceof Error ? error.message : "Unable to create notification.", "error");
	}
}

/**
 * Clears all notifications owned by this client.
 */
async function handleClearAllClick(): Promise<void> {
	try {
		const count = await getNotificationsClient().clearAll();
		setStatus(`Cleared ${count} notification(s) from this client.`, "success");
		logEvent("info", `clearAll() removed ${count} notification(s).`);
	} catch (error) {
		setStatus(error instanceof Error ? error.message : "Unable to clear notifications.", "error");
	}
}

/**
 * Reads all notifications and writes a short summary into the log.
 */
async function handleGetAllClick(): Promise<void> {
	try {
		const notifications = await getNotificationsClient().getAll();
		const titles = notifications.map((notification) => notification.title).join(", ");
		const summary = notifications.length === 0 ? "(none)" : titles;
		setStatus(`getAll() returned ${notifications.length} notification(s).`, "info");
		logEvent("info", `getAll(): ${summary}`);
	} catch (error) {
		setStatus(error instanceof Error ? error.message : "Unable to list notifications.", "error");
	}
}

/**
 * Toggles the Notification Center.
 */
async function handleToggleCenterClick(): Promise<void> {
	try {
		await getNotificationsClient().toggleCenter();
		setStatus("Toggled Notification Center.", "info");
	} catch (error) {
		setStatus(error instanceof Error ? error.message : "Unable to toggle Notification Center.", "error");
	}
}

/**
 * Subscribes to every notification lifecycle event and renders them into the log.
 * Failures during subscription are non-fatal — the rest of the demo still works.
 */
async function bindEventLog(): Promise<void> {
	const client = getNotificationsClient();

	await subscribeToNotificationEvent(client, "notification-created", (event) => {
		logEvent("create", `${event.notification.title} (id=${event.notification.id.slice(0, 8)}…)`);
	});

	await subscribeToNotificationEvent(client, "notification-action", (event) => {
		const buttonTitle =
			event.control && event.control.type === "button" ? event.control.title : "(non-button)";
		const result = typeof event.result === "object" ? JSON.stringify(event.result) : String(event.result);
		logEvent("action", `${event.trigger} on "${buttonTitle}" → ${result}`);
	});

	await subscribeToNotificationEvent(client, "notification-closed", (event) => {
		logEvent("closed", `${event.notification.title} (id=${event.notification.id.slice(0, 8)}…)`);
	});

	await subscribeToNotificationEvent(client, "notification-toast-dismissed", (event) => {
		logEvent("toast-dismissed", `${event.notification.title} (id=${event.notification.id.slice(0, 8)}…)`);
	});

	await subscribeToNotificationEvent(client, "notifications-count-changed", (event) => {
		setCount(event.count);
		logEvent("count", `Notification center holds ${event.count} item(s).`);
	});

	await subscribeToNotificationEvent(client, "notification-form-submitted", (event) => {
		const data = event.form ? JSON.stringify(event.form) : "(none)";
		logEvent("action", `Form submitted (id=${event.notification.id.slice(0, 8)}…) → ${data}`);
	});
}

/** Wires up the Notification Center toggle button, tracking open/closed state locally. */
function bindToggleButton(): void {
	const toggleButton = document.querySelector<HTMLButtonElement>("#btnToggleCenter");
	if (toggleButton === null) {
		return;
	}

	toggleButton.addEventListener("click", () => {
		runAsyncTask(handleToggleCenterClick);
		const next = toggleButton.getAttribute("aria-pressed") !== "true";
		toggleButton.setAttribute("aria-pressed", String(next));
		toggleButton.textContent = next ? "Hide Notification Center" : "Show Notification Center";
	});
}

/**
 * Wires up every form button and the log controls. Pure DOM glue — all async work
 * funnels through the singleton client and surfaces success/failure on #status.
 */
function bindExamples(): void {
	const exampleButtons: [string, () => Promise<void>][] = [
		["#btnExBodyDismiss", showBodyDismissNotification],
		["#btnExBodyDismissAction", showBodyDismissActionNotification],
		["#btnExActionable", showActionableNotification],
		["#btnExForm", showFormNotification],
		["#btnExFormAdvanced", showFormAdvancedNotification],
		["#btnExUpdatable", showUpdatableNotification],
		["#btnExCustom", showCustomNotification],
		["#btnExSound", showSoundNotification],
		["#btnExIndicator", showIndicatorNotification],
		["#btnExCustomIndicator", showCustomIndicatorNotification],
		["#btnExReminder", showReminderNotification],
		["#btnExReminderCancel", showReminderCancelNotification]
	];
	for (const [id, handler] of exampleButtons) {
		document.querySelector<HTMLButtonElement>(id)?.addEventListener("click", () => {
			runAsyncTask(handler);
		});
	}
}

/**
 * Wires up the demo controls.
 */
function bindControls(): void {
	const createButton = document.querySelector<HTMLButtonElement>("#btnCreate");
	const clearAllButton = document.querySelector<HTMLButtonElement>("#btnClearAll");
	const getAllButton = document.querySelector<HTMLButtonElement>("#btnGetAll");
	const clearLogButton = document.querySelector<HTMLButtonElement>("#btnClearLog");

	createButton?.addEventListener("click", () => {
		runAsyncTask(handleCreateClick);
	});

	clearAllButton?.addEventListener("click", () => {
		runAsyncTask(handleClearAllClick);
	});

	getAllButton?.addEventListener("click", () => {
		runAsyncTask(handleGetAllClick);
	});

	clearLogButton?.addEventListener("click", () => {
		const logElement = document.querySelector<HTMLElement>("#eventLog");
		if (logElement !== null) {
			logElement.textContent = "";
		}
	});

	bindToggleButton();
	bindExamples();
}

window.addEventListener("DOMContentLoaded", async () => {
	try {
		await init();
		setStatus("Connected to notifications client. Notification Center is visible by default.", "success");
	} catch (error) {
		setStatus(error instanceof Error ? error.message : "Unable to initialize notifications client.", "error");
		return;
	}

	bindControls();

	try {
		const initialCount = await getNotificationsClient().getCount();
		setCount(initialCount);
	} catch (error) {
		console.warn("Unable to read initial notification count.", error);
	}

	await bindEventLog();
});
