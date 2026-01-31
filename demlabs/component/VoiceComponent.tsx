"use client";

import React, { useEffect, useState, useCallback } from "react";
// ElevenLabs
import { useConversation } from "@11labs/react";
// UI
import { Button } from "@dl/component/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@dl/component/ui/card";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";

const VoiceChat = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const conversation = useConversation({
    onConnect: () => console.log("Connected to ElevenLabs"),
    onDisconnect: () => console.log("Disconnected from ElevenLabs"),
    onMessage: (message: any) => console.log("Received message:", message),
    onError: (error: string | Error) => {
      const msg = typeof error === "string" ? error : error.message;
      setErrorMessage(msg);
      console.error("ElevenLabs Error:", error);
    },
  });

  const { status, isSpeaking } = conversation;

  // 1. Request microphone permission
  useEffect(() => {
    const requestMicPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
      } catch (error) {
        setErrorMessage("Microphone access denied. Please enable it in browser settings.");
        console.error("Error accessing microphone:", error);
      }
    };

    requestMicPermission();
  }, []);

  // 2. Fixed Start Conversation Logic
  const handleStartConversation = useCallback(async () => {
    try {
      setErrorMessage(""); // Clear previous errors
      
      // The fix: connectionType is required by the SDK
      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID!,
        connectionType: "websocket", 
      });
      
    } catch (error) {
      setErrorMessage("Failed to start conversation");
      console.error("Error starting conversation:", error);
    }
  }, [conversation]);

  const handleEndConversation = useCallback(async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      setErrorMessage("Failed to end conversation");
      console.error("Error ending conversation:", error);
    }
  }, [conversation]);

  const toggleMute = async () => {
    try {
      // Toggle volume: 0 is muted, 1 is full volume
      await conversation.setVolume({ volume: isMuted ? 1 : 0 });
      setIsMuted(!isMuted);
    } catch (error) {
      setErrorMessage("Failed to change volume");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          C.A.T
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMute}
              disabled={status !== "connected"}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center">
            {status === "connected" ? (
              <Button
                variant="destructive"
                onClick={handleEndConversation}
                className="w-full hover:bg-red-600"
              >
                <MicOff className="mr-2 h-4 w-4" />
                End CAT
              </Button>
            ) : (
              <Button
                onClick={handleStartConversation}
                disabled={!hasPermission || status === "connecting"}
                className="w-full hover:bg-green-600"
              >
                <Mic className="mr-2 h-4 w-4" />
                {status === "connecting" ? "Connecting..." : "Start CAT"}
              </Button>
            )}
          </div>

          <div className="text-center text-sm min-h-[20px]">
            {status === "connected" && (
              <p className="text-green-600 animate-pulse">
                {isSpeaking ? "CAT is speaking..." : "Listening..."}
              </p>
            )}
            {errorMessage && <p className="text-red-500 font-medium">{errorMessage}</p>}
            {!hasPermission && !errorMessage && (
              <p className="text-yellow-600">
                Please allow microphone access to use CAT
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceChat;