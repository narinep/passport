import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationDialogComponent } from './applicant/confirmation-dialog.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'applicant',
                loadChildren: './applicant/applicant.module#PassportApplicantModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [ConfirmationDialogComponent],
    entryComponents: [ConfirmationDialogComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PassportEntityModule {}
