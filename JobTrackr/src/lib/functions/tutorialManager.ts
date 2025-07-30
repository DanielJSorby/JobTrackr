export function shouldShowTutorial(tutorialType: 'dashboard' | 'job'): boolean {
    if (typeof window === 'undefined') return false; // Server-side check
    
    const storageKey = `tutorial_${tutorialType}_completed`;
    const completed = localStorage.getItem(storageKey);
    return !completed;
}

export function markTutorialCompleted(tutorialType: 'dashboard' | 'job') {
    if (typeof window === 'undefined') return; // Server-side check
    
    const storageKey = `tutorial_${tutorialType}_completed`;
    localStorage.setItem(storageKey, 'true');
}

export function resetTutorials() {
    if (typeof window === 'undefined') return; // Server-side check
    
    // Remove tutorial completion from localStorage
    localStorage.removeItem('tutorial_dashboard_completed');
    localStorage.removeItem('tutorial_job_completed');
} 