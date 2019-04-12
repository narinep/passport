import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Applicant } from 'app/shared/model/applicant.model';
import { ApplicantService } from './applicant.service';
import { ApplicantComponent } from './applicant.component';
import { ApplicantDetailComponent } from './applicant-detail.component';
import { ApplicantUpdateComponent } from './applicant-update.component';
import { ApplicantDeletePopupComponent } from './applicant-delete-dialog.component';
import { IApplicant } from 'app/shared/model/applicant.model';

@Injectable({ providedIn: 'root' })
export class ApplicantResolve implements Resolve<IApplicant> {
    constructor(private service: ApplicantService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IApplicant> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Applicant>) => response.ok),
                map((applicant: HttpResponse<Applicant>) => applicant.body)
            );
        }
        return of(new Applicant());
    }
}

export const applicantRoute: Routes = [
    {
        path: '',
        component: ApplicantComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'passportApp.applicant.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ApplicantDetailComponent,
        resolve: {
            applicant: ApplicantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'passportApp.applicant.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ApplicantUpdateComponent,
        resolve: {
            applicant: ApplicantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'passportApp.applicant.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ApplicantUpdateComponent,
        resolve: {
            applicant: ApplicantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'passportApp.applicant.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const applicantPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ApplicantDeletePopupComponent,
        resolve: {
            applicant: ApplicantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'passportApp.applicant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
