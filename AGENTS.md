# Ava

AI-native browser: browse the web and talk to an on-device/assistant AI about the current page.

## Platforms

| Platform | Deliverable |
|----------|-------------|
| Phone | Capacitor Android APK (+ iOS scaffold) |
| Tablet | Responsive side-by-side page + AI (≥768px) |
| Laptop | `npm start` desktop browser; dockable AI + shortcuts |
| Watch | Narrow CSS (`max-width: 280px` / `max-height: 300px`) |
| Ring / cane | DeviceOrientation / DeviceMotion gestures |

## Stack

- Vanilla HTML/CSS/JS (`index.html` → `www/`)
- Capacitor 6+ for Android/iOS
- OpenAI-compatible AI endpoint + local mock fallback

## Commands

```bash
npm install
npm start          # laptop/desktop preview (www on :4173)
npm run build      # sync index.html → www (+ android assets)
npm run sync       # build + cap sync
npm run android    # sync + ./gradlew assembleDebug
```

After HTML edits, always `npm run build` (or `npm run sync`) before packaging the APK.

## AI config

Stored in localStorage (Settings): base URL, API key, model. Without a key, Ava uses the offline mock assistant.

## Harness / Loop（助手）

- 遵循根 `/Users/skat/AGENTS.md`：**Harness Engineering** + **Loop Engineering**
- Guide = 本文件；Sensor = 下方验证命令；同类失误第二次须沉淀规则或测试（棘轮）
- 开干前写清 **Done**；每切片过验证环；显式停止（成功 / 上限 / 无进展 / 人审）
- 详解：`docs/HARNESS_ENGINEERING.md`、`docs/LOOP_ENGINEERING.md`

## 验证环 / Done

```bash
npm install
npm test          # 若有
npm run build     # 或 build:web
npx cap sync android   # 若有 android/
# 可选：JAVA_HOME=…/openjdk@17 npm run apk:debug
```

**Done 示例**：测试通过（若有）+ web 产物进 `www/`/`dist/` + `cap sync` 无报错。可选穿戴未做可搁置，不纳入强制 Done。
