import { Injectable } from '@angular/core';
import { VendorService } from './vendor.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceLodgingService {

  constructor(private vs: VendorService, private http: HttpClient) { }

  getDocumentTypes() {
    this.vs.setHeaders();
    return this.http.get(`${environment.apiUrl}cmo/get_document_types`, {
      headers: this.vs.getHeaders()
    });
  }

  // This function will retrieve three keys, purchaseOrders that haves an array of purchaseOrders ids, vendorEmail and the status of the request
  getPurchaseOrders(vendorDocument: number) {
    // send in params vendor_document
    this.vs.setHeaders();
    return this.http.get(`${environment.apiUrl}cmo/get_purchase_orders`, {
      headers: this.vs.getHeaders(),
      params: {
        vendor_document: vendorDocument.toString()
      }
    });
  }

  sendPurchaseOrdersToEmail(formValues: {
    email: string,
    purchaseOrdersIds: string
  }) {
    this.vs.setHeaders();
    return this.http.get(`${environment.apiUrl}cmo/send_purchase_orders_email`, {
      headers: this.vs.getHeaders(),
      params: {
        email: formValues.email,
        purchase_orders_ids: formValues.purchaseOrdersIds
      }
    });
  }

  authenticateUser(form: {

  }) {}

}