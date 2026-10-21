import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles } from "lucide-react";

interface EnvelopeProps {
  onOpened: () => void;
  onOpening?: () => void;
  titleName: string;
  eventLabel: string;
  eventUrdu: string;
  sealLetter?: string;
}

const FLAP_OPEN = 1.1;
const CARD_DELAY = 0.38;
const CARD_RISE = 1.2;
const SETTLE = 1;

export function Envelope({
  onOpened,
  onOpening,
  titleName,
  eventLabel,
  eventUrdu,
  sealLetter = "و",
}: EnvelopeProps) {
  const [stage, setStage] = useState<"closed" | "opening" | "card">("closed");
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
    triggerHaptic([12, 40, 18]);
    onOpening?.();
    setStage("opening");

    window.setTimeout(
      () => triggerHaptic(8),
      (CARD_DELAY + CARD_RISE) * 1000,
    );
    window.setTimeout(() => setStage("card"), (CARD_DELAY + CARD_RISE) * 1000);
    window.setTimeout(
      onOpened,
      (CARD_DELAY + CARD_RISE + SETTLE) * 1000,
    );
  };

  return (
    <div
      className="flex flex-col items-center w-full max-w-[min(100%,460px)] mx-auto"
      style={{ perspective: 1100 }}
    >
      <motion.button
        type="button"
        onClick={handleOpen}
        disabled={isOpen}
        aria-label="Open invitation envelope"
        className="relative w-full outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 rounded-2xl touch-manipulation select-none disabled:pointer-events-none"
        style={{ WebkitTapHighlightColor: "transparent" }}
        whileHover={stage === "closed" ? { scale: 1.015 } : undefined}
        whileTap={stage === "closed" ? { scale: 0.99 } : undefined}
      >
        <div className="relative w-full aspect-[1.45] max-h-[300px] sm:max-h-[320px]">
          <div
            className="absolute -inset-10 rounded-full blur-3xl opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, oklch(0.78 0.08 95 / 0.55), oklch(0.7 0.06 170 / 0.25), transparent 70%)",
            }}
          />

          <motion.div
            className="absolute inset-0 rounded-lg shadow-luxe overflow-hidden"
            style={{
              background:
                "linear-gradient(165deg, oklch(0.985 0.01 145) 0%, oklch(0.92 0.035 155) 100%)",
            }}
            animate={
              stage === "closed"
                ? { y: [0, -6, 0] }
                : { y: 0, boxShadow: "0 24px 55px -18px oklch(0.45 0.05 170 / 0.35)" }
            }
            transition={
              stage === "closed"
                ? { duration: 3.8, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.5 }
            }
          >
            <div
              className="absolute left-0 top-[42%] bottom-0 w-[18%] pointer-events-none opacity-45"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.82 0.04 155), transparent)",
                clipPath: "polygon(0 0, 100% 35%, 100% 100%, 0 100%)",
              }}
            />
            <div
              className="absolute right-0 top-[42%] bottom-0 w-[18%] pointer-events-none opacity-45"
              style={{
                background:
                  "linear-gradient(-90deg, oklch(0.82 0.04 155), transparent)",
                clipPath: "polygon(100% 0, 0 35%, 0 100%, 100% 100%)",
              }}
            />

            <div
              className="absolute inset-x-0 bottom-0 h-[55%] z-[2] pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, oklch(0.86 0.045 150) 100%)",
                clipPath: "polygon(0 100%, 50% 22%, 100% 100%)",
              }}
            />

            {!isOpen && (
              <div className="absolute inset-x-0 bottom-4 top-[50%] z-[3] flex items-center justify-center px-5 pointer-events-none">
                <div className="text-center">
                  <p className="text-[9px] sm:text-[10px] tracking-[0.35em] text-gold/90 font-medium mb-1">
                    YOU ARE INVITED
                  </p>
                  <p className="font-display italic text-xl sm:text-2xl leading-tight envelope-name tracking-tight">
                    {titleName}
                  </p>
                  <p className="mt-1 font-arabic text-gold text-base">{eventUrdu}</p>
                </div>
              </div>
            )}

            <motion.div
              className="absolute inset-x-4 top-0 h-[46%] z-[4] pointer-events-none"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background:
                  "linear-gradient(180deg, oklch(0.4 0.04 170 / 0.28), transparent 90%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            />

            <div
              className="absolute inset-x-0 top-0 h-[46%]"
              style={{
                perspective: 700,
                zIndex: isOpen ? 1 : 15,
              }}
            >
              <motion.div
                className="relative w-full h-full"
                style={{
                  transformOrigin: "top center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                initial={false}
                animate={{
                  rotateX: isOpen ? [-12, -175] : 0,
                }}
                transition={{
                  duration: FLAP_OPEN,
                  times: [0, 1],
                  ease: [0.34, 1.05, 0.4, 1],
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, oklch(0.95 0.02 145) 0%, oklch(0.88 0.04 155) 100%)",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    backfaceVisibility: "hidden",
                    boxShadow: isOpen
                      ? "none"
                      : "0 8px 20px oklch(0.45 0.04 170 / 0.16)",
                  }}
                />

                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 bottom-[6%] z-10"
                  animate={
                    isOpen
                      ? { scale: 0, opacity: 0, rotate: 12 }
                      : { scale: 1, opacity: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.35, ease: "easeIn" }}
                >
                  <motion.div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "radial-gradient(circle at 32% 28%, oklch(0.72 0.1 90), oklch(0.45 0.09 175))",
                      boxShadow:
                        "0 4px 16px oklch(0.4 0.08 170 / 0.4), inset 0 -2px 5px oklch(0.3 0.06 175 / 0.35)",
                    }}
                    animate={
                      stage === "closed"
                        ? { scale: [1, 1.07, 1] }
                        : { scale: 1 }
                    }
                    transition={{
                      duration: 2.2,
                      repeat: stage === "closed" ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="font-arabic text-cream text-lg sm:text-xl">
                      {sealLetter}
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="card"
                className="absolute left-1/2 -translate-x-1/2 w-[86%] z-20"
                style={{ bottom: "58%", originY: 1 }}
                initial={{ y: 72, opacity: 0, scale: 0.96 }}
                animate={{
                  y: stage === "card" ? -8 : 36,
                  opacity: 1,
                  scale: 1,
                }}
                exit={{ y: 40, opacity: 0 }}
                transition={{
                  y: {
                    duration: CARD_RISE,
                    ease: [0.22, 1, 0.36, 1],
                    delay: CARD_DELAY,
                  },
                  opacity: { duration: 0.3, delay: CARD_DELAY * 0.6 },
                  scale: { duration: CARD_RISE, delay: CARD_DELAY },
                }}
              >
                <div className="rounded-md border border-gold/30 bg-[oklch(0.995_0.005_145)] px-5 py-8 sm:py-9 text-center shadow-luxe">
                  <div className="gold-divider w-16 mx-auto mb-4" />
                  <p className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground">
                    {eventLabel}
                  </p>
                  <p className="font-display italic text-xl sm:text-2xl envelope-name mt-3 tracking-tight">
                    {titleName}
                  </p>
                  <div className="gold-divider w-16 mx-auto mt-4" />
                  <p className="mt-4 text-xs text-muted-foreground">
                    Opening your invitation…
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      <AnimatePresence>
        {stage === "closed" && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
            onClick={handleOpen}
            className="envelope-cta mt-8 group"
          >
            <Sparkles className="size-3.5 opacity-80 group-hover:opacity-100 transition-opacity" />
            <span>Tap to open</span>
            <Sparkles className="size-3.5 opacity-80 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
