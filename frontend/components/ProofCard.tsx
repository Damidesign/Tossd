import React from "react";
import styles from "./ProofCard.module.css";

const MOCK = {
  wager: "2.00 XLM",
  side: "Heads",
  commitHash: "0x3a7f…c91b",
  revealSecret: "0x8d2e…44fa",
  outcome: "Win",
  multiplier: "1.9×",
};

export function ProofCard() {
  return (
    <div className={styles.card} aria-label="Proof card mock">
      <div className={styles.wagerRow}>
        <span className={styles.wagerAmount}>{MOCK.wager}</span>
        <span className={styles.sideBadge}>{MOCK.side}</span>
      </div>

      <div>
        <p className={styles.label}>Commit hash</p>
        <p className={styles.value}>{MOCK.commitHash}</p>
      </div>

      <div>
        <p className={styles.label}>Reveal secret</p>
        <p className={styles.value}>{MOCK.revealSecret}</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className={`${styles.outcomeChip} ${styles.win}`}>
          ✓ {MOCK.outcome}
        </span>
        <span className={styles.multiplier}>{MOCK.multiplier}</span>
      </div>
    </div>
  );
}
