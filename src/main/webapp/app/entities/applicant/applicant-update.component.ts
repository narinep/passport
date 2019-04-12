import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { IApplicant } from 'app/shared/model/applicant.model';
import { ApplicantService } from './applicant.service';

import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogService } from './confirmation-dialog.service';

@Component({
    selector: 'jhi-applicant-update',
    templateUrl: './applicant-update.component.html'
})
export class ApplicantUpdateComponent implements OnInit {
    applicant: IApplicant;
    isSaving: boolean;
    birthDateDp: any;

    constructor(
        protected applicantService: ApplicantService,
        protected activatedRoute: ActivatedRoute,
        private translateService: TranslateService,
        private confirmationDialogService: ConfirmationDialogService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ applicant }) => {
            this.applicant = applicant;
        });
    }

    previousState() {
        window.history.back();
    }

    confirm() {
        this.translateService.get('passportApp.applicant.update.question').subscribe((translatedMessage: string) => {
            this.confirmationDialogService
                .confirm('Please Confirm', translatedMessage, 'OK', 'Cancel', 'sm')
                .then(confirmed => {
                    if (confirmed) {
                        this.save();
                    }
                })
                .catch(() => {});
        });
    }

    save() {
        this.isSaving = true;
        if (this.applicant.id !== undefined) {
            this.subscribeToSaveResponse(this.applicantService.update(this.applicant));
        } else {
            this.subscribeToSaveResponse(this.applicantService.create(this.applicant));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IApplicant>>) {
        result.subscribe((res: HttpResponse<IApplicant>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
