import type { PlatformApp } from "../../shapes/app-shapes";
import type { Logger } from "../../shapes/logger-shapes";
import { isEmpty } from "../helpers/utils";

/**
 * Reads app intent metadata from apps.json.
 */
export class AppIntentHelper {
	private readonly _getApps: () => Promise<PlatformApp[]>;

	private readonly _logger: Logger;

	/**
	 * Creates a new AppIntentHelper.
	 * @param getApps The function to retrieve the list of platform apps.
	 * @param logger The logger instance.
	 */
	constructor(getApps: () => Promise<PlatformApp[]>, logger: Logger) {
		this._getApps = getApps;
		this._logger = logger;
	}

	/**
	 * Finds the first configured app that can handle an intent/context pair.
	 * @param intentName The raised intent name.
	 * @param contextType The raised context type.
	 * @returns The first matching app in apps.json order.
	 */
	public async findFirstAppForIntent(
		intentName: string,
		contextType: string | undefined
	): Promise<PlatformApp | undefined> {
		if (isEmpty(contextType)) {
			this._logger.warn(`No context type was supplied for intent ${intentName}.`);
			return;
		}

		const apps = await this._getApps();
		for (const app of apps) {
			const listensFor = app.interop?.intents?.listensFor;
			if (!isEmpty(listensFor)) {
				const matchingIntentName = Object.keys(listensFor).find(
					(configuredIntentName) => configuredIntentName.toLowerCase() === intentName.toLowerCase()
				);
				if (!isEmpty(matchingIntentName)) {
					const configuredIntent = listensFor[matchingIntentName];
					if (configuredIntent.contexts.includes(contextType)) {
						return app;
					}
				}
			}
		}

		this._logger.info(`No app found for intent ${intentName} and context ${contextType}.`);
	}
}
