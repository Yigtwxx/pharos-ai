'use client';

import dynamic from 'next/dynamic';

const FullMapPage = dynamic(() => import('@/features/map/components/MapPageContent'), { ssr: false });

export function MapWidget() {
  return (
    <div className="h-full w-full">
      <FullMapPage embedded />
    </div>
  );
}
