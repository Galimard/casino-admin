import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

import classes from '../../styles.module.scss';
import { AlertSvg } from '@assets/icons/AlertSvg';

interface FormErrors {
  login?: string;
  password?: string;
  connection?: string;
}

const LoginForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!login.trim()) {
      newErrors.login = 'Введите логин';
    }

    if (!password.trim()) {
      newErrors.password = 'Введите пароль';
    } 
    // else if (password.length < 5 || password.length > 10) {
    //   newErrors.password = 'Пароль должен быть от 5 до 10 символов';
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputFocus = () => {
    setErrors({});
    setIsSubmitting(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    const apiUrl = `/api/rest_controller?action=getToken&scope=mdigital_combinationsraffle&username=${login}&password=${password}&remember=true`;    

    axios.get(apiUrl)
      .then(function (response) {
        console.log(response);
        const token = response.data.access_token;
        if (token) localStorage.setItem("authToken", token);
        
        setIsSubmitting(false);
        navigate("/export");
      })
      .catch(function (error) {
        if (error.status === 401) {
          setErrors({ login: 'Неверный логин', password: 'Неверный пароль' });
        } else {
          setErrors({ connection: 'Ошибка соединения' });
        }
      });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit} noValidate>
      <p style={{ textAlign: 'center', marginBottom: '40px' }}>
        Введите логин и пароль администратора, чтобы увидеть информацию о проведенных розыгрышах.
      </p>

      <div className={classes.formItem}>
        <label>
          <span className={`${classes.label} ${errors.login ? classes.errorLabel : ''}`}>Логин</span>
          <input
            type="text"
            ref={inputRef}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            onFocus={ handleInputFocus }
            className={`${classes.input} ${errors.login ? classes.errorInput : ''}`}
          />
          {errors.login && <div className={classes.errorMessage}>{errors.login}</div>}
        </label>
      </div>

      <div className={classes.formItem}>
        <label>
          <span className={`${classes.label} ${errors.password ? classes.errorLabel : ''}`}>Пароль</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${classes.input} ${errors.password ? classes.errorInput : ''}`}
          />
          {errors.password && <div className={classes.errorMessage}>{errors.password}</div>}
        </label>
      </div>

      {errors.connection && (
        <div className={classes.loginMessage}>
          <div className={classes.loginHeader}>
            <AlertSvg className={classes.alertIcon} />
            <div>Ошибка соединения</div>
          </div>
          <div className={classes.loginText}>
            Проверьте вашу скорость интернета или попробуйте позже.
          </div>
        </div>
      )}

      <button
        className={classes.button}
        type="submit"
        disabled={isSubmitting}
      >
        Войти
      </button>
    </form>
  );
};

export default LoginForm;