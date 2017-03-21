'use strict';

import {
  AsyncStorage
} from 'react-native';

class GlobalStore {
  initState() {
    return {
      currentMode: null,
    };
  }

  constructor() {
    const now = new Date();
    this.settings = {
      username: 'usersp',
      password: 'passsp',
      mode: 'daily',
      date: now.toLocaleDateString().replace(/\//g, '-'),
    };
    // state
    this.state = this.initState();
  }

  async _reloadSettings() {
    const setting_string = await AsyncStorage.getItem('settings');
    if (setting_string !== null){
      this.settings = JSON.parse(setting_string);
    }
    this.state = this.initState();
  }

  reloadSettings() {
    return this._reloadSettings();
  }

  saveSettings(settings) {
    this.settings = settings;
    AsyncStorage.setItem('settings', JSON.stringify(this.settings), () => {
      console.log(`Save settings to AsyncStorage, mode=${this.settings.mode} date=${this.settings.date}`);
    });
  }

  reset() {
    // AsyncStorage.removeItem('pixiv_auth');
    AsyncStorage.removeItem('settings');
  }
}

module.exports = new GlobalStore();