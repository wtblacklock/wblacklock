# wblacklock.com — hosting

The site is on **Vercel**, project `wblacklock` in the **TwinB** team, deployed
from `wtblacklock/wblacklock`. Pushing to `main` deploys to production; pull
requests get their own preview URL.

The move off Elementor Cloud was completed 2026-09-04. What follows is the
record of that cutover and the one step still outstanding.

## Live configuration

| | |
| --- | --- |
| Canonical URL | `https://wblacklock.com` (apex) |
| `www` | 307 redirect → apex |
| DNS | GoDaddy (`ns71`/`ns72.domaincontrol.com`) |
| TLS | Let's Encrypt, auto-renewed by Vercel |

DNS records changed at GoDaddy — **these two, and nothing else**:

| Type | Name | Was | Now | TTL |
| --- | --- | --- | --- | --- |
| A | `@` | `162.159.137.9` (Cloudflare → Elementor) | `216.198.79.1` | 1/2 hour |
| CNAME | `www` | `snqggejn.elementor.cloud.` | `6eb6fc94b3cceddb.vercel-dns-017.com.` | 1/2 hour |

> The `www` CNAME target is **specific to this Vercel project**. The older
> shared `cname.vercel-dns.com` and the apex IP `76.76.21.21` still work but are
> legacy. If you ever recreate the domain in Vercel, read the values off the
> dashboard again rather than copying them from here.

The full pre-cutover DNS table is preserved in
[`docs/dns-snapshot-pre-vercel.md`](docs/dns-snapshot-pre-vercel.md). That is the
rollback reference: restoring those two values returns the domain to Elementor.

## Still outstanding: cancel Elementor Cloud

**The Elementor Cloud subscription is still active and still being billed.** It
was deliberately left running so the rollback above stays available. Before
cancelling:

1. Give the new site a few days at the domain.
2. Download anything you still want from the WordPress media library. The
   content in this repo came from its REST API, but the media library holds
   more than what was ported — including the IBM Garage post's 27 images.
3. Then cancel the subscription.

Once Elementor is cancelled, rollback is no longer possible.

## Mail — do not touch these

Four services send or receive mail on this domain, across 15 DNS records
(MX, SPF, DKIM, DMARC):

- **Google Workspace** — receiving
- **Zoho Mail** — receiving, DKIM, SPF
- **Amazon SES** — sending, on the `send` subdomain
- **Resend** — sending, DKIM

None of them have anything to do with where the website is hosted. All 15 were
verified unchanged after the cutover. If you ever change hosting again, edit
only the `A` and `CNAME` records, and never switch to a host's own nameservers
without recreating every mail record first.

## Verifying

```bash
dig +short wblacklock.com A          # 216.198.79.1
dig +short www.wblacklock.com CNAME  # 6eb6fc94b3cceddb.vercel-dns-017.com.
dig +short wblacklock.com MX         # 8 records: Google + Zoho
curl -sI https://wblacklock.com | head -1
```

## Loose ends

- `public/images/case-study/beast-putty/Kill-It.mov` is deleted in the working
  tree but still referenced from `src/data/caseStudies.ts`, so it 404s. Either
  restore the file (`git checkout -- <path>`) or drop the reference.
- The `www` redirect is a 307 (temporary). Once you're confident the setup is
  permanent, switching it to 308 in Vercel → Settings → Domains is better for
  SEO. It was left temporary so it wouldn't get cached hard during the cutover.
