import {setRequestLocale} from 'next-intl/server';
import {Hero} from '@/components/hero/Hero';
import {ChaosToOrder} from '@/components/sections/ChaosToOrder';
import {Services} from '@/components/sections/Services';
import {JeyModules} from '@/components/sections/JeyModules';
import {Industries} from '@/components/sections/Industries';
import {Process} from '@/components/sections/Process';
import {Trust} from '@/components/sections/Trust';
import {FinalCTA} from '@/components/sections/FinalCTA';

export default function HomePage({params}: {params: {locale: string}}) {
  setRequestLocale(params.locale);

  return (
    <>
      <Hero />
      <ChaosToOrder />
      <Services />
      <JeyModules />
      <Industries />
      <Process />
      <Trust />
      <FinalCTA />
    </>
  );
}
