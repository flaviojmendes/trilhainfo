import Button from '../components/atom/Button';

export default function SystemDesignPage() {
  return (
    <>
      <div className="mx-10 mt-10 flex gap-2">
        <div className="w-1/4">
          <Button type="primary">Primário</Button>
        </div>
        <div className="w-1/4">
          <Button type="secondary">Secundário</Button>
        </div>
      </div>
    </>
  );
}
