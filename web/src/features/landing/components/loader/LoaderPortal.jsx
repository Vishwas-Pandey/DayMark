import { createPortal } from 'react-dom';
import { useLoader } from './LoaderProvider';
import { Loader } from './Loader';
import { AnimatePresence } from 'framer-motion';

export const LoaderPortal = () => {
  const { showLoader } = useLoader();

  // Create portal target if it doesn't exist to ensure safety
  let portalRoot = document.getElementById('loader-portal');
  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.id = 'loader-portal';
    document.body.appendChild(portalRoot);
  }

  return createPortal(
    <AnimatePresence mode="wait">
      {showLoader && <Loader key="daymark-loader" />}
    </AnimatePresence>,
    portalRoot
  );
};