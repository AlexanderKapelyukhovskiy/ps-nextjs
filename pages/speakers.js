import React from "react";
import axios from "axios";
import SpeakerCard from "../src/SpeakerCard";

import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

class Speakers extends React.Component {
  static GetSpeakersUrl(isServer) {
    if (process.env.NODE_ENV === "production") {
      if (isServer) {
        return process.env.RESTURL_SPEAKERS_DOCKER; //access api in docker container
      }
      return (
        process.env.RESTURL_SPEAKERS_PROD ||
        publicRuntimeConfig.RESTURL_SPEAKERS_PROD
      );
    } else {
      return process.env.RESTURL_SPEAKERS_DEV;
    }
  }

  static async getInitialProps({ req }) {
    const isServer = !!req;
    if (isServer) {
      console.log("isServer");
      const promise = axios
        .get(Speakers.GetSpeakersUrl(isServer))
        .then((response) => {
          return {
            isLoading: false,
            hasErrored: false,
            speakerData: response.data,
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
        speakerData: [...Array(5)].map((_, i) => ({
          firstName: "",
          lastName: "",
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
      speakerData: props.speakerData,
    };
  }

  componentDidMount() {
    return axios
      .get(Speakers.GetSpeakersUrl())
      .then((response) => {
        this.setState({
          isLoading: false,
          hasErrored: false,
          speakerData: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          hasErrored: true,
          isLoading: false,
          speakerData: [],
        });
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
            {this.state.speakerData.map((speaker) => (
              <div
                className="card col-4 cardmin margintopbottom20"
                key={speaker.id}
              >
                <SpeakerCard speaker={speaker} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Speakers;
