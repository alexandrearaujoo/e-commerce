'use client';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

const ThemeProvider = ({ children, ...rest }: ThemeProviderProps) => {
  return <NextThemeProvider {...rest}>{children}</NextThemeProvider>;
};

export default ThemeProvider;
