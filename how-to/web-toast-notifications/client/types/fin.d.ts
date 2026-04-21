import type { DesktopAgent } from "@finos/fdc3";
import type { OpenFin } from "@openfin/core-web";

declare global {
	const fin: OpenFin.Fin<"external connection">;
	interface Window {
		fin?: OpenFin.Fin<"external connection">;
		fdc3?: DesktopAgent;
	}
}
