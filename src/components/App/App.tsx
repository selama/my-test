import React from 'react';
import { translate, InjectedTranslateProps } from 'react-i18next';
import s from './App.scss';
import { Test } from '../Test/test';

interface AppProps extends InjectedTranslateProps {}

class App extends React.Component<AppProps> {
  render() {
    const { t } = this.props;

    return (
      <div className={s.root}>
        <Test name="sela" />
      </div>
    );
  }
}

export default translate()(App);
