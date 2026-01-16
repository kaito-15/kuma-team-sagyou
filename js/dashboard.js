document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const contentFrame = document.getElementById('content-frame');
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const notesTextarea = document.getElementById('site-notes');
    const saveBtn = document.getElementById('save-notes');
    const deleteBtn = document.getElementById('delete-notes');

    // Sidebar Toggle
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('collapsed');
        });
    }

    // Notes Editor Logic
    // Notes Editor Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const noteAreas = document.querySelectorAll('.note-area');

    // 1. Tab Switching Functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            noteAreas.forEach(area => area.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding textarea
            const targetId = btn.getAttribute('data-target');
            const targetArea = document.getElementById(targetId);
            if (targetArea) {
                targetArea.classList.add('active');
            }
        });
    });

    // 2. Load Saved Notes
    const noteIds = ['note-map', 'note-analysis', 'note-scatter'];

    noteIds.forEach(id => {
        const savedContent = localStorage.getItem(`antigravity_${id}`);
        const area = document.getElementById(id);
        if (area && savedContent) {
            area.value = savedContent;
        }
    });

    // 3. Save Functionality
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            noteIds.forEach(id => {
                const area = document.getElementById(id);
                if (area) {
                    localStorage.setItem(`antigravity_${id}`, area.value);
                }
            });

            // Visual feedback
            const originalText = saveBtn.innerText;
            saveBtn.innerText = 'Saved!';
            saveBtn.classList.add('active'); // Optional: Add a class for styling if needed

            setTimeout(() => {
                saveBtn.innerText = originalText;
                saveBtn.classList.remove('active');
            }, 1500);
        });
    }

    // 4. Delete Functionality
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete ALL notes?')) {
                noteIds.forEach(id => {
                    const area = document.getElementById(id);
                    if (area) {
                        area.value = '';
                    }
                    localStorage.removeItem(`antigravity_${id}`);
                });
            }
        });
    }

    // Default Page
    // Check if we can restore state or default to first item

    function navigateTo(url, element) {
        // Update Iframe
        contentFrame.src = url;

        // Update Active State
        navItems.forEach(item => item.classList.remove('active'));
        element.classList.add('active');
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const url = item.getAttribute('href');
            navigateTo(url, item);
        });
    });

    // Initial Load - Simulate click on the first active item or the first item
    const activeItem = document.querySelector('.nav-item.active') || navItems[0];
    if (activeItem) {
        // Just ensure iframe is set (it might be set in HTML too)
        const url = activeItem.getAttribute('href');
        if (contentFrame.getAttribute('src') !== url) {
            contentFrame.src = url;
        }
    }
    // Info Overlay Logic
    const infoOverlay = document.getElementById('info-overlay');
    const showInfoBtn = document.getElementById('show-info');
    const closeInfoBtn = document.getElementById('close-info');
    const saveInfoBtn = document.getElementById('save-info-changes');

    // Editable IDs
    const editableIds = [
        'info-title-map', 'info-desc-map',
        'info-title-analysis', 'info-desc-analysis',
        'info-title-scatter', 'info-desc-scatter'
    ];

    // Load saved info content
    editableIds.forEach(id => {
        const savedContent = localStorage.getItem(`antigravity_${id}`);
        const element = document.getElementById(id);
        if (element && savedContent) {
            element.innerText = savedContent;
        }
    });

    if (showInfoBtn && infoOverlay) {
        showInfoBtn.addEventListener('click', () => {
            infoOverlay.classList.add('active');
        });
    }

    if (closeInfoBtn && infoOverlay) {
        closeInfoBtn.addEventListener('click', () => {
            infoOverlay.classList.remove('active');
        });
    }

    // Save Info Changes
    if (saveInfoBtn) {
        saveInfoBtn.addEventListener('click', () => {
            editableIds.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    localStorage.setItem(`antigravity_${id}`, element.innerText);
                }
            });

            // Visual feedback
            const originalText = saveInfoBtn.innerText;
            saveInfoBtn.innerText = 'Saved!';
            saveInfoBtn.style.background = 'rgba(76, 175, 80, 0.3)';
            saveInfoBtn.style.borderColor = 'rgba(76, 175, 80, 0.5)';

            setTimeout(() => {
                saveInfoBtn.innerText = originalText;
                saveInfoBtn.style.background = 'rgba(255, 255, 255, 0.1)';
                saveInfoBtn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }, 1000);
        });
    }

    // Close on click outside cards
    if (infoOverlay) {
        infoOverlay.addEventListener('click', (e) => {
            if (e.target === infoOverlay) {
                infoOverlay.classList.remove('active');
            }
        });
    }
});
