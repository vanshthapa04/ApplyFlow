import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Pencil } from "lucide-react";

import { useUpdateCompany } from "@/hooks/useUpdateCompany";
import type { Company } from "@/types/company";

interface Props {
  company: Company;
}

export default function EditCompanyDialog({
  company,
}: Props) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(company.name);
  const [website, setWebsite] = useState(company.website ?? "");
  const [industry, setIndustry] = useState(company.industry ?? "");
  const [location, setLocation] = useState(company.location ?? "");

  const updateCompany = useUpdateCompany();

  useEffect(() => {
    if (open) {
      setName(company.name);
      setWebsite(company.website ?? "");
      setIndustry(company.industry ?? "");
      setLocation(company.location ?? "");
    }
  }, [open, company]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await updateCompany.mutateAsync({
      id: company.id,
      data: {
        name,
        website,
        industry,
        location,
      },
    });

    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
          />
        }
      >
        <Pencil size={18} />
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Edit Company
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Company Name *
            </label>

            <Input
              required
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Website
            </label>

            <Input
              value={website}
              onChange={(e) =>
                setWebsite(e.target.value)
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Industry
            </label>

            <Input
              value={industry}
              onChange={(e) =>
                setIndustry(e.target.value)
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Location
            </label>

            <Input
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={updateCompany.isPending}
            >
              {updateCompany.isPending
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}