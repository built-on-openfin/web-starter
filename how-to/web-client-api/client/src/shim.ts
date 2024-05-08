if (window.fin === undefined) {
	// eslint-disable-next-line @typescript-eslint/no-floating-promises, @typescript-eslint/explicit-function-return-type
	(async () => {
		try {
			const url =
				"https://built-on-openfin.github.io/web-starter/web/v18.0.0/web-client-api/js/web.client.api.bundle.js";
			const module = await import(/* webpackIgnore: true */ url);
			await module.init({ target: window });
		} catch (error) {
			console.error(
				"Failed to load the OpenFin API shim. Please note this is an example and you should implement your own approach for production.",
				error
			);
		}
	})();
}
