/* eslint-disable wrap-iife */
// eslint-disable-next-line no-void, @typescript-eslint/no-floating-promises
(async function ensureFin(): Promise<void> {
	if (window.fin === undefined) {
		try {
            const url = "http://localhost:6060/js/client.web.api.bundle.js";
			const module = await import(/* webpackIgnore: true */url);
			await module.init({ target: window });
		} catch (error) {
			console.error(
				"Failed to load the OpenFin API shim. Please note this is an example and you should implement your own approach for production.",
				error
			);
		}
	}
})();
