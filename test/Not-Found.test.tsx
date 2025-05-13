import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '../app/not-found';

describe('<NotFound />', () => {
  it('NotFound 페이지 테스트 목적 입니다, h1태그에 에러! 당신은 이 페이지에 접근할 권한이 없습니다 텍스트가 포함 되어 있는지 확인합니다.', () => {
    render(<NotFound />);
    expect(screen.getByText('에러! 당신은 이 페이지에 접근할 권한이 없습니다')).toBeInTheDocument();
  });
});
