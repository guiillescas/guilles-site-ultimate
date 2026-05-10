"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Props = {
  token: string;
  hex: string;
  use: string;
  swatchStyle?: React.CSSProperties;
  hexNote?: string;
};

export function Swatch({ token, hex, use, swatchStyle, hexNote }: Props) {
  const [label, setLabel] = useState("Click to copy");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setLabel(`Copied: ${hex}`);
      setTimeout(() => setLabel("Click to copy"), 1200);
    } catch {
      /* clipboard blocked — silent fail */
    }
  };

  return (
    <button type="button" className={styles.swatch} onClick={copy}>
      <div
        className={styles.swatchColor}
        style={{ background: hex, ...swatchStyle }}
        data-copy={label}
      />
      <div className={styles.swatchInfo}>
        <div className={styles.swatchToken}>{token}</div>
        <div className={styles.swatchHex}>
          {hex}
          {hexNote ? ` · ${hexNote}` : ""}
        </div>
        <div className={styles.swatchUse}>{use}</div>
      </div>
    </button>
  );
}
