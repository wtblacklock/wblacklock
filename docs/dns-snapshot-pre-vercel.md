# wblacklock.com DNS — snapshot before the Vercel cutover

Captured from GoDaddy immediately before repointing the site. All 24 records.
Only the two marked **CHANGED** were touched; the other 22 were left exactly as
they are here. If anything goes wrong, restore those two values to roll back.

Nameservers: `ns71.domaincontrol.com`, `ns72.domaincontrol.com` (GoDaddy)

| # | Type | Name | Data | TTL |
|---|---|---|---|---|
| 1 | A | @ | `162.159.137.9` → **CHANGED to `216.198.79.1`** | 1 Hour |
| 2 | NS | @ | ns71.domaincontrol.com. | 1 Hour |
| 3 | NS | @ | ns72.domaincontrol.com. | 1 Hour |
| 4 | CNAME | email | email.secureserver.net. | 1 Hour |
| 5 | CNAME | ftp | wblacklock.com. | 1 Hour |
| 6 | CNAME | www | `snqggejn.elementor.cloud.` → **CHANGED to `6eb6fc94b3cceddb.vercel-dns-017.com.`** | 1 Hour |
| 7 | CNAME | zb57122273 | zmverify.zoho.com. | 600s |
| 8 | CNAME | _domainconnect | _domainconnect.gd.domaincontrol.com. | 1 Hour |
| 9 | SOA | @ | Primary nameserver: ns71.domaincontrol.com. | 600s |
| 10 | MX | @ | aspmx.l.google.com. (Priority 1) | 1/2 Hour |
| 11 | MX | @ | alt1.aspmx.l.google.com. (Priority 5) | 1/2 Hour |
| 12 | MX | @ | alt2.aspmx.l.google.com. (Priority 5) | 1/2 Hour |
| 13 | MX | @ | alt3.aspmx.l.google.com. (Priority 10) | 1/2 Hour |
| 14 | MX | @ | alt4.aspmx.l.google.com. (Priority 10) | 1/2 Hour |
| 15 | MX | @ | mx.zoho.com. (Priority 10) | 600s |
| 16 | MX | @ | mx2.zoho.com. (Priority 20) | 600s |
| 17 | MX | @ | mx3.zoho.com. (Priority 50) | 600s |
| 18 | MX | send | feedback-smtp.us-east-1.amazonses.com. (Priority 10) | 1 Hour |
| 19 | TXT | @ | v=spf1 include:dc-8e814c8572._spfm.wblacklock.com ~all | 1 Hour |
| 20 | TXT | dc-8e814c8572._spfm | v=spf1 include:zohomail.com ~all | 1 Hour |
| 21 | TXT | resend._domainkey | DKIM public key (Resend) | 1 Hour |
| 22 | TXT | send | v=spf1 include:amazonses.com ~all | 1 Hour |
| 23 | TXT | zmail._domainkey | DKIM public key (Zoho) | 600s |
| 24 | TXT | _dmarc | v=DMARC1; p=none; | 1 Hour |

## Mail services on this domain

Four separate services depend on records 10–24. None of them are affected by
where the website is hosted, and none were modified:

- **Google Workspace** — receiving (records 10–14)
- **Zoho Mail** — receiving, plus DKIM and SPF (15–17, 20, 23)
- **Amazon SES** — sending, on the `send` subdomain (18, 22)
- **Resend** — sending, DKIM (21)
