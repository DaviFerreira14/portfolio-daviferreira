import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../config/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @Input() isDarkTheme = false;

  constructor(private http: HttpClient) {
    // Debug: Mostrar a URL que está sendo usada
    console.log('🔧 API URL configurada:', environment.apiUrl);
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

  // Método para testar a API primeiro
  testAPI() {
    console.log('🧪 Testando API...');
    this.http.get(`${environment.apiUrl}/test`)
      .subscribe({
        next: (response) => {
          console.log('✅ API funcionando:', response);
        },
        error: (error) => {
          console.error('❌ Erro na API:', error);
          console.error('URL testada:', `${environment.apiUrl}/test`);
        }
      });
  }

  onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.message) {
      this.isSubmitting = true;
      
      console.log('📤 Enviando dados para:', `${environment.apiUrl}/send-email`);
      console.log('📋 Dados:', this.formData);
      
      // Enviar dados para o backend no Vercel
      this.http.post(`${environment.apiUrl}/send-email`, this.formData)
        .subscribe({
          next: (response: any) => {
            console.log('📨 Resposta recebida:', response);
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
            console.error('💥 Erro completo:', error);
            console.error('🔍 Status:', error.status);
            console.error('🔍 Message:', error.message);
            console.error('🔍 URL:', error.url);
            
            let errorMessage = 'Erro desconhecido.';
            
            if (error.status === 404) {
              errorMessage = 'Endpoint não encontrado. Verifique a URL da API.';
            } else if (error.status === 500) {
              errorMessage = 'Erro interno do servidor. Verifique as configurações.';
            } else if (error.status === 0) {
              errorMessage = 'Erro de CORS ou conexão. Verifique se o servidor está rodando.';
            }
            
            this.showErrorModal('Erro ao enviar mensagem', errorMessage);
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