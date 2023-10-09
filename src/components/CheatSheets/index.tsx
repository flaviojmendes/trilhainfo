import Button from '../atom/Button';

export default function CheatSheets() {
  return (
    <section className="flex w-full py-10 px-10 text-base shadow-inner xl:px-64">
      <div className="w-1/2">
        <h2 className="my-6 font-base text-5xl text-dark-pink ">Guias / Cheat Sheets</h2>
        <h3 className="font-base text-2xl text-white">Confira guias gratuitos para seus estudos</h3>
      </div>
      <div className="flex w-1/2">
        <Button type="secondary" className="m-auto h-16 w-full">
          ver guias
        </Button>
      </div>
    </section>
  );
}
