/* ==========================================================================
   AGRO FORTE - INTERATIVIDADE, ANIMAÇÕES E RESPONSIVIDADE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Inicializa todas as funções assim que a estrutura do site carregar
    initMobileMenu();
    initAnimatedCounters();
    initScrollReveal();
});

/* ==========================================================================
   1. MENU MOBILE RESPONSIVO (Tratamento para Telas Menores/Celulares)
   ========================================================================== */
function initMobileMenu() {
    const header = document.querySelector('.header');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!header || !navMenu) return;

    // Cria o botão de "hambúrguer" dinamicamente caso ele não exista no HTML
    if (!document.querySelector('.menu-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.classList.add('menu-toggle');
        toggleBtn.innerHTML = '&#9776;'; // Ícone das três barrinhas padrão
        toggleBtn.style.cssText = `
            background: none;
            border: none;
            color: #ffffff;
            font-size: 24px;
            cursor: pointer;
            display: none;
        `;
        
        header.insertBefore(toggleBtn, navMenu);

        // Aplica os estilos necessários para fazer o menu sumir e virar vertical no mobile
        const style = document.createElement('style');
        style.innerHTML = `
            @media (max-width: 768px) {
                .menu-toggle { display: block !important; }
                .nav-menu { 
                    display: none; 
                    flex-direction: column; 
                    width: 100%; 
                    position: absolute; 
                    top: 100%; 
                    left: 0; 
                    background-color: #1b4332; 
                    padding: 20px 0;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                .nav-menu.active { display: flex; }
                .nav-item { margin: 10px 0 !important; text-align: center; }
            }
        `;
        document.head.appendChild(style);

        // Evento de clique para abrir e fechar o menu no celular
        toggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Fecha o menu automaticamente quando o usuário clica em um link de seção
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

/* ==========================================================================
   2. CONTADORES ANIMADOS (Efeito numérico que sobe até o alvo)
   ========================================================================== */
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Define a velocidade do efeito (número menor = mais rápido)

    const startCounting = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => startCounting(counter), 1);
        } else {
            // Quando chega no final, formata o número com pontos (Ex: 50.000)
            counter.innerText = target.toLocaleString('pt-BR');
        }
    };

    // Monitora a tela para rodar o contador apenas quando o bloco aparecer pro usuário
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                observer.unobserve(entry.target); // Roda a animação apenas uma vez
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

/* ==========================================================================
   3. SCROLL REVEAL (Efeito suave de surgimento dos blocos do site)
   ========================================================================== */
function initScrollReveal() {
    // Injeta as propriedades CSS de transição no documento
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }
        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // Se o elemento estiver visível na janela de rolagem do browser
            if (elementTop < windowHeight - 50) {
                el.classList.add('visible');
            }
        });
    };

    // Executa no carregamento inicial da página e a cada rolagem de mouse
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
}
