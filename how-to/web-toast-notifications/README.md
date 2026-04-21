![HERE Web Interop Basic Example](../../assets/openfin-web-starter.png)

> **_:information_source: HERE:_** [HERE](https://www.here.io/) libraries are a commercial product and this repo is for evaluation purposes. Use of the OpenFin npm packages is only granted pursuant to a license from OpenFin. Please [**contact us**](https://www.here.io/contact/) if you would like to request a developer evaluation key or to discuss a production license.

# HERE Web Toast Notifications

Demonstrates a provider-hosted Notification Center overlay plus toast surface, with notifications created from a page view using `@openfin/web-notifications-client`.

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

## What This Sample Shows

- Connecting a producer client with `connectToNotifications(...)`.
- Creating notifications with `create(...)` from `@openfin/web-notifications-client`.
- Initializing `@openfin/web-notifications.initNotificationCenter(...)` in the provider with dedicated center + toast containers.
- Showing the Notification Center by default when the provider loads.
- Toggling Notification Center visibility from the sample view with explicit `show()` / `hide()` calls.
- Demonstrating "transient" and "sticky" toast behaviors, appearing in the UI when the notification center is hidden.
- Keeping provider and client aligned with the same `serviceId` from the web manifest settings.

## Toast Behavior

The sample includes two notification examples:

- `toast: 'transient'` for a short-lived desktop toast.
- `toast: 'sticky'` for a toast that stays visible until the user interacts with it.

```ts
await create({
  title: 'Approval required',
  body: 'NatWest FX trade 84372 needs a second approver before execution.',
  toast: 'sticky',
  template: 'markdown'
});
```

The status panel in the view reports whether a `transient` or `sticky` toast was created so users can quickly verify behavior.

## Setup Notes

There are a few things to note before using `@openfin/core-web` with HERE Core notifications.

Firstly, please read the docs: [Get started with notifications](https://developers.openfin.co/of-docs/docs/getting-started-with-notifications)

Then follow the setup notes in [web-layout-basic](../web-layout-basic/README.md) to understand how a core-web project is structured.

### Notification Center overlay + dedicated toast host

The provider page supplies both required host elements:

- `#notification_center_container` for Notification Center initialization.
- `#notification_toast_container` for toast placement.

The center mounts as an overlay anchored on the right side of the provider page. It is visible by default, and the view page includes a button that toggles center visibility by calling `show()` / `hide()` while keeping toast delivery active.

### Required CSS

See [public/common/style/app.css](./public/common/style/app.css) for overlay, toast, and page styles adapted from the source app and [public/style/core-web-styles.css](./public/style/core-web-styles.css) for copied HERE Core Web host styles.
