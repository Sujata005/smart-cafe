import { render, screen, fireEvent, act } from '@testing-library/react';
import Checkout from './Checkout';

vi.mock('../api', () => ({ apiFetch: vi.fn() }));

import { apiFetch } from '../api';

describe('Checkout page', () => {
  it('validates required fields before submit', async () => {
    const setPage = vi.fn();
    const setCart = vi.fn();
    const setOrders = vi.fn();

    render(<Checkout cart={[{ id: 1, name: 'Coffee', price: 100, qty: 1 }]} totalPrice={100} setPage={setPage} setCart={setCart} setOrders={setOrders} />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Place Order/i }));
    });

    expect(await screen.findByText(/Name must be at least 2 characters/)).toBeInTheDocument();
  });

  it('submits with valid data', async () => {
    apiFetch.mockResolvedValue({ order: { _id: '1' }, reward: null });

    const setPage = vi.fn();
    const setCart = vi.fn();
    const setOrders = vi.fn();

    render(<Checkout cart={[{ id: 1, name: 'Coffee', price: 100, qty: 1 }]} totalPrice={100} setPage={setPage} setCart={setCart} setOrders={setOrders} />);

    fireEvent.change(screen.getByPlaceholderText('Your Name'), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '1234567890' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Place Order/i }));
    });

    expect(apiFetch).toHaveBeenCalledWith('/orders', {
      method: 'POST',
      body: {
        items: [{ id: 1, name: 'Coffee', price: 100, qty: 1 }],
        total: 100,
        customerName: 'Alice',
        phone: '1234567890',
      },
    });
  });
});
