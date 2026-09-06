# Unused overlay layers

Figma Make exported each feature screenshot twice: once as the finished
composite (app window + red highlight glow, flattened) and again as the
highlight element on its own. The generated code drew both, so every feature
card rendered its highlighted panel twice — offset, and at the wrong scale.

The cards now render only the composite, so these six files are unused. Kept
here in case the highlight is ever wanted as a separate, animatable layer; the
composites they duplicate are:

| This file                           | Duplicates part of                    |
| ----------------------------------- | ------------------------------------- |
| `feature-creator-studio-inset.png`  | `src/assets/feature-creator-studio.png` |
| `feature-share-event-qr.png`        | `src/assets/feature-share-event.png`    |
| `feature-share-event-link.png`      | `src/assets/feature-share-event.png`    |
| `feature-dashboard-guest-row.png`   | `src/assets/feature-dashboard.png`      |
| `feature-dashboard-checkin-row.png` | `src/assets/feature-dashboard.png`      |
| `feature-registration-ticket.png`   | `src/assets/feature-registration.png`   |
