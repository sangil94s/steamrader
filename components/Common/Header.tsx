import Link from 'next/link';

export default function Header() {
  return (
    <>
      <header className="w-full h-10 my-2 flex flex-row justify-between lg:w-[1920px]">
        <Link href="/" className="font-bold text-xl text-violet-500 px-4">
          Steam Rader
        </Link>
      </header>
    </>
  );
}
