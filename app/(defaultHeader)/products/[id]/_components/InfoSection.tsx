import Image from "next/image";

interface Props {
  image: string;
}

export default function InfoSection({ image }: Props) {
  return <div><Image src={image} alt="이미지" width={680} height={800} /></div>
}