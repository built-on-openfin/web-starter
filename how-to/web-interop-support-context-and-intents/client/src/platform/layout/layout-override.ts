import type { OpenFin } from "@openfin/core";
import type { WebLayoutSnapshot } from "@openfin/core-web";
import type {
	LayoutManager,
	LayoutManagerConstructor,
	LayoutManagerItem,
	PlatformLayoutSnapshot
} from "../../shapes/layout-shapes";

/**
 * MakeOverride assists in loading the Fin object before the applyLayoutSnapshot Manager call.
 * @param fin the fin object.
 * @param layoutContainerId the layout container id.
 * @param layoutSelectorId the layout selector id.
 * @returns a function call.
 */
export function makeOverride(
	fin: OpenFin.Fin<OpenFin.EntityType>,
	layoutContainerId: string,
	layoutSelectorId: string
) {
	return function layoutManagerOverride(Base: LayoutManagerConstructor): LayoutManagerConstructor {
		/**
		 * @class LayoutManagerBasic
		 * This implementation is the fundamental override for Multiple Layouts in Web.
		 */
		return class LayoutManagerBasic extends Base implements LayoutManager {
			private _layoutMapArray: LayoutManagerItem[];

			private readonly _layoutContainer: HTMLElement | null;

			private readonly _layoutSelector: HTMLSelectElement | null;

			private _selectedLayout: string | undefined;

			/**
			 * Sets up the required variables for the layout manager.
			 */
			constructor() {
				super();
				this._layoutMapArray = [];
				this._layoutContainer = document.querySelector<HTMLElement>(`#${layoutContainerId}`);
				this._layoutSelector = document.querySelector<HTMLSelectElement>(`#${layoutSelectorId}`);
				if (this._layoutSelector !== null) {
					this._layoutSelector.addEventListener("change", async (event) => {
						const selectElement = event.target as HTMLSelectElement;
						const selectedValue = selectElement.value;
						await this.showLayout({ layoutName: selectedValue, uuid: fin.me.uuid, name: fin.me.name });
					});
				}
			}

			/**
			 * Our implementation of getLayoutSnapshot that contains titles.
			 * @returns Promise<PlatformLayoutSnapshot>
			 */
			public async getLayoutSnapshot(): Promise<PlatformLayoutSnapshot> {
				const layoutSnapshot = await super.getLayoutSnapshot();
				const platformLayoutSnapshot: PlatformLayoutSnapshot = {
					layouts: layoutSnapshot.layouts,
					layoutTitles: {},
					layoutSelected: this._selectedLayout
				};
				for (const layout of this._layoutMapArray) {
					if (layout.layoutTitle !== undefined) {
						platformLayoutSnapshot.layoutTitles[layout.layoutName] = layout.layoutTitle;
					}
				}
				return platformLayoutSnapshot;
			}

			/**
			 * Override for applying multiple snapshots.
			 * @param snapshot The layouts object containing the fixed set of available layouts.
			 */
			public async applyLayoutSnapshot(snapshot: WebLayoutSnapshot): Promise<void> {
				console.log(`[Apply Layout] Does this exist? ${Boolean(this._layoutContainer)}`);
				if (this._layoutContainer !== null && this._layoutContainer !== undefined) {
					const platformLayoutSnapshot = snapshot as PlatformLayoutSnapshot;
					for (const [key, value] of Object.entries(snapshot.layouts)) {
						const layoutTitle =
							platformLayoutSnapshot?.layoutTitles === undefined
								? undefined
								: platformLayoutSnapshot.layoutTitles[key];
						this._layoutMapArray.push({
							layoutName: key,
							layoutTitle,
							layout: value,
							container: this._layoutContainer
						});
					}
					setTimeout(async () => {
						const entries = Object.entries(platformLayoutSnapshot.layouts);
						let entryInstance = 0;
						for (const entry of entries) {
							entryInstance++;
							const layoutName = entry[0];
							await this.createLayout(
								layoutName,
								entry[1],
								entryInstance,
								entries.length,
								platformLayoutSnapshot.layoutSelected
							);
						}
					}, 1000);
					console.log("[Apply Layout] Layouts loaded");
					console.log(`[Apply Layout] Layouts are: ${JSON.stringify(this._layoutMapArray)}`);
				}
			}

			/**
			 * Shows the layout specified by the layoutName.
			 * @param layoutName The name of the layout to show.
			 * @param layoutName.layoutName The name of the layout to show.
			 * @returns Promise<void>
			 */
			public async showLayout({ layoutName }: OpenFin.LayoutIdentity): Promise<void> {
				const layoutContainers = document.querySelectorAll<HTMLElement>("div.layout-container");
				for (const layoutContainer of layoutContainers) {
					if (layoutContainer.id === layoutName) {
						layoutContainer.style.display = "block";
						this._selectedLayout = layoutName;
					} else {
						layoutContainer.style.display = "none";
					}
				}
			}

			/**
			 * Remove Layout - You guessed it, it removes a layout from the existing array of layouts.
			 * @param id The name of the layout you want removed.
			 */
			public async removeLayout(id: OpenFin.LayoutIdentity): Promise<void> {
				const index = this._layoutMapArray.findIndex((x) => x.layoutName === id.layoutName);
				console.log(`[LM Override] Removing Layout ${id.layoutName}`);
				console.log(`[LM Override] Found layout at index ${index}`);
				await this.removeThisLayout(id.layoutName, index);
			}

			/**
			 * Returns the layout identity for the specified view identity.
			 * @param viewIdentity The view identity to get the layout identity for.
			 * @returns The layout identity for the specified view identity.
			 * @throws Error if the view is not found in any layout.
			 */
			public getLayoutIdentityForView(viewIdentity: OpenFin.Identity): OpenFin.LayoutIdentity {
				const viewElement = document.querySelector<HTMLElement>(`of-view[of-name="${viewIdentity.name}"]`);
				if (viewElement !== null) {
					const layoutElement = viewElement.closest(".layout-container");
					if (layoutElement !== null) {
						return { layoutName: layoutElement.id, uuid: fin.me.uuid, name: fin.me.name };
					}
				}

				throw new Error("View not found in any layout");
			}

			/**
			 * Given a layout identity it determines if the layout is currently visible.
			 * @param layoutName The layout identity.
			 * @param layoutName.layoutName The name of the layout.
			 * @returns Whether the layout is visible.
			 */
			public isLayoutVisible({ layoutName }: OpenFin.LayoutIdentity): boolean {
				return layoutName === this._selectedLayout;
			}

			/**
			 * This returns the number of layouts in the layout manager.
			 * @returns The number of layouts in the layout manager.
			 */
			public size(): number {
				return this._layoutMapArray.length;
			}

			/**
			 * Removes this layout from the state and the DOM.
			 * @param layoutName The name of the layout to remove.
			 * @param index The index of the layout that is being removed.
			 */
			private async removeThisLayout(layoutName: string, index: number): Promise<void> {
				// remove layout from state.
				const layoutNameElement = document.querySelector<HTMLElement>(`#${layoutName}`);
				if (layoutNameElement) {
					layoutNameElement.remove();
					await fin.Platform.Layout.destroy({ layoutName, uuid: fin.me.uuid, name: fin.me.name });
					this._layoutMapArray = this._layoutMapArray.filter((x) => x.layoutName !== layoutName);
					const nextLayoutName =
						this._layoutMapArray[index]?.layoutName ?? this._layoutMapArray[index - 1]?.layoutName;
					if (this._layoutSelector !== null) {
						for (let i = 0; i < this._layoutSelector.options.length; i++) {
							if (this._layoutSelector.options[i].value === layoutName) {
								this._layoutSelector.remove(i);
								break;
							}
						}
						this.bindLayoutSelector(nextLayoutName, false);
						await this.showLayout({ layoutName: nextLayoutName, uuid: fin.me.uuid, name: fin.me.name });
					}
				}
			}

			/**
			 * A Create function for layouts.
			 * @param layoutName A string for the layout name.
			 * @param layout LayoutOptions.
			 * @param entry the entry from the batch that is being created.
			 * @param length the total number of layouts to create.
			 * @param selectedLayout the layout that is selected.
			 */
			private async createLayout(
				layoutName: string,
				layout: OpenFin.LayoutOptions,
				entry: number,
				length: number,
				selectedLayout: string | undefined
			): Promise<void> {
				// Create a new div container for the layout.
				const container = document.createElement("div");
				container.id = layoutName;
				container.className = "col fill layout-container";
				container.style.display = "none";
				this._layoutContainer?.append(container);
				if (entry === length) {
					this.bindLayoutSelector(selectedLayout ?? layoutName);
					await this.showLayout({
						layoutName: selectedLayout ?? layoutName,
						uuid: fin.me.uuid,
						name: fin.me.name
					});
				}
				// Finally, call the Layout.create() function to apply the snapshot layout to the div we just created.
				await fin.Platform.Layout.create({ layoutName, layout, container });
			}

			/**
			 * Binds the layout selector to the latest collecting of layouts and selects the specified layout.
			 * @param layoutName The name of the layout to bind to the layout selector.
			 * @param rebind Whether to rebind the layout selector.
			 */
			private bindLayoutSelector(layoutName: string, rebind: boolean = true): void {
				if (this._layoutSelector !== null) {
					if (rebind) {
						this._layoutSelector.innerHTML = "";
						for (const layout of this._layoutMapArray) {
							const option = document.createElement("option");
							option.value = layout.layoutName;
							option.text = layout.layoutTitle ?? layout.layoutName;
							this._layoutSelector.add(option);
						}
					}
					this._layoutSelector.value = layoutName;
				}
			}
		};
	};
}
