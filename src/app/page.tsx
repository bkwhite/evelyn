import Chat from '@/components/chat';
import Sidebar from '@/components/sidebar';

export default function Home() {
	return (
		<div className="h-full flex justify-items-center font-[family-name:var(--font-geist-sans)] min-h-screen">
			<main className="flex flex-row w-full h-full">
				<Sidebar />
				<Chat className="w-full min-w-0" />
			</main>
		</div>
	);
}
