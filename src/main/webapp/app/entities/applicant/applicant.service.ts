import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IApplicant } from 'app/shared/model/applicant.model';

type EntityResponseType = HttpResponse<IApplicant>;
type EntityArrayResponseType = HttpResponse<IApplicant[]>;

@Injectable({ providedIn: 'root' })
export class ApplicantService {
    public resourceUrl = SERVER_API_URL + 'api/applicants';

    constructor(protected http: HttpClient) {}

    create(applicant: IApplicant): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(applicant);
        return this.http
            .post<IApplicant>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(applicant: IApplicant): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(applicant);
        return this.http
            .put<IApplicant>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IApplicant>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IApplicant[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(applicant: IApplicant): IApplicant {
        const copy: IApplicant = Object.assign({}, applicant, {
            birthDate: applicant.birthDate != null && applicant.birthDate.isValid() ? applicant.birthDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.birthDate = res.body.birthDate != null ? moment(res.body.birthDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((applicant: IApplicant) => {
                applicant.birthDate = applicant.birthDate != null ? moment(applicant.birthDate) : null;
            });
        }
        return res;
    }
}
