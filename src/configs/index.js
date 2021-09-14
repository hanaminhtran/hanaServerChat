import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Switch from 'rc-switch';
import { GLOBAL_SETTINGS } from '../../containers/SettingPage/settingReducer';
import './styles.scss';
import Button from '../Button';
import Modal from '../Modal';

function openRepoUrl(history) {
  if (process.env.NODE_ENV === 'production') {
    history.push('/group_chat/ddbffd80-3663-11e9-a580-d119b23ef62e');
  } else {
    window.open('https://im.hanaminhtran.top/group_chat/ddbffd80-3663-11e9-a580-d119b23ef62e');
  }
}

function Setting({ initApp, history, globalSettings, setGlobalSettings }) {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [githubChatRoom, setGithubChatRoom] = useState('--');

  const logout = () => {
    window.socket.disconnect();
    localStorage.removeItem('userInfo');
    initApp(false);
    history.push('/login');
  };

  useEffect(() => {
    axios.get('https://api.github.com/repos/hanaminhtran/ghChat').then(res => {
      setGithubChatRoom(res.data.stargazers_count);
    });
  });

  const _onChange = (type, value) => {
    setGlobalSettings({
      [type]: value,
    });
  };

  return (
    <div className="setting">
      <Modal
        title="Are you sure ?"
        visible={logoutModalVisible}
        confirm={logout}
        hasCancel
        hasConfirm
        cancel={() => setLogoutModalVisible(false)}
      />

      <div className="notificationConfig">
        <span>notification: </span>
        <Switch
          onChange={value => _onChange(GLOBAL_SETTINGS.NOTIFICATION, value)}
          checked={globalSettings.notification}
        />
      </div>

      <div
        className="githubStarRender"
        onClick={() => window.open('https://github.com/hanaminhtran/ghChat')}
      >
        <svg className="icon githubIcon" aria-hidden="true">
          <use xlinkHref="#icon-github-copy" />
        </svg>
        <span className="starTitle">{`${githubChatRoom}  ChatRoom`}</span>
      </div>

      <div
        className="contact"
        onClick={() => window.open('https://github.com/hanaminhtran/blog/issues/63')}
      >
        Open PWA (install ghChat to the desktop)
      </div>
      <div className="contact" onClick={() => window.open('https://github.com/hanaminhtran/ghChat')}>
        Project address & welcome star
      </div>
      <div className="contact" onClick={() => openRepoUrl(history)}>
        Project Exchange Group
      </div>
      <Button clickFn={() => setLogoutModalVisible(true)} value="Quit" />
    </div>
  );
}

Setting.propTypes = {
  initApp: PropTypes.func,
  history: PropTypes.object.isRequired,
  globalSettings: PropTypes.object,
  setGlobalSettings: PropTypes.func,
};

Setting.defaultProps = {
  initApp() {},
  globalSettings: {},
  setGlobalSettings() {},
};

export default withRouter(Setting);
