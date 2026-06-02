import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomHeader } from './CustomHeader';

describe('CustomHeader', () => {
  const title = 'miltonext';
  const description = 'thatIsMyDescription';

  test('Should render the title correctly', () => {
    render(<CustomHeader title={title} />);

    expect(screen.getByText(title)).toBeDefined();
  });

  test('Should render the description when provided', () => {
    render(<CustomHeader title={title} description={description} />);

    expect(screen.getByText(description)).toBeDefined();
    expect(screen.getByRole('paragraph')).toBeDefined();
    expect(screen.getByRole('paragraph').innerHTML).toBe(description);
  });

  test('Should not render description when not provided', () => {
    const { container } = render(<CustomHeader title={title} />);

    //para evaluar la "NO" existencia de algo el "screen" no funciona, lo adecuado es usar el "container".
    const header = container.querySelector('.content-center');

    const p = header?.querySelector('p');
    expect(p).toBeNull();
  });
});
