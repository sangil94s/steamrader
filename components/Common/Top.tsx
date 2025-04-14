// 위로가기 버튼
'use client';
import { AiFillCaretUp } from 'react-icons/ai';

export default function Top() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div onClick={scrollTop} className="fixed bottom-16 right-8 z-50 rounded-full bg-white">
        <AiFillCaretUp className="text-3xl cursor-pointer" />
      </div>
    </>
  );
}