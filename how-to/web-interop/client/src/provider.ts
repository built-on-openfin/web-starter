/* eslint-disable func-style */
import type OpenFin from "@openfin/core";
import { connect, type WebLayoutSnapshot } from "@openfin/core-web";
import "./util/buffer";
import { getSettings } from "./platform/settings";

/**
 * Initializes the OpenFin Web Broker connection.
 */
async function init(): Promise<void> {
	const settings = await getSettings();
	const layoutSnapshot: WebLayoutSnapshot = settings.layout.defaultLayout;
	const layoutContainer = document.querySelector<HTMLElement>(`#${settings.layout.layoutContainerId}`);
	if(layoutContainer === null) {
		// error
	} else {
		// Connect to the OpenFin Web Broker.
		const fin = await connect({ options: { brokerUrl: settings.platform.brokerUrl },
			platform: { layoutSnapshot } });

		// You may now use the `fin` object.
		await fin.Interop.init(settings.platform.providerId);

		function createLayout({ layoutName, layout }, i) {
			const layoutIdentity = { layoutName };
			const layoutDiv = document.createElement('div');
			layoutDiv.id = `layout-${i}`;
			layoutDiv.innerText = layoutName;
			layoutContainer.appendChild(layoutDiv);
			return layoutIdentity;
		};

		const layoutManagerOverride = (Base) =>
            class E2ELayoutManager extends Base {
                async applyLayoutSnapshot({ layouts }) {
                    await Promise.all(
                        Object.entries(layouts).map(async ([layoutName, layout], i) =>
                            createLayout({ layoutName, layout }, i)
                        )
                    );
                }
                async removeLayout(layoutIdentity) {
                    console.log(`[platform-window] manager: removeLayout called for ${layoutIdentity.layoutName}`);
                }
            };

		// You may now use the `fin` object. In this case, we want to initialize and create layouts
		await fin.Platform.Layout.init({
			container: layoutContainer
		});
	}
}

init()
	.then(() => {
		console.log("Connected to the OpenFin Web Broker.");
		return true;
	})
	.catch((err) => console.error(err));
