import type { DefaultAPIContainerShape } from "./client-shapes";
import { init } from "./shim-client";
// eslint-disable-next-line @typescript-eslint/no-floating-promises, @typescript-eslint/explicit-function-return-type
(async () => {
	await init({
		target: window as unknown as DefaultAPIContainerShape,
		requestConnectOptions: { strategy: "request-on-failure" }
	});
})();
