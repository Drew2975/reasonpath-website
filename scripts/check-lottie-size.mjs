import { promises as fs } from 'node:fs';
import { gzip } from 'node:zlib';
import { promisify } from 'node:util';
const gz = promisify(gzip);

// Quarantine-aware: if assets are missing (archived/disabled), skip with success.
const REQUIRED = [
  'assets/lottie/hero-glassbox.json',
  'assets/lottie/hero-structure.json',
];
const POSTER = 'assets/lottie/hero-poster.webp';

const limits = { lottieTotal: 120_000, poster: 120_000 };

const exists = async (p) => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

const main = async () => {
  const presence = await Promise.all(REQUIRED.map(exists));
  const haveAll = presence.every(Boolean);
  if (!haveAll) {
    console.log('ℹ️ Lottie assets not found — assuming archived/disabled; skipping checks.');
    return;
  }

  const [base, struct] = await Promise.all(REQUIRED.map((f) => fs.readFile(f, 'utf8')));
  const [gzBase, gzStruct] = await Promise.all([gz(base), gz(struct)]);

  let posterStat = { size: 0 };
  try {
    if (await exists(POSTER)) {
      posterStat = await fs.stat(POSTER);
    } else {
      console.log('Note: hero-poster.webp not found — skipping poster size check.');
    }
  } catch {
    console.log('Note: poster stat unavailable — skipping poster size check.');
  }

  const totalGz = gzBase.length + gzStruct.length;
  if (totalGz > limits.lottieTotal) {
    throw new Error(`Lottie gz total ${totalGz} > ${limits.lottieTotal}`);
  }
  if (posterStat.size > limits.poster) {
    throw new Error(`Poster size ${posterStat.size} > ${limits.poster}`);
  }

  console.log(
    `✅ OK: Lottie gz total=${totalGz} bytes (${(totalGz / 1024).toFixed(1)}KB), poster=${posterStat.size} bytes`,
  );
  console.log(
    `📊 Budget: ${totalGz}/${limits.lottieTotal} (${((totalGz / limits.lottieTotal) * 100).toFixed(1)}% used)`,
  );
};

main().catch((e) => {
  console.error(`❌ ${e.message}`);
  process.exit(1);
});
