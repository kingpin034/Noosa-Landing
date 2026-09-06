# Design exports

Original exports from the Figma file, kept for reference. **Nothing here is
imported by the app** — the images the page actually renders live in
`src/assets/`, and the icons are inlined as SVG paths in
`src/components/icon-paths.ts`.

Four of these are byte-identical copies of files already in `src/assets/`:

| This folder                      | Same file in the app                 |
| -------------------------------- | ------------------------------------ |
| `Event Creator Studio.png`       | `src/assets/feature-creator-studio.png` |
| `Event Management Dashboard.png` | `src/assets/feature-dashboard.png`      |
| `Event Registration.png`         | `src/assets/feature-registration.png`   |
| `Share Event.png`                | `src/assets/feature-share-event.png`    |

The rest are either earlier crops or the SVG originals of icons that are now
inlined. Safe to delete the whole folder if you don't want the design source
tracked alongside the code.
