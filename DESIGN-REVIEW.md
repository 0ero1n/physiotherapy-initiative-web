# Tanzania Physiotherapy Initiative redesign

All six existing routes have been redesigned in the existing Next.js 16 / React 19 / Tailwind 4 stack. No runtime dependencies were added.

## Direction

**Dressed as something else — seed 681441399.** TPI’s real workshop photographs and four learning pathways become an editorial education prospectus. The identity retains the original olive color, with a deep green ink, pale green surfaces, and locally hosted Panchang / Switzer type.

The features blueprint was changed from a pinned card fan to a large program index: visitors need to compare and navigate real programs. Landscape workshop photographs replace the proposed solo portrait treatment, since group photographs are the available assets. No staged scrolling scenes were dealt.

The interactive centerpiece is the four-program explorer. The full programs page retains an angle-measurement demonstration. The workshop gallery exposes all seven original photographs through a keyboard-accessible native dialog.

## What changed

- Home: large photographic opening, mission, program explorer, photo journal, team introduction, and participation links.
- About: story, mission, vision, values, and all five leadership profiles.
- Programs: four complete program descriptions, preserved anchor links, inquiry links with prefilled subjects, movement demonstration, and gallery.
- Partners: full directory with descriptive focus areas and mobile-friendly names.
- Contact: visible field labels, native validation, email and phone links, WhatsApp link, and an explicit email-draft handoff. Removed the previous simulated “sent successfully” behavior.
- Support: currency and amount controls, custom pledges, required donor details, and an email handoff to arrange a contribution. No payment is taken on the website.
- Shared: mobile navigation, current-page states, skip link, focus styles, reduced-motion handling, five primary typography roles, locally served fonts, and updated page metadata.

## Assets and content

All photographs and portraits come from the existing `public/images/training` and `public/images/leadership` folders. No stock photography, AI portraits, external found images, or invented testimonials were added. The original gallery captions described clinical procedures that were not visible in the images; the new captions describe the visible workshops instead. No outside image credits are required by this implementation; ownership and participant permission remain those of the original project assets.

Font files are self-hosted from Fontshare: [Panchang](https://www.fontshare.com/fonts/panchang) and [Switzer](https://www.fontshare.com/fonts/switzer). No footage was supplied; a gentle scroll-linked movement on the hero photograph provides the moving image without substituting unrelated stock footage.

No new sample people, organizations, statistics, or payment accounts were created. Existing leadership, program, contact, and partner data are retained from the project. Confirm their current accuracy before publishing. The larger image crops reveal the limits of the supplied workshop photography; higher-resolution original photographs would be the most useful future visual improvement.

## Validation

- Production build, TypeScript and ESLint.
- Every inner route checked at 1440, 768, and 375 pixels: no overflow, broken images, or browser exceptions. Long partner heading corrected and rechecked.
- Homepage additionally checked at 390, 320 pixels and in phone landscape.
- All internal links and program anchors resolve.
- Four program selections update the description, photo, and destination.
- Mobile menu opens and closes; gallery next-photo navigation, Escape, and focus restoration work.
- Contact subject prefill, required fields, invalid email, currency presets, negative pledge rejection, and movement selection checked.
- No emails were sent and no donations were made during testing.

Automated inspector evidence and screenshots are in `.taste-skill/before`, `.taste-skill/after`, and `.taste-skill/routes`. Design decisions and critique rounds are in `.taste-skill/design-notes.md`.

## Before and after

| Homepage measurement | Before | After |
| --- | --- | --- |
| Design-inspector failures | 13 | 0 |
| Design-inspector warnings | 7 | 1 (no project video supplied) |
| Phone headline lines | 3 | 2 |
| Typical body size | 14px | 16px |
| Desktop type sizes | 9 | 5 |
| First-screen photography | None | 59% of viewport |

Final internal visual critique: design **8.5**, usability **9**, creativity **7**, content **8**; weighted score **8.3/10**. The main remaining limitation is the resolution and variety of the source photography, not a broken page or unfinished interaction. No external image substitutions or newly fabricated proof were used.
