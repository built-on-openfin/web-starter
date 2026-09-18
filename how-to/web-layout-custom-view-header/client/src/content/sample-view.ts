/**
 * Names the page from the query string so each view in the layout is distinguishable.
 *
 * The layout tab picks the page title up through its own title handling, and the icon shown
 * next to that title is decided by the view's `icon` component state, not by this page.
 */
function init(): void {
	const name = new URLSearchParams(window.location.search).get("name");
	if (name === null) {
		return;
	}
	document.title = name;
	const heading = document.querySelector<HTMLElement>("#view-name");
	if (heading) {
		heading.textContent = name;
	}
}

init();
