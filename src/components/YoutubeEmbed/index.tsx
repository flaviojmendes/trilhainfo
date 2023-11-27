type Props = {
  embedId: string;
};

export default function YoutubeEmbed({ embedId }: Props) {
  return (
    <div className="mx-auto flex h-full">
      <iframe
        className="aspect-video h-96"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}
