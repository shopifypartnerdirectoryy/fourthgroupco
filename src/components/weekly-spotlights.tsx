import { useQuery } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/** Book of the Week + Creative of the Week. Shows the latest published entry whose week has started. */
export function WeeklySpotlights() {
  const { data, isLoading } = useQuery({
    queryKey: ["weekly-spotlights"],
    queryFn: async () => {
      const { data, error } = await supabase.from("weekly_spotlights").select("*").eq("status", "published").order("week_start", { ascending: false }).limit(20);
      if (error) throw error;
      return { book: data.find((d) => d.kind === "book"), creative: data.find((d) => d.kind === "creative") };
    },
  });
  if (isLoading || (!data?.book && !data?.creative)) return null;

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2">
        {[{ label: "Book of the Week", item: data.book }, { label: "Creative of the Week", item: data.creative }].map(({ label, item }) =>
          item ? (
            <article key={label} className="grid grid-cols-[110px_1fr] gap-6 border-t-2 border-primary bg-card p-6 shadow-sm">
              {item.image_url ? <img src={item.image_url} alt={item.title} loading="lazy" className="w-full rounded-sm object-cover" /> : <div className="aspect-[3/4] rounded-sm bg-secondary" />}
              <div>
                <p className="text-xs font-semibold uppercase text-primary">{label}</p>
                <h2 className="mt-2 font-serif text-2xl leading-tight text-card-foreground">{item.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{item.creator_name}{item.specialty ? ` · ${item.specialty}` : ""}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                {item.link_url ? <a href={item.link_url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary underline">Learn more <ExternalLink className="size-3" /></a> : null}
              </div>
            </article>
          ) : null,
        )}
      </div>
    </section>
  );
}
