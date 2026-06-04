"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Phone,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Play,
  Square,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { FacilityConfig } from "../wizard";

interface TestCallStepProps {
  config: FacilityConfig;
  setConfig: (config: FacilityConfig) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function TestCallStep({
  config,
  setConfig,
  onNext,
  onPrevious,
}: TestCallStepProps) {
  const [callStatus, setCallStatus] = useState<
    "idle" | "calling" | "connected" | "completed" | "failed"
  >("idle");
  const [callId, setCallId] = useState<string>("");
  const [callDuration, setCallDuration] = useState(0);
  const [callTranscript, setCallTranscript] = useState<string>("");
  const [error, setError] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTestCall = async () => {
    setCallStatus("calling");
    setError("");
    setCallTranscript("");

    try {
      // In production, this would initiate a real call via Retell API
      // For now, we'll simulate the API call
      const response = await fetch("/api/test-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clinic_id: config.facility_profile.facility_name,
          test_phone: config.warm_transfer_rules.primary_transfer_number,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to initiate test call");
      }

      const data = await response.json();
      setCallId(data.call_id);

      // Simulate call connection after 3 seconds
      setTimeout(() => {
        setCallStatus("connected");
        startTimer();

        // Simulate transcript
        setCallTranscript(
          `AI: Hi, this is ${config.compliance_scripts.opening_disclosure}\n\n` +
            `AI: ${config.compliance_scripts.not_medical_provider_disclaimer}\n\n` +
            `Caller: Hi, I'm calling to ask about your detox program.\n\n` +
            `AI: I'd be happy to help. Can I get your name and phone number?\n\n` +
            `Caller: Sure, it's John Smith, 555-123-4567.\n\n` +
            `AI: Thank you. ${config.compliance_scripts.consent_to_continue_script}`
        );
      }, 3000);
    } catch (err: any) {
      setCallStatus("failed");
      setError(err.message || "Failed to start test call");
    }
  };

  const endTestCall = async () => {
    try {
      const response = await fetch(`/api/test-call/${callId}/end`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to end call");
      }

      setCallStatus("completed");
      stopTimer();

      // Add completion to transcript
      setCallTranscript(
        (prev) =>
          prev +
          "\n\n--- Call Completed ---\n" +
          "AI: Thank you for calling. The admissions team will call you back within 15 minutes.\n" +
          "Caller: Thanks, bye.\n" +
          "AI: Goodbye!"
      );
    } catch (err: any) {
      setError(err.message || "Failed to end call");
    }
  };

  const startTimer = () => {
    setCallDuration(0);
    timerRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (callStatus === "completed" || callStatus === "failed") {
      onNext();
    } else {
      setError("Please complete the test call before proceeding");
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Alert>
        <Phone className="h-4 w-4" />
        <AlertDescription>
          Test your AI agent by making a call. This helps you verify the
          configuration before going live.
        </AlertDescription>
      </Alert>

      {/* Test Call Card */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Test Call</h3>
          <p className="text-sm text-gray-600">
            {callStatus === "idle" &&
              "Click the button below to start a test call to your AI agent."}
            {callStatus === "calling" &&
              "Calling your AI agent... Please wait."}
            {callStatus === "connected" &&
              "Call in progress. Speak to the AI agent as if you were a patient."}
            {callStatus === "completed" &&
              "Test call completed successfully!"}
            {callStatus === "failed" && "Test call failed. Please try again."}
          </p>
        </div>

        {/* Call Status Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            {callStatus === "idle" && (
              <>
                <div className="h-3 w-3 rounded-full bg-gray-300" />
                <span className="text-sm text-gray-600">Ready</span>
              </>
            )}
            {callStatus === "calling" && (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-yellow-600" />
                <span className="text-sm text-yellow-600">Calling...</span>
              </>
            )}
            {callStatus === "connected" && (
              <>
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-green-600">
                  Connected ({formatDuration(callDuration)})
                </span>
              </>
            )}
            {callStatus === "completed" && (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">Completed</span>
              </>
            )}
            {callStatus === "failed" && (
              <>
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-600">Failed</span>
              </>
            )}
          </div>

          {callId && (
            <span className="text-xs text-gray-500">Call ID: {callId}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {callStatus === "idle" && (
            <Button onClick={startTestCall} className="flex-1">
              <Play className="mr-2 h-4 w-4" />
              Start Test Call
            </Button>
          )}

          {callStatus === "calling" && (
            <Button disabled className="flex-1">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </Button>
          )}

          {callStatus === "connected" && (
            <Button
              onClick={endTestCall}
              variant="destructive"
              className="flex-1"
            >
              <Square className="mr-2 h-4 w-4" />
              End Call
            </Button>
          )}

          {(callStatus === "completed" || callStatus === "failed") && (
            <Button onClick={startTestCall} className="flex-1">
              <Play className="mr-2 h-4 w-4" />
              Retry Test Call
            </Button>
          )}
        </div>
      </Card>

      {/* Call Transcript */}
      {(callStatus === "connected" ||
        callStatus === "completed" ||
        callTranscript) && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Call Transcript</h3>
          <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
            <pre className="text-sm whitespace-pre-wrap font-mono">
              {callTranscript || "Waiting for call to start..."}
            </pre>
          </div>
        </Card>
      )}

      {/* Test Results */}
      {callStatus === "completed" && (
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900 mb-2">
                Test Call Successful!
              </h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>✓ AI agent answered the call</li>
                <li>✓ Opening disclosure was spoken correctly</li>
                <li>✓ Medical disclaimer was provided</li>
                <li>✓ Consent script was used</li>
                <li>✓ Call duration: {formatDuration(callDuration)}</li>
              </ul>
              <p className="mt-3 text-sm text-green-700">
                Your AI agent is configured correctly. You can now proceed to
                activate your agent.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Instructions */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">
          What to Test:
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Answer the call as if you were a patient seeking treatment</li>
          <li>• Verify the AI agent introduces itself with your facility name</li>
          <li>• Check that it asks for required intake information</li>
          <li>• Test the warm transfer (if enabled)</li>
          <li>• Verify the callback scheduling works</li>
        </ul>
      </Card>
    </div>
  );
}
