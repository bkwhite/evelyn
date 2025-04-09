import { useEffect, useRef } from 'react';

import { useChatStore } from '@/chatStore';
import { useUiStore } from '@/uiStore';
import Message from '@/components/message';

export default function MessageHistory() {
	const messageContainerRef = useRef<HTMLDivElement>(null);
	const awaitingResponse = useUiStore((state) => state.awaitingResponse);

	const activeConversationId = useChatStore((state) => state.activeConversationId);
	const conversations = useChatStore((state) => state.conversations);

	const activeConversation = conversations.find(
		(conversation) => conversation.id === activeConversationId
	);

	useEffect(() => {
		if (activeConversation && messageContainerRef.current) {
			const container = messageContainerRef.current;

			// Get the current scroll position and container dimensions
			const isAtBottom =
				container.scrollHeight - container.clientHeight - container.scrollTop < 100;

			if (!isAtBottom) {
				// Use requestAnimationFrame to ensure DOM is fully updated before scrolling
				requestAnimationFrame(() => {
					container.scrollTo({
						top: container.scrollHeight,
						behavior: 'smooth'
					});
				});
			}
		}
	}, [activeConversation, activeConversation?.messages]);

	return (
		<div className="flex flex-col h-full overflow-y-scroll scrollable" ref={messageContainerRef}>
			{activeConversation ? (
				<div className="flex-1 p-6">
					<div className="flex flex-col gap-4">
						{activeConversation.messages.map((message) => (
							<Message key={message.id} message={message} />
						))}
						{awaitingResponse ? (
							<Message
								message={{
									id: crypto.randomUUID(),
									content: '...',
									sender: 'assistant',
									timestamp: new Date().toISOString()
								}}
							/>
						) : null}
					</div>
				</div>
			) : null}
		</div>
	);
}
