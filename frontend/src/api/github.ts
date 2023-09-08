import { useEffect, useState } from "react";

export function useGithub(repoName: string) {
    const [repos, setRepos] = useState<any>(undefined);

    useEffect(() => {
        fetch(
            `https://api.github.com/search/repositories?q=${repoName}`
        ).then(
            (response) => response.json()
        ).then(data => {
            setRepos(data);
        }).catch((e) => {
            console.error(e);
        }).finally(() => {
            console.log('done');
        })
    }, [repoName]);

  return repos;
}