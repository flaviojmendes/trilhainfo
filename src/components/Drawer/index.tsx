import * as RadixDialog from '@radix-ui/react-dialog';
import { RiCloseLine } from 'react-icons/ri';

export const DrawerRoot = RadixDialog.Root;
export const DrawerTitle = RadixDialog.Title;
export const DrawerDescription = RadixDialog.Description;
export const DrawerClose = RadixDialog.Close;
export const DrawerTrigger = RadixDialog.Trigger;

const DrawerContent = RadixDialog.Content;
const DrawerOverlay = RadixDialog.Overlay;
const DrawerPortal = RadixDialog.Portal;

type Positions = 'right' | 'left';

type DrawerProps = {
  children: React.ReactNode;
  position?: Positions;
  lastSelectedElement?: HTMLElement | null;
};

const animationByPosition = (position: Positions) => {
  if (position === 'right') {
    return {
      open: 'data-[state="open"]:animate-slideInLeft',
      close: 'data-[state="closed"]:animate-slideOutLeft',
    };
  }

  return {
    open: 'data-[state="open"]:animate-slideInRight',
    close: 'data-[state="closed"]:animate-slideOutRight',
  };
};

export const Drawer = ({
  children,
  position = 'right',
  lastSelectedElement: lastClickedElement,
}: DrawerProps) => {
  const { open, close } = animationByPosition(position);
  const isRight = position === 'right';

  return (
    <DrawerPortal>
      <DrawerOverlay className="fixed inset-0 z-40 h-screen w-screen bg-[#0c090b]/80 backdrop-blur-sm data-[state='closed']:animate-fadeOut data-[state='open']:animate-fadeIn" />
      <DrawerContent
        className={`fixed bottom-0 top-0 z-40 h-screen w-full overflow-y-auto bg-[#151821] px-6 py-4 text-text-primary duration-1000 sm:w-3/5 lg:w-2/5 ${open} ${close} ${
          isRight ? 'right-0' : 'left-0'
        }`}
        onCloseAutoFocus={(e) => {
          if (lastClickedElement) {
            e.preventDefault();
            lastClickedElement?.focus();
          }
        }}
      >
        {children}

        <DrawerClose
          aria-label="Fechar painel"
          className="absolute right-3.5 top-3.5 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/10 p-1 text-text-primary transition-colors hover:bg-white/10"
        >
          <RiCloseLine size={24} />
        </DrawerClose>
      </DrawerContent>
    </DrawerPortal>
  );
};
