import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  authToken: any;
  user: any;

  constructor(private _http: HttpClient) { }

  registerUser(user){

    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');

    return this._http.post('http://localhost:3000/auth/register',user, {headers: headers});

  }

  loginUser(user){

    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');

    return this._http.post('http://localhost:3000/auth/login',user, {headers: headers});

  }

  getProfile(){

    let headers = new HttpHeaders();

    this.loadToken(); //avoiding 401 error
    headers = headers.append('auth-token', this.authToken);
    headers = headers.append('Content-Type', 'application/json');

    return this._http.get('http://localhost:3000/user/profile', {headers: headers});

  }

  updatePorfile(user){

    let headers = new HttpHeaders();

    this.loadToken(); //avoiding 401 error
    headers = headers.append('auth-token', this.authToken);
    headers = headers.append('Content-Type', 'application/json');

    return this._http.put('http://localhost:3000/user/profile',user, {headers: headers});

  }

  uploadCv(formData){

    let headers = new HttpHeaders();
    this.loadToken(); //avoiding 401 error

    headers = headers.append('auth-token', this.authToken);
    headers.append('Content-Type', 'multipart/form-data');

    return this._http.post('http://localhost:3000/user/upload', formData, { headers: headers });
}

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(): boolean {
    if (localStorage.getItem('id_token') == null) {
      return false
    } else {
      return true
    }
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }


  jobSearch(search){

    let headers = new HttpHeaders();

    this.loadToken(); //avoiding 401 error
    headers = headers.append('auth-token', this.authToken);
    headers = headers.append('Content-Type', 'application/json');

    return this._http.post('http://localhost:3000/user/search',search, {headers: headers});

  }

  getUserSearches(){
    let headers = new HttpHeaders();

    this.loadToken(); //avoiding 401 error
    headers = headers.append('auth-token', this.authToken);
    headers = headers.append('Content-Type', 'application/json');

    return this._http.get('http://localhost:3000/user/usersearch', {headers: headers});
  }


  deleteSearchById(id, search_text){

    let headers = new HttpHeaders();

    this.loadToken(); //avoiding 401 error
    headers = headers.append('auth-token', this.authToken);
    headers = headers.append('search_id', id);
    headers = headers.append('search-text', search_text);
    headers = headers.append('Content-Type', 'application/json');

    return this._http.delete('http://localhost:3000/user/search/delete', {headers: headers});
  }

  getAllJobs(){
    let headers = new HttpHeaders();

    this.loadToken(); //avoiding 401 error
    headers = headers.append('auth-token', this.authToken);
    headers = headers.append('Content-Type', 'application/json');

    return this._http.get('http://localhost:3000/user/jobs', {headers: headers});
  }

  getJobsBySearchText(text){
    let headers = new HttpHeaders();

    this.loadToken(); //avoiding 401 error
    headers = headers.append('auth-token', this.authToken);
    headers = headers.append('search-text', text);
    headers = headers.append('Content-Type', 'application/json');

    return this._http.get('http://localhost:3000/user/job/bytext', {headers: headers});
  }

  getJobById(id){
    let headers = new HttpHeaders();

    this.loadToken(); //avoiding 401 error
    headers = headers.append('auth-token', this.authToken);
    headers = headers.append('job_id', id);
    headers = headers.append('Content-Type', 'application/json');

    return this._http.get('http://localhost:3000/user/job', {headers: headers});
  }

  submitJobById(id){

    let headers = new HttpHeaders();

    this.loadToken(); //avoiding 401 error
    headers = headers.append('auth-token', this.authToken);
    headers = headers.append('job_id', id);
    headers = headers.append('Content-Type', 'application/json');

    return this._http.get('http://localhost:3000/user/job/submit', {headers: headers});
  }

  getSubmittedJobs(){
    let headers = new HttpHeaders();

    this.loadToken(); //avoiding 401 error
    headers = headers.append('auth-token', this.authToken);
    headers = headers.append('Content-Type', 'application/json');

    return this._http.get('http://localhost:3000/user/jobs/submitted', {headers: headers});
  }

  deleteJobById(id){

    let headers = new HttpHeaders();

    this.loadToken(); //avoiding 401 error
    headers = headers.append('auth-token', this.authToken);
    headers = headers.append('job_id', id);
    headers = headers.append('Content-Type', 'application/json');

    return this._http.delete('http://localhost:3000/user/job/delete', {headers: headers});
  }
  deleteAllJobs(){

    let headers = new HttpHeaders();

    this.loadToken(); //avoiding 401 error
    headers = headers.append('auth-token', this.authToken);
    headers = headers.append('Content-Type', 'application/json');

    return this._http.delete('http://localhost:3000/user/jobs/delete', {headers: headers});
  }

}
