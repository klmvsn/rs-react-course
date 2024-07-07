import React from "react";
import styles from "./search.module.css";
import { TPerson } from "../../utils/types.ts";
import SearchResult from "../searchResult/searchResult";

type Props = object;
type State = {
  search: TPerson[];
  userRequest: string;
  query: string;
  clickOnError: boolean;
};

export default class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      search: [],
      userRequest: "",
      query: "",
      clickOnError: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    localStorage.setItem("prevQuery", "");
  }

  componentWillUnmount() {
    localStorage.clear();
  }

  async fetchData() {
    return fetch(
      `https://swapi.dev/api/people?search=${this.state.userRequest}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((res) => res.json())
      .then((res) => this.setState({ search: res.results }))
      .then(() => localStorage.setItem("prevQuery", this.state.userRequest))
      .then(() => this.setState({ query: this.state.userRequest }))
      .catch(() => {
        throw new Error("API ERROR");
      });
  }

  handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ userRequest: evt.target.value.trim() });
  };

  handleSubmit = async (evt: React.FocusEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (this.state.userRequest !== localStorage.getItem("prevQuery")) {
      this.fetchData();
    }
  };

  handleClick = () => {
    this.setState({ clickOnError: true });
  };

  render() {
    if (this.state.clickOnError) {
      throw new Error("Error by click");
    }
    return (
      <>
        <form className={styles.search} onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.userRequest}
            className={styles.searchInput}
            onChange={this.handleChange}
            placeholder="search"
          ></input>
          <input type="submit" value="Search" />
        </form>
        <button onClick={this.handleClick}>Error</button>
        <SearchResult result={this.state.search} />
      </>
    );
  }
}
