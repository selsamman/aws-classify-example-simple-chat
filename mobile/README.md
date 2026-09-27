# Mobile chat app

The mobile app uses Expo SDK 57 and shares its request classes with `cloud` and `web`. Install Node.js 24 LTS, then run `npm install` **once from the repository root**. After that, run the scripts below from their own folders. In WebStorm, you can use the Run button beside each script in `package.json`; you do not need `--workspace` when running from a subfolder.

## iOS simulator with the local backend

Start `dev` from `cloud/package.json`, then start `ios:offline` from `mobile/package.json`. The equivalent terminal commands are:

```bash
cd cloud
npm run dev
```

In a second terminal:

```bash
cd mobile
npm run ios:offline
```

`dev` starts Dynalite, Serverless Offline, and Vite. If you only need mobile, run `npm run offline` in `cloud` instead; it skips Vite. `ios:offline` sends the iOS simulator to `http://127.0.0.1:4000/api/dispatch`. It is intended for the simulator on the same Mac, not a physical phone.

## iOS or Android with a deployed backend

Deploy the cloud app first. Its `cloud/output.json` gives the mobile scripts the deployed API address. From `mobile`, run `npm run ios` or `npm run android`, or click those scripts in WebStorm. The Android script currently uses a deployed backend; a local Android emulator route has not been configured.

To use another backend, create `mobile/.env.local` with its full dispatch URL:

```text
EXPO_PUBLIC_API_URL=https://your-chat-host/api/dispatch
```

The start scripts use that URL instead of `cloud/output.json`. Expo also reads the file when you run Expo CLI directly. For EAS builds, configure the same public URL in the build environment.

## Checks and Expo Go

From `mobile`, run `npm run typecheck` and `npm run doctor`. `npm run export -- --platform ios` and `npm run export -- --platform android` check that Metro can bundle both platforms.

Expo Go must match the SDK used by this project. Android devices and emulators and the iOS simulator can install a matching build from [expo.dev/go](https://expo.dev/go). As of September 2026, Expo Go from the iOS App Store supports SDK 54, so testing SDK 57 on a physical iPhone requires a development build or matching Expo Go distributed through TestFlight. See [Expo's compatibility guide](https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/).

## Keeping Expo current

The SDK is pinned in `mobile/package.json` and the root lockfile so a later checkout installs a tested set of packages. Dependabot checks monthly for Expo updates, and CI checks pull requests with TypeScript, Expo Doctor, and iOS/Android exports. A new SDK still needs review and a device check because Expo Go and native modules must match it. Follow the [Expo upgrade guide](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/), align React versions in both apps and the root override, run `npm exec --workspace mobile -- expo install --fix` from the root, then repeat the checks above.
