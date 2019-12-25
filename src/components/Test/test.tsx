import React from 'react';
import axios from 'axios';
import {
  IWithSuspenseFetcherInjectedProps,
  WithSuspenseFetcher,
} from '../../decorators/with-suspense-fetcher';

interface ITestProps extends Partial<IWithSuspenseFetcherInjectedProps> {
  name: string;
}

const fetch = () =>
  axios.get('http://localhost:3000/api/test').then(({ data }) => data);

@WithSuspenseFetcher({ fetch })
export class Test extends React.Component<ITestProps> {
  render() {
    return (
      <div>
        <div>my name is: {this.props.name}</div>
        <div>{this.props.fetchData.test}</div>
        <button onClick={() => this.props.reFetch(fetch)}>Fetch</button>
      </div>
    );
  }
}
