import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Cookies } from 'react-cookie';
import axios from 'axios';

import LoginForm from '../Components/Forms/LoginForm';
import * as loginActions from '../Store/Actions/loginActions';
import * as userActions from '../Store/Actions/userActions';
import * as messageActions from '../Store/Actions/messageActions';

import gclogo from '../Assets/Images/gclogo.png';
import logotitle from '../Assets/Images/logotitle.png';
import './LoginRegister.css';

//for message
import io from 'socket.io-client'
import { USER_CONNECTED } from '../Containers/messageRelated/messageEvent'
const awsURL = ""
const localURL = "http://localhost:8080/"
const socketURL = localURL || awsURL

class Login extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     socket:null,
  //     user:null
  //   };
  // }

  // call initSocket function
  componentDidMount() {
    const cookie = new Cookies();
    cookie.remove('token');
    this.initSocket()
  }

  initSocket = () => {
    const { setSocket } = this.props;
    const socket = io(socketURL)
    // when socket connect to server from client do arrow function
    socket.on('connect', () => {
      console.log('Connected')
    });
    setSocket(socket);
  }

  // Sets the users from this.state
  // user parameter will have id and name
  setUser = (user) => {
    const { socket, setUser } = this.props;
    socket.emit(USER_CONNECTED, user);
    setUser(user);
  }

  onSubmit = () => {
    const {
      // handleSubmit,
      formValues,
      history,
      setCurrentUser
    } = this.props;
    // handleSubmit({
    //   ...formValues
    // });
    console.table(formValues);
    // axios.post('/api/users/login', { email: formValues.email, password: formValues.password })
    //   .then((res) => {
    //     // console.log('got the response');
    //     console.log(res.data);
    //   }).catch((error) => {
    //     // console.log('whoops error');
    //     console.log(error);
    //   });
    const george = {
      id: '1',
      email: 'gfreedland@mail.sfsu.edu',
      firstName: 'George',
      lastName: 'Freedland',
      major: 'Computer Science',
      token: 'token'
    };

    const bernie = {
      id: '2',
      email: 'bsanders@mail.sfsu.edu',
      firstName: 'Bernie',
      lastName: 'Sanders',
      major: 'Political Science',
      token: 'token'
    }

    if (formValues.email === 'gfreedland@mail.sfsu.edu' && formValues.password === '123') {
      console.log('george logging in');
      setCurrentUser(george);

      // backend code in config/socketManager.js

      this.setUser(george);
      history.push('/home');
    } else if (formValues.email === 'bsanders@mail.sfsu.edu' && formValues.password === '123') {
      console.log('bernie logging in');
      setCurrentUser(bernie);

      this.setUser(bernie);
      history.push('/home');
    } else {
      console.log(formValues.email);
      // code for message
      const socketUser = formValues;
      setCurrentUser(socketUser);
      this.setUser(socketUser);
      history.push('/home');
    }
    // history.push('/home');
  };

  // Message front-end code

  render() {
    const { isAuth } = this.props;
    const { socket, user } = this.props;
    let failed = null;
    if (isAuth === false) {
      failed = <p>Login failed, try again</p>;
    }

    // const failed = !isAuth ? <p>Login failed, try again</p> : <p />;

    return (
      <div className="Login-Box">
        <img className="Logo-Title" src={logotitle} alt="Gator Crawl" />
        <br />
        <img className="Logo" src={gclogo} alt="Logo" />
        <br />
        <h1 style={{ margin: 0 }}>Login</h1>
        <br />
        <LoginForm socket={socket} setUser={this.setUser} handleSubmit={this.onSubmit} />
        <br />
        {failed}
        <a className="Link2" href="register"><b>Create new account</b></a>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const formSelector = formValueSelector('LoginForm');
  return {
    formValues: {
      email: formSelector(state, 'email'),
      password: formSelector(state, 'password'),
    },
    isAuth: state.loginReducer.token,
    socket: state.messageReducer.socket,
    user: state.messageReducer.user
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { history } = props;
  return {
    handleSubmit: (values) => dispatch(loginActions.tryLogin(values, (isSuccess, token) => {
      if (isSuccess) {
        const cookie = new Cookies();
        cookie.set('token', token);
        history.push('/home');
      }
    })),
    setCurrentUser: (currentUser) => dispatch(userActions.setCurrentUser(currentUser)),
    setUser: (user) => dispatch(messageActions.setUser(user)),
    setSocket: (socket) => dispatch(messageActions.setSocket(socket))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
