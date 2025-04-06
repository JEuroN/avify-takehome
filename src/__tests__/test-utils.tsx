import React from 'react';
import { render, RenderOptions, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
      toBeChecked(): R;
      toBeDisabled(): R;
    }
  }
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { ...options });

export * from '@testing-library/react';

export { customRender as render };
