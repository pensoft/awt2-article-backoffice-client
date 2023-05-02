import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input() accept = 'application/json';
  @Output() onFilesAdded: EventEmitter<object> = new EventEmitter();

  onSelect(event) {
    this.onFilesAdded.emit(event.addedFiles);
  }
}
