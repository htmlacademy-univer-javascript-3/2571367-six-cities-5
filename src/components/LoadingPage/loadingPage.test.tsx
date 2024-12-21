import { render, screen } from '@testing-library/react';
import LoadingPage from './LoadingPage.tsx';

describe('Component: Loading page', () => {
  it('should render correctly', () => {
    const spinnerContainerTestId = 'spinner-container';
    const spinnerTestId = 'spinner';

    render(<LoadingPage />);
    const spinnerContainer = screen.getByTestId(spinnerContainerTestId);
    const spinner = screen.queryByTestId(spinnerTestId);

    expect(spinnerContainer).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
  });
});
