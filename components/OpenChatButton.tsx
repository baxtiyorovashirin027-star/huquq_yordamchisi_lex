"use client";
// Istalgan joydan AI chatni ochadi. "prompt" berilsa, chat shu matn bilan boshlanadi.
export default function OpenChatButton({ prompt, className, children }: { prompt?: string; className?: string; children: React.ReactNode }) {
  return (
    <button type="button" className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("open-chat", { detail: { prompt } }))}>
      {children}
    </button>
  );
}
