import { ButtonHTMLAttributes } from 'react';

import cn from 'classnames';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	elevate?: boolean;
};

export default function IconButton({ elevate, className, children, ...rest }: IconButtonProps) {
	return (
		<button
			className={cn(
				'text-xl',
				'p-3',
				'rounded-lg',
				'hover:bg-zinc-700',
				'active:p-2',
				'active:m-1',
				elevate && 'c-elevated',
				className
			)}
			{...rest}>
			{children}
		</button>
	);
}
