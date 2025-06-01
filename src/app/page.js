import Image from "next/image";
import bg from "../../public/background/home-background.png";
import Navigation from "@/components/navigation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <Image
        priority
        sizes="100vw"
        src={bg}
        alt="background-image"
        fill
        className="-z-50 w-full h-full object-cover object-center opacity-50"
      />

      <div className="w-full h-screen">
        <Navigation />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/pearla.png"
            alt="Pearla"
            width={400}
            height={400}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </main>
  );
}
