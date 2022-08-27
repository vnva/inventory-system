import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import PasswordInput from '@/components';
import * as api from '@/api';
import { useAuth } from '@/hooks';
import { siteMap } from '@/consts';
import { setUser, useAppDispatch } from '@/store';

type FormValues = {
  username: string;
  password: string;
};

const schema = yup.object({
  username: yup.string().min(4).required(),
  password: yup.string().min(4).required(),
});

export const SigninForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { signin } = useAuth();

  const onSubmit = handleSubmit(data => {
    return api.auth
      .signin(data)
      .then(({ data }) => {
        signin(data);
        dispatch(setUser()).then(() => navigate(siteMap.dashboard.path));
      })
      .catch(error => {
        if (error.response.status === 400) {
          toast({
            description: 'Неверный логин или пароль',
            status: 'error',
            position: 'bottom-right',
          });
        } else {
          toast({
            description: 'Неизвестная ошибка',
            status: 'error',
            position: 'bottom-right',
          });
        }
      });
  });

  return (
    <>
      <Heading textAlign="center" size="lg" mb={6}>
        Войдите в систему
      </Heading>
      <FormControl mb={3} isInvalid={!!errors.username}>
        <FormLabel>Логин</FormLabel>
        <Input
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
          {...register('password', {
            required: { value: true, message: 'Обязательное поле' },
          })}
          placeholder="Введите пароль"
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Button
        isDisabled={!isDirty}
        isLoading={isSubmitting}
        onClick={onSubmit}
        width="100%"
        colorScheme="teal"
      >
        Войти
      </Button>
    </>
  );
};
