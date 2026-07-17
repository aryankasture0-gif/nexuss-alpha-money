# Security Report

Audit date: June 24, 2026

## Scope

Reviewed the Vite/React frontend, Netlify configuration, public assets, form handling, Supabase usage, redirects, legal/privacy pages, and dependency posture for the current Netlify replacement project.

## Issues Found And Fixes Applied

| Issue | Risk | Fix Applied |
| --- | --- | --- |
| Missing explicit Netlify security headers | High | Added CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and HSTS in `netlify.toml` and `public/_headers`. |
| HTTPS enforcement needed verification | Medium | Netlify-managed HTTPS is retained for the same existing host, and HSTS is added so browsers continue using HTTPS after first secure visit. |
| Public form submitted directly from browser to Supabase | High | Added a Netlify Function endpoint that performs Turnstile verification, server-side validation, sanitization, and database insert with server-only credentials. |
| No CAPTCHA/spam protection on application form | High | Added Cloudflare Turnstile support, honeypot field, and minimum submission timing check. |
| Form inputs were only lightly validated client-side | Medium | Added stricter client validation and server-side sanitization, length limits, allowed-value checks, phone/email validation, and amount bounds. |
| Privacy Policy and Terms links were placeholders | Medium | Added `/privacy` and `/terms` in-app pages and connected footer links. |
| Hardcoded Netlify URL in metadata could conflict with the existing site URL | Low | Removed the hardcoded `og:url` and JSON-LD `url` so the existing Netlify domain remains authoritative. |
| Exposed admin/auth routes | Low | No admin or login routes were found in the frontend. Future admin functionality should live outside the public frontend or be protected with real authentication. |
| Third-party trackers | Low | No analytics, ad pixels, or tracking scripts were found. Cloudflare Turnstile is the only newly added third-party script and is used only for form abuse protection. |

## Environment Variables

Client-safe variables:

```env
VITE_TURNSTILE_SITE_KEY=your_cloudflare_turnstile_site_key
```

Server-only variables:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_server_only_supabase_service_role_key
TURNSTILE_SECRET_KEY=your_server_only_cloudflare_turnstile_secret_key
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` or `TURNSTILE_SECRET_KEY` in frontend code, public files, screenshots, or Git history.

## Netlify Security Configuration

- `Strict-Transport-Security`: enabled with `max-age=31536000; includeSubDomains; preload`.
- `X-Frame-Options`: `DENY`.
- `X-Content-Type-Options`: `nosniff`.
- `Referrer-Policy`: `strict-origin-when-cross-origin`.
- `Permissions-Policy`: disables camera, microphone, geolocation, payment, USB, and other unused browser capabilities.
- `Content-Security-Policy`: restricts sources to the site itself, Cloudflare Turnstile, Supabase API/WebSocket endpoints, HTTPS images, and required inline styles/scripts for the current Vite app and JSON-LD.

## Form Handling Review

The application form now:

- Uses a hidden honeypot field.
- Requires a minimum time before submit.
- Supports Cloudflare Turnstile.
- Sends submissions to `/.netlify/functions/submit-application`.
- Sanitizes all user input on the server.
- Validates allowed loan type and applicant profile values.
- Uses server-only Supabase service role credentials for storage.
- Falls back to WhatsApp when online storage is not configured or fails.

## Dependency Review

The project uses React, Vite, Three.js, Framer Motion, Lucide, and Tailwind packages. Supabase is now accessed only from a Netlify Function with server-only credentials. Run these before final deployment:

```bash
pnpm install
pnpm audit
pnpm run lint
pnpm run typecheck
pnpm run build
```

Compatible package upgrades should be applied after reviewing visual output because Three.js and React major upgrades may affect the 3D scene and rendering behavior.

## Additional Recommendations

1. Enable Netlify deploy notifications and protect the Netlify account with MFA.
2. Rotate any Supabase keys that were previously committed or shared.
3. Apply the Supabase RLS migration in `supabase/migrations/20260621165213_fix_contact_submissions_rls_security.sql`.
4. Restrict Supabase dashboard access to trusted staff only.
5. Keep Turnstile allowed hostnames limited to the existing Netlify domain and any verified custom domain.
6. Review submitted lead retention regularly and delete data no longer required.
