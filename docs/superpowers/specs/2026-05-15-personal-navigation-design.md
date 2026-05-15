# Personal Navigation Page Design

## Goal

Build a GitHub Pages ready personal navigation webpage for `D:\personal_web`. The site should feel like a warm personal hub: useful enough to open every day, but still personal through a modest profile area, curated categories, and gentle visual details.

## Chosen Direction

- Type: mixed personal hub.
- Style: warm personal, with enough visual richness to avoid feeling like a plain bookmark grid.
- Implementation: pure static single page.
- Content level: medium profile section.
- Navigation categories: AI, Development, Reading, Tools, Media, Life.

## Architecture

The site will use three root-level files:

- `index.html`: page structure and accessible markup.
- `styles.css`: responsive layout, warm visual system, hover states, and lightweight motion.
- `script.js`: link data, category rendering, featured links, search filtering, and small UI state updates.

No build system is required. GitHub Pages can publish the repository root directly.

## Page Structure

The first viewport contains a profile and utility area:

- Avatar placeholder.
- Name.
- Short personal tagline.
- Social links.
- Location/status/interest tags.
- Featured links such as blog, GitHub, and portfolio.
- Optional inspiration/note panel.

Below the profile area:

- Search input for filtering by link name, description, and category.
- Category sections for AI, Development, Reading, Tools, Media, and Life.
- Link cards with name, short description, category relationship, and external link behavior.

The page should remain useful even before the user replaces placeholder content. Example links and labels should be easy to edit in `script.js`.

## Visual Design

The site should use a warm base without becoming a single beige palette. Use a restrained mix of:

- Warm paper background.
- Ink and muted brown text.
- Terracotta accent.
- Sage or soft green secondary accent.
- Clean white card surfaces.

The design should include richer interface elements:

- Profile panel with avatar and compact metadata.
- Featured-link row.
- Category headers with link counts.
- Search area with focused state.
- Subtle separators and soft shadows.
- Small icon-like initials or symbols for link cards where useful.

Avoid decorative blobs, heavy gradients, and marketing-style hero composition. The first screen should be the actual usable navigation experience.

## Motion And Effects

Initial implementation should include lightweight, non-essential motion:

- Gentle page entrance for the main sections.
- Card hover lift and border/accent transition.
- Search filtering transition for visible results.
- Focus states for keyboard navigation.

Motion must respect `prefers-reduced-motion`.

More advanced visual effects can be added later, such as a subtle background texture, active category highlighting, or small ambient interactions. These should not block the first version.

## Responsiveness

Desktop:

- Constrained content width.
- Profile and featured content can sit in a two-column arrangement.
- Category cards use a multi-column grid.

Mobile:

- Profile content stacks vertically.
- Search remains prominent.
- Category grid collapses to one column.
- Text and buttons must not overflow their containers.

## Data Model

`script.js` will expose editable arrays or objects for:

- Profile metadata.
- Social links.
- Featured links.
- Navigation categories and links.

Each navigation link should include:

- `title`
- `description`
- `url`
- `category`
- optional `accent` or `icon` field if useful

## Interactions

- Typing in search filters links immediately.
- Matching should check title, description, and category.
- Empty search shows all categories.
- No-match state gives a concise message.
- External links open in a new tab with safe `rel` attributes.

## Testing And Verification

Before considering the site complete:

- Open locally in a browser.
- Verify layout at desktop and mobile widths.
- Verify search filtering and no-match state.
- Verify links open correctly.
- Verify GitHub Pages compatible static files are present at the repository root.

## Out Of Scope For First Version

- Build tooling or frontend framework.
- Backend, database, login, analytics, or CMS.
- Complex animated backgrounds.
- Full custom content collection from the user before the first working version.
