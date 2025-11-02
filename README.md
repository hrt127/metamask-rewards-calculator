# MetaMask Rewards Calculator

**Economic analysis framework for MetaMask Rewards Season 1**

Calculate costs and potential returns for farming MetaMask Rewards under different scenarios and routing strategies.

---

## 🎯 What This Calculator Does

MetaMask Rewards Season 1 distributes **$30 million in LINEA tokens** over 90 days based on points earned through swaps, perps trading, and referrals.

This calculator helps you:

- **Understand costs** to reach each tier (L1-L7)

- **Compare routes**: Linea 2× boost vs base rate vs perps

- **Model scenarios**: Direct 1:1 conversion vs proportional pool share

- **Plan timing**: When to batch swaps for boost windows

**Key unknown:** MetaMask hasn't confirmed the points-to-token conversion rate. We model 1:1 as baseline.

---

## 📊 About LINEA & MetaMask

**LINEA Network**

- **Type:** zkEVM Layer 2 on Ethereum

- **Founded by:** ConsenSys (Joe Lubin, Ethereum co-founder)

- **Backing:** ConsenSys, SharpLink ($200M ETH), Eigen Labs, ENS Labs

- **Token:** $0.01428 | MC: $205M | FDV: $1.95B

**MetaMask Rewards Season 1**

- **Pool:** $30M+ in LINEA tokens

- **Duration:** 90 days (started Oct 28, 2025)

- **Eligible activities:** Swaps, perps, referrals, historical activity

- **Tiers:** 7 levels (Frontier → Utopia)

---

## 🗺️ Route Decision Flow

```
START: Want to farm MetaMask Rewards?

│

├─ Route 1: SWAP (Most Common)

│  │

│  ├─ Use LINEA chain?

│  │  ├─ YES → 1.6 pts/$1 (2× boost) ✓ Most efficient

│  │  └─ NO → 0.8 pts/$1 (base rate)

│  │

│  ├─ Use boost windows?

│  │  ├─ L2 Sylvana: 24h 50% boost (unlock at 25K pts)

│  │  ├─ L4 Denalia: 72h 50% boost (unlock at 100K pts)

│  │  └─ Boosts apply AFTER you reach the level

│  │

│  └─ Cost: 0.85% swap fee per transaction

│

├─ Route 2: PERPS (High Volume Traders)

│  │

│  ├─ Earn: 0.1 pts/$1 notional volume

│  ├─ No swap fees

│  ├─ But: Liquidation risk + funding costs

│  └─ Best for: Existing perps traders with capital efficiency

│

└─ Route 3: HYBRID

   └─ Combine routes based on your trading patterns
```

---

## 📈 Results: Linea 2× Boost Route (Recommended)

**Rate:** 1.6 pts per $1 (0.8 base × 2 Linea boost)  

**Fee:** 0.85% per swap  

**Assumption:** 1 point = 1 LINEA token ($0.01428)

### Level-by-Level Breakdown

| Level | Tier | Total Pts | This Level | Cumul Swap | Cumul Fee | Reward | Net Profit |

|-------|------|-----------|------------|------------|-----------|--------|------------|

| **L1** | Frontier | 1,000 | 750 pts / $469 | $469 | $4 | $14 | **+$10** ✓ |

| **L2** | Sylvana* | 25,000 | 24,000 pts / $15,000 | $15,469 | $131 | $357 | **+$226** ✓ |

| **L3** | Oceania | 50,000 | 25,000 pts / $15,625 | $31,094 | $264 | $714 | **+$450** ✓ |

| **L4** | Denalia* | 100,000 | 50,000 pts / $31,250 | $62,344 | $530 | $1,428 | **+$898** ✓ |

| **L5** | Titana | 1,000,000 | 900,000 pts / $562,500 | $624,844 | $5,311 | $14,280 | **+$8,969** ✓ |

| **L6** | Arcadia | 2,500,000 | 1.5M pts / $937,500 | $1,562,344 | $13,280 | $35,700 | **+$22,420** ✓ |

| **L7** | Utopia | 5,000,000 | 2.5M pts / $1,562,500 | $3,124,844 | $26,561 | $71,400 | **+$44,839** ✓ |

*Has boost window (use for farming efficiency)

**Key insight:** At 1:1 conversion, all levels are profitable. L4 Denalia offers solid balance at ~$62K investment.

---

## 📈 Results: Base Rate Route (No Linea Boost)

**Rate:** 0.8 pts per $1  

**Fee:** 0.85% per swap

| Level | Tier | Cumul Swap | Cumul Fee | Reward | Net Profit |

|-------|------|------------|-----------|--------|------------|

| L1 | Frontier | $938 | $8 | $14 | **+$6** ✓ |

| L2 | Sylvana | $30,938 | $263 | $357 | **+$94** ✓ |

| L3 | Oceania | $62,188 | $529 | $714 | **+$185** ✓ |

| L4 | Denalia | $124,688 | $1,060 | $1,428 | **+$368** ✓ |

| L5 | Titana | $1,249,688 | $10,622 | $14,280 | **+$3,658** ✓ |

| L6 | Arcadia | $3,124,688 | $26,560 | $35,700 | **+$9,140** ✓ |

| L7 | Utopia | $6,249,688 | $53,122 | $71,400 | **+$18,278** ✓ |

**Costs are 2× higher without Linea boost. Still profitable at 1:1, but less efficient.**

---

## ⚡ Results: Perps Route

**Rate:** 0.1 pts per $1 notional volume  

**No swap fees** (but liquidation risk + funding costs not modeled)

| Level | Tier | Volume Needed | Reward (1:1) |

|-------|------|---------------|--------------|

| L1 | Frontier | $7,500 | $14 |

| L2 | Sylvana | $247,500 | $357 |

| L4 | Denalia | $997,500 | $1,428 |

| L7 | Utopia | $49,997,500 | $71,400 |

**Reality check:** $10M+ volume for L5. Only viable for pro traders with high capital efficiency.

---

## 🤔 Understanding "Proportional to Points"

**Official wording:** "Linea token allocation proportional to your total points"

### Interpretation 1: Direct Conversion (What we calculate)

- 1,000 points = 1,000 LINEA tokens

- Simple, calculable, gives clear ROI

- **This is what our tables show**

### Interpretation 2: Proportional Pool Share (Alternative)

- $30M pool divided by total community points

- Your share = (Your Points / Everyone's Points) × $30M

- **Problem:** Can't calculate without knowing total community points

**Example of pool share math:**

- If 100 billion total community points accumulated

- And you have 100,000 points (0.0001% of total)

- Your share: 0.0001% × $30M = $30

**Our approach:** Model 1:1 as baseline since it's calculable. Mention pool context. Let users decide based on their conviction.

---

## 🛠️ Using the Calculator

```bash

# Clone repo

git clone https://github.com/hrt127/metamask-rewards-calculator.git

cd metamask-rewards-calculator

# Run calculator

node calculator.js

```

### Customize Parameters

Edit `calculator.js`:

```javascript

const CONFIG = {

  LINEA_PRICE: 0.01428,    // Update with current price

  SWAP_FEE: 0.0085,        // Verify current fee

  // Model different scenarios

}

```

---

## ⏱️ Boost Window Strategy

**L2 Sylvana (25,000 pts):**

- Unlocks: 24-hour 50% boost

- Strategy: Batch your next 24,000 points of swaps immediately after unlocking

- Timing matters: Plan your L2→L3 climb during this window

**L4 Denalia (100,000 pts):**

- Unlocks: 72-hour 50% boost

- Strategy: Save capital, batch swaps during this 3-day window

- Best for: Pushing toward L5 efficiently

**Note:** Boosts apply to points earned AFTER reaching the level, not retroactively.

---

## 📚 Resources

- **MetaMask Official:** [Rewards Announcement](https://metamask.io/news/introducing-metamask-rewards)

- **LINEA Tokenomics:** [Docs](https://docs.linea.build)

- **Analysis Source:** [Dropstab Research](https://dropstab.com/research/alpha/how-to-earn-metamask-rewards)

- **Pool Size:** [$30M confirmed](https://bsc.news/post/metamask-rewards-points-program-airdrop)

---

## 🤝 Contributing

Found better data? See an error? Have a different interpretation?

- Open an issue

- Submit a PR

- Share your analysis

Let's figure this out together.

---

## ⚠️ Disclaimer

**Educational purposes only. Not financial advice.**

- Point-to-token conversion is **not confirmed** by MetaMask

- We model 1:1 as baseline for calculation purposes

- Actual mechanics may use proportional pool distribution

- LINEA price is volatile

- Always DYOR before committing capital

---

## 📄 License

MIT License - Fork, modify, use freely.

---

**Built by:** snowzies | Thinking in narratives 🌸  

**Questions? PRs welcome.**
