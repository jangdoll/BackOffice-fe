// hooks/useCommonCode.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCommonCode(com_grp_cd: string) {
  return useQuery({
    queryKey: ["commonCode", com_grp_cd],
    queryFn: async () => {
      // 실제 요청 URL/방식 맞게 조정
      const url =
        com_grp_cd.startsWith("Z")
          ? "/api/bacm90900/getTotCommonCode"
          : "/api/bacm90900/getCommonCode";
      const res = await axios.post(url, { com_grp_cd });
      return res.data;
    }
  });
}
