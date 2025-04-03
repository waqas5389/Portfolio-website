// Gallery data with Unsplash images
const projects = [
    {
        id: 1,
        title: "E-commerce Platform",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Mobile App Interface",
        category: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Corporate Identity",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1546621083-2fbdbb203dff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        title: "Product Photography",
        category: "Photography",
        image: "https://images.unsplash.com/photo-1536152470836-b943b246224c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        title: "Portfolio Website",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        title: "Dashboard Design",
        category: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
];

// Gallery state
let currentPage = 0;
const itemsPerPage = 3;
let filteredProjects = [...projects];

// Initialize the gallery
document.addEventListener('DOMContentLoaded', initGallery);

// Main initialization function
function initGallery() {
    // Initialize with all projects
    filterGallery('all');
    
    // Set up filter buttons
    setupFilters();
    
    // Set up navigation
    setupNavigation();
}

// Setup filter buttons
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter gallery
            filterGallery(btn.dataset.filter);
        });
    });
}

// Setup navigation buttons and dots
function setupNavigation() {
    // Previous button
    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            renderGalleryPage();
            updateNavigationState();
        }
    });
    
    // Next button
    document.getElementById('next-btn').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
        if (currentPage < totalPages - 1) {
            currentPage++;
            renderGalleryPage();
            updateNavigationState();
        }
    });
}

// Filter gallery items
function filterGallery(category) {
    // Reset to first page when filtering
    currentPage = 0;
    
    // Filter projects
    filteredProjects = category === 'all' ? 
        [...projects] : 
        projects.filter(item => item.category === category);
        
    // Update dots based on filtered items
    renderDots();
    
    // Update navigation state
    updateNavigationState();
    
    // Show filtered items
    renderGalleryPage();
}

// Render pagination dots
function renderDots() {
    const dotsContainer = document.getElementById('carousel-dots');
    dotsContainer.innerHTML = '';
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${i === currentPage ? 'active' : ''}`;
        dot.dataset.page = i;
        
        // Add click event
        dot.addEventListener('click', () => {
            currentPage = parseInt(dot.dataset.page);
            renderGalleryPage();
            updateNavigationState();
        });
        
        dotsContainer.appendChild(dot);
    }
}

// Update navigation buttons state
function updateNavigationState() {
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    
    // Update dots
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentPage);
    });
    
    // Update prev/next buttons
    document.getElementById('prev-btn').classList.toggle('disabled', currentPage === 0);
    document.getElementById('next-btn').classList.toggle('disabled', currentPage === totalPages - 1);
}

// Render current gallery page
function renderGalleryPage() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    // Clear gallery with fade-out effect
    const oldItems = galleryGrid.querySelectorAll('.gallery-item');
    oldItems.forEach(item => {
        item.classList.remove('show');
    });
    
    // Short delay to allow animation
    setTimeout(() => {
        // Clear gallery
        galleryGrid.innerHTML = '';
        
        // Get current page items
        const startIndex = currentPage * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, filteredProjects.length);
        const currentItems = filteredProjects.slice(startIndex, endIndex);
        
        // No items message
        if (currentItems.length === 0) {
            galleryGrid.innerHTML = '<div class="no-items">No projects found</div>';
            return;
        }
        
        // Render items with staggered animation
        currentItems.forEach((item, index) => {
            const delay = index * 100;
            
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.category = item.category;
            galleryItem.style.transitionDelay = `${delay}ms`;
            
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="gallery-item-info">
                    <h3 class="gallery-item-title">${item.title}</h3>
                    <p class="gallery-item-category">${item.category}</p>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
            
            // Trigger animation after a small delay
            setTimeout(() => {
                galleryItem.classList.add('show');
            }, 50);
        });
    }, 300);
}
