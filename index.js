/**
 * @format
 */
import {enableLatestRenderer} from 'react-native-maps';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler'

enableLatestRenderer();
LogBox.ignoreLogs(['Require cycle: node_modules/victory']);
AppRegistry.registerComponent(appName, () => App);
