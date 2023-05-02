import { Component, Inject, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { CONSTANTS } from '@core/services/constants';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-chunk-file-uploader',
  templateUrl: './chunk-file-uploader.component.html',
  styleUrls: ['./chunk-file-uploader.component.scss']
})
export class ChunkFileUploaderComponent implements OnInit {

  private token = this._authservice.getToken();
  public config: DropzoneConfigInterface = {
    chunking: true,
    forceChunking: false,
    autoProcessQueue: true,
    maxFilesize: 400000000,
    chunkSize: 1000000,
    retryChunks: true,
    retryChunksLimit: 3,
    parallelUploads: 3,
    paramName: "file",
    addRemoveLinks: !0,
    createImageThumbnails: false,
    thumbnailWidth: 120,
    thumbnailHeight: 120,
    url: this._apiGatewayService+'/api/cdn/v1/upload?user_id=11111',
    timeout: 0,
    headers: {
      [CONSTANTS.AUTH_HEADER]: `Bearer ${this.token}`
    },
  };
  constructor(
    @Inject('API_GATEWAY_SERVICE') private _apiGatewayService: string,
    private _authservice: AuthService
  ) { }

  ngOnInit(): void {
  }

  public onUploadInit(args: any): void {
    console.log('onUploadInit:', args);
  }

  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
  }

  onSending(data: any) {
    const formData = data[2];
    formData.append('article_id', '1231231231123');
    formData.append('user_id', '11111');
    formData.append('user_email', 'test@test.com');
    formData.append('user_name', 'koko');
  }

  onAddFile($event: any) {

  }

}
