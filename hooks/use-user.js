import { useQuery } from "react-query";
import { Auth } from "aws-amplify";

export function useUser() {
  return useQuery({
    queryKey: "user",
    queryFn: () => Auth.currentAuthenticatedUser({ bypassCache: true }),
  });
}
