/**
 * Sections.js - Responsible for loading modular HTML content sections
 */

document.addEventListener('DOMContentLoaded', function() {
    loadSection('about', 'about.html');
    loadSection('experience', 'experience.html');
    loadSection('research', 'research.html');
    loadSection('projects', 'projects.html');
});

/**
 * Loads an HTML section from a separate file and inserts it into the page
 * @param {string} sectionId - The ID of the section container to insert into
 * @param {string} fileName - The file name to load
 */
function loadSection(sectionId, fileName) {
    // Check if this section is already in the page
    const section = document.getElementById(sectionId);

    // If section doesn't exist yet, create a placeholder
    if (!section) {
        const placeholderSection = document.createElement('section');
        placeholderSection.id = sectionId;
        placeholderSection.className = 'py-20 bg-white scroll-reveal';
        placeholderSection.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="animate-pulse">
                <div class="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                <div class="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-2"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
        </div>`;
        
        // Insert at the appropriate location
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsSection.parentNode.insertBefore(placeholderSection, skillsSection);
        }
    }

    // Now load the content
    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${fileName}: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            // Get a reference to the section again (in case it was just created)
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.outerHTML = html;
                
                // Re-initialize any animations or effects for this section
                const newSection = document.getElementById(sectionId);
                if (newSection && window.initScrollReveal) {
                    window.initScrollReveal([newSection]);
                }
            }
        })
        .catch(error => {
            console.error(`Error loading section ${sectionId}:`, error);
        });
}
