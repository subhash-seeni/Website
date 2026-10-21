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
import { DailyPage } from './components/DailyPage/DailyPage';
import { LifePage } from './components/LifePage/LifePage';
import { CompanionPage } from './components/CompanionPage/CompanionPage';
import { AffairsPage } from './components/AffairsPage/AffairsPage';
import { PartnerPage } from './components/PartnerPage/PartnerPage';
import {
  isBrandsPath,
  isEssentialsPath,
  isDailyPath,
  isProgrammePath,
  ROUTE_CHANGE_EVENT,
} from './config/navigation';

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
  const isDaily = isDailyPath(currentPath);
  const progType = isProgrammePath(currentPath);
  const isSubPage = isBrands || isEssentials || isDaily || progType !== null;

  return (
    <div className="bogo-app">
      <ScrollProgressIndicator isBrandsPage={isSubPage} />
      <BogoMenu currentPath={currentPath} />
      {isDaily ? (
        <DailyPage />
      ) : isEssentials ? (
        <EssentialsPage />
      ) : isBrands ? (
        <BrandsPage />
      ) : progType === 'life' ? (
        <LifePage />
      ) : progType === 'companion' ? (
        <CompanionPage />
      ) : progType === 'affairs' ? (
        <AffairsPage />
      ) : progType === 'partner' ? (
        <PartnerPage />
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

