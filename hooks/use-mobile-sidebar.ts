import { create } from 'zustand';

type MobileSidebarStore = {
  isOpen: boolean; //state
  onOpen: () => void; //action
  onClose: () => void; //action
};

export const useMobileSidebar = create<MobileSidebarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
