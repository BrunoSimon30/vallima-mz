import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DoorGate } from "@/components/DoorGate";
import { Invitation, EVENT_TITLE, EVENT_URDU } from "@/components/Invitation";
import { Particles } from "@/components/Particles";
import { AmbienceToggle } from "@/components/AmbienceToggle";
import { Loader } from "@/components/Loader";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Valima Invitation · Muhammad Hassan & Kanwal Fatima" },
      {
        name: "description",
        content:
          "Mr. & Mrs. Naseem Akhter request the pleasure of your company at the Valima Reception of Muhammad Hassan with Kanwal Fatima. Saturday, 12 December 2026 at Velora Banquet.",
      },
      { property: "og:title", content: "Valima Invitation · Muhammad Hassan & Kanwal Fatima" },
      {
        property: "og:description",
        content:
          "Valima Reception of Muhammad Hassan with Kanwal Fatima. Saturday, 12 December 2026 at Velora Banquet.",
      },
    ],
  }),
});

function Index() {
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [doorsOpening, setDoorsOpening] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("wedding-theme");
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      <AmbienceToggle playWhenReady />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="doors"
            exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-16 sm:pt-24 pb-12"
          >
            <Particles count={28} />
            <div
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(ellipse 80% 55% at 50% 32%, oklch(0.3 0.06 255) 0%, oklch(0.22 0.045 255) 52%, var(--background) 78%)",
              }}
            />
            <div
              className="absolute inset-0 -z-10 opacity-40 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 12% 88%, oklch(0.4 0.07 162 / 0.28), transparent 42%), radial-gradient(circle at 92% 12%, oklch(0.35 0.06 255 / 0.45), transparent 40%)",
              }}
            />

            <div className="text-center w-full max-w-lg mx-auto">
              <motion.div
                animate={{
                  opacity: doorsOpening ? 0 : 1,
                  height: doorsOpening ? 0 : "auto",
                  marginBottom: doorsOpening ? 0 : undefined,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="font-arabic text-gold text-xl mb-2">بسم الله</p>
                <p className="font-display italic text-2xl sm:text-3xl text-foreground/85 mb-2 tracking-tight">
                  Valima
                </p>
                <p className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground mb-8 sm:mb-10">
                  Step through the doors
                </p>
              </motion.div>

              <DoorGate
                titleName={EVENT_TITLE}
                eventUrdu={EVENT_URDU}
                onOpening={() => setDoorsOpening(true)}
                onOpened={() => setOpened(true)}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Invitation />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
