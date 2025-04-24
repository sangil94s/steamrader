import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ genres: string }> }) {
  try {
    const { genres } = await params;

    let games;
    if (genres) {
      games = await prisma.game.findMany({
        where: {
          genres,
        },
      });
    } else {
      games = await prisma.game.findMany();
    }

    return NextResponse.json(games);
  } catch (e) {
    console.log(e);
  }
}
