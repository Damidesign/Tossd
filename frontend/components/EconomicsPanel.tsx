import React from "react";
import styles from "./EconomicsPanel.module.css";

interface PayoutRow {
  wager: string;
  multiplier: string;
  gross: string;
  fee: string;
  net: string;
}

const FEE_BPS = 300; // 3%

function calcRow(wagerXlm: number, multiplierBps: number): PayoutRow {
  const gross = wagerXlm * (multiplierBps / 10_000);
  const fee = gross * (FEE_BPS / 10_000);
  const net = gross - fee;
  const fmt = (n: number) => n.toFixed(4);
  return {
    wager: `${wagerXlm} XLM`,
    multiplier: `${(multiplierBps / 10_000).toFixed(1)}x`,
    gross: `${fmt(gross)} XLM`,
    fee: `${fmt(fee)} XLM`,
    net: `${fmt(net)} XLM`,
  };
}

const ROWS: PayoutRow[] = [
  calcRow(1, 19_000),
  calcRow(1, 35_000),
  calcRow(2, 19_000),
  calcRow(2, 35_000),
  calcRow(5, 60_000),
  calcRow(10, 100_000),
];

export function EconomicsPanel() {
  return (
    <section className={styles.section} aria-labelledby="economics-heading">
      <h2 id="economics-heading" className={styles.heading}>
        Economics &amp; Transparency
      </h2>
      <p className={styles.keyMessage}>
        Protocol fees are configurable and visible onchain.
      </p>

      <div className={styles.panels}>
        {/* Fee model */}
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Fee Model</h3>
          <p className={styles.panelBody}>
            A rake of <span className={styles.mono}>2–5%</span> is taken from
            gross winnings only — never from the wager itself. The fee rate is
            set at game creation and locked for that game.
          </p>
          <div className={styles.formula} aria-label="Payout formula">
            <code className={styles.mono}>gross = wager × multiplier</code>
            <code className={styles.mono}>fee &nbsp;= gross × fee_bps / 10 000</code>
            <code className={styles.mono}>net &nbsp;= gross − fee</code>
          </div>
        </div>

        {/* Payout table */}
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Example Payouts <span className={styles.feeNote}>(fee&nbsp;3%)</span></h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Wager</th>
                  <th scope="col">Multiplier</th>
                  <th scope="col">Gross</th>
                  <th scope="col">Fee</th>
                  <th scope="col">Net Payout</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={i}>
                    <td className={styles.mono}>{row.wager}</td>
                    <td className={styles.mono}>{row.multiplier}</td>
                    <td className={styles.mono}>{row.gross}</td>
                    <td className={styles.mono}>{row.fee}</td>
                    <td className={`${styles.mono} ${styles.netCell}`}>{row.net}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reserve solvency */}
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Reserve Solvency</h3>
          <p className={styles.panelBody}>
            Before every game the contract verifies its reserve covers the
            worst-case payout at the <span className={styles.mono}>10x</span>{" "}
            streak tier. If reserves are insufficient,{" "}
            <span className={styles.mono}>start_game</span> is rejected with{" "}
            <span className={styles.mono}>InsufficientReserves</span>.
          </p>
          <p className={styles.panelBody}>
            Minimum recommended reserve:{" "}
            <span className={styles.mono}>max_wager × 10</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
