import './globals.css';

import { Header } from '@/components/layout/Header';
import { ViewportHeightSync } from '@/components/layout/ViewportHeightSync';
import { Toaster } from '@/components/ui/sonner';
import { ReduxProvider } from '@/store/ReduxProvider';
import { QueryProvider } from '@/lib/QueryProvider';

import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.conflicts.today'),
  applicationName: 'Conflicts.app',
  title: {
    default: 'Conflicts.app',
    template: '%s | Conflicts.app',
  },
  description: 'Pharos is a live geopolitical intelligence dashboard for conflict tracking across events, actors, signals, briefs, and map-based analysis.',
  openGraph: {
    type: 'website',
    url: 'https://www.conflicts.today',
    siteName: 'Conflicts.app',
    title: 'Conflicts.app',
    description: 'Pharos is a live geopolitical intelligence dashboard for conflict tracking across events, actors, signals, briefs, and map-based analysis.',
    images: [
      {
        url: '/app_screenshot.png',
        width: 1920,
        height: 1080,
        alt: 'Pharos conflict intelligence map and operations dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conflicts.app',
    description: 'Pharos is a live geopolitical intelligence dashboard for conflict tracking across events, actors, signals, briefs, and map-based analysis.',
    images: ['/app_screenshot.png'],
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <QueryProvider>
            <ViewportHeightSync />
            <div className="flex flex-col min-h-0 overflow-hidden" style={{ height: 'var(--app-height)' }}>
              <Header />
              <div className="flex flex-1 min-h-0 overflow-hidden pb-[var(--safe-bottom)]">
                {children}
              </div>
            </div>
            <Toaster theme="dark" position="bottom-right" />
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
