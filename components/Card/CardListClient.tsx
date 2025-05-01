'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import GenreSelect from '../Genres/GenreSelect';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineGlobal } from 'react-icons/ai';
import NoData from '../Common/NoData';
import { fetchCardList, DiscountedGame } from '@/app/util/fetchCardList';

export default function CardListClient() {
  const [selectGenres, setSelectGenres] = useState<string | null>(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ['Cards', selectGenres],
    queryFn: () => fetchCardList(selectGenres),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      <GenreSelect onCategoryChange={setSelectGenres} />
      <div className="grid grid-cols-1 justify-items-center gap-5 lg:grid-cols-5">
        {error && <p className="text-white text-center font-bold">데이터를 불러오는 중 오류 발생: {error.message}</p>}
        {isLoading && <p className="text-white text-center font-bold">로딩중..</p>}
        {data?.data !== undefined
          ? data?.data.map((item: DiscountedGame) => {
              return (
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
                    <div className="flex items-center text-sm gap-2 m-auto">
                      <p className="text-amber-400 text-center font-bold">할인 : {item.discountPercent} % </p>
                      <p className="text-red-600 text-xs text-center font-bold">가격 : {item.finalFormatted} 원</p>
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
              );
            })
          : !isLoading && <NoData />}
      </div>
    </>
  );
}
