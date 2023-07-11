import { Component } from '@angular/core';

@Component({
  selector: 'app-secure',
  template: `
  <h2>PROTECTED!</h2>
  <p>Only have access when logged in</p>`,
})
export class ProtectedComponent {}
