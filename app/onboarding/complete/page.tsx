import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OnboardingCompletePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <Card className="mx-auto max-w-xl p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />
        <h1 className="mt-6 text-3xl font-bold text-slate-950">
          Onboarding submitted
        </h1>
        <p className="mt-3 text-slate-600">
          Your Beacon Admit configuration has been submitted. The admissions
          assistant will be provisioned and reviewed before live call routing is
          activated.
        </p>
        <p className="mt-4 text-sm text-slate-500">
          If anything needs a human review, the Beacon Admit team will contact
          your facility administrator before enabling production routing.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link href="/">Return home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/login">Admin login</Link>
          </Button>
        </div>
      </Card>
    </main>
  );
}
