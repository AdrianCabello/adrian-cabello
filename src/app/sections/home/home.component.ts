import { Component } from '@angular/core';
import { LucideAngularModule, Download, Mail, Linkedin, Github, Twitter } from 'lucide-angular';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [LucideAngularModule, CommonModule]
})
export class HomeComponent {
  protected readonly Download = Download;
  protected readonly Mail = Mail;
  protected readonly Linkedin = Linkedin;
  protected readonly Github = Github;
  protected readonly Twitter = Twitter;
  
  isLoading = true;

  onImageLoad() {
    this.isLoading = false;
  }
}
