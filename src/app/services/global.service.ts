import { Injectable } from '@angular/core';
import { VendorService } from './vendor.service';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { info } from 'console';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
  public nationalities: any[] = [
    'Colombiano-A',
    'Abjasio-A',
    'Acrotirense',
    'Afgano-A',
    'Albanés-Sa',
    'Alemán-Na',
    'Andorrano-A',
    'Angoleño-A',
    'Anguilense',
    'Antiguano-A',
    'Argelino-A',
    'Argentino-A',
    'Armenio-A',
    'Artsají',
    'Arubeño-A',
    'Australiano-A',
    'Austriaco-A',
    'Azerbaiyano-A',
    'Bahameño-A',
    'Bangladesí',
    'Barbadense',
    'Bareiní',
    'Belga',
    'Beliceño-A',
    'Beninés-Sa',
    'Bermudeño-A',
    'Bielorruso-A',
    'Birmano-A',
    'Boliviano-A',
    'Bosnio-A',
    'Botsuano-A',
    'Brasileño-A',
    'Británico-A',
    'Bruneano-A',
    'Burkinés-Sa',
    'Burundés-Sa',
    'Butanés-Sa',
    'Búlgaro-A',
    'Caboverdiano-A',
    'Caimanés',
    'Camboyano-A',
    'Camerunés-Sa',
    'Canadiense',
    'Catarí',
    'Ceilanés-Sa',
    'Centroafricano-A',
    'Chadiano-A',
    'Chamorro-A',
    'Checo-A',
    'Chileno-A',
    'Chino-A',
    'Chipriota',
    'Cocano-A',
    'Comorense',
    'Congoleño-A',
    'Cookiano-A',
    'Costarricense',
    'Croata',
    'Cubano-A',
    'Curazoleño-A',
    'Danés-Sa',
    'Dhekeliano',
    'Dominicano-A',
    'Dominiqués-Sa',
    'Ecuatoriano-A',
    'Egipcio-A',
    'Emiratí',
    'Eritreo-A',
    'Eslovaco-A',
    'Esloveno-A',
    'Español-La',
    'Estadounidense',
    'Estonio-A',
    'Etíope',
    'Feroés-Sa',
    'Filipino-A',
    'Finlandés-Sa',
    'Fiyiano-A',
    'Francopolinesio-A',
    'Francés-Sa',
    'Gabonés-Sa',
    'Gambiano-A',
    'Georgiano-A',
    'Ghanés-Sa',
    'Gibraltareño-A',
    'Granadino-A',
    'Griego-A',
    'Groenlandés-Sa',
    'Guameño-A',
    'Guatemalteco-A',
    'Guerneseyés-Sa',
    'Guineano-A',
    'Guyanés-Sa',
    'Haitiano-A',
    'Hondureño-A',
    'Hongkonés-Sa',
    'Húngaro-A',
    'Indio-A',
    'Indonesio-Sia',
    'Iraní',
    'Iraquí',
    'Irlandés-Sa',
    'Islandés-Sa',
    'Israelí',
    'Italiano-A',
    'Jamaicano-A',
    'Japonés-Sa',
    'Jerseyés-Sa',
    'Jordano-A',
    'Kazajo-A',
    'Keniano-A',
    'Kirguís',
    'Kiribatiano-A',
    'Kosovar',
    'Kuwaití',
    'Laosiano-A',
    'Lesotense',
    'Letón-Na',
    'Libanés-Sa',
    'Liberiano-A',
    'Libio-A',
    'Liechtensteiniano-A',
    'Lituano-A',
    'Luxemburgués-Sa',
    'Macaense',
    'Macedonio-A',
    'Malasio-A',
    'Malauí',
    'Maldivo-A',
    'Malgaches',
    'Maliense',
    'Maltés-Sa',
    'Malvinense',
    'Manés-Sa',
    'Marfileño-A',
    'Marroquí',
    'Marshalés-Sa',
    'Mauriciano-A',
    'Mauritano-A',
    'Mexicano-A',
    'Micronesio-A',
    'Moldavo-A',
    'Monegasco-A',
    'Mongol-La',
    'Monserratino-A',
    'Montenegrino-A',
    'Mozambiqueño-A',
    'Namibio-A',
    'Nauruano-A',
    'Navideño-A',
    'Neerlandés-Sa',
    'Neocaledonio-A',
    'Neorruso',
    'Neozelandés-Sa',
    'Nepalés-Sa',
    'Nicaragüense',
    'Nigeriano-A',
    'Nigerino-A',
    'Niueño-A',
    'Norchipriota',
    'Norcoreano-A',
    'Norfolkense',
    'Noruego-A',
    'Omaní',
    'Pakistaní',
    'Palauano-A',
    'Palestino-A',
    'Panameño-A',
    'Papú',
    'Paraguayo-A',
    'Peruano-A',
    'Pitcairnés-Sa',
    'Polaco-A',
    'Portugués-Sa',
    'Puertorriqueño-A',
    'Ruandés-Sa',
    'Rumano-A',
    'Ruso-A',
    'Saharaui',
    'Salomonense',
    'Salvadoreño-A',
    'Samoamericano-A',
    'Samoano-A',
    'Sanbartolomeano-A',
    'Sancristobaleño-A',
    'Sanmarinense',
    'Sanmartitense',
    'Sanpedrino-A',
    'Santaheleno-A',
    'Santalucense',
    'Santotomense',
    'Sanvicentino-A',
    'Saudí',
    'Senegalés-Sa',
    'Serbio-A',
    'Seychellense',
    'Sierraleonés-Sa',
    'Singapurense',
    'Sirio-A',
    'Somalilandés-Sa',
    'Somalí',
    'Suazi',
    'Sudafricano-A',
    'Sudanés-Sa',
    'Sueco-A',
    'Suizo-A',
    'Surcoreano-A',
    'Surinamés-Sa',
    'Surosetio-A',
    'Sursudanés-Sa',
    'Svalbarense',
    'Tailandés-Sa',
    'Taiwanés-Sa',
    'Tanzano-A',
    'Tayiko-A',
    'Timorense',
    'Togolés-Sa',
    'Tokelauense',
    'Tongano-A',
    'Transnistrio-A',
    'Trinitense',
    'Tunecino-A',
    'Turco-A',
    'Turcocaiqueño-A',
    'Turcomano-A',
    'Tuvaluano-A',
    'Ucraniano-A',
    'Ugandés-Sa',
    'Uruguayo-A',
    'Uzbeko-A',
    'Vanuatuense',
    'Vaticano-A',
    'Venezolano-A',
    'Vietnamita',
    'Virgenense Británico-A',
    'Virgenense Estadounidense',
    'Walisiano-A',
    'Yemení',
    'Yibutiano-A',
    'Zambiano-A',
    'Zimbabuense',
  ];

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
      afp: data[('pension')],
      occupational_risk_administrators_id: data[('arl')],
      legal_representatives_name: data[('legal_representatives_name')],
      legal_representatives_telephone: data[('legal_representatives_telephone')],
      legal_representatives_email: data[('legal_representatives_email')],
      electronic_billing_name: data[('electronic_billing_name')],
      electronic_billing_email: data[('electronic_billing_email')],
      electronic_billing_telephone: data[('electronic_billing_telephone')],
      accounting_responsible_name: data[('accounting_responsible_name')],
      accounting_responsible_telephone: data[('accounting_responsible_telephone')],
      accounting_responsible_email: data[('accounting_responsible_email')],
      accounting_responsible_position: data[('accounting_responsible_position')],
      treasury_responsible_name: data[('treasury_responsible_name')],
      treasury_responsible_telephone: data[('treasury_responsible_telephone')],
      treasury_responsible_email: data[('treasury_responsible_email')],
      treasury_responsible_position: data[('treasury_responsible_position')],
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
      last_close_expenses: data[('last_close_expenses')],
      last_year_expenses: data[('last_year_expenses')],
      is_pep: data[('is_pep')],
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
          value: data[('allergy')],
          description: data[('allergy_description')]
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
          "vendor_inf_add_type_id": 122,
          "value": data[('simple_regime')]
        },
        {
          "vendor_inf_add_type_id": 123,
          "value": data[('self_withholding')]
        },
        {
          "vendor_inf_add_type_id": 124,
          "value": data[('big_contributor')]
        }
      ]
    }
  }

  setEditVinculationForm(form: any, vendor: any, vendorAnswers: any[]) {
    form.get('artistic_name')?.setValue(vendor?.actor_artistic_name || '');
    form.get('fecha_nacimiento')?.setValue(vendor?.birth_date || '');
    form.get('nacionalidad')?.setValue(vendor?.nationality || '');
    form.get('genero_id')?.setValue(vendor?.genders_id || 0);
    form.get('direccion')?.setValue(vendor?.address || '');
    form.get('ciudad')?.setValue(vendor?.city || '');
    form.get('telefono')?.setValue(vendor?.telephone || '');
    form.get('eps')?.setValue(vendor?.eps || '');
    form.get('pension')?.setValue(vendor?.afp || '');
    form.get('madre_padre_description')?.setValue(vendor?.children_number || '');
    form.get('profesion')?.setValue(vendor?.occupation || '');
    form.get('nombre_banco')?.setValue(vendor?.bank_branch || '');
    form.get('numero_cuenta')?.setValue(vendor?.bank_key || '');
    form.get('pago_medio_id')?.setValue(vendor?.f_payment_regime_methods_id || '');
    form.get('grupo_sanguineo')?.setValue(vendor?.blood_type_id || '');
    form.get('arl_id')?.setValue(vendor?.occupational_risk_administrators_id || '');
    form.get('type_regimen_id')?.setValue(vendor?.f_contractor_regime_types_id || '');
    form.get('type_vendor_id')?.setValue(vendor?.f_type_of_company_regimes_id || '');
    form.get('nombre_emergencia')?.setValue(vendor?.emergency_contact_name || '');
    form.get('telefono_emergencia')?.setValue(vendor?.emergency_contact_telephone || '');
    form.get('eps_id')?.setValue(vendor?.f_type_contributing_epses_id || '');
    form.get('type_cuenta_id')?.setValue(vendor?.f_vendor_bank_account_type_id || '');
    //yes or no
    form.get('madre_padre')?.setValue(this.getQuestionData(12, vendorAnswers));
    form.get('mascota')?.setValue(this.getQuestionData(13, vendorAnswers));
    form.get('informacion_futura')?.setValue(this.getQuestionData(14, vendorAnswers));
    form.get('permisos_entidades')?.setValue(this.getQuestionData(15, vendorAnswers));
    form.get('datos_otros')?.setValue(this.getQuestionData(16, vendorAnswers));
    form.get('permisos_eventos')?.setValue(this.getQuestionData(17, vendorAnswers));
    form.get('vinculo')?.setValue(this.getQuestionData(18, vendorAnswers, 'vinculo', form));
    form.get('vinculo_description')?.setValue(this.getDescription(18, vendorAnswers));
    form.get('relacion')?.setValue(this.getQuestionData(20, vendorAnswers, 'relacion', form));
    form.get('relacion_description')?.setValue(this.getDescription(20, vendorAnswers));
    form.get('restriccion')?.setValue(this.getQuestionData(23, vendorAnswers, 'restriccion', form));
    form.get('restriccion_description')?.setValue(this.getDescription(23, vendorAnswers));
    form.get('alergia')?.setValue(this.getQuestionData(24, vendorAnswers, 'alergia', form));
    form.get('alergia_description')?.setValue(this.getDescription(24, vendorAnswers));
    form.get('autorizacion_media')?.setValue(this.getQuestionData(26, vendorAnswers));
    form.get('payroll')?.setValue(this.getQuestionData(27, vendorAnswers, 'payroll', form));
    form.get('payroll_description')?.setValue(this.getDescription(27, vendorAnswers));
    form.get('informacion_futura_actor')?.setValue(this.getQuestionData(58, vendorAnswers, 'informacion_futura_actor', form));
    form.get('autorizacion_media_actor')?.setValue(this.getQuestionData(59, vendorAnswers, 'autorizacion_media_actor', form));
    form.get('permisos_entidades_actor')?.setValue(this.getQuestionData(60, vendorAnswers, 'permisos_entidades_actor', form));
    form.get('datos_otros_actor')?.setValue(this.getQuestionData(61, vendorAnswers, 'datos_otros_actor', form));
    form.get('permisos_eventos_actor')?.setValue(this.getQuestionData(62, vendorAnswers, 'permisos_eventos_actor', form));
    form.get('vinculo_actor')?.setValue(this.getQuestionData(63, vendorAnswers, 'vinculo_actor', form));
    form.get('vinculo_description_actor')?.setValue(this.getDescription(63, vendorAnswers));
    form.get('relacion_actor')?.setValue(this.getQuestionData(65, vendorAnswers, 'vinculo_actor', form));
    form.get('relacion_description_actor')?.setValue(this.getDescription(65, vendorAnswers));
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

  constructor(private _vS: VendorService, private _snackBar: MatSnackBar) { }
}
