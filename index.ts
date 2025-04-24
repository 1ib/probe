import Probe from './Probe';

export default Probe;
export type { ProbeOptions } from './Probe';

if (!globalThis?.probe) {
  globalThis.probe = new Probe;
}