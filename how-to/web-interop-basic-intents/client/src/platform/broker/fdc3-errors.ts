/** Errors used by the minimal FDC3 intent flow. */
export const RESOLVE_ERROR = {
	/** No configured app supports the requested intent/context pair. */
	NoAppsFound: "NoAppsFound",
	/** The target app exists, but its metadata cannot be resolved. */
	TargetAppUnavailable: "TargetAppUnavailable",
	/** The app launched, but the intent could not be delivered to its listener. */
	IntentDeliveryFailed: "IntentDeliveryFailed"
};
