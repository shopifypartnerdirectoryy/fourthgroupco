import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { PageShell } from "./components/page-shell";

function PendingPage() {
  return (
    <PageShell>
      <div role="status" aria-live="polite" className="mx-auto max-w-6xl px-5 py-12 text-center text-muted-foreground">
        Loading your page…
      </div>
    </PageShell>
  );
}

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: PendingPage,
  });

  return router;
};
