"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useConversation } from "@11labs/react";
import { Button } from "@dl/component/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@dl/component/ui/card";
import { Mic, MicOff, Volume2, VolumeX, Loader2 } from "lucide-react";

const VoiceChat = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const conversation = useConversation({
    onConnect: () => console.log("Connected to ElevenLabs"),
    onDisconnect: () => console.log("Disconnected from ElevenLabs"),
    onMessage: (message) => console.log("Received message:", message),
    onError: (error: string | Error) => {
      const msg = typeof error === "string" ? error : error.message;
      setErrorMessage(msg);
      console.error("ElevenLabs Error:", msg);
    },
  });

  const { status, isSpeaking } = conversation;

  // 1. Improved Permission Check
  useEffect(() => {
    const requestMicPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
        // Important: Stop the tracks so the mic isn't "busy" when the SDK starts
        stream.getTracks().forEach(track => track.stop());
      } catch (error) {
        setErrorMessage("Microphone access denied");
        console.error("Error accessing microphone:", error);
      }
    };
    requestMicPermission();
  }, []);

  // 2. Robust Start Handler
  const handleStartConversation = useCallback(async () => {
    const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;

    if (!agentId) {
      setErrorMessage("Missing NEXT_PUBLIC_ELEVENLABS_AGENT_ID in env");
      return;
    }

    try {
      setErrorMessage("");
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // The fix: Add connectionType here
      await conversation.startSession({
        agentId: agentId,
        connectionType: "websocket", 
      });
    } catch (error) {
      setErrorMessage("Failed to start conversation");
      console.error("Start Error:", error);
    }
  }, [conversation]);

  const handleEndConversation = useCallback(async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error("End Error:", error);
    }
  }, [conversation]);

  const toggleMute = async () => {
    try {
      // Note: setVolume usually takes { volume: number } (0 to 1)
      await conversation.setVolume({ volume: isMuted ? 1 : 0 });
      setIsMuted(!isMuted);
    } catch (error) {
      console.error("Volume Error:", error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          C.A.T
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMute}
            disabled={status !== "connected"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center">
            {status === "connected" ? (
              <Button
                variant="destructive"
                onClick={handleEndConversation}
                className="w-full"
              >
                <MicOff className="mr-2 h-4 w-4" />
                End C.A.T
              </Button>
            ) : (
              <Button
                onClick={handleStartConversation}
                disabled={!hasPermission || status === "connecting"}
                className="w-full"
              >
                {status === "connecting" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Mic className="mr-2 h-4 w-4" />
                )}
                {status === "connecting" ? "Connecting..." : "Start C.A.T"}
              </Button>
            )}
          </div>

          <div className="text-center text-sm min-h-[20px]">
            {status === "connected" && (
              <p className={isSpeaking ? "text-blue-600 font-medium" : "text-green-600"}>
                {isSpeaking ? "CAT is speaking..." : "Listening..."}
              </p>
            )}
            {errorMessage && <p className="text-red-500 font-semibold">{errorMessage}</p>}
            {!hasPermission && !errorMessage && (
              <p className="text-yellow-600">Please allow microphone access</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceChat;