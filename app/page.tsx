import CardList from '@/components/Card/CardList';
import Sales from '@/components/News/Sales';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Home() {
  return (
    <div>
      <Sales />
      <Select>
        <SelectTrigger className="w-[180px] m-2">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      <CardList />
    </div>
  );
}
