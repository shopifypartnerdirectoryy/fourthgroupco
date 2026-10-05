<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep reader-facing book covers as Vite-imported local assets so external deployments do not depend on Lovable-only asset proxy paths.
- Keep the brand logo as a Vite-imported local asset, with a separate optimized public favicon, so external deployments remain portable.

- Keep large editorial directories in typed local data modules so public pages remain fast, portable, and independent of runtime services.
- Keep editorial opportunity records and author profiles in typed local data modules so filters remain consistent across public directories.
