import classNames from 'classnames';

import { Message as MessageType } from '@/chatStore';

type MessageProps = {
	message: MessageType;
};

export default function Message({ message }: MessageProps) {
	const isUser = message?.sender === 'user';
	const isAssistant = message?.sender === 'assistant';

	return (
		<div
			className={classNames(
				'c-surface',
				'rounded-2xl',
				'p-4',
				'w-fit',
				'md:max-w-[60%]',
				'whitespace-pre-wrap',

				'flex',
				'flex-col',
				'gap-2',
				{
					'c-surface self-end rounded-br-none': isUser,
					'c-elevated self-start rounded-bl-none': isAssistant
				}
			)}>
			<div className="flex flex-row gap-2">
				<pre className="text-sm text-secondary">{message.content}</pre>
			</div>
		</div>
	);
}
