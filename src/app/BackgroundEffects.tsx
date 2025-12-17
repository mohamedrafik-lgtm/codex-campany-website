"use client";

import { useEffect, useRef, useState } from "react";
import Threads from "@/components/Threads";

/**
 * BackgroundEffects: Isolated client component for all animated background effects.
 * Prevents SSR hydration mismatches and ensures effects only run on the client.
 * Includes WebGL fallback with CSS gradients if rendering fails.
 */
export function BackgroundEffects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLFailed, setWebGLFailed] = useState(false);

  useEffect(() => {
    // Ensure container exists and is mounted
    if (!containerRef.current) return;

    const handleWebGLError = (event: ErrorEvent) => {
      if (
        event.message.includes("WebGL") ||
        event.message.includes("canvas") ||
        event.message.includes("ogl")
      ) {
        console.warn("[BackgroundEffects] WebGL initialization error:", event.message);
        setWebGLFailed(true);
      }
    };

    window.addEventListener("error", handleWebGLError);

    return () => {
      window.removeEventListener("error", handleWebGLError);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-5 pointer-events-none w-full h-full"
      aria-hidden="true"
    >
      <style>{`
        /* Meteor animation keyframes */
        @keyframes meteor-trail {
          from {
            transform: translate(var(--meteor-start-left, 0), var(--meteor-start-top, 0)) translateY(-100vh);
            opacity: 1;
          }
          to {
            transform: translate(var(--meteor-start-left, 0), calc(var(--meteor-start-top, 0) + 100vh)) translateY(0);
            opacity: 0;
          }
        }

        /* Fallback gradient background when WebGL fails */
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .global-ambient {
          position: fixed;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          width: 100%;
          height: 100%;
        }

        .global-ambient.webgl-fallback {
          background: linear-gradient(135deg, 
            rgba(11, 11, 16, 1) 0%, 
            rgba(59, 20, 95, 0.4) 25%, 
            rgba(11, 11, 16, 1) 50%, 
            rgba(20, 59, 95, 0.4) 75%, 
            rgba(11, 11, 16, 1) 100%);
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }

        .meteor {
          position: absolute;
          width: 2px;
          height: 20px;
          background: linear-gradient(to bottom, rgba(168, 85, 247, 0.8), transparent);
          left: var(--meteor-start-left, 50%);
          top: var(--meteor-start-top, 0%);
        }

        .meteor::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(168, 85, 247, 1), transparent);
        }
      `}</style>

      <div className={`global-ambient ${webGLFailed ? "webgl-fallback" : ""}`} aria-hidden>
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="meteor"
            style={
              {
                "--meteor-delay": `${i * 1.5}s`,
                "--meteor-duration": `${2.2 + Math.random() * 1.2}s`,
                "--meteor-start-left": `${Math.random() * 90 + 5}%`,
                "--meteor-start-top": `${Math.random() * 50}%`,
              } as React.CSSProperties
            }
          >
            <style>{`
              .meteor:nth-child(${i + 1})::before {
                animation: meteor-trail var(--meteor-duration, 2.5s) cubic-bezier(0.15, 0.82, 0.25, 1) infinite;
                animation-delay: var(--meteor-delay);
              }
            `}</style>
          </span>
        ))}

        {!webGLFailed && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 5,
              pointerEvents: "none",
              width: "100%",
              height: "100%",
            }}
          >
            <Threads
              amplitude={1}
              distance={0}
              enableMouseInteraction={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
