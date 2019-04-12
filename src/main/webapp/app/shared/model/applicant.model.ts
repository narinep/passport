import { Moment } from 'moment';

export const enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export interface IApplicant {
    id?: number;
    firstname?: string;
    lastname?: string;
    ssn?: number;
    birthDate?: Moment;
    gender?: Gender;
    photo?: string;
}

export class Applicant implements IApplicant {
    constructor(
        public id?: number,
        public firstname?: string,
        public lastname?: string,
        public ssn?: number,
        public birthDate?: Moment,
        public gender?: Gender,
        public photo?: string
    ) {}
}
