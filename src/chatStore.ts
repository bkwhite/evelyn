import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Message = {
	id: string;
	content: string;
	sender: 'user' | 'assistant';
	timestamp: string;
};

export type Conversation = {
	id: string;
	title: string;
	messages: Message[];
};

interface ChatState {
	draft: string;
	conversations: Conversation[];
	activeConversationId: string | null;
	setDraft: (draft: string) => void;
	setActiveConversationId: (id: string | null) => void;
	addConversation: (conversation: Conversation) => void;
	addMessage: (conversationId: string, message: Message) => void;
}

export const useChatStore = create<ChatState>()(
	persist(
		(set) => ({
			draft: '',
			conversations: [],
			activeConversationId: null,
			setDraft: (draft) => set({ draft }),
			setActiveConversationId: (id) => set({ activeConversationId: id }),
			addConversation: (conversation) =>
				set((state) => ({
					draft: '',
					conversations: [...state.conversations, conversation],
					activeConversationId: conversation.id
				})),
			addMessage: (conversationId, message) =>
				set((state) => ({
					draft: '',
					conversations: state.conversations.map((conversation) =>
						conversation.id === conversationId
							? { ...conversation, messages: [...conversation.messages, message] }
							: conversation
					)
				}))
		}),
		{
			name: 'chat-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
);

export function createConversation(message: Message): Conversation {
	return {
		id: crypto.randomUUID(),
		title:
			message.content.length <= 25 ? message.content : `${message.content.substring(0, 25)}...`,
		messages: [message]
	};
}

export function createMessage(content: string, sender: 'user' | 'assistant'): Message {
	return {
		id: crypto.randomUUID(),
		content,
		sender,
		timestamp: new Date().toISOString()
	};
}
