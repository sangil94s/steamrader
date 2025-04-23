// 아마도 게임 리스트 중 장르 기준으로 선택해서 필터링 하는 식
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function GenreSelect() {
  return (
    <>
      <Select>
        <SelectTrigger className="w-[180px] m-2">
          <SelectValue placeholder="Temp-게임 장르 별 필터" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
