import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @Input() isDarkTheme = false;

  constructor(private http: HttpClient) {}

  formData = {
    name: '',
    email: '',
    message: ''
  };

  isSubmitting = false;
  
  // Modal properties
  showModal = false;
  modalTitle = '';
  modalMessage = '';
  modalType: 'success' | 'error' = 'success';

  onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.message) {
      this.isSubmitting = true;
      
      // Enviar dados para o backend
      this.http.post('http://localhost:3001/api/send-email', this.formData)
        .subscribe({
          next: (response: any) => {
            if (response.success) {
              this.showSuccessModal('Mensagem enviada com sucesso!', 'Entrarei em contato em breve.');
              
              // Limpar formulário
              this.formData = {
                name: '',
                email: '',
                message: ''
              };
            } else {
              this.showErrorModal('Erro ao enviar mensagem', response.message);
            }
            this.isSubmitting = false;
          },
          error: (error) => {
            console.error('Erro ao enviar email:', error);
            this.showErrorModal('Erro ao enviar mensagem', 'Verifique se o servidor está rodando e tente novamente.');
            this.isSubmitting = false;
          }
        });
    }
  }

  openEmail() {
    const email = 'davi073ferreira@gmail.com';
    const subject = 'Contato via Portfolio';
    const body = 'Olá Davi! Gostaria de entrar em contato contigo.';
    
    // Redirecionar para o Gmail com parâmetros pré-preenchidos
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Abrir Gmail em nova aba
    window.open(gmailUrl, '_blank');
    
    // Copiar email para área de transferência como backup
    navigator.clipboard.writeText(email).then(() => {
      console.log('Email copiado para área de transferência como backup');
    }).catch(() => {
      console.log('Não foi possível copiar email para área de transferência');
    });
  }

  // Modal methods
  showSuccessModal(title: string, message: string) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalType = 'success';
    this.showModal = true;
  }

  showErrorModal(title: string, message: string) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalType = 'error';
    this.showModal = true;
  }

  closeModal() {
    const modalContent = document.querySelector('.modal-content') as HTMLElement;
    const modalOverlay = document.querySelector('.modal-overlay') as HTMLElement;
    
    if (modalContent && modalOverlay) {
      // Animações de saída
      modalContent.style.animation = 'slideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards';
      modalOverlay.style.animation = 'fadeOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards';
      
      // Aguarda a animação terminar antes de esconder
      setTimeout(() => {
        this.showModal = false;
        // Reset das animações
        if (modalContent) modalContent.style.animation = '';
        if (modalOverlay) modalOverlay.style.animation = '';
      }, 300);
    } else {
      this.showModal = false;
    }
  }

  // Close modal when clicking outside
  onModalBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  // Close modal with ESC key
  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.showModal) {
      this.closeModal();
    }
  }
} 