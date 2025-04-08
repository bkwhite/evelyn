'use client';

import cn from 'classnames';
import { IoSettingsSharp } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa6';

import { useChatStore } from '@/chatStore';
import { useUiStore } from '@/uiStore';
import IconButton from '@/components/icon-button';
import MenuButton from '@/components/menu-button';

export default function Sidebar() {
	const conversations = useChatStore((state) => state.conversations);
	const sidebarOpen = useUiStore((state) => state.sidebarOpen);

	return (
		<div
			className={cn('c-surface fixed md:sticky md:block', {
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
					<IconButton>
						<FaPlus />
					</IconButton>
				</div>
			</nav>
			<div className={cn('p-7', { hidden: !sidebarOpen })}>
				{conversations.map((conversation) => (
					<div key={conversation.id}>{conversation.title}</div>
				))}
			</div>
		</div>
	);
}
