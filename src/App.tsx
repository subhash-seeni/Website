import { useEffect, useState } from 'react';
import { initSmoothScroll, destroySmoothScroll } from './utils/smoothScroll';
import { BogoHero } from './components/BogoHero/BogoHero';
import { BogoCollection } from './components/BogoCollection/BogoCollection';
import { BogoSquare } from './components/BogoSquare/BogoSquare';
import { BogoFormats } from './components/BogoFormats/BogoFormats';
import { BogoTechnology } from './components/BogoTechnology/BogoTechnology';
import { BogoGo } from './components/BogoGo/BogoGo';
import { BogoPrograms } from './components/BogoPrograms/BogoPrograms';
import { BogoValue } from './components/BogoValue/BogoValue';
import { GrowthRoadmap } from './components/GrowthRoadmap/GrowthRoadmap';
import { BogoFooter } from './components/BogoFooter/BogoFooter';
import { BogoMenu } from './components/Navigation/BogoMenu';
import { ScrollProgressIndicator } from './components/Navigation/ScrollProgressIndicator';
import { BrandsPage } from './components/BrandsPage/BrandsPage';
import { EssentialsPage } from './components/EssentialsPage/EssentialsPage';
import { isBrandsPath, isEssentialsPath, ROUTE_CHANGE_EVENT } from './config/navigation';

function App() {
  const [currentPath, setCurrentPath] = useState(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    initSmoothScroll();
    return () => {
      destroySmoothScroll();
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener(ROUTE_CHANGE_EVENT, handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener(ROUTE_CHANGE_EVENT, handleRouteChange);
    };
  }, []);

  const isBrands = isBrandsPath(currentPath);
  const isEssentials = isEssentialsPath(currentPath);

  return (
    <div className="bogo-app">
      <ScrollProgressIndicator isBrandsPage={isBrands || isEssentials} />
      <BogoMenu currentPath={currentPath} />
      {isEssentials ? (
        <EssentialsPage />
      ) : isBrands ? (
        <BrandsPage />
      ) : (
        <>
          <BogoHero />
          <BogoCollection />
          <BogoSquare />
          <BogoFormats />
          <BogoTechnology />
          <BogoGo />
          <BogoPrograms />
          <BogoValue />
          <GrowthRoadmap />
        </>
      )}
      <BogoFooter />
    </div>
  );
}

export default App;

