"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FACILITY_TYPES = [
  { value: "detox", label: "Detox" },
  { value: "residential", label: "Residential" },
  { value: "php", label: "PHP (Partial Hospitalization)" },
  { value: "iop", label: "IOP (Intensive Outpatient)" },
  { value: "outpatient", label: "Outpatient" },
  { value: "mixed", label: "Mixed Levels of Care" },
];

const STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

const AFTER_HOURS_OPTIONS = [
  { value: "voicemail", label: "Voicemail only" },
  { value: "answering_service", label: "Answering service" },
  { value: "on_call_staff", label: "On-call staff" },
  { value: "nothing", label: "Nothing / Missed calls" },
  { value: "other", label: "Other" },
];

interface FormData {
  facility_name: string;
  contact_name: string;
  email: string;
  phone: string;
  facility_type: string;
  bed_count: string;
  states_served: string[];
  current_after_hours: string;
  insurance_accepted: string;
  agree_to_contact: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function LeadCaptureForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    facility_name: "",
    contact_name: "",
    email: "",
    phone: "",
    facility_type: "",
    bed_count: "",
    states_served: [],
    current_after_hours: "",
    insurance_accepted: "",
    agree_to_contact: false,
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.facility_name.trim()) {
      newErrors.facility_name = "Facility name is required";
    }

    if (!formData.contact_name.trim()) {
      newErrors.contact_name = "Contact name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.facility_type) {
      newErrors.facility_type = "Please select a facility type";
    }

    if (!formData.agree_to_contact) {
      newErrors.agree_to_contact = "You must agree to be contacted";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleStateToggle = (state: string) => {
    setFormData((prev) => {
      const states = prev.states_served.includes(state)
        ? prev.states_served.filter((s) => s !== state)
        : [...prev.states_served, state];
      return { ...prev, states_served: states };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.contact_name,
          email: formData.email,
          facility: formData.facility_name,
          facilityType: formData.facility_type,
          phone: formData.phone || null,
          bed_count: formData.bed_count ? parseInt(formData.bed_count) : null,
          states_served: formData.states_served.length > 0 ? formData.states_served : null,
          current_after_hours: formData.current_after_hours || null,
          insurance_accepted: formData.insurance_accepted
            ? formData.insurance_accepted.split(",").map((s) => s.trim())
            : null,
          agree_to_contact: formData.agree_to_contact,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form");
      }

      const result = await response.json();
      console.log("Lead created:", result);

      setSuccess(true);
      
      // Redirect to thank you page after 2 seconds
      setTimeout(() => {
        router.push("/thank-you");
      }, 2000);
    } catch (err: any) {
      console.error("Form submission error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Thank You!
          </h2>
          <p className="text-gray-600 mb-4">
            Your information has been submitted successfully. Our team will
            contact you within 24 hours to discuss your facility's needs.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting you to the next step...
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Get Started with Beacon Admit
        </h2>
        <p className="text-gray-600 mt-2">
          Fill out the form below and we'll set up your AI-powered after-hours
          admissions assistant.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Facility Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Facility Information
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="facility_name">
                Facility Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="facility_name"
                value={formData.facility_name}
                onChange={(e) =>
                  handleInputChange("facility_name", e.target.value)
                }
                placeholder="Beacon Recovery Center"
                className={errors.facility_name ? "border-red-500" : ""}
              />
              {errors.facility_name && (
                <p className="text-sm text-red-500">{errors.facility_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="facility_type">
                Facility Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.facility_type}
                onValueChange={(value) =>
                  handleInputChange("facility_type", value)
                }
              >
                <SelectTrigger
                  className={errors.facility_type ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select facility type" />
                </SelectTrigger>
                <SelectContent>
                  {FACILITY_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.facility_type && (
                <p className="text-sm text-red-500">{errors.facility_type}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bed_count">Number of Beds</Label>
              <Input
                id="bed_count"
                type="number"
                value={formData.bed_count}
                onChange={(e) =>
                  handleInputChange("bed_count", e.target.value)
                }
                placeholder="24"
                min="1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="current_after_hours">
                Current After-Hours Process
              </Label>
              <Select
                value={formData.current_after_hours}
                onValueChange={(value) =>
                  handleInputChange("current_after_hours", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select current process" />
                </SelectTrigger>
                <SelectContent>
                  {AFTER_HOURS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>States Served</Label>
            <div className="grid grid-cols-5 gap-2 max-h-40 overflow-y-auto p-3 border rounded-md">
              {STATES.map((state) => (
                <div key={state} className="flex items-center space-x-2">
                  <Checkbox
                    id={`state-${state}`}
                    checked={formData.states_served.includes(state)}
                    onCheckedChange={() => handleStateToggle(state)}
                  />
                  <Label
                    htmlFor={`state-${state}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {state}
                  </Label>
                </div>
              ))}
            </div>
            {formData.states_served.length > 0 && (
              <p className="text-sm text-gray-600">
                Selected: {formData.states_served.join(", ")}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="insurance_accepted">
              Insurance Accepted (comma-separated)
            </Label>
            <Input
              id="insurance_accepted"
              value={formData.insurance_accepted}
              onChange={(e) =>
                handleInputChange("insurance_accepted", e.target.value)
              }
              placeholder="Blue Cross, Aetna, Cigna"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4 pt-6 border-t">
          <h3 className="text-lg font-semibold text-gray-900">
            Contact Information
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact_name">
                Your Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contact_name"
                value={formData.contact_name}
                onChange={(e) =>
                  handleInputChange("contact_name", e.target.value)
                }
                placeholder="Jane Doe"
                className={errors.contact_name ? "border-red-500" : ""}
              />
              {errors.contact_name && (
                <p className="text-sm text-red-500">{errors.contact_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="jane@beaconrecovery.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="(555) 123-4567"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Consent */}
        <div className="space-y-4 pt-6 border-t">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="agree_to_contact"
              checked={formData.agree_to_contact}
              onCheckedChange={(checked) =>
                handleInputChange("agree_to_contact", checked)
              }
              className={errors.agree_to_contact ? "border-red-500" : ""}
            />
            <Label
              htmlFor="agree_to_contact"
              className="text-sm font-normal leading-relaxed cursor-pointer"
            >
              I agree to be contacted by Beacon Admit regarding my facility's
              after-hours admissions needs. I understand I can unsubscribe at any
              time.
            </Label>
          </div>
          {errors.agree_to_contact && (
            <p className="text-sm text-red-500">{errors.agree_to_contact}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Get Started"
          )}
        </Button>

        <p className="text-center text-sm text-gray-500">
          We'll review your information and contact you within 24 hours.
        </p>
      </form>
    </Card>
  );
}
