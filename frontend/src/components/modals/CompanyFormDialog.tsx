import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Company } from "@/lib/mock-data";

export type CompanyFormValues = Omit<Company, "id">;

interface CompanyFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue?: Company | null;
  onSubmit?: (values: CompanyFormValues, id?: string) => void;
}

const empty: CompanyFormValues = { name: "", website: "", industry: "", location: "" };

export function CompanyFormDialog({ open, onOpenChange, initialValue, onSubmit }: CompanyFormDialogProps) {
  const isEdit = !!initialValue;
  const [values, setValues] = useState<CompanyFormValues>(empty);

  useEffect(() => {
    if (open) {
      setValues(
        initialValue
          ? {
              name: initialValue.name,
              website: initialValue.website,
              industry: initialValue.industry,
              location: initialValue.location,
            }
          : empty,
      );
    }
  }, [open, initialValue]);

  const set = <K extends keyof CompanyFormValues>(k: K, v: CompanyFormValues[K]) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(values, initialValue?.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit company" : "Add company"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update this company's details." : "Track a new company in your job search."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="c-name">Name</Label>
            <Input id="c-name" required value={values.name} onChange={(e) => set("name", e.target.value)} placeholder="Acme Inc." className="h-10 rounded-xl" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="c-website">Website</Label>
            <Input id="c-website" type="url" value={values.website} onChange={(e) => set("website", e.target.value)} placeholder="https://acme.com" className="h-10 rounded-xl" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="c-industry">Industry</Label>
              <Input id="c-industry" value={values.industry} onChange={(e) => set("industry", e.target.value)} placeholder="Software" className="h-10 rounded-xl" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="c-location">Location</Label>
              <Input id="c-location" value={values.location} onChange={(e) => set("location", e.target.value)} placeholder="Bangalore, IN" className="h-10 rounded-xl" />
            </div>
          </div>
          <DialogFooter className="mt-2">
            <Button type="button" variant="outline" className="rounded-xl" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="rounded-xl">{isEdit ? "Save changes" : "Add company"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}