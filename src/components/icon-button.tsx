import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	elevate?: boolean;
};

export default function IconButton(props: Props) {
	const { elevate, className, ...rest } = props;

	return (
		<button
			className={`text-xl p-3 rounded-lg hover:bg-zinc-700 active:p-2 active:m-1 ${elevate ? 'c-elevated' : ''} ${className ? className : ''}`}
			{...rest}>
			{props.children}
		</button>
	);
}
