import { useState, useEffect } from "react";
import { motion } from "motion/react";

type Phase = "enter" | "collapse" | "combine" | "fly";

const WORDS = ["William", "Thames", "Blacklock"];

export function IntroAnimation({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("enter");
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => setTextVisible(true), 400);
    const t1 = setTimeout(() => setPhase("collapse"), 5500);
    const t2 = setTimeout(() => setPhase("combine"), 8500);
    const t3 = setTimeout(() => setPhase("fly"), 11000);
    const t4 = setTimeout(onDone, 15500);
    return () => [t0, t1, t2, t3, t4].forEach(clearTimeout);
  }, [onDone]);

  const isCollapsed = phase === "combine" || phase === "fly";
  const isCombined = phase === "combine" || phase === "fly";
  const isFlying = phase === "fly";

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-white flex items-center justify-center overflow-hidden"
      animate={isFlying ? { opacity: 0 } : { opacity: 1 }}
      transition={isFlying ? { duration: 3.25, delay: 1.75, ease: "easeInOut" } : { duration: 0 }}
    >
      <motion.div
        className="flex items-baseline select-none"
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 100 }}
        animate={{
          columnGap: isCombined ? "0px" : "0.45em",
          x: isFlying ? "calc(-50vw + 52px)" : "0px",
          y: isFlying ? "calc(-50vh + 42px)" : "0px",
          scale: isFlying ? 0.29 : 1,
        }}
        transition={{
          columnGap: { duration: 2.25, ease: [0.4, 0, 0.2, 1] },
          x: { duration: 3.0, ease: [0.4, 0, 0.2, 1] },
          y: { duration: 3.0, ease: [0.4, 0, 0.2, 1] },
          scale: { duration: 3.0, ease: [0.4, 0, 0.2, 1] },
        }}
      >
        {WORDS.map((word) => (
          <motion.div
            key={word}
            className="flex items-baseline overflow-hidden"
            animate={{ opacity: textVisible ? 1 : 0 }}
            transition={{ duration: 2.75, ease: "easeOut" }}
          >
            {/* Initial letter — always stays */}
            <span
              style={{
                fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {word[0]}
            </span>

            {/* Remaining letters — collapse */}
            <motion.span
              className="overflow-hidden"
              style={{
                display: "inline-block",
                fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
              }}
              animate={
                isCollapsed
                  ? { maxWidth: "0px", opacity: 0 }
                  : { maxWidth: "600px", opacity: 1 }
              }
              transition={{ duration: 2.25, ease: [0.4, 0, 0.2, 1] }}
            >
              {word.slice(1)}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
