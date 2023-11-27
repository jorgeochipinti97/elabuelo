import React from "react";

const page = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white h-screen ">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-zinc-900 ">
Sobre Nosotros
          </h2>
          <p className="max-w-[700px] text-zinc-500 md:text-lg lg:text-xl ">
            We are a leading firm in our industry. We have a team of
            professionals who are dedicated to providing top-notch services to
            our clients.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="space-y-4">
            <img
              alt="Team member 1"
              className="w-full h-48 object-cover rounded-lg"
              height="200"
              src="/1.png"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              width="200"
            />
            <h3 className="font-semibold text-xl text-zinc-900 ">

            </h3>

          </div>
          <div className="space-y-4">
            <img
              alt="Team member 1"
              className="w-full h-48 object-cover rounded-lg"
              height="200"
              src="/1.png"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              width="200"
            />
            <h3 className="font-semibold text-xl text-zinc-900 ">

            </h3>

          </div>
          <div className="space-y-4">
            <img
              alt="Team member 1"
              className="w-full h-48 object-cover rounded-lg"
              height="200"
              src="/1.png"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              width="200"
            />
            <h3 className="font-semibold text-xl text-zinc-900 ">

            </h3>

          </div>

        </div>
        <div className="mt-12 space-y-4 md:space-y-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-zinc-900 ">
Nuestra Historia
          </h2>
          <p className="max-w-[700px] text-zinc-500 md:text-lg lg:text-xl ">
            Since our founding in 2000, we have achieved numerous milestones and
            have continuously expanded our services.
          </p>
        </div>
      </div>
    </section>
  );
};
export default page;
