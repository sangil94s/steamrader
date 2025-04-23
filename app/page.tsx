import CardList from '@/components/Card/CardList';
import GenreSelect from '@/components/Genre/GenreSelect';
import Sales from '@/components/News/Sales';

export default function Home() {
  return (
    <div>
      <Sales />
      <GenreSelect />
      <CardList />
    </div>
  );
}
