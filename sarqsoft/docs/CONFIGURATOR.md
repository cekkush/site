# Configurator — setup & how it works

The **/configurator** wizard lets a client assemble a Jey ERP solution and get a
personalized commercial proposal (КП). It is 100% client-side (the site is a
static export), so each proposal lives in its own URL and there is no backend.

## Files

- `src/lib/configurator/catalog.ts` — the taxonomy (spheres, modules,
  integrations, services, industries, options). **Edit prices/weights/labels here.**
- `src/lib/configurator/estimate.ts` — price band, monthly band, weeks, phases, ROI.
- `src/lib/configurator/encode.ts` — packs all selections into the `?c=` link.
- `src/lib/configurator/submit.ts` — builds the lead text and sends it.
- `src/lib/configurator/config.ts` — **keys & pricing knobs (see below).**
- `src/components/configurator/*` — wizard UI, live preview, proposal render.
- Routes: `app/[locale]/configurator` (wizard) · `app/[locale]/proposal` (КП link).

## Activating lead delivery

Open `src/lib/configurator/config.ts`.

### 1. Email (Web3Forms — free, no backend)
1. Go to https://web3forms.com, create an **Access Key** bound to `info@sarqsoft.az`.
2. Paste it:
   ```ts
   export const WEB3FORMS_KEY = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
   ```
That's it — submissions now arrive as email with the full spec + proposal link.

### 2. Telegram (via a free relay — never put the bot token in the client)
The bot token must stay server-side. Deploy a tiny **Cloudflare Worker** and put
its URL in `TELEGRAM_RELAY_URL`. Minimal worker:

```js
export default {
  async fetch(req, env) {
    if (req.method !== 'POST') return new Response('ok');
    const { text } = await req.json();
    await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: env.CHAT_ID, text }),
    });
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } });
  },
};
```
Set `BOT_TOKEN` and `CHAT_ID` as Worker secrets, then:
```ts
export const TELEGRAM_RELAY_URL = 'https://<your-worker>.workers.dev';
```

### Fallback (works with nothing configured)
If neither key is set, the final screen still shows **Download PDF**,
**Copy link**, and **Send via WhatsApp** (pre-filled with the proposal link), so
no lead is ever lost.

## Pricing
All numbers are **bands** and fully editable in `catalog.ts` (per module/service)
and `config.ts` (base, size/deployment/urgency multipliers, monthly per-user).
The proposal always shows a range + the disclaimer "final price after consultation".
