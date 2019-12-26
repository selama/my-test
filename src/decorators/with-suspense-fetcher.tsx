import * as React from 'react';

const getSuspenseFetcher = () => {
  let data;
  let promise;

  return (
    fetch: () => Promise<any>,
    setRefetchedData?: (data: any) => void,
  ) => {
    if (setRefetchedData) {
      // tslint:disable-next-line: no-floating-promises
      fetch().then(res => {
        setRefetchedData(res);
      });
    }

    if (data) {
      return data;
    }

    if (!promise) {
      promise = fetch().then(res => {
        data = res;
      });
    }

    throw promise;
  };
};

interface IFetcherHOCProps {
  initialFetch(): Promise<any>;
  WrappedComponent: React.ComponentType<any>;
  fetcher(
    fetch: () => Promise<any>,
    setRefetchedData?: (data: any) => void,
  ): any;
  additionalProps: any;
}

interface IFetcherHOCState {
  fetchData: any;
}

class FetcherHOC extends React.Component<IFetcherHOCProps, IFetcherHOCState> {
  constructor(props: IFetcherHOCProps) {
    super(props);
    this.reFetch = this.reFetch.bind(this);
    this.state = {
      fetchData: this.props.fetcher(props.initialFetch),
    };
  }

  reFetch(fetch: () => Promise<any>) {
    const setRefetchedData = (fetchData: any) => this.setState({ fetchData });
    this.props.fetcher(fetch, setRefetchedData);
  }

  render() {
    return React.createElement(this.props.WrappedComponent, {
      fetchData: this.state.fetchData,
      reFetch: this.reFetch,
      ...this.props.additionalProps,
    });
  }
}

export interface IWithSuspenseFetcherInjectedProps<T> {
  fetchData: T;
  reFetch(fetch: () => Promise<T>): void;
}

export const withSuspenseFetcherHOC = (
  fetchBuilder: (p: any) => () => Promise<any>,
  WrappedComponent: React.ComponentType<any>,
) => (props: any) => (
  <React.Suspense fallback="Loading">
    <FetcherHOC
      fetcher={getSuspenseFetcher()}
      initialFetch={fetchBuilder(props)}
      WrappedComponent={WrappedComponent}
      additionalProps={props}
    />
  </React.Suspense>
);

export const WithSuspenseFetcher: any = (
  fetchBuilder: (props: any) => () => Promise<any>,
) => (component: React.ComponentType<any>) =>
  withSuspenseFetcherHOC(fetchBuilder, component);
