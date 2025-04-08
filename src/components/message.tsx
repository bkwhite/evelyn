import { Message as MessageType } from '@/chatStore';

type MessageProps = {
	message: MessageType;
};

export default function Message({ message }: MessageProps) {
	return (
		<div
			className={`c-surface rounded-lg p-4 flex flex-col gap-2 ${message?.sender === 'user' ? 'self-end' : 'self-start'}`}>
			<div className="flex flex-row gap-2">
				<p className="text-sm text-secondary">{message.content}</p>
			</div>
		</div>
	);
}
