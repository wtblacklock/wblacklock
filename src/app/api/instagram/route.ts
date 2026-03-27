import { NextResponse } from 'next/server'

const FIELDS = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp'
const LIMIT = 12

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!token) {
    return NextResponse.json({ error: 'INSTAGRAM_ACCESS_TOKEN not configured' }, { status: 503 })
  }

  const url = `https://graph.instagram.com/me/media?fields=${FIELDS}&limit=${LIMIT}&access_token=${token}`

  const res = await fetch(url, { next: { revalidate: 3600 } })

  if (!res.ok) {
    const body = await res.text()
    return NextResponse.json({ error: 'Instagram API error', detail: body }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
