import { create } from 'zustand';

type Message = {
	content: string;
	sender: 'user' | 'assistant';
	timestamp: string;
};

type Conversation = {
	id: string;
	title: string;
	messages: Message[];
};

interface ChatState {
	conversations: Conversation[];
	activeConversationId: string | null;
	setActiveConversationId: (id: string | null) => void;
	addConversation: (conversation: Conversation) => void;
	addMessage: (conversationId: string, message: Message) => void;
}

export const useChatStore = create<ChatState>((set) => ({
	conversations: [],
	activeConversationId: null,
	setActiveConversationId: (id) => set({ activeConversationId: id }),
	addConversation: (conversation) =>
		set((state) => ({
			conversations: [...state.conversations, conversation],
			activeConversationId: conversation.id
		})),
	addMessage: (conversationId, message) =>
		set((state) => ({
			conversations: state.conversations.map((conversation) =>
				conversation.id === conversationId
					? { ...conversation, messages: [...conversation.messages, message] }
					: conversation
			)
		}))
}));

export function createConversation(message: Message): Conversation {
	return {
		id: crypto.randomUUID(),
		title: `${message.content.substring(0, 20)}...`,
		messages: [message]
	};
}

export function createMessage(content: string, sender: 'user' | 'assistant'): Message {
	return {
		content,
		sender,
		timestamp: new Date().toISOString()
	};
}
