import Image from "next/image";

export default function Header() {
  return (
    <div className="w-full h-full px-8 flex items-center justify-between">
      <p className="text-xl font-bold text-primary">kargakarga</p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Image
            src="/icons/bell.svg"
            width={20}
            height={20}
            alt="Picture of the author"
          />
          <Image
            src="/icons/bell.svg"
            width={20}
            height={20}
            alt="Picture of the author"
          />
        </div>
        <Image
          src="/logo/logo.svg"
          width={50}
          height={50}
          alt="Picture of the author"
        />
      </div>
    </div>
  );
}
