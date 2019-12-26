import React from 'react';
import axios from 'axios';
import {
  IWithSuspenseFetcherInjectedProps,
  WithSuspenseFetcher,
} from '../../decorators/with-suspense-fetcher';
import { composer } from '../../decorators/composer';

interface ITestProps extends Partial<IWithSuspenseFetcherInjectedProps> {
  name: string;
}

const fetchBuilder: (props: ITestProps) => () => Promise<any> = ({
  name,
}) => () =>
  axios.get(`http://localhost:3000/api/test/${name}`).then(({ data }) => data);

@WithSuspenseFetcher(fetchBuilder)
export class Test extends React.Component<ITestProps> {
  render() {
    return (
      <div>
        <div>my name is: {this.props.name}</div>
        <div>{this.props.fetchData.test}</div>
        <button
          onClick={() =>
            this.props.reFetch(fetchBuilder({ name: this.props.name }))
          }
        >
          Fetch
        </button>
      </div>
    );
  }
}

export const Test2 = composer()
  .withSuspenseFetcher(fetchBuilder)
  .compose(({ name, fetchData, reFetch }: ITestProps) => (
    <div>
      <div>test2 {name}</div>
      <div>{fetchData.test}</div>
      <button onClick={() => reFetch(fetchBuilder({ name }))}>Fetch</button>
    </div>
  ));
