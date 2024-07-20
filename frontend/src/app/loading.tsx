'use client';
import Image from '@/components/ui/image';

export default function Loading() {
  return (
    <div className="bg-brand-light w-full h-[100vh] flex items-center justify-center ">
      <div className="animate-zoom">
        <Image
          src="/images/specsource.png"
          alt="logo"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}
