// Nodata 컴포넌트를 테스트합니다.
import NoData from '../components/Common/NoData';

import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('<NoData />', () => {
  it('NoData 컴포넌트 테스트 목적 입니다, h1의 상품 없음을 알리는 텍스트가 나오는지 확인합니다', () => {
    render(<NoData />);
    expect(screen.getByText('상품 리스트가 없어요!')).toBeInTheDocument();
  });
});
