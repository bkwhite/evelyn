'use client';

import cn from 'classnames';
import { IoSettingsSharp } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa6';

import { useChatStore } from '@/chatStore';
import { useUiStore } from '@/uiStore';
import IconButton from '@/components/icon-button';
import MenuButton from '@/components/menu-button';

export default function Sidebar() {
	const activeConversationId = useChatStore((state) => state.activeConversationId);
	const conversations = useChatStore((state) => state.conversations);
	const sidebarOpen = useUiStore((state) => state.sidebarOpen);

	const onNewConversation = () => {
		useChatStore.getState().setActiveConversationId(null);
	};

	const onSwitchConversation = (conversationId: string) => {
		useChatStore.getState().setActiveConversationId(conversationId);
	};

	return (
		<div
			className={cn('c-surface fixed md:sticky md:block z-20', {
				'w-full h-full md:w-72': sidebarOpen,
				'md:w-18 hidden': !sidebarOpen
			})}>
			<nav
				className={cn('flex justify-between p-3', {
					'flex-row': sidebarOpen,
					'flex-col': !sidebarOpen
				})}>
				<MenuButton />
				<div>
					<IconButton>
						<IoSettingsSharp />
					</IconButton>
					<IconButton onClick={onNewConversation}>
						<FaPlus />
					</IconButton>
				</div>
			</nav>
			<div className={cn('p-5', { hidden: !sidebarOpen })}>
				{conversations.map((conversation) => (
					<button
						key={conversation.id}
						className={cn('c-flush p-2 rounded-lg w-full text-left', {
							active: activeConversationId === conversation.id
						})}
						onClick={() => onSwitchConversation(conversation.id)}>
						{conversation.title}
					</button>
				))}
			</div>
		</div>
	);
}
