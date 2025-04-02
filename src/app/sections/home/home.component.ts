import { Component } from '@angular/core';
import { LucideAngularModule, Download, Mail, Linkedin, Github, Twitter } from 'lucide-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [LucideAngularModule]
})
export class HomeComponent {
  protected readonly Download = Download;
  protected readonly Mail = Mail;
  protected readonly Linkedin = Linkedin;
  protected readonly Github = Github;
  protected readonly Twitter = Twitter;
}
