import { create } from 'zustand';

interface UiState {
	sidebarOpen: boolean;
	setSidebarOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
	sidebarOpen: true,
	setSidebarOpen: (open: boolean) => set({ sidebarOpen: open })
}));
