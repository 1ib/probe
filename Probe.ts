import { printPathsOnce } from "./util";

export type Path = string | Array<unknown>;

export interface ProbeOptions {
  callback?: (paths: Path[]) => void;
  paths?: Path[];
}

class Probe {
  // Add index signature to allow any property access
  [key: keyof any]: any;
  
  constructor(options: ProbeOptions = {}) {
    const { callback = printPathsOnce, paths = [] } = options;

    const handler = {
      get: (target: unknown, prop: keyof unknown) => {
        // ignore special attributes
        if (prop === Symbol.toPrimitive) return () => '';
        if (prop === 'inspect') return undefined;

        // add attributes path
        const newPaths = [...paths, prop];
        callback(newPaths);

        return new Probe({ callback, paths: newPaths });
      }
    };

    return new Proxy((...args: any[]) => {
      const newPaths = [...paths, args];
      callback(newPaths);
      return new Probe({ callback, paths: newPaths });
    }, handler);
  }
}

export default Probe;