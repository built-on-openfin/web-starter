![HERE Web Notifications Example](../../assets/HERO-STARTER-WEB.png)

> **_:information_source: HERE:_** [HERE](https://www.here.io/) libraries are a commercial product and this repo is for evaluation purposes. Use of the OpenFin npm packages is only granted pursuant to a license from OpenFin. Please [**contact us**](https://www.here.io/contact/) if you would like to request a developer evaluation key or to discuss a production license.

# HERE Core Web Notifications

Demonstrates a provider-hosted Notification Center overlay plus toast surface, with notifications created from a page view using `@openfin/notifications`.

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

- Connecting a producer client with `register(...)` via `externalProviderConfig`.
- Creating notifications with `create(...)` from `@openfin/notifications`.
- Initializing `@openfin/web-notifications.initNotificationCenter(...)` in the provider with dedicated center + toast containers.
- Hiding the Notification Center by default and opening it on demand.
- Toggling Notification Center visibility from the provider with explicit `show()` / `hide()` calls.
- Demonstrating "transient" and "sticky" toast behaviors, appearing in the UI when the notification center is hidden.
- Keeping provider and client aligned with the same `serviceId` from the web manifest settings.

The event log in the view reports which toast mode was used when a notification is created, so users can quickly verify behavior.

## Setup Notes

There are a few things to note before using `@openfin/core-web` with HERE Core notifications.

Firstly, please read the docs: [Get started with notifications](https://developers.openfin.co/of-docs/docs/getting-started-with-notifications)

Then follow the setup notes in [web-layout-basic](../web-layout-basic/README.md) to understand how a core-web project is structured.

### Notification Center overlay + dedicated toast host

The provider page supplies both required host elements:

- `#notification_center_container` for Notification Center initialization.
- `#notification_toast_container` for toast placement.

The center mounts as an overlay anchored on the right side of the provider page. It is hidden by default, and the provider page includes a toggle button that controls center visibility by calling `show()` / `hide()` while keeping toast delivery active.

### Required CSS

See [public/platform/provider.css](./public/platform/provider.css) for overlay, toast, and page styles and [public/style/core-web-styles.css](./public/style/core-web-styles.css) for copied HERE Core Web host styles.
