import { useEffect, useState } from "react";

import { IPost } from "@/types/common";
import { main } from "@/store/selectors";
import { createCommunity, getAllCommunities } from "@/api/communities";

import styles from "./CreateCommunityModal.module.scss";
import { useAppSelector } from "@/store/store";

const CreateCommunityModal = () => {
  const [state, setState] = useState({
    displayName: "",
    description: "",
    users: [],
    posts: [],
  });

  const { userDisplayName } = useAppSelector(main);

  console.log(userDisplayName);

  return (
    <div className={styles.modal_content}>
      <h1 className={styles.modal_content__h1}>Name of community</h1>
      <input
        onChange={(e) =>
          setState({
            displayName: e.target.value,
            description: state.description,
            users: [],
            posts: [],
          })
        }
      />
      <h1 className={styles.modal_content__h1}>Description of community</h1>
      <input
        onChange={(e) =>
          setState({
            displayName: state.displayName,
            description: e.target.value,
            users: [],
            posts: [],
          })
        }
      />

      <button onClick={() => createCommunity(state)}>Create</button>
    </div>
  );
};
export default CreateCommunityModal;
