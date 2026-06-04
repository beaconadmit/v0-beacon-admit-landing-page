"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { FacilityProfileStep } from "./steps/facility-profile-step";
import { ServicesProgramsStep } from "./steps/services-programs-step";
import { HoursAvailabilityStep } from "./steps/hours-availability-step";
import { InsuranceSettingsStep } from "./steps/insurance-settings-step";
import { WarmTransferStep } from "./steps/warm-transfer-step";
import { ComplianceScriptsStep } from "./steps/compliance-scripts-step";
import { TestCallStep } from "./steps/test-call-step";
import { ActivateStep } from "./steps/activate-step";

export interface FacilityConfig {
  facility_profile: {
    facility_name: string;
    legal_business_name: string;
    primary_address: string;
    timezone: string;
    main_phone: string;
    website: string;
    contact_email?: string;
    states_served: string[];
    facility_type: string;
  };
  services_programs: {
    detox_available: boolean;
    residential_available: boolean;
    php_available: boolean;
    iop_available: boolean;
    dual_diagnosis_available: boolean;
    adult_program?: boolean;
    transportation_available?: boolean;
    accepted_levels_of_care: string[];
  };
  hours_availability: {
    after_hours_enabled: boolean;
    business_hours_by_day: Record<string, string[]>;
    same_day_admission_available: boolean;
  };
  warm_transfer_rules: {
    primary_transfer_number: string;
    backup_transfer_number: string;
    max_transfer_attempts: number;
    transfer_timeout_seconds: number;
    fallback_callback_required?: boolean;
    after_hours_transfer_enabled?: boolean;
  };
  insurance_settings: {
    commercial_insurance_accepted: boolean;
    medicaid_accepted: boolean;
    medicare_accepted: boolean;
    private_pay_accepted: boolean;
    vob_required_before_transfer?: boolean;
    accepted_insurance_carriers: string[];
  };
  compliance_scripts: {
    opening_disclosure: string;
    not_medical_provider_disclaimer: string;
    emergency_escalation_script: string;
    privacy_notice_script: string;
    consent_to_continue_script: string;
    call_recording_notice?: string;
    third_party_caller_script?: string;
  };
  agent_behavior_settings: {
    recording_enabled: boolean;
    allow_callback_scheduling: boolean;
    allow_warm_transfer: boolean;
  };
}

const STEPS = [
  {
    id: "facility-profile",
    title: "Facility Profile",
    description: "Basic information about your facility",
    component: FacilityProfileStep,
  },
  {
    id: "services-programs",
    title: "Services & Programs",
    description: "Levels of care and services offered",
    component: ServicesProgramsStep,
  },
  {
    id: "hours-availability",
    title: "Hours & Availability",
    description: "Business hours and after-hours settings",
    component: HoursAvailabilityStep,
  },
  {
    id: "insurance",
    title: "Insurance Settings",
    description: "Accepted insurance carriers",
    component: InsuranceSettingsStep,
  },
  {
    id: "warm-transfer",
    title: "Warm Transfer",
    description: "Transfer numbers and rules",
    component: WarmTransferStep,
  },
  {
    id: "compliance",
    title: "Compliance Scripts",
    description: "Legal disclaimers and scripts",
    component: ComplianceScriptsStep,
  },
  {
    id: "test-call",
    title: "Test Call",
    description: "Test your AI agent",
    component: TestCallStep,
  },
  {
    id: "activate",
    title: "Activate",
    description: "Go live with your AI agent",
    component: ActivateStep,
  },
];

export default function OnboardingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("token");

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [clinicId, setClinicId] = useState<string>("");
  const [config, setConfig] = useState<FacilityConfig | null>(null);

  // Load initial data
  useEffect(() => {
    if (!inviteToken) {
      setError("Invalid invitation link. Please check your email for the correct link.");
      setLoading(false);
      return;
    }

    loadOnboardingData();
  }, [inviteToken]);

  async function loadOnboardingData() {
    try {
      // Validate invite token and get clinic_id
      const response = await fetch(`/api/validate-invite?token=${inviteToken}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid or expired invitation");
      }

      const result = await response.json();
      const inviteData = result.data || result;
      setClinicId(inviteData.clinic_id);

      // Load existing facility config or use defaults
      const configResponse = await fetch(`/api/onboarding/facility-config/${inviteData.clinic_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Onboarding-Invite-Token": inviteToken || "",
        },
      });

      if (configResponse.ok) {
        const configResult = await configResponse.json();
        setConfig(configResult.data || getDefaultConfig(inviteData.clinic_id));
      } else {
        setConfig(getDefaultConfig(inviteData.clinic_id));
      }
    } catch (err: any) {
      console.error("Error loading onboarding data:", err);
      setError(err.message || "Failed to load onboarding data");
    } finally {
      setLoading(false);
    }
  }

  function getDefaultConfig(clinicId: string): FacilityConfig {
    return {
      facility_profile: {
        facility_name: "",
        legal_business_name: "",
        primary_address: "",
        timezone: "America/Los_Angeles",
        main_phone: "",
        website: "",
        contact_email: "",
        states_served: ["CA"],
        facility_type: "behavioral_health",
      },
      services_programs: {
        detox_available: false,
        residential_available: false,
        php_available: false,
        iop_available: false,
        dual_diagnosis_available: false,
        adult_program: true,
        transportation_available: false,
        accepted_levels_of_care: [],
      },
      hours_availability: {
        after_hours_enabled: true,
        business_hours_by_day: {
          monday: ["08:00", "17:00"],
          tuesday: ["08:00", "17:00"],
          wednesday: ["08:00", "17:00"],
          thursday: ["08:00", "17:00"],
          friday: ["08:00", "17:00"],
          saturday: [],
          sunday: [],
        },
        same_day_admission_available: false,
      },
      warm_transfer_rules: {
        primary_transfer_number: "",
        backup_transfer_number: "",
        max_transfer_attempts: 2,
        transfer_timeout_seconds: 20,
        fallback_callback_required: true,
        after_hours_transfer_enabled: true,
      },
      insurance_settings: {
        commercial_insurance_accepted: true,
        medicaid_accepted: false,
        medicare_accepted: false,
        private_pay_accepted: true,
        vob_required_before_transfer: false,
        accepted_insurance_carriers: [],
      },
      compliance_scripts: {
        opening_disclosure: "I'm the after-hours admissions assistant for {{facility_name}}.",
        not_medical_provider_disclaimer: "I'm not a clinician and can't provide medical advice or guarantee admission.",
        emergency_escalation_script: "If you are in immediate danger, overdosing, or may hurt yourself or someone else, call 911 now or go to the nearest emergency room.",
        privacy_notice_script: "I'll collect only the information needed for the admissions team to call you back.",
        consent_to_continue_script: "Do I have your permission to collect this information for the admissions team?",
        call_recording_notice: "This call may be recorded for quality assurance and admissions follow-up.",
        third_party_caller_script: "I can take your information, but the admissions team may need to speak directly with the person seeking care.",
      },
      agent_behavior_settings: {
        recording_enabled: false,
        allow_callback_scheduling: true,
        allow_warm_transfer: true,
      },
    };
  }

  async function saveCurrentStep() {
    if (!config || !clinicId) return;

    setSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/onboarding/facility-config/${clinicId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Onboarding-Invite-Token": inviteToken || "",
        },
        body: JSON.stringify({
          ...config,
          onboarding_status: "in_progress",
          current_step: currentStep,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save");
      }

      return true;
    } catch (err: any) {
      console.error("Error saving config:", err);
      setError(err.message || "Failed to save. Please try again.");
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function handleNext() {
    const saved = await saveCurrentStep();
    if (!saved) return;

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  }

  async function handlePrevious() {
    if (currentStep > 0) {
      await saveCurrentStep();
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  }

  async function handleStepClick(stepIndex: number) {
    if (stepIndex < currentStep) {
      // Allow going back to previous steps
      await saveCurrentStep();
      setCurrentStep(stepIndex);
      window.scrollTo(0, 0);
    }
  }

  async function handleComplete() {
    setSaving(true);
    setError("");

    try {
      // Save final config
      const saveResponse = await fetch(`/api/onboarding/facility-config/${clinicId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Onboarding-Invite-Token": inviteToken || "",
        },
        body: JSON.stringify({
          ...config,
          onboarding_status: "completed",
          config_status: "published",
        }),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save final configuration");
      }

      // Provision the clinic (create Retell agent, etc.)
      const provisionResponse = await fetch(`/api/admin/provision-clinic/${clinicId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!provisionResponse.ok) {
        const errorData = await provisionResponse.json();
        throw new Error(errorData.message || "Failed to provision AI agent");
      }

      setSuccess(true);
      
      // Redirect to completion page
      setTimeout(() => {
        router.push("/onboarding/complete");
      }, 2000);
    } catch (err: any) {
      console.error("Error completing onboarding:", err);
      setError(err.message || "Failed to complete onboarding");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error && !config) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-8 max-w-md">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button onClick={() => router.push("/")} className="w-full">
            Return to Home
          </Button>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-8 max-w-md text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Onboarding Complete!
          </h2>
          <p className="text-gray-600 mb-4">
            Your AI agent is being provisioned. You'll receive an email when it's ready.
          </p>
          <Loader2 className="h-6 w-6 animate-spin text-green-600 mx-auto" />
        </Card>
      </div>
    );
  }

  const CurrentStepComponent = STEPS[currentStep].component;
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Set Up Your AI Agent
          </h1>
          <p className="mt-2 text-gray-600">
            Complete the steps below to configure your after-hours admissions assistant.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {STEPS.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="mb-8 flex flex-wrap gap-2">
          {STEPS.map((step, index) => (
            <button
              key={step.id}
              onClick={() => handleStepClick(index)}
              disabled={index > currentStep}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                index === currentStep
                  ? "bg-green-600 text-white"
                  : index < currentStep
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {index + 1}. {step.title}
            </button>
          ))}
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Current Step Content */}
        <Card className="p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {STEPS[currentStep].title}
            </h2>
            <p className="mt-1 text-gray-600">
              {STEPS[currentStep].description}
            </p>
          </div>

          <CurrentStepComponent
            config={config!}
            setConfig={setConfig}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0 || saving}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button onClick={handleNext} disabled={saving}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Activating...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Complete & Activate
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
