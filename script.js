document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       PASSO 3: COMPORTAMENTO E INTERAÇÃO (ACCORDION / EXPANSÍVEIS)
       ========================================================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Alterna estado atual
            this.setAttribute('aria-expanded', !isExpanded);
            item.classList.toggle('active');
            
            // Atualiza ícone visual indicativo
            const icon = this.querySelector('.icon');
            if (icon) {
                icon.textContent = isExpanded ? '+' : '−';
            }
        });
    });

    /* ==========================================================================
       PASSO 4: SISTEMA AVANÇADO DE ACESSIBILIDADE
       ========================================================================== */
    let fontSizeMultiplier = 1;
    const mainContent = document.getElementById('main-content');
    const bodyElement = document.body;

    // Aumento e diminuição progressiva de fonte
    document.getElementById('btn-increase-font').addEventListener('click', () => {
        if (fontSizeMultiplier < 1.4) {
            fontSizeMultiplier += 0.1;
            mainContent.style.fontSize = `${fontSizeMultiplier}em`;
        }
    });

    document.getElementById('btn-decrease-font').addEventListener('click', () => {
        if (fontSizeMultiplier > 0.8) {
            fontSizeMultiplier -= 0.1;
            mainContent.style.fontSize = `${fontSizeMultiplier}em`;
        }
    });

    // Alternância de Alto Contraste (Modo Escuro Adaptado)
    document.getElementById('btn-toggle-contrast').addEventListener('click', () => {
        bodyElement.classList.toggle('high-contrast');
    });

    // Leitura por Voz (Text-to-Speech)
    let speechUtterance = null;

    document.getElementById('btn-tts-start').addEventListener('click', () => {
        // Cancela qualquer leitura em andamento para evitar sobreposição
        window.speechSynthesis.cancel();

        // Seleciona sistematicamente apenas tags estruturais de texto interno do escopo principal
        const textElements = mainContent.querySelectorAll('p, h2, h3');
        let textToRead = "";

        textElements.forEach(el => {
            // Ignora explicitamente componentes de controle ou interações dinâmicas
            if (!el.closest('.accessibility-menu') && !el.closest('form') && !el.closest('#comments-list')) {
                textToRead += el.textContent + " ";
            }
        });

        if (textToRead.trim() !== "") {
            speechUtterance = new SpeechSynthesisUtterance(textToRead);
            speechUtterance.lang = 'pt-BR';
            window.speechSynthesis.speak(speechUtterance);
        }
    });

    // Interrupção imediata da voz
    document.getElementById('btn-tts-stop').addEventListener('click', () => {
        window.speechSynthesis.cancel();
    });


    /* ==========================================================================
       COMPONENTES INTERATIVOS ADICIONAIS (COMENTÁRIOS E FORMULÁRIO)
       ========================================================================== */
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('input-comment');
    const commentsList = document.getElementById('comments-list');

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = commentInput.value.trim();

        if (text) {
            const commentCard = document.createElement('div');
            commentCard.classList.add('comment-card');
            
            // Tratamento estrutural contra brechas XSS
            commentCard.textContent = text;
            
            commentsList.prepend(commentCard);
            commentInput.value = '';
        }
    });

    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Obrigado pelo interesse! Sua inscrição no seminário on-line foi pré-registrada com sucesso.');
        signupForm.reset();
    });
});