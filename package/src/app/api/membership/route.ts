import { NextResponse } from 'next/server'

type MembershipPayload = {
  fullName: string
  email: string
  country: string
  roleTitle: string
  organizationType: string
  organizationName: string
  professionalProfileLink: string
  areaOfExpertise: string
}

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
  const country = typeof body.country === 'string' ? body.country.trim() : ''
  const roleTitle = typeof body.roleTitle === 'string' ? body.roleTitle.trim() : ''
  const organizationType = typeof body.organizationType === 'string' ? body.organizationType.trim() : ''
  const organizationName = typeof body.organizationName === 'string' ? body.organizationName.trim() : ''
  const professionalProfileLink = typeof body.professionalProfileLink === 'string' ? body.professionalProfileLink.trim() : ''
  const areaOfExpertise = typeof body.areaOfExpertise === 'string' ? body.areaOfExpertise.trim() : ''

  if (!fullName) {
    return NextResponse.json({ success: false, message: 'Please enter your full name.' }, { status: 400 })
  }

  if (!email) {
    return NextResponse.json({ success: false, message: 'Please enter your email address.' }, { status: 400 })
  }

  if (!country) {
    return NextResponse.json({ success: false, message: 'Please enter your country.' }, { status: 400 })
  }

  if (!roleTitle) {
    return NextResponse.json({ success: false, message: 'Please select your current role / title.' }, { status: 400 })
  }

  if (!organizationType) {
    return NextResponse.json({ success: false, message: 'Please select your organization type.' }, { status: 400 })
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
    country,
    roleTitle,
    organizationType,
    organizationName,
    professionalProfileLink,
    areaOfExpertise,
  }

  try {
    // Send both the new schema and legacy fields to the Apps Script for compatibility.
    const upstreamBody = {
      ...payload,
      // Legacy keys some upstream scripts still expect
      profession: roleTitle,
      experienceLevel: '',
    }

    const upstreamResponse = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(upstreamBody),
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