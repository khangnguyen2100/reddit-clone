import clsx from 'clsx';
import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

type Props = {
  background: 'orange' | 'blue';
  outline?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  type?: 'submit' | 'button';
};

const ButtonBg = (props: Props) => {
  const {
    background = 'orange',
    outline = false,
    children,
    className = '',
    type = 'button',
    onClick,
    loading = false,
  } = props;
  return (
    <LoadingButton
      type={type}
      size='small'
      loading={loading}
      variant='contained'
      onClick={onClick}
      className={clsx(
        'rounded-3xl !shadow-none px-10 py-2 leading-none h-fit min-h-fit font-semibold border-solid border-[1px] transition-all duration-300 ease-in-out active:scale-[1.05]',
        background === 'orange' && !outline
          ? '!bg-oran text-white border-oran hover:brightness-125'
          : background === 'blue' && !outline
          ? '!bg-blue text-white border-blue hover:brightness-125'
          : background === 'orange' && outline
          ? 'bg-transparent text-oran border-oran hover:bg-oran hover:text-white'
          : background === 'blue' && outline
          ? 'bg-transparent text-blue border-blue hover:bg-blue hover:text-white'
          : '',
        className,
      )}
    >
      {children}
    </LoadingButton>
  );
};

export default ButtonBg;
