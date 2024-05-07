import type { Context } from "@finos/fdc3";

window.addEventListener("DOMContentLoaded", async () => {
	await initializeDOM();
});

/**
 * Broadcasts a context using FDC3.
 */
async function broadcastContext(): Promise<void> {
	const contextType = "fdc3.instrument";
	const contextName = "Apple";
	const idData = {
		ticker: "AAPL"
	};
	const context = {
		type: contextType,
		name: contextName,
		id: idData
	};
	if (window.fdc3) {
		await window.fdc3.broadcast(context);
		console.log(`Broadcasted context: ${contextType} - ${contextName}`);
	} else {
		window.addEventListener("fdc3Ready", async () => {
			await window.fdc3.broadcast(context);
			console.log(`Broadcasted context: ${contextType} - ${contextName}`);
		});
	}
}

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
	const broadcastButton = document.querySelector<HTMLButtonElement>("#broadcast");

	if (broadcastButton !== null) {
		broadcastButton.addEventListener("click", async () => {
			await broadcastContext();
		});
	}

	await addFDC3Listener();
}
