import Chat from '@/components/chat';
import Sidebar from '@/components/sidebar';

export default function Home() {
	return (
		<div className="h-full flex justify-items-center font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-row w-full">
				<Sidebar />
				<Chat className="w-full min-w-0 flex-1" />
			</main>
		</div>
	);
}
