import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="flex justify-between items-center w-full max-w-7xl px-4 mx-auto h-20">
        <Image src={"/images/logo.png"} alt="Classic Luxury Bathrooms" width={100} height={60} />

        <p className="text-xs">© 2026 Classic Luxury Bathrooms. All rights reserved.</p>
      </div>
    </footer>
  );
}
