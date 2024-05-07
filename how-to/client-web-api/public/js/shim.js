/* eslint-disable wrap-iife */
(async function webAPIShim() {
	if (window.fin === undefined) {
		try {
			const module = await import('@built-on-openfin/web-starter-client-web-api');
			await module.init({ target: window });
		} catch (error) {
			console.error(
				'Failed to load the OpenFin API shim. Please add an importmap with an entry of @built-on-openfin/web-starter-client-web-api pointing to the javascript module. Please note this is an example and you should implement your own approach for production.',
				error
			);
		}
	}
})();
