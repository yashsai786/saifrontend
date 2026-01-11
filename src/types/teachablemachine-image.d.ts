// src/types/teachablemachine-image.d.ts

declare module '@teachablemachine/image' {
  export interface Prediction {
    className: string;
    probability: number;
  }

  export interface CustomMobileNet {
    predict(
      input: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement
    ): Promise<Prediction[]>;
    getTotalClasses(): number;
  }

  export function load(
    modelUrl: string,
    metadataUrl?: string
  ): Promise<CustomMobileNet>;

  export class Webcam {
    constructor(width: number, height: number, flip: boolean);
    setup(): Promise<void>;
    play(): Promise<void>;
    stop(): void;
    update(): void;
    canvas: HTMLCanvasElement;
    webcam: HTMLVideoElement;
  }
}
