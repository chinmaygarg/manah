# Navigation Redesign — Premium Mega-Menu System

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the plain text dropdown navigation with a Bechtel-level premium mega-menu system featuring image cards, descriptions, and CTAs, while keeping the top utility bar with page links and social icons.

**Architecture:** The Header component will be split into 3 files: TopBar, MegaMenu (reusable panel), and the main Header orchestrator. Navigation data in constants.ts will be extended with `image`, `heading`, `description`, and `ctaHref` fields per top-level item. Each mega-menu is a full-width panel with a left description column and right image-card grid.

**Tech Stack:** Next.js 15, Tailwind CSS v4 (@theme), Framer Motion, lucide-react, TypeScript

---

### Task 1: Update Navigation Data in constants.ts

**Files:**
- Modify: `website/src/lib/constants.ts`

**Step 1: Update NavItem/NavChild interfaces**

Add `image` to NavChild, add mega-menu metadata to NavItem:

```typescript
export interface NavChild {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  image?: string;       // NEW: path to card image
  featured?: boolean;   // NEW: render as image card vs text link
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavChild[];
  megaMenu?: {          // NEW: mega-menu panel metadata
    heading: string;
    description: string;
    ctaText: string;
    ctaHref: string;
  };
}
```

**Step 2: Replace NAVIGATION array with new structure**

7 top-level items: About Us, Divisions, Sectors, Projects, Sustainability, Media, Careers.

- About Us children: Who We Are (featured), Board of Directors (featured), Mission Vision & Values (featured), Investor Relations, Policies & Charters, History & Awards
- Divisions children: Manah Dynamics (featured), Manah Aerospace (featured), Green Energy (featured), Tech & Manufacturing (featured), Manah Investments (featured)
- Sectors children: Urban Infrastructure (featured), Advanced Technology (featured), Transportation (featured), Oil Gas & Energy (featured), Power & Renewables (featured), Water & Environment (featured)
- Projects: no children (direct link)
- Sustainability children: Environment (featured), Social Responsibility (featured), Governance (featured), ESG Reports
- Media children: Press Releases (featured), In The News (featured), Awards & Recognition (featured), Videos
- Careers children: Life at Manah Group (featured), Job Search (featured)

**Step 3: Add TOP_BAR_LINKS constant**

```typescript
export const TOP_BAR_LINKS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Landmark Projects", href: "/projects#landmark" },
  { label: "Partner With Us", href: "/partner" },
] as const;
```

**Step 4: Commit**

```bash
git add website/src/lib/constants.ts
git commit -m "feat: restructure navigation data for mega-menu system"
```

---

### Task 2: Create MegaMenuPanel Component

**Files:**
- Create: `website/src/components/layout/MegaMenuPanel.tsx`

This is the reusable mega-menu dropdown panel. It receives a NavItem and renders:
- Full-width panel below header with white bg, shadow, gold accent bar
- Left column (1/3): heading, description, CTA link
- Right column (2/3): grid of image cards for `featured` children + text links for non-featured
- Framer Motion enter/exit animations

Layout per panel:
```
┌──────────────────────────────────────────────────────┐
│ [gold accent bar]                                     │
│ ┌─────────────┐  ┌────────┐ ┌────────┐ ┌────────┐  │
│ │ Heading      │  │[image] │ │[image] │ │[image] │  │
│ │ Description  │  │ Label  │ │ Label  │ │ Label  │  │
│ │              │  │ Desc   │ │ Desc   │ │ Desc   │  │
│ │ CTA →        │  └────────┘ └────────┘ └────────┘  │
│ └─────────────┘                                      │
│                   Text Link · Text Link · Text Link  │
└──────────────────────────────────────────────────────┘
```

Image cards: rounded-xl, overflow-hidden, 16:10 aspect ratio image, label + description below.
Hover: scale(1.02) + shadow elevation.

**Step 1: Create the component**

Props: `{ item: NavItem; onClose: () => void }`
- Filter children into `featuredItems` (child.featured === true) and `textLinks` (rest)
- Determine grid columns: 3 for 3+ items, 2 for 2 items
- Render left panel only if `item.megaMenu` exists
- Each image card links to child.href

**Step 2: Commit**

```bash
git add website/src/components/layout/MegaMenuPanel.tsx
git commit -m "feat: create MegaMenuPanel component for rich dropdowns"
```

---

### Task 3: Create TopBar Component

**Files:**
- Create: `website/src/components/layout/TopBar.tsx`

Extract the top utility bar into its own component:
- Left: TOP_BAR_LINKS rendered as text links separated by `|` dividers
- Right: 4 social icons (LinkedIn, Twitter, YouTube, Instagram) from SITE_CONFIG.socials
- Style: bg-manah-navy-dark, text-white/70, h-9, hidden below lg
- Hover: gold underline animation using existing .link-underline class
- Social icons: hover scale(1.1) + gold color

**Step 1: Create the component**

Import TOP_BAR_LINKS and SITE_CONFIG from constants.
Use lucide-react icons: Linkedin, Twitter, Youtube, Instagram.

**Step 2: Commit**

```bash
git add website/src/components/layout/TopBar.tsx
git commit -m "feat: create TopBar component with page links and social icons"
```

---

### Task 4: Rewrite Header.tsx

**Files:**
- Modify: `website/src/components/layout/Header.tsx`

Rewrite the main header to:
1. Import and render `<TopBar />` above the sticky header
2. Replace inline dropdown logic with `<MegaMenuPanel />` for each nav item
3. Keep: scroll detection, mobile menu, logo dual-image, sticky behavior
4. Remove: inline utility bar code, Search button, Globe/language selector
5. Update nav items to use new NAVIGATION from constants
6. Active menu now opens full-width MegaMenuPanel instead of small dropdown

Desktop nav flow:
- `onMouseEnter` on nav item → set activeMenu
- MegaMenuPanel rendered below header in a portal/absolute container
- `onMouseLeave` from the panel area → close
- Overlay behind panel (subtle bg-black/10) to dim page content

Active nav item visual:
- Gold text color
- 2px gold underline bar below the text (animated width from 0 to 100%)

CTA button: "CONTACT US" in btn-primary style, uppercase tracking-wider

**Step 1: Rewrite the component**

Keep the existing mobile menu (MobileNavItem) mostly unchanged but update it to handle the new NAVIGATION structure (7 items instead of 5, updated children).

**Step 2: Commit**

```bash
git add website/src/components/layout/Header.tsx
git commit -m "feat: rewrite Header with mega-menu panels and TopBar"
```

---

### Task 5: Generate Placeholder Nav Images

**Files:**
- Create: `website/public/images/nav/` directory with placeholder images

For MVP, use existing project images as card thumbnails:
- about-who-we-are.png → reuse `/images/about/team_collaboration.png`
- about-board.png → reuse `/images/leaders/prem_kumar.jpg`
- about-mission.png → reuse `/images/about/values_mindful.png`
- divisions-dynamics.png → reuse `/images/divisions/manah_dynamics_hero.png`
- divisions-aerospace.png → reuse `/images/divisions/manah_aerospace_hero.png`
- divisions-green.png → reuse `/images/divisions/green_energy_hero.png`
- divisions-tech.png → reuse `/images/divisions/tech_manufacturing_hero.png`
- divisions-investments.png → reuse `/images/divisions/manah_dynamics_projects.png`
- sectors-*.png → reuse corresponding `/images/sectors/` images
- sustainability-*.png → reuse `/images/sustainability/` images
- careers-*.png → reuse `/images/careers/` images
- media-*.png → reuse `/images/news/` images

Create symlinks or copy to `/images/nav/` for clean organization.

**Step 1: Create nav image directory and copy/symlink images**
**Step 2: Commit**

```bash
git add website/public/images/nav/
git commit -m "feat: add navigation card images (reusing existing assets)"
```

---

### Task 6: Test and Verify

**Step 1: Run dev server and verify**

```bash
cd website && npm run dev
```

Check:
- [ ] Top bar renders with page links + 4 social icons
- [ ] Main nav has 7 items + CONTACT US CTA
- [ ] Each dropdown opens a full-width mega-menu panel
- [ ] Image cards render with correct images
- [ ] Hover effects work (card elevation, gold underline)
- [ ] Scroll behavior: transparent → white+blur
- [ ] Mobile menu works with all 7 items
- [ ] Keyboard: Escape closes mega-menu
- [ ] No layout shift when mega-menu opens
- [ ] Projects link navigates directly (no dropdown)

**Step 2: Build check**

```bash
cd website && npm run build
```

Fix any TypeScript or build errors.

**Step 3: Commit any fixes**

```bash
git commit -m "fix: resolve build issues from navigation redesign"
```
