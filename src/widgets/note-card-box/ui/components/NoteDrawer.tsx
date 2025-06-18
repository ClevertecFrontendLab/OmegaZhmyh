import {
    Button,
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Textarea,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

import { useAddNoteMutation } from '~/entities/user';

type NoteDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const NoteDrawer = ({ isOpen, onClose }: NoteDrawerProps) => {
    const [addNote] = useAddNoteMutation();

    return (
        <>
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
