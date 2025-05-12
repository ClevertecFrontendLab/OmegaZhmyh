import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export const VerificationPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const emailVerified = searchParams.get('emailVerified') === 'true';

    useEffect(() => {
        if (emailVerified) {
            navigate('/login');
        } else {
            navigate('/signup');
        }
    }, [emailVerified, navigate]);

    return (
        <Modal isOpen onClose={() => navigate('/login')}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {emailVerified ? 'Верификация успешна' : 'Ошибка верификации'}
                </ModalHeader>
                <ModalCloseButton data-test-id='close-button' />
                <ModalBody pb={6}>
                    <VStack spacing={4}>
                        <Text>
                            {emailVerified
                                ? 'Ваш email успешно подтвержден. Теперь вы можете войти в систему.'
                                : 'Произошла ошибка при подтверждении email. Пожалуйста, попробуйте зарегистрироваться снова.'}
                        </Text>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
