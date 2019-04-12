import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IApplicant } from 'app/shared/model/applicant.model';
import { ApplicantService } from './applicant.service';

@Component({
    selector: 'jhi-applicant-delete-dialog',
    templateUrl: './applicant-delete-dialog.component.html'
})
export class ApplicantDeleteDialogComponent {
    applicant: IApplicant;

    constructor(
        protected applicantService: ApplicantService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.applicantService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'applicantListModification',
                content: 'Deleted an applicant'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-applicant-delete-popup',
    template: ''
})
export class ApplicantDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ applicant }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ApplicantDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.applicant = applicant;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/applicant', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/applicant', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
