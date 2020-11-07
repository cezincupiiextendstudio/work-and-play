/**
 *
 * ChatPage
 *
 */

import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectChatPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './index.scss';

const messages = [
  { id: 0, user: 'Cezin', chat: 'dev', message: 'Salut', date: '24/10/2020' },
  { id: 1, user: 'Cezin', chat: 'dev', message: 'Salut', date: '24/10/2020' },
  { id: 2, user: 'Cezin', chat: 'dev', message: 'Salut', date: '24/10/2020' },
  { id: 3, user: 'Cezin', chat: 'dev', message: 'Salut', date: '24/10/2020' },
];
function ChatRoom() {
  const dummy = useRef();

  const [formValue, setFormValue] = useState('');

  const sendMessage = async e => {
    e.preventDefault();

    // const { uid, photoURL } = auth.currentUser;
    messages.push({
      id: 4,
      user: 'Catalin',
      chat: 'dev',
      message: 'Salut 2',
      date: '25/11/2020',
    });
    // await messagesRef.add({
    //   text: formValue,
    //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //   uid,
    //   photoURL
    // })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <main className="chat-main">
        {messages &&
          messages.map(msg => (
            <ChatMessage key={msg.id} message={msg.message} />
          ))}

        <span ref={dummy} />
      </main>

      <form onSubmit={sendMessage} className="chat-form">
        <input
          value={formValue}
          onChange={e => setFormValue(e.target.value)}
          placeholder="Send a message"
          className="chat-input"
        />

        <button type="submit" disabled={!formValue} className="chat-button">
          Submit
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  // const { text, uid, photoURL } = props.message;
  //
  // const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  const messageClass = 'sent';
  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src="https://pbs.twimg.com/profile_images/1194113737092935681/63O1znGw.jpg" />
        <p className="chat-message">{props.message}</p>
      </div>
    </>
  );
}

export function ChatPage() {
  useInjectReducer({ key: 'chatPage', reducer });
  useInjectSaga({ key: 'chatPage', saga });

  return (
    <div>
      <Helmet>
        <title>ChatPage</title>
        <meta name="description" content="Description of ChatPage" />
      </Helmet>
      <ChatRoom />
    </div>
  );
}

ChatPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  chatPage: makeSelectChatPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ChatPage);
