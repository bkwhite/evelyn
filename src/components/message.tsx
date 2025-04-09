import cn from 'classnames';

import { Message as MessageType } from '@/chatStore';

type MessageProps = {
	message: MessageType;
};

export default function Message({ message }: MessageProps) {
	return (
		<div
			className={cn(
				'c-surface rounded-2xl p-4 w-full md:max-w-[60%] whitespace-pre-wrap break-words wrap-break-word flex flex-col gap-2',
				{
					'self-end rounded-br-none': message?.sender === 'user',
					'self-start rounded-bl-none': message?.sender === 'assistant'
				}
			)}>
			<div className="flex flex-row gap-2">
				<pre className="text-sm text-secondary">{message.content}</pre>
			</div>
		</div>
	);
}
