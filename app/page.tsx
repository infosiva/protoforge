import { getContentOverrides } from '@/lib/content'
import ProtoForgePage from './ProtoForgePage'

export default async function Page() {
  const overrides = await getContentOverrides()
  return <ProtoForgePage overrides={overrides} />
}
