import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import PasswordInput from '@/components';
import api from '@/api';

type FormValues = {
  username: string;
  password: string;
};

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().min(5).required(),
});

const SignInForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(data => {
    api.auth.signin().then(response => console.log(response));
  });

  return (
    <>
      <Heading textAlign="center" size="lg" mb={6}>
        Войдите в систему
      </Heading>
      <FormControl mb={3} isInvalid={!!errors.username}>
        <FormLabel>Логин</FormLabel>
        <Input
          background="white"
          {...register('username', {
            required: { value: true, message: 'Обязательное поле' },
          })}
          placeholder="Введите логин"
        />
        <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
      </FormControl>
      <FormControl mb={5} isInvalid={!!errors.password}>
        <FormLabel>Пароль</FormLabel>
        <PasswordInput
          background="white"
          {...register('password', {
            required: { value: true, message: 'Обязательное поле' },
          })}
          placeholder="Введите пароль"
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Button onClick={onSubmit} width="100%" colorScheme="teal">
        Войти
      </Button>
    </>
  );
};

export default SignInForm;
