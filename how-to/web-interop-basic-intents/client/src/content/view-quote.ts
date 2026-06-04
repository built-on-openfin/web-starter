import type { Context } from "@finos/fdc3";
import { init, waitForFdc3Ready } from "./api";

window.addEventListener("DOMContentLoaded", async () => {
	await init(true);
	await initializeDOM();
});

/**
 * Adds an fdc3 intent listener to the window.
 */
async function addIntentListener(): Promise<void> {
	const intent = "ViewQuote";

	await waitForFdc3Ready();
	if (window.fdc3) {
		await window.fdc3.addIntentListener(intent, (ctx, metadata) => {
			console.log(`Received Context For Intent: ${intent}`, ctx);
			console.log(`Received Metadata With Intent: ${intent}`, metadata);
			updateDOMElements(ctx);
		});
	}
}

/**
 * Updates the DOM elements with the provided context.
 * @param context The context to update the DOM elements with.
 */
function updateDOMElements(context: Context): void {
	const receivedContext = document.querySelector<HTMLTextAreaElement>("#receivedContext");
	if (receivedContext) {
		receivedContext.value = JSON.stringify(context, null, 2);
	}
}

/**
 * Initialize the DOM elements.
 */
async function initializeDOM(): Promise<void> {
	await addIntentListener();
}
