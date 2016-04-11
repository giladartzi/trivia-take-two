import React from 'react';
import ReactDOM from 'react-dom';

import TriviaApp from './componenets/TriviaApp';

const root = <TriviaApp />;
const element = document.getElementById('triviaApp');

ReactDOM.render(root, element);