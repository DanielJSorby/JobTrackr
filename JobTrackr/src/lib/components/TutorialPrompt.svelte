<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    
    let { show = false, tutorialType = 'dashboard' as 'dashboard' | 'job' } = $props();
    
    function startTutorial() {
        dispatch('start');
    }
    
    function dismiss() {
        dispatch('dismiss');
    }
</script>

{#if show}
    <div class="tutorial-prompt-overlay">
        <div class="tutorial-prompt">
            <div class="prompt-header">
                <h2>🎉 Welcome to JobTrackr!</h2>
                <p>Would you like a quick overview of how to use the application?</p>
            </div>
            
            <div class="prompt-content">
                <div class="feature-highlights">
                    <div class="feature">
                        <span class="feature-icon">📝</span>
                        <span>Add and organize job applications</span>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">🔍</span>
                        <span>Search and filter your applications</span>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">📊</span>
                        <span>Track your progress</span>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">📅</span>
                        <span>Timeline and notes for each job</span>
                    </div>
                </div>
            </div>
            
            <div class="prompt-actions">
                <button class="btn-secondary" on:click={dismiss}>
                    No thanks, I'll figure it out
                </button>
                <button class="btn-primary" on:click={startTutorial}>
                    Yes, show me around! 🚀
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    .tutorial-prompt-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9998;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .tutorial-prompt {
        background: white;
        border-radius: 16px;
        padding: 32px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        animation: slideUp 0.3s ease-out;
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .prompt-header {
        text-align: center;
        margin-bottom: 24px;
    }
    
    .prompt-header h2 {
        margin: 0 0 12px 0;
        font-size: 24px;
        font-weight: 600;
        color: #1f2937;
    }
    
    .prompt-header p {
        margin: 0;
        color: #6b7280;
        font-size: 16px;
        line-height: 1.5;
    }
    
    .prompt-content {
        margin-bottom: 32px;
    }
    
    .feature-highlights {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    
    .feature {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: #f8fafc;
        border-radius: 8px;
        border-left: 4px solid #1d40b0;
    }
    
    .feature-icon {
        font-size: 20px;
        width: 24px;
        text-align: center;
    }
    
    .feature span:last-child {
        color: #374151;
        font-weight: 500;
        font-size: 14px;
    }
    
    .prompt-actions {
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .btn-primary, .btn-secondary {
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;
        border: none;
        min-width: 140px;
    }
    
    .btn-primary {
        background: #1d40b0;
        color: white;
    }
    
    .btn-primary:hover {
        background: #1e3a8a;
        transform: translateY(-1px);
    }
    
    .btn-secondary {
        background: #f3f4f6;
        color: #374151;
        border: 1px solid #d1d5db;
    }
    
    .btn-secondary:hover {
        background: #e5e7eb;
        border-color: #9ca3af;
    }
    
    @media (max-width: 768px) {
        .tutorial-prompt {
            padding: 24px;
            margin: 20px;
            width: calc(100vw - 40px);
            max-width: none;
        }
        
        .prompt-header h2 {
            font-size: 20px;
        }
        
        .prompt-header p {
            font-size: 14px;
        }
        
        .feature {
            padding: 10px;
        }
        
        .feature span:last-child {
            font-size: 13px;
        }
        
        .prompt-actions {
            flex-direction: column;
            gap: 8px;
        }
        
        .btn-primary, .btn-secondary {
            width: 100%;
            min-width: 0;
        }
    }
</style> 