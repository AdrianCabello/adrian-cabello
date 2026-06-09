import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import {
  BootstrapData,
  PersonalDashboardService,
  TaskPriority,
  TaskStatus,
} from '../../services/personal-dashboard.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ButtonModule, InputNumberModule, InputTextModule, SelectModule, TextareaModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss',
})
export class NewTaskComponent implements OnInit {
  protected readonly isLoadingAreas = signal(true);
  protected readonly isSaving = signal(false);
  protected readonly error = signal('');
  protected readonly message = signal('');
  protected readonly bootstrapData = signal<BootstrapData | null>(null);

  protected title = '';
  protected description = '';
  protected priority: TaskPriority = 'HIGH';
  protected status: TaskStatus = 'TODO';
  protected areaId = '';
  protected scheduledDate = this.toDateInputValue(new Date());
  protected dueDate = '';
  protected minutes: number | null = 30;

  protected readonly priorityOptions = [
    { label: 'Urgente', value: 'URGENT' },
    { label: 'Alta', value: 'HIGH' },
    { label: 'Normal', value: 'NORMAL' },
    { label: 'Baja', value: 'LOW' },
  ];
  protected readonly statusOptions = [
    { label: 'Por hacer', value: 'TODO' },
    { label: 'En progreso', value: 'IN_PROGRESS' },
  ];

  constructor(private readonly dashboardService: PersonalDashboardService) {}

  ngOnInit(): void {
    this.dashboardService.bootstrap().subscribe({
      next: (bootstrap) => {
        this.bootstrapData.set(bootstrap);
        this.areaId = bootstrap.areas[0]?.id ?? '';
        this.isLoadingAreas.set(false);
      },
      error: () => {
        this.error.set('No pude cargar las areas.');
        this.isLoadingAreas.set(false);
      },
    });
  }

  protected createTask(): void {
    const cleanTitle = this.title.trim();
    if (!cleanTitle) {
      this.error.set('Pone un titulo para crear la tarea.');
      return;
    }

    this.isSaving.set(true);
    this.error.set('');
    this.message.set('');

    this.dashboardService
      .createTask({
        title: cleanTitle,
        description: this.description.trim() || undefined,
        priority: this.priority,
        status: this.status,
        areaId: this.areaId || undefined,
        scheduledDate: this.toIsoFromInput(this.scheduledDate),
        dueDate: this.toIsoFromInput(this.dueDate),
        estimatedMinutes: this.minutes ?? undefined,
      })
      .subscribe({
        next: () => {
          this.title = '';
          this.description = '';
          this.dueDate = '';
          this.minutes = 30;
          this.message.set('Tarea creada.');
          this.isSaving.set(false);
        },
        error: () => {
          this.error.set('No pude crear la tarea.');
          this.isSaving.set(false);
        },
      });
  }

  private toIsoFromInput(value: string): string | undefined {
    if (!value) return undefined;
    return new Date(`${value}T12:00:00`).toISOString();
  }

  private toDateInputValue(date: Date): string {
    return date.toISOString().slice(0, 10);
  }
}
