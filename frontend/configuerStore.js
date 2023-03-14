import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from "redux-thunk";
import reducers from './Redux/Reducers';

let composeEnhancers = composeWithDevTools({
  realtime: true,
  name: 'Your Instance Name',
  hostname: 'localhost',
  port: 8000, // the port your remotedev server is running at
});

const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
));