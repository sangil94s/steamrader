import Link from 'next/link';
// 프로젝트 공지 관련 이미지 등 을 배치하는 목적

export default function page() {
  return (
    <div className="w-full h-max flex flex-col justify-center items-center">
      <h1 className="text-red-600 text-2xl text-center font-bold">사이트 이용 참고</h1>

      <p className="text-white font-bold py-4">다음의 사례는 등장하지 않습니다</p>

      <p className="text-white font-bold py-4">1. PUBG처럼 무료인 경우</p>
      <p className="text-white font-bold py-4">2. 태그에 선정적 이 존재할 경우</p>
      <Link href="https://store.steampowered.com/charts/topselling/KR" target="_blank" className="text-white font-bold">
        {' '}
        🌐 기준은 여기를 참고합니다 [링크 : 바로 가기]
      </Link>
    </div>
  );
}
