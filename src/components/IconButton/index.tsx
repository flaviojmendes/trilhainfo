interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
};

export default function IconButton(props: IconButtonProps) {
  const {"aria-label": ariaLabel, icon, className, ...rest} = {...props}

  return (
    <button
     {...rest}
     className={`inline-flex justify-center items-center h-10 min-w-[2.5rem] bg-[#EDF2F7] hover:bg-[#E2E8F0] disabled:hover:bg-[#E2E8F0]/40 disabled:bg-[#E2E8F0]/40 disabled:cursor-not-allowed transition-colors rounded-md ${className}`}
    >
      {ariaLabel && <span className="sr-only">{ariaLabel}</span>}
      {icon}
    </button>
  )
}