import { motion } from "framer-motion";

export function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(6px)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 45%, oklch(0.28 0.05 255), var(--background))",
      }}
    >
      <div className="relative text-center px-6">
        {/* Soft door silhouette pulse */}
        <div className="relative mx-auto w-20 h-28 mb-8" aria-hidden>
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 origin-left rounded-l-md border border-gold/40"
            style={{
              background:
                "linear-gradient(115deg, oklch(0.96 0.01 250), oklch(0.88 0.02 255))",
              borderRight: "1px solid oklch(0.5 0.08 162 / 0.5)",
            }}
            animate={{ rotateY: [-4, 8, -4] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 origin-right rounded-r-md border border-gold/40"
            style={{
              background:
                "linear-gradient(245deg, oklch(0.96 0.01 250), oklch(0.88 0.02 255))",
              borderLeft: "1px solid oklch(0.5 0.08 162 / 0.5)",
            }}
            animate={{ rotateY: [4, -8, 4] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, oklch(0.68 0.1 162), oklch(0.4 0.09 162))",
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <p className="font-arabic text-gold text-xl">بسم الله</p>
        <p className="mt-2 font-display italic text-2xl text-foreground/85">Valima</p>
        <p className="mt-3 text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
          Opening the doors
        </p>
      </div>
    </motion.div>
  );
}
