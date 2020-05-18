import React, { Component } from "react";
import axios from "axios";
import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

class Speaker extends Component {
  static GetSpeakerUrl(isServer) {
    if (process.env.NODE_ENV === "production") {
      if (isServer) {
        return process.env.RESTURL_SPEAKER_DOCKER; //access api in docker container
      }
      return (
        process.env.RESTURL_SPEAKER_PROD ||
        publicRuntimeConfig.RESTURL_SPEAKER_PROD
      );
    } else {
      return process.env.RESTURL_SPEAKER_DEV;
    }
  }

  static async getInitialProps({ query, req }) {
    const isServer = !!req;
    if (isServer) {
      const promise = axios
        .get(`${Speaker.GetSpeakerUrl(isServer)}/${query.speakerId}`)
        .then((response) => {
          return {
            speakerId: query.speakerId,
            hasErrored: false,
            speakerDataOne: response.data,
          };
        })
        .catch((error) => {
          return {
            speakerId: query.speakerId,
            hasErrored: true,
            message: error.message,
          };
        });
      return promise;
    } else {
      return {
        speakerId: query.speakerId,
        speakerDataOne: {},
        isLoading: true,
      };
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      speakerId: props.speakerId,
      isLoading: props.isLoading,
      hasErrored: props.hasErrored,
      message: props.message,
      speakerDataOne: props.speakerDataOne,
    };
  }

  componentDidMount() {
    console.log(this.state.speakerId);
    axios
      .get(`${Speaker.GetSpeakerUrl()}/${this.state.speakerId}`)
      .then((response) => {
        this.setState({
          speakerId: this.state.speakerId,
          isLoading: false,
          hasErrored: false,
          speakerDataOne: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          speakerId: this.props.speakerId,
          isLoading: false,
          hasErrored: true,
          message: error.message,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="container">
        <div className="row">
          <h2 className="margintopbottom20">
            {this.state.speakerDataOne.firstName}{" "}
            {this.state.speakerDataOne.lastName}
          </h2>
          <p
            className="margintopbottom20"
            dangerouslySetInnerHTML={{ __html: this.state.speakerDataOne.bio }}
          ></p>
        </div>
      </div>
    );
  }
}

Speaker.propTypes = {};
Speaker.defaultProps = {};

export default Speaker;
