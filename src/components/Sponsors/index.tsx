export default function Sponsors() {
  return (
    <section className="bg-dark-brown pb-10">
      <h1 className="font-title text-light-orange text-center text-2xl lg:text-3xl">
        Em parceria com:
      </h1>

      <div className="flex flex-col gap-4 md:flex-row px-10 mt-4">
        <div className="flex-grow hidden md:block"></div>
        <div className="w-2/3 lg:w-1/12 m-auto">
          <a href="">
            <img src="https://www.clipartmax.com/png/full/39-396725_fakery-logo-fake-company-logo-transparent.png" />
          </a>
        </div>
        <div className="w-2/3 lg:w-1/12 m-auto">
          <a href="">
            <img src="https://www.clipartmax.com/png/full/39-396725_fakery-logo-fake-company-logo-transparent.png" />
          </a>
        </div>

        <div className="flex-grow hidden md:block"></div>
      </div>
    </section>
  );
}
