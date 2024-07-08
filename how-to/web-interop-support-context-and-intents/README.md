![OpenFin Support Context and Intents Example](../../assets/openfin-web-starter.png)

> **_:information_source: OpenFin:_** [OpenFin](https://www.openfin.co/) libraries are a commercial product and this repo is for evaluation purposes. Use of the OpenFin npm packages is only granted pursuant to a license from OpenFin. Please [**contact us**](https://www.openfin.co/contact/) if you would like to request a developer evaluation key or to discuss a production license.

# OpenFin - Support Context and Intents

This is a richer example of an implementation of an interop broker override and layout override showing to support an fdc3 app directory with support for context and intents.

It uses the [@openfin/core-web](https://www.npmjs.com/package/@openfin/core-web) library.

The platform supports multiple layouts and brings in a number of OpenFin sample applications that are used in our workspace platform starter examples.

The platform also supports:

## FDC3 Related

- Reading multiple fdc3 app directories' endpoints to create a list of applications
- The ability to launch an app using fdc3.open
- The ability to raise intents or raise intents by context
- The ability to find instances of applications and target them when raising an intent.
- The ability to share context across content.
- The ability to share context across platforms and machines using our [@openfin/cloud-interop](https://www.npmjs.com/package/@openfin/cloud-interop) library

## Layout

To show content in a multi-layout UI we implemented a layoutManagerOverride so that we can:

- Add and remove layouts
- Load a saved collection of layouts
- Switch the layout that is being viewed
- Finding the identity of a layout that contains a specific piece of content.
- Get the current snapshot of all the layouts and the currently focused layout.

## Apps

We bring in a number of apps from our workspace platform starter and dev tools. We also include 4 basic apps that support context and intents (using the fdc3 and Interop API).

[Live Launch Example](https://built-on-openfin.github.io/web-starter/web/v19.0.0/web-interop-support-context-and-intents/platform/provider.html)

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

There are a few things to note before trying to use @openfin/core-web:

- If your [tsconfig](./client/tsconfig.json) file is using **node** for moduleResolution it will need to use **Node16** instead as export/imports are defined in the package.json of the @openfin/core-web npm package. This is required for when you try to import @openfin/core-web/iframe-broker.
- You will need to copy the shared-worker.js file from the [@openfin/core-web](https://www.npmjs.com/package/@openfin/core-web) npm package to your public folder. We have created a [copy-core-web.js](./scripts/copy-core-web.js) script to do this and it is referenced in the build-client npm command.
- You will need to copy the styles.css file for styling the layout from the [@openfin/core-web](https://www.npmjs.com/package/@openfin/core-web) npm package to your public folder. We have created a [copy-core-web.js](./scripts/copy-core-web.js) script to do this and it is referenced in the build-client npm command.

## Settings

To make it easier to update settings we include a definition of where to fetch settings in our web [manifest.json](./public/manifest.json) inside of _custom_settings_.

```json
{
  "name": "OpenFin - Support Context and Intents",
  "short_name": "OpenFinSupportInteropContextAndIntents",
  "start_url": "./platform/provider.html",
  "display": "standalone",
  "background_color": "#fff",
  "description": "An example showing a implementation of the OpenFin Core Web Library to support context and intents as well as layouts.",
  "icons": [
    {
      "src": "common/images/icon-blue.png",
      "sizes": "72x72",
      "type": "image/png"
    }
  ],
  "related_applications": [],
  "custom_settings": {
    "endpointProvider": {
      "endpoints": [
        {
          "id": "platform-settings",
          "type": "fetch",
          "options": {
            "method": "GET",
            "url": "http://localhost:6060/settings.json"
          }
        }
      ]
    }
  }
}
```

As you can see it will fetch a [settings.json](./public/settings.json) file. The shape of this file can be seen in [client/src/shapes/setting-shapes.ts](./client/src/shapes/setting-shapes.ts) is as follows:

```typescript
/**
 * Settings for the client
 */
export interface Settings {
  /**
   * Platform settings
   */
  platform: {
    interop: {
      sharedWorkerUrl: string;
      brokerUrl: string;
      providerId: string;
      defaultContextGroup?: string;
      overrideOptions: PlatformInteropBrokerOptions;
    };
    cloudInterop: {
      connectParams: CloudInteropOverrideParams;
    };
    layout: {
      addLayoutId: string;
      deleteLayoutId: string;
      layoutContainerId: string;
      layoutSelectorId: string;
      defaultLayout: PlatformLayoutSnapshot | string;
    };
    ui: {
      logo: string;
      title: string;
      subTitle: string;
      settingsResolver: SettingsResolverOptions;
    };
    app: {
      directory: string;
      appResolver: AppResolverOptions;
    };
  };
}
```
