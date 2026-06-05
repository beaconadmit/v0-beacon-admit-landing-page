"use client"

import { useState, useEffect, useCallback } from "react"
import { RetellWebClient } from "retell-client-js-sdk"
import { X, Phone, PhoneOff, Mic, MicOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AgentProfile = "afterhours" | "full-admissions" | "custom-agent"

const PROFILE_LABELS: Record<AgentProfile, string> = {
  afterhours: "After Hours Intake Specialist",
  "full-admissions": "Full Admissions Coordinator",
  "custom-agent": "Custom Agent Builder",
}

interface RetellCallModalProps {
  isOpen: boolean
  onClose: () => void
  /** Optional agent profile key — routes to the per-profile Retell agent */
  agentProfile?: AgentProfile
}

type CallStatus = "idle" | "connecting" | "connected" | "ended" | "error"

/**
 * Full-screen modal for Retell voice calls.
 * Accepts an optional `agentProfile` to dynamically select the correct
 * Retell agent via the `/api/retell/create-web-call` endpoint.
 */
export function RetellCallModal({ isOpen, onClose, agentProfile }: RetellCallModalProps) {
  const [callStatus, setCallStatus] = useState<CallStatus>("idle")
  const [isMuted, setIsMuted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [retellClient, setRetellClient] = useState<RetellWebClient | null>(null)
  const [isAgentTalking, setIsAgentTalking] = useState(false)

  const agentLabel = agentProfile ? PROFILE_LABELS[agentProfile] : "AI Admissions Agent"

  useEffect(() => {
    const client = new RetellWebClient()
    setRetellClient(client)

    return () => {
      client.stopCall()
    }
  }, [])

  useEffect(() => {
    if (!retellClient) return

    const handleCallStarted = () => setCallStatus("connected")
    const handleCallEnded = () => setCallStatus("ended")
    const handleError = (error: Error) => {
      setErrorMessage(error.message || "An error occurred during the call")
      setCallStatus("error")
    }
    const handleAgentStartTalking = () => setIsAgentTalking(true)
    const handleAgentStopTalking = () => setIsAgentTalking(false)

    retellClient.on("call_started", handleCallStarted)
    retellClient.on("call_ended", handleCallEnded)
    retellClient.on("error", handleError)
    retellClient.on("agent_start_talking", handleAgentStartTalking)
    retellClient.on("agent_stop_talking", handleAgentStopTalking)

    return () => {
      retellClient.off("call_started", handleCallStarted)
      retellClient.off("call_ended", handleCallEnded)
      retellClient.off("error", handleError)
      retellClient.off("agent_start_talking", handleAgentStartTalking)
      retellClient.off("agent_stop_talking", handleAgentStopTalking)
    }
  }, [retellClient])

  const startCall = useCallback(async () => {
    if (!retellClient) return

    setCallStatus("connecting")
    setErrorMessage(null)

    try {
      const response = await fetch("/api/retell/create-web-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent_profile: agentProfile,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create web call")
      }

      const data = await response.json()

      await retellClient.startCall({
        accessToken: data.access_token,
        sampleRate: 24000,
      })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to start call")
      setCallStatus("error")
    }
  }, [retellClient, agentProfile])

  const endCall = useCallback(() => {
    if (retellClient) {
      retellClient.stopCall()
    }
    setCallStatus("ended")
  }, [retellClient])

  const toggleMute = useCallback(() => {
    if (retellClient && callStatus === "connected") {
      if (isMuted) {
        retellClient.unmute()
      } else {
        retellClient.mute()
      }
      setIsMuted(!isMuted)
    }
  }, [retellClient, callStatus, isMuted])

  const handleClose = useCallback(() => {
    if (callStatus === "connected") {
      endCall()
    }
    setCallStatus("idle")
    setErrorMessage(null)
    setIsMuted(false)
    onClose()
  }, [callStatus, endCall, onClose])

  const handleStartNewCall = useCallback(() => {
    setCallStatus("idle")
    setErrorMessage(null)
    setIsMuted(false)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h2 id="modal-title" className="text-lg font-extrabold text-foreground">
              Talk to {agentLabel}
            </h2>
            {agentProfile && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {agentProfile.replace("_", " ")} demo agent
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {callStatus === "idle" && (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Phone className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-xl font-extrabold text-foreground mb-2">
                Experience Our {agentLabel}
              </h3>
              <p className="text-muted-foreground mb-6">
                Click below to start a conversation with our demo {agentProfile ? PROFILE_LABELS[agentProfile].toLowerCase() : "AI admissions coordinator"}. See how it handles intake questions and gathers information.
              </p>
              <Button
                size="lg"
                onClick={startCall}
                className="w-full gap-2 h-12 bg-accent hover:bg-[oklch(0.45_0.10_185)] text-accent-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
              >
                <Phone className="w-4 h-4" />
                Start Call
              </Button>
            </div>
          )}

          {callStatus === "connecting" && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-10 h-10 text-accent animate-spin" />
              </div>
              <h3 className="text-xl font-extrabold text-foreground mb-2">
                Connecting...
              </h3>
              <p className="text-muted-foreground">
                Please allow microphone access when prompted
              </p>
            </div>
          )}

          {callStatus === "connected" && (
            <div className="text-center">
              <div
                className={cn(
                  "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-200",
                  isAgentTalking
                    ? "bg-accent/20 ring-4 ring-accent/30 scale-105"
                    : "bg-accent/10"
                )}
              >
                <Phone className="w-12 h-12 text-accent" />
              </div>
              <h3 className="text-xl font-extrabold text-foreground mb-2">
                Call in Progress
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                {isAgentTalking ? "Agent is speaking..." : "Listening..."}
              </p>

              <div className="flex items-center justify-center gap-4">
                <Button
                  variant={isMuted ? "destructive" : "outline"}
                  size="lg"
                  onClick={toggleMute}
                  className="gap-2 h-12"
                >
                  {isMuted ? (
                    <>
                      <MicOff className="w-4 h-4" />
                      Unmute
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4" />
                      Mute
                    </>
                  )}
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={endCall}
                  className="gap-2 h-12"
                >
                  <PhoneOff className="w-4 h-4" />
                  End Call
                </Button>
              </div>
            </div>
          )}

          {callStatus === "ended" && (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <PhoneOff className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-extrabold text-foreground mb-2">
                Call Ended
              </h3>
              <p className="text-muted-foreground mb-6">
                Thank you for trying our demo. Ready to see how Beacon Admit can work for your facility?
              </p>
              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  onClick={handleStartNewCall}
                  className="w-full gap-2 h-12 bg-accent hover:bg-[oklch(0.45_0.10_185)] text-accent-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
                >
                  <Phone className="w-4 h-4" />
                  Start Another Call
                </Button>
                <Button variant="outline" size="lg" onClick={handleClose} className="w-full h-12" asChild>
                  <a href="#demo">Book a Full Demo</a>
                </Button>
              </div>
            </div>
          )}

          {callStatus === "error" && (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                <X className="w-10 h-10 text-destructive" />
              </div>
              <h3 className="text-xl font-extrabold text-foreground mb-2">
                Connection Error
              </h3>
              <p className="text-muted-foreground mb-6">
                {errorMessage || "Unable to connect to the AI agent. Please try again."}
              </p>
              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  onClick={handleStartNewCall}
                  className="w-full gap-2 h-12 bg-accent hover:bg-[oklch(0.45_0.10_185)] text-accent-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
                >
                  <Phone className="w-4 h-4" />
                  Try Again
                </Button>
                <Button variant="outline" size="lg" onClick={handleClose} className="w-full h-12">
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer note */}
        <div className="px-6 pb-4">
          <p className="text-xs text-muted-foreground text-center">
            This is a demo AI agent. For actual admissions support, please contact the facility directly.
          </p>
        </div>
      </div>
    </div>
  )
}
