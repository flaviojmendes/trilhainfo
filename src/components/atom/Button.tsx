type Props = {
  type: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  children?: React.ReactNode;
  className?: string;
};

export default function Button({ type, children, className }: Props) {
  return (
    <button className={`rounded-sm px-6 py-3 ${getClassesByType(type)} ${className}`}>
      {children}
    </button>
  );
}

function getClassesByType(type: Props['type']) {
  switch (type) {
    case 'primary':
      return 'bg-pink text-transparent hover:shadow-solid hover:bg-hover-pink transition-all focus:border-blue-focus focus:outline-blue-focus';
    case 'secondary':
      return 'bg-transparent text-pink border-pink border-2 hover:shadow-line transition-all focus:border-blue-focus focus:outline-blue-focus';
  }
}
