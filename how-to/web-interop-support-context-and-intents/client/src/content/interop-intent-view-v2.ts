import type { AppIntent, AppMetadata, Context } from "@finos/fdc3";
import type { fin as FinApi } from "@openfin/core";
import { init } from "./api";

let contextData: { [type: string]: Context[] } = {};
let intentData: { [type: string]: string[] };

window.addEventListener("DOMContentLoaded", async () => {
	await init(true);
	await initializeDOM();
});

/**
 * Get the default context data.
 * @returns The data set keyed by FDC3 type.
 */
function getDefaultFDC3ContextData(): { [type: string]: Context[] } {
	return {
		"fdc3.instrument": [
			{
				type: "fdc3.instrument",
				name: "Tesla Inc",
				id: { ticker: "TSLA", BBG: "TSLA US Equity", ISIN: "US88160R1014" }
			},
			{
				type: "fdc3.instrument",
				name: "Apple Inc.",
				id: { ticker: "AAPL", BBG: "AAPL US Equity", ISIN: "US0378331005" }
			},
			{
				type: "fdc3.instrument",
				name: "Microsoft Corporation",
				id: { ticker: "MSFT", BBG: "MSFT US Equity", ISIN: "US5949181045" }
			},
			{
				type: "fdc3.instrument",
				name: "BAE Systems plc",
				id: { ticker: "BA", BBG: "BA/ LN Equity", ISIN: "GB0002634946" }
			},
			{
				type: "fdc3.instrument",
				name: "Admiral Group plc",
				id: { ticker: "ADM", BBG: "ADM LN Equity", ISIN: "GB00B02J6398" }
			},
			{
				type: "fdc3.instrument",
				name: "HSBC Holdings Plc",
				id: { ticker: "HSBA", BBG: "HSBA LN Equity", ISIN: "GB0005405286" }
			}
		],
		"fdc3.instrumentList": [
			{
				type: "fdc3.instrumentList",
				name: "Interesting instruments...",
				id: { customId: "5464" },
				instruments: [
					{
						type: "fdc3.instrument",
						id: {
							ticker: "AAPL",
							BBG: "AAPL US Equity",
							ISIN: "US0378331005"
						}
					},
					{
						type: "fdc3.instrument",
						id: {
							ticker: "MSFT",
							BBG: "MSFT US Equity",
							ISIN: "US5949181045"
						}
					}
				]
			}
		],
		"fdc3.position": [
			{
				type: "fdc3.position",
				name: "My Apple shares",
				id: { positionId: "6475" },
				instrument: {
					type: "fdc3.instrument",
					id: {
						ticker: "AAPL",
						BBG: "AAPL US Equity",
						ISIN: "US0378331005"
					}
				},
				holding: 2000000
			}
		],
		"fdc3.portfolio": [
			{
				type: "fdc3.portfolio",
				name: "My share portfolio",
				id: { portfolioId: "7381" },
				positions: [
					{
						type: "fdc3.position",
						instrument: {
							type: "fdc3.instrument",
							id: { ticker: "AAPL", BBG: "AAPL US Equity", ISIN: "US0378331005" }
						},
						holding: 2000000
					},
					{
						type: "fdc3.position",
						instrument: {
							type: "fdc3.instrument",
							id: { ticker: "MSFT", BBG: "MSFT US Equity", ISIN: "US5949181045" }
						},
						holding: 1500000
					},
					{
						type: "fdc3.position",
						instrument: {
							type: "fdc3.instrument",
							id: { ticker: "TSLA", BBG: "TSLA US Equity", ISIN: "US88160R1014" }
						},
						holding: 3000000
					}
				]
			}
		],
		"fdc3.contact": [
			{
				type: "fdc3.contact",
				name: "Andy Young",
				id: {
					email: "andy.young@example.com"
				}
			}
		],
		"fdc3.contactList": [
			{
				type: "fdc3.contactList",
				name: "My address book",
				id: { customId: "5576" },
				contacts: [
					{
						type: "fdc3.contact",
						name: "Andy Young",
						id: {
							email: "andy.young@example.com"
						}
					}
				]
			}
		],
		"fdc3.organization": [
			{
				type: "fdc3.organization",
				name: "Cargill, Incorporated",
				id: {
					LEI: "QXZYQNMR4JZ5RIRN4T31",
					FDS_ID: "00161G-E"
				}
			}
		],
		"fdc3.country": [
			{
				type: "fdc3.country",
				name: "Sweden",
				id: {
					ISOALPHA3: "SWE"
				}
			}
		],
		custom: [
			{
				type: "custom",
				name: "Custom Context",
				data: { custom: "object" }
			}
		]
	};
}

/**
 * Merge the context data with the default data.
 * @param newData The new data to merge.
 * @returns The combined data.
 */
function mergeWithDefaultFDC3ContextData(newData: { [type: string]: Context[] }): {
	[type: string]: Context[];
} {
	const fdc3ContextData = getDefaultFDC3ContextData();
	if (newData !== undefined) {
		const keys = Object.keys(newData);
		for (const key of keys) {
			if (fdc3ContextData[key] === undefined) {
				fdc3ContextData[key] = newData[key];
			} else if (Array.isArray(newData[key])) {
				fdc3ContextData[key].push(...newData[key]);
			}
		}
	}
	return fdc3ContextData;
}

/**
 * Get a default set of intents.
 * @returns The intent data.
 */
function getDefaultFDC3IntentData(): { [type: string]: string[] } {
	return {
		StartCall: ["fdc3.contact", "fdc3.contactList"],
		StartChat: ["fdc3.contact", "fdc3.contactList"],
		ViewChart: ["fdc3.instrument", "fdc3.instrumentList", "fdc3.portfolio", "fdc3.position"],
		ViewContact: ["fdc3.contact"],
		ViewProfile: ["fdc3.contact", "fdc3.organization"],
		ViewQuote: ["fdc3.instrument"],
		ViewNews: [
			"fdc3.country",
			"fdc3.instrument",
			"fdc3.instrumentList",
			"fdc3.organization",
			"fdc3.portfolio"
		],
		ViewAnalysis: ["fdc3.instrument", "fdc3.organization", "fdc3.portfolio"],
		ViewInstrument: ["fdc3.instrument"],
		Custom: [
			"fdc3.contact",
			"fdc3.contactList",
			"fdc3.country",
			"fdc3.instrument",
			"fdc3.instrumentList",
			"fdc3.organization",
			"fdc3.portfolio",
			"fdc3.position",
			"custom"
		]
	};
}

/**
 * Merge the intent data with the default data.
 * @param newData The new data to merge.
 * @returns The combined data.
 */
function mergeWithDefaultFDC3IntentData(newData: { [type: string]: string[] }): { [type: string]: string[] } {
	const fdc3IntentData = getDefaultFDC3IntentData();
	if (newData !== undefined) {
		const keys = Object.keys(newData);
		for (const key of keys) {
			if (fdc3IntentData[key] === undefined) {
				fdc3IntentData[key] = newData[key];
			} else if (Array.isArray(newData[key])) {
				for (const context of newData[key]) {
					if (!fdc3IntentData[key].includes(context)) {
						fdc3IntentData[key].push(context);
					}
				}
			}
		}
	}
	return fdc3IntentData;
}

/**
 * Fire the intent.
 * @param intent The intent to fire.
 * @param context The context.
 * @param app The app to target.
 */
async function fireIntent(intent: string, context: Context, app: string | undefined): Promise<void> {
	if (window.fin !== undefined) {
		console.log(`Firing intent ${intent} with context`, context);
		const intentRequest = {
			name: intent,
			context,
			metadata: {
				target: app
			}
		};
		const intentResolver = await fin.me.interop.fireIntent(intentRequest);
		if (intentResolver !== undefined) {
			console.log("Intent resolver received: ", intentResolver);
		}
	}
}

/**
 * Fire the intent for context.
 * @param context The context.
 * @param app The app to target.
 */
async function fireIntentForContext(context: Context, app: string | undefined): Promise<void> {
	if (window.fin !== undefined) {
		if (app === undefined) {
			console.log(`Firing intent for context ${context.type}:`, context);
		} else {
			console.log(`Firing intent for context ${context.type} and targeting app: ${app}. Context: `, context);
		}
		context.metadata = {
			target: app
		};

		const intentResolver = await fin.me.interop.fireIntentForContext(context);
		if (intentResolver !== undefined) {
			console.log("Intent resolver received: ", intentResolver);
		}
	}
}

/**
 * Add intent listeners for a list of intents.
 * @param intentList The list of intents to listen for.
 */
async function addIntentListeners(intentList: string[]): Promise<void> {
	if (window.fin !== undefined && intentList.length > 0) {
		console.log("View Manifest/Defaults specified following intents: ", intentList);
		try {
			for (const intent of intentList) {
				await fin.me.interop.registerIntentHandler((passedIntent) => {
					console.log(`Received Context For Intent: ${passedIntent.name}`, passedIntent.context);
					updateDOMElements(passedIntent.context);
				}, intent);
			}
		} catch (error) {
			console.error(
				"Error while trying to register an intent handler. It may be this platform does not have a custom broker implementation with Intent support.",
				error
			);
		}
	}
}

/**
 * Updates the DOM elements with the provided context.
 * @param context The context to update the DOM elements with.
 */
function updateDOMElements(context: Context): void {
	const contextTypeSpan = document.querySelector<HTMLSpanElement>("#contextType");
	const contextNameSpan = document.querySelector<HTMLSpanElement>("#contextName");
	const contextBodyPre = document.querySelector<HTMLPreElement>("#contextBody");

	if (contextTypeSpan !== null && contextNameSpan !== null && contextBodyPre !== null) {
		contextTypeSpan.textContent = context.type;
		contextNameSpan.textContent = context.name ?? "No name provided.";
		contextBodyPre.textContent = JSON.stringify(context, null, 2);
	}
}

/**
 * Bind the FDC3 context.
 * @param value The value to bind.
 */
function bindFDC3Context(value: Context): void {
	const specifiedContext = document.querySelector<HTMLTextAreaElement>("#context");
	if (specifiedContext) {
		specifiedContext.value = JSON.stringify(value, null, 3);
	}
}

/**
 * Bind the FDC3 values.
 * @param values The values to bind.
 */
function bindFDC3Values(values: Context[]): void {
	const fdc3Value = document.querySelector<HTMLSelectElement>("#fdc3Value");
	if (fdc3Value) {
		fdc3Value.length = 0;
		let count = 0;
		for (const value of values) {
			const option = document.createElement("option");
			let name = `Sample (${count + 1})`;
			if (value.name !== undefined) {
				name = value.name;
			}
			option.text = name;
			option.value = count.toString();
			count++;
			fdc3Value.add(option);
		}
		const context = values[0];
		bindFDC3Context(context);
	}
}

/**
 * Bind the FDC3 types.
 * @param types The types to bind.
 */
function bindFDC3Types(types: string[]): void {
	const fdc3Type = document.querySelector<HTMLSelectElement>("#fdc3Type");
	if (fdc3Type) {
		fdc3Type.length = 0;
		for (const type of types) {
			const option = document.createElement("option");
			option.text = type;
			option.value = type;
			fdc3Type.add(option);
		}
		bindFDC3Values(contextData[types[0]]);
	}
}

/**
 * Bind the FDC3 intents.
 * @param intents The intents to bind.
 */
async function bindFDC3Intents(intents: string[]): Promise<void> {
	const fdc3Intent = document.querySelector<HTMLSelectElement>("#fdc3Intents");
	if (fdc3Intent) {
		fdc3Intent.length = 0;
		for (const intent of intents) {
			const option = document.createElement("option");
			option.text = intent;
			option.value = intent;
			fdc3Intent.add(option);
		}

		try {
			const apps = await buildAppList();
			bindApps(apps);
		} catch (err) {
			console.error(err);
		}
	}
}

/**
 * Bind the applications.
 * @param apps The applications to bind.
 */
function bindApps(apps: AppMetadata[]): void {
	const fdc3Apps = document.querySelector<HTMLSelectElement>("#fdc3Apps");
	if (fdc3Apps) {
		fdc3Apps.length = 0;
		apps.unshift(
			{ appId: "none", title: "No Preference" },
			{ appId: "wrong-app", title: "Non Existent App" }
		);
		for (const app of apps) {
			const option = document.createElement("option");
			option.text = app.title ?? "";
			option.value = app.appId;
			fdc3Apps.add(option);
		}
	}
}

/**
 * Get the combined app list for the intents.
 * @param intents The intents to get the apps for.
 * @returns The list of apps for the intents.
 */
function getCombinedAppList(intents: AppIntent[]): AppMetadata[] {
	const combinedAppList: AppMetadata[] = [];
	const combinedListOfAppIds: string[] = [];

	for (const intent of intents) {
		for (const app of intent.apps) {
			if (!combinedListOfAppIds.includes(app.appId)) {
				combinedAppList.push(app);
				combinedListOfAppIds.push(app.appId);
			}
		}
	}

	return combinedAppList;
}

/**
 * Are we firing by context.
 * @returns True if firing by context.
 */
function isRaiseByContext(): boolean {
	return getIntentRaiseType() === "fireIntentForContext";
}

/**
 * Build the list of applications.
 * @returns List of applications.
 */
async function buildAppList(): Promise<AppMetadata[]> {
	let intents: AppIntent[] = [];
	const findByContext = isRaiseByContext();

	try {
		if (findByContext) {
			intents = await fin.me.interop.getInfoForIntentsByContext(getContextToSend());
		} else {
			const intentToRaise = getIntentToRaise();
			if (intentToRaise === "") {
				return [];
			}
			const intent = await fin.me.interop.getInfoForIntent<AppIntent>({
				name: getIntentToRaise()
			});
			intents.push(intent);
		}
	} catch (error) {
		console.error("Unable to build a supporting app list.", error);
		return [];
	}

	return getCombinedAppList(intents);
}

/**
 * Bind the FDC3 on change handlers.
 */
function bindFDC3OnChange(): void {
	const fdc3RaiseBy = document.querySelector("#intentType");
	const fdc3Intent = document.querySelector<HTMLSelectElement>("#fdc3Intents");
	const fdc3Type = document.querySelector<HTMLSelectElement>("#fdc3Type");
	const fdc3Value = document.querySelector<HTMLSelectElement>("#fdc3Value");
	const fdc3Apps = document.querySelector("#fdc3Apps");
	const btnFireIntent = document.querySelector<HTMLButtonElement>("#btnFireIntent");
	const btnFireIntentForContext = document.querySelector<HTMLButtonElement>("#btnFireIntentForContext");
	const customIntentContainer = document.querySelector<HTMLDivElement>("#customIntentContainer");
	const customIntent = document.querySelector("#customIntent");

	if (fdc3RaiseBy) {
		fdc3RaiseBy.addEventListener("change", async () => {
			if (btnFireIntent && btnFireIntentForContext) {
				const apps = await buildAppList();
				bindApps(apps);
				if (isRaiseByContext()) {
					btnFireIntent.style.display = "none";
					btnFireIntentForContext.style.display = "unset";
				} else {
					btnFireIntent.style.display = "unset";
					btnFireIntentForContext.style.display = "none";
				}
			}
		});
	}

	if (fdc3Intent) {
		fdc3Intent.addEventListener("change", async () => {
			if (customIntentContainer) {
				bindFDC3Types(getFDC3Types());
				const apps = await buildAppList();
				bindApps(apps);
				const intent = fdc3Intent.value;
				if (intent === "Custom") {
					customIntentContainer.style.display = "flex";
				} else {
					customIntentContainer.style.display = "none";
				}
			}
		});
	}

	if (fdc3Type) {
		fdc3Type.addEventListener("change", async () => {
			bindFDC3Values(contextData[fdc3Type.value]);
			const apps = await buildAppList();
			bindApps(apps);
		});
	}

	if (fdc3Value) {
		fdc3Value.addEventListener("change", () => {
			if (fdc3Type && fdc3Value) {
				const context = contextData[fdc3Type.value][Number.parseInt(fdc3Value.value, 10)];
				bindFDC3Context(context);
			}
		});
	}

	if (fdc3Apps) {
		fdc3Apps.addEventListener("change", () => {
			console.log("App selection changed:", (fdc3Apps as HTMLSelectElement).value);
		});
	}

	if (customIntent) {
		customIntent.addEventListener("change", () => {
			console.log("Custom intent changed:", (customIntent as HTMLInputElement).value);
		});
	}
}

/**
 * Get the context to send.
 * @returns The context to send.
 */
function getContextToSend(): Context {
	const contextInput = document.querySelector<HTMLTextAreaElement>("#context");
	const context = contextInput?.value;
	return context ? JSON.parse(context) : ({} as Context);
}

/**
 * Get the intent to raise.
 * @returns The intent to raise.
 */
function getIntentToRaise(): string {
	const selectedIntent = document.querySelector<HTMLSelectElement>("#fdc3Intents");
	let intent = selectedIntent?.value;

	if (intent === "Custom") {
		const customIntent = document.querySelector<HTMLInputElement>("#customIntent");
		intent = customIntent?.value;
	}
	return intent ?? "";
}

/**
 * Get the intent raise type.
 * @returns The intent raise type.
 */
function getIntentRaiseType(): string {
	const intent = document.querySelector<HTMLSelectElement>("#intentType");
	return intent?.value ?? "";
}

/**
 * Get the app selection.
 * @returns The app selection.
 */
function getAppSelection(): string {
	const intent = document.querySelector<HTMLSelectElement>("#fdc3Apps");
	return intent?.value ?? "";
}

/**
 * Get the FDC3 types for the currently selected intent.
 * @returns The FDC3 types.
 */
function getFDC3Types(): string[] {
	let types = intentData[getIntentToRaise()];
	if (types === undefined) {
		types = intentData.Custom;
	}
	return types;
}

/**
 * Fire an intent.
 */
async function requestFireIntent(): Promise<void> {
	const ctx = getContextToSend();
	const intent = getIntentToRaise();
	try {
		let app: string | undefined = getAppSelection();
		if (app === "none" || app === "") {
			app = undefined;
		}
		await fireIntent(intent, ctx, app);
	} catch (error) {
		console.error(`Unable to fire intent ${intent}`, error);
	}
}

/**
 * Fire an intent for context.
 */
async function requestFireIntentForContext(): Promise<void> {
	try {
		const ctx = getContextToSend();
		let app: string | undefined = getAppSelection();
		if (app === "none" || app === "") {
			app = undefined;
		}
		await fireIntentForContext(ctx, app);
	} catch (error) {
		console.error("Unable to fire intent for context", error);
	}
}

/**
 * Apply the settings.
 */
async function applySettings(): Promise<void> {
	const finApi = window.fin as unknown as typeof FinApi;
	if (finApi?.me?.getOptions !== undefined) {
		try {
			const options = await finApi.me.getOptions();
			const optionsData = options?.customData;

			if (optionsData?.contextData !== undefined && optionsData?.contextData !== null) {
				if (optionsData.mergeContextData) {
					contextData = mergeWithDefaultFDC3ContextData(optionsData.contextData);
				} else {
					contextData = optionsData.contextData;
				}
			}
			if (optionsData?.intentData !== undefined && optionsData?.intentData !== null) {
				if (optionsData.mergeIntentData) {
					intentData = mergeWithDefaultFDC3IntentData(optionsData.intentData);
				} else {
					intentData = optionsData.intentData;
				}
			}
		} catch (error) {
			console.error("Unable to apply settings", error);
		}
	}
}

/**
 * Initialize the DOM elements.
 */
async function initializeDOM(): Promise<void> {
	const btnFireIntent = document.querySelector("#btnFireIntent");
	if (btnFireIntent) {
		btnFireIntent.addEventListener("click", async () => {
			await requestFireIntent();
		});
	}

	const btnFireIntentForContext = document.querySelector("#btnFireIntentForContext");
	if (btnFireIntentForContext) {
		btnFireIntentForContext.addEventListener("click", async () => {
			await requestFireIntentForContext();
		});
	}

	contextData = getDefaultFDC3ContextData();
	intentData = getDefaultFDC3IntentData();
	await applySettings();
	const intentTypes = Object.keys(intentData);
	await bindFDC3Intents(intentTypes);
	bindFDC3Types(getFDC3Types());
	bindFDC3OnChange();
	await addIntentListeners(intentTypes);
}
