import { useEffect, useState } from "react";

import { main } from "@/store/selectors";
import stringSimilarity from "string-similarity";
import { createCommunity, getAllCommunities } from "@/api/communities";

import styles from "./CreateCommunityModal.module.scss";
import { useAppSelector } from "@/store/store";
import Button from '@/components/common/Button';
import { useCommunities } from '@/hooks/useCommunities';

const CreateCommunityModal = ({ setCommunityModa }: any) => {
  const { handleCreateCommunity } = useCommunities()
  const { userDisplayName } = useAppSelector(main);
  const [communitiesList, setCommunitiesList] = useState<any[]>([]);
  const [state, setState] = useState({
    displayName: "",
    description: "",
    users: [`${userDisplayName}`],
    posts: [],
    creator: `${userDisplayName}`,
  });

  const isSimilar = (string1 = "", string2 = "", similarityIndex = 0.75) => {
    const [s1, s2] = [string1, string2].map((s) =>
      s.replace(/\s{2,}/g, " ").toLowerCase()
    );
    const result = stringSimilarity.compareTwoStrings(s1, s2);
    return result >= similarityIndex;
  };

  useEffect(() => {
    getAllCommunities().then((data) => {
      setCommunitiesList(data);
    });
  }, []);

  return (
    <div className={styles.modal_content}>
      <h1 className={styles.modal_content__h1}>Name of community</h1>
      <input
        onChange={(e) =>
          setState({
            displayName: e.target.value,
            description: state.description,
            users: state.users,
            posts: state.posts,
            creator: `${userDisplayName}`,
          })
        }
      />
      <h1 className={styles.modal_content__h1}>Description of community</h1>
      <input
        onChange={(e) =>
          setState({
            displayName: state.displayName,
            description: e.target.value,
            users: state.users,
            posts: state.posts,
            creator: `${userDisplayName}`,
          })
        }
      />

      <Button
        clickHandler={() => {
          if (
            communitiesList.some(({ displayName }) =>
              isSimilar(displayName?.trim(), state.displayName?.trim())
            )
          ) {
            alert("This community already exists!");
          } else if (
            state.displayName?.trim().length < 3 ||
            state.displayName?.trim().length > 40
          ) {
            alert(
              "The community name cannot be shorter than 3 and longer than 40 characters!"
            );
          } else if (state.description.length > 400) {
            alert("Description cannot be longer than 400 characters!");
          } else {
            handleCreateCommunity(state);
            // createCommunity(state);
            setCommunityModa(false);
          }
        }}
        text="Create"
      />
    </div>
  );
};
export default CreateCommunityModal;
