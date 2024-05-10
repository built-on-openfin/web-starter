import type { Context } from "@finos/fdc3";
import { init } from "../platform/api";

window.addEventListener("DOMContentLoaded", async () => {
	await init();
	await initializeDOM();
});

/**
 * Broadcasts a context using FDC3.
 */
async function setContext(): Promise<void> {
	const contextType = "fdc3.instrument";
	const contextName = "Tesla Inc.";
	const idData = {
		ticker: "TSLA"
	};
	const context = {
		type: contextType,
		name: contextName,
		id: idData
	};
	if (window.fin) {
		await window.fin.me.interop.setContext(context);
		console.log(`Set context: ${contextType} - ${contextName}`);
	} else {
		window.addEventListener("finReady", async () => {
			if (window.fin) {
				await window.fin.me.interop.setContext(context);
				console.log(`Set context: ${contextType} - ${contextName}`);
			}
		});
	}
}

/**
 * Adds an interop context listener to the window.
 */
async function addContextListener(): Promise<void> {
	if (window.fin) {
		await window.fin.me.interop.addContextHandler((context: Context) => {
			updateDOMElements(context);
		});
	} else {
		window.addEventListener("finReady", async () => {
			if (window.fin) {
				await window.fin.me.interop.addContextHandler((context: Context) => {
					updateDOMElements(context);
				});
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
	const setContextButton = document.querySelector<HTMLButtonElement>("#setContext");

	if (setContextButton !== null) {
		setContextButton.addEventListener("click", async () => {
			await setContext();
		});
	}

	await addContextListener();
}
