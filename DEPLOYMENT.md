# Moving wblacklock.com from Elementor to Vercel

A one-time cutover runbook. The order matters: the live site keeps serving from
Elementor until the very last step, so there is no window where the domain is
dark.

## Before you start

This is what the domain looked like before the migration, captured
2026-08-20. Keep it — it's your rollback reference.

| Record | Value |
| --- | --- |
| Nameservers | `ns71.domaincontrol.com`, `ns72.domaincontrol.com` (GoDaddy) |
| `A` @ | `162.159.137.9` (Cloudflare, in front of Elementor) |
| `CNAME` www | `snqggejn.elementor.cloud` |
| `MX` | Zoho (`mx.zoho.com`, `mx2.zoho.com`, `mx3.zoho.com`) **and** Google (`aspmx.l.google.com`, `alt1`–`alt4`) |
| `TXT` (SPF) | `v=spf1 include:dc-8e814c8572._spfm.wblacklock.com ~all` |

> ### Do not touch the MX or TXT records
>
> Email for this domain runs through **both Zoho and Google Workspace**. Those
> MX records, the SPF `TXT` record, and any DKIM `CNAME`s are completely
> independent of where the website is hosted. Changing only the `A` and `CNAME`
> records leaves mail untouched. Deleting or replacing the record set breaks
> mail delivery, and the split Zoho/Google setup would be tedious to rebuild.
>
> **Before editing anything, screenshot the full DNS table in GoDaddy.**

Also note: keep DNS **at GoDaddy**. Vercel offers a nameserver method that is
simpler for a bare domain, but switching nameservers means every existing
record — all the mail records above — has to be recreated inside Vercel. Not
worth the risk here. Use the A/CNAME method below.

## 1. Push the code

```bash
git push -u origin main
```

## 2. Create the Vercel project

1. Sign in at [vercel.com](https://vercel.com) with the GitHub account that owns
   `wtblacklock/wblacklock`.
2. **Add New → Project**, then import that repository.
3. Framework preset should auto-detect as **Next.js**. Leave build command,
   output directory, and install command at their defaults.
4. There are no environment variables to set — the site reads no secrets at
   build or runtime.
5. **Deploy.**

## 3. Verify on the Vercel URL first

You'll get a URL like `wblacklock.vercel.app`. Check it properly before any DNS
changes, because this is the last easy moment to catch a problem:

- [ ] Home page loads; the six featured projects are listed
- [ ] **View all projects** reaches `/projects` with all 13
- [ ] Open several project pages — images are not cropped, videos play
- [ ] A journal article renders with headings and bullets
- [ ] The favicon shows in the browser tab

## 4. Add the domain in Vercel

1. Project → **Settings** → **Domains** → **Add Domain**.
2. Enter `wblacklock.com`. Accept the prompt to also add `www.wblacklock.com`.
3. Vercel then shows the exact DNS records to create.

   **Copy the values from that screen rather than from any guide, including
   this one.** The apex `A` record is typically `76.76.21.21`, but the `www`
   target is now *project-specific* — something like
   `d1d4fc829fe7bc7c.vercel-dns-017.com`, not the old shared
   `cname.vercel-dns.com`. Using a stale value silently fails to verify.

## 5. Change the two records at GoDaddy

In GoDaddy → **My Products** → domain → **DNS** → **Manage Zones**:

1. **Edit** the existing `A` record on `@` → replace the value with the IP
   Vercel showed. Leave type and name alone.
2. **Edit** the existing `CNAME` on `www` → replace `snqggejn.elementor.cloud`
   with the Vercel target.
3. Set TTL to the shortest option (600 seconds) so a mistake is quick to undo.
4. Save. **Change nothing else.**

Then watch the Domains page in Vercel — both entries flip to *Valid
Configuration*, usually within minutes, and Vercel issues the TLS certificate
automatically.

## 6. Confirm the cutover

```bash
dig +short wblacklock.com A
dig +short www.wblacklock.com
dig +short wblacklock.com MX     # must be unchanged — Zoho + Google
```

Then in a browser:

- [ ] `https://wblacklock.com` serves the new site, with a valid certificate
- [ ] `https://www.wblacklock.com` resolves too
- [ ] **Send yourself a test email and reply to it.** Do not skip this.

## 7. Only now, cancel Elementor

Once the domain has served the new site correctly for a day or so:

1. Export or download anything you still want from the WordPress install.
   The content in this repo came from its REST API, but the original media
   library holds more than what was ported.
2. Cancel the Elementor Cloud subscription.

## Rollback

If something is wrong, revert the two records at GoDaddy to the values in the
table at the top. Because Elementor stays running until step 7, the old site
comes straight back — subject to DNS TTL, which is why step 5 sets it low.

## After the move

Pushing to `main` deploys to production automatically. Pull requests get their
own preview URL.

Two loose ends worth closing at some point:

- `public/images/case-study/beast-putty/Kill-It.mov` is deleted in the working
  tree but still referenced from `src/data/caseStudies.ts`, so it 404s. Either
  restore the file (`git checkout -- <path>`) or drop the reference.
- The old WordPress site's IBM Garage post had 27 images that were not ported,
  since that project already has its own case study here.
