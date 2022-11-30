import axios from "axios";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";

export const makeRequest = axios.create({
    baseURL: "http://localhost:8500/api",
    withCredentials: true,
});

export const LoadData = (identifier, url) => {
    return useQuery(identifier, () =>
        makeRequest.get(url).then((res) => {
            return res.data;
        }), {
            retry: false
        }
    );
}

export const LoadInfiniteData = (identifier, url) => {
    return useInfiniteQuery(identifier, async ({pageParam = 0}) =>
            makeRequest.get(url + "?cursor=" + pageParam).then((res) => {
                return res.data;
            }), {
            getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
            getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
        }
    );
}