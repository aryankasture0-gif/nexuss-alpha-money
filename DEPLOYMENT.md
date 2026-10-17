# Netlify Deployment

This project is the clean replacement build for the existing Nexuss Alpha Money Netlify site. Replace the files inside the current Netlify-linked repository or manual deploy target; do not create a new Netlify site. The existing Netlify link stays the same.

## Required Environment Variables

Vite embeds `VITE_*` variables at build time. Server-only variables must be added in Netlify and must never be placed in frontend code or public files.

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_server_only_supabase_service_role_key
TURNSTILE_SECRET_KEY=your_server_only_cloudflare_turnstile_secret_key
DASHBOARD_ACCESS_TOKEN=generate_a_long_random_dashboard_token
VITE_TURNSTILE_SITE_KEY=your_cloudflare_turnstile_site_key
TURNSTILE_SECRET_KEY=your_server_only_cloudflare_turnstile_secret_key
```

`SUPABASE_SERVICE_ROLE_KEY` and `TURNSTILE_SECRET_KEY` are secrets. Store them only in Netlify environment variables. `SUPABASE_URL` is not secret, but it is used only by the server-side function in this hardened build.

## Supabase Setup

1. Open the Supabase dashboard.
2. Select the project used by this website.
3. Go to Project Settings > API.
4. Copy Project URL into `SUPABASE_URL`.
5. Copy the `service_role` key into `SUPABASE_SERVICE_ROLE_KEY` in Netlify only.

## Cloudflare Turnstile Setup

1. Create a Turnstile widget in Cloudflare.
2. Add the existing Netlify domain and any custom domain as allowed hostnames.
3. Add the public site key as `VITE_TURNSTILE_SITE_KEY`.
4. Add the secret key as `TURNSTILE_SECRET_KEY`.
5. Rebuild and redeploy the existing Netlify site.

## Netlify Setup

1. Open Netlify dashboard.
2. Select the existing Netlify site.
3. Go to Site configuration > Environment variables.
4. Add all Supabase and Turnstile variables listed above.
5. Confirm HTTPS is enabled under Domain management > HTTPS.
6. Confirm the build command is `npx --yes pnpm@11.7.0 run build`.
7. Confirm the publish directory is `dist`.

If the variables are missing or still set to placeholders, the site will load normally and WhatsApp submission remains available, but online lead storage will not run.

## Security Notes

- Security headers are configured in `netlify.toml` and `public/_headers`.
- HTTPS is managed by Netlify for the existing site domain, and HSTS is sent by this project after deployment.
- The form submits through `/.netlify/functions/submit-application`, where Turnstile verification and server-side sanitization happen.
- The private website dashboard is available at `/admin` after deployment. It requires the server-only `DASHBOARD_ACCESS_TOKEN` through the dashboard login and never exposes the Supabase service-role key to the browser.
- Before enabling analytics, apply the migration `supabase/migrations/20261017090000_create_site_analytics.sql` to the intended Supabase project. The migration stores anonymous page/click events; names and emails remain in `contact_submissions` and are shown only for submitted enquiries.
- The dashboard requires both the existing enquiry columns and the analytics table. Do not run the migration against the ERP database or an unverified Supabase project.
- Keep Netlify deploy logs and environment variables private.

## Deploy Steps

1. Delete the old website files from the existing Netlify-linked repository.
2. Put this project in that same repository.
3. Set the required Netlify environment variables.
4. Run `pnpm install`.
5. Run `pnpm run build`, or let Netlify run `npx --yes pnpm@11.7.0 run build`.
6. Deploy from Git or upload the generated `dist` folder to the existing Netlify site.
