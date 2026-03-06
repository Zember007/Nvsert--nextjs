'use client';

import Button from 'shared/ui/ui/Button';
import { useHeaderContext } from 'shared/contexts';

type OrderFormButtonProps = {
  label: string;
  wrapperClassName?: string;
};

export default function OrderFormButton({ label, wrapperClassName }: OrderFormButtonProps) {
  const { openDefaultModal } = useHeaderContext();

  return (
    <Button
      wrapperClassName={wrapperClassName}
      onClick={() => openDefaultModal('orderForm')}
      label={label}
    />
  );
}
