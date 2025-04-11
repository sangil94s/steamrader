// 게임 리스트를 보여주는 컴포넌트
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineGlobal } from 'react-icons/ai';

const fetchCardList = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'no-store' });
  if (!res.ok) throw new Error('데이터 호출 실패');
  return res.json();
};

interface ITypes {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export default async function CardList() {
  const CardLists = await fetchCardList();

  return (
    <div className="grid grid-cols-4 justify-items-center gap-2">
      {CardLists &&
        CardLists.map((item: ITypes) => (
          <div
            className="border border-slate-200 rounded-lg w-full flex items-center gap-4 hover:bg-gray-400 transition"
            key={item.id}
          >
            <Image
              src={'/temps.png'}
              width={90}
              height={90}
              alt="썸네일 이미지"
              className="m-2 rounded-2xl object-cover"
            />

            <section className="flex flex-col justify-between m-auto">
              <h1 className="text-white text-center font-bold">게임 명 : {item.id}</h1>
              <div className="flex items-center text-sm gap-3">
                <p className="text-red-600 text-center font-bold">할인율 : 20% </p>
                <p className="text-red-600 text-center font-bold">최종 가격 : 20,000 원</p>
                <Link href="https://www.naver.com" target="_blank">
                  <AiOutlineGlobal className="bg-white rounded-lg cursor-pointer" />
                </Link>
              </div>
            </section>
          </div>
        ))}
    </div>
  );
}
