import 'design/style';
import 'index.html';

import React from 'react';
import ReactDOM from 'react-dom';

import Counter from './components/Counter';

ReactDOM.render(<Counter number={12433} title="Totalt" />, document.getElementById('counter1'));
ReactDOM.render(<Counter number={103} title="solgte" />, document.getElementById('counter2'));
