import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../config/environment';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @Input() isDarkTheme = false;

  constructor() {
    // Inicializa o EmailJS com a public key
    if (environment.emailjs?.publicKey) {
      emailjs.init(environment.emailjs.publicKey);
    }
  }

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

  // EmailJS não requer teste de API; tudo acontece client-side

  onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.message) {
      this.isSubmitting = true;

      const { serviceId, templateId, publicKey } = environment.emailjs || {} as any;
      if (!serviceId || !templateId || !publicKey) {
        this.showErrorModal('Configuração ausente', 'Configure o EmailJS (serviceId, templateId e publicKey) em environment.ts.');
        this.isSubmitting = false;
        return;
      }

      const templateParams = {
        // nome do remetente
        from_name: this.formData.name,
        // e-mail do remetente (alguns templates usam from_email)
        from_email: this.formData.email,
        // reply_to é recomendado pelo EmailJS para definir o campo Reply-To
        reply_to: this.formData.email,
        // nome do destinatário (opcional; não quebra se não usado)
        to_name: 'Davi Ferreira',
        // conteúdo da mensagem
        message: this.formData.message,
      };

      emailjs
        .send(serviceId, templateId, templateParams)
        .then(() => {
          this.showSuccessModal('Mensagem enviada com sucesso!', 'Entrarei em contato em breve.');
          this.formData = { name: '', email: '', message: '' };
          this.isSubmitting = false;
        })
        .catch((error: any) => {
          console.error('Erro ao enviar com EmailJS:', error);
          console.error('EmailJS status:', error?.status, 'texto:', error?.text);
          this.showErrorModal('Erro ao enviar mensagem', 'Não foi possível enviar sua mensagem. Tente novamente mais tarde.');
          this.isSubmitting = false;
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
      // Email copiado com sucesso
    }).catch(() => {
      // Falha ao copiar email
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