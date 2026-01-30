// src/types/svg.d.ts
declare module '*.svg' {
    import * as React from 'react';
    import { StaticImageData } from 'next/image';
  
    const ReactComponent: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & { title?: string }
    >;
  
    // Support for using SVG as image source (StaticImageData compatible)
    const content: StaticImageData;
  
    export default content;
    export { ReactComponent };
  }
  
  declare module '*.svg?react' {
    import * as React from 'react';
  
    const ReactComponent: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & { title?: string }
    >;
  
    export default ReactComponent;
  }

  declare module '*.svg?url' {
    const content: string;
    export default content;
  }