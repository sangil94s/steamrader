'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '../ui/badge';

interface FilterProps {
  onCategoryChange: (category: string | null) => void;
}

export default function GenreSelect({ onCategoryChange }: FilterProps) {
  const categories = ['인디', '액션', 'RPG', '어드벤처', '스포츠', '전략', '시뮬레이션', '캐주얼'];

  return (
    <div className="m-1">
      <Badge className="cursor-pointer" onClick={() => onCategoryChange(null)}>
        전체
      </Badge>
      {categories.map(categoriese => (
        <Badge className="cursor-pointer" key={categoriese} onClick={() => onCategoryChange(categoriese)}>
          {categoriese}
        </Badge>
      ))}
    </div>
  );
}
