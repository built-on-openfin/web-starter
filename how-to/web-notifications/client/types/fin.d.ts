import type { OpenFin } from "@openfin/core-web";
import type { DesktopAgent } from "@finos/fdc3";

declare global {
	const fin: OpenFin.Fin<"external connection">;
	interface Window {
		fin?: OpenFin.Fin<"external connection">;
		fdc3?: DesktopAgent;
	}
}
