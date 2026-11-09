import { create, IndicatorColor, type NotificationOptions } from "@openfin/notifications";

let notificationCount = 0;

/**
 * Creates a notification with a unique id.
 * @param options The notification options.
 */
async function createSample(options: NotificationOptions): Promise<void> {
	notificationCount++;
	await create({ ...options, id: `theming-sample-${Date.now()}-${notificationCount}` });
}

/**
 * Shows a notification with a call-to-action and a secondary button.
 */
export async function showButtonsNotification(): Promise<void> {
	await createSample({
		title: "Order approved",
		body: "Call-to-action and secondary buttons are styled by the Notification Center theme.",
		template: "markdown",
		toast: "transient",
		buttons: [
			{ title: "View order", type: "button", cta: true },
			{ title: "Dismiss", type: "button" }
		]
	});
}

/**
 * Shows a sticky notification with form fields.
 */
export async function showFormNotification(): Promise<void> {
	await createSample({
		title: "Confirm quantity",
		body: "Form fields are styled by the Notification Center theme.",
		template: "markdown",
		toast: "sticky",
		form: [
			{
				key: "quantity",
				label: "Quantity",
				type: "number",
				widget: { type: "Number", min: 1, max: 1000 }
			},
			{
				key: "note",
				label: "Note",
				type: "string",
				widget: { type: "Text", placeholder: "Optional note" }
			}
		],
		buttons: [
			{ title: "Submit", type: "button", cta: true, submit: true },
			{ title: "Cancel", type: "button" }
		]
	});
}

/**
 * Shows a notification with a critical indicator.
 */
export async function showIndicatorNotification(): Promise<void> {
	await createSample({
		title: "Limit breached",
		body: "Indicators use the built-in indicator colors on a themed card.",
		template: "markdown",
		toast: "transient",
		indicator: { color: IndicatorColor.RED, text: "Critical" }
	});
}
