import { init } from "../platform/api";

window.addEventListener("DOMContentLoaded", async () => {
	debugger;
	await init(true);
	await initializeDOM();
});

/**
 * Initialize the DOM elements.
 */
async function initializeDOM(): Promise<void> {}
