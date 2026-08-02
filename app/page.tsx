import { getContentOverrides } from '@/lib/content'
import ProtoForgePage from './ProtoForgePage'
import GammaHero from '@/components/GammaHero'
import PromoBar from '@/components/PromoBar'

export default async function Page() {
  const overrides = await getContentOverrides()
  return (
    <>
      <PromoBar />
      <GammaHero />
      <ProtoForgePage overrides={overrides} />
    </>
  )
}
