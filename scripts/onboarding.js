// Onboarding Tour System
class OnboardingTour {
    constructor(steps) {
        this.steps = steps;
        this.currentStep = 0;
        this.overlay = null;
        this.tooltip = null;
        this.init();
    }

    init() {
        // Vérifier si l'utilisateur a déjà vu le tour
        if (localStorage.getItem('onboarding_completed') === 'true') {
            return;
        }

        // Créer l'overlay
        this.overlay = document.createElement('div');
        this.overlay.id = 'onboarding-overlay';
        document.body.appendChild(this.overlay);

        // Créer le tooltip
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'onboarding-tooltip';
        document.body.appendChild(this.tooltip);

        // Démarrer le tour après un court délai
        setTimeout(() => this.start(), 1000);
    }

    start() {
        this.overlay.classList.add('active');
        this.showStep(0);
    }

    showStep(index) {
        if (index >= this.steps.length) {
            this.complete();
            return;
        }

        this.currentStep = index;
        const step = this.steps[index];

        // Trouver l'élément à mettre en évidence
        const element = document.querySelector(step.target);
        if (!element) {
            this.next();
            return;
        }

        // Retirer l'ancien highlight
        const oldHighlight = document.querySelector('.onboarding-highlight');
        if (oldHighlight) {
            oldHighlight.classList.remove('onboarding-highlight');
        }

        // Ajouter le nouveau highlight
        element.classList.add('onboarding-highlight');

        // Scroll vers l'élément
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Positionner le tooltip
        setTimeout(() => {
            this.positionTooltip(element, step);
            this.renderTooltip(step);
        }, 300);
    }

    positionTooltip(element, step) {
        const rect = element.getBoundingClientRect();
        const tooltipRect = this.tooltip.getBoundingClientRect();
        
        let top, left;
        let arrowClass = '';

        // Déterminer la meilleure position
        const position = step.position || 'bottom';

        switch (position) {
            case 'top':
                top = rect.top - tooltipRect.height - 20;
                left = rect.left + (rect.width - tooltipRect.width) / 2;
                arrowClass = 'bottom';
                break;
            case 'bottom':
                top = rect.bottom + 20;
                left = rect.left + (rect.width - tooltipRect.width) / 2;
                arrowClass = 'top';
                break;
            case 'left':
                top = rect.top + (rect.height - tooltipRect.height) / 2;
                left = rect.left - tooltipRect.width - 20;
                arrowClass = 'right';
                break;
            case 'right':
                top = rect.top + (rect.height - tooltipRect.height) / 2;
                left = rect.right + 20;
                arrowClass = 'left';
                break;
        }

        // Ajuster si hors écran
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) top = 10;
        if (top + tooltipRect.height > window.innerHeight - 10) {
            top = window.innerHeight - tooltipRect.height - 10;
        }

        this.tooltip.style.top = `${top}px`;
        this.tooltip.style.left = `${left}px`;

        // Ajouter la flèche
        const oldArrow = this.tooltip.querySelector('.onboarding-arrow');
        if (oldArrow) oldArrow.remove();

        const arrow = document.createElement('div');
        arrow.className = `onboarding-arrow ${arrowClass}`;
        this.tooltip.appendChild(arrow);
    }

    renderTooltip(step) {
        const progress = `${this.currentStep + 1}/${this.steps.length}`;
        const isLast = this.currentStep === this.steps.length - 1;

        this.tooltip.innerHTML = `
            <h3>${step.title}</h3>
            <p>${step.description}</p>
            <div class="onboarding-actions">
                <span class="onboarding-progress">${progress}</span>
                <div class="onboarding-buttons">
                    <button class="onboarding-btn onboarding-btn-skip" onclick="tour.skip()">
                        Passer
                    </button>
                    <button class="onboarding-btn onboarding-btn-next" onclick="tour.next()">
                        ${isLast ? 'Terminer' : 'Suivant'}
                    </button>
                </div>
            </div>
        `;

        // Recréer la flèche après mise à jour du HTML
        const element = document.querySelector(step.target);
        if (element) {
            setTimeout(() => this.positionTooltip(element, step), 10);
        }
    }

    next() {
        this.showStep(this.currentStep + 1);
    }

    skip() {
        this.complete();
    }

    complete() {
        // Retirer le highlight
        const highlight = document.querySelector('.onboarding-highlight');
        if (highlight) {
            highlight.classList.remove('onboarding-highlight');
        }

        // Retirer l'overlay et le tooltip
        this.overlay.classList.remove('active');
        setTimeout(() => {
            this.overlay.remove();
            this.tooltip.remove();
        }, 300);

        // Marquer comme complété
        localStorage.setItem('onboarding_completed', 'true');
    }
}

// Définir les étapes du tour
const tourSteps = [
    {
        target: '.hero-content',
        title: '👋 Bienvenue !',
        description: 'Je suis Ibrahimakhalil Mbacke, géomaticien spécialisé en analyse spatiale et développement web cartographique.',
        position: 'bottom'
    },
    {
        target: '.view-toggle',
        title: '🗺️ Navigation',
        description: 'Utilisez ces boutons pour basculer entre la carte interactive et les autres sections du portfolio.',
        position: 'bottom'
    },
    {
        target: '#map',
        title: '🌍 Carte Interactive',
        description: 'Cette carte Leaflet montre ma localisation actuelle. Vous pouvez zoomer et explorer.',
        position: 'right'
    },
    {
        target: '.skills-grid',
        title: '💻 Compétences',
        description: 'Découvrez mon expertise technique : SIG, programmation, bases de données et développement web.',
        position: 'top'
    },
    {
        target: '.projects-grid',
        title: '📂 Mes Projets',
        description: 'Explorez mes projets professionnels en cliquant sur "Voir le projet" ou "Galerie" pour voir les détails.',
        position: 'top'
    },
    {
        target: '.filter-buttons',
        title: '🔍 Filtres',
        description: 'Filtrez les projets par catégorie : WebMapping, Analyse spatiale ou Recherche.',
        position: 'bottom'
    },
    {
        target: '.contact-info',
        title: '📧 Contact',
        description: 'N\'hésitez pas à me contacter via LinkedIn, GitHub ou par email pour toute opportunité !',
        position: 'top'
    }
];

// Initialiser le tour
let tour;
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        tour = new OnboardingTour(tourSteps);
    }, 500);
});

// Fonction pour réinitialiser le tour (pour tester)
function resetOnboarding() {
    localStorage.removeItem('onboarding_completed');
    location.reload();
}
