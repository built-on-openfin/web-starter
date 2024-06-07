
/**
 * The payload for an intent registration.
 */
export interface IntentRegistrationPayload {
	/**
	 * The FDC3 version.
	 */
	fdc3Version: string;

	/**
	 * The id of the handler.
	 */
	handlerId: string;
}
