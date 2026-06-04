import { connect, type WebLayoutSnapshot } from "@openfin/core-web";
import { BROKER_URL, LAYOUT_URL, PROVIDER_ID } from "./config";
import { getInteropBrokerOverride } from "./platform/broker/interop-override";

/**
 * Gets the default layout for this app.
 * @returns The default layout for this app.
 */
async function getDefaultLayout(): Promise<WebLayoutSnapshot> {
	const layoutResponse = await fetch(LAYOUT_URL);
	return (await layoutResponse.json()) as WebLayoutSnapshot;
}

/**
 * Initializes the OpenFin Web Broker connection.
 */
async function init(): Promise<void> {
	const layoutSnapshot = await getDefaultLayout();

	const layoutContainer = document.querySelector<HTMLElement>("#layout_container");
	if (layoutContainer === null) {
		console.error(
			"Please ensure the document has an element with the following id #layout_container so that the web-layout can be applied."
		);
		return;
	}

	const interopOverride = await getInteropBrokerOverride();

	window.fin = await connect({
		options: {
			brokerUrl: BROKER_URL,
			interopConfig: {
				providerId: PROVIDER_ID,
				currentContextGroup: "green"
			}
		},
		connectionInheritance: "enabled",
		platform: { layoutSnapshot }
	});

	await window.fin.Interop.init(PROVIDER_ID, [interopOverride]);
	await window.fin.Platform.Layout.init({ container: layoutContainer });
}

init()
	.then(() => {
		console.log("Connected to the OpenFin Web Broker.");
		return true;
	})
	.catch((err) => console.error(err));
