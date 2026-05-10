"use client";

import { useEffect, useState } from "react";

const FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export function LiveClock({ className = "clock" }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(`${FORMATTER.format(new Date())} BRT`);
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Pre-hydration: render a stable, non-ticking placeholder of the same width
  // to avoid layout shift. Clients see the live value swap in immediately.
  return (
    <span className={className} suppressHydrationWarning>
      {time ?? "--:--:-- BRT"}
    </span>
  );
}
