// 게임 리스트를 보여주는 컴포넌트
import { AiOutlineGlobal } from "react-icons/ai";
const fetchCardList = async () => {
	const res = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'no-store' });
	if (!res.ok) throw new Error('데이터 호출 실패');
	return res.json();
};

interface ITypes {
	userId: number
	id: number
	title: string;
	body: string
}
export default async function CardList () {
	const CardLists = await fetchCardList()

	return (
		<div className="grid grid-cols-4 justify-items-center gap-2">
			{CardLists && CardLists.map((item:ITypes) => (
				<div className="border border-slate-200 rounded-lg w-full h-24" key={item.id}>
					<h1 className="text-white text-center font-bold p-2">게임 명 : {item.id}</h1>

					<section className="flex flex-row justify-center items-center gap-2">
						<p className="text-red-600 font-bold">할인율 : 20% </p>
						<p className="text-red-600 font-bold">최종 가격 : 20,000 원</p>
						<AiOutlineGlobal className="bg-white rounded-lg" />
					</section>
				</div>
			))}
		</div>
	)
}
