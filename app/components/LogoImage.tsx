import Image from "next/image";
import Link from "next/link";

export default function LogoImage() {
  return (
    <Link href={"/"}>
      <Image
        className="dark:invert rounded-xl cursor-pointer"
        aria-label="로고"
        src="/logo.jpg"
        alt="로고"
        width={40}
        height={40}
        priority
      />
    </Link>
  );
}
