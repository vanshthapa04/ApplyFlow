import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  
  import { Button } from "@/components/ui/button";
  
  import { Trash2 } from "lucide-react";
  
  import { useDeleteCompany } from "@/hooks/useDeleteCompany";
  
  interface Props {
    id: string;
    name: string;
  }
  
  export default function DeleteCompanyDialog({
    id,
    name,
  }: Props) {
    const deleteCompany = useDeleteCompany();
  
    async function handleDelete() {
      await deleteCompany.mutateAsync(id);
    }
  
    return (
      <AlertDialog>
        <AlertDialogTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
            />
          }
        >
          <Trash2
            size={18}
            className="text-red-500"
          />
        </AlertDialogTrigger>
  
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Company
            </AlertDialogTitle>
  
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{name}</strong>?
  
              <br />
              <br />
  
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
  
          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>
  
            <AlertDialogAction
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }