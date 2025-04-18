// 상품 리스트
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import pLimit from 'p-limit';

const STEAM_APP_DETAILS_URL = 'https://store.steampowered.com/api/appdetails?appids=';

export async function GET() {
  try {
    const bigGameAppIds = [
      1546990, //Grand Theft Auto: Vice City – The Definitive Edition
      12210, //Grand Theft Auto IV: The Complete Edition
      271590, // GTA5
      1174180, //Red Dead Redemption 2
      2668510, //Red Dead Redemption
      814380, //Sekiro™: Shadows Die Twice - GOTY Edition
      570940, //DARK SOULS™: REMASTERED
      374320, // DARK SOULS™ III
      236430, //DARK SOULS™ II
      1091500, //Cyberpunk 2077
      292030, //The Witcher 3: Wild Hunt
      20920, //The Witcher 2: Assassins of Kings Enhanced Edition
      20900, //The Witcher: Enhanced Edition Director's Cut
      1466860, //Age of Empires IV: Anniversary Edition
      813780, //Age of Empires II: Definitive Edition
      108600, //Project Zomboid
      728880, //Overcooked! 2
      1794680, //Vampire Survivors
      1850570, //DEATH STRANDING DIRECTOR'S CUT
      477160, //Human Fall Flat
      1086940, // Baldur's Gate 3
      2183900, // Warhammer 40,000: Space Marine 2
      2252570, // Football Manager 2024
      306130, // The Elder Scrolls® Online
      1940340, // Darkest Dungeon® II
      262060, //Darkest Dungeon®
      1245620, // Elden Ring
      582010, // Monster Hunter: World
      2246340, //Monster Hunter Wilds
      1562700, //산나비
      381210, //Dead by Daylight
      268500, //XCOM® 2
      882100, //XCOM®: Chimera Squad
      8930, //Sid Meier's Civilization® V
      289070, // Civilization VI
      1295660, //Civilization 7
      1142710, //Total War: WARHAMMER III
      594570, // Total War: WARHAMMER II
      364360, //Total War: WARHAMMER
      779340, //Total War: THREE KINGDOMS
      885970, //Total War: ROME REMASTERED
      325610, //Total War: ATTILA
      345240, //SHOGUN: Total War™ - Collection
      379430, //Kingdom Come: Deliverance
      1771300, //Kingdom Come: Deliverance II
      1693980, //Dead Space
      413150, // Stardew Valley
      1144200, //Ready or Not
      2344520, //디아블로® IV
      1222140, //Detroit: Become Human
      2208920, //Assassin's Creed Valhalla
      3159330, // Assassin's Creed Shadows
      812140, //Assassin's Creed® Odyssey
      582160, //Assassin's Creed® Origins
      242050, //Assassin’s Creed® IV Black Flag™
      2000950, // Call of Duty®: Modern Warfare®
      42700, //Call of Duty®: Black Ops
      202970, //Call of Duty®: Black Ops II
      311210, //Call of Duty®: Black Ops III
      2933620, //Call of Duty®: Black Ops 6
      10090, //Call of Duty: World at War
      7940, //Call of Duty® 4: Modern Warfare® (2007)
      10180, //Call of Duty®: Modern Warfare® 2 (2009)
      1962660, //Call of Duty®: Modern Warfare® II
      2519060, //Call of Duty®: Modern Warfare® III
      1985820, //Call of Duty®: Vanguard
      1985810, //Call of Duty®: Black Ops Cold War
      1517290, //Battlefield™ 2042
      1238810, //Battlefield™ V
      782330, //DOOM Eternal
      3017860, //DOOM: The Dark Ages
      379720, //DOOM
      601150, //Devil May Cry 5
      524220, //NieR:Automata™
      2420110, //Horizon Forbidden West™ Complete Edition
      990080, //Hogwarts Legacy
      2322010, //갓 오브 워 라그나로크
      1593500, //God of War
      1659420, //UNCHARTED™: 레거시 오브 시브즈 컬렉션
      391540, //Undertale
      1868140, //데이브 더 다이버
      201810, //Wolfenstein: The New Order
      612880, //Wolfenstein II: The New Colossus
      1147560, //Skul: The Hero Slayer
      2050650, //BIOHAZARD RE:4
      1196590, //Biohazard Village
      2124490, //SILENT HILL 2

      646570, //Slay the Spire
      287390, //Metro: Last Light Redux
      286690, //Metro 2033 Redux
      412020, //Metro Exodus
      2669410, // Metro Awakening
      2369390, //Far Cry® 6
      552520, //Far Cry® 5
      939960, //Far Cry® New Dawn
      298110, //Far Cry® 4
      220240, //Far Cry 3
      19900, //Far Cry® 2
      13520, //Far Cry®
      534380, //Dying Light 2 Stay Human: Reloaded Edition
      239140, //Dying Light
      1158310, //Crusader Kings III
      394360, //Hearts of Iron IV
      550, //Left 4 Dead 2
      435150, //Divinity: Original Sin 2 - Definitive Edition
      227300, //Euro Truck Simulator 2
      787480, //Phoenix Wright: Ace Attorney Trilogy
      1817070, //Marvel’s Spider-Man Remastered
      3061810, //용과 같이8 외전 Pirates in Hawaii
      2072450, //용과 같이8
      1235140, //용과 같이7 빛과 어둠의 행방
      653530, //Return of the Obra Dinn
    ];

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
