 import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { BrowserXhr } from "@angular/http"
 
 @Injectable()
 export class ProgressService {
     constructor(){
         console.log("first service called");
     }
    uploadProgress: Subject<any> = new Subject();
    downloadProgress: Subject<any> = new Subject();
 
}
 
 @Injectable()
 export class BroswerXhrWithProgress extends BrowserXhr {
 
     constructor( private progressService: ProgressService) {
         super();
         console.log("service called");
        }
        
         build(): XMLHttpRequest {
             var xhr: XMLHttpRequest = super.build();
             
             xhr.onprogress = (event) => {
                 this.progressService.downloadProgress.next(this.createProgress(event));
             }

            xhr.upload.onprogress = (event) => {
                 this.progressService.uploadProgress.next(this.createProgress(event));
             }
             return xhr;
      }

      private createProgress(event){
          return {
              total: event.total,
              percentage: Math.round(event.loaded / event.total) * 100
          }
      }
 }