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
      <DrawerOverlay className="fixed inset-0 z-30 h-screen w-screen bg-[#000000]/90 data-[state='closed']:animate-fadeOut data-[state='open']:animate-fadeIn" />
      <DrawerContent
        className={`fixed bottom-0 top-0 z-30 h-screen w-full  bg-box-primary px-6 py-4 duration-1000 sm:w-3/5 lg:w-2/5 ${open} ${close} ${
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

        <DrawerClose className="absolute right-3.5 top-3.5 rounded-sm bg-primary p-1 hover:bg-primary-hover hover:shadow-primary-white">
          <RiCloseLine size={24} />
        </DrawerClose>
      </DrawerContent>
    </DrawerPortal>
  );
};
