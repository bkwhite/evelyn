'use client';

import { useRef } from 'react';

import cn from 'classnames';
import { IoSend } from 'react-icons/io5';

import Editable from './editable';
import IconButton from './icon-button';
import { createConversation, createMessage, useChatStore } from '@/chatStore';
import MenuButton from './menu-button';
import Message from './message';

function Chat(props: { className?: string }) {
	const { className } = props;
	const editorRef = useRef<HTMLDivElement>(null);

	const draft = useChatStore((state) => state.draft);
	const setDraft = useChatStore((state) => state.setDraft);
	const activeConversationId = useChatStore((state) => state.activeConversationId);
	const conversations = useChatStore((state) => state.conversations);
	const setActiveConversationId = useChatStore((state) => state.setActiveConversationId);
	const addConversation = useChatStore((state) => state.addConversation);
	const addMessage = useChatStore((state) => state.addMessage);

	const activeConversation = conversations.find(
		(conversation) => conversation.id === activeConversationId
	);

	const onChange = (value: string) => {
		if (value.trim() === '') {
			setDraft('');
			return;
		}

		setDraft(value);
	};

	const onSend = () => {
		const message = createMessage(draft, 'user');

		if (!activeConversationId) {
			addConversation(createConversation(message));
		} else {
			addMessage(activeConversationId, message);
		}

		setTimeout(() => {
			editorRef.current?.focus();
		}, 0);
	};

	return (
		<div className={`c-main p-5 ${className}`}>
			<div className="flex flex-row items-center gap-3">
				<MenuButton className="block md:hidden" />
				<h2 className="text-xl font-semibold">Evelyn</h2>
			</div>

			<section
				className={cn('h-full w-full flex flex-col items-center', {
					'justify-center': !activeConversation,
					'justify-between': activeConversation
				})}>
				<h3 className={cn({ hidden: activeConversation })}>Howdy!</h3>

				<div className="flex flex-col w-full md:w-[90%] justify-end">
					{activeConversation &&
						activeConversation.messages.map((message) => <Message key={message.id} />)}
				</div>

				<div className="flex flex-col w-full md:w-[90%] md:max-w-2xl c-input cursor-text p-4 text-sm rounded shadow">
					<Editable
						editorRef={editorRef}
						placeholder="What's on your mind?"
						content={draft}
						onContentChange={onChange}
					/>
					<IconButton className="self-end" elevate onClick={onSend}>
						<IoSend />
					</IconButton>
				</div>
			</section>
		</div>
	);
}

export default Chat;
