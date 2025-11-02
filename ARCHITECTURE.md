# Repository Architecture

This document outlines the structure and purpose of each component in the MetaMask Rewards Calculator.

## 📁 Directory Structure

```
metamask-rewards-calculator/
├── calculator.js          # Main calculation engine
├── README.md              # Primary documentation & usage guide
├── package.json           # Node.js project configuration
├── LICENSE                # MIT License
├── .gitignore            # Git ignore patterns
├── ARCHITECTURE.md       # This file
└── examples/             # Additional content & resources
    ├── README.md         # Examples directory overview
    ├── telegram-message.md         # Condensed version for messaging
    └── detailed-visual-analysis.md  # Deep-dive analysis
```

## 🔧 Core Components

### `calculator.js`

**Purpose:** Main calculation engine and CLI tool

**Exports:**
- `calculateRoute(pointsPerDollar, routeName)` - Calculate economics for a swap route
- `calculatePerpsRoute()` - Calculate economics for perps route
- `CONFIG` - Configuration constants
- `TIERS` - Tier structure definition

**Key Functions:**
- Routes through 7 reward tiers (L1-L7)
- Calculates cumulative swap volume, fees, and net profit
- Assumes 1:1 point-to-LINEA conversion
- Formats output as ASCII tables

**Usage:**
```bash
node calculator.js
# or
npm start
```

### `README.md`

**Purpose:** Primary user-facing documentation

**Sections:**
- Calculator overview & capabilities
- LINEA & MetaMask background
- Route decision flowchart
- Results tables for all routes
- Conversion interpretation explainer
- Usage instructions
- Boost window strategy
- Resources & links
- Contributing guidelines

**Audience:** End users, researchers, DeFi farmers

### `examples/`

**Purpose:** Supplementary content for different use cases

#### `telegram-message.md`
- Condensed format for messaging platforms
- Key numbers and quick decision framework
- Copy-paste ready format

#### `detailed-visual-analysis.md`
- Extended deep-dive content
- Level-by-level verdicts
- Optimization strategy walkthrough
- Decision tree framework
- Risk assessment

#### `examples/README.md`
- Explains purpose of each example file
- Usage guidance

## 🎯 Calculation Logic

### Routes Modeled

1. **Linea 2× Boost Route** (Recommended)
   - Rate: 1.6 pts/$1 (base 0.8 × 2 boost)
   - Fee: 0.85% per swap
   - Assumes all swaps on Linea chain

2. **Base Rate Route**
   - Rate: 0.8 pts/$1
   - Fee: 0.85% per swap
   - For users not using Linea

3. **Perps Route**
   - Rate: 0.1 pts/$1 notional volume
   - No swap fees
   - High volume requirement

### Assumptions

**Key assumption:** 1 point = 1 LINEA token

**Rationale:**
- No official conversion rate published
- "Proportional" could mean direct conversion
- Provides calculable baseline
- Alternative (pool share) requires unknown total points

**Other constants:**
- LINEA price: $0.01428
- Season pool: $30M USD
- Swap fee: 0.85%
- Referral bonus: 250 points starting

### Tier Structure

7 tiers from L1 to L7:
- L1 Frontier: 1,000 pts
- L2 Sylvana: 25,000 pts (24h boost unlock)
- L3 Oceania: 50,000 pts
- L4 Denalia: 100,000 pts (72h boost unlock)
- L5 Titana: 1,000,000 pts
- L6 Arcadia: 2,500,000 pts
- L7 Utopia: 5,000,000 pts

## 🔄 Data Flow

```
CONFIG + TIERS
    ↓
calculateRoute() / calculatePerpsRoute()
    ↓
Results array (per tier)
    ↓
printRoute() / printPerpsRoute()
    ↓
Formatted ASCII output
```

## 📊 Output Format

**Console output:**
```
╔════════════════════════════════════════════════════════════════════════╗
║                    METAMASK REWARDS CALCULATOR v2.0                   
╚════════════════════════════════════════════════════════════════════════╝

Season 1 Pool: $30M USD in LINEA
LINEA Price: $0.01428 | Assumption: 1 pt = 1 LINEA

================================================================================
  LINEA 2× BOOST ROUTE (RECOMMENDED)
  Rate: 1.6 pts/$1 | Swap fee: 0.85%
================================================================================

Lvl | Tier      | Pts       | This Lvl       | Cumul Swap  | Fee    | Net     
--------------------------------------------------------------------------------
L1  | Frontier  |     1,000 | 750 / $469     |      $469   |    $4  |    $10  
L2  | Sylvana   |    25,000 | 24,000 / $15K  |   $15,469   |  $131  |   $226 *
...
```

## 🧪 Extensibility

**To add new routes:**
1. Define rate in CONFIG
2. Call `calculateRoute(newRate, "Route Name")`
3. Add custom print logic if needed

**To modify assumptions:**
1. Update CONFIG constants
2. Re-run calculator
3. Compare results

**To model different conversions:**
1. Change CONVERSION_RATIO in CONFIG
2. Or model pool share scenario in separate function

## 🚀 Future Enhancements

Potential additions:
- Web UI version
- Historical volume calculator
- Referral network simulator
- Pool share scenario calculator
- CSV export functionality
- Dynamic price fetching

## 📝 Code Style

- Functional approach (pure calculation functions)
- Clear separation of concerns
- Extensive inline comments
- ASCII art for visual clarity
- No external dependencies (pure Node.js)

## 🤝 Contributing

See README.md for contribution guidelines. Code follows MIT License.

---

**Last updated:** Nov 2025  
**Maintained by:** snowzies
