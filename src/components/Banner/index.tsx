import Image from "next/image";

interface BannerProps {
  banner: string;
  secondaryBanner: string;
  backgroundColor: string;
  videoUrl: string;
}

export default function Banner({
  banner,
  backgroundColor,
  videoUrl,
  secondaryBanner,
}: BannerProps) {
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
      <div className="hidden sm:block relative">
        <Image
          src={banner}
          alt="Banner"
          className="w-full max-h-[400px] bg-cover"
          width={100}
          height={50}
        />
        <div
          className="px-6 md:px-28 flex items-end pt-32 mb-16 gap-8"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundImage: `linear-gradient(to bottom, transparent 70%, ${backgroundColor} 100%)`,
          }}
        >
          <iframe
            className="aspect-video w-full h-full"
            src={videoUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
          <Image
            src={secondaryBanner}
            width={384}
            height={50}
            className="w-96 h-full"
            alt="Banner secundário"
          />
        </div>
      </div>
    </>
  );
}
