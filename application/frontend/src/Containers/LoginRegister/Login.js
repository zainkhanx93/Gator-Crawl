import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import io from 'socket.io-client';

import { USER_CONNECTED } from '../Messages/messageEvent'; // for message
import LoginForm from '../../Components/Forms/LoginForm';
import * as loginActions from '../../Store/Actions/loginActions';
import * as userActions from '../../Store/Actions/userActions';
import * as messageActions from '../../Store/Actions/messageActions';
import gclogo from '../../Assets/Images/gclogo.png';
import logotitle from '../../Assets/Images/logotitle.png';
import './LoginRegister.css';


const awsURL = '';
const localURL = 'http://localhost:8080/';
const socketURL = localURL || awsURL;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: null
    };
  }

  // call initSocket function
  componentDidMount() {
    const cookie = new Cookies();
    cookie.remove('token');
    this.initSocket();
  }

  initSocket = () => {
    const { setSocket } = this.props;
    const socket = io(socketURL);
    // when socket connect to server from client do arrow function
    socket.on('connect', () => {
      console.log('Connected');
    });
    setSocket(socket);
  };

  // Sets the users from this.state
  // user parameter will have id and name
  setUser = (user) => {
    const { socket, setUser } = this.props;
    socket.emit(USER_CONNECTED, user);
    setUser(user);
  };

  onSubmit = () => {
    const {
      // handleSubmit,
      formValues,
      history,
      setCurrentUser,
    } = this.props;
    // handleSubmit({
    //   ...formValues
    // });
    // console.table(formValues);
    axios.post('/api/users/login', { ...formValues })
      .then((res) => {
        this.setState({ isAuth: true });
        setCurrentUser({ email: formValues.email, token: res.data.token });
        this.setUser(formValues);
        history.push('/home');
      }).catch((error) => {
        this.setState({ isAuth: false });
        console.log(error);
      });
    // const george = {
    //   id: '1',
    //   email: 'gfreedland@mail.sfsu.edu',
    //   firstName: 'George',
    //   lastName: 'Freedland',
    //   major: 'Computer Science',
    //   token: 'token',
    // };
    // code for message
  };

  render() {
    const { socket } = this.props;
    const { isAuth } = this.state;
    // const { socket, user } = this.props;
    let failed = null;
    if (isAuth === false) {
      failed = <p style={{ color: 'red' }}>Login failed, please try again</p>;
    }

    return (
      <div className="Login-Box">
        <img className="Logo-Title" src={logotitle} alt="Gator Crawl" />
        <br />
        <img className="Logo" src={gclogo} alt="Logo" />
        <br />
        <h1 style={{ margin: 0 }}>Login</h1>
        <br />
        <LoginForm
          socket={socket}
          setUser={this.setUser}
          handleSubmit={this.onSubmit}
        />
        {failed}
        <br />
        <a className="Link2" href="register">
          <b>Create new account</b>
        </a>
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
    // isAuth: state.loginReducer.token,
    socket: state.messageReducer.socket,
    user: state.messageReducer.user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { history } = props;
  return {
    handleSubmit: (values) => dispatch(
      loginActions.tryLogin(values, (isSuccess, token) => {
        if (isSuccess) {
          const cookie = new Cookies();
          cookie.set('token', token);
          history.push('/home');
        }
      })
    ),
    setCurrentUser: (currentUser) => dispatch(userActions.setCurrentUser(currentUser)),
    setUser: (user) => dispatch(messageActions.setUser(user)),
    setSocket: (socket) => dispatch(messageActions.setSocket(socket)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
