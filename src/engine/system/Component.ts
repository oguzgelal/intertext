import type { IPackage } from "./Package";

export type ComponentID = string;

export enum ComponentTypes {
  CTA = 'CTA',
}

export interface IComponent extends IPackage {
  id: ComponentID
  type: ComponentTypes
}