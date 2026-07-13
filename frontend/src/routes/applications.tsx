import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Eye,
  ExternalLink,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { ApplicationFormDialog } from "@/components/modals/ApplicationFormDialog";
import { CompanyLogo } from "@/components/shared/CompanyLogo";
import { ConfirmDeleteDialog } from "@/components/shared/ConfirmDeleteDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/format";
import {
  APPLICATION_STATUSES,
  applications as mockApplications,
  type Application,
  type ApplicationStatus,
} from "@/lib/mock-data";

export const Route = createFileRoute("/applications")({
  head: () => ({ meta: [{ title: "Applications — ApplyFlow" }] }),
  component: ApplicationsPage,
});

const PAGE_SIZE = 8;

function ApplicationsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ApplicationStatus | "all">("all");
  const [page, setPage] = useState(1);
  const [viewing, setViewing] = useState<Application | null>(null);
  const [editing, setEditing] = useState<Application | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<Application | null>(null);

  const filtered = useMemo(() => {
    return mockApplications.filter((a) => {
      const q = query.toLowerCase();
      const matchesQ =
        !q ||
        a.jobTitle.toLowerCase().includes(q) ||
        a.companyName.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q);
      const matchesS = status === "all" || a.status === status;
      return matchesQ && matchesS;
    });
  }, [query, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <AppShell>
      <PageHeader
        title="Applications"
        description="Track every role you've applied to across companies."
        actions={
          <Button className="rounded-xl gap-2" onClick={() => setCreating(true)}>
            <Plus className="h-4 w-4" /> New application
          </Button>
        }
      />

      {mockApplications.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No applications yet"
          description="Start tracking your job search by adding your first application."
          action={
            <Button className="rounded-xl gap-2" onClick={() => setCreating(true)}>
              <Plus className="h-4 w-4" /> Add application
            </Button>
          }
        />
      ) : (
        <Card className="rounded-2xl border-border/70 p-0 shadow-sm">
          <div className="flex flex-col gap-3 border-b border-border/70 p-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder="Search applications…"
                className="h-10 rounded-xl pl-9"
              />
            </div>
            <Select value={status} onValueChange={(v) => { setStatus(v as ApplicationStatus | "all"); setPage(1); }}>
              <SelectTrigger className="h-10 w-[180px] rounded-xl"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {APPLICATION_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Role</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-16 text-center text-sm text-muted-foreground">
                      No applications match your filters.
                    </TableCell>
                  </TableRow>
                )}
                {pageData.map((a, idx) => (
                  <motion.tr
                    key={a.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    className="border-b border-border/60 transition-colors hover:bg-muted/40"
                  >
                    <TableCell className="font-medium text-foreground">{a.jobTitle}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CompanyLogo name={a.companyName} size="sm" />
                        <span className="text-sm">{a.companyName}</span>
                      </div>
                    </TableCell>
                    <TableCell><StatusBadge status={a.status} /></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{a.location}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{a.salary}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(a.applicationDate)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg" onClick={() => setViewing(a)} aria-label="View">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg" onClick={() => setEditing(a)} aria-label="Edit">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-rose-600 hover:text-rose-700" onClick={() => setDeleting(a)} aria-label="Delete">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between border-t border-border/70 p-4">
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-medium text-foreground">{pageData.length}</span> of{" "}
              <span className="font-medium text-foreground">{filtered.length}</span> applications
            </p>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="px-2 text-xs text-muted-foreground">Page {page} / {totalPages}</span>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Sheet open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <SheetContent className="w-full sm:max-w-md">
          {viewing && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-3">
                  <CompanyLogo name={viewing.companyName} size="lg" />
                  <div className="min-w-0">
                    <SheetTitle className="truncate text-left">{viewing.jobTitle}</SheetTitle>
                    <SheetDescription className="text-left">{viewing.companyName}</SheetDescription>
                  </div>
                </div>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status={viewing.status} />
                  <span className="rounded-full border border-border/70 bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground">
                    {viewing.jobType}
                  </span>
                </div>
                <Separator />
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-xs text-muted-foreground">Location</dt>
                    <dd className="mt-1 font-medium">{viewing.location || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Salary</dt>
                    <dd className="mt-1 font-medium">{viewing.salary || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Application date</dt>
                    <dd className="mt-1 font-medium">{formatDate(viewing.applicationDate)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Job type</dt>
                    <dd className="mt-1 font-medium">{viewing.jobType}</dd>
                  </div>
                  {viewing.jobUrl && (
                    <div className="col-span-2">
                      <dt className="text-xs text-muted-foreground">Job URL</dt>
                      <dd className="mt-1">
                        <a
                          href={viewing.jobUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 truncate text-sm font-medium text-primary hover:underline"
                        >
                          {viewing.jobUrl} <ExternalLink className="h-3 w-3" />
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
                <Separator />
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 rounded-xl gap-2" onClick={() => { setEditing(viewing); setViewing(null); }}>
                    <Pencil className="h-4 w-4" /> Edit
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-xl gap-2 text-rose-600 hover:text-rose-700" onClick={() => { setDeleting(viewing); setViewing(null); }}>
                    <Trash2 className="h-4 w-4" /> Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <ApplicationFormDialog open={creating} onOpenChange={setCreating} />
      <ApplicationFormDialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)} initialValue={editing} />
      <ConfirmDeleteDialog
        open={!!deleting}
        onOpenChange={(o) => !o && setDeleting(null)}
        title="Delete application"
        itemName={deleting?.jobTitle}
        onConfirm={() => setDeleting(null)}
      />
    </AppShell>
  );
}