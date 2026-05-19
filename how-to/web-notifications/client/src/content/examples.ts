import {
	ActionBodyClickType,
	IndicatorColor,
	cancelReminder,
	setReminder,
	update,
	type UpdatableNotificationOptions
} from "@openfin/notifications";

import { getNotificationsClient } from "../platform/api";
import { randomUUID } from "../utils";

const ICON_URL = `${window.location.origin}/common/images/here.png`;
const SOUND_URL = `${window.location.origin}/assets/notification.mp3`;

// --- Updatable notification state ---
const updatableMap: { [id: string]: number } = {};
let updatableTimerId: number | undefined;

// --- Countdown/reminder state ---
const countdownMap: { [id: string]: { secondsRemaining: number; reminderDate: Date } } = {};
let countdownTimerId: number | undefined;

const cancelCountdownMap: { [id: string]: { secondsRemaining: number } } = {};
let cancelCountdownTimerId: number | undefined;

/** Show a notification where clicking the body dismisses it and fires a notification-action event. */
export async function showBodyDismissNotification(): Promise<void> {
	await getNotificationsClient().create({
		title: "Simple Notification",
		body: "This is a simple notification that can be dismissed by clicking the body",
		toast: "transient",
		template: "markdown",
		id: randomUUID(),
		onSelect: { BODY_CLICK: ActionBodyClickType.DISMISS_EVENT }
	});
}

/** Show a notification where clicking the body dismisses it and carries custom action data. */
export async function showBodyDismissActionNotification(): Promise<void> {
	await getNotificationsClient().create({
		title: "Simple Notification",
		body: "Click the body to dismiss and trigger a custom action",
		toast: "transient",
		template: "markdown",
		id: randomUUID(),
		onSelect: { BODY_CLICK: ActionBodyClickType.DISMISS_EVENT },
		customData: { action: "custom-action", data: { message: "Body click custom action" } }
	});
}

/** Show a notification with Acknowledge and Cancel action buttons. */
export async function showActionableNotification(): Promise<void> {
	await getNotificationsClient().create({
		title: "Actionable Notification",
		body: "This is a notification that has an action",
		toast: "transient",
		template: "markdown",
		id: randomUUID(),
		buttons: [
			{
				title: "Acknowledged",
				type: "button",
				cta: true,
				onClick: { task: "acknowledge-task", customData: { message: "This is the response data" } }
			},
			{ title: "Cancel", type: "button" }
		]
	});
}

/** Show a notification with a number form field and a Save/Cancel button pair. */
export async function showFormNotification(): Promise<void> {
	await getNotificationsClient().create({
		title: "Form Notification",
		body: "This is a notification that has form data",
		toast: "transient",
		template: "markdown",
		id: randomUUID(),
		form: [
			{
				key: "amount",
				label: "Amount",
				type: "number",
				widget: { type: "Number", max: 100, min: 1 },
				validation: {
					min: { arg: 1, invalidMessage: "Must be at least 1" },
					max: { arg: 100, invalidMessage: "Cannot be more than 100" },
					required: { arg: true }
				}
			}
		],
		buttons: [
			{ title: "Save", type: "button", cta: true, submit: true },
			{ title: "Cancel", type: "button" }
		]
	});
}

/** Show a notification with a rich form containing text, time, date, dropdown, radio, checkbox, and number fields. */
export async function showFormAdvancedNotification(): Promise<void> {
	await getNotificationsClient().create({
		title: "Form Advanced Notification",
		body: "This is a notification that has form data",
		toast: "transient",
		template: "markdown",
		id: randomUUID(),
		form: [
			{
				type: "string",
				key: "book",
				label: "Book",
				helperText: "Used to look up a book",
				widget: { type: "Text", placeholder: "Book name" },
				validation: {
					min: { arg: 7, invalidMessage: "Must be at least 7 chars long" },
					max: { arg: 9, invalidMessage: "Must be at most 9 chars long" },
					required: { arg: true }
				},
				value: "1234554"
			},
			{
				type: "time",
				key: "what_time",
				label: "Choose time?",
				helperText: "Some time choosing helper text",
				value: { hour: 12 },
				validation: { required: { arg: true } },
				widget: { type: "Time" }
			},
			{
				type: "date",
				key: "date_pickup",
				label: "When to pick up?",
				helperText: "Some date choosing helper text",
				validation: { required: { arg: true } },
				widget: { type: "Date" }
			},
			{
				type: "string",
				key: "book2",
				label: "Book Type",
				helperText: "Used to look up a book",
				validation: { required: { arg: true } },
				widget: {
					type: "Dropdown",
					options: [
						{ value: "book1", label: "Book 1" },
						{ value: "book2", label: "Book 2" },
						{ value: "book3", label: "Book 3" }
					]
				}
			},
			{
				type: "radioGroup",
				key: "radioGroupDemo",
				label: "Choose one",
				helperText: "Some radio choosing helper text",
				value: "option_1",
				validation: { required: { arg: true } },
				widget: {
					type: "RadioGroup",
					group: [
						{ label: "Option 1", value: "option_1" },
						{ label: "Option 2", value: "option_2" },
						{ label: "Option 3", value: "option_3" }
					]
				}
			},
			{
				type: "checkboxGroup",
				key: "checkboxGroupDemo",
				label: "Choose multiple",
				helperText: "Some checkbox choosing helper text",
				value: ["option_1", "option_2"],
				validation: { required: { arg: true } },
				widget: {
					type: "CheckboxGroup",
					group: [
						{ label: "Option 1", value: "option_1" },
						{ label: "Option 2", value: "option_2" },
						{ label: "Option 3", value: "option_3" }
					]
				}
			},
			{
				type: "string",
				key: "description",
				label: "Description",
				value: "very long text....",
				helperText: "Describe the book",
				widget: { type: "Text", multiline: true, placeholder: "Write description", rows: 5 }
			},
			{
				type: "number",
				key: "age",
				label: "Age",
				helperText: "Used to look up a book",
				widget: { type: "Number", placeholder: "Enter age", min: 1, max: 8 },
				validation: {
					min: { arg: 0 },
					max: { arg: 9 },
					required: { arg: true }
				}
			}
		],
		buttons: [
			{ title: "Save", type: "button", cta: true, submit: true },
			{ title: "Cancel", type: "button" }
		]
	});
}

/** Show a notification whose body text updates every second until it is closed. */
export async function showUpdatableNotification(): Promise<void> {
	const id = randomUUID();
	updatableMap[id] = 0;

	if (Object.keys(updatableMap).length === 1) {
		updatableTimerId = window.setInterval(async () => {
			for (const notificationId of Object.keys(updatableMap)) {
				updatableMap[notificationId]++;
				const payload: UpdatableNotificationOptions = {
					template: "markdown",
					body: `This is an updatable notification ${updatableMap[notificationId]}`,
					id: notificationId
				};
				try {
					await update(payload);
				} catch {
					delete updatableMap[notificationId];
				}
			}
			if (Object.keys(updatableMap).length === 0) {
				window.clearInterval(updatableTimerId);
				updatableTimerId = undefined;
			}
		}, 1000);
	}

	await getNotificationsClient().create({
		title: "Updatable Notification",
		body: "This is an updatable notification",
		toast: "transient",
		template: "markdown",
		id
	});
}

/** Show a notification built with a fully custom layout template. */
export async function showCustomNotification(): Promise<void> {
	await getNotificationsClient().create({
		title: "Custom Notification",
		toast: "transient",
		template: "custom",
		id: randomUUID(),
		templateOptions: {
			body: {
				compositions: [
					{
						minTemplateAPIVersion: "1",
						layout: {
							type: "container",
							style: { display: "flex", flexDirection: "column", gap: "10px" },
							children: [
								{
									type: "text",
									dataKey: "subTitle",
									style: { fontSize: "12px", fontWeight: "bold" }
								},
								{
									type: "container",
									style: { display: "flex", flexDirection: "column", marginBottom: "10px" },
									children: [
										{ type: "text", dataKey: "firstValueTitle", style: { fontSize: "12px" } },
										{
											type: "text",
											dataKey: "firstValue",
											style: { fontSize: "14px", color: "var(--openfin-ui-brandPrimary)" }
										}
									]
								},
								{
									type: "container",
									style: { display: "flex", flexDirection: "column", marginBottom: "10px" },
									children: [
										{ type: "text", dataKey: "secondValueTitle", style: { fontSize: "12px" } },
										{
											type: "text",
											dataKey: "secondValue",
											style: { fontSize: "14px", color: "var(--openfin-ui-brandPrimary)" }
										}
									]
								},
								{ type: "image", dataKey: "iconUrl", style: { height: "40px" } },
								{
									type: "actionableText",
									dataKey: "linkTitle",
									tooltipKey: "linkTooltip",
									onClick: { actionId: "open-web-site", url: "https://here.com" }
								}
							]
						}
					}
				]
			}
		},
		templateData: {
			subTitle: "Sub Title",
			firstValueTitle: "First Value",
			firstValue: "100",
			secondValueTitle: "Second Value",
			secondValue: "200",
			iconUrl: ICON_URL,
			linkTitle: "HERE Website",
			linkTooltip: "https://here.com"
		}
	});
}

/** Show a notification and attempt to play a sound file alongside it. */
export async function showSoundNotification(): Promise<void> {
	await getNotificationsClient().create({
		title: "Sound Notification",
		body: "This is a notification with sound 🔉",
		toast: "transient",
		template: "markdown",
		soundOptions: { mode: "silent" },
		id: randomUUID()
	});
	try {
		const audio = new Audio(SOUND_URL);
		await audio.play();
	} catch {
		// No audio file present — notification still fires
	}
}

/** Show a notification with a red indicator bar aligned to the left. */
export async function showIndicatorNotification(): Promise<void> {
	await getNotificationsClient().create({
		title: "Indicator Notification",
		toast: "transient",
		indicator: { text: "Limit" },
		template: "custom",
		id: randomUUID(),
		templateOptions: {
			body: {
				compositions: [
					{
						minTemplateAPIVersion: "1",
						layout: {
							type: "container",
							style: { display: "flex", flexDirection: "column", gap: "10px" },
							children: [{ type: "text", dataKey: "content" }]
						}
					}
				]
			},
			indicator: { align: "left", color: IndicatorColor.RED }
		},
		templateData: { content: "Custom notification with a red indicator on the left" }
	});
}

/** Show a notification with a right-aligned orange ALERT indicator. */
export async function showCustomIndicatorNotification(): Promise<void> {
	await getNotificationsClient().create({
		title: "Custom Indicator Notification",
		toast: "transient",
		template: "custom",
		id: randomUUID(),
		templateOptions: {
			body: {
				compositions: [
					{
						minTemplateAPIVersion: "1",
						layout: {
							type: "container",
							style: { display: "flex", flexDirection: "column", gap: "10px" },
							children: [{ type: "text", dataKey: "content" }]
						}
					}
				]
			},
			indicator: { align: "right" }
		},
		indicator: { color: IndicatorColor.ORANGE, text: "ALERT!!!" },
		templateData: { content: "Custom notification with a right-aligned indicator" }
	});
}

/**
 * Creates a countdown notification that sets a reminder when it reaches zero.
 * @param title Notification title.
 * @param reminderDate Date at which the reminder should fire.
 * @param countdownSeconds Seconds to count down before setting the reminder.
 * @param onReminderSet Optional callback invoked with the notification id once the reminder is set.
 */
async function createReminderNotification(
	title: string,
	reminderDate: Date,
	countdownSeconds: number,
	onReminderSet?: (id: string) => void
): Promise<void> {
	const id = randomUUID();
	countdownMap[id] = { secondsRemaining: countdownSeconds, reminderDate };

	if (countdownTimerId === undefined) {
		countdownTimerId = window.setInterval(async () => {
			for (const notificationId of Object.keys(countdownMap)) {
				const entry = countdownMap[notificationId];
				entry.secondsRemaining--;

				if (entry.secondsRemaining > 0) {
					const payload: UpdatableNotificationOptions = {
						template: "markdown",
						body: `Setting reminder in ${entry.secondsRemaining} second${entry.secondsRemaining !== 1 ? "s" : ""}...`,
						id: notificationId
					};
					try {
						await update(payload);
					} catch {
						/* notification closed */
					}
				} else {
					try {
						await setReminder(notificationId, entry.reminderDate);
						const payload: UpdatableNotificationOptions = {
							template: "markdown",
							body: `Reminder set for ${entry.reminderDate.toLocaleString()}`,
							id: notificationId
						};
						try {
							await update(payload);
						} catch {
							/* notification closed */
						}
						onReminderSet?.(notificationId);
					} catch {
						/* setReminder not supported or failed */
					}
					delete countdownMap[notificationId];
				}
			}
			if (Object.keys(countdownMap).length === 0) {
				window.clearInterval(countdownTimerId);
				countdownTimerId = undefined;
			}
		}, 1000);
	}

	await getNotificationsClient().create({
		title,
		body: `Setting reminder in ${countdownSeconds} second${countdownSeconds !== 1 ? "s" : ""}...`,
		toast: "transient",
		template: "markdown",
		id
	});
}

/** Show a notification that counts down 5 seconds and then sets a reminder 2 minutes in the future. */
export async function showReminderNotification(): Promise<void> {
	const reminderDate = new Date(Date.now() + 120_000);
	await createReminderNotification("Reminder Notification", reminderDate, 5);
}

/** Show a notification that sets a reminder and then counts down 10 seconds before cancelling it. */
export async function showReminderCancelNotification(): Promise<void> {
	const reminderDate = new Date(Date.now() + 120_000);
	await createReminderNotification("Reminder Cancel Notification", reminderDate, 5, (id) => {
		cancelCountdownMap[id] = { secondsRemaining: 10 };

		if (cancelCountdownTimerId === undefined) {
			cancelCountdownTimerId = window.setInterval(async () => {
				for (const notificationId of Object.keys(cancelCountdownMap)) {
					const entry = cancelCountdownMap[notificationId];
					entry.secondsRemaining--;

					if (entry.secondsRemaining > 0) {
						const payload: UpdatableNotificationOptions = {
							template: "markdown",
							body: `Canceling reminder in ${entry.secondsRemaining} second${entry.secondsRemaining !== 1 ? "s" : ""}...`,
							id: notificationId
						};
						try {
							await update(payload);
						} catch {
							/* notification closed */
						}
					} else {
						try {
							await cancelReminder(notificationId);
							const payload: UpdatableNotificationOptions = {
								template: "markdown",
								body: "Reminder cancelled",
								id: notificationId
							};
							try {
								await update(payload);
							} catch {
								/* notification closed */
							}
						} catch {
							/* cancelReminder not supported or failed */
						}
						delete cancelCountdownMap[notificationId];
					}
				}
				if (Object.keys(cancelCountdownMap).length === 0) {
					window.clearInterval(cancelCountdownTimerId);
					cancelCountdownTimerId = undefined;
				}
			}, 1000);
		}
	});
}
