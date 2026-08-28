# CP Ice Marine Limited

Production corporate website for CP Ice Marine Limited, an integrated offshore logistics, marine infrastructure, and industrial contracting company based in Port Harcourt, Nigeria.

## Technology

- Vite with semantic HTML, modular CSS, and vanilla JavaScript
- GSAP and ScrollTrigger for deliberate industrial motion
- Lenis for smooth scrolling
- Lucide icons
- Netlify Forms for project enquiries
- Vitest and Oxlint for automated checks

## Local Development

```bash
npm install
npm run dev
```

Before publishing changes, run:

```bash
npm run lint
npm test
npm run build
```

## Content Maintenance

Company copy and page markup are in `index.html`. Presentation is in `src/styles.css`; navigation, animation, and form behavior are in `src/main.js`.

Contact details appear in the contact section and footer. Search for the existing phone number, email address, or street address before replacing them so every occurrence remains consistent.

## Brand Assets

- Production transparent logo: `public/assets/logo/cp-ice-logo.png`
- Authoritative supplied source: `public/assets/source/cp-ice-logo-original.jpg`
- Alternate reference board: `public/assets/source/cp-ice-brand-board.png`

The first crimson logo is authoritative. The alternate navy reference board is retained for traceability but is not displayed because its palette and tagline conflict with the approved brief.

## Adding Authentic Photography

The current site intentionally uses branded technical compositions instead of stock images or placeholders. When approved operational photography becomes available:

1. Optimize images to WebP or AVIF at the required display dimensions.
2. Place them under `public/assets/images/` with descriptive lowercase filenames.
3. Add them only where they support the relevant operational capability.
4. Include meaningful alternative text and `loading="lazy"` below the fold.
5. Retain the dark crimson overlay treatment to preserve text contrast and brand consistency.

## Netlify Deployment

The repository includes `netlify.toml` and requires no environment variables.

1. Import the GitHub repository into Netlify.
2. Deploy the `main` branch using `npm run build` and the `dist` publish directory.
3. Enable automatic form detection before the first form-enabled deployment.
4. Confirm that Netlify registers `cp-ice-project-enquiry` after deployment.
5. Configure verified form-notification recipients in the Netlify dashboard.

The form includes browser validation, a honeypot field, success messaging, and an email fallback.

## Custom Domain

Add the domain under Netlify Domain management, configure the DNS records Netlify provides, and wait for TLS provisioning. Update the canonical URL, Open Graph URL, `public/robots.txt`, and `public/sitemap.xml` to the custom HTTPS domain before publishing.

## cPanel Deployment

Run `npm run build` and upload the contents of `dist/` to `public_html`. Static content will work normally. Netlify Forms will not process enquiries on cPanel; connect the form to an approved server-side handler before using that hosting path.

## Accessibility And Performance

- All animations honor `prefers-reduced-motion`.
- Navigation, controls, and forms are keyboard accessible with visible focus treatment.
- The design supports 375px, 768px, and 1440px viewports.
- Generated output, dependencies, local settings, and test reports are excluded from Git.

