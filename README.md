# Ava

**Ava** is an AI-native browser: browse the web and talk to an assistant about the current page — on phone, tablet, laptop, watch, and with smart ring / cane input.

## Platforms

| Target | How it runs |
|--------|-------------|
| **Phone** | Capacitor Android APK (primary mobile deliverable); compact chrome |
| **Tablet** | Same app / web build; side-by-side page + AI panel from ~768px |
| **Laptop** | First-class in Chrome / Safari / Edge via `npm start`; dockable AI panel + keyboard shortcuts |
| **Watch** | Narrow layout (`max-width: 280px` or `max-height: 300px`) |
| **Ring / cane** | DeviceOrientation / DeviceMotion gestures (iOS 13+ permission flow) |

Electron/Tauri are out of scope; the laptop experience is the web app itself.

## Quick start (laptop / tablet browser)

```bash
cd /Users/skat/Projects/active/ava
npm install
npm start
```

Open **http://localhost:4173**. Use the omnibox to navigate or ask Ava.

### Keyboard (laptop)

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + L` | Focus omnibox |
| `Ctrl/Cmd + Enter` | Send AI message (or ask from omnibox) |
| `Esc` | Close AI panel / overlays |

## Android APK

```bash
npm install
npm run build          # sync index.html → www/ (+ android assets when present)
npx cap add android    # first time only
npm run sync
cd android && ./gradlew assembleDebug
```

Or: `npm run android` (build + sync + assembleDebug).

Debug APK:

`android/app/build/outputs/apk/debug/app-debug.apk`

Requires JDK 17+ and Android SDK (`ANDROID_HOME`). Example:

```bash
export JAVA_HOME="/opt/homebrew/Cellar/openjdk@17/17.0.19/libexec/openjdk.jdk/Contents/Home"
export ANDROID_HOME="$HOME/Library/Android/sdk"
```

### After HTML changes

Always sync web assets before packaging:

```bash
npm run build   # or npm run sync
```

Copies `index.html` → `www/index.html` and `android/app/src/main/assets/public/index.html`.

## iOS (optional scaffold)

An `ios/` Capacitor project is included. `pod install` may need UTF-8 locale:

```bash
export LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8
npm run sync
cd ios/App && pod install
npx cap open ios
```

If CocoaPods fails, Android APK + `npm start` (laptop) remain the primary deliverables.

## AI configuration

Settings (gear icon) stores values in **localStorage** only:

- **API base URL** — OpenAI-compatible endpoint (default `https://api.openai.com/v1`)
- **API key** — sent only to that endpoint
- **Model** — e.g. `gpt-4o-mini`
- **Home page** — `ava:home` or a URL

Without a key, Ava uses an **offline mock** (template summaries, search suggestions). Do not commit secrets.

## Omnibox

- Looks like a URL/domain → navigate
- Natural language → AI query (response + optional suggested navigation)

## AI page assistant

Bottom sheet on phone; side panel on tablet/laptop. Actions: summarize, takeaways, explain, related pages. Uses extracted page text when the iframe allows; otherwise URL/title context (CORS limits).

## Smart device gestures

| Device | Gesture | Action |
|--------|---------|--------|
| Ring | Tilt up/down (>5°) | Scroll page |
| Ring | Tilt left/right (>5°) | Back/forward or toggle AI |
| Ring | Shake (>20°) | Confirm navigate / send AI |
| Cane | Tap (accel spike >8) | Toggle AI panel |
| Cane | Swing (>3) | Scroll |
| Watch | Narrow CSS | Compact chrome, large Ava brand |

Ring throttled ~8 frames; cane ~6 frames. On iOS, tap the Ring/Cane status chips to grant motion permission.

## Project layout

```
index.html          # source UI
www/                # Capacitor webDir
android/            # Capacitor Android
scripts/build-web.js
capacitor.config.json
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm start` / `npm run dev` | Serve `www` on port 4173 (laptop) |
| `npm run build` | Sync HTML → www (+ android assets) |
| `npm run sync` | build + `cap sync` |
| `npm run android` | sync + `assembleDebug` |
