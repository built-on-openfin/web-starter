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

	/**
	 * Optional experimental panel shown to the right of the layout.
	 */
	experimentalPanel?: ExperimentalPanelSettings;
}

/**
 * The settings for the experimental panel that hosts an of-view web component.
 */
export interface ExperimentalPanelSettings {
	/**
	 * Should the panel be shown.
	 */
	enabled: boolean;

	/**
	 * The id of the app (from the app directory) to show. Its url is used as the of-view src and the
	 * of-name is generated as appId/uuid. The broker url, provider id and uuid come from the platform.
	 */
	appId: string;

	/**
	 * The context group to join (of-context-group). Defaults to the platform's defaultContextGroup.
	 */
	contextGroup?: string;

	/**
	 * The title of the of-view. Defaults to the title of the app in the app directory.
	 */
	title?: string;
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
			/**
			 * Saved override for the experimental panel which takes precedence over the manifest value.
			 */
			experimentalPanel?: ExperimentalPanelSettings;
		};
		app: {
			directory: string;
			appResolver: AppResolverOptions;
		};
	};
}
