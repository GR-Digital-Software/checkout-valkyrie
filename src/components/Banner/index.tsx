import Image from 'next/image';

export default function Banner() {
    return (
        <>
            <div className="sm:hidden">
                <Image
                    src="/checkout/banner-mobile.svg"
                    alt="Banner"
                    layout="responsive"
                    width={100}
                    height={50}
                />
            </div>
            <div className="hidden sm:block">
                <Image
                    src="/checkout/banner-desktop.svg"
                    alt="Banner"
                    layout="responsive"
                    width={100}
                    height={50}
                />
            </div>
        </>
    );
}
