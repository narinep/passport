/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ApplicantComponentsPage, ApplicantDeleteDialog, ApplicantUpdatePage } from './applicant.page-object';

const expect = chai.expect;

describe('Applicant e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let applicantUpdatePage: ApplicantUpdatePage;
    let applicantComponentsPage: ApplicantComponentsPage;
    let applicantDeleteDialog: ApplicantDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Applicants', async () => {
        await navBarPage.goToEntity('applicant');
        applicantComponentsPage = new ApplicantComponentsPage();
        await browser.wait(ec.visibilityOf(applicantComponentsPage.title), 5000);
        expect(await applicantComponentsPage.getTitle()).to.eq('passportApp.applicant.home.title');
    });

    it('should load create Applicant page', async () => {
        await applicantComponentsPage.clickOnCreateButton();
        applicantUpdatePage = new ApplicantUpdatePage();
        expect(await applicantUpdatePage.getPageTitle()).to.eq('passportApp.applicant.home.createOrEditLabel');
        await applicantUpdatePage.cancel();
    });

    it('should create and save Applicants', async () => {
        const nbButtonsBeforeCreate = await applicantComponentsPage.countDeleteButtons();

        await applicantComponentsPage.clickOnCreateButton();
        await promise.all([
            applicantUpdatePage.setFirstnameInput('firstname'),
            applicantUpdatePage.setLastnameInput('lastname'),
            applicantUpdatePage.setSsnInput('5'),
            applicantUpdatePage.setBirthDateInput('2000-12-31'),
            applicantUpdatePage.genderSelectLastOption(),
            applicantUpdatePage.setPhotoInput('photo')
        ]);
        expect(await applicantUpdatePage.getFirstnameInput()).to.eq('firstname');
        expect(await applicantUpdatePage.getLastnameInput()).to.eq('lastname');
        expect(await applicantUpdatePage.getSsnInput()).to.eq('5');
        expect(await applicantUpdatePage.getBirthDateInput()).to.eq('2000-12-31');
        expect(await applicantUpdatePage.getPhotoInput()).to.eq('photo');
        await applicantUpdatePage.save();
        expect(await applicantUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await applicantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Applicant', async () => {
        const nbButtonsBeforeDelete = await applicantComponentsPage.countDeleteButtons();
        await applicantComponentsPage.clickOnLastDeleteButton();

        applicantDeleteDialog = new ApplicantDeleteDialog();
        expect(await applicantDeleteDialog.getDialogTitle()).to.eq('passportApp.applicant.delete.question');
        await applicantDeleteDialog.clickOnConfirmButton();

        expect(await applicantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
