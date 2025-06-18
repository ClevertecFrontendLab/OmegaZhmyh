import {
    Button,
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Textarea,
    useDisclosure,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

import { useAddNoteMutation } from '~/entities/user';

export const NoteDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [addNote] = useAddNoteMutation();

    return (
        <>
            <Button colorScheme='teal' onClick={onOpen}>
                Open
            </Button>
            <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create your account</DrawerHeader>
                    <Formik initialValues={{ text: '' }} onSubmit={addNote}>
                        <Form>
                            <Field name='text' as={Textarea} placeholder='Type here...' />
                            <DrawerFooter>
                                <Button type='submit' colorScheme='blue'>
                                    Save
                                </Button>
                            </DrawerFooter>
                        </Form>
                    </Formik>
                </DrawerContent>
            </Drawer>
        </>
    );
};
