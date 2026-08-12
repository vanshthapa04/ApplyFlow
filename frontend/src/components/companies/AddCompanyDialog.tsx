import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";

import { useCreateCompany } from "@/hooks/useCreateCompany";

export default function AddCompanyDialog() {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  

  const createCompany = useCreateCompany();

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await createCompany.mutateAsync({
      name,
      website,
      industry,
      location,
    });

    setName("");
    setWebsite("");
    setIndustry("");
    setLocation("");

    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
  render={
    <Button className="gap-2" />
  }
>
  <Plus size={18} />
  Add Company
</DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Add Company
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
              placeholder="Eg. Google"
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
              placeholder="https://google.com"
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
              placeholder="Technology"
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
              placeholder="California"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={createCompany.isPending}
            >
              {createCompany.isPending
                ? "Creating..."
                : "Create Company"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}