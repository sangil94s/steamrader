// Sales.tsx를 테스트 하는 목적

import Sales from '../components/News/Sales';

import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('<Sales />', () => {
  it('Sales 컴포넌트 테스트 목적 입니다, p태그에 임박한 할인 일정 텍스트가 포함 되어 있는지 확인합니다.', () => {
    render(<Sales />);
    expect(screen.getByText(/임박한 할인 일정/)).toBeInTheDocument();
  }); // 정규식으로 임박한 할인 일정이 컴포넌트에 포함될 경우 통과 처리함
});
