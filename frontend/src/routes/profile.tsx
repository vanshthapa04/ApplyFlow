import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { initialsFromName } from "@/lib/format";
import { currentUser } from "@/lib/mock-data";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — ApplyFlow" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <AppShell>
      <PageHeader title="Profile" description="Manage your account details." />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl border-border/70 shadow-sm lg:col-span-1">
          <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-gradient-to-br from-primary to-blue-500 text-lg font-semibold text-primary-foreground">
                {initialsFromName(currentUser.fullName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{currentUser.fullName}</h2>
              <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            </div>
            <Separator />
            <div className="w-full space-y-2 text-left text-sm">
              <p className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" /> {currentUser.email}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/70 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Account information</CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="fullname">Full name</Label>
              <Input id="fullname" defaultValue={currentUser.fullName} className="h-10 rounded-xl" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={currentUser.email} className="h-10 rounded-xl" />
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <Button className="rounded-xl">Save changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}