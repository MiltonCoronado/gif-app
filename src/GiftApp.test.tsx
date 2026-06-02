import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { GifApp } from './GifApp';

describe('GifApp', () => {
  test('Should render component with defaul values', () => {
    const { container } = render(<GifApp />);

    expect(container).toMatchSnapshot();
  });
});
