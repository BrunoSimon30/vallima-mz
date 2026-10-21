import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles } from "lucide-react";

interface DoorGateProps {
  onOpened: () => void;
  onOpening?: () => void;
  titleName: string;
  eventUrdu: string;
}

const DOOR_DURATION = 1.35;
const REVEAL_DELAY = 0.85;
const SETTLE = 0.55;

export function DoorGate({
  onOpened,
  onOpening,
  titleName,
  eventUrdu,
}: DoorGateProps) {
  const [stage, setStage] = useState<"closed" | "opening" | "open">("closed");
  const isOpen = stage !== "closed";

  const triggerHaptic = (pattern: number | number[]) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        /* noop */
      }
    }
  };

  const handleOpen = () => {
    if (stage !== "closed") return;
    triggerHaptic([14, 35, 18]);
    onOpening?.();
    setStage("opening");

    window.setTimeout(() => triggerHaptic(10), DOOR_DURATION * 700);
    window.setTimeout(() => setStage("open"), (DOOR_DURATION + REVEAL_DELAY * 0.2) * 1000);
    window.setTimeout(
      onOpened,
      (DOOR_DURATION + SETTLE) * 1000,
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[min(100%,420px)] mx-auto">
      <motion.button
        type="button"
        onClick={handleOpen}
        disabled={isOpen}
        aria-label="Open invitation doors"
        className="relative w-full outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 rounded-2xl touch-manipulation select-none disabled:pointer-events-none"
        style={{ WebkitTapHighlightColor: "transparent", perspective: 1400 }}
        whileHover={stage === "closed" ? { scale: 1.01 } : undefined}
        whileTap={stage === "closed" ? { scale: 0.995 } : undefined}
      >
        <div className="relative w-full aspect-[3/4] max-h-[min(56vh,440px)] mb-16">
          {/* Soft glow behind doors */}
          <motion.div
            className="absolute inset-[8%] rounded-2xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(0.55 0.09 162 / 0.5), oklch(0.32 0.06 255 / 0.35), transparent 70%)",
              filter: "blur(18px)",
            }}
            animate={{
              opacity: isOpen ? 1 : [0.45, 0.75, 0.45],
              scale: isOpen ? 1.15 : [1, 1.04, 1],
            }}
            transition={
              isOpen
                ? { duration: 0.8 }
                : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
            }
          />

          {/* Door frame */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-luxe"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.4 0.06 255), oklch(0.26 0.05 258))",
              padding: 10,
            }}
          >
            <div
              className="relative h-full w-full rounded-xl overflow-hidden"
              style={{
                background: "oklch(0.2 0.04 255)",
                boxShadow: "inset 0 0 0 1px oklch(0.62 0.08 162 / 0.4)",
                perspective: 1200,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Soft hall behind doors */}
              <motion.div
                className="absolute inset-0 z-[1] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.7, delay: 0.12 }}
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.97 0.008 250) 0%, oklch(0.93 0.015 255) 45%, oklch(0.88 0.02 255) 100%)",
                }}
              />

              {/* Elegant invite card reveal */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="reveal"
                    className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-5 sm:px-7 pointer-events-none"
                    initial={{ opacity: 0, y: 18, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.75, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      className="relative w-full max-w-[240px] sm:max-w-[260px] rounded-2xl px-5 py-8 sm:py-9 text-center"
                      style={{
                        background:
                          "linear-gradient(165deg, oklch(0.99 0.006 250) 0%, oklch(0.95 0.012 252) 100%)",
                        border: "1px solid oklch(0.5 0.08 162 / 0.5)",
                        boxShadow:
                          "0 18px 40px -16px oklch(0.2 0.04 255 / 0.4), inset 0 0 0 1px oklch(0.7 0.04 162 / 0.35)",
                      }}
                    >
                      {/* Corner ornaments */}
                      <span
                        className="absolute top-3 left-3 size-3 border-t border-l border-gold/50"
                        aria-hidden
                      />
                      <span
                        className="absolute top-3 right-3 size-3 border-t border-r border-gold/50"
                        aria-hidden
                      />
                      <span
                        className="absolute bottom-3 left-3 size-3 border-b border-l border-gold/50"
                        aria-hidden
                      />
                      <span
                        className="absolute bottom-3 right-3 size-3 border-b border-r border-gold/50"
                        aria-hidden
                      />

                      <p className="font-arabic text-gold text-lg mb-2">بسم الله</p>
                      <div className="gold-divider w-12 mx-auto mb-3" />
                      <p className="text-[9px] tracking-[0.32em] uppercase text-[oklch(0.4_0.05_255)]">
                        Valima Reception
                      </p>
                      <p className="font-display italic text-2xl sm:text-[1.75rem] mt-3 leading-[1.15] pb-1 text-[oklch(0.26_0.045_255)]">
                        {titleName}
                      </p>
                      <div className="gold-divider w-12 mx-auto mt-3 mb-2" />
                      <p className="font-arabic text-gold text-xl">{eventUrdu}</p>
                      <p className="mt-3 text-[10px] tracking-[0.2em] uppercase text-[oklch(0.42_0.04_255)]">
                        Welcome
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* LEFT DOOR */}
              <motion.div
                className="absolute inset-y-0 left-0 w-1/2 z-10 origin-left"
                style={{ transformStyle: "preserve-3d" }}
                initial={false}
                animate={{ rotateY: isOpen ? -98 : 0 }}
                transition={{
                  duration: DOOR_DURATION,
                  ease: [0.4, 0.05, 0.2, 1],
                }}
              >
                <DoorPanel side="left" closed={!isOpen} />
              </motion.div>

              {/* RIGHT DOOR */}
              <motion.div
                className="absolute inset-y-0 right-0 w-1/2 z-10 origin-right"
                style={{ transformStyle: "preserve-3d" }}
                initial={false}
                animate={{ rotateY: isOpen ? 98 : 0 }}
                transition={{
                  duration: DOOR_DURATION,
                  ease: [0.4, 0.05, 0.2, 1],
                }}
              >
                <DoorPanel side="right" closed={!isOpen} />
              </motion.div>

              {/* Center latch / seal — kept clear of names */}
              <motion.div
                className="absolute left-1/2 top-[46%] z-20 -translate-x-1/2 -translate-y-1/2"
                animate={
                  isOpen
                    ? { scale: 0, opacity: 0 }
                    : { scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.35 }}
              >
                <motion.div
                  className="size-12 sm:size-14 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 28%, oklch(0.68 0.1 162), oklch(0.4 0.09 162))",
                    boxShadow:
                      "0 6px 20px oklch(0.22 0.06 162 / 0.5), inset 0 -2px 6px oklch(0.22 0.05 255 / 0.35)",
                  }}
                  animate={
                    stage === "closed"
                      ? { scale: [1, 1.06, 1] }
                      : { scale: 1 }
                  }
                  transition={{
                    duration: 2.4,
                    repeat: stage === "closed" ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  <span className="font-arabic text-cream text-lg sm:text-xl">و</span>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Names below doors — never covered by seal */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute inset-x-0 -bottom-1 translate-y-full pt-4 text-center pointer-events-none"
              >
                <p className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-gold/90 mb-1.5">
                  You are invited
                </p>
                <p className="font-display italic text-xl sm:text-2xl text-foreground leading-tight">
                  {titleName}
                </p>
                <p className="mt-1 font-arabic text-gold text-base">{eventUrdu}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      <AnimatePresence>
        {stage === "closed" && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35 }}
            onClick={handleOpen}
            className="envelope-cta mt-20 group"
          >
            <Sparkles className="size-3.5 opacity-80" />
            <span>Open the doors</span>
            <Sparkles className="size-3.5 opacity-80" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function DoorPanel({
  side,
  closed,
}: {
  side: "left" | "right";
  closed: boolean;
  titleName?: string;
}) {
  const isLeft = side === "left";

  return (
    <div
      className="absolute inset-0"
      style={{
        background: isLeft
          ? "linear-gradient(115deg, oklch(0.97 0.01 250) 0%, oklch(0.9 0.02 255) 100%)"
          : "linear-gradient(245deg, oklch(0.97 0.01 250) 0%, oklch(0.9 0.02 255) 100%)",
        boxShadow: closed
          ? `${isLeft ? "4px" : "-4px"} 0 18px oklch(0.12 0.04 255 / 0.28)`
          : "none",
        borderRight: isLeft ? "1px solid oklch(0.5 0.08 162 / 0.45)" : undefined,
        borderLeft: !isLeft ? "1px solid oklch(0.5 0.08 162 / 0.45)" : undefined,
      }}
    >
      <div
        className="absolute inset-3 rounded-md pointer-events-none"
        style={{
          border: "1px solid oklch(0.48 0.08 162 / 0.4)",
          boxShadow: "inset 0 0 0 6px oklch(0.55 0.04 255 / 0.12)",
        }}
      />
      <div
        className="absolute inset-x-5 top-[12%] h-[28%] rounded-t-full pointer-events-none opacity-50"
        style={{
          border: "1px solid oklch(0.48 0.08 162 / 0.4)",
          borderBottom: "none",
        }}
      />

      {/* Handle */}
      <div
        className={`absolute top-[46%] -translate-y-1/2 ${
          isLeft ? "right-2.5" : "left-2.5"
        }`}
      >
        <div
          className="w-2 h-8 rounded-full"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.62 0.09 162), oklch(0.4 0.08 162))",
            boxShadow: "0 2px 6px oklch(0.25 0.06 162 / 0.4)",
          }}
        />
      </div>
    </div>
  );
}
