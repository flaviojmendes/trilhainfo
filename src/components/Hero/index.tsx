export default function Hero() {
  return (
    <section className="mx-0 mb-10 flex w-full items-stretch justify-center gap-4 py-16 px-10 xl:px-64">
      <article className="flex w-full py-2 md:py-10">
        <div className="w-2/3">
          <h1 className="font-base text-8xl font-light text-white">
            <span className="text-pink">Trilhe</span> sua carreira como dev
          </h1>
          <h3 className="mt-4 font-base text-xl font-light text-dark-pink">
            Trilhas de estudo gratuitas para você
          </h3>
        </div>
        <div className="w-1/3 flex-col">
          <img className="bg-gradient-to-r from-black" src="hero-bg.png" alt="hero" />
          <h3 className="mt-4 w-fit bg-gradient-to-r from-transparent to-light-gray py-1 px-2 text-lg text-blue">
            Mais de 30.000 pessoas já acessaram
          </h3>
        </div>
      </article>
    </section>
  );
}
