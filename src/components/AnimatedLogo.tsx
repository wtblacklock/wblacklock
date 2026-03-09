import { useState, useEffect } from "react";
import { motion } from "motion/react";

const WORDS = ["William", "Thames", "Blacklock"];

const WTB_SIZE = "2.835rem";
const WTB_SPACING = "0.02em";

type Phase = "enter" | "collapse" | "done";

export function AnimatedLogo() {
  const alreadyShown = sessionStorage.getItem("wb-intro-shown");

  const [phase, setPhase] = useState<Phase>(alreadyShown ? "done" : "enter");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (alreadyShown) return;
    const t0 = setTimeout(() => setVisible(true), 400);
    const t1 = setTimeout(() => setPhase("collapse"), 5000);
    const t2 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("wb-intro-shown", "1");
    }, 8500);
    return () => [t0, t1, t2].forEach(clearTimeout);
  }, []);

  const isCollapsed = phase === "collapse" || phase === "done";

  if (phase === "done") {
    return (
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 100,
          fontSize: WTB_SIZE,
          letterSpacing: WTB_SPACING,
          lineHeight: 1,
        }}
      >
        WTB
      </span>
    );
  }

  return (
    <motion.div
      className="flex items-baseline overflow-visible"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 2.0 }}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <motion.div
        className="flex items-baseline"
        animate={{ gap: isCollapsed ? "0em" : "0.4em" }}
        transition={{ duration: 2.25, ease: [0.4, 0, 0.2, 1] }}
      >
        {WORDS.map((word) => (
          <div key={word} className="flex items-baseline">
            {/* Initial letter — animates from extralight 200 to black 900 italic */}
            <motion.span
              animate={{
                fontSize: isCollapsed ? WTB_SIZE : "1rem",
                letterSpacing: isCollapsed ? WTB_SPACING : "0em",
                fontWeight: isCollapsed ? 100 : 200,
              }}
              transition={{ duration: 2.25, ease: [0.4, 0, 0.2, 1] }}
              style={{ lineHeight: 1 }}
            >
              {word[0]}
            </motion.span>

            {/* Remaining letters — extralight 200, collapse out */}
            <motion.span
              className="overflow-hidden"
              animate={
                isCollapsed
                  ? { maxWidth: "0px", opacity: 0 }
                  : { maxWidth: "300px", opacity: 1 }
              }
              transition={{ duration: 2.0, ease: [0.4, 0, 0.2, 1] }}
              style={{
                display: "inline-block",
                fontWeight: 200,
                fontSize: "1rem",
                whiteSpace: "nowrap",
                lineHeight: 1,
              }}
            >
              {word.slice(1)}
            </motion.span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
