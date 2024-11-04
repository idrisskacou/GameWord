import { Component, HostListener, inject, model, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LoggerService } from '../../logger.service';
import { error } from 'console';
import { getLlama, Llama } from 'node-llama-cpp';
import { AiService } from '../ai.service';

// interface Message {
//   author: 'user' | 'bot';
//   content: string;
// }


@Component({
  selector: 'app-ai',
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.css',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ]
})

export class AiComponent implements OnInit, OnChanges, OnDestroy {
  
  nextId = 1;
  prompt = "You are a chatbot who is very argumentative; you disagree with anything in the conversation and you challenge everything, in a snarky way.";
  system_prompt = "This is a system prompt.";
  user_prompt = "Hi there, I'm Idriss. Nice to meet you.";
  assistant_prompt = "You are a very polite, courteous chatbot. You try to agree with everything the other person says, or find common ground.";
  user = 'user';
  value: string = '';
  messages = [{ author: 'bot', content: 'Welcome to Kacou GPT!' }];
  isResizing: boolean = false;
  lastDownX: number = 0;
  private id = this.nextId++;
  messageidea = [
    {
      'role': 'user', 'content': this.user_prompt
    },
    {
      'role':'system', 'content': this.system_prompt
    },{
      'role':'assistant', 'content': this.assistant_prompt
    }];

  constructor(private aiService: AiService, private logger: LoggerService) {}

  // Lifecycle hook for component initialization
  ngOnInit(): void {
    this.logger.log(`Spy #${this.id} onInit`);
  }

  // Lifecycle hook for changes in data-bound properties
  ngOnChanges(changes: SimpleChanges): void {
    this.logger.log(`Spy #${this.id} onChanges`);
  }

  // Lifecycle hook for component destruction
  ngOnDestroy(): void {
    this.logger.log(`Spy #${this.id} onDestroy`);
  }

  

  ai() {
    console.log("AI page load...");
  }
  
}