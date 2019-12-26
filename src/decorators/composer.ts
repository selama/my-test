import { withSuspenseFetcherHOC } from './with-suspense-fetcher';

class Composer {
  private readonly funcs = [];

  withSuspenseFetcher(fetchBuilder: (props: any) => () => Promise<any>) {
    this.funcs.push(component =>
      withSuspenseFetcherHOC(fetchBuilder, component),
    );
    return this;
  }

  compose(val) {
    return this.funcs.reduceRight(
      (prevComposition, func) => func(prevComposition),
      val,
    );
  }
}

export const composer = () => new Composer();
