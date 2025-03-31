export default function Sponsors() {
  return (
    <section className="bg-dark-brown pb-10">
      <h1 className="text-center font-title text-2xl text-light-orange lg:text-3xl">
        Em parceria com:
      </h1>

      <div className="mt-4 flex flex-col gap-4 px-10 md:flex-row">
        <div className="hidden flex-grow md:block"></div>
        <div className="m-auto w-2/3 lg:w-1/12">
          <a href="">
            <img src="https://www.clipartmax.com/png/full/39-396725_fakery-logo-fake-company-logo-transparent.png" />
          </a>
        </div>
        <div className="m-auto w-2/3 lg:w-1/12">
          <a href="">
            <img src="https://www.clipartmax.com/png/full/39-396725_fakery-logo-fake-company-logo-transparent.png" />
          </a>
        </div>

        <div className="hidden flex-grow md:block"></div>
      </div>
    </section>
  );
}
