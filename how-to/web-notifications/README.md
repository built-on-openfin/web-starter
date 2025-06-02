![OpenFin Web Interop Basic Example](../../assets/openfin-web-starter.png)

> **_:information_source: OpenFin:_** [OpenFin](https://www.openfin.co/) libraries are a commercial product and this repo is for evaluation purposes. Use of the OpenFin npm packages is only granted pursuant to a license from OpenFin. Please [**contact us**](https://www.openfin.co/contact/) if you would like to request a developer evaluation key or to discuss a production license.

# OpenFin Web Notifications

Demonstrates [Notification Center in a web browser](https://resources.here.io/docs/core/hc-ui/notifications/web-nfn-center)

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

## Setup Notes

There are a few things to note before using `@openfin/core-web` and the web notification center.

Firstly, please read the docs: [Notification Center in a web browser](https://resources.here.io/docs/core/hc-ui/notifications/web-nfn-center)

Then follow the setup notes in [web-layout-basic](../web-layout-basic/README.md) to understand how a core-web project is structured.

#### Peer dependencies

`@openfin/web-notifications` and `@openfin/web-notifications-client` have peer dependencies. The npm install process should indicate which ones
need to be added to your project.

#### Required CSS

See [public/common/style/app.css]() for css that the notification center needs to function correctly. 

Note the `#notification_center_container` class which positions the component on your page. You can alter these styles to change its position or size.