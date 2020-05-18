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
    const promise = axios
      .get(`${Speaker.GetSpeakerUrl(isServer)}/${query.speakerId}`)
      .then((response) => {
        return {
          hasErrored: false,
          speakerDataOne: response.data,
        };
      })
      .catch((error) => {
        return {
          hasErrored: true,
          message: error.message,
        };
      });
    return promise;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h2 className="margintopbottom20">
            {this.props.speakerDataOne.firstName}{" "}
            {this.props.speakerDataOne.lastName}
          </h2>
          <p className="margintopbottom20">{this.props.speakerDataOne.bio}</p>
        </div>
      </div>
    );
  }
}

Speaker.propTypes = {};
Speaker.defaultProps = {};

export default Speaker;
