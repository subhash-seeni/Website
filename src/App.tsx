import { useEffect } from 'react';
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

function App() {
  useEffect(() => {
    initSmoothScroll();
    return () => {
      destroySmoothScroll();
    };
  }, []);

  return (
    <div className="bogo-app">
      <ScrollProgressIndicator />
      <BogoMenu />
      <BogoHero />
      <BogoCollection />
      <BogoSquare />
      <BogoFormats />
      <BogoTechnology />
      <BogoGo />
      <BogoPrograms />
      <BogoValue />
      <GrowthRoadmap />
      <BogoFooter />
    </div>
  );
}

export default App;
