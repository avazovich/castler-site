import Image from "next/image";
import { AnimatedText } from "./AnimatedText";

export function AboutHero({ heading }: { heading: string }) {
  return (
    <section className="mx-auto max-w-[1600px] px-4 pt-20 sm:px-6">
      <div className="relative h-[70vh] min-h-[420px] w-full overflow-hidden rounded-2xl sm:h-[80vh] sm:rounded-3xl">
        <Image
          src="/projects/aboutus.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-ink/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 text-center">
          <h1 className="font-display max-w-4xl text-3xl leading-tight text-paper sm:text-5xl lg:text-6xl">
            <AnimatedText text={heading} />
          </h1>
        </div>
      </div>
    </section>
  );
}
