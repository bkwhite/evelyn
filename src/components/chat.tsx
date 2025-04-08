'use client';

import { useRef } from 'react';

import { useHotkeys } from 'react-hotkeys-hook';
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

	useHotkeys(
		'enter',
		(event) => {
			event.preventDefault();

			if (draft.trim() !== '' && !draft.trim().includes('\n')) {
				onSend();

				setTimeout(() => {
					console.log(document.activeElement);
					console.log('try to focus', editorRef);
					editorRef.current?.focus();
				}, 100);
			} else {
				//console.log(JSON.stringify(draft));
				//console.log(draft.trim() !== '');
				//console.log(!draft.includes('\n'));
			}
		},
		{ enableOnContentEditable: true },
		[draft, editorRef]
	);

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
		}, 100);
	};

	return (
		<div className={`c-main h-full flex flex-col ${className}`}>
			<div className="flex flex-row items-center gap-3 p-5">
				<MenuButton className="block md:hidden" />
				<h2 className="text-xl font-semibold">Evelyn</h2>
			</div>

			<section className="flex flex-col flex-1 overflow-hidden p-5">
				{!activeConversation ? (
					<div className="flex items-center justify-center flex-1 mt-48">
						<h3>Howdy!</h3>
					</div>
				) : null}

				<div className="flex flex-col h-full">
					{activeConversation ? (
						<div className="flex-1 overflow-y-auto">
							<div className="flex flex-col mx-auto space-y-4">
								{activeConversation.messages.map((message) => (
									<Message key={message.id} message={message} />
								))}
							</div>
						</div>
					) : null}

					<div>
						<div className="flex flex-col  mx-auto c-input cursor-text p-4 text-sm rounded shadow">
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
				</div>
			</section>
		</div>
	);
}

export default Chat;
