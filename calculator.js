// MetaMask Rewards Calculator v2.0

// Calculate economics for MetaMask Rewards Season 1

// By: snowzies | Nov 2025

// ====== CONFIGURATION ======

const CONFIG = {

  // Token economics

  LINEA_PRICE: 0.01428, // Current LINEA price (Nov 2025)

  SEASON_POOL: 30_000_000, // $30M USD in LINEA for Season 1

  

  // Farming parameters

  SWAP_FEE: 0.0085, // 0.85% swap fee

  REFERRAL_BONUS: 250, // Starting bonus with referral code

  

  // Points earning rates

  POINTS_PER_SWAP_BASE: 0.8, // 8 points per $10 = 0.8 per $1

  LINEA_BOOST: 2, // 2× boost on Linea chain

  POINTS_PER_PERPS: 0.1, // 1 point per $10 notional volume

  

  // Conversion assumption

  // We model 1:1 (1 point = 1 LINEA) as baseline

  // Actual may be proportional pool share

  CONVERSION_RATIO: 1 // 1 point = 1 LINEA token

};

// Tier structure with boost info

const TIERS = [

  { level: 1, name: 'Frontier', points: 1000, boost: null },

  { level: 2, name: 'Sylvana', points: 25000, boost: '24h 50%' },

  { level: 3, name: 'Oceania', points: 50000, boost: null },

  { level: 4, name: 'Denalia', points: 100000, boost: '72h 50%' },

  { level: 5, name: 'Titana', points: 1000000, boost: null },

  { level: 6, name: 'Arcadia', points: 2500000, boost: null },

  { level: 7, name: 'Utopia', points: 5000000, boost: null }

];

// ====== CALCULATION FUNCTIONS ======

function calculateRoute(pointsPerDollar, routeName) {

  let prevPoints = CONFIG.REFERRAL_BONUS;

  let cumulSwap = 0;

  let cumulFee = 0;

  const results = [];

  

  TIERS.forEach(tier => {

    const incrPoints = tier.points - prevPoints;

    const incrSwap = incrPoints / pointsPerDollar;

    const incrFee = incrSwap * CONFIG.SWAP_FEE;

    

    cumulSwap += incrSwap;

    cumulFee += incrFee;

    

    const rewardTokens = tier.points * CONFIG.CONVERSION_RATIO;

    const rewardUSD = rewardTokens * CONFIG.LINEA_PRICE;

    const netProfit = rewardUSD - cumulFee;

    

    results.push({

      level: tier.level,

      name: tier.name,

      boost: tier.boost,

      totalPoints: tier.points,

      incrPoints,

      incrSwap,

      incrFee,

      cumulSwap,

      cumulFee,

      rewardTokens,

      rewardUSD,

      netProfit

    });

    

    prevPoints = tier.points;

  });

  

  return { routeName, pointsPerDollar, results };

}

function calculatePerpsRoute() {

  let prevPoints = CONFIG.REFERRAL_BONUS;

  let cumulVolume = 0;

  const results = [];

  

  TIERS.forEach(tier => {

    const incrPoints = tier.points - prevPoints;

    const incrVolume = incrPoints / CONFIG.POINTS_PER_PERPS;

    

    cumulVolume += incrVolume;

    

    const rewardTokens = tier.points * CONFIG.CONVERSION_RATIO;

    const rewardUSD = rewardTokens * CONFIG.LINEA_PRICE;

    

    results.push({

      level: tier.level,

      name: tier.name,

      totalPoints: tier.points,

      cumulVolume,

      rewardTokens,

      rewardUSD

    });

    

    prevPoints = tier.points;

  });

  

  return { routeName: 'Perps Route', results };

}

// ====== OUTPUT FUNCTIONS ======

function printHeader() {

  console.log('\n╔' + '═'.repeat(78) + '╗');

  console.log('║' + ' '.repeat(20) + 'METAMASK REWARDS CALCULATOR v2.0' + ' '.repeat(26) + '║');

  console.log('╚' + '═'.repeat(78) + '╝\n');

  console.log(`Season 1 Pool: $${(CONFIG.SEASON_POOL / 1e6).toFixed(0)}M USD in LINEA`);

  console.log(`LINEA Price: $${CONFIG.LINEA_PRICE} | Assumption: 1 pt = 1 LINEA\n`);

}

function printRoute(route) {

  console.log('\n' + '='.repeat(80));

  console.log(`  ${route.routeName.toUpperCase()}`);

  console.log(`  Rate: ${route.pointsPerDollar} pts/$1 | Swap fee: ${(CONFIG.SWAP_FEE * 100).toFixed(2)}%`);

  console.log('='.repeat(80));

  console.log('\nLvl | Tier      | Pts       | This Lvl       | Cumul Swap  | Fee    | Net     ');

  console.log('-'.repeat(80));

  

  route.results.forEach(r => {

    const lvl = `L${r.level}`.padEnd(3);

    const name = r.name.padEnd(9);

    const pts = r.totalPoints.toLocaleString().padStart(9);

    const thisLvl = `${r.incrPoints.toLocaleString()} / $${Math.round(r.incrSwap).toLocaleString()}`.padEnd(14);

    const cumSwap = `$${Math.round(r.cumulSwap).toLocaleString()}`.padStart(11);

    const fee = `$${Math.round(r.cumulFee).toLocaleString()}`.padStart(6);

    const net = `$${Math.round(r.netProfit).toLocaleString()}`.padStart(7);

    const boostMarker = r.boost ? ' *' : '';

    

    console.log(`${lvl} | ${name} | ${pts} | ${thisLvl} | ${cumSwap} | ${fee} | ${net}${boostMarker}`);

  });

  

  console.log('\n* Has boost window (batch swaps during boost for efficiency)');

}

function printPerpsRoute(route) {

  console.log('\n' + '='.repeat(80));

  console.log(`  ${route.routeName.toUpperCase()}`);

  console.log(`  Rate: ${CONFIG.POINTS_PER_PERPS} pts/$1 notional | No swap fees`);

  console.log('='.repeat(80));

  console.log('\nLvl | Tier      | Points    | Cumul Volume | Reward LINEA | Reward USD');

  console.log('-'.repeat(80));

  

  route.results.forEach(r => {

    const lvl = `L${r.level}`.padEnd(3);

    const name = r.name.padEnd(9);

    const pts = r.totalPoints.toLocaleString().padStart(9);

    const vol = `$${Math.round(r.cumulVolume).toLocaleString()}`.padStart(12);

    const tokens = r.rewardTokens.toLocaleString().padStart(12);

    const usd = `$${Math.round(r.rewardUSD).toLocaleString()}`.padStart(10);

    

    console.log(`${lvl} | ${name} | ${pts} | ${vol} | ${tokens} | ${usd}`);

  });

}

function printFooter() {

  console.log('\n' + '='.repeat(80));

  console.log('✓ Analysis complete. Numbers assume 1:1 conversion (1 pt = 1 LINEA).');

  console.log('⚠️  Actual conversion may be proportional pool share. DYOR.');

  console.log('='.repeat(80) + '\n');

}

// ====== MAIN EXECUTION ======

function main() {

  printHeader();

  

  // Calculate all routes

  const lineaRoute = calculateRoute(

    CONFIG.POINTS_PER_SWAP_BASE * CONFIG.LINEA_BOOST,

    'Linea 2× Boost Route (Recommended)'

  );

  

  const baseRoute = calculateRoute(

    CONFIG.POINTS_PER_SWAP_BASE,

    'Base Rate Route (No Linea Boost)'

  );

  

  const perpsRoute = calculatePerpsRoute();

  

  // Print results

  printRoute(lineaRoute);

  printRoute(baseRoute);

  printPerpsRoute(perpsRoute);

  printFooter();

}

// Run

if (require.main === module) {

  main();

}

// Export for use as module

module.exports = { calculateRoute, calculatePerpsRoute, CONFIG, TIERS };
