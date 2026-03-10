import type { Context } from "@finos/fdc3";
import type { fin as FinApi } from "@openfin/core";
import { init } from "./api";

let contextData: { [type: string]: Context[] } = {};
const customChannel = "custom-app-channel";

window.addEventListener("DOMContentLoaded", async () => {
	await init(true);
	await initializeDOM();
});

/**
 * Get the default data.
 * @returns The data set keyed by FDC3 type.
 */
export function getDefaultFDC3ContextData(): { [type: string]: Context[] } {
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
export function mergeWithDefaultFDC3ContextData(newData: { [type: string]: Context[] }): {
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
 * Perform a system broadcast.
 * @param context The context to set.
 * @param label The label for the broadcast.
 */
export async function systemBroadcast(context: Context, label: string = "System"): Promise<void> {
	if (window.fdc3 !== undefined) {
		try {
			const systemChannel = await window.fdc3.getCurrentChannel();
			const type = systemChannel?.type ?? label;
			const id = systemChannel?.id ?? "default";

			console.log(`broadcasting on ${type} channel: ${id}`, context);
			await window.fdc3.broadcast(context);
		} catch {
			console.log(`You are not bound to a ${label} channel and are unable to broadcast:`, context);
		}
	}
}

/**
 * Perform an app broadcast.
 * @param appChannelName The app channel name to broadcast on.
 * @param context The context to set.
 */
export async function appBroadcast(appChannelName: string, context: Context): Promise<void> {
	if (window.fdc3 !== undefined && appChannelName !== undefined) {
		const appChannel = await window.fdc3.getOrCreateChannel(appChannelName);
		console.log(`broadcasting on ${appChannel.type} channel: ${appChannel.id}`, context);
		await appChannel.broadcast(context);
	}
}

/**
 * Listen for system broadcasts.
 * @param onContextReceived The handler for the context received.
 * @param ctxType The optional context type to listen for.
 * @param label The label for logging.
 */
export async function listenToSystemBroadcast(
	onContextReceived: (ctx: Context) => void,
	ctxType: string | null = null,
	label: string = "System"
): Promise<void> {
	if (window.fdc3 !== undefined) {
		const version = await getFDC3Version();
		console.log(`Listening for ${label} context.`);
		if (version === "2.0") {
			await window.fdc3.addContextListener(ctxType, (ctx, metadata) => {
				console.log(`${label} Context Received:`, ctx);
				console.log(`${label} Metadata Received:`, metadata);
				onContextReceived(ctx);
			});
		} else {
			await window.fdc3.addContextListener(ctxType, (ctx) => {
				console.log(`${label} Context Received:`, ctx);
				onContextReceived(ctx);
			});
		}
	}
}

/**
 * Listen for app broadcasts.
 * @param appChannelName The app channel name to listen on.
 * @param onContextReceived The handler for the context received.
 */
export async function listenToAppBroadcast(
	appChannelName: string,
	onContextReceived: (ctx: Context) => void
): Promise<void> {
	if (window.fdc3 !== undefined && appChannelName !== undefined) {
		const appChannel = await window.fdc3.getOrCreateChannel(appChannelName);
		const version = await getFDC3Version();
		console.log(`Listening for app channel: ${appChannelName} context.`);
		if (version === "2.0") {
			await appChannel.addContextListener(null, (ctx, metadata) => {
				console.log("App Channel Context Received:", ctx);
				console.log("App Channel Metadata Received:", metadata);
				onContextReceived(ctx);
			});
		} else {
			await appChannel.addContextListener(null, (ctx) => {
				console.log("App Channel Context Received:", ctx);
				onContextReceived(ctx);
			});
		}
	}
}

/**
 * Get the FDC3 version.
 * @returns The version if it is available.
 */
export async function getFDC3Version(): Promise<string | undefined> {
	let version = "Unavailable";
	if (window.fdc3 !== undefined) {
		try {
			const info = await window.fdc3.getInfo();
			version = info.fdc3Version;
		} catch {
			console.log("Unable to get FDC3 info.");
			version = "Unknown";
		}
	}
	return version;
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
		} catch (error) {
			console.error("Error getting options", error);
		}
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
 * Bind the FDC3 value.
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
 * Bind the change event for channel type.
 */
function bindFDC3OnChange(): void {
	const fdc3Type = document.querySelector<HTMLSelectElement>("#fdc3Type");
	if (fdc3Type) {
		fdc3Type.addEventListener("change", () => {
			bindFDC3Values(contextData[fdc3Type.value]);
		});
	}

	const fdc3Value = document.querySelector<HTMLSelectElement>("#fdc3Value");
	if (fdc3Value) {
		fdc3Value.addEventListener("change", () => {
			if (fdc3Type && fdc3Value) {
				const context = contextData[fdc3Type.value][Number.parseInt(fdc3Value.value, 10)];
				bindFDC3Context(context);
			}
		});
	}
}

/**
 * Bind the FDC3 version.
 */
async function bindFDC3Version(): Promise<void> {
	const fdc3VersionLabel = document.querySelector<HTMLDivElement>("#fdc3Version");
	const fdc3Version = await getFDC3Version();
	if (fdc3VersionLabel && fdc3Version !== undefined) {
		fdc3VersionLabel.textContent = `(v${fdc3Version})`;
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
 * Update the DOM elements with the received context.
 * @param context The context received.
 */
function updateDOMElements(context: Context): void {
	const contextBody = document.querySelector<HTMLPreElement>("#contextBody");
	if (contextBody !== null) {
		contextBody.textContent = JSON.stringify(context, null, 2);
	}
}

/**
 * Get the channel type.
 * @returns The channel type.
 */
function getChannelType(): string {
	const channelType = document.querySelector<HTMLInputElement>("#channelType");
	return channelType?.value ?? "";
}

/**
 * Log the environment details.
 */
async function logEnvironment(): Promise<void> {
	if (window.fdc3 !== undefined) {
		console.log(`FDC3 Version: v${await getFDC3Version()}`);
		const channels = await window.fdc3.getUserChannels();
		if (Array.isArray(channels)) {
			console.log("-- Available User Channels -- ");
			for (const channel of channels) {
				console.log(`- ${channel.id}`);
			}
			console.log("-- Available User Channels -- ");
		}
	}
}

/**
 * Initialize the DOM elements.
 */
async function initializeDOM(): Promise<void> {
	window.addEventListener("fdc3Ready", () => {
		console.log("FDC3 Ready Event Fired");
	});
	const btnBroadcast = document.querySelector("#btnBroadcast");
	if (btnBroadcast) {
		btnBroadcast.addEventListener("click", async () => {
			try {
				const ctx = getContextToSend();
				const channelType = getChannelType();
				if (channelType === "userChannel") {
					await systemBroadcast(ctx, "User");
				} else if (channelType === "appChannel") {
					await appBroadcast(customChannel, ctx);
				}
			} catch (error) {
				console.error("Unable to broadcast context", error);
				console.log("Unable to broadcast current context. Likely a JSON parsing error:", error);
			}
		});
	}

	await applySettings();
	contextData = getDefaultFDC3ContextData();
	await logEnvironment();
	const dataTypes = Object.keys(contextData);
	bindFDC3Types(dataTypes);
	bindFDC3OnChange();
	await bindFDC3Version();
	await listenToSystemBroadcast((ctx) => updateDOMElements(ctx), null, "User");
	await listenToAppBroadcast(customChannel, (ctx) => updateDOMElements(ctx));
}
