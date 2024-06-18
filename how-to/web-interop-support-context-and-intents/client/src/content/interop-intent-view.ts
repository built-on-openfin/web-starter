import type { Context } from "@finos/fdc3";
import { init } from "./api";

window.addEventListener("DOMContentLoaded", async () => {
	await init(true);
	await initializeDOM();
});

/**
 * Raise an intent using the interop API.
 */
async function raiseIntent(): Promise<void> {
	if (window.fin !== undefined) {
		const context = {
			type: "fdc3.contact",
			name: "Andy Young",
			id: {
				email: "andy.young@example.com"
			}
		};
		const intent = "ViewContact";
		const intentRequest = {
			name: intent,
			context
		};
		const intentResolver = await fin.me.interop.fireIntent(intentRequest);
		if (intentResolver !== undefined) {
			console.log("Intent resolver received:", intentResolver);
		}
	}
}

/**
 * Adds an interop intent listener to the window.
 */
async function addIntentListener(): Promise<void> {
	const intent = "ViewContact";
	if (window.fin) {
		await fin.me.interop.registerIntentHandler((passedIntent) => {
			console.log(`Received Context For Intent: ${passedIntent.name}`, passedIntent.context);
			updateDOMElements(passedIntent.context);
		}, intent);
	} else {
		window.addEventListener("finReady", async () => {
			if (window.fin) {
				await fin.me.interop.registerIntentHandler((passedIntent) => {
					console.log(`Received Context For Intent: ${passedIntent.name}`, passedIntent.context);
					updateDOMElements(passedIntent.context);
				}, intent);
			}
		});
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
 * Initialize the DOM elements.
 */
async function initializeDOM(): Promise<void> {
	const raiseIntentButton = document.querySelector<HTMLButtonElement>("#raiseIntent");

	if (raiseIntentButton !== null) {
		raiseIntentButton.addEventListener("click", async () => {
			await raiseIntent();
		});
	}

	await addIntentListener();
}
