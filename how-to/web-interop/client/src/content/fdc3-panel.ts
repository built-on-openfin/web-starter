import type { Context } from "@finos/fdc3";
import { init } from "../platform/api";

window.addEventListener("DOMContentLoaded", async () => {
	// setTimeout(async () => {
	await init(false);
	await initializeDOM();
	// }, 1000);
});

/**
 * Adds an FDC3 context listener to the window.
 */
async function addFDC3Listener(): Promise<void> {
	if (window.fdc3) {
		await window.fdc3.addContextListener(null, (context) => {
			updateDOMElements(context);
		});
	} else {
		window.addEventListener("fdc3Ready", async () => {
			await window.fdc3.addContextListener(null, (context) => {
				updateDOMElements(context);
			});
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
	await addFDC3Listener();
}
