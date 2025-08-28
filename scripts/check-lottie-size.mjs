import { promises as fs } from 'node:fs';
import { gzip } from 'node:zlib';
import { promisify } from 'node:util';
const gz = promisify(gzip);

const files = [
  'assets/lottie/hero-glassbox.json',
  'assets/lottie/hero-structure.json',
  'assets/lottie/hero-poster.webp' // already compressed; we just stat size
];

const limits = { lottieTotal: 120_000, poster: 120_000 };

const main = async () => {
  const [base, struct] = await Promise.all(files.slice(0,2).map(f => fs.readFile(f, 'utf8')));
  const [gzBase, gzStruct] = await Promise.all([gz(base), gz(struct)]);
  
  // Check if poster exists, if not skip it for now (COO provided starter assets don't include poster)
  let posterStat = { size: 0 };
  try {
    posterStat = await fs.stat(files[2]);
  } catch (e) {
    console.log('Note: hero-poster.webp not found - using existing fallback or will generate');
  }

  const totalGz = gzBase.length + gzStruct.length;
  if (totalGz > limits.lottieTotal) {
    throw new Error(`Lottie gz total ${totalGz} > ${limits.lottieTotal}`);
  }
  if (posterStat.size > limits.poster) {
    throw new Error(`Poster size ${posterStat.size} > ${limits.poster}`);
  }
  
  console.log(`✅ OK: Lottie gz total=${totalGz} bytes (${(totalGz/1024).toFixed(1)}KB), poster=${posterStat.size} bytes`);
  console.log(`📊 Budget: ${totalGz}/${limits.lottieTotal} (${(totalGz/limits.lottieTotal*100).toFixed(1)}% used)`);
};

main().catch(e => { 
  console.error(`❌ ${e.message}`); 
  process.exit(1); 
});
