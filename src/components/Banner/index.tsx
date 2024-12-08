import Image from "next/image";

interface BannerProps {
  banner: string;
}

export default function Banner({ banner }: BannerProps) {
  return (
    <>
      <div className="sm:hidden">
        <Image
          src={banner}
          alt="Banner"
          layout="responsive"
          width={100}
          height={50}
        />
      </div>
      <div className="hidden sm:block">
        <Image
          src={banner}
          alt="Banner"
          className="w-full max-h-[400px] bg-cover"
          width={100}
          height={50}
        />
      </div>
    </>
  );
}
