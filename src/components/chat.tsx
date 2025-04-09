'use client';

import { useEffect, useRef } from 'react';

import { useHotkeys } from 'react-hotkeys-hook';
import { IoSend } from 'react-icons/io5';

import Editable from './editable';
import IconButton from './icon-button';
import { createConversation, createMessage, useChatStore } from '@/chatStore';
import MenuButton from './menu-button';
import Message from './message';

function Chat(props: { className?: string }) {
	const { className } = props;

	const editorRef = useRef<HTMLPreElement>(null);
	const messageContainerRef = useRef<HTMLDivElement>(null);

	const draft = useChatStore((state) => state.draft);
	const setDraft = useChatStore((state) => state.setDraft);
	const activeConversationId = useChatStore((state) => state.activeConversationId);
	const conversations = useChatStore((state) => state.conversations);
	const addConversation = useChatStore((state) => state.addConversation);
	const addMessage = useChatStore((state) => state.addMessage);

	const activeConversation = conversations.find(
		(conversation) => conversation.id === activeConversationId
	);

	useHotkeys(
		'enter',
		(event) => {
			event.preventDefault();

			if (draft.trim() !== '') {
				onSend();
			}
		},
		{ enableOnContentEditable: true },
		[draft, editorRef]
	);

	// Effect to scroll to bottom when messages change - with smart scrolling behavior
	useEffect(() => {
		if (activeConversation && messageContainerRef.current) {
			const container = messageContainerRef.current;

			// Get the current scroll position and container dimensions
			const isAtBottom =
				container.scrollHeight - container.clientHeight - container.scrollTop < 100;

			// Only auto-scroll if user was already at the bottom or if it's a new message from the current user
			const messages = activeConversation.messages;
			const isNewUserMessage =
				messages.length > 0 && messages[messages.length - 1].sender === 'user';

			if (isAtBottom || isNewUserMessage) {
				// Use requestAnimationFrame to ensure DOM is fully updated before scrolling
				requestAnimationFrame(() => {
					container.scrollTo({
						top: container.scrollHeight,
						behavior: 'smooth'
					});
				});
			}
		}
	}, [activeConversation, activeConversation?.messages]); // This triggers when messages change

	const onChange = (value: string) => {
		if (value.trim() === '') {
			setDraft('');
			return;
		}

		setDraft(value);
	};

	const onSend = () => {
		if (draft === '') return;

		const message = createMessage(draft, 'user');

		if (!activeConversationId) {
			addConversation(createConversation(message));
		} else {
			addMessage(activeConversationId, message);
		}

		setTimeout(() => {
			editorRef.current?.dispatchEvent(
				new Event('submit', {
					bubbles: true
				})
			);
			editorRef.current?.blur();
			editorRef.current?.focus();
		}, 0);
	};

	return (
		<div className={`c-main h-full flex flex-col ${className}`}>
			<div className="flex flex-row items-center gap-3 p-5 z-10 bottom-shadow">
				<MenuButton className="block md:hidden" />
				<h2 className="text-xl font-semibold">Evelyn</h2>
			</div>

			<section className="flex flex-col flex-1 overflow-hidden">
				{!activeConversation ? (
					<div className="flex items-center justify-center flex-1 mt-48">
						<h3>Howdy!</h3>
					</div>
				) : null}

				<div className="flex flex-col h-full">
					{activeConversation ? (
						<div className="flex-1 overflow-y-auto p-6 scrollable" ref={messageContainerRef}>
							<div className="flex flex-col gap-4">
								{activeConversation.messages.map((message) => (
									<Message key={message.id} message={message} />
								))}
							</div>
						</div>
					) : null}

					<div className="flex flex-col c-input cursor-text p-4 m-6 mt-0 text-sm rounded top-shadow z-10">
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
				</div>
			</section>
		</div>
	);
}

export default Chat;
