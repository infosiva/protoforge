import { getContentOverrides } from '@/lib/content'
import ProtoForgePage from './ProtoForgePage'
import GammaHero from '@/components/GammaHero'

export default async function Page() {
  const overrides = await getContentOverrides()
  return (
    <>
      <GammaHero />
      <ProtoForgePage overrides={overrides} />
    </>
  )
}
