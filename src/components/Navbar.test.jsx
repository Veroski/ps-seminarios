import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Navbar from './Navbar';

describe('Navbar mobile touch boundary', () => {
  it('only captures touches on visible navigation controls', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(html).toMatch(/^<div class="pointer-events-none fixed/);
    expect(html).toContain('<nav class="pointer-events-auto flex');
    expect(html).toContain('invisible opacity-0 scale-95 pointer-events-none');
  });
});
