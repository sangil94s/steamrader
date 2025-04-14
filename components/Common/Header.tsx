import Link from 'next/link';

export default function Header() {
  return (
    <>
      <header className="w-full border-b-2 border-slate-300 h-10 my-2 flex flex-row justify-between">
        <Link href="/" className="font-bold text-xl text-violet-500">
          ProjectLogo
        </Link>

        <section>
          <Link href="/about" className="font-bold text-violet-500 text-sm px-4 cursor-pointer">
            공지사항
          </Link>
        </section>
      </header>
    </>
  );
}
