declare module 'react-snow-overlay' {
  import { FC } from 'react';

  interface SnowOverlayProps {
    maxParticles?: number;
    particleSpeed?: number;
    particleSize?: number;
  }

  export const SnowOverlay: FC<SnowOverlayProps>;
}
