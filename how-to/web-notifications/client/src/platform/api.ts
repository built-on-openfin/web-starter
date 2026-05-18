import { connect, type BaseConnectionOptions } from "@openfin/core-web";
import {
	addEventListener,
	clear,
	clearAll,
	connectToNotifications,
	create,
	getAll,
	getNotificationsCount,
	toggleNotificationCenter,
	type Notification,
	type NotificationActionEvent,
	type NotificationClosedEvent,
	type NotificationCreatedEvent,
	type NotificationOptions,
	type NotificationsCountChanged,
	type NotificationToastDismissedEvent
} from "@openfin/web-notifications-client";
import { getSettings } from "./settings";

const CLIENT_ID = "web-notifications-main";
const CLIENT_TITLE = "Web Notifications";

/**
 * Event-name → payload mapping for listeners surfaced through the singleton.
 */
export interface NotificationEventMap {
	/**
	 * Fired after a notification is created.
	 */
	"notification-created": NotificationCreatedEvent;
	/**
	 * Fired when a user interacts with a notification control.
	 */
	"notification-action": NotificationActionEvent;
	/**
	 * Fired when a notification closes.
	 */
	"notification-closed": NotificationClosedEvent;
	/**
	 * Fired when a toast is dismissed without removing the notification from the center.
	 */
	"notification-toast-dismissed": NotificationToastDismissedEvent;
	/**
	 * Fired when the Notification Center item count changes.
	 */
	"notifications-count-changed": NotificationsCountChanged;
}

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
	 * Creates a notification.
	 * @param options Notification payload.
	 * @returns The created notification record.
	 */
	public async create(options: NotificationOptions): Promise<Notification | undefined> {
		this.requireConnected();
		return create(options);
	}

	/**
	 * Returns every notification this client has created that is still in the Notification Center.
	 * @returns Array of notifications.
	 */
	public async getAll(): Promise<Notification[]> {
		this.requireConnected();
		return getAll();
	}

	/**
	 * Removes a single notification by id.
	 * @param id Notification id.
	 * @returns True if the notification was removed.
	 */
	public async clear(id: string): Promise<boolean> {
		this.requireConnected();
		return clear(id);
	}

	/**
	 * Removes every notification this client has created.
	 * @returns Count of notifications removed.
	 */
	public async clearAll(): Promise<number> {
		this.requireConnected();
		return clearAll();
	}

	/**
	 * Number of notifications currently in the Notification Center (across all sources).
	 * @returns Notification count.
	 */
	public async getCount(): Promise<number> {
		this.requireConnected();
		return getNotificationsCount();
	}

	/**
	 * Toggle Notification Center visibility through the SDK's RPC channel. The provider
	 * is expected to subscribe to addVisibilityListener and update its host chrome from
	 * there, so this is fire-and-forget from the producer's perspective.
	 */
	public async toggleCenter(): Promise<void> {
		this.requireConnected();
		await toggleNotificationCenter();
	}

	/**
	 * Subscribe to a notification lifecycle event.
	 * @param type Event name.
	 * @param listener Listener that receives the typed event payload.
	 */
	public async on<K extends keyof NotificationEventMap>(
		type: K,
		listener: (event: NotificationEventMap[K]) => void
	): Promise<void> {
		this.requireConnected();
		// The SDK exposes a discriminated-union overload set; cast through unknown so we
		// can dispatch any of the supported event names from one wrapper.
		await (addEventListener as unknown as (t: K, l: (e: NotificationEventMap[K]) => void) => Promise<void>)(
			type,
			listener
		);
	}

	/**
	 * Throws if the client hasn't connected yet. Producer-side calls all require a live broker channel.
	 * @throws {Error} Thrown when the notifications client is not connected.
	 */
	private requireConnected(): void {
		if (!this._connected) {
			throw new Error("Notifications client is not connected.");
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
