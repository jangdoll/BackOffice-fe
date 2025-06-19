import { create } from 'zustand';

export interface TabInfo {
  key: string;        // 경로와 동일하게 사용 (ex: '/dashboard')
  title: string;      // 탭 제목
  path: string;       // 실제 이동 경로
}

interface TabStore {
  resetTabs: any;
  tabs: TabInfo[];
  activeKey: string;
  openTab: (tab: TabInfo) => void;
  closeTab: (key: string) => void;
  setActive: (key: string) => void;
}

export const useTabStore = create<TabStore>(set => ({
  tabs: [{ key: '/', title: 'Home', path: '/' }],
  activeKey: '/',

  openTab: tab =>
    set(state => {
      // 이미 있으면 활성화만
      if (state.tabs.find(t => t.key === tab.key)) {
        return { ...state, activeKey: tab.key };
      }
      return { ...state, tabs: [...state.tabs, tab], activeKey: tab.key };
    }),

  closeTab: key =>
    set(state => {
      const idx = state.tabs.findIndex(t => t.key === key);
      if (idx === -1) return state;
      const tabs = state.tabs.filter(t => t.key !== key);
      let activeKey = state.activeKey;
      if (activeKey === key) {
        // 닫은 탭이 현재 탭이면 바로 이전 탭으로 이동
        if (tabs.length > 0) {
          activeKey = tabs[Math.max(idx - 1, 0)].key;
        } else {
          activeKey = '';
        }
      }
      return { tabs, activeKey };
    }),

  setActive: key => set(() => ({ activeKey: key })),
  resetTabs: () =>
    set(() => ({
      tabs: [{ key: "/", title: "Home", path: "/" }],
      activeKey: "/",
    })),
}));
