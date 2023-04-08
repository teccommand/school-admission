import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Default';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import {
    Card,
    Flex,
    Button,
    TextInput,
    Text,
    Group,
    ActionIcon,
} from '@mantine/core';
import { IconEditCircle, IconSearch, IconTrash } from '@tabler/icons';
import api from '../../utils/axios';
import { useDebouncedValue, useInputState } from '@mantine/hooks';
import FormModal from './Form';
import { toast } from 'react-toastify';
import { modals } from '@mantine/modals';
import { truncated } from '../../utils/string';
import { TEXT } from '../../constants/text';
import { ICourse } from '../../Interfaces/ICourse';

const CourseIndex: React.FC = () => {
    const [tableData, setTableData] = useState<ICourse[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useInputState<string>('');
    const [debounced] = useDebouncedValue(searchValue, 1000);
    const [isOpenFormModal, setIsOpenFormModal] = useState<boolean>(false);
    const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
    const [actionId, setActionId] = useState<number | undefined>(undefined);
    const [courseDetail, setCourseDetail] = useState<ICourse>({
        name: '',
        description: '',
    });
    const [pagination, setPagination] = useState({
        pageSize: 10,
        total: 0,
        page: 1,
    });

    const getCourses = async () => {
        setIsLoading(true);

        const query = {
            search: searchValue,
            pageSize: pagination.pageSize,
            page: page,
        };

        try {
            const response = await api.get('courses', { params: query });
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

    const onCreate = () => {
        setActionId(undefined);
        setCourseDetail({
            name: '',
            description: '',
        });
        setIsOpenFormModal(true);
    };

    const onEdit = (id: number, course: ICourse) => {
        if (!id) {
            return;
        }

        setActionId(id);
        setCourseDetail({
            name: course.name,
            description: course.description,
        });
        setIsOpenFormModal(true);
    };

    const onDelete = async (id: number) => {
        if (!id) {
            return;
        }

        try {
            const { data } = await api.delete(`courses/${id}`);

            if (data.isSuccess) {
                toast.success(TEXT.COURSE.MODAL.DELETE_SUCCESS);
                getCourses();
            } else {
                toast.error(data.message);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message ?? error.message);
        }
    };

    const openDeleteModal = (id: number, item: string) => {
        modals.openConfirmModal({
            title: TEXT.COURSE.MODAL.CONFIRM_DELETE,
            centered: true,
            children: (
                <Text size="sm">
                    {TEXT.COURSE.MODAL.CONFIRM_DELETE_DESC}{' '}
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

    const onSubmit = async (formData: ICourse) => {
        setIsModalLoading(true);

        try {
            const url = actionId ? `courses/${actionId}` : 'courses';
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
                getCourses();
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

    const header: DataTableColumn<ICourse>[] = [
        {
            accessor: 'index',
            title: '#',
            textAlignment: 'center',
            width: 100,
            render: (record: ICourse) =>
                (pagination.page - 1) * pagination.pageSize +
                (tableData.findIndex((obj: ICourse) => obj.id === record.id) +
                    1),
        },
        {
            accessor: 'name',
            title: TEXT.COURSE.TABLE.NAME,
            width: 200,
        },
        {
            accessor: 'description',
            title: TEXT.COURSE.TABLE.DESC,
            width: 300,
            render: (record: ICourse) => truncated(record.description),
        },
        {
            accessor: 'actions',
            title: '',
            width: 200,
            textAlignment: 'right',
            render: (record: ICourse) => {
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
        getCourses();
    }, [page, debounced]);

    return (
        <Layout title={TEXT.COURSE.PAGE.TITLE}>
            <Card shadow="sm">
                <Flex justify="space-between" mb={10}>
                    <Button onClick={() => onCreate()}>
                        {TEXT.COURSE.MODAL.CREATE_TITLE}
                    </Button>
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
                    striped
                    highlightOnHover
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
                />
            </Card>

            <FormModal
                isOpen={isOpenFormModal}
                onClose={() => setIsOpenFormModal(false)}
                title={
                    actionId
                        ? TEXT.COURSE.MODAL.EDIT_TITLE
                        : TEXT.COURSE.MODAL.CREATE_TITLE
                }
                isLoading={isModalLoading}
                course={courseDetail}
                onSubmit={(formData: ICourse) => onSubmit(formData)}
            />
        </Layout>
    );
};

export default CourseIndex;
