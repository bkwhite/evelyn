import { IoMenu } from 'react-icons/io5';

import { useUiStore } from '@/uiStore';
import IconButton from '@/components/icon-button';

export default function MenuButton({ className }: { className?: string }) {
	const sidebarOpen = useUiStore((state) => state.sidebarOpen);
	const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);

	return (
		<div className={className}>
			<IconButton
				onClick={() => {
					setSidebarOpen(!sidebarOpen);
				}}>
				<IoMenu />
			</IconButton>
		</div>
	);
}
