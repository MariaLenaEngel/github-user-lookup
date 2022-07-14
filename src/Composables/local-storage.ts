import { ref } from "vue";

export type repo = {
  name: string;
  full_name: string;
  owner: {
    login: string;
  };
};

const STORAGE_KEY = "ghFinderLikes";
export const repoLikeCount = ref(0);

export const useGetLocalStorage = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");

export const useSetLocalStorage = <T>(data: T) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

export const useLocalStorage = () => {
  const repoLikeMap = ref<{ [key: string]: repo }>(useGetLocalStorage());
  repoLikeCount.value = Object.keys(repoLikeMap.value).length;

  const useSaveLike = (repo: repo) => {
    const existingRepos = useGetLocalStorage();
    const dataToBeUpdate = {
      ...existingRepos,
      [`${repo.owner.login}_${repo.name}`]: {
        name: repo.name,
        full_name: repo.full_name,
        owner: { login: repo.owner.login },
      },
    };

    useSetLocalStorage(dataToBeUpdate);
    repoLikeCount.value += 1;
    repoLikeMap.value = dataToBeUpdate;
  };

  const useRemoveLike = (repoOwnerLoginAndName: string) => {
    const existingRepos = useGetLocalStorage();
    delete existingRepos[repoOwnerLoginAndName];
    useSetLocalStorage(existingRepos);
    repoLikeCount.value -= 1;
    repoLikeMap.value = existingRepos;
  };

  return { useSaveLike, useRemoveLike, repoLikeMap, repoLikeCount };
};
