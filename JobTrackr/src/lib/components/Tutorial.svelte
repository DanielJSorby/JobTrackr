<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    
    const dispatch = createEventDispatcher();
    
    let { open = false, currentStep = $bindable(0), tutorialType = 'dashboard' as 'dashboard' | 'job' } = $props();
    
    let tutorialSteps = $state<any[]>([]);
    let currentElement: HTMLElement | null = null;
    let overlay: HTMLElement | null = null;
    let highlightedElements: HTMLElement[] = [];
    let originalScrollPosition = $state(0);
    
    const dashboardSteps = [
        {
            id: 'welcome',
            title: 'Welcome to JobTrackr! 🎉',
            content: 'Let\'s take a quick tour of how you can use JobTrackr to organize your job search process.',
            position: 'center',
            showArrow: false
        },
        {
            id: 'add-job',
            title: 'Add a new job',
            content: 'Click the "Add Job" button to add a new job application. Here you can fill in all the information about the position.',
            position: 'bottom',
            target: '.top-part-right button',
            showArrow: true
        },
        {
            id: 'status-overview',
            title: 'Status overview',
            content: 'Here you can see an overview of how many jobs you have in each category. Perfect for keeping track of your progress!',
            position: 'bottom',
            target: '.status-overview',
            showArrow: true
        },
        {
            id: 'search-filter',
            title: 'Search and filter',
            content: 'Use the search field to find specific jobs, or use the status filters to see jobs in a particular phase.',
            position: 'bottom',
            target: '.search',
            showArrow: true
        },
        {
            id: 'status-tabs',
            title: 'Status tabs',
            content: 'Click on the tabs to filter your jobs by status. A quick way to organize your applications!',
            position: 'bottom',
            target: 'StatusTabs',
            showArrow: true
        },
        {
            id: 'job-cards',
            title: 'Job cards',
            content: 'Each job is displayed as a card with important information. Click on a card to see details and edit.',
            position: 'top',
            target: '.jobs-list',
            showArrow: true
        },
        {
            id: 'complete',
            title: 'You\'re all set! 🚀',
            content: 'You\'ve now learned the basics of JobTrackr. Start by adding your first job and organize your application process!',
            position: 'center',
            showArrow: false
        }
    ];
    
    const jobSteps = [
        {
            id: 'welcome-job',
            title: 'Job details page 📋',
            content: 'Here you can view and edit all information about your job application. Let\'s go through what you can do here.',
            position: 'center',
            showArrow: false
        },
        {
            id: 'edit-button',
            title: 'Edit job',
            content: 'Click "Edit" to change information about the job. You can update status, notes, and other details.',
            position: 'bottom',
            target: '.buttons .button.filled',
            showArrow: true
        },
        {
            id: 'job-details',
            title: 'Job information',
            content: 'Here you can see all basic information about the position. Perfect for keeping track of important details.',
            position: 'right',
            target: '.first-row',
            showArrow: true
        },
        {
            id: 'notes',
            title: 'Notes',
            content: 'Use the notes section to write down important points, interview questions, or other thoughts about the job.',
            position: 'left',
            target: '.first-row',
            showArrow: true
        },
        {
            id: 'timeline',
            title: 'Timeline',
            content: 'Keep track of your progress with the timeline. Add events like interviews, follow-ups, and other milestones.',
            position: 'left',
            target: '.second-row',
            showArrow: true
        },
        {
            id: 'quick-actions',
            title: 'Quick actions',
            content: 'Use quick actions to rapidly change status or perform common tasks.',
            position: 'right',
            target: '.second-row',
            showArrow: true
        },
        {
            id: 'complete-job',
            title: 'Perfect! 🎯',
            content: 'You can now efficiently manage your job applications. Remember to update status and notes regularly!',
            position: 'center',
            showArrow: false
        }
    ];
    
    onMount(() => {
        tutorialSteps = tutorialType === 'dashboard' ? dashboardSteps : jobSteps;
        
        // Handle window resize for mobile responsiveness
        const handleResize = () => {
            if (open) {
                updateTutorialPosition();
            }
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
    

    
    function nextStep() {
        if (currentStep < tutorialSteps.length - 1) {
            currentStep++;
            updateTutorialPosition();
        } else {
            // Scroll back to top before completing
            if (originalScrollPosition > 0) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => {
                    completeTutorial();
                }, 500);
            } else {
                completeTutorial();
            }
        }
    }
    
    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            updateTutorialPosition();
            
            // If going back to first step, scroll to original position
            if (currentStep === 0 && originalScrollPosition > 0) {
                window.scrollTo({ top: originalScrollPosition, behavior: 'smooth' });
            }
        }
    }
    
    function skipTutorial() {
        // Scroll back to original position before skipping
        if (originalScrollPosition > 0) {
            window.scrollTo({ top: originalScrollPosition, behavior: 'smooth' });
            setTimeout(() => {
                completeTutorial();
            }, 300);
        } else {
            completeTutorial();
        }
    }
    
    function completeTutorial() {
        // Remove all highlights
        highlightedElements.forEach(el => {
            el.style.filter = '';
            el.style.pointerEvents = '';
            el.style.zIndex = '';
            el.style.transform = '';
            el.style.transition = '';
            el.style.border = '';
            el.style.borderRadius = '';
            el.style.boxShadow = '';
            el.style.animation = '';
        });
        
        // Clean up any remaining highlights
        highlightedElements.forEach(el => {
            el.style.filter = '';
            el.style.pointerEvents = '';
            el.style.zIndex = '';
            el.style.transform = '';
            el.style.transition = '';
            el.style.border = '';
            el.style.borderRadius = '';
            el.style.boxShadow = '';
            el.style.animation = '';
        });
        
        // Tutorial completion is now handled by the parent component
        dispatch('complete');
        open = false;
    }
    
    function updateTutorialPosition() {
        setTimeout(() => {
            const step = tutorialSteps[currentStep];
            
            // Store original scroll position on first step
            if (currentStep === 0) {
                originalScrollPosition = window.scrollY;
            }
            
            // Remove previous highlights
            highlightedElements.forEach(el => {
                el.style.filter = '';
                el.style.pointerEvents = '';
                el.style.zIndex = '';
                el.style.transform = '';
                el.style.transition = '';
                el.style.border = '';
                el.style.borderRadius = '';
                el.style.boxShadow = '';
                el.style.animation = '';
            });
            highlightedElements = [];
            
            if (step.target && step.position !== 'center') {
                const targetElement = document.querySelector(step.target) as HTMLElement;
                if (targetElement) {
                    currentElement = targetElement;
                    
                    // Highlight the current element with strong lift effect
                    const isMobile = window.innerWidth <= 768;
                    if (isMobile) {
                        targetElement.style.transform = 'scale(1.08)';
                        targetElement.style.boxShadow = '0 12px 40px rgba(255, 255, 255, 1), 0 6px 20px rgba(255, 255, 255, 0.6), 0 0 0 4px rgba(255, 255, 255, 0.3)';
                        targetElement.style.animation = 'lift-mobile 2s infinite';
                    } else {
                        targetElement.style.transform = 'scale(1.05)';
                        targetElement.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.9), 0 5px 15px rgba(255, 255, 255, 0.5), 0 0 0 3px rgba(255, 255, 255, 0.4)';
                        targetElement.style.animation = 'lift 2s infinite';
                    }
                    targetElement.style.pointerEvents = 'auto';
                    targetElement.style.zIndex = '99999';
                    targetElement.style.transition = 'all 0.3s ease';
                    targetElement.style.border = '3px solid rgba(255, 255, 255, 1)';
                    targetElement.style.borderRadius = '12px';
                    highlightedElements.push(targetElement);
                    
                    // No dimming - just highlight the target element
                    
                    // Auto-scroll to element on mobile
                    if (isMobile && step.target) {
                        const targetElement = document.querySelector(step.target) as HTMLElement;
                        if (targetElement) {
                            const rect = targetElement.getBoundingClientRect();
                            const isElementVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
                            
                            if (!isElementVisible) {
                                // Scroll to element with offset for better visibility
                                const scrollTop = targetElement.offsetTop - 100;
                                window.scrollTo({ top: scrollTop, behavior: 'smooth' });
                                
                                // Wait for scroll to complete before positioning tooltip
                                setTimeout(() => {
                                    positionTutorial();
                                }, 300);
                                return;
                            }
                        }
                    }
                    
                    positionTutorial();
                }
            } else {
                // For center position, no specific element to highlight
                // Just show the tutorial dialog
            }
        }, 100);
    }
    
    function positionTutorial() {
        if (!currentElement || !overlay) return;
        
        const rect = currentElement.getBoundingClientRect();
        const step = tutorialSteps[currentStep];
        const tooltip = overlay.querySelector('.tutorial-tooltip') as HTMLElement;
        
        if (!tooltip) return;
        
        // Special handling for notes section on job page
        const isNotesStep = step.id === 'notes' && tutorialType === 'job';
        
        const isMobile = window.innerWidth <= 768;
        let top = 0;
        let left = 0;
        
        if (isMobile) {
            // On mobile, always position at center for better UX
            top = window.innerHeight / 2 - tooltip.offsetHeight / 2;
            left = window.innerWidth / 2 - tooltip.offsetWidth / 2;
        } else {
            // Desktop positioning
            switch (step.position) {
                case 'top':
                    top = rect.top - tooltip.offsetHeight - 20;
                    left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2);
                    break;
                case 'bottom':
                    top = rect.bottom + 20;
                    left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2);
                    break;
                case 'left':
                    top = rect.top + (rect.height / 2) - (tooltip.offsetHeight / 2);
                    left = rect.left - tooltip.offsetWidth - 20;
                    break;
                case 'right':
                    top = rect.top + (rect.height / 2) - (tooltip.offsetHeight / 2);
                    left = rect.right + 20;
                    break;
                case 'center':
                    top = window.innerHeight / 2 - tooltip.offsetHeight / 2;
                    left = window.innerWidth / 2 - tooltip.offsetWidth / 2;
                    break;
            }
            
            // Special positioning for notes step to ensure visibility
            if (isNotesStep) {
                // Position tooltip above the notes section to avoid being hidden
                top = Math.max(150, rect.top - tooltip.offsetHeight - 30);
                left = Math.max(50, Math.min(left, window.innerWidth - tooltip.offsetWidth - 50));
            }
        }
        
        // Ensure tooltip stays within viewport with extra margin
        const margin = 30;
        top = Math.max(margin, Math.min(top, window.innerHeight - tooltip.offsetHeight - margin));
        left = Math.max(margin, Math.min(left, window.innerWidth - tooltip.offsetWidth - margin));
        
        // Additional check to ensure tooltip is not hidden behind other elements
        if (top < 100) {
            top = 100; // Ensure minimum distance from top
        }
        
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    }
    
    $effect(() => {
        if (open && tutorialSteps.length > 0) {
            updateTutorialPosition();
        }
    });
    
    $effect(() => {
        if (currentStep >= 0 && currentStep < tutorialSteps.length) {
            const step = tutorialSteps[currentStep];
            if (step) {
                updateTutorialPosition();
            }
        }
    });
</script>

{#if open}
    <div class="tutorial-overlay" bind:this={overlay}>
        <div class="tutorial-tooltip" class:center={tutorialSteps[currentStep]?.position === 'center'}>
            <div class="tutorial-header">
                <h3>{tutorialSteps[currentStep]?.title}</h3>
                <button class="close-btn" on:click={skipTutorial}>✕</button>
            </div>
            <p class="tutorial-content">{tutorialSteps[currentStep]?.content}</p>
            <div class="tutorial-footer">
                <div class="progress">
                    {currentStep + 1} of {tutorialSteps.length}
                </div>
                <div class="tutorial-buttons">
                    <button class="skip-btn" on:click={skipTutorial}>Skip</button>
                    <div class="nav-buttons">
                        {#if currentStep > 0}
                            <button class="nav-btn" on:click={prevStep}>← Previous</button>
                        {/if}
                        <button class="nav-btn primary" on:click={nextStep}>
                            {currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next →'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .tutorial-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: transparent;
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }
    
    .tutorial-tooltip {
        background: white;
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90vw;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        position: absolute;
        z-index: 1000000;
        animation: slideIn 0.3s ease-out;
        pointer-events: auto;
    }
    
    @keyframes lift {
        0%, 100% {
            transform: scale(1.05) translateY(0);
            box-shadow: 0 10px 30px rgba(255, 255, 255, 0.9), 0 5px 15px rgba(255, 255, 255, 0.5), 0 0 0 3px rgba(255, 255, 255, 0.4);
        }
        50% {
            transform: scale(1.05) translateY(-5px);
            box-shadow: 0 15px 40px rgba(255, 255, 255, 1), 0 8px 20px rgba(255, 255, 255, 0.7), 0 0 0 4px rgba(255, 255, 255, 0.6);
        }
    }
    
    @keyframes lift-mobile {
        0%, 100% {
            transform: scale(1.08) translateY(0);
            box-shadow: 0 12px 40px rgba(255, 255, 255, 1), 0 6px 20px rgba(255, 255, 255, 0.6), 0 0 0 4px rgba(255, 255, 255, 0.3);
        }
        50% {
            transform: scale(1.08) translateY(-5px);
            box-shadow: 0 18px 50px rgba(255, 255, 255, 1), 0 10px 25px rgba(255, 255, 255, 0.8), 0 0 0 5px rgba(255, 255, 255, 0.5);
        }
    }
    
    .tutorial-tooltip.center {
        position: relative;
        top: auto;
        left: auto;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .tutorial-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
    }
    
    .tutorial-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
        flex: 1;
    }
    
    .close-btn {
        background: none;
        border: none;
        font-size: 18px;
        color: #6b7280;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        margin-left: 8px;
    }
    
    .close-btn:hover {
        background: #f3f4f6;
        color: #374151;
    }
    
    .tutorial-content {
        margin: 0 0 20px 0;
        color: #4b5563;
        line-height: 1.6;
        font-size: 14px;
    }
    
    .tutorial-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .progress {
        font-size: 12px;
        color: #6b7280;
        font-weight: 500;
    }
    
    .tutorial-buttons {
        display: flex;
        gap: 12px;
        align-items: center;
    }
    
    .skip-btn {
        background: none;
        border: none;
        color: #6b7280;
        font-size: 14px;
        cursor: pointer;
        padding: 8px 12px;
        border-radius: 6px;
        font-weight: 500;
    }
    
    .skip-btn:hover {
        background: #f3f4f6;
        color: #374151;
    }
    
    .nav-buttons {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }
    
    .nav-btn {
        background: #f3f4f6;
        border: 1px solid #d1d5db;
        color: #374151;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s;
        min-width: 80px;
    }
    
    .nav-btn:hover {
        background: #e5e7eb;
        border-color: #9ca3af;
    }
    
    .nav-btn.primary {
        background: #1d40b0;
        border-color: #1d40b0;
        color: white;
    }
    
    .nav-btn.primary:hover {
        background: #1e3a8a;
        border-color: #1e3a8a;
    }
    
    @media (max-width: 768px) {
        .tutorial-tooltip {
            padding: 20px;
            margin: 20px;
            width: calc(100vw - 40px);
            max-width: none;
        }
        
        .tutorial-header h3 {
            font-size: 16px;
        }
        
        .tutorial-content {
            font-size: 13px;
        }
        
        .tutorial-footer {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
        }
        
        .tutorial-buttons {
            flex-direction: column;
            gap: 8px;
        }
        
        .nav-buttons {
            justify-content: center;
        }
        
        .nav-btn {
            flex: 1;
            min-width: 0;
        }
    }
</style> 