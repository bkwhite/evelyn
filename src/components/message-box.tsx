import { useRef } from 'react';

import { IoSend } from 'react-icons/io5';
import { useHotkeys } from 'react-hotkeys-hook';

import { promptGemini } from '@/server/actions';
import Editable from '@/components/editable';
import IconButton from '@/components//icon-button';
import { createConversation, createMessage, useChatStore } from '@/chatStore';
import { useUiStore } from '@/uiStore';

const TALK_TO_GEMINI = true;

export default function MessageBox() {
	const editorRef = useRef<HTMLPreElement>(null);

	const draft = useChatStore((state) => state.draft);
	const setDraft = useChatStore((state) => state.setDraft);
	const activeConversationId = useChatStore((state) => state.activeConversationId);
	const addConversation = useChatStore((state) => state.addConversation);
	const addMessage = useChatStore((state) => state.addMessage);
	const setAwaitingResponse = useUiStore((state) => state.setAwaitingResponse);

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

		let newConversationId: string | null = null;

		if (!activeConversationId) {
			newConversationId = addConversation(createConversation(message));
		} else {
			addMessage(activeConversationId, message);
		}

		const conversationId = activeConversationId || newConversationId;

		if (TALK_TO_GEMINI) {
			setAwaitingResponse(true);

			promptGemini(message.content)
				.then((response) => {
					if (!response) return;

					if (conversationId) {
						addMessage(conversationId, createMessage(response, 'assistant'));
					} else {
						console.error('No usable conversation ID found');
					}
				})
				.finally(() => {
					setAwaitingResponse(false);
				});
		} else {
			if (conversationId) {
				setAwaitingResponse(true);

				setTimeout(() => {
					addMessage(conversationId, createMessage('I hear you!', 'assistant'));
					setAwaitingResponse(false);
				}, 500);
			}
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

	return (
		<div className="flex flex-col c-input cursor-text p-4 m-6 mt-0 text-sm rounded-lg rounded-t-none top-shadow z-10">
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
	);
}
