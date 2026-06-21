import {setRequestLocale} from 'next-intl/server';
import {Hero} from '@/components/hero/Hero';
import {Marquee} from '@/components/sections/Marquee';
import {ChaosToOrder} from '@/components/sections/ChaosToOrder';
import {Services} from '@/components/sections/Services';
import {Automation} from '@/components/sections/Automation';
import {JeyModules} from '@/components/sections/JeyModules';
import {Expertise} from '@/components/sections/Expertise';
import {Industries} from '@/components/sections/Industries';
import {Process} from '@/components/sections/Process';
import {Trust} from '@/components/sections/Trust';
import {FinalCTA} from '@/components/sections/FinalCTA';

export default function HomePage({params}: {params: {locale: string}}) {
  setRequestLocale(params.locale);

  return (
    <>
      <Hero />
      <Marquee />
      <ChaosToOrder />
      <Services />
      <Automation />
      <JeyModules />
      <Expertise />
      <Industries />
      <Process />
      <Trust />
      <FinalCTA />
    </>
  );
}
