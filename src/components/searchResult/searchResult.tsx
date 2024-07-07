import React from "react";
import styles from "./searchResult.module.css";
import { TPerson } from "../../utils/types";

type Props = {
  result: TPerson[];
};
type State = {
  value: TPerson[];
};

export default class SearchResult extends React.Component<Props, State> {
  render() {
    const { result } = this.props;
    return (
      <ul className={styles.resultField}>
        {result.map(
          (item: { name: string; birth_year: string; gender: string }) => (
            <li key={item.name}>
              <h2>{item.name}</h2>
              <p>{`Birth year: ${item.birth_year}`}</p>
              <p>{`Gender: ${item.gender}`}</p>
            </li>
          ),
        )}
      </ul>
    );
  }
}
