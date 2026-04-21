import { connect, type BaseConnectionOptions } from "@openfin/core-web";
import type { NotificationOptions } from "@openfin/web-notifications-client";
import { getSettings } from "./settings";

const CLIENT_ID = "web-toast-main";
const CLIENT_TITLE = "Web Toast Notifications";

/**
 * Singleton wrapper around @openfin/web-notifications-client.
 */
class NotificationsClient {
	private static _instance: NotificationsClient | null = null;

	private _connected: boolean = false;

	private _connecting: boolean = false;

	/**
	 * Returns the shared notifications client instance.
	 * @returns NotificationsClient singleton.
	 */
	public static getInstance(): NotificationsClient {
		NotificationsClient._instance ??= new NotificationsClient();
		return NotificationsClient._instance;
	}

	/**
	 * Connect this page as a notifications producer.
	 * @param finContext OpenFin context.
	 * @param serviceId Notification center service identifier.
	 */
	public async connect(finContext: unknown, serviceId: string): Promise<void> {
		if (this._connected || this._connecting) {
			return;
		}

		this._connecting = true;
		try {
			const { connectToNotifications } = await import("@openfin/web-notifications-client");
			await connectToNotifications({
				environment: "web",
				finContext,
				serviceId,
				id: CLIENT_ID,
				title: CLIENT_TITLE,
				icon: "./common/images/here.png"
			} as Parameters<typeof connectToNotifications>[0]);
			this._connected = true;
		} catch (error) {
			console.error("Unable to connect notification client.", error);
		} finally {
			this._connecting = false;
		}
	}

	/**
	 * Helper for creating markdown notifications quickly.
	 * @param title Notification title.
	 * @param body Notification body.
	 * @param toast Desktop toast mode.
	 */
	public async notify(
		title: string,
		body: string,
		toast: "transient" | "sticky" | "none" = "transient"
	): Promise<void> {
		await this.create({
			template: "markdown",
			title,
			body,
			toast
		});
	}

	/**
	 * Creates a notification.
	 * @param options Notification payload.
	 */
	public async create(options: NotificationOptions): Promise<void> {
		if (!this._connected) {
			console.warn("Notifications client is not connected.");
			return;
		}
		try {
			const { create } = await import("@openfin/web-notifications-client");
			await create(options);
		} catch (error) {
			console.error("Unable to create notification.", error);
			throw error;
		}
	}
}

/**
 * Initializes the OpenFin Web Broker connection.
 * @param inherit Should we inherit settings from the host (available in the OpenFin layout system) or use settings? Default is true.
 */
export async function init(inherit: boolean = false): Promise<void> {
	let options: BaseConnectionOptions | undefined;
	let settings = await getSettings();
	if (settings === undefined) {
		console.error("Unable to initialize API because the web manifest custom_settings could not be loaded.");
		return;
	}

	if (window.fin === undefined) {
		if (!inherit) {
			options = {
				brokerUrl: settings.platform.interop.brokerUrl,
				interopConfig: {
					providerId: settings.platform.interop.providerId,
					currentContextGroup: settings.platform.interop.defaultContextGroup
				}
			};
		}
		if (options) {
			window.fin = await connect({
				options
			});
		} else {
			window.fin = await connect({
				connectionInheritance: "enabled"
			});
		}
	}

	if (window.fdc3 === undefined && window?.fin?.me.interop?.getFDC3Sync !== undefined) {
		window.fdc3 = fin.me.interop.getFDC3Sync("2.0");
	}

	settings = settings ?? (await getSettings());
	if (settings === undefined || window.fin === undefined) {
		return;
	}

	const notificationsClient = NotificationsClient.getInstance();
	await notificationsClient.connect(window.fin, settings.platform.notificationServiceId);
}

/**
 * Returns the connected notifications client.
 * @returns NotificationsClient singleton.
 */
export function getNotificationsClient(): NotificationsClient {
	return NotificationsClient.getInstance();
}
