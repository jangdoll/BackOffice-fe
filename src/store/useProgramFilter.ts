import { create } from "zustand";

type ProgramFilter = {
  lng_tp: any;
  sys_biz_tp: any;
  pgm_fnc_tp: any;
  pgm_nm: string;
  setFilter: (filter: Partial<ProgramFilter>) => void;
};

export const useProgramFilter = create<ProgramFilter>((set) => ({
  lng_tp    : "",
  sys_biz_tp: "",
  pgm_fnc_tp: "",
  pgm_nm: "",
  setFilter: (filter) => set((state) => ({ ...state, ...filter })),
}));
