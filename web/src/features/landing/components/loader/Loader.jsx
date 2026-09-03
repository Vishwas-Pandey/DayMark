import React, { useState, useEffect } from 'react';
import { LoaderOverlay } from './LoaderOverlay';
import { LoaderBackground } from './LoaderBackground';
import { LoaderLogo } from './LoaderLogo';
import { LoaderProgressRing } from './LoaderProgressRing';
import { LoaderParticles } from './LoaderParticles';
import { LoaderText } from './LoaderText';
import { useLoader } from './LoaderProvider';

export const Loader = () => {
  // We use local state to trigger the inner components' exit animations 
  // right before the entire overlay fades out.
  const { isAppReady } = useLoader();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      setIsExiting(true);
    }
  }, [isAppReady]);

  return (
    <LoaderOverlay>
      <LoaderBackground isExiting={isExiting} />
      <LoaderParticles isExiting={isExiting} />
      <div className="relative flex flex-col items-center justify-center">
        <LoaderLogo isExiting={isExiting} />
        <LoaderProgressRing isExiting={isExiting} />
      </div>
      <LoaderText isExiting={isExiting} />
    </LoaderOverlay>
  );
};