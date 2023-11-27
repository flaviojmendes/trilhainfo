import s from './CourseCheckbox.module.css';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '../CheckIcon';

type CourseCheckboxProps = {
  label?: string;
  checked: boolean;
  toggleChecked: (checked: boolean) => void;
  labelClassName?: string;
};

export const CourseCheckbox = ({
  label,
  checked,
  toggleChecked,
  labelClassName,
}: CourseCheckboxProps) => {
  return (
    <div className={s.CheckboxContainer}>
      <RadixCheckbox.Root
        className={s.CheckBox}
        id={label}
        checked={checked}
        onCheckedChange={toggleChecked}
      >
        <RadixCheckbox.Indicator className={s.CheckboxIndicator}>
          <CheckIcon className="stroke-box-primary" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <label className={`${s.CheckBoxLabel} ${labelClassName}`} htmlFor={label}>
          {label}
        </label>
      )}
    </div>
  );
};
