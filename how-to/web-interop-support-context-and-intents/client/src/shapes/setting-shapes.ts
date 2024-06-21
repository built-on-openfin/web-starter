import type { CloudInteropOverrideParams } from "@openfin/cloud-interop";
import type { AppResolverOptions } from "./app-shapes";
import type { PlatformInteropBrokerOptions } from "./interopbroker-shapes";
import type { PlatformLayoutSnapshot } from "./layout-shapes";

/**
 * A type to capture the type of endpoints that can be called and how they should be called.
 */
export interface Endpoint {
	/**
	 * The id of the endpoint
	 */
	id: string;
	/**
	 * The type of endpoint only fetch supported in this example
	 */
	type: "fetch";
	/**
	 * Options to pass when calling fetch
	 */
	options: {
		/** The method supported by fetch */
		method: "GET";
		/** The url to request */
		url: string;
	};
}
/**
 * Encapsulates the endpoints that can be called.
 */
export interface EndpointProvider {
	/**
	 * The endpoints that can be called.
	 */
	endpoints: Endpoint[];
}

/**
 * The settings that can be made available through a manifest.
 */
export interface ManifestSettings {
	/**
	 * The settings for the application.
	 */
	endpointProvider: EndpointProvider;
}

/**
 * The settings for capturing or updating settings.
 */
export interface SettingsResolverOptions {
	/**
	 * The url of the html page that has the app picker
	 */
	url: string;

	/**
	 * the height you wish the content container to be
	 */
	height?: number;

	/**
	 * the width you wish the content container to be
	 */
	width?: number;
}

/**
 * The response from the settings resolver.
 */
export interface SettingsResolverResponse {
	/**
	 * The action to take.
	 */
	action: "save-reload" | "reset-reload" | "close";

	/**
	 * The the settings if it was to save.
	 */
	settings?: Settings;
}

/**
 * Settings for the client
 */
export interface Settings {
	/**
	 * Platform settings
	 */
	platform: {
		interop: {
			sharedWorkerUrl: string;
			brokerUrl: string;
			providerId: string;
			defaultContextGroup?: string;
			overrideOptions: PlatformInteropBrokerOptions;
		};
		cloudInterop: {
			connectParams: CloudInteropOverrideParams;
		};
		layout: {
			addLayoutId: string;
			deleteLayoutId: string;
			layoutContainerId: string;
			layoutSelectorId: string;
			defaultLayout: PlatformLayoutSnapshot | string;
		};
		ui: {
			logo: string;
			title: string;
			subTitle: string;
			settingsResolver: SettingsResolverOptions;
		};
		app: {
			directory: string;
			appResolver: AppResolverOptions;
		};
	};
}
