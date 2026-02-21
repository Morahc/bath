import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-svh">
      <Image
        className="animate-pulse"
        src={"/images/logo.png"}
        alt="Classic Luxury Bathrooms"
        sizes="(max-width: 110px) 100vw, (max-width: 150px) 50vw, 33vw"
        fetchPriority="high"
        width={150}
        height={61}
      />
    </div>
  );
}
