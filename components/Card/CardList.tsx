// 게임 리스트를 보여주는 컴포넌트
import { fetchCardList } from '@/app/util/fetchCardList';
import CardListClient from './CardListClient';
import getQueryClient from '@/app/util/getQueryClient';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function CardList() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['Cards', null],
    queryFn: () => fetchCardList(null),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CardListClient />
      </HydrationBoundary>
    </>
  );
}
