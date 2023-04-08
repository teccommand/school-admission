import { ICourse } from './ICourse';

export interface IClassRoom {
    id?: number;
    name: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
}

export interface IClassRoomResponse extends IClassRoom {
    courses: ICourse[];
}

export interface IClassRoomForm extends IClassRoom {
    courses?: string[];
}
