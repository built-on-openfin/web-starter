import type OpenFin from "@openfin/core";
import type { PlatformApp } from "../../shapes/app-shapes";
import type {
	IntentResolverResponse,
	IntentResolverOptions,
	AppIntent
} from "../../shapes/interopbroker-shapes";
import type { Logger } from "../../shapes/logger-shapes";
// import { formatError } from "../../utils";
import { RESOLVE_ERROR as ResolveError } from "./fdc3-errors";

/**
 * An Intent Resolver Used for resolving intent selection.
 */
export class IntentResolverHelper {
	private readonly _logger: Logger;

	private readonly _intentResolverOptions?: IntentResolverOptions;

	private readonly _unregisteredAppId?: string;

	private readonly _defaultIntentResolverHeight: number;

	private readonly _defaultIntentResolverWidth: number;

	private readonly _dialogElement: HTMLDialogElement | null = null;

	private _dialogClient: OpenFin.ChannelClient | null = null;

	/**
	 * Create an instance of the Intent Resolver Helper.
	 * @param intentResolverOptions options for the helper
	 * @param logger the logger to use.
	 * @param unregisteredAppId if you support unregistered apps what Id should they be assigned against.
	 */
	constructor(intentResolverOptions: IntentResolverOptions, logger: Logger, unregisteredAppId?: string) {
		this._defaultIntentResolverHeight = 715;
		this._defaultIntentResolverWidth = 665;
		this._intentResolverOptions = {
			height: this._defaultIntentResolverHeight,
			width: this._defaultIntentResolverWidth,
			fdc3InteropApi: "2.0",
			title: "Intent Resolver",
			...intentResolverOptions
		};
		this._logger = logger;
		this._dialogElement = document.createElement("dialog");
		this._dialogElement.style.height = `${this._intentResolverOptions.height}px`;
		this._dialogElement.style.width = `${this._intentResolverOptions.width}px`;
		this._dialogElement.style.padding = "0px";
		this._dialogElement.style.backgroundColor = "var(--brand-background)";
		// Create a new iframe element
		const intentPicker = document.createElement("iframe");

		// Set the source of the iframe
		intentPicker.src = intentResolverOptions.url;
		intentPicker.style.height = "99%";
		intentPicker.style.width = "100%";


		// Append the iframe to the dialog
		this._dialogElement.append(intentPicker);

		// Append the dialog to the body
		document.body.append(this._dialogElement);
	}

	/**
	 * Launch the intent resolver.
	 * @param launchOptions The options for launching the resolver.
	 * @param launchOptions.apps The apps to pick from.
	 * @param launchOptions.intent The intent to pick.
	 * @param launchOptions.intents The intents to pick from.
	 * @param clientIdentity The client that triggered this request.
	 * @returns The response from the intent resolver.
	 */
	public async launchIntentResolver(
		launchOptions: {
			apps?: PlatformApp[];
			intent?: Partial<AppIntent>;
			intents?: { intent: Partial<AppIntent>; apps: PlatformApp[] }[];
		},
		clientIdentity: OpenFin.ClientIdentity
	): Promise<IntentResolverResponse> {
		// launch a new window and optionally pass the available intents as customData.apps as part of the window
		// options the window can then use raiseIntent against a specific app (the selected one). this logic runs in
		// the provider so we are using it as a way of determining the root (so it works with root hosting and
		// subdirectory based hosting if a url is not provided)
		// try {
			let resolveAppSelection: (value: IntentResolverResponse) => void;
			let rejectAppSelection: (reason?: string) => void;
			if(this._dialogElement) {
				this._dialogElement.showModal();
			}
			if(!this._dialogClient && this._dialogClient === null) {
				const intentResolverChannel = "intent-resolver";
				console.log("Connecting to picker", intentResolverChannel);
				this._dialogClient = await fin.InterApplicationBus.Channel.connect(intentResolverChannel);

				// eslint-disable-next-line @typescript-eslint/await-thenable
				await this._dialogClient.register("intent-resolver-response", async (payload, sender) => {
					const response = payload as { intentResolverResponse?: IntentResolverResponse;
						errorMessage?: string; };
					this._logger.info("Received intent resolver message", payload);
					if(response.errorMessage) {
						rejectAppSelection(response.errorMessage);
					} else if(response.intentResolverResponse === undefined) {
						rejectAppSelection(ResolveError.ResolverUnavailable);
					} else {
						resolveAppSelection(response.intentResolverResponse);
					}
					if(this._dialogElement) {
						this._dialogElement.close();
					}
				});
			}
			if(this._dialogElement && this._dialogClient) {
				await this._dialogClient.dispatch("resolve-intent-request", {
					customData: {
									title: this._intentResolverOptions?.title,
									apps: launchOptions.apps,
									intent: launchOptions.intent,
									intents: launchOptions.intents,
									unregisteredAppId: this._unregisteredAppId
								}
				});
			}
			return new Promise((resolve, reject) => {
				resolveAppSelection = resolve;
				rejectAppSelection = reject;
			});
	}
}
