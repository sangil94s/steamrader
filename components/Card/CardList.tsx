// 게임 리스트를 보여주는 컴포넌트
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineGlobal } from 'react-icons/ai';

const fetchCardList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/uses`, { cache: 'no-store' });
  if (!res.ok) throw new Error('데이터 호출 실패');
  return await res.json();
};

export interface DiscountedGame {
  id: number;
  name: string;
  headerImage: string;
  appid: number;
  discountPercent: number;
  genres: string;
  initialFormatted: string;
  finalFormatted: string;
  createDate: string;
}

export default async function CardList() {
  const CardLists = await fetchCardList();
  return (
    <div className="grid grid-cols-1 justify-items-center gap-5 lg:grid-cols-5">
      {CardLists &&
        CardLists?.data.map((item: DiscountedGame) => (
          <div
            className="border border-slate-200 rounded-lg w-max flex items-center gap-4 hover:bg-gray-400 transition lg:w-full"
            key={item.id}
          >
            <Image
              src={item.headerImage}
              width={100}
              height={100}
              alt="썸네일 이미지"
              className="m-3 rounded-2xl object-cover"
            />

            <section className="flex flex-col justify-between w-full">
              <h1 className="text-white text-center font-bold text-sm lg:text-base">{item.name}</h1>
              <div className="flex items-center text-sm gap-3 m-auto">
                <p className="text-amber-400 text-center font-bold">할인율 : {item.discountPercent} % </p>
                <p className="text-red-600 text-xs text-center font-bold">최종 가격 : {item.finalFormatted} 원</p>
                <Link
                  href={`https://store.steampowered.com/app/${item.appid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="스팀 해당 상품 페이지로 이동"
                >
                  <AiOutlineGlobal className="bg-white rounded-lg cursor-pointer" />
                </Link>
              </div>
              <div>
                <p className="text-red-600 text-xs text-center py-2">장르 : {item.genres}</p>
              </div>
            </section>
          </div>
        ))}
    </div>
  );
}
