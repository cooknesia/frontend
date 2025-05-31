import Image from "next/image";

export default function Icon() {
  return (
    <Image
      src="/favicon.png"
      alt="Icon Cooknesia"
      width={32}
      height={32}
      priority
      className="object-cover border-2 rounded-full"
    />
  );
}
