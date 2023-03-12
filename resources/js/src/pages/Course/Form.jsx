import { Button, Flex, Modal, Textarea, TextInput } from "@mantine/core";
import { yupResolver, useForm } from "@mantine/form";
import React, { useEffect } from "react";
import * as Yup from 'yup';
import { TEXT } from "../../constants/text"; 

const CourseForm = (props) => {
    const schema = Yup.object().shape({
        name: Yup.string().required().min(3),
        description: Yup.string().required().min(3),
    });

    const form = useForm({
        validate: yupResolver(schema),
        initialValues: {
            name: props.course ? props.course.name : '',
            description: props.course ? props.course.description : '',
        },
    });

    const handleSubmit = () => {
        props.onSubmit(form.values);
    }

    useEffect(() => {
        form.setValues(props.course);
    }, [props.course])

    return (
        <Modal opened={props.isOpen} onClose={() => props.onClose()} title={props.title} centered size="xl">
            <form onSubmit={form.onSubmit((values) => handleSubmit())}>
                <TextInput label={TEXT.COURSE.TABLE.NAME} mb={10} withAsterisk {...form.getInputProps('name')} />
                <Textarea
                    label={TEXT.COURSE.TABLE.DESC}
                    autosize
                    minRows={5}
                    mb={10}
                    withAsterisk
                    {...form.getInputProps('description')}
                />

                <Flex justify="end" gap="md">
                    <Button color="red" onClick={() => props.onClose()}>{TEXT.CANCEL}</Button>
                    <Button type="submit" disabled={props.isLoading}>{TEXT.SAVE}</Button>
                </Flex>
            </form>
        </Modal>
    )
}

export default CourseForm;