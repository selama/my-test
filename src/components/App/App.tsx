import React from 'react';
import { translate, InjectedTranslateProps } from 'react-i18next';
import s from './App.scss';
import { Test, Test2 } from '../Test/test';

interface AppProps extends InjectedTranslateProps {}

class App extends React.Component<AppProps> {
  render() {
    const { t } = this.props;

    return (
      <div className={s.root}>
        <Test name="sela" />
        <Test2 name="eden" />
      </div>
    );
  }
}

export default translate()(App);
