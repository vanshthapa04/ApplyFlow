import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  CalendarClock,
  ExternalLink,
  MapPin,
  Monitor,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { InterviewFormDialog } from "@/components/modals/InterviewFormDialog";
import { CompanyLogo } from "@/components/shared/CompanyLogo";
import { ConfirmDeleteDialog } from "@/components/shared/ConfirmDeleteDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { InterviewStatusBadge } from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDateTime } from "@/lib/format";
import {
  applications as mockApplications,
  interviews as mockInterviews,
  type Interview,
  type InterviewMode,
} from "@/lib/mock-data";

export const Route = createFileRoute("/interviews")({
  head: () => ({ meta: [{ title: "Interviews — ApplyFlow" }] }),
  component: InterviewsPage,
});

const modeIcon: Record<InterviewMode, typeof Monitor> = {
  Online: Monitor,
  Offline: MapPin,
};

function useLookup() {
  return (applicationId: string) => {
    const app = mockApplications.find((a) => a.id === applicationId);
    return {
      companyName: app?.companyName ?? "—",
      jobTitle: app?.jobTitle ?? "—",
    };
  };
}

function InterviewsPage() {
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Interview | null>(null);
  const [deleting, setDeleting] = useState<Interview | null>(null);
  const lookup = useLookup();

  const sorted = [...mockInterviews].sort((a, b) => a.interviewDate.localeCompare(b.interviewDate));

  return (
    <AppShell>
      <PageHeader
        title="Interviews"
        description="Prep for what's coming up and review what's done."
        actions={
          <Button className="rounded-xl gap-2" onClick={() => setCreating(true)}>
            <Plus className="h-4 w-4" /> Schedule interview
          </Button>
        }
      />

      {mockInterviews.length === 0 ? (
        <EmptyState
          icon={CalendarClock}
          title="No interviews scheduled"
          description="Schedule your first interview to see it here."
          action={
            <Button className="rounded-xl gap-2" onClick={() => setCreating(true)}>
              <Plus className="h-4 w-4" /> Schedule interview
            </Button>
          }
        />
      ) : (
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="rounded-xl">
            <TabsTrigger value="timeline" className="rounded-lg">Timeline</TabsTrigger>
            <TabsTrigger value="table" className="rounded-lg">Table</TabsTrigger>
            <TabsTrigger value="cards" className="rounded-lg">Cards</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="mt-4">
            <div className="relative ml-3 border-l border-border/70 pl-6">
              {sorted.map((i, idx) => {
                const Icon = modeIcon[i.mode];
                const { companyName, jobTitle } = lookup(i.applicationId);
                const upcoming = i.status === "Scheduled" || i.status === "Rescheduled";
                return (
                  <motion.div
                    key={i.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="relative mb-6"
                  >
                    <span className={`absolute -left-[33px] top-2 grid h-5 w-5 place-items-center rounded-full ring-4 ring-background ${upcoming ? "bg-primary" : "bg-muted-foreground/40"}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <Card className="rounded-2xl border-border/70 shadow-sm">
                      <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
                        <div className="min-w-0 flex items-center gap-3">
                          <CompanyLogo name={companyName} size="md" />
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="truncate text-sm font-semibold text-foreground">{i.round}</h3>
                              <Badge variant="outline" className="rounded-full text-xs">{jobTitle}</Badge>
                              <InterviewStatusBadge status={i.status} />
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {companyName} · with {i.interviewerName || "—"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><Icon className="h-3.5 w-3.5" /> {i.mode}</span>
                          <span className="font-medium text-foreground">{formatDateTime(i.interviewDate)}</span>
                          <div className="flex items-center gap-1">
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg" onClick={() => setEditing(i)} aria-label="Edit">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-rose-600 hover:text-rose-700" onClick={() => setDeleting(i)} aria-label="Delete">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="table" className="mt-4">
            <Card className="rounded-2xl border-border/70 p-0 shadow-sm">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Round</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Interviewer</TableHead>
                      <TableHead>Interview Date</TableHead>
                      <TableHead>Mode</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sorted.map((i) => {
                      const { companyName } = lookup(i.applicationId);
                      return (
                        <TableRow key={i.id}>
                          <TableCell className="font-medium">{i.round}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CompanyLogo name={companyName} size="sm" />
                              <span className="text-sm">{companyName}</span>
                            </div>
                          </TableCell>
                          <TableCell>{i.interviewerName || "—"}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{formatDateTime(i.interviewDate)}</TableCell>
                          <TableCell>{i.mode}</TableCell>
                          <TableCell><InterviewStatusBadge status={i.status} /></TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg" onClick={() => setEditing(i)} aria-label="Edit">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-rose-600 hover:text-rose-700" onClick={() => setDeleting(i)} aria-label="Delete">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="cards" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sorted.map((i) => {
                const Icon = modeIcon[i.mode];
                const { companyName, jobTitle } = lookup(i.applicationId);
                return (
                  <Card key={i.id} className="rounded-2xl border-border/70 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="rounded-full">{i.round}</Badge>
                        <InterviewStatusBadge status={i.status} />
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <CompanyLogo name={companyName} size="md" />
                        <div className="min-w-0">
                          <h3 className="truncate text-base font-semibold text-foreground">{jobTitle}</h3>
                          <p className="truncate text-xs text-muted-foreground">{companyName}</p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                        <p className="flex items-center gap-1.5"><Icon className="h-3.5 w-3.5" /> {i.mode}</p>
                        <p>Interviewer: <span className="text-foreground font-medium">{i.interviewerName || "—"}</span></p>
                        <p>{formatDateTime(i.interviewDate)}</p>
                        {i.mode === "Online" && i.meetingLink && (
                          <a href={i.meetingLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 truncate text-primary hover:underline">
                            Meeting link <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        {i.mode === "Offline" && i.location && (
                          <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {i.location}</p>
                        )}
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 rounded-lg gap-1.5" onClick={() => setEditing(i)}>
                          <Pencil className="h-3.5 w-3.5" /> Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 rounded-lg gap-1.5 text-rose-600 hover:text-rose-700" onClick={() => setDeleting(i)}>
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      )}

      <InterviewFormDialog open={creating} onOpenChange={setCreating} />
      <InterviewFormDialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)} initialValue={editing} />
      <ConfirmDeleteDialog
        open={!!deleting}
        onOpenChange={(o) => !o && setDeleting(null)}
        title="Delete interview"
        itemName={deleting?.round}
        onConfirm={() => setDeleting(null)}
      />
    </AppShell>
  );
}