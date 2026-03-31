// Stub: global type augmentations for Ink components
import type { DOMElement } from './dom.js'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ink-box': any;
      'ink-text': any;
      'ink-root': any;
      'ink-virtual-text': any;
    }
  }
}

export {}
