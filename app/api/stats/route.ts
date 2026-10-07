// Removed insecure http:// stats fetch (31.97.56.148:3099). No fake numbers: visitors stays null until a https source exists.
export const runtime = 'edge'
export const revalidate = 3600

export async function GET() {
  return Response.json({ visitors: null }, { status: 200 })
}
