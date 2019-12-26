import React from 'react';
import axios from 'axios';
import {
  IWithSuspenseFetcherInjectedProps,
  WithSuspenseFetcher,
} from '../../decorators/with-suspense-fetcher';
import { composer } from '../../decorators/composer';

interface ITestDTO {
  test: number;
}
interface ITestProps
  extends Partial<IWithSuspenseFetcherInjectedProps<ITestDTO>> {
  name: string;
}

const initailFetchBuilder: (props: ITestProps) => () => Promise<ITestDTO> = ({
  name,
}) => () =>
  axios.get(`http://localhost:3000/api/test/${name}`).then(({ data }) => data);

@WithSuspenseFetcher(fetchBuilder)
export class Test extends React.Component<ITestProps> {
  render() {
    const anotherFetch = () =>
      axios
        .get(`http://localhost:3000/api/test/${this.props.name}`)
        .then(({ data }) => data);
    return (
      <div>
        <div>my name is: {this.props.name}</div>
        <div>{this.props.fetchData.test}</div>
        <button onClick={() => this.props.reFetch(anotherFetch)}>Fetch</button>
      </div>
    );
  }
}

export const Test2 = composer()
  .withSuspenseFetcher(initailFetchBuilder)
  .compose(({ name, fetchData, reFetch }: ITestProps) => (
    <div>
      <div>test2 {name}</div>
      <div>{fetchData.test}</div>
      <button onClick={() => reFetch(initailFetchBuilder({ name }))}>
        Fetch
      </button>
    </div>
  ));
