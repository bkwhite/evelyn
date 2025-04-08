'use client';

import { useState } from 'react';

import { IoSend } from 'react-icons/io5';

import Editable from './editable';
import IconButton from './icon-button';
import { createConversation, createMessage, useChatStore } from '@/chatStore';
import MenuButton from './menu-button';

function Chat(props: { className?: string }) {
	const { className } = props;
	const [input, setInput] = useState<string>('');

	const activeConversationId = useChatStore((state) => state.activeConversationId);
	//const conversations = useChatStore((state) => state.conversations);
	//const setActiveConversationId = useChatStore((state) => state.setActiveConversationId);
	const addConversation = useChatStore((state) => state.addConversation);

	const onChange = (value: string) => {
		if (value.trim() === '') {
			setInput('');
			return;
		}

		setInput(value);
	};

	const onSend = () => {
		const message = createMessage(input, 'user');

		if (!activeConversationId) {
			addConversation(createConversation(message));
		}
	};

	return (
		<div className={`c-main p-5 ${className} overflow-y-hidden`}>
			<div className="flex flex-row items-center gap-3">
				<MenuButton className="block md:hidden" />
				<h2 className="text-xl font-semibold">Evelyn</h2>
			</div>

			<section className="h-full w-full flex flex-col justify-center items-center">
				<h3>Howdy!</h3>
				<div className="flex flex-col w-[90%] md:max-w-2xl c-input cursor-text p-4 text-sm rounded shadow">
					<Editable placeholder="What's on your mind?" content={input} onContentChange={onChange} />
					<IconButton className="self-end" elevate onClick={onSend}>
						<IoSend />
					</IconButton>
				</div>
			</section>
		</div>
	);
}

export default Chat;
