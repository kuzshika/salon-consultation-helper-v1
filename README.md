# Salon Consultation Helper

A Vite React prototype for a premium hair salon website. The flow helps visitors answer "Not sure what to book?" before they move into a booking or enquiry process.

## What It Includes

- Premium landing section
- Multi-step consultation quiz with progress indicator
- Inspiration photo upload placeholder
- Rule-based service recommendation logic
- Results screen with recommended service, fit explanation, estimated time, price range, and booking CTAs
- Editable placeholder salon pricing data in `src/App.jsx`
- Vercel-ready static build

## Local Setup

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Editing Salon Pricing

Placeholder pricing and appointment times live in `src/App.jsx` inside the `salonPricing` object. Replace those values with the salon's real service names, time estimates, and price ranges when ready.

## Deploying To Vercel

Vercel should auto-detect this as a Vite app.

- Framework preset: `Vite`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

After connecting the GitHub repository in Vercel, every push to the main branch will create a production deployment. Pull requests and non-main branches create preview links.
