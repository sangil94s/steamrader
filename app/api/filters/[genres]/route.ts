import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ genres: string }> }) {
  try {
    const { genres } = await params;
    if (!genres) {
      return NextResponse.json({ error: '장르가 없습니다.' }, { status: 400 });
    }
    const data = await prisma.game.findMany({
      where: {
        genres: {
          contains: genres,
        },
      },
      orderBy: {
        createDate: 'desc',
      },
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (e) {
    console.log(e);
  }
}
