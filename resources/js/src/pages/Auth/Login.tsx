import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
} from '@mantine/core';
import { useState } from 'react';
import { useForm, yupResolver } from '@mantine/form';
import api from '../../utils/axios';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import Guest from '../../layouts/Guest';
import * as Yup from 'yup';

const Login = () => {
    // Yup validate
    const schema = Yup.object().shape({
        email: Yup.string().required().min(5).email('Invalid email'),
        password: Yup.string().required().min(6),
    });

    // Hook
    const navigate = useNavigate();
    const form = useForm({
        validate: yupResolver(schema),
        initialValues: {
            email: '',
            password: '',
        },
    });

    // State
    const [isLoading, setIsLoading] = useState(false);

    const login = async () => {
        setIsLoading(true);

        try {
            await api.post('/auth/login', form.values);
            const { data } = await api.get('/user');
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/');
        } catch (error: any) {
            showNotification({
                message: error?.response?.data?.message ?? error.message,
                color: 'red',
            });
        }

        setIsLoading(false);
    };

    return (
        <Guest title={'Login'}>
            <Container size={420} my={40}>
                <Title align="center" sx={() => ({ fontWeight: 900 })}>
                    School Admission
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    Do not have an account yet?{' '}
                    <Anchor
                        href="#"
                        size="sm"
                        onClick={(event) => event.preventDefault()}
                    >
                        Create account
                    </Anchor>
                </Text>

                <form onSubmit={form.onSubmit(() => login())}>
                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <TextInput
                            label="Email"
                            placeholder="admin@sleepless-tech.com"
                            required
                            {...form.getInputProps('email')}
                        />

                        <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            required
                            mt="md"
                            {...form.getInputProps('password')}
                        />

                        <Button
                            fullWidth
                            mt="xl"
                            type="submit"
                            loading={isLoading}
                        >
                            Sign in
                        </Button>
                    </Paper>
                </form>
            </Container>
        </Guest>
    );
};

export default Login;
