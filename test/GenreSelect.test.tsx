import GenreSelect from '../components/Genres/GenreSelect';

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

describe('<GenreSelect />', () => {
  it('모든 카테고리 버튼이 렌더링되어야 한다', () => {
    const mockFn = vi.fn();
    render(<GenreSelect onCategoryChange={mockFn} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(9);

    expect(screen.getByText('전체')).toBeInTheDocument();
    expect(screen.getByText('인디')).toBeInTheDocument();
    expect(screen.getByText('액션')).toBeInTheDocument();
    expect(screen.getByText('RPG')).toBeInTheDocument();
    expect(screen.getByText('어드벤처')).toBeInTheDocument();
    expect(screen.getByText('스포츠')).toBeInTheDocument();
    expect(screen.getByText('전략')).toBeInTheDocument();
    expect(screen.getByText('시뮬레이션')).toBeInTheDocument();
    expect(screen.getByText('캐주얼')).toBeInTheDocument();
  });

  it('"전체" 버튼을 클릭하면 null로 콜백이 호출되어야 한다', () => {
    const mockFn = vi.fn();
    render(<GenreSelect onCategoryChange={mockFn} />);

    fireEvent.click(screen.getByText('전체'));
    expect(mockFn).toHaveBeenCalledWith(null);
  });

  it('각 카테고리 버튼을 클릭하면 해당 값으로 콜백이 호출되어야 한다', () => {
    const mockFn = vi.fn();
    render(<GenreSelect onCategoryChange={mockFn} />);

    fireEvent.click(screen.getByText('RPG'));
    expect(mockFn).toHaveBeenCalledWith('RPG');

    fireEvent.click(screen.getByText('액션'));
    expect(mockFn).toHaveBeenCalledWith('액션');
  });
});
