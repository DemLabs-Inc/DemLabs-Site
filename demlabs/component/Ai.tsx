import VoiceChat from "./VoiceComponent";

export default function A() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute -z-10 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-red-500/30 to-blue-500/30 blur-[50pxpx] animate-pulse" />

      <small className="text-sm text-gray-500">Powered by DemLabs</small>
      <h1 className="text-4xl font-bold mb-6">Consulting AI Tool</h1>
      <VoiceChat />
      <small className="text-xs text-gray-500 my-6">
        The consultant requires microphone access to work.
      </small>
    </main>
  );
}