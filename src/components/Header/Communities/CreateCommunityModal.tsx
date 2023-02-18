import { createCommunity, getAllCommunities } from "@/api/communities";
import { useEffect, useState } from "react";
import styles from "./CreateCommunityModal.module.scss";

const CreateCommunityModal = () => {
  const [array, setArray] = useState<any[]>([]);
  const [state, setState] = useState({
    displayName: "",
    description: "",
  });
  useEffect(() => {
    getAllCommunities().then((data) => {
      setArray(data);
    });
  }, []);

  console.log(array);

  return (
    <div className={styles.modal_content}>
      <h1 className={styles.modal_content__h1}>Name of community</h1>
      <input
        onChange={(e) =>
          setState({
            displayName: e.target.value,
            description: state.description,
          })
        }
      />
      <h1 className={styles.modal_content__h1}>Description of community</h1>
      <input
        onChange={(e) =>
          setState({
            displayName: state.displayName,
            description: e.target.value,
          })
        }
      />

      <button onClick={() => createCommunity(state)}>Create</button>
    </div>
  );
};
export default CreateCommunityModal;
