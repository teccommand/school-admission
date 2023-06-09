import { TITLE } from './path';

export const TEXT = {
    // Global
    CONFIRM: 'ตกลง',
    CANCEL: 'ยกเลิก',
    SAVE: 'บันทึก',
    SEARCH: 'ค้นหา',
    NO_DATA: 'ไม่มีข้อมูล',

    // Course
    COURSE: {
        MODAL: {
            CREATE_TITLE: 'เพิ่มหลักสูตร',
            EDIT_TITLE: 'แก้ไขหลักสูตร',
            CREATE_SUCCESS: 'เพิ่มหลักสูตรสำเร็จ',
            EDIT_SUCCESS: 'แก้ไขหลักสูตรสำเร็จ',

            CONFIRM_DELETE: 'ยืนยันการลบ?',
            CONFIRM_DELETE_DESC: 'กรุณากดตกลงเพื่อยืนยันการลบ',
            DELETE_SUCCESS: 'ลบหลักสูตรสำเร็จ',
        },
        MODAL_FORM: {},
        PAGE: {
            TITLE: TITLE.COURSE,
        },
        TABLE: {
            NAME: 'ชื่อหลักสูตร',
            DESC: 'คำอธิบาย',
        },
    },

    // Class room
    CLASS_ROOM: {
        PAGE: {
            TITLE: TITLE.CLASS_ROOM,
        },
        MODAL: {
            CREATE_TITLE: 'เพิ่มชั้นเรียน',
            EDIT_TITLE: 'แก้ไขชั้นเรียน',
            CREATE_SUCCESS: 'เพิ่มชั้นเรียนสำเร็จ',
            EDIT_SUCCESS: 'แก้ไขชั้นเรียนสำเร็จ',

            CONFIRM_DELETE: 'ยืนยันการลบ?',
            CONFIRM_DELETE_DESC: 'กรุณากดตกลงเพื่อยืนยันการลบ',
            DELETE_SUCCESS: 'ลบชั้นเรียนสำเร็จ',
        },
        TABLE: {
            NAME: 'ชื่อชั้นเรียน',
            DESC: 'คำอธิบาย',
        },
    },
};
