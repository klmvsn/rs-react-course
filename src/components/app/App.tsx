import React from "react";
import styles from "./app.module.css";
import Search from "../search/Search";
import { ErrorBoundary } from "../errorBoundary/errorBoundary";

type Props = object;
type State = object;

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <ErrorBoundary>
        <div className={styles.app}>
          <h1>Search information about StarWars personalities</h1>
          <Search />
        </div>
      </ErrorBoundary>
    );
  }
}
