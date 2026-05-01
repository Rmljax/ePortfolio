"use client";
import React, { useEffect, useRef, useState } from "react";

export default function HeroTyping() {
  const ROLES = ["Frontend Developer", "UI Engineer", "React Specialist"];
  const TYPING_SPEED = 80;
  const DELETING_SPEED = 40;
  const PAUSE_DURATION = 1800;

  const [displayed, setDisplayed] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const current = ROLES[roleIndex];

    if (!isDeleting && displayed === current) {
      timeout.current = setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
      return;
    }

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
      return;
    }

    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    timeout.current = setTimeout(() => {
      setDisplayed(
        isDeleting
          ? current.slice(0, displayed.length - 1)
          : current.slice(0, displayed.length + 1),
      );
    }, speed);

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [displayed, isDeleting, roleIndex]);
  return (
    <div
      style={{
        ...styles.roleRow,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
      }}
      className="mt-4 text-[#64748b] [text-shadow:0_0_20px_#64748b,0_0_40px_#64748b,0_0_10px_#38bdf8]"
    >
      <span style={styles.roleLabel}>$&nbsp;</span>
      <span style={styles.roleText}>{displayed}</span>
      <span style={styles.cursor} aria-hidden="true" />
    </div>
  );
}
const styles: Record<string, React.CSSProperties> = {
  roleRow: {
    display: "flex",
    alignItems: "center",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
    color: "#8899aa",
    marginBottom: "1.75rem",
    minHeight: "1.6em",
  },
  roleLabel: {
    color: "#00d2ff",
    userSelect: "none" as const,
  },
  roleText: {
    color: "#c8d8e8",
  },
  cursor: {
    display: "inline-block",
    width: "2px",
    height: "1.1em",
    backgroundColor: "#00d2ff",
    marginLeft: "3px",
    verticalAlign: "middle",
    animation: "blink 1s step-end infinite",
  },
};
