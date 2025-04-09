'use client';

import { create } from 'zustand';

interface UiState {
	sidebarOpen: boolean;
	setSidebarOpen: (open: boolean) => void;
	awaitingResponse: boolean;
	setAwaitingResponse: (awaiting: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
	sidebarOpen: false,
	setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
	awaitingResponse: false,
	setAwaitingResponse: (awaiting: boolean) => set({ awaitingResponse: awaiting })
}));
