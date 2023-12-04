import axios from "axios";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import imageCompression from "browser-image-compression";

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

export const Upload = async (file) => {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }

    try {
        const compressedFile = await imageCompression(file, options);

        const formData = new FormData();
        formData.append("file", compressedFile);

        const res = await makeRequest.post("/upload", formData);
        return res.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}