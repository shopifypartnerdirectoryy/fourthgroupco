# Deployment-safe Fourth Group & Co homepage

## What will change
- Make every homepage image load on Vercel and other deployments by replacing preview-only image references with portable asset URLs while preserving the uploaded covers.
- Remove the decorative icon from the annual membership label.
- Turn “Claim Free Article” into a small fixed page-edge prompt that remains available while visitors scroll; keep the existing accessible popup, validated form, saved submission, and success message.
- Rewrite homepage labels, headings, descriptions, and calls to action that resemble the reference site so the voice is specific to Fourth Group & Co.
- Add the remaining homepage experiences represented on the reference: member perspectives, author conversations, a richer writing-prompt area, current editorial stories, upcoming literary events, and a distinct membership invitation.
- Keep the requested announcement/press-release block excluded.
- Preserve all current menus and linked destination pages.

## Verification
- Check every image request and homepage link on desktop and mobile.
- Test the fixed article prompt while scrolling and complete its form flow.
- Confirm all homepage sections render without overlap and the project builds cleanly.

## Technical details
- Use absolute CDN URLs derived from the existing asset pointers for deployment portability.
- Keep local bundled artwork imported through Vite.
- Use existing semantic colors, buttons, typography, and responsive patterns.
