import React from "react";
import ItemLayout from "./ItemLayout";
import Link from "next/link";
import Image from "next/image";

const AboutDetails = () => {
  return (
    <section className="py-20 w-full">
      <div className="grid grid-cols-12 gap-4 xs:gap-6 md:gap-8 w-full">
        {/* Hero Story Section */}
        <ItemLayout
          className={
            "col-span-full lg:col-span-8 row-span-2 flex-col items-start"
          }
        >
          <h2 className="text-xl md:text-2xl text-left w-full capitalize">
            The Light Within the Struggle
          </h2>
          <p className="font-light text-xs sm:text-sm md:text-base">
            Like pearls formed under pressure, our brightest selves often emerge 
            from life&apos;s toughest moments. At Pearla, we believe every person 
            carries an inner pearl—a core of strength that may dim through sadness, 
            mistakes, or hardship, but never disappears. 
            <br /><br />
            Just as an oyster transforms grit into iridescence, your struggles 
            have layered wisdom into your spirit. Our pearls are reminders: 
            what was once buried by doubt can be polished into resilience. 
            Each piece in our collection holds space for your story—the cracks 
            that let light in, the imperfections that make you rare.
          </p>
        </ItemLayout>

        {/* Stats */}
        <ItemLayout
          className={"col-span-full xs:col-span-6 lg:col-span-4 text-accent"}
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            1000+ <sub className="font-semibold text-base">stories renewed</sub>
          </p>
        </ItemLayout>

        <ItemLayout
          className={"col-span-full xs:col-span-6 lg:col-span-4 text-accent"}
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            2+ <sub className="font-semibold text-base">years of healing</sub>
          </p>
        </ItemLayout>

        {/* Visual Storytelling */}
        <ItemLayout className={"col-span-full sm:col-span-6 md:col-span-4 !p-0"}>
          <Image
            src="/images/pearla.png"
            alt="Raw pearl in darkness"
            width={600}
            height={400}
            className="w-full h-auto"
            priority={false}
          />
          <p className="mt-2 text-xs italic">
            &quot;Every pearl begins in darkness—just like us.&quot;
          </p>
        </ItemLayout>

        <ItemLayout className={"col-span-full md:col-span-8 !p-0"}>
          <Image
            src="/images/pearla.png"
            alt="Pearl being polished"
            width={1000}
            height={500}
            className="w-full h-auto"
            priority={false}
          />
          <p className="mt-2 text-xs italic">
            The polishing process: where pain becomes luster.
          </p>
        </ItemLayout>

        {/* Emotional Journey */}
        <ItemLayout className={"col-span-full"}>
          <h3 className="text-lg md:text-xl mb-4">Your Journey Mirrored in Pearls</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square relative">
                <Image
                  src="/images/closed-shell.png"
                  alt="Delicate pearl"
                  fill
                  className="object-contain"
                  priority={false}
                />
              </div>
              <p className="text-sm mt-2 text-center">
                <strong>Fragility:</strong> Like early pearls, we feel tender after hardship.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square relative">
                <Image
                  src="/images/semi-opened-pearl.png"
                  alt="Pearl layers under microscope"
                  fill
                  className="object-contain"
                  priority={false}
                />
              </div>
              <p className="text-sm mt-2 text-center">
                <strong>Layers:</strong> Each struggle adds depth to your inner light.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square relative">
                <Image
                  src="/images/light.png"
                  alt="Glowing pearl"
                  fill
                  className="object-contain"
                  priority={false}
                />
              </div>
              <p className="text-sm mt-2 text-center">
                <strong>Radiance:</strong> The light was always there—waiting to shine again.
              </p>
            </div>
          </div>
        </ItemLayout>

        {/* Call to Action */}
        {/* <ItemLayout className={"col-span-full md:col-span-6 !p-0"}>
          <Image
            src="/images/pearl.png"
            alt="Hands cradling a pearl"
            width={600}
            height={400}
            className="w-full h-auto"
            priority={false}
          />
        </ItemLayout> */}

        <ItemLayout className={"col-span-full md:col-span-6 !p-0"}>
          <Link href="/discover" className="w-full group">
            <div className="relative">
              <Image
                src="/images/pearla.png"
                alt="Begin your journey"
                width={600}
                height={400}
              className="w-full h-auto"
                priority={false}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-lg font-medium">
                  Find the pearl that speaks to your journey →
                </span>
              </div>
            </div>
          </Link>
          <p className="mt-4 text-center">
            Your inner light hasn&apos;t faded—it&apos;s being refined.
          </p>
        </ItemLayout>
      </div>
    </section>
  );
};

export default AboutDetails;