import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Image src="/logo.png" alt="logo" width={100} height={100} />
    </div>
  );
}
