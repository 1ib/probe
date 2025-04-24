import { Path } from "./Probe";
import { debounce } from 'lodash-es';

function printPaths(paths: Path[]) {
  console.log(`probe.${paths.map(t => Array.isArray(t) ? `(${t.join(', ')})` : t).join('.')}`);
}

export const printPathsOnce = debounce(printPaths, 0) as typeof printPaths;