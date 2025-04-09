'use client';

import { useEffect } from 'react';

import { useUiStore } from '@/uiStore';
import Chat from '@/components/chat';
import Sidebar from '@/components/sidebar';

export default function Home() {
	const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);

	useEffect(() => {
		if (window.innerWidth > 640) {
			setSidebarOpen(true);
		}
	});

	return (
		<div className="h-screen flex overflow-hidden font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-row w-full h-full overflow-hidden">
				<Sidebar />
				<Chat />
			</main>
		</div>
	);
}
