'use client';

import { useChatStore } from '@/chatStore';
import MenuButton from '@/components/menu-button';
import MessageInput from '@/components/message-input';
import MessageHistory from './message-history';

export default function Chat() {
	const conversations = useChatStore((state) => state.conversations);
	const activeConversationId = useChatStore((state) => state.activeConversationId);

	const activeConversation = conversations.find(
		(conversation) => conversation.id === activeConversationId
	);

	return (
		<div className={`c-main h-full flex flex-col flex-1 w-full min-w-0`}>
			<div className="flex flex-row items-center gap-3 p-5 z-10 bottom-shadow">
				<MenuButton className="block md:hidden" />
				<h2 className="text-xl font-semibold">Evelyn</h2>
			</div>

			<section className="flex flex-col flex-1 overflow-hidden md:self-center md:w-[90%] lg:w-[80%] xl:w-[70%]">
				{!activeConversation ? <h3 className="self-center mt-48 mb-3">Hi there!</h3> : null}
				{activeConversation && activeConversation.messages.length ? <MessageHistory /> : null}
				<MessageInput />
			</section>
		</div>
	);
}
