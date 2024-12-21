import { render, screen } from '@testing-library/react';
import ReviewList from './ReviewList.tsx';
import { mockCommentList } from '../../mocks/storeMock.ts';


describe('Component: Loading page', () => {
  it('should render correctly', () => {
    const reviewListTestId = 'reviews-list';
    const expectedText = /Reviews/i;

    render(<ReviewList guestReview={mockCommentList}/>);

    const reviewList = screen.getByTestId(reviewListTestId);

    expect(reviewList).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();

  });
});
