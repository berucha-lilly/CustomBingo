// accessibility-violations.js
// This file demonstrates various accessibility violations in JavaScript

// 1. Dynamically creating elements without accessibility attributes
function createInaccessibleButton() {
    const button = document.createElement('div');
    button.onclick = () => alert('Clicked!');
    button.textContent = 'Click me';
    // Missing: role, tabindex, keyboard handlers
    document.body.appendChild(button);
}

// 2. Removing focus indicators programmatically
function removeFocusIndicators() {
    document.querySelectorAll('*').forEach(el => {
        el.style.outline = 'none';
    });
}

// 3. Creating modal without focus trap
function showInaccessibleModal() {
    const modal = document.createElement('div');
    modal.innerHTML = '<h2>Modal Title</h2><p>Content</p><button>Close</button>';
    modal.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:20px;';
    document.body.appendChild(modal);
    // Missing: focus trap, aria-modal, aria-labelledby, escape key handler
}

// 4. Manipulating DOM without announcing changes
function updateContentSilently() {
    document.getElementById('status').textContent = 'Updated!';
    // Missing: aria-live region or announcement
}

// 5. Creating form without labels
function createInaccessibleForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter name'; // Placeholder is not a label
    form.appendChild(input);
    document.body.appendChild(form);
}

// 6. Disabling elements without proper feedback
function disableWithoutFeedback() {
    const button = document.querySelector('button');
    button.disabled = true;
    // Missing: aria-disabled, visual indication, screen reader announcement
}

// 7. Creating infinite scroll without keyboard access
function infiniteScrollNoKeyboard() {
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            loadMoreContent();
        }
    });
    // Missing: keyboard alternative, focus management
}

function loadMoreContent() {
    // Load content
}

// 8. Auto-playing media without controls
function autoPlayMedia() {
    const video = document.createElement('video');
    video.src = 'video.mp4';
    video.autoplay = true;
    video.muted = false; // Autoplays with sound
    // Missing: controls, user consent
    document.body.appendChild(video);
}

// 9. Creating dropdown without keyboard navigation
function createInaccessibleDropdown() {
    const dropdown = document.createElement('div');
    dropdown.innerHTML = `
        <div class="trigger">Select Option</div>
        <div class="menu" style="display:none;">
            <div onclick="selectOption(1)">Option 1</div>
            <div onclick="selectOption(2)">Option 2</div>
        </div>
    `;

    dropdown.querySelector('.trigger').onclick = function() {
        const menu = dropdown.querySelector('.menu');
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    };
    // Missing: ARIA attributes, keyboard navigation, focus management
    document.body.appendChild(dropdown);
}

// 10. Timeout without warning or extension option
function startInaccessibleTimeout() {
    setTimeout(() => {
        alert('Session expired!');
        window.location.href = '/login';
    }, 60000);
    // Missing: warning, option to extend, accessible countdown
}

// 11. Creating tooltip without proper ARIA
function createInaccessibleTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.textContent = text;
    tooltip.style.cssText = 'position:absolute;background:black;color:white;padding:5px;';

    element.addEventListener('mouseenter', () => {
        document.body.appendChild(tooltip);
    });

    element.addEventListener('mouseleave', () => {
        tooltip.remove();
    });
    // Missing: aria-describedby, keyboard access, role="tooltip"
}

// 12. Changing content without managing focus
function navigateWithoutFocus(page) {
    fetch(`/api/${page}`)
        .then(res => res.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            // Missing: focus management, announcement
        });
}

// 13. Creating tabs without proper ARIA
function createInaccessibleTabs() {
    const tabs = document.createElement('div');
    tabs.innerHTML = `
        <div class="tab" onclick="showTab(1)">Tab 1</div>
        <div class="tab" onclick="showTab(2)">Tab 2</div>
        <div id="panel1">Content 1</div>
        <div id="panel2" style="display:none;">Content 2</div>
    `;
    // Missing: role="tablist", role="tab", role="tabpanel", aria-selected, keyboard navigation
    document.body.appendChild(tabs);
}

// 14. Using positive tabindex
function setConfusingTabOrder() {
    document.querySelectorAll('button').forEach((btn, index) => {
        btn.tabIndex = index + 10; // Positive tabindex is problematic
    });
}

// 15. Creating alert without ARIA live region
function showInaccessibleAlert(message) {
    const alert = document.createElement('div');
    alert.textContent = message;
    alert.style.cssText = 'position:fixed;top:20px;right:20px;background:red;color:white;padding:10px;';
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
    // Missing: role="alert" or aria-live="assertive"
}

// 16. Preventing default keyboard behavior
function breakKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault(); // Breaks tab navigation
        }
    });
}

// 17. Creating carousel without accessibility
function createInaccessibleCarousel() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');

    setInterval(() => {
        slides[currentSlide].style.display = 'none';
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.display = 'block';
    }, 3000);
    // Missing: pause button, keyboard controls, aria-live, focus management
}

// 18. Creating custom checkbox without ARIA
function createInaccessibleCheckbox() {
    const checkbox = document.createElement('div');
    checkbox.className = 'custom-checkbox';
    checkbox.onclick = function() {
        this.classList.toggle('checked');
    };
    // Missing: role="checkbox", aria-checked, keyboard support, label association
    document.body.appendChild(checkbox);
}

// 19. Injecting HTML without sanitization or structure
function injectUnsafeContent(userContent) {
    document.getElementById('content').innerHTML = userContent;
    // Missing: sanitization, semantic structure, accessibility attributes
}

// 20. Creating drag-and-drop without keyboard alternative
function createInaccessibleDragDrop() {
    const draggable = document.querySelector('.draggable');

    draggable.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.id);
    });

    const dropzone = document.querySelector('.dropzone');
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text');
        dropzone.appendChild(document.getElementById(data));
    });
    // Missing: keyboard alternative, ARIA attributes, instructions
}

// 21. Creating loading spinner without announcement
function showLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.innerHTML = '⟳';
    document.body.appendChild(spinner);
    // Missing: aria-live, role="status", text alternative
}

// 22. Hiding content incorrectly
function hideContentWrong(element) {
    element.style.display = 'none'; // Hides from everyone
    // Should use aria-hidden="true" if content should remain in DOM
    // Or use visibility: hidden with proper ARIA
}

// 23. Creating accordion without proper ARIA
function createInaccessibleAccordion() {
    const accordion = document.createElement('div');
    accordion.innerHTML = `
        <div class="header" onclick="togglePanel(this)">Section 1</div>
        <div class="panel" style="display:none;">Content 1</div>
        <div class="header" onclick="togglePanel(this)">Section 2</div>
        <div class="panel" style="display:none;">Content 2</div>
    `;
    // Missing: role="button", aria-expanded, aria-controls, keyboard support
    document.body.appendChild(accordion);
}

// 24. Using click events only (no keyboard support)
function addClickOnlyHandler() {
    document.querySelectorAll('.clickable').forEach(el => {
        el.onclick = () => doSomething();
        // Missing: onkeydown/onkeyup for Enter/Space keys
    });
}

// 25. Creating progress indicator without ARIA
function updateProgressSilently(percent) {
    const bar = document.querySelector('.progress-bar');
    bar.style.width = percent + '%';
    // Missing: role="progressbar", aria-valuenow, aria-valuemin, aria-valuemax
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createInaccessibleButton,
        removeFocusIndicators,
        showInaccessibleModal,
        updateContentSilently,
        createInaccessibleForm,
        disableWithoutFeedback,
        infiniteScrollNoKeyboard,
        autoPlayMedia,
        createInaccessibleDropdown,
        startInaccessibleTimeout,
        createInaccessibleTooltip,
        navigateWithoutFocus,
        createInaccessibleTabs,
        setConfusingTabOrder,
        showInaccessibleAlert,
        breakKeyboardNavigation,
        createInaccessibleCarousel,
        createInaccessibleCheckbox,
        injectUnsafeContent,
        createInaccessibleDragDrop,
        showLoadingSpinner,
        hideContentWrong,
        createInaccessibleAccordion,
        addClickOnlyHandler,
        updateProgressSilently
    };
}