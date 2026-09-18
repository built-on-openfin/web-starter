![HERE Web Layout Custom View Header Example](../../assets/openfin-web-starter.png)

> **_:information_source: HERE:_** [HERE](https://www.here.io/) libraries are a commercial product and this repo is for evaluation purposes. Use of the OpenFin npm packages is only granted pursuant to a license from OpenFin. Please [**contact us**](https://www.here.io/contact/) if you would like to request a developer evaluation key or to discuss a production license.

# HERE Web Layout Custom View Header

This example builds on [web-layout-basic](../web-layout-basic/README.md) and customizes the tab header of each view in the layout. It shows the two parts of tab header customization in [@openfin/core-web](https://www.npmjs.com/package/@openfin/core-web):

- the per view `icon` setting, which decides the icon shown on a tab
- the `renderCustomTabControls` callback, which lets you inject your own controls into every tab

The layout has three tabs loading the same page so that only the `icon` setting differs:

- **Explicit icon** supplies a URL and always shows that purple star, ignoring the page favicon.
- **Hidden icon** uses `icon: "hide"` and shows nothing, even though the layout enables favicons.
- **Inherited icon** uses `icon: "unset"` and shows the page's own green favicon. Without a page favicon it would fall back to the layout's `defaultFaviconUrl`, and without that to no icon at all.

Each tab has a bookmark control after its favicon and an info control before its close button. Click a control, or focus the active tab and use the arrow keys and Enter/Space, to update the status text in the header.

## Getting Started

1. Install dependencies and do the initial build. Note that these examples assume you are in the sub-directory for the example.

```shell
npm install
```

2. Build the example.

```shell
npm run build
```

3. Start the test server in a new window.

```shell
npm run start
```

4. Launch the sample in your default desktop browser (or copy <http://localhost:6060/platform/provider.html> into your Desktop Browser).

```shell
npm run client
```

## Requirements

- `@openfin/core-web` 0.45.113 or later
- The layout must set `tabOverflowBehavior: "scroll"`. Core Web only wires up `renderCustomTabControls` for layouts using that setting.

The callback is experimental in this release.

## Tab icons

On the web the favicon settings live in the **layout settings**, not in window options. This is the relevant part of [default.layout.fin.json](./public/layouts/default.layout.fin.json):

```json
{
  "settings": {
    "tabOverflowBehavior": "scroll",
    "showFavicons": true,
    "defaultFaviconUrl": "http://localhost:6060/images/default-tab.svg"
  }
}
```

A view then opts out of that behaviour with its own `icon` entry in component state:

```json
{
  "type": "component",
  "componentName": "view",
  "componentState": {
    "name": "branded-view",
    "url": "http://localhost:6060/views/sample-view.html?name=Explicit%20icon",
    "icon": "http://localhost:6060/images/branded-tab.svg"
  },
  "title": "Explicit icon"
}
```

`icon` takes a URL, `"hide"` or `"unset"`. Inherited icons are read from the loaded page's `<link rel="icon">` element, which means the view has to be on the same origin as the host page. Cross origin content always falls back to `defaultFaviconUrl`.

## Custom tab controls

`renderCustomTabControls` is an option on `fin.Platform.Layout.create()` — not on `connect()` or `Layout.init()`. Core Web calls it once per tab after it has built the tab DOM, and passes the `.lm_tab` element plus a context holding the view identity and the DOM anchors for the tab:

```typescript
await fin.Platform.Layout.create({
  container,
  layoutName,
  layout,
  renderCustomTabControls: (tabElement, context) => {
    const button = createControl('Bookmark view', '★');
    button.addEventListener('click', onBookmark);
    // context gives you viewIdentity, titleElement, faviconElement and closeElement
    context.faviconElement?.after(button);
    return () => button.remove();
  }
});
```

Add the `lm_tab_custom_control` class to each control, as a direct child of `tabElement`, to enroll it in the layout's tab chrome. That gives you keyboard navigation (roving tabindex, arrow keys, Enter/Space without switching tabs), pointer isolation so a click does not activate or close the tab, and the default control sizing. Dragging a tab still behaves normally.

The callback returns a cleanup function that removes event listeners and DOM nodes when the tab is destroyed. Callback functions and custom DOM are not saved in snapshots, so the callback is invoked again whenever tabs are recreated.

### Why this example uses a layout manager override

[web-layout-basic](../web-layout-basic/README.md) hands its snapshot to `connect()` and lets `Layout.init()` apply it. That path never passes through `Layout.create()` from your own code, so there is nowhere to supply the callback.

This example therefore applies the snapshot itself through a `layoutManagerOverride`, which is the same override hook used by [web-layout](../web-layout/README.md) for multiple layouts:

```typescript
await fin.Platform.Layout.init({
  container: PARENT_CONTAINER,
  layoutManagerOverride: makeOverride(fin, PARENT_CONTAINER)
});
```

Inside the override, `applyLayoutSnapshot` creates each layout with the callback attached. Everything else — `connect()`, the iframe broker, `Interop.init()` — is unchanged from web-layout-basic.

## How things are structured

### Host

The host is the entry point and the page that gets loaded into the browser tab. [provider.ts](./client/src/provider.ts) connects to the Web Broker, initializes interop, and initializes the layout with the override described above. [provider.html](./public/platform/provider.html) brings in the bundle, the layout system's css, and provides the `#layout_container` element and the status output the controls write to.

### IFrame Broker

This is the iframe referenced by the host so that content can use the HERE API. The [iframe broker html page](./public/platform/iframe-broker.html) and the shared worker must be served from the same domain as the host. Both the shared worker and the layout css come from the [@openfin/core-web](https://www.npmjs.com/package/@openfin/core-web) npm package and are copied into the public folder by [scripts/copy-core-web.js](./scripts/copy-core-web.js) as part of the build.

### Content

[sample-view.html](./public/views/sample-view.html) is a deliberately plain page. It declares a green favicon and names itself from a query string so the three tabs can be told apart. It is served from the same origin as the host so that the inherited icon case has a page favicon to pick up.

## Related APIs

- [CreateLayoutOptions](https://developer.openfin.co/docs/javascript/45.150.101.1/interfaces/OpenFin.CreateLayoutOptions.html)
- [CustomTabControlsContext](https://developer.openfin.co/docs/javascript/45.150.101.1/interfaces/OpenFin.CustomTabControlsContext.html)
