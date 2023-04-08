import {
    ActionIcon,
    Button,
    Card,
    Flex,
    Group,
    Stack,
    Table,
    Text,
    TextInput,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Default';
import { TEXT } from '../../constants/text';
import { useDebouncedValue, useInputState } from '@mantine/hooks';
import {
    IconEditCircle,
    IconListDetails,
    IconSearch,
    IconTrash,
} from '@tabler/icons';
import FormModal from './Form';
import {
    IClassRoom,
    IClassRoomForm,
    IClassRoomResponse,
} from '../../Interfaces/IClassRoom';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { truncated } from '../../utils/string';
import api from '../../utils/axios';
import { toast } from 'react-toastify';
import { modals } from '@mantine/modals';
import { ICourse } from '../../Interfaces/ICourse';

const ClassRoomIndex: React.FC = () => {
    const [tableData, setTableData] = useState<IClassRoomResponse[]>([]);
    const [page, setPage] = useState<number>(1);
    const [searchValue, setSearchValue] = useInputState<string>('');
    const [isOpenFormModal, setIsOpenFormModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [debounced] = useDebouncedValue(searchValue, 1000);
    const [actionId, setActionId] = useState<number | undefined>(undefined);
    const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
    const [isExpendTable, setIsExpendTable] = useState<boolean>(false);
    const [courseList, setCourseList] = useState<ICourse[]>([]);
    const [classRoom, setClassRoom] = useState<IClassRoomForm>({
        name: '',
        description: '',
        courses: [],
    });
    const [pagination, setPagination] = useState({
        pageSize: 10,
        total: 0,
        page: 1,
    });

    const getClassRooms = async () => {
        setIsLoading(true);

        const query = {
            search: searchValue,
            pageSize: pagination.pageSize,
            page: page,
        };

        try {
            const response = await api.get('classrooms?include=courses', {
                params: query,
            });
            setTableData(response.data.data);
            setPagination({
                page: response.data.current_page,
                total: response.data.total,
                pageSize: response.data.per_page,
            });
        } catch (error: any) {
            toast.error(error?.response?.data?.message ?? error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getCourses = async () => {
        setIsLoading(true);

        const query = {
            search: searchValue,
            pageSize: pagination.pageSize,
            page: page,
        };

        try {
            const response = await api.get('courses', { params: query });
            setCourseList(response.data.data);
        } catch (error: any) {
            toast.error(error?.response?.data?.message ?? error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const onCreate = () => {
        setActionId(undefined);
        setClassRoom({
            name: '',
            description: '',
            courses: [],
        });
        setIsOpenFormModal(true);
    };

    const onSubmit = async (formData: IClassRoomForm) => {
        setIsModalLoading(true);

        try {
            const url = actionId ? `classrooms/${actionId}` : 'classrooms';
            const { data } = await api[actionId ? 'put' : 'post'](
                url,
                formData
            );

            if (data.isSuccess) {
                toast.success(
                    actionId
                        ? TEXT.COURSE.MODAL.EDIT_SUCCESS
                        : TEXT.COURSE.MODAL.CREATE_SUCCESS
                );
                getClassRooms();
                setActionId(undefined);
                setIsOpenFormModal(false);
            } else {
                toast.error(data.message);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message ?? error.message);
        } finally {
            setIsModalLoading(false);
        }
    };

    const onEdit = (id: number, classroom: IClassRoomResponse) => {
        if (!id) {
            return;
        }

        setActionId(id);
        setClassRoom({
            name: classroom.name,
            description: classroom.description ?? '',
            courses: classroom.courses.length
                ? classroom.courses?.map((item) => item.id?.toString() ?? '')
                : [],
        });
        setIsOpenFormModal(true);
    };

    const onDelete = async (id: number) => {
        if (!id) {
            return;
        }

        try {
            const { data } = await api.delete(`classrooms/${id}`);

            if (data.isSuccess) {
                toast.success(TEXT.COURSE.MODAL.DELETE_SUCCESS);
                getClassRooms();
            } else {
                toast.error(data.message);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message ?? error.message);
        }
    };

    const openDeleteModal = (id: number, item: string) => {
        modals.openConfirmModal({
            title: TEXT.CLASS_ROOM.MODAL.CONFIRM_DELETE,
            centered: true,
            children: (
                <Text size="sm">
                    {TEXT.CLASS_ROOM.MODAL.CONFIRM_DELETE_DESC}{' '}
                    <Text span c="blue" inherit>
                        {item}
                    </Text>
                </Text>
            ),
            labels: { confirm: TEXT.CONFIRM, cancel: TEXT.CANCEL },
            confirmProps: { color: 'red' },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onCancel: () => {},
            onConfirm: () => onDelete(id),
        });
    };

    const header: DataTableColumn<IClassRoomResponse>[] = [
        {
            accessor: 'index',
            title: '#',
            textAlignment: 'center',
            width: 100,
            render: (record: IClassRoomResponse) =>
                (pagination.page - 1) * pagination.pageSize +
                (tableData.findIndex(
                    (obj: IClassRoom) => obj.id === record.id
                ) +
                    1),
        },
        {
            accessor: 'name',
            title: TEXT.CLASS_ROOM.TABLE.NAME,
            width: 200,
        },
        {
            accessor: 'description',
            title: TEXT.CLASS_ROOM.TABLE.DESC,
            width: 380,
            render: (record: IClassRoomResponse) =>
                truncated(record.description ?? '', 50),
        },
        {
            accessor: 'courses',
            title: TEXT.COURSE.PAGE.TITLE,
            width: 80,
            textAlignment: 'right',
            render: (record: IClassRoomResponse) => {
                return record.courses.length;
            },
        },
        {
            accessor: 'actions',
            title: '',
            width: 120,
            textAlignment: 'right',
            render: (record: IClassRoomResponse) => {
                return (
                    <Group position="right">
                        <ActionIcon
                            onClick={() => onEdit(record.id ?? 0, record)}
                        >
                            <IconEditCircle size="18px" stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon
                            color="red"
                            onClick={() =>
                                openDeleteModal(record.id ?? 0, record.name)
                            }
                        >
                            <IconTrash size="18px" stroke={1.5} />
                        </ActionIcon>
                    </Group>
                );
            },
        },
    ];

    useEffect(() => {
        setPage(1);
    }, [debounced]);

    useEffect(() => {
        getClassRooms();
    }, [page, debounced]);

    useEffect(() => {
        getCourses();
    }, []);

    return (
        <Layout title={TEXT.CLASS_ROOM.PAGE.TITLE}>
            <Card shadow="sm">
                <Flex justify="space-between" mb={10}>
                    <Group>
                        <Button onClick={() => onCreate()}>
                            {TEXT.CLASS_ROOM.MODAL.CREATE_TITLE}
                        </Button>
                        <Button
                            variant="default"
                            onClick={() => setIsExpendTable(!isExpendTable)}
                        >
                            <IconListDetails />
                        </Button>
                    </Group>
                    <TextInput
                        value={searchValue}
                        onChange={setSearchValue}
                        placeholder={TEXT.SEARCH}
                        rightSection={
                            <IconSearch
                                size="1rem"
                                style={{ display: 'block', opacity: 0.5 }}
                            />
                        }
                    />
                </Flex>

                <DataTable
                    withBorder={false}
                    verticalAlignment="top"
                    minHeight={200}
                    borderRadius="sm"
                    verticalSpacing="sm"
                    records={tableData}
                    columns={header}
                    totalRecords={pagination.total}
                    recordsPerPage={pagination.pageSize}
                    page={pagination.page}
                    onPageChange={(p) => setPage(p)}
                    fetching={isLoading}
                    loaderSize="xl"
                    loaderBackgroundBlur={2}
                    rowExpansion={{
                        trigger: isExpendTable ? 'always' : 'click',
                        content: ({ record }) => (
                            <Stack p="xs" spacing={6}>
                                <Table
                                    ml={100}
                                    style={{ width: 'calc(100% - 100px)' }}
                                >
                                    <tbody>
                                        <tr>
                                            <td width={100} valign="top">
                                                {TEXT.CLASS_ROOM.PAGE.TITLE}
                                            </td>
                                            <td valign="top">{record.name}</td>
                                        </tr>

                                        <tr>
                                            <td width={100} valign="top">
                                                {TEXT.CLASS_ROOM.TABLE.DESC}
                                            </td>
                                            <td valign="top">
                                                {record.description ??
                                                    TEXT.NO_DATA}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td width={100} valign="top">
                                                {TEXT.COURSE.PAGE.TITLE}
                                            </td>
                                            <td valign="top">
                                                {record.courses.length ? (
                                                    <>
                                                        {record.courses
                                                            .map(
                                                                (item) =>
                                                                    item.name
                                                            )
                                                            .join(', ')}
                                                    </>
                                                ) : (
                                                    <>{TEXT.NO_DATA}</>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Stack>
                        ),
                    }}
                />
            </Card>

            <FormModal
                isOpen={isOpenFormModal}
                onClose={() => setIsOpenFormModal(false)}
                title={
                    actionId
                        ? TEXT.CLASS_ROOM.MODAL.EDIT_TITLE
                        : TEXT.CLASS_ROOM.MODAL.CREATE_TITLE
                }
                isLoading={isModalLoading}
                classRoom={classRoom}
                onSubmit={(formData: IClassRoomForm) => onSubmit(formData)}
                courses={courseList}
            />
        </Layout>
    );
};

export default ClassRoomIndex;
