import clsx from 'clsx';
import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from 'next/link';
type Props = {
  color: 'orange' | 'blue';
  outline?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  type?: 'submit' | 'button';
  disabled?: boolean;
  animation?: boolean;
  href?: string;
};

const ButtonBg = (props: Props) => {
  const {
    color = 'orange',
    outline = false,
    children,
    className = '',
    type = 'button',
    onClick,
    loading = false,
    disabled = false,
    animation = false,
    href = '',
  } = props;
  return (
    <LoadingButton
      type={type}
      size='small'
      loading={loading}
      disabled={disabled}
      variant='contained'
      onClick={onClick}
      className={clsx(
        'h-fit min-h-fit rounded-3xl border-[1px] border-solid px-4 py-2 font-semibold leading-none !shadow-none transition-all duration-300 ease-in-out active:scale-[1.05]',
        // have bg
        color === 'orange' && !outline
          ? 'border-oran !bg-oran text-white hover:brightness-125'
          : color === 'blue' && !outline
          ? 'border-blue !bg-blue text-white hover:brightness-125'
          : // bg transparent and have animation change bg color when hover
          color === 'orange' && outline && animation
          ? 'border-oran bg-transparent text-oran hover:bg-oran hover:text-white'
          : color === 'blue' && outline && animation
          ? 'border-blue bg-transparent text-blue hover:bg-blue hover:text-white'
          : // bg transparent and does not have animation
          color === 'orange' && outline && !animation
          ? 'border-oran !bg-transparent text-oran'
          : color === 'blue' && outline && !animation
          ? 'border-blue !bg-transparent text-blue'
          : '',
        className,
      )}
    >
      {href ? <Link href={href}>{children}</Link> : children}
    </LoadingButton>
  );
};

export default ButtonBg;
