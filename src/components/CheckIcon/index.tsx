import { motion } from 'framer-motion';

type CheckIconProps = {
  className?: string;
};

export const CheckIcon = ({ className }: CheckIconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-4 w-4 fill-none stroke-[3] ${className}`}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
};
