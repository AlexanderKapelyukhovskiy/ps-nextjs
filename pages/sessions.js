import React from "react";
import axios from "axios";
import SessionCard from "../src/SessionCard";
import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

class Sessions extends React.Component {
  static GetSessionsUrl(isServer) {
    console.log(isServer);
    if (process.env.NODE_ENV === "production") {
      if (isServer) {
        return process.env.RESTURL_SESSIONS_DOCKER; //access api in docker container
      }
      return (
        process.env.RESTURL_SESSIONS_PROD ||
        publicRuntimeConfig.RESTURL_SESSIONS_PROD
      );
    } else {
      return process.env.RESTURL_SESSIONS_DEV;
    }
  }

  static async getInitialProps({ req }) {
    const isServer = !!req;
    if (isServer) {
      const promise = axios
        .get(Sessions.GetSessionsUrl(isServer))
        .then((response) => {
          return {
            hasErrored: false,
            sessionData: response.data,
          };
        })
        .catch((error) => {
          return {
            hasErrored: true,
            message: error.message,
          };
        });
      return promise;
    } else {
      return {
        sessionData: [...Array(5)].map((_, i) => ({
          title: "",
          id: i,
        })),
        isLoading: true,
      };
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: props.isLoading,
      hasErrored: props.hasErrored,
      message: props.message,
      sessionData: props.sessionData,
    };
  }

  componentDidMount() {
    axios
      .get(Sessions.GetSessionsUrl())
      .then((response) => {
        this.setState({
          isLoading: false,
          hasErrored: false,
          sessionData: response.data,
        });
      })
      .catch((error) => {
        return {
          isLoading: false,
          hasErrored: true,
          message: error.message,
          sessionData: [],
        };
      });
  }

  componentWillUnmount() {}

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="card-deck">
            {this.state.sessionData.map((session) => (
              <div
                className="card col-4 cardmin margintopbottom"
                key={session.id}
              >
                <SessionCard session={session} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Sessions;
