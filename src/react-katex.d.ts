declare module "react-katex" {
    import * as React from "react";
    import { KatexOptions } from "katex";
  
    interface InlineMathProps {
      math: string;
      renderError?: (error: Error) => React.ReactNode;
      errorColor?: string;
    }
  
    interface BlockMathProps extends InlineMathProps {}
  
    export class InlineMath extends React.Component<InlineMathProps, {}> {}
    export class BlockMath extends React.Component<BlockMathProps, {}> {}
  }
  