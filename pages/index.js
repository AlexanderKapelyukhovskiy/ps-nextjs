import React from "react";
import axios from "axios";
import Link from "next/link";

export default class Index extends React.Component {
  static async getInitialProps() {
    const promise = axios
      .get("http://localhost:4000/speakers")
      .then((response) => ({
        hasErrored: false,
        speakerData: response.data,
      }))
      .catch((error) => ({
        hasErrored: true,
        message: error.message,
      }));

    return promise;
  }

  constructor(props) {
    super(props);
    this.state = {
      hasErrored: props.hasErrored,
      message: props.message,
      speakerData: props.speakerData,
    };
  }

  componentDidMount() {}

  componentUnmount() {}

  render() {
    return (
      <div>
        <Link href="/sessions">
          <a>Sessions</a>
        </Link>
        <ul>
          {this.state.speakerData.map((speaker) => (
            <li key={speaker.id}>
              {speaker.firstName} {speaker.lastName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
