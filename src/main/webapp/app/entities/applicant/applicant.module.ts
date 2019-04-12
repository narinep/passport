import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { PassportSharedModule } from 'app/shared';

import {
    ApplicantComponent,
    ApplicantDetailComponent,
    ApplicantUpdateComponent,
    ApplicantDeletePopupComponent,
    ApplicantDeleteDialogComponent,
    applicantRoute,
    applicantPopupRoute
} from './';

const ENTITY_STATES = [...applicantRoute, ...applicantPopupRoute];

@NgModule({
    imports: [PassportSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ApplicantComponent,
        ApplicantDetailComponent,
        ApplicantUpdateComponent,
        ApplicantDeleteDialogComponent,
        ApplicantDeletePopupComponent
    ],
    entryComponents: [ApplicantComponent, ApplicantUpdateComponent, ApplicantDeleteDialogComponent, ApplicantDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PassportApplicantModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
