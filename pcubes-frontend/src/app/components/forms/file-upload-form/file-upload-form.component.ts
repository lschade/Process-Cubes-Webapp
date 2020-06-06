import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload-form',
  templateUrl: './file-upload-form.component.html',
  styleUrls: ['./file-upload-form.component.scss']
})
export class FileUploadFormComponent implements OnInit {

  file: File = null;


  constructor() { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.file = files.item(0);
  }
}
