import { create } from "zustand";

type SearchViewFilter = {
  cbLangTp: any;
  cbCdGbTp: any;
  stGrpNm : any;
  stCdNm  : string;
  setFilter: (filter: Partial<SearchViewFilter>) => void;
};

export const searchViewFilter = create<SearchViewFilter>((set) => ({
  cbLangTp: "",
  cbCdGbTp: "",
  stGrpNm : "",
  stCdNm  : "",
  setFilter: (filter) => set((state) => ({ ...state, ...filter })),
}));
