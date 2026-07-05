# Fake-X (FakeTwitter) ✕ 

A Twitter/X homepage clone built as a solo project for my Zaio course assignment.

Live demo: https://fake-xwitter.netlify.app/login.html

## Built With

- HTML5
- CSS3 (plain CSS, no frameworks or preprocessors)
- Vanilla JavaScript (no libraries, no build tools)
- Material Symbols Rounded (Google's icon font)
- Geist font (Google Fonts)
- Cursor

## What's Included

- **Home page** (`index.html`) — a three-column layout with a left navigation sidebar, a center timeline (tab bar, post-composer, and a feed of tweet cards), and a right sidebar (search, trends, and who-to-follow suggestions)
- **Login page** (`login.html`)
- **Notifications page** (`notifications.html`)

## Features

### Manual Feature (No AI Assistance)
- **Dark mode toggle** — a real toggle-switch control (not a plain button) in the left sidebar. It flips a class on `<body>`, which swaps a set of CSS custom properties (variables) controlling every color across the whole site. The choice is remembered between visits using `localStorage`, so refreshing the page keeps whichever mode you last picked.

### Cursor AI-Assisted Features
- **Login page** — a full-screen cinematic hero (looping background video, staggered-text "See what's happening now" headline) with a glass sign-in card on top. It's a fake auth gate: submitting the form with anything (or nothing) in the fields sets a `localStorage` flag and drops you into the app — no real validation or authentication. Built with Cursor, then reviewed and understood line by line.
- **Notifications page** — a feed of notification items (likes, reposts, replies, new followers) reusing the same sidebar and design system as the home page, so it feels like part of the same site rather than a bolted-on extra.
- **Responsive layout** — the three-column app shell adapts down to tablet and phone widths: the right sidebar drops first, then the left sidebar collapses to an icon-only rail, then finally becomes a fixed bottom nav bar on phones, similar to X's own mobile behavior.

### Other small additions
- **Login gate** — visiting `index.html` or `notifications.html` without having "logged in" first automatically redirects to `login.html`. A working **log out** button clears the saved login state and sends you back there. This is why the demo link above points straight at `login.html` rather than the root URL.

## Design System

Rather than hardcoding colors everywhere, the whole site is built on a small set of CSS variables defined once in `:root`:

```css
--primary-bg-color
--primary-bg-color-alt
--primary-text-color
--primary-text-color-alt
--color-border
--secondary-text-color
--color-accent-primary
--color-accent-hover
--color-error
```

Every component (sidebar, tab bar, compose box, tweet cards, right sidebar, login page) reads its colors from these variables instead of writing colors directly. That's what makes dark mode work everywhere with just one extra rule block, instead of needing separate dark-mode overrides scattered across every single component.

## What I Learned/Re-learnt

- Debugging with browser DevTools — reading the *Computed* panel to catch a CSS declaration that had silently failed (a `minmax`/`minimax` typo that collapsed my whole grid layout into one column)
- The difference between inspecting a parent element versus a child element inside it (learned this the hard way comparing a `<span>`'s width to its parent `<a>`'s width)
- CSS Grid for the overall page layout (`grid-template-columns`, `minmax()`)
- Flexbox for component-level layout (`flex`, `flex-direction`, `gap`, `justify-content`, `align-items`, `margin-left: auto` as a lightweight alternative to `justify-content: space-between` when only one item needs pushing)
- CSS custom properties (variables) and how swapping them at the `:root`/`body` level can re-theme an entire site
- The checkbox-based toggle switch pattern — a real `<input type="checkbox">` hidden visually, paired with a `<span>` styled to look like a track and knob, driven entirely by the `input:checked + .slider` sibling selector
- `position: relative` on a parent plus `position: absolute` on a `::after` pseudo-element, to build the active-tab underline indicator
- `localStorage` for remembering user preferences (dark mode) and simple login state across page reloads
- Git commit discipline — staging specific files with `git add <file>` instead of `git add .`, and writing conventional commit messages (`feat:`, `fix:`, `style:`) that describe one logical change at a time

## Known Limitations / Next Steps

Being upfront about what's incomplete, rather than pretending it's finished:

- The "Verified" and "Mentions" tabs on the Notifications page are visual only — no real filtering logic yet
- Dark mode is only wired up on the home and notifications pages, not the login page (it's intentionally always-dark to match its cinematic video background)
- The feed is static/hardcoded — no real posting, liking, or following functionality
- No real authentication — the login page is a front-end-only demo with no field validation; any submission logs you in
- Most sidebar nav links (Explore, Chat, Grok, Premium, Profile, More) are placeholders (`href="#"`) — only Home and Notifications are wired up to real pages

## Deployment

Deployed on Netlify. Since this is a plain HTML/CSS/JS project with no build step, deployment just points Netlify at the project's root folder.

**Link:**
- https://fake-xwitter.netlify.app/login.html 

## Author

Nezokuhle Tshukulwana (Github: nezokuhle1-arch || LinkedIn: Nezokuhle Tshukulwana || Instagram: @nezo.ai)
