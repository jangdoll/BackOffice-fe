// hooks/useApiMutation.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useApiMutation<T = any, P = any>(url: string, method: "POST" | "GET" = "POST") {
  return useMutation<T, Error, P>({
    mutationFn: (params) =>
      axios({ url, method, data: params }).then(res => res.data)
  });
}
