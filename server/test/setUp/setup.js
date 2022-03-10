import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const ReactRedux = require('react-redux');
const Redux = require('redux');

Enzyme.configure({ adapter: new Adapter() });

global.React = React;
global.ReactRedux = ReactRedux;
global.ReactDOM = ReactDOM;
global.Redux = Redux;
global.axios = axios;