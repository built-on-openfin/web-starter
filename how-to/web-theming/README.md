![HERE Web Theming Example](../../assets/HERO-STARTER-WEB.png)

> **_:information_source: HERE:_** [HERE](https://www.here.io/) libraries are a commercial product and this repo is for evaluation purposes. Use of the OpenFin npm packages is only granted pursuant to a license from OpenFin. Please [**contact us**](https://www.here.io/contact/) if you would like to request a developer evaluation key or to discuss a production license.

# HERE Core Web Theming

Demonstrates theming a HERE Core Web platform from a single palette: the provider page, the web layout, the views inside it and the Web Notification Center all follow the selected brand and light/dark scheme.

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

Use the **Theme** picker and the **System / Light / Dark** toggle in the header. Raise toasts from a view and open the Notification Center with the bell button to see it follow the scheme.

## What This Sample Shows

- One theme model: each brand is a `CustomPaletteSet` (the Web Notification Center's palette type) per scheme. See [client/src/theme/presets.ts](./client/src/theme/presets.ts).
- **Web Notification Center**: the startup theme is passed to `initNotificationCenter({ theme })` and changes are applied with `setTheme({ palette, scheme })`.
- **Web layout**: the palette is mapped onto the custom properties that core-web's stylesheet exposes (`--main-background-color`, `--tab-background-color`, `--focused-tab-border-top-color`, ...) and the `light-theme` class core-web uses for light-scheme icon tints. See [client/src/platform/layout-theme.ts](./client/src/platform/layout-theme.ts).
- **Views**: the provider shares the current theme over a channel. Each view applies it as `--theme-*` custom properties plus a `theme-light` / `theme-dark` class, the convention HERE Workspace uses for views on the desktop, so the same stylesheets (e.g. [common.css](./public/common/style/common.css)) work in both environments.
- Following the operating system scheme while **System** is selected.

## How It Fits Together

```text
header controls ──► resolveTheme(brand, scheme) ──► Theme { scheme, palette }
                                                        │
              ┌─────────────────────┬───────────────────┼───────────────────────┐
              ▼                     ▼                   ▼                       ▼
     provider page CSS       web layout CSS     Notification Center     theme channel ──► views
     (--theme-*)             (core-web vars)    (setTheme)              (--theme-*)
```

- [platform/provider.ts](./client/src/platform/provider.ts) applies the startup theme before the layout renders, then passes it to `initNotificationCenter`.
- [platform/platform-theme.ts](./client/src/platform/platform-theme.ts) creates the theme channel and applies later changes to every surface.
- [app/theme-subscriber.ts](./client/src/app/theme-subscriber.ts) is all a view needs: connect to the channel, fetch the current theme, then listen for changes.

## Things To Know

### The Notification Center applies one palette for both schemes

`setTheme({ palette })` uses the same palette for light and dark. To switch between a brand's light and dark palettes, call `setTheme` with the matching palette whenever the scheme changes, as this example does.

### Notification Center palette support (45.2.x)

In `@openfin/web-notifications` 45.2.0-alpha-5087 (also 45.2.5 and the 45.3 / 46.0 alphas), `scheme` is applied but `palette` has no visible effect. The Notification Center and toasts style themselves with built-in design tokens, and `setTheme` does not map the palette onto them. This example still passes the palette so it will pick it up once that mapping is in place. Until then the Notification Center shows the HERE light and dark colors.

### core-web layouts have no theme API

Layout theming is done through the stylesheet copied from `@openfin/core-web` ([public/style/core-web-styles.css](./public/style/core-web-styles.css)). It exposes custom properties for its colors, so set those rather than overriding its selectors. The tab close icon is white in core-web, so [provider.css](./public/platform/provider.css) tints it under `light-theme`, matching how core-web tints its other icons.

### Views are separate documents

core-web does not push a theme into views. Views receive it from the provider over `fin.InterApplicationBus.Channel` and apply it themselves.

## Setup Notes

Read the setup notes in [web-layout-basic](../web-layout-basic/README.md) to understand how a core-web project is structured, and [web-notifications](../web-notifications/README.md) for hosting the Notification Center and toasts.
