import {
    Button,
    Flex,
    Modal,
    MultiSelect,
    SelectItem,
    Textarea,
    TextInput,
} from '@mantine/core';
import { yupResolver, useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { TEXT } from '../../constants/text';
import { IClassRoomForm } from '../../Interfaces/IClassRoom';
import { ICourse } from '../../Interfaces/ICourse';

interface IClassRoomFormProps {
    title: string;
    isOpen: boolean;
    isLoading: boolean;
    classRoom: IClassRoomForm;
    courses: ICourse[];
    onSubmit: (e: IClassRoomForm) => void;
    onClose: () => void;
}

const ClassRoomForm: React.FC<IClassRoomFormProps> = (props) => {
    const [courseSelect, setCourseSelect] = useState<SelectItem[]>([]);

    const schema = Yup.object().shape({
        name: Yup.string().required().min(3),
        description: Yup.string().nullable(),
        courses: Yup.array().required().min(1),
    });

    const form = useForm<IClassRoomForm>({
        validate: yupResolver(schema),
        initialValues: {
            name: props.classRoom ? props.classRoom.name : '',
            description:
                props.classRoom && props.classRoom.description
                    ? props.classRoom.description
                    : '',
            courses: props.classRoom ? props.classRoom.courses : [],
        },
    });

    const handleSubmit = () => {
        props.onSubmit(form.values);
    };

    const convertSelect = () => {
        const select: SelectItem[] = props.courses.map((item) => {
            return {
                value: item.id?.toString() ?? '0',
                label: item.name,
            };
        });

        setCourseSelect(select);
    };

    useEffect(() => {
        convertSelect();
    }, [props.courses]);

    useEffect(() => {
        form.setValues(props.classRoom);
    }, [props.classRoom]);

    return (
        <Modal
            opened={props.isOpen}
            onClose={() => props.onClose()}
            title={props.title}
            centered
            size="xl"
        >
            <form onSubmit={form.onSubmit(() => handleSubmit())}>
                <TextInput
                    label={TEXT.CLASS_ROOM.TABLE.NAME}
                    mb={10}
                    withAsterisk
                    {...form.getInputProps('name')}
                />

                <MultiSelect
                    withAsterisk
                    data={courseSelect}
                    label={TEXT.COURSE.PAGE.TITLE}
                    searchable
                    nothingFound="Nothing found"
                    clearable
                    {...form.getInputProps('courses')}
                />

                <Textarea
                    label={TEXT.CLASS_ROOM.TABLE.DESC}
                    autosize
                    minRows={5}
                    mb={10}
                    {...form.getInputProps('description')}
                />

                <Flex justify="end" gap="md">
                    <Button color="red" onClick={() => props.onClose()}>
                        {TEXT.CANCEL}
                    </Button>
                    <Button type="submit" disabled={props.isLoading}>
                        {TEXT.SAVE}
                    </Button>
                </Flex>
            </form>
        </Modal>
    );
};

export default ClassRoomForm;
