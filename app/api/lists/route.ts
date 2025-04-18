// 상품 리스트
import { bigGameAppIds } from '@/lib/BigGameList';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import pLimit from 'p-limit';

const STEAM_APP_DETAILS_URL = 'https://store.steampowered.com/api/appdetails?appids=';

export async function GET() {
  try {
    const apps = bigGameAppIds.map(appid => ({ appid }));

    const limit = pLimit(5);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const results = await Promise.all(
      apps.map(app =>
        limit(async () => {
          try {
            await new Promise(res => setTimeout(res, 150));
            const detailRes = await fetch(`${STEAM_APP_DETAILS_URL}${app.appid}&l=korean`);
            const contentType = detailRes.headers.get('content-type') || '';
            if (!detailRes.ok || (!contentType.includes('application/json') && !contentType.includes('text/plain'))) {
              console.warn(`appid 가 JSON이 아님 ${app.appid}`);
              return null;
            }

            const detailJson = await detailRes.json();
            const data = detailJson[app.appid];

            if (
              !data ||
              !data.success ||
              !data.data?.price_overview ||
              data.data?.type !== 'game' ||
              data.data.recommendations.total < 5000
            ) {
              console.log(`appid: ${app.appid} - 가격 정보 없음`);
              return null;
            }
            const price = data.data.price_overview;
            if (price.discount_percent > 15) {
              return {
                appid: app.appid,
                name: data.data.name,
                headerImage: data.data.header_image,
                discountPercent: price.discount_percent,
                initialFormatted: price.initial_formatted,
                finalFormatted: price.final_formatted,
              };
            }

            return null;
          } catch (e) {
            console.warn(`appid ${app.appid}:`, e);
            return null;
          }
        }),
      ),
    );

    const discountedGames = results.filter(Boolean) as {
      appid: number;
      name: string;
      discountPercent: number;
      headerImage: string;
      initialFormatted: string;
      finalFormatted: string;
    }[];

    await prisma.game.deleteMany({
      where: {
        createDate: {
          lt: sevenDaysAgo,
        },
      },
    });
    await prisma.game.createMany({
      data: discountedGames.map(game => ({
        appid: game.appid,
        name: game.name,
        headerImage: game.headerImage,
        discountPercent: game.discountPercent,
        initialFormatted: game.initialFormatted,
        finalFormatted: game.finalFormatted,
      })),
      skipDuplicates: true,
    });

    return NextResponse.json({ success: true, count: discountedGames.length });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Error' },
      { status: 500 },
    );
  }
}
