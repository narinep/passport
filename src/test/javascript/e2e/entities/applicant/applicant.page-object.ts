import { element, by, ElementFinder } from 'protractor';

export class ApplicantComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-applicant div table .btn-danger'));
    title = element.all(by.css('jhi-applicant div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ApplicantUpdatePage {
    pageTitle = element(by.id('jhi-applicant-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    firstnameInput = element(by.id('field_firstname'));
    lastnameInput = element(by.id('field_lastname'));
    ssnInput = element(by.id('field_ssn'));
    birthDateInput = element(by.id('field_birthDate'));
    genderSelect = element(by.id('field_gender'));
    photoInput = element(by.id('field_photo'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setFirstnameInput(firstname) {
        await this.firstnameInput.sendKeys(firstname);
    }

    async getFirstnameInput() {
        return this.firstnameInput.getAttribute('value');
    }

    async setLastnameInput(lastname) {
        await this.lastnameInput.sendKeys(lastname);
    }

    async getLastnameInput() {
        return this.lastnameInput.getAttribute('value');
    }

    async setSsnInput(ssn) {
        await this.ssnInput.sendKeys(ssn);
    }

    async getSsnInput() {
        return this.ssnInput.getAttribute('value');
    }

    async setBirthDateInput(birthDate) {
        await this.birthDateInput.sendKeys(birthDate);
    }

    async getBirthDateInput() {
        return this.birthDateInput.getAttribute('value');
    }

    async setGenderSelect(gender) {
        await this.genderSelect.sendKeys(gender);
    }

    async getGenderSelect() {
        return this.genderSelect.element(by.css('option:checked')).getText();
    }

    async genderSelectLastOption() {
        await this.genderSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setPhotoInput(photo) {
        await this.photoInput.sendKeys(photo);
    }

    async getPhotoInput() {
        return this.photoInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class ApplicantDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-applicant-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-applicant'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
