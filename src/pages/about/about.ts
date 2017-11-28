import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }


	function videoCapture() {
	   var options = {
	      limit: 1,
	      duration: 10
	   };
	   navigator.device.capture.captureVideo(onSuccess, onError, options);

	   function onSuccess(mediaFiles) {
	      var i, path, len;
	      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
	         path = mediaFiles[i].fullPath;
	         console.log(mediaFiles);
	      }
	   }

	   function onError(error) {
	      navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
	   }
	}
}
