import type { Context } from "@finos/fdc3";
import type { fin as FinApi } from "@openfin/core";
import { init } from "../platform/api";

let contextData: { [type: string]: Context[] } = {};
const customChannel = "custom-app-channel";
const SYSTEM_CONTEXT_GROUP = "systemContextGroup";
const SESSION_CONTEXT_GROUP = "sessionContextGroup";

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
 * Perform a system context set.
 * @param context The context to set.
 */
export async function systemSetContext(context: Context): Promise<void> {
	if (window.fin !== undefined) {
		try {
			console.log("set context being called on system channel:", context);
			await window.fin.me.interop.setContext(context);
		} catch (error) {
			console.log("You are not bound to a system channel and are unable to set context:", error);
		}
	}
}

/**
 * Perform a session context set.
 * @param appSessionContextGroupName The session context group name.
 * @param context The context to set.
 */
export async function sessionSetContext(appSessionContextGroupName: string, context: Context): Promise<void> {
	if (window.fin !== undefined && appSessionContextGroupName !== undefined) {
		const appSessionContextGroup =
			await window.fin.me.interop.joinSessionContextGroup(appSessionContextGroupName);
		console.log(`Setting context on session context group ${appSessionContextGroupName}`, context);
		await appSessionContextGroup.setContext(context);
	}
}

/**
 * Listen for system context.
 * @param onContextReceived The handler for the context received.
 */
export async function listenToSystemContext(onContextReceived: () => void): Promise<void> {
	if (window.fin !== undefined) {
		try {
			console.log("Listening for system context.");
			await window.fin.me.interop.addContextHandler((ctx) => {
				console.log("System Context Received:", ctx);
				onContextReceived();
			});
		} catch (error) {
			console.log("Error listening for system context");
			console.error(error);
		}
	}
}

/**
 * Listen for session context.
 * @param appSessionContextGroupName The app session context group name.
 * @param onContextReceived The handler for the context received.
 */
export async function listenToSessionContext(
	appSessionContextGroupName: string,
	onContextReceived: () => void
): Promise<void> {
	if (window.fin !== undefined && appSessionContextGroupName !== undefined) {
		try {
			const appSessionContextGroup =
				await window.fin.me.interop.joinSessionContextGroup(appSessionContextGroupName);
			console.log(`Listening for app session context group: ${appSessionContextGroupName} context.`);
			await appSessionContextGroup.addContextHandler((ctx) => {
				console.log("App Session Context Received:", ctx);
				onContextReceived();
			});
		} catch (error) {
			console.log(`Error listening for app session context group: ${appSessionContextGroupName} context.`);
			console.error("Error listening for app session context", error);
		}
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
 * Get the context to send.
 * @returns The context to send.
 */
function getContextToSend(): Context {
	const contextInput = document.querySelector<HTMLTextAreaElement>("#context");
	const context = contextInput?.value;
	return context ? JSON.parse(context) : ({} as Context);
}

/**
 * Get the context group type.
 * @returns The context group type.
 */
function getContextGroupType(): string {
	const contextGroupType = document.querySelector<HTMLSelectElement>("#contextGroupType");
	return contextGroupType?.value ?? "";
}

/**
 * Log the environment details.
 */
async function logEnvironment(): Promise<void> {
	if (window.fin !== undefined) {
		try {
			const contextGroups = await window.fin.me.interop.getContextGroups();
			if (Array.isArray(contextGroups)) {
				console.log("-- Available System Context Groups -- ");
				for (const group of contextGroups) {
					console.log(`- ${group.id}`);
				}
				console.log("-- Available System Context Groups -- ");
			}
		} catch (error) {
			console.log("-- System Context Groups Not Available -- ");
			console.error("Error getting context groups.", error);
		}
	}
}

/**
 * Initialize the DOM elements.
 */
async function initializeDOM(): Promise<void> {
	window.addEventListener("finReady", () => {
		console.log("Fin Ready Event Fired");
	});

	const btnSetContext = document.querySelector("#btnSetContext");
	if (btnSetContext) {
		btnSetContext.addEventListener("click", async () => {
			try {
				const ctx = getContextToSend();
				const contextGroupType = getContextGroupType();

				if (contextGroupType === SYSTEM_CONTEXT_GROUP) {
					await systemSetContext(ctx);
				} else if (contextGroupType === SESSION_CONTEXT_GROUP) {
					await sessionSetContext(customChannel, ctx);
				}
			} catch (error) {
				console.error("Unable to set context", error);
				console.log("Unable to call setContext for the current context. Likely a JSON parsing error:", error);
			}
		});
	}

	await applySettings();
	contextData = getDefaultFDC3ContextData();
	await logEnvironment();
	const dataTypes = Object.keys(contextData);
	bindFDC3Types(dataTypes);
	bindFDC3OnChange();
	await listenToSystemContext(() => {});
	await listenToSessionContext(customChannel, () => {});
}
