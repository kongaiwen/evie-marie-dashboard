import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, message } = body;

    if (!title || !message) {
      return NextResponse.json(
        { error: 'title and message required' },
        { status: 400 }
      );
    }

    // Call Moshi webhook as specified in CLAUDE.md
    const webhookResponse = await fetch(
      'https://api.getmoshi.app/api/webhook',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: 'uSHsgGPKtnpGWoMmeF0P3tXplQmcZmXS',
          title,
          message,
        }),
      }
    );

    if (!webhookResponse.ok) {
      throw new Error('Webhook request failed');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      {
        error: 'Failed to send notification',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
