// ============================================
// GEOPORTFOLIO V2 - JAVASCRIPT PRINCIPAL
// Portfolio Géomatique Immersif
// ============================================

console.log('%c🗺️ GeoPortfolio V2.0', 'color: #06B6D4; font-size: 24px; font-weight: bold;');
console.log('%cIbrahimakhalil Mbacke - Géomaticien', 'color: #10B981; font-size: 16px;');

// ============================================
// VARIABLES GLOBALES
// ============================================
let heroMap, timelineMap, contactMap;
let heroMapInitialized = false;
let timelineMapInitialized = false;
let contactMapInitialized = false;

// Données de localisation
const locations = {
    dakar: {
        coords: [14.7167, -17.4677],
        name: 'Dakar, Sénégal',
        type: 'origine',
        zoom: 12
    },
    paris: {
        coords: [48.8566, 2.3522],
        name: 'Paris, France',
        type: 'formation',
        zoom: 12
    },
    tours: {
        coords: [47.3941, 0.6848],
        name: 'Tours, France',
        type: 'experience',
        zoom: 13
    },
    'montreal-uqam': {
        coords: [45.5089, -73.5617],
        name: 'Montréal - UQAM',
        type: 'formation',
        zoom: 15
    },
    'montreal-wsp': {
        coords: [45.4995, -73.5698],
        name: 'Montréal - WSP',
        type: 'experience',
        zoom: 15
    },
    'montreal-hec': {
        coords: [45.5048, -73.6180],
        name: 'Montréal - HEC',
        type: 'experience',
        zoom: 15
    }
};

// ============================================
// INITIALISATION AU CHARGEMENT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initialisation du portfolio...');
    
    // Initialiser les événements
    initNavigation();
    initMobileMenu();
    initSidebar();
    initProfile();
    initLayerControls();
    initProjectFilters();
    // STICKY MAP DÉSACTIVÉE pour de meilleures performances
    
    // Initialiser la carte hero par défaut
    setTimeout(() => {
        initHeroMap();
    }, 100);
    
    console.log('✅ Portfolio initialisé');
});

// ============================================
// NAVIGATION ENTRE VUES (BUG CORRIGÉ)
// ============================================
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const viewPanels = document.querySelectorAll('.view-panel');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetView = this.dataset.view;
            navigateTo(targetView);
        });
    });
    
    // Logo clique vers accueil (BUG CORRIGÉ)
    const logo = document.getElementById('logoHome');
    if (logo) {
        logo.addEventListener('click', function() {
            navigateTo('home');
        });
    }
}

// ============================================
// MENU MOBILE HAMBURGER
// ============================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileNavButtons = document.querySelectorAll('.mobile-nav-btn');
    
    // Créer l'overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    overlay.id = 'mobileMenuOverlay';
    document.body.appendChild(overlay);
    
    // Ouvrir le menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Fermer le menu
    function closeMobileMenuFunc() {
        mobileMenu.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
    }
    
    // Fermer en cliquant sur l'overlay
    overlay.addEventListener('click', closeMobileMenuFunc);
    
    // Navigation mobile
    mobileNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetView = this.dataset.view;
            
            // Mettre à jour les boutons actifs dans le menu mobile
            mobileNavButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Naviguer
            navigateTo(targetView);
            
            // Fermer le menu
            closeMobileMenuFunc();
        });
    });
}

function navigateTo(viewName) {
    console.log(`📍 Navigation vers: ${viewName}`);
    
    const navButtons = document.querySelectorAll('.nav-btn');
    const mobileNavButtons = document.querySelectorAll('.mobile-nav-btn');
    const viewPanels = document.querySelectorAll('.view-panel');
    
    // Mettre à jour les boutons actifs (desktop)
    navButtons.forEach(btn => {
        if (btn.dataset.view === viewName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Mettre à jour les boutons actifs (mobile)
    mobileNavButtons.forEach(btn => {
        if (btn.dataset.view === viewName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Afficher la vue correspondante
    viewPanels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    let targetPanel;
    switch(viewName) {
        case 'home':
            targetPanel = document.getElementById('homeView');
            if (targetPanel) {
                targetPanel.classList.add('active');
                if (!heroMapInitialized) {
                    initHeroMap();
                } else {
                    // RESET: Retour position initiale
                    if (heroMap) {
                        heroMap.setView([35, -10], 3);
                        heroMap.invalidateSize();
                    }
                }
            }
            break;
        case 'timeline':
            targetPanel = document.getElementById('timelineView');
            if (targetPanel) {
                targetPanel.classList.add('active');
                if (!timelineMapInitialized) {
                    initTimelineMap();
                } else {
                    // RESET: Retour position initiale + scroll en haut
                    if (timelineMap) {
                        timelineMap.setView([35, -10], 3);
                        timelineMap.invalidateSize();
                    }
                    // Scroll au début de la timeline
                    const timelineSteps = document.querySelector('.timeline-steps');
                    if (timelineSteps) {
                        timelineSteps.scrollTop = 0;
                    }
                }
            }
            break;
        case 'skills':
            targetPanel = document.getElementById('skillsView');
            if (targetPanel) {
                targetPanel.classList.add('active');
                // RESET: Scroll en haut de la section
                setTimeout(() => {
                    targetPanel.scrollTop = 0;
                }, 100);
            }
            break;
        case 'projects':
            targetPanel = document.getElementById('projectsView');
            if (targetPanel) {
                targetPanel.classList.add('active');
                // RESET: Scroll en haut + réinitialiser filtres
                setTimeout(() => {
                    targetPanel.scrollTop = 0;
                    // Reset filtres au "all"
                    const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
                    if (allFilterBtn) {
                        allFilterBtn.click();
                    }
                }, 100);
                // Initialiser les mini-cartes si pas encore fait
                setTimeout(initProjectMaps, 500);
            }
            break;
        case 'contact':
            targetPanel = document.getElementById('contactView');
            if (targetPanel) {
                targetPanel.classList.add('active');
                if (!contactMapInitialized) {
                    initContactMap();
                }
            }
            break;
    }
    
    // Scroll vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Exposer la fonction globalement pour les boutons HTML
window.navigateTo = navigateTo;

// ============================================
// PANNEAU LATÉRAL
// ============================================
function initSidebar() {
    const layersPanel = document.getElementById('layersPanel');
    const sidebarPanel = document.getElementById('sidebarPanel');
    const closeSidebar = document.getElementById('closeSidebar');
    
    if (layersPanel) {
        layersPanel.addEventListener('click', function() {
            sidebarPanel.classList.toggle('open');
        });
    }
    
    if (closeSidebar) {
        closeSidebar.addEventListener('click', function() {
            sidebarPanel.classList.remove('open');
        });
    }
    
    // Gestion des groupes de couches
    const layerGroupHeaders = document.querySelectorAll('.layer-group-header');
    layerGroupHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const layerList = this.nextElementSibling;
            const toggleIcon = this.querySelector('.toggle-icon');
            
            if (layerList && layerList.style.display === 'none') {
                layerList.style.display = 'block';
                if (toggleIcon) toggleIcon.textContent = '▼';
            } else if (layerList) {
                layerList.style.display = 'none';
                if (toggleIcon) toggleIcon.textContent = '▶';
            }
        });
    });
}

// ============================================
// CONTRÔLE DES COUCHES (BUG CORRIGÉ)
// ============================================
function initLayerControls() {
    const layerCheckboxes = document.querySelectorAll('.layer-item input[type="checkbox"]');
    
    layerCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const layerId = this.id.replace('layer-', '');
            const isChecked = this.checked;
            
            console.log(`🗺️ Couche ${layerId}: ${isChecked ? 'ON' : 'OFF'}`);
            
            // Afficher/masquer les marqueurs correspondants sur la carte
            toggleLayerVisibility(layerId, isChecked);
        });
    });
}

function toggleLayerVisibility(layerId, isVisible) {
    // Cette fonction affiche/masque les couches sur la carte
    // Gère tous les types de couches y compris "projects" (projets)
    
    if (heroMap && heroMap._layers) {
        Object.values(heroMap._layers).forEach(layer => {
            // Support pour "projects" ET "projet" pour compatibilité
            const matchesLayer = layer.options && (
                layer.options.layerType === layerId ||
                (layerId === 'projects' && layer.options.layerType === 'projet') ||
                (layerId === 'projet' && layer.options.layerType === 'projects')
            );
            
            if (matchesLayer) {
                if (isVisible) {
                    layer.setStyle({ opacity: 1, fillOpacity: 0.9 });
                } else {
                    layer.setStyle({ opacity: 0.3, fillOpacity: 0.3 });
                }
            }
        });
    }
    
    // Animation de feedback visuel
    const layerInput = document.querySelector(`#layer-${layerId}`);
    if (layerInput) {
        const layerItem = layerInput.closest('.layer-item');
        if (layerItem) {
            layerItem.style.transition = 'all 0.3s ease';
            layerItem.style.opacity = isVisible ? '1' : '0.5';
        }
    }
}

// ============================================
// MODAL PROFIL
// ============================================
function initProfile() {
    const profileBtn = document.getElementById('profileBtn');
    const profileModal = document.getElementById('profileModal');
    const closeProfile = document.getElementById('closeProfile');
    
    if (profileBtn) {
        profileBtn.addEventListener('click', function() {
            profileModal.classList.add('active');
        });
    }
    
    if (closeProfile) {
        closeProfile.addEventListener('click', function() {
            profileModal.classList.remove('active');
        });
    }
    
    if (profileModal) {
        profileModal.addEventListener('click', function(e) {
            if (e.target === profileModal) {
                profileModal.classList.remove('active');
            }
        });
    }
    
    // Boutons CV
    const downloadCVButtons = document.querySelectorAll('#downloadCV, #downloadCVFooter');
    downloadCVButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('📄 CV PDF disponible sur demande\n\nContactez-moi à:\nibrahimakhalilmbacke2000@gmail.com');
        });
    });
}

// ============================================
// CARTE HERO (ACCUEIL)
// ============================================
function initHeroMap() {
    if (heroMapInitialized && heroMap) {
        heroMap.invalidateSize();
        return;
    }
    
    console.log('🗺️ Initialisation de la carte hero...');
    
    const mapElement = document.getElementById('heroMap');
    if (!mapElement) {
        console.error('❌ Élément heroMap non trouvé');
        return;
    }
    
    heroMap = L.map('heroMap', {
        center: [35, -10],
        zoom: 3,
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: true,
        minZoom: 2,
        maxZoom: 18
    });
    
    // Fond de carte moderne et sobre (Mapbox Positron style)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(heroMap);
    
    // Ajouter les localités importantes
    const allLocations = [
        {
            coords: [45.5089, -73.5617],
            name: 'Montréal, QC',
            type: 'formation',
            details: '<strong>🎓 UQAM - Maîtrise SIG</strong><br>2023-2025<br><br><strong>💼 WSP/HEC</strong><br>Stage Géomatique Climatique<br>Sept-Déc 2024'
        },
        {
            coords: [48.8566, 2.3522],
            name: 'Paris, France',
            type: 'formation',
            details: '<strong>🎓 Sorbonne Université</strong><br>Licence Géographie & Aménagement<br>2020-2023'
        },
        {
            coords: [47.3941, 0.6848],
            name: 'Tours, France',
            type: 'experience',
            details: '<strong>💼 Ville de Tours</strong><br>Stage SIG Municipal<br>Avril - Juin 2023'
        },
        {
            coords: [14.7167, -17.4677],
            name: 'Dakar, Sénégal',
            type: 'origine',
            details: '<strong>🏠 Origines</strong><br>UCAD<br>Connexions familiales'
        },
        {
            coords: [17.5707, -3.9962],
            name: 'Mali',
            type: 'projet',
            details: '<strong>🗺️ Géoportail National</strong><br>Projet de maîtrise<br>Leaflet, PostGIS, Docker'
        },
        {
            coords: [14.85, -15.88],
            name: 'Touba, Sénégal',
            type: 'projet',
            details: '<strong>💧 Analyse Hydrogéologique</strong><br>Détection eaux souterraines<br>QGIS, Analyse Raster'
        }
    ];
    
    const markers = [];
    
    allLocations.forEach(loc => {
        const marker = L.circleMarker(loc.coords, {
            radius: 10,
            fillColor: getColorForType(loc.type),
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9,
            layerType: loc.type // Pour le filtrage des couches
        }).addTo(heroMap);
        
        marker.bindPopup(`
            <div style="font-family: -apple-system, sans-serif; min-width: 200px; color: #0F172A;">
                <h3 style="color: #06B6D4; margin-bottom: 0.5rem; font-size: 1.1rem;">
                    📍 ${loc.name}
                </h3>
                <div style="line-height: 1.6; font-size: 0.9rem;">
                    ${loc.details}
                </div>
            </div>
        `);
        
        markers.push(marker);
    });
    
    // Lignes de connexion animées
    const latLngs = allLocations.map(loc => loc.coords);
    const polyline = L.polyline(latLngs, {
        color: '#06B6D4',
        weight: 2,
        opacity: 0.5,
        dashArray: '10, 10'
    }).addTo(heroMap);
    
    // Animation de la ligne
    let offset = 0;
    setInterval(() => {
        offset -= 1;
        polyline.setStyle({ dashOffset: offset });
    }, 50);
    
    // Ajouter contrôles de zoom personnalisés
    addCustomZoomControls('heroMap', heroMap);
    
    heroMapInitialized = true;
    console.log('✅ Carte hero initialisée');
}

function getColorForType(type) {
    const colors = {
        'formation': '#3B82F6',
        'experience': '#EF4444',
        'projet': '#10B981',
        'origine': '#F59E0B'
    };
    return colors[type] || '#06B6D4';
}

// ============================================
// CARTE TIMELINE
// ============================================
let timelineMarkers = {}; // Stocker les markers pour l'animation

function initTimelineMap() {
    if (timelineMapInitialized) return;
    
    console.log('🗺️ Initialisation de la carte timeline...');
    
    const mapElement = document.getElementById('timelineMap');
    if (!mapElement) return;
    
    timelineMap = L.map('timelineMap', {
        center: [35, -10],
        zoom: 3,
        zoomControl: true,
        preferCanvas: true // Meilleures performances
    });
    
    // Style de carte professionnel Mapbox Positron (lumineux et épuré)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(timelineMap);
    
    // Ajouter tous les points du parcours avec markers améliorés
    Object.entries(locations).forEach(([key, loc]) => {
        const marker = L.circleMarker(loc.coords, {
            radius: 10,
            fillColor: getColorForType(loc.type),
            color: '#fff',
            weight: 3,
            fillOpacity: 0.85,
            className: 'timeline-marker' // Pour CSS personnalisé
        }).addTo(timelineMap);
        
        marker.bindPopup(`<strong>${loc.name}</strong>`);
        
        // Stocker le marker pour l'animation
        timelineMarkers[key] = marker;
    });
    
    // Interaction avec le scroll
    initTimelineScroll();
    
    // Ajouter contrôles de zoom personnalisés
    addCustomZoomControls('timelineMap', timelineMap);
    
    // Setup synchronisation temps réel si sticky map existe
    if (stickyMapInstance) {
        setupRealtimeSync();
    }
    
    timelineMapInitialized = true;
    console.log('✅ Carte timeline initialisée');
}

function initTimelineScroll() {
    const steps = document.querySelectorAll('.timeline-step');
    let currentActiveLocation = null;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const locationKey = entry.target.dataset.location;
                
                // Éviter les animations redondantes
                if (locationKey === currentActiveLocation) return;
                currentActiveLocation = locationKey;
                
                // Retirer la classe active de toutes les étapes
                steps.forEach(s => s.classList.remove('active'));
                
                // Ajouter la classe active à l'étape courante
                entry.target.classList.add('active');
                
                if (locationKey && locations[locationKey] && timelineMap) {
                    // Désactiver tous les markers
                    Object.entries(timelineMarkers).forEach(([key, marker]) => {
                        marker.setStyle({
                            radius: 10,
                            fillOpacity: 0.85,
                            weight: 3,
                            className: 'timeline-marker'
                        });
                    });
                    
                    // Activer le marker de la ville active
                    if (timelineMarkers[locationKey]) {
                        timelineMarkers[locationKey].setStyle({
                            radius: 15,
                            fillOpacity: 1,
                            weight: 4,
                            className: 'timeline-marker active-marker'
                        });
                        
                        // Animation de pulsation (effet visuel)
                        const activeMarker = timelineMarkers[locationKey];
                        let pulseCount = 0;
                        const pulseInterval = setInterval(() => {
                            if (pulseCount >= 3) {
                                clearInterval(pulseInterval);
                                return;
                            }
                            activeMarker.setStyle({ radius: 18 });
                            setTimeout(() => {
                                if (timelineMarkers[locationKey] === activeMarker) {
                                    activeMarker.setStyle({ radius: 15 });
                                }
                            }, 300);
                            pulseCount++;
                        }, 600);
                    }
                    
                    // Animation flyTo vers la localisation avec transition fluide
                    timelineMap.flyTo(
                        locations[locationKey].coords,
                        locations[locationKey].zoom,
                        {
                            duration: 1.5,
                            easeLinearity: 0.15,
                            animate: true
                        }
                    );
                    
                    console.log(`📍 Navigation vers: ${locations[locationKey].name}`);
                }
            }
        });
    }, {
        threshold: 0.5, // Plus sensible pour meilleure réactivité
        rootMargin: '-30% 0px -30% 0px' // Zone centrale de déclenchement
    });
    
    steps.forEach(step => observer.observe(step));
    
    console.log(`✅ Scrollytelling activé (${steps.length} étapes)`);
}

// ============================================
// MINI-CARTES PROJETS
// ============================================
function initProjectMaps() {
    console.log('🗺️ Initialisation des mini-cartes projets...');
    
    const projectLocations = [
        { id: 'projectMap1', coords: [17.5707, -3.9962], zoom: 6 },   // Mali
        { id: 'projectMap2', coords: [45.5017, -73.5673], zoom: 11 }, // Montréal BIXI
        { id: 'projectMap3', coords: [45.5017, -73.5673], zoom: 10 }, // Montréal général
        { id: 'projectMap4', coords: [45.5017, -73.5673], zoom: 12 }, // Vélo Montréal
        { id: 'projectMap5', coords: [45.5017, -73.5673], zoom: 3 },  // Global
        { id: 'projectMap6', coords: [45.5017, -73.5673], zoom: 11 },  // Montréal GEO7630
        { id: 'projectMap7', coords: [45.5017, -73.5673], zoom: 12 },  // 🆕 Tramway Montréal
    ];
    
    projectLocations.forEach(loc => {
        const mapElement = document.getElementById(loc.id);
        if (mapElement && !mapElement._leaflet_id) {
            try {
                const map = L.map(loc.id, {
                    center: loc.coords,
                    zoom: loc.zoom,
                    zoomControl: false,
                    dragging: false,
                    scrollWheelZoom: false,
                    doubleClickZoom: false,
                    attributionControl: false,
                    touchZoom: false
                });
                
                L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                    subdomains: 'abcd',
                    maxZoom: 20
                }).addTo(map);
                
                // Marker au centre
                L.circleMarker(loc.coords, {
                    radius: 8,
                    fillColor: '#06B6D4',
                    color: '#fff',
                    weight: 2,
                    fillOpacity: 0.9
                }).addTo(map);
                
                console.log(`✅ Mini-carte ${loc.id} initialisée`);
            } catch (error) {
                console.error(`❌ Erreur mini-carte ${loc.id}:`, error);
            }
        }
    });
}

// ============================================
// CARTE CONTACT
// ============================================
function initContactMap() {
    if (contactMapInitialized) return;
    
    console.log('🗺️ Initialisation de la carte contact...');
    
    const mapElement = document.getElementById('contactMap');
    if (!mapElement) return;
    
    contactMap = L.map('contactMap', {
        center: [48.8566, 2.3522],
        zoom: 12,
        zoomControl: true
    });
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(contactMap);
    
    // Marker principal
   const mainMarker = L.circleMarker([48.8566, 2.3522], {
        radius: 15,
        fillColor: '#06B6D4',
        color: '#fff',
        weight: 3,
        fillOpacity: 0.9
    }).addTo(contactMap);
    
    mainMarker.bindPopup(`
        <div style="font-family: -apple-system, sans-serif; color: #0F172A;">
            <h3 style="color: #06B6D4; margin-bottom: 0.5rem;">
                📍 Paris, FR
            </h3>
            <p style="margin: 0.5rem 0;">
                <strong>Ibrahimakhalil Mbacke</strong><br>
                Géomaticien & Développeur WebMapping
            </p>
            <p style="margin: 0.5rem 0; font-size: 0.9rem;">
                📧 ibrahimakhalilmbacke2000@gmail.com<br>
                📱 +33 7 44 41 19 74
            </p>
        </div>
    `).openPopup();
    
    contactMapInitialized = true;
    console.log('✅ Carte contact initialisée');
}

// ============================================
// FILTRES PROJETS
// ============================================
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Mettre à jour les boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrer les projets
            projectCards.forEach(card => {
                const categories = card.dataset.category;
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
            
            console.log(`🔍 Filtre appliqué: ${filter}`);
        });
    });
}

// ============================================
// DÉTAILS DES PROJETS
// ============================================
function showProjectDetails(projectId) {
    const projectDetails = {
        'mali': {
            title: 'Géoportail National du Mali',
            description: 'Plateforme web complète de visualisation et d\'analyse de données géospatiales pour le Mali. Architecture full-stack avec frontend moderne et backend robuste.',
            features: [
                'Interface cartographique interactive avec Leaflet',
                'Base de données spatiales PostGIS',
                'API REST pour les requêtes géospatiales',
                'Conteneurisation avec Docker',
                'Gestion de couches multiples',
                'Analyse spatiale en temps réel'
            ],
            technologies: ['Python', 'JavaScript', 'Leaflet', 'PostGIS', 'Docker', 'Flask'],
            github: 'https://github.com/ibrahimakhalil2701/Geoportail_Mali'
        },
        'bixi': {
            title: 'Analyse Multimodale : STM vs BIXI',
            description: 'Étude comparative approfondie de l\'accessibilité et de la couverture des réseaux de transport en commun (STM) et de vélos en libre-service (BIXI) à Montréal.',
            features: [
                'Analyse de zones de desserte (buffers)',
                'Calcul d\'accessibilité piétonne',
                'Comparaison de couverture géographique',
                'Visualisation des zones mal desservies',
                'Statistiques zonales par arrondissement',
                'Recommandations d\'amélioration'
            ],
            technologies: ['QGIS', 'Python', 'Network Analyst', 'GeoPandas'],
            github: 'https://github.com/ibrahimakhalil2701/Analyse-Spatiale-Comparative-Multimodale---Montr-al-STM-vs-BIXI-QGIS'
        },
        'zonales': {
            title: 'Outil Python d\'Analyse Zonale',
            description: 'Script Python automatisé pour calculer des statistiques zonales sur des données raster. Utilisé pour l\'analyse climatique et géographique.',
            features: [
                'Calcul automatisé de statistiques',
                'Support multi-formats (GeoTIFF, NetCDF)',
                'Agrégation par zones administratives',
                'Export en formats divers (CSV, JSON, GeoJSON)',
                'Visualisation des résultats',
                'Documentation complète'
            ],
            technologies: ['Python', 'GeoPandas', 'Rasterio', 'NumPy', 'Matplotlib'],
            github: 'https://github.com/ibrahimakhalil2701/SIG-statistiques-zonales-Python-'
        },
        'velo': {
            title: 'Réseau Cyclable de Montréal',
            description: 'Application web interactive pour visualiser et analyser le réseau de pistes cyclables de Montréal. Permet d\'explorer la connectivité et la qualité du réseau.',
            features: [
                'Carte interactive du réseau complet',
                'Filtrage par type de piste',
                'Analyse de connectivité',
                'Identification des segments manquants',
                'Statistiques par arrondissement',
                'Export de données'
            ],
            technologies: ['JavaScript', 'Leaflet', 'Python', 'GeoJSON'],
            Application: 'https://experience.arcgis.com/experience/7b3c5c0c8a7c4a3ab5bcd1219495aeaf'
        },
        'gdal': {
            title: 'Environnement GDAL Docker',
            description: 'Conteneur Docker préconfiguré avec GDAL et ses dépendances. Alternative gratuite et portable à FME pour le traitement de données géospatiales.',
            features: [
                'GDAL dernière version',
                'Python avec bindings GDAL',
                'Outils de conversion de formats',
                'Scripts de transformation automatisés',
                'Environnement reproductible',
                'Documentation d\'utilisation'
            ],
            technologies: ['Docker', 'GDAL', 'Python', 'Bash', 'Linux'],
            github: 'https://github.com/ibrahimakhalil2701/gdal-docker'
        },
        'geo7630': {
            title: 'Intégration & Visualisation de Données Géographiques',
            description: 'Projets académiques du cours GEO7630 à l\'UQAM. Développement d\'applications web modernes pour la visualisation de données géographiques.',
            features: [
                'Cartes interactives avancées',
                'Visualisations avec D3.js',
                'Dashboard de données géographiques',
                'Animations cartographiques',
                'Intégration multi-sources de données',
                'Interface responsive'
            ],
            technologies: ['JavaScript', 'Leaflet', 'D3.js', 'HTML/CSS', 'GitHub Pages'],
            github: 'https://github.com/ibrahimakhalil2701/geo7630h25'
        },
        'tramway': {
        title: 'Étude de Faisabilité : Réseau de Tramway à Montréal',
        description: 'Analyse spatiale multicritère approfondie de trois variantes de corridor pour l\'implantation d\'un réseau de tramway structurant à Montréal. Évaluation comparative basée sur la desserte de population, l\'impact environnemental, la connectivité réseau et l\'optimisation économique.',
        features: [
            'Analyse multicritère de 3 variantes de tracé',
            'Desserte de population (125k-142k habitants)',
            'Évaluation impact environnemental (espaces verts, arbres)',
            'Connectivité avec réseau métro STM (6-12 lignes)',
            'Zones tampons 500m autour des tracés',
            'Cartographie professionnelle (MTM NAD83)',
            'Modélisation spatiale avec ArcGIS Pro',
            'Recommandations stratégiques basées sur données'
        ],
        technologies: ['ArcGIS Pro', 'QGIS', 'Python', 'Analyse Multicritère', 'Network Analyst', 'Spatial Join', 'Kernel Density'],
        github: 'assets/Projet_Tramway_Montreal_Documentation.pdf'
    },
    'chantiers': {
    title: 'Gestion des Chantiers',
    description: 'Application web professionnelle de gestion et suivi des interventions sur les chantiers de la ville de Paris. Développée avec ArcGIS Experience Builder, elle offre une interface intuitive pour visualiser, analyser et gérer les chantiers en temps réel.',
    features: [
        'Interface cartographique interactive et responsive',
        'Gestion des chantiers (suivi)',
        'Visualisation des chantiers sur la ville de Paris',
        'Tableaux de bord et statistiques',
        'Filtres avancés par type, statut, arrondissement',
        'Architecture full-stack ArcGIS (Online + Experience Builder)'
    ],
    technologies: ['ArcGIS Experience Builder', 'ArcGIS Online', 'WebGIS', 'JavaScript', 'REST API', 'Responsive Design'],
    github: 'https://experience.arcgis.com/experience/f41fe86eeb6e480c919136140144aaf6d'
}
        
    };
    
    const project = projectDetails[projectId];
    
    if (project) {
        let featuresHTML = project.features.map(f => `<li>${f}</li>`).join('');
        let techHTML = project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('');
        
        const modalContent = `
            <div style="max-width: 600px; background: #1F2937; padding: 2rem; border-radius: 12px; border: 2px solid #06B6D4;">
                <h2 style="color: #06B6D4; margin-bottom: 1rem;">${project.title}</h2>
                <p style="color: #94A3B8; margin-bottom: 1.5rem; line-height: 1.6;">${project.description}</p>
                
                <h3 style="color: #06B6D4; margin-bottom: 0.75rem;">📋 Fonctionnalités :</h3>
                <ul style="color: #94A3B8; margin-bottom: 1.5rem; padding-left: 1.5rem; line-height: 1.8;">
                    ${featuresHTML}
                </ul>
                
                <h3 style="color: #06B6D4; margin-bottom: 0.75rem;">🛠️ Technologies :</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                    ${techHTML}
                </div>
                
                <div style="display: flex; gap: 1rem;">
                    <a href="${project.github}" target="_blank" style="flex: 1; padding: 0.75rem; background: #06B6D4; color: #0F172A; text-align: center; border-radius: 8px; font-weight: 600; text-decoration: none;">
                        <i class="fab fa-github"></i> Voir sur GitHub
                    </a>
                    <button onclick="closeProjectModal()" style="padding: 0.75rem 1.5rem; background: transparent; border: 2px solid #06B6D4; color: #06B6D4; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        Fermer
                    </button>
                </div>
            </div>
        `;
        
        // Créer et afficher la modal
        const modalBg = document.createElement('div');
        modalBg.id = 'projectModal';
        modalBg.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.95); display: flex; align-items: center; justify-content: center; z-index: 3000; animation: fadeIn 0.3s ease;';
        modalBg.innerHTML = modalContent;
        modalBg.onclick = function(e) {
            if (e.target === modalBg) {
                closeProjectModal();
            }
        };
        
        document.body.appendChild(modalBg);
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.remove();
    }
}

// Exposer les fonctions globalement
window.showProjectDetails = showProjectDetails;
window.closeProjectModal = closeProjectModal;

// ============================================
// ANIMATIONS AU SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments animables
setTimeout(() => {
    document.querySelectorAll('.skill-category, .project-card, .info-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}, 500);

// ============================================
// MISE À JOUR DES COORDONNÉES EN TEMPS RÉEL
// ============================================
function updateCoordinates() {
    const coordsElement = document.getElementById('currentCoords');
    if (coordsElement && heroMap) {
        const center = heroMap.getCenter();
        coordsElement.textContent = `📍 ${center.lat.toFixed(4)}°N, ${Math.abs(center.lng).toFixed(4)}°${center.lng < 0 ? 'W' : 'E'}`;
    }
}

// Mettre à jour les coordonnées quand la carte bouge
if (heroMap) {
    heroMap.on('move', updateCoordinates);
}

// ============================================
// CARTE STICKY FLOTTANTE (NOUVEAU)
// ============================================
let stickyMapInstance = null;
let isStickyMapActive = false;

function initStickyMap() {
    // Observer à la fois heroMap ET timelineMap
    const mapsToObserve = ['heroMap', 'timelineMap'];
    
    // Créer la mini-carte sticky
    const stickyMapContainer = document.createElement('div');
    stickyMapContainer.id = 'stickyMapContainer';
    stickyMapContainer.className = 'sticky-map-container hidden';
    stickyMapContainer.innerHTML = `
        <div class="sticky-map-header">
            <span class="sticky-map-title">🗺️ Navigation</span>
            <button class="sticky-map-close" onclick="closeStickyMap()">✕</button>
        </div>
        <div id="stickyMap" class="sticky-map"></div>
        <div class="sticky-map-zoom-controls">
            <button onclick="zoomStickyMap(1)" title="Zoom In">+</button>
            <button onclick="zoomStickyMap(-1)" title="Zoom Out">−</button>
        </div>
    `;
    document.body.appendChild(stickyMapContainer);
    
    // Observer le scroll pour TOUTES les cartes
    let mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && !isStickyMapActive && entry.boundingClientRect.top < 0) {
                // La carte originale est cachée en haut, montrer la sticky
                showStickyMap();
            } else if (entry.isIntersecting && isStickyMapActive) {
                // La carte originale est visible, cacher la sticky
                hideStickyMap();
            }
        });
    }, {
        threshold: 0,
        rootMargin: '-100px 0px 0px 0px'
    });
    
    // Observer heroMap et timelineMap
    mapsToObserve.forEach(mapId => {
        const mapElement = document.getElementById(mapId);
        if (mapElement) {
            mapObserver.observe(mapElement);
        }
    });
}

function showStickyMap() {
    const container = document.getElementById('stickyMapContainer');
    if (!container) return;
    
    container.classList.remove('hidden');
    container.classList.add('visible');
    
    // Déterminer quelle carte est active
    const activeView = document.querySelector('.view-panel.active');
    let activeMapInstance = null;
    
    if (activeView) {
        const viewId = activeView.id;
        if (viewId === 'homeView' && heroMap) {
            activeMapInstance = heroMap;
        } else if (viewId === 'parcoursView' && timelineMap) {
            activeMapInstance = timelineMap;
        }
    }
    
    // Initialiser la carte si pas déjà fait
    if (!stickyMapInstance) {
        setTimeout(() => {
            try {
                const center = activeMapInstance ? activeMapInstance.getCenter() : [35, -10];
                const zoom = activeMapInstance ? activeMapInstance.getZoom() - 1 : 3;
                
                stickyMapInstance = L.map('stickyMap', {
                    center: center,
                    zoom: zoom,
                    zoomControl: false,
                    scrollWheelZoom: false,
                    dragging: false
                });
                
                L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                    attribution: '&copy; OpenStreetMap',
                    maxZoom: 19
                }).addTo(stickyMapInstance);
                
                // Synchroniser avec la carte principale
                syncWithMainMap();
                
                // SYNCHRONISATION EN TEMPS RÉEL
                setupRealtimeSync();
                
                console.log('✅ Carte sticky initialisée');
            } catch (error) {
                console.error('❌ Erreur sticky map:', error);
            }
        }, 300);
    } else {
        // Synchroniser position avec carte active
        if (activeMapInstance) {
            stickyMapInstance.setView(
                activeMapInstance.getCenter(), 
                activeMapInstance.getZoom() - 1,
                { animate: false }
            );
        }
        stickyMapInstance.invalidateSize();
    }
    
    isStickyMapActive = true;
}

// Nouvelle fonction pour synchronisation en temps réel
let syncInterval = null;

function setupRealtimeSync() {
    // Nettoyer l'ancien interval s'il existe
    if (syncInterval) {
        clearInterval(syncInterval);
    }
    
    // Synchronisation continue toutes les 100ms
    syncInterval = setInterval(() => {
        if (!stickyMapInstance || !isStickyMapActive) return;
        
        const activeView = document.querySelector('.view-panel.active');
        if (!activeView) return;
        
        const viewId = activeView.id;
        let sourceMap = null;
        
        // Déterminer quelle carte synchroniser
        if (viewId === 'homeView' && heroMap) {
            sourceMap = heroMap;
        } else if (viewId === 'parcoursView' && timelineMap) {
            sourceMap = timelineMap;
        }
        
        // Synchroniser position et zoom
        if (sourceMap) {
            const sourceCenter = sourceMap.getCenter();
            const sourceZoom = sourceMap.getZoom();
            const stickyCenter = stickyMapInstance.getCenter();
            const stickyZoom = stickyMapInstance.getZoom();
            
            // Vérifier si une mise à jour est nécessaire
            const needsUpdate = 
                Math.abs(sourceCenter.lat - stickyCenter.lat) > 0.001 ||
                Math.abs(sourceCenter.lng - stickyCenter.lng) > 0.001 ||
                sourceZoom !== stickyZoom + 1;
            
            if (needsUpdate) {
                stickyMapInstance.setView(
                    sourceCenter,
                    sourceZoom - 1,
                    { animate: true, duration: 0.3 }
                );
            }
        }
    }, 100);
    
    console.log('✅ Synchronisation temps réel activée');
}

// Synchroniser les markers de la timeline avec la sticky map
function syncTimelineMarkers() {
    if (!stickyMapInstance) return;
    
    // Retirer les anciens markers de la sticky map
    stickyMapInstance.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
            stickyMapInstance.removeLayer(layer);
        }
    });
    
    // Copier les markers
    Object.values(locations).forEach(loc => {
        L.circleMarker(loc.coords, {
            radius: 5,
            fillColor: getColorForType(loc.type),
            color: '#fff',
            weight: 1,
            fillOpacity: 0.9
        }).addTo(stickyMapInstance)
        .bindPopup(`<strong>${loc.name}</strong>`);
    });
}

function hideStickyMap() {
    const container = document.getElementById('stickyMapContainer');
    if (container) {
        container.classList.remove('visible');
        container.classList.add('hidden');
    }
    
    // Arrêter la synchronisation
    if (syncInterval) {
        clearInterval(syncInterval);
        syncInterval = null;
    }
    
    isStickyMapActive = false;
}

function closeStickyMap() {
    hideStickyMap();
}

function zoomStickyMap(delta) {
    if (stickyMapInstance) {
        const currentZoom = stickyMapInstance.getZoom();
        stickyMapInstance.setZoom(currentZoom + delta);
    }
}

function syncWithMainMap() {
    if (!heroMap || !stickyMapInstance) return;
    
    // Synchroniser les locations
    Object.values(locations).forEach(loc => {
        L.circleMarker(loc.coords, {
            radius: 6,
            fillColor: getColorForType(loc.type),
            color: '#fff',
            weight: 1,
            fillOpacity: 0.8
        }).addTo(stickyMapInstance)
        .bindPopup(`<strong>${loc.name}</strong>`);
    });
}

// Exposer les fonctions globalement
window.closeStickyMap = closeStickyMap;
window.zoomStickyMap = zoomStickyMap;
window.zoomMainMap = zoomMainMap;

// ============================================
// CONTRÔLES ZOOM PERSONNALISÉS SUR CARTES
// ============================================
function addCustomZoomControls(mapContainerId, mapInstance) {
    if (!mapInstance) return;
    
    // Attacher les contrôles DIRECTEMENT au conteneur Leaflet (pas au parent)
    const leafletContainer = mapInstance.getContainer();
    if (!leafletContainer) return;
    
    // Vérifier si les contrôles existent déjà
    const existing = leafletContainer.querySelector('.custom-zoom-controls');
    if (existing) {
        existing.remove();
    }
    
    // Créer le conteneur de contrôles
    const zoomControls = document.createElement('div');
    zoomControls.className = 'custom-zoom-controls';
    zoomControls.innerHTML = `
        <button class="custom-zoom-btn zoom-in" title="Zoom avant">+</button>
        <button class="custom-zoom-btn zoom-out" title="Zoom arrière">−</button>
    `;
    
    // Ajouter DANS le conteneur Leaflet
    leafletContainer.appendChild(zoomControls);
    
    // Événements de zoom
    const zoomIn = zoomControls.querySelector('.zoom-in');
    const zoomOut = zoomControls.querySelector('.zoom-out');
    
    zoomIn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mapInstance.setZoom(mapInstance.getZoom() + 1);
    });
    
    zoomOut.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mapInstance.setZoom(mapInstance.getZoom() - 1);
    });
    
    console.log(`✅ Contrôles zoom ajoutés à ${mapContainerId}`);
}

// ============================================
// ZOOM CARTE PRINCIPALE (depuis sidebar)
// ============================================
function zoomMainMap(delta) {
    // Déterminer quelle carte est active
    let targetMap = null;
    
    // Vérifier quelle vue est active
    const activeView = document.querySelector('.view-panel.active');
    
    if (activeView) {
        const viewId = activeView.id;
        
        // Sélectionner la bonne carte selon la vue active
        if (viewId === 'homeView' && heroMap) {
            targetMap = heroMap;
        } else if (viewId === 'parcoursView' && timelineMap) {
            targetMap = timelineMap;
        } else if (viewId === 'contactView' && contactMap) {
            targetMap = contactMap;
        } else if (heroMap) {
            // Par défaut, utiliser heroMap si elle existe
            targetMap = heroMap;
        }
    }
    
    // Appliquer le zoom
    if (targetMap) {
        const currentZoom = targetMap.getZoom();
        targetMap.setZoom(currentZoom + delta, {
            animate: true,
            duration: 0.3
        });
        
        // Feedback visuel
        const btn = event.target.closest('.sidebar-zoom-btn');
        if (btn) {
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
        }
        
        console.log(`🔍 Zoom ${delta > 0 ? 'in' : 'out'}: ${currentZoom} → ${currentZoom + delta}`);
    } else {
        console.warn('⚠️ Aucune carte active trouvée');
    }
}

// ============================================
// GESTION DU REDIMENSIONNEMENT
// ============================================
window.addEventListener('resize', function() {
    if (heroMap) heroMap.invalidateSize();
    if (timelineMap) timelineMap.invalidateSize();
    if (contactMap) contactMap.invalidateSize();
    if (stickyMapInstance) stickyMapInstance.invalidateSize();
});

// ============================================
// CONSOLE SIGNATURE
// ============================================
console.log('%c✨ Toutes les fonctionnalités chargées', 'color: #10B981; font-size: 14px; font-weight: bold;');
console.log('%c📧 Contact: ibrahimakhalilmbacke2000@gmail.com', 'color: #06B6D4; font-size: 12px;');
console.log('%c🔗 GitHub: https://github.com/ibrahimakhalil2701', 'color: #06B6D4; font-size: 12px;');
