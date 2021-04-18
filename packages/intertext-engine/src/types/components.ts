import { LayoutProps } from './layout';
import { Space } from './space';
import { Intent } from './theme';
import { Command } from './commands';
import { Renderable } from './renderable';

export type Component =
  | Block
  | Grid
  | Text
  | TextP
  | TextH1
  | TextH2
  | TextH3
  | Button
  | Collapse;

/**
 * Components
 */

export interface Block extends LayoutProps {
  block: Renderable;
  intent?: Intent;
}

export interface Grid extends LayoutProps {
  grid: Renderable;
  cols: number[];
  gap?: Space;
}

interface TextBase extends LayoutProps {
  intent?: Intent;
  muted?: boolean;
  code?: boolean;
  bold?: boolean;
  italic?: boolean;
  underlined?: boolean;
}
export interface Text extends TextBase {
  text: Renderable;
}
export interface TextP extends TextBase {
  p: Renderable;
}
export interface TextH1 extends TextBase {
  h1: Renderable;
}
export interface TextH2 extends TextBase {
  h2: Renderable;
}
export interface TextH3 extends TextBase {
  h3: Renderable;
}

export interface Button extends LayoutProps {
  button: Renderable;
  intent?: Intent;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick: Command[];
}

export interface Collapse extends LayoutProps {
  collapse: Renderable;
  handle: Renderable;
  intent?: Intent;
  disabled?: boolean;
  onClick: Command[];
}