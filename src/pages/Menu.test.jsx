import { render, screen, fireEvent } from '@testing-library/react';
import Menu from './Menu';

describe('Menu page', () => {
  it('fires addToCart for clicked item', () => {
    const addToCart = vi.fn();
    render(<Menu addToCart={addToCart} />);

    const button = screen.getAllByRole('button', { name: /Add to Cart/i })[0];
    fireEvent.click(button);

    expect(addToCart).toHaveBeenCalledTimes(1);
  });
});
