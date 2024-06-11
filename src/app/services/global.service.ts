import { Injectable } from '@angular/core';
import { VendorService } from './vendor.service';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { info } from 'console';
import { file_types } from '../shared/interfaces/files_types';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
  setVinculationForm(data: any) {
    var formData = {
      name: data[('name')],
      f_document_type_id: data[('document_type_id')],
      document: data[('document')],
      ciiu: data[('ciiu')],
      f_vendor_economic_act_id: data[('economic_activity_id')],
      address: data[('address')],
      city: data[('city')],
      department: data[('department')],
      telephone: data[('telephone')],
      email: data[('email')],
      emergency_contact_name: data[('emergency_contact_name')],
      emergency_contact_telephone: data[('emergency_contact_telephone')],
      emergency_contact_kinship: data[('emergency_contact_kinship')],
      eps: data[('eps')],
      arl: data[('arl')],
      afp: data[('afp')],
      layoffs: data[('layoffs')],
      cmo_level_risk_arl_id: data[('risk_level')],
      pepff: data[('pepff')],
      legal_representative_name: data[('legal_representative_name')],
      legal_representative_telephone: data[('legal_representative_telephone')],
      legal_representative_email: data[('legal_representative_email')],
      f_document_representative: data[('f_document_representative')],
      electronic_billing_name: data[('electronic_billing_name')],
      electronic_billing_email: data[('electronic_billing_email')],
      electronic_billing_telephone: data[('electronic_billing_telephone')],
      accounting_responsible_name: data[('accounting_responsible_name')],
      accounting_responsible_telephone: data[('accounting_responsible_telephone')],
      accounting_responsible_email: data[('accounting_responsible_email')],
      accounting_responsible_position: data[('accounting_responsible_position')],
      treassury_responsible_name: data[('treassury_responsible_name')],
      treassury_responsible_telephone: data[('treassury_responsible_telephone')],
      treassury_responsible_email: data[('treassury_responsible_email')],
      treassury_responsible_position: data[('treassury_responsible_position')],
      commercial_responsible_name: data[('commercial_responsible_name')],
      commercial_responsible_telephone: data[('commercial_responsible_telephone')],
      commercial_responsible_email: data[('commercial_responsible_email')],
      confidential_responsible_address: data[('confidential_responsible_address')],
      confidential_responsible_email: data[('confidential_responsible_email')],
      last_close_assets: data[('last_close_assets')],
      last_year_assets: data[('last_year_assets')],
      last_close_liabilities: data[('last_close_liabilities')],
      last_year_liabilities: data[('last_year_liabilities')],
      last_close_income: data[('last_close_income')],
      last_year_income: data[('last_year_income')],
      last_close_equity: data[('last_close_equity')],
      last_year_equity: data[('last_year_equity')],
      last_close_expense: data[('last_close_expense')],
      last_year_expenses: data[('last_year_expenses')],
      is_pep: data[('is_pep')],
      form_responsible_name: data[('form_responsible_name')],
      form_responsible_document: data[('form_responsible_document')],
      form_responsible_position: data[('form_responsible_position')],
      cv_link: data[('cv_link')],
      info_additional: [
        {
          info_additional_type_id: 110,
          value: data[('illness')],
          description: data[('illness_description')]
        },
        {
          info_additional_type_id: 111,
          value: data[('medicines')],
          description: data[('medicines_description')]
        },
        {
          info_additional_type_id: 112,
          value: data[('allergies')],
          description: data[('allergies_description')]
        },
        {
          info_additional_type_id: 113,
          value: data[('food_restrictions')],
          description: data[('food_restrictions_description')]
        },
        {
          info_additional_type_id: 114,
          value: data[('phobias')],
          description: data[('phobias_description')]
        },
        {
          info_additional_type_id: 115,
          value: data[('income_tax_declarant')],
          description: data[('income_tax_declarant_description')]
        },
        {
          info_additional_type_id: 116,
          value: data[('dependents')],
          description: data[('dependents_description')]
        },
        {
          info_additional_type_id: 117,
          value: data[('prepaid_medicine')],
          description: data[('prepaid_medicine_description')]
        },
        {
          info_additional_type_id: 118,
          value: data[('mortgage_credit')],
          description: data[('mortgage_credit_description')]
        },
        {
          info_additional_type_id: 119,
          value: data[('voluntary_contributions')],
          description: data[('voluntary_contributions_description')]
        },
        {
          info_additional_type_id: 120,
          value: data[('afc_account')],
          description: data[('afc_account_description')]
        },
        {
          info_additional_type_id: 121,
          value: data[('vat_responsible')],
          description: data[('vat_responsible_description')]
        },
        {
          info_additional_type_id: 122,
          value: data[('simple_regime')]
        },
        {
          info_additional_type_id: 123,
          value: data[('self_withholding')]
        },
        {
          info_additional_type_id: 124,
          value: data[('big_contributor')]
        }
      ]
    }

    return formData;
  }

  fillInitialVinculationForm(form: any, data: any) {
    form.get('name')?.setValue(data?.name || '');
    form.get('document_type_id')?.setValue(data?.f_document_type_id || '');
    form.get('document')?.setValue(data?.document || '');
    form.get('ciiu')?.setValue(data?.ciiu || '');
    form.get('f_vendor_economic_act_id')?.setValue(data?.economic_activity_id || '');
    form.get('address')?.setValue(data?.address || '');
    form.get('city')?.setValue(data?.city || '');
    form.get('department')?.setValue(data?.department || '');
    form.get('telephone')?.setValue(data?.telephone || '');
    form.get('email')?.setValue(data?.email || '');
    form.get('emergency_contact_name')?.setValue(data?.emergency_contact_name || '');
    form.get('emergency_contact_telephone')?.setValue(data?.emergency_contact_telephone || '');
    form.get('emergency_contact_kinship')?.setValue(data?.emergency_contact_kinship || '');
    form.get('eps')?.setValue(data?.eps || '');
    form.get('economic_activity')?.setValue(data?.economic_activity || '');
    form.get('economic_activity_id')?.setValue(data?.f_vendor_economic_act_id || '');
    form.get('afp')?.setValue(data?.afp || '');
    form.get('arl')?.setValue(data?.arl || '');
    form.get('risk_level')?.setValue(data?.cmo_level_risk_arl_id || '');
    form.get('layoffs')?.setValue(data?.layoffs || '');
    form.get('legal_representative_name')?.setValue(data?.legal_representative_name || '');
    form.get('legal_representative_telephone')?.setValue(data?.legal_representative_telephone || '');
    form.get('legal_representative_email')?.setValue(data?.legal_representative_email || '');
    form.get('f_document_representative')?.setValue(data?.legal_representative_document || '');
    form.get('electronic_billing_name')?.setValue(data?.electronic_billing_name || '');
    form.get('electronic_billing_email')?.setValue(data?.electronic_billing_email || '');
    form.get('electronic_billing_telephone')?.setValue(data?.electronic_billing_telephone || '');
    form.get('accounting_responsible_name')?.setValue(data?.accounting_responsible_name || '');
    form.get('accounting_responsible_telephone')?.setValue(data?.accounting_responsible_telephone || '');
    form.get('accounting_responsible_email')?.setValue(data?.accounting_responsible_email || '');
    form.get('accounting_responsible_position')?.setValue(data?.accounting_responsible_position || '');
    form.get('treassury_responsible_name')?.setValue(data?.treassury_responsible_name || '');
    form.get('treassury_responsible_telephone')?.setValue(data?.treassury_responsible_telephone || '');
    form.get('treassury_responsible_email')?.setValue(data?.treassury_responsible_email || '');
    form.get('treassury_responsible_position')?.setValue(data?.treassury_responsible_position || '');
    form.get('commercial_responsible_name')?.setValue(data?.commercial_responsible_name || '');
    form.get('commercial_responsible_telephone')?.setValue(data?.commercial_responsible_telephone || '');
    form.get('commercial_responsible_email')?.setValue(data?.commercial_responsible_email || '');
    form.get('confidential_responsible_address')?.setValue(data?.confidential_responsible_address || '');
    form.get('confidential_responsible_email')?.setValue(data?.confidential_responsible_email || '');
    form.get('last_close_assets')?.setValue(data?.last_close_assets || '');
    form.get('last_year_assets')?.setValue(data?.last_year_assets || '');
    form.get('last_close_liabilities')?.setValue(data?.last_close_liabilities || '');
    form.get('last_year_liabilities')?.setValue(data?.last_year_liabilities || '');
    form.get('last_close_income')?.setValue(data?.last_close_income || '');
    form.get('last_year_income')?.setValue(data?.last_year_income || '');
    form.get('last_close_equity')?.setValue(data?.last_close_equity || '');
    form.get('last_year_equity')?.setValue(data?.last_year_equity || '');
    form.get('last_close_expense')?.setValue(data?.last_close_expense || '');
    form.get('last_year_expenses')?.setValue(data?.last_year_expenses || '');
    form.get('is_pep')?.setValue(data?.pep ? '1' : '0');
    form.get('form_responsible_name')?.setValue(data?.form_responsible_name || '');
    form.get('form_responsible_document')?.setValue(data?.form_responsible_document || '');
    form.get('form_responsible_position')?.setValue(data?.form_responsible_position || '');
    form.get('signature')?.setValue(this.getDocumentLink(324));
    form.get('cv_link')?.setValue(data?.cv_link || '');
    console.log(this._vS.getDocumentsList())
    console.log(form.get('signature')?.value)

    // Setting additional info
    const info_additional = data?.info_additional;
    for (let info of info_additional) {
      switch(info.id) {
        case 110:
          form.get('illness')?.setValue((info.value ? '1' : '0'));
          form.get('illness_description')?.setValue(info.description || '');
          break;
        case 111:
          form.get('medicines')?.setValue(info.value ? '1' : '0');
          form.get('medicines_description')?.setValue(info.description || '');
          break;
        case 112:
          form.get('allergies')?.setValue(info.value ? '1' : '0');
          form.get('allergies_description')?.setValue(info.description || '');
          break;
        case 113:
          form.get('food_restrictions')?.setValue(info.value ? '1' : '0');
          form.get('food_restrictions_description')?.setValue(info.description || '');
          break;
        case 114:
          form.get('phobias')?.setValue(info.value ? '1' : '0');
          form.get('phobias_description')?.setValue(info.description || '');
          break;
        case 115:
          form.get('income_tax_declarant')?.setValue(info.value ? '1' : '0');
          form.get('income_tax_declarant_description')?.setValue(info.description || '');
          break;
        case 116:
          form.get('dependents')?.setValue(info.value ? '1' : '0');
          form.get('dependents_description')?.setValue(info.description || '');
          break;
        case 117:
          form.get('prepaid_medicine')?.setValue(info.value ? '1' : '0');
          form.get('prepaid_medicine_description')?.setValue(info.description || '');
          break;
        case 118:
          form.get('mortgage_credit')?.setValue(info.value ? '1' : '0');
          form.get('mortgage_credit_description')?.setValue(info.description || '');
          break;
        case 119:
          form.get('voluntary_contributions')?.setValue(info.value ? '1' : '0');
          form.get('voluntary_contributions_description')?.setValue(info.description || '');
          break;
        case 120:
          form.get('afc_account')?.setValue(info.value ? '1' : '0');
          form.get('afc_account_description')?.setValue(info.description || '');
          break;
        case 121:
          form.get('vat_responsible')?.setValue(info.value ? '1' : '0');
          form.get('vat_responsible_description')?.setValue(info.description || '');
          break;
        case 122:
          form.get('simple_regime')?.setValue(info.value ? '1' : '0');
          break;
        case 123:
          form.get('self_withholding')?.setValue(info.value ? '1' : '0');
          break;
        case 124:
          form.get('big_contributor')?.setValue(info.value ? '1' : '0');
          break;
      }
    }
  }
  

  getQuestionData(id: any, answers: any[], controlName?: string, form?: any) {
    let answer = answers.find((an: any) => an.id == id);
    if (answer.value === true && controlName) {
      form.get(`${controlName}_description`)?.setValidators(Validators.required);
    } 
    else if (answer.value !== true && controlName){
      form.get(`${controlName}_description`)?.removeValidators(Validators.required);
    }
    if (answer) return answer.value === true ? "1" : (answer.value === false ? "0" : null);
    else return null;
  }

  getDescription(id: any, answers: any[]) {
    let answer = answers.find((an: any) => an.id == id);
    if (answer) return answer.description ? answer.description : null;
    else return null;
  }

  getDocumentLink(id: any) {
    let documentsList = this._vS.getDocumentsList();
    let document = documentsList.find((dl: any) => dl.id == id);
    const file = document.link ? { name: document.link, url: document.link, document_id: document?.document_id } : null;
    return file;
  }

  normalizeString(strAccents:string) {
    return strAccents.replace(/\s/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  openSnackBar(message: string, action: string = 'X', duration: number = 10000) {
		this._snackBar.open(message, action, {
			duration: duration,
		});
	}

  formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${day}/${month}/${year}`;
  }

  constructor(private _vS: VendorService, private _snackBar: MatSnackBar) { }
}
