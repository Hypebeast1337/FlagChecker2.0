// Utility to keep map compatibility logic in one place.
import { worldMill } from "@react-jvectormap/world";

// Some countries/territories in our dataset are not present in the vector map.
// Build the supported code list once so we can filter selections before
// passing them into the map component.
const mapPaths =
  // worldMill content can be nested depending on bundling
  // (dist/worldMill.json uses `content.paths`).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((worldMill as any).paths ?? (worldMill as any).content?.paths) ?? {};

const supportedCountryCodes = new Set<string>(Object.keys(mapPaths));

export class MapCompatibilityService {
  static isSupported(code: string): boolean {
    return supportedCountryCodes.has(code);
  }

  static filterSupported(codes: string[]): string[] {
    return codes.filter((code) => supportedCountryCodes.has(code));
  }

  static getUnsupported(codes: string[]): string[] {
    return codes.filter((code) => !supportedCountryCodes.has(code));
  }

  static getAllSupported(): string[] {
    return Array.from(supportedCountryCodes);
  }
}
