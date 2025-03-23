declare module 'qrcode' {
  interface QRCodeOptions {
    version?: number;
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
    maskPattern?: number;
    margin?: number;
    scale?: number;
    width?: number;
    color?: {
      dark?: string;
      light?: string;
    };
  }

  function toCanvas(
    canvas: HTMLCanvasElement | string,
    text: string,
    options?: QRCodeOptions,
    callback?: (error: Error | null) => void
  ): Promise<HTMLCanvasElement>;

  function toDataURL(
    text: string,
    options?: QRCodeOptions
  ): Promise<string>;

  function toString(
    text: string,
    options?: QRCodeOptions
  ): Promise<string>;

  export { toCanvas, toDataURL, toString };
  export default { toCanvas, toDataURL, toString };
} 