import RegistryManager from './core/registry/RegistryManager';
import PackageManager from './core/package/PackageManager';
import StageManager from './core/stage/StageManager';
import type RegistryManagerType from './core/registry/RegistryManager';
import type PackageManagerType from './core/package/PackageManager';
import type StageManagerType from './core/stage/StageManager';
import type { PackageShape } from './system/Package';
import type { RegistryContents } from './core/registry/RegistryManager';
import type { StageContents } from './core/stage/StageManager';

/**
 * Arguments received by RegistiryManager
 * @type {object} EngineProps
 * @param {(newRegistry: Registry) => void} onRegistryUpdate Subscribe to registry updates
 * @param {(newStage: Stage) => void} onStageUpdate Subscribe to stage updates
 * @param {boolean} debug True if debugging
 */
export type EngineProps = {
  onRegistryUpdate?: (newRegistry: RegistryContents) => void
  onStageUpdate?: (newStage: StageContents) => void
  debug?: boolean
}

class Engine {

  private props: EngineProps;
  private registry: RegistryManagerType;
  private package: PackageManagerType;
  private stage: StageManagerType;

  constructor (props: EngineProps) {
    this.registry = new RegistryManager(props.onRegistryUpdate);
    this.stage = new StageManager(this.registry, props.onStageUpdate);
    this.package = new PackageManager(this.registry, this.stage)
    this.props = props;
  }

  /**
   * Inserts one or many packages into registry
   * @param {PackageShape | PackageShape[]} pack 
   */
  register = (pack: PackageShape | PackageShape[]): void => {
    // convert single packages into an array
    const packages: PackageShape[] = Array.isArray(pack) ? pack : [pack];
    // insert that are not relations
    this.package.apply(packages);
  }
}

export default Engine;