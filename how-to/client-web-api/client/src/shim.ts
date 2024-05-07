window.addEventListener("DOMContentLoaded", async () => {
	if (window.fin === undefined) {
		try {
            const url = "https://built-on-openfin.github.io/web-starter/web/vnext/client-web-api/js/client.web.api.bundle.js";
			const module = await import(/* webpackIgnore: true */url);
			await module.init({ target: window });
		} catch (error) {
			console.error(
				"Failed to load the OpenFin API shim. Please note this is an example and you should implement your own approach for production.",
				error
			);
		}
	}
});
