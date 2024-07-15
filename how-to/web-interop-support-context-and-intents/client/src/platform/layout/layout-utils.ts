/**
 * Wait for the layout and view to be ready.
 * @param layoutId The selector to wait for.
 * @returns The element when it is ready.
 */
export async function getLayoutElement(layoutId: string): Promise<Element> {
	return new Promise((resolve, reject) => {
		const layoutIdSelector = `#${layoutId}`;
		const element = document.querySelector(layoutIdSelector);

		if (element) {
			resolve(element);
			return;
		}

		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				const nodes = Array.from(mutation.addedNodes);
				for (const node of nodes) {
					if (node instanceof Element && node.matches?.(layoutIdSelector)) {
						observer.disconnect();
						resolve(node);
						return;
					}
				}
			}
		});

		observer.observe(document.documentElement, { childList: true, subtree: true });
	});
}

/**
 * Gets all the layouts available in the document.
 * @returns an array of layout elements
 */
export async function getAllLayouts(): Promise<Element[]> {
	const layouts = document.querySelectorAll("[data-openfin-layout-name]");
	if (layouts === null) {
		return [];
	}
	return Array.from(layouts);
}

/**
 * Gets a view element either from a specific layout or it searches all available layouts.
 * @param layoutElement the layout to check for the view element
 * @param name the name of the view to search for otherwise it will return the first view found
 * @returns the view element if found
 */
export async function getViewElementFromLayout(
	layoutElement: Element,
	name?: string
): Promise<Element | null> {
	const containingChild = layoutElement?.lastElementChild;
	if (containingChild?.shadowRoot) {
		const query = name ? `of-view[of-name="${name}"]` : "of-view";
		const existingView = containingChild.shadowRoot.querySelector(query);
		return existingView;
	}
	return null;
}
