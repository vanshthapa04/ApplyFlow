import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Building2, Eye, Globe, MapPin, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { CompanyFormDialog } from "@/components/modals/CompanyFormDialog";
import { CompanyLogo } from "@/components/shared/CompanyLogo";
import { ConfirmDeleteDialog } from "@/components/shared/ConfirmDeleteDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { companies as mockCompanies, type Company } from "@/lib/mock-data";

export const Route = createFileRoute("/companies")({
  head: () => ({ meta: [{ title: "Companies — ApplyFlow" }] }),
  component: CompaniesPage,
});

function CompaniesPage() {
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Company | null>(null);
  const [viewing, setViewing] = useState<Company | null>(null);
  const [deleting, setDeleting] = useState<Company | null>(null);

  const filtered = mockCompanies.filter((c) => {
    const q = query.toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
  });

  return (
    <AppShell>
      <PageHeader
        title="Companies"
        description="All the organizations you're tracking."
        actions={
          <Button className="rounded-xl gap-2" onClick={() => setCreating(true)}>
            <Plus className="h-4 w-4" /> Add company
          </Button>
        }
      />

      {mockCompanies.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No companies yet"
          description="Add the first company you're tracking to get started."
          action={
            <Button className="rounded-xl gap-2" onClick={() => setCreating(true)}>
              <Plus className="h-4 w-4" /> Add company
            </Button>
          }
        />
      ) : (
        <>
          <div className="mb-4 relative max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search companies…"
              className="h-10 rounded-xl pl-9"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.25 }}
              >
                <Card className="group rounded-2xl border-border/70 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <CompanyLogo name={c.name} size="lg" />
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-base font-semibold text-foreground">{c.name}</h3>
                        <p className="truncate text-xs text-muted-foreground">{c.industry}</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                      {c.website && (
                        <a href={c.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 truncate hover:text-primary hover:underline">
                          <Globe className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{c.website.replace(/^https?:\/\//, "")}</span>
                        </a>
                      )}
                      <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {c.location}</p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 rounded-lg gap-1.5" onClick={() => setViewing(c)}>
                        <Eye className="h-3.5 w-3.5" /> View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 rounded-lg gap-1.5" onClick={() => setEditing(c)}>
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 rounded-lg gap-1.5 text-rose-600 hover:text-rose-700" onClick={() => setDeleting(c)}>
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </>
      )}

      <CompanyFormDialog open={creating} onOpenChange={setCreating} />
      <CompanyFormDialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)} initialValue={editing} />
      <CompanyFormDialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)} initialValue={viewing} />
      <ConfirmDeleteDialog
        open={!!deleting}
        onOpenChange={(o) => !o && setDeleting(null)}
        title="Delete company"
        itemName={deleting?.name}
        onConfirm={() => setDeleting(null)}
      />
    </AppShell>
  );
}