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
}