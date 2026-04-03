import { NextResponse } from 'next/server'

type MembershipPayload = {
  fullName: string
  email: string
  profession: string
  country: string
  experienceLevel: string
}

const isNonEmptyString = (value: unknown) => typeof value === 'string' && value.trim().length > 0

const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export async function POST(request: Request) {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL

  if (!scriptUrl) {
    return NextResponse.json(
      {
        success: false,
        message: 'Server is missing GOOGLE_APPS_SCRIPT_URL configuration.',
      },
      { status: 500 }
    )
  }

  let body: Partial<MembershipPayload>

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid JSON payload.' }, { status: 400 })
  }

  const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const profession = typeof body.profession === 'string' ? body.profession.trim() : ''
  const country = typeof body.country === 'string' ? body.country.trim() : ''
  const experienceLevel = typeof body.experienceLevel === 'string' ? body.experienceLevel.trim() : ''

  if (!fullName || !email || !profession || !country || !experienceLevel) {
    return NextResponse.json(
      {
        success: false,
        message: 'All fields are required.',
      },
      { status: 400 }
    )
  }

  if (!isEmailValid(email)) {
    return NextResponse.json(
      {
        success: false,
        message: 'Please enter a valid email address.',
      },
      { status: 400 }
    )
  }

  const payload: MembershipPayload = {
    fullName,
    email,
    profession,
    country,
    experienceLevel,
  }

  try {
    const upstreamResponse = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    const rawText = await upstreamResponse.text()
    let upstreamJson: { success?: boolean; message?: string } | null = null

    try {
      upstreamJson = rawText ? JSON.parse(rawText) : null
    } catch {
      upstreamJson = null
    }

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          message: upstreamJson?.message || `Apps Script HTTP error ${upstreamResponse.status}.`,
        },
        { status: 502 }
      )
    }

    if (!upstreamJson?.success) {
      const message = upstreamJson?.message || 'Apps Script did not confirm success.'

      if (message.toLowerCase().includes('duplicate')) {
        return NextResponse.json(
          {
            success: false,
            message,
          },
          { status: 409 }
        )
      }

      return NextResponse.json(
        {
          success: false,
          message,
        },
        { status: 502 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: upstreamJson.message || 'Membership registered successfully.',
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to connect to Apps Script.',
      },
      { status: 502 }
    )
  }
}