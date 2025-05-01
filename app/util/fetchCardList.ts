export const fetchCardList = async (genres: string | null) => {
  const url = genres
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/filters/${genres}`
    : `${process.env.NEXT_PUBLIC_SITE_URL}/api/uses`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('데이터 호출 실패');
  return res.json();
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
