import { withSuspenseFetcherHOC } from './with-suspense-fetcher';

class Composer {
  private readonly funcs = [];

  withSuspenseFetcher(fetch: () => Promise<any>) {
    this.funcs.push(component => withSuspenseFetcherHOC(fetch, component));
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
