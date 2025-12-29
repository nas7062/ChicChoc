import Image from "next/image";

export default function LogoImage() {
  return (
    <Image
      className="dark:invert rounded-xl cursor-pointer"
      aria-label="로고"
      src="/logo.jpg"
      alt="로고"
      width={40}
      height={40}
      priority
    />
  );
}
