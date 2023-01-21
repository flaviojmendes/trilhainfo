import s from './Checkbox.module.css';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '../CheckIcon';

type CheckboxProps = {
  label?: string;
  checked: boolean;
  toggleChecked: (checked: boolean) => void;
  labelClassName?: string;
};

export const Checkbox = ({
  label,
  checked,
  toggleChecked,
  labelClassName,
}: CheckboxProps) => {
  return (
    <div className={s.CheckboxContainer}>
      <RadixCheckbox.Root
        className={s.CheckBox}
        id="c1"
        checked={checked}
        onCheckedChange={toggleChecked}
      >
        <RadixCheckbox.Indicator className={s.CheckboxIndicator}>
          <CheckIcon className="stroke-green" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <label className={`${s.CheckBoxLabel} ${labelClassName}`} htmlFor="c1">
          {label}
        </label>
      )}
    </div>
  );
};
