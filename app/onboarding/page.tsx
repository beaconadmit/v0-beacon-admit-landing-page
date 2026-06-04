import { Suspense } from "react";
import OnboardingWizard from "./wizard";

function OnboardingLoading() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-lg border bg-white p-8 shadow-sm">
        <div className="h-8 w-64 animate-pulse rounded bg-slate-200" />
        <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-100" />
        <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-slate-100" />
      </div>
    </main>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<OnboardingLoading />}>
      <OnboardingWizard />
    </Suspense>
  );
}
