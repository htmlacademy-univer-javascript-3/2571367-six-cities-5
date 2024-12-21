
import {useRef, FormEvent, useState} from 'react';
import React from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/apiActions';
import '../../../markup/css/errorMessage.css';
import { AppRoute } from '../../mocks/login';
import { Link } from 'react-router-dom';

function LoginPage():JSX.Element{
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isPasswordError, setPasswordError] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const showPasswordError = () => {
    setPasswordError(true);
    setTimeout(() =>setPasswordError(false), 2000);
  };
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const letterMask = /[A-Za-z]/g;
    const numberMask = /[0-9]/g;
    if (passwordRef.current !== null){
      const isPasswordValid = letterMask.test(passwordRef.current.value) && numberMask.test(passwordRef.current.value);
      if (loginRef.current !== null && isPasswordValid) {
        dispatch(loginAction({
          login: loginRef.current.value,
          password: passwordRef.current.value
        }));
      }
      if (!isPasswordValid){
        showPasswordError();
      }
    }
  };
  return(
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to ={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref = {loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref = {passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
              {isPasswordError ?
                <div className = "error-message">
              write password with at least 1 letter and 1 number
                </div> : null}
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default React.memo(LoginPage);
