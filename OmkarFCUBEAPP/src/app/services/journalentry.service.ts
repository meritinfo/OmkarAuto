import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { bankreceiptentrymodel } from '../models/bankreceiptentrymodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { bankreceiptentrylistmodel } from '../models/bankreceiptentrylistmodel';
import { Journalentrymodel } from '../models/journalentrymodel';
import { Journalentrylistmodel } from '../models/journalentrylistmodel';

@Injectable({
  providedIn: 'root'
})
export class JournalEntryService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')?.toString()}`
    })
  }
  selectedJournalEntry = new bankreceiptentrymodel();
  constructor(private httpClient: HttpClient) { }
  setJournalEntryDetails(docrenewalmaster: bankreceiptentrymodel) {
 
      this.selectedJournalEntry = docrenewalmaster;
    
  
  }
  getJournalEntryDetails() {
    return this.selectedJournalEntry;
  }
  clearjournalEntryDetails() {
  //  this.selectedBankreceiptentry = new bankreceiptentrymodel();
  }
  journalEntryDetailsSubmitted(user: Journalentrymodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/JournalEntrySave', user, this.httpOptions);
  }
  journalEntryList(filter: Filtermodel): Observable<Journalentrylistmodel> {
    return this.httpClient.post<Journalentrylistmodel>(Constants.API_ENDPOINT + 'FinTrans/GetJournalEntryList', filter, this.httpOptions);
  }
}
