// import { useForm } from 'react-hook-form';
// import { Button, Form } from 'react-bootstrap';
import classes from './styles.module.scss';
import LoginForm from '@features/login-content/ui/login-form/LoginForm';

// type LoginData = {
//   login: string;
//   password: string;
// };

export default function LoginContent() {
  // const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();

  // const onSubmit = (data: LoginData) => {
  //   console.log(data);
  //   // API call here
  // };

  return (
    <div className={classes.login}>
      <h1 className="typography-h1">Вход</h1>

      <LoginForm />
    </div>
  );
}