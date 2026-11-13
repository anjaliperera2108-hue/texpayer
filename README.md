# Name: A.A.D.A.Perera - ID: FGS/MSc/CS/2025/002

## QuickTax

QuickTax helps vehicle owners review emissions-test records, check renewal dates and sample fees, and keep frequently used records in Favorites. It is a frontend-only JavaScript Expo Router app. The six hard-coded records use fictional vehicle registrations, realistic vehicle models and dates, and sample Sri Lankan rupee amounts. Their statuses are fixed to illustrate the three filter categories. QuickTax uses bundled data and assets and requires no API keys, database, or account.

## Screens

| Screen | Purpose | Route |
| --- | --- | --- |
| Vehicles | Browse six emissions records, filter by renewal status, save favorites, and observe the foreground-return counter. | `app/(tabs)/index.js` |
| Favorites | Open or remove records saved from either tab or the details screen. | `app/(tabs)/favorites.js` |
| Record details | View a vehicle's test information, renewal date and sample fee breakdown. Save the record or send a local test reminder. | `app/list/[id].js` |

The filter sheet is a React Native `Modal` inside Vehicles. The app has three routed screens.

## Core React Native components

| Component | Where it is used |
| --- | --- |
| `View` and `Text` | Screen headers, record cards, status labels, fee rows, counter and feedback. |
| `Image` | `components/Hero.js` displays the bundled QuickTax vehicle illustration from the original app. |
| `Pressable` | Record links, favorite buttons, filter controls, detail back button and reminder button. |
| `FlatList` | Vehicles renders the hard-coded data from `data/records.js`. Favorites renders the saved subset. Both lists use the stable record ID as the key. |
| `Modal` | `components/FilterModal.js` presents renewal-status choices. Apply updates the list. Close, tapping outside, or Android Back dismisses the draft. |
| `ScrollView` | The detail page and the filter sheet support smaller viewports and larger text. |

## Routing and shared state

The app was scaffolded with the Expo SDK 54 default template and its routes were converted to JavaScript. The package entry point is `expo-router/entry`.

```text
app/
  _layout.js           Root Stack and QuickTaxProvider
  (tabs)/
    _layout.js         Vehicles and Favorites tabs
    index.js           Vehicles
    favorites.js       Favorites
  list/
    _layout.js         Nested Stack for record details
    [id].js            Record details by ID
```

Either tab opens the same dynamic detail route. The back button returns to the originating tab during in-app navigation. A directly opened detail route can return to Vehicles. Unknown record IDs display a link back to the list.

`state/QuickTaxContext.js` holds the favorite IDs and foreground count in the root provider. Saving or removing a record updates all three screens in the same session. Both values reset when the app restarts. The provider subscribes to `AppState` changes, counts a return only after the app entered the background, and removes the subscription on unmount. On a phone, press Home, reopen QuickTax, and check **Foreground returns** on Vehicles.

## Local notifications

I used the Expo Notifications API reference to choose a one-shot time-interval trigger, the foreground handler options, and Android channel configuration. The native implementation in `services/reminders.native.js` creates the Android channel before checking permission, requests permission when the system allows it, and schedules a test reminder for about five seconds after permission is granted. The notification contains the selected vehicle's registration and sample renewal date. The app displays scheduling, permission, or error feedback. Local reminders run on Android and iOS. The web preview displays a platform availability message when the button is pressed. [Expo Notifications documentation](https://docs.expo.dev/versions/v54.0.0/sdk/notifications/)

## Install and run

Use Node.js 20.19.4 or newer and npm. 

```bash
git clone https://github.com/anjaliperera2108-hue/texpayer.git
cd texpayer
npm ci
npm start
```

With the supplied ZIP, extract it and run `npm ci` and `npm start` inside `texpayer`. Scan the Expo QR code with an SDK 54-compatible Expo Go app, or press **a** for a running Android emulator or **i** for an iOS Simulator on macOS. Use `npm run web` for a browser preview. No `.env` file is needed.

```bash
npm run lint
npm run typecheck
npx expo export --platform all
```

### Demonstration sequence

1. Open Vehicles. Tap **Filter**, choose **Due soon**, and tap **Apply filter**. Reopen the sheet, select a different option, and dismiss it to show the applied filter is preserved.
2. Tap the heart on Toyota Axio and switch to Favorites. Open the saved record, then go back to Favorites. Remove it from the detail screen or a list and confirm both tabs reflect the change.
3. Open a record, scroll to **Renewal reminder**, and tap **Send test reminder** on Android or iOS. Allow notifications when prompted and show the system banner or notification tray after about five seconds.
4. Return to Vehicles, press the device Home button, and reopen the app. Show **Foreground returns** incrementing.

The raw screenshots and the assignment report are in [evidence/](evidence/). The screenshots show the running web export at a mobile viewport. The native notification banner and OS-level app switching should be captured on Android or iOS for the submission video.

## Publish to GitHub

```bash
git init -b main
git add .
git commit -m "Complete Assignment 01 QuickTax Expo Router app"
git remote add origin https://github.com/anjaliperera2108-hue/texpayer.git
git push -u origin main
```

The repository ignores environment files, Expo caches, dependencies, and Git metadata. The package lockfile is committed so `npm ci` installs the verified dependency set.
- **Google Drive Demo Link:** https://drive.google.com/file/d/1WmkASejSzbrBwE31uavQMEpEHGxvxFFJ/view?usp=sharing
- 
- 

)
