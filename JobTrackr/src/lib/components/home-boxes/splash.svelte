<div class="splash">
    <div class="container">
        <div class="splash-content">
            <div class="text-content">
                <h1 class="header">
                    Organize Your<br>Job Search
                </h1>
                <p class="subheader">
                    Keep track of all your job applications in one place. Never miss a follow-up or lose track of your progress.
                </p>
            </div>
            <div class="button-container">
                <a href="/signup"><button class="button filled">Get Started <img class="right" src="/icons/arrow-right.svg" alt="->"></button></a>
                <a href="/login"><button class="button transparent">Log In</button></a>
            </div>
        </div>
        <div class="image-container">
            <img id="splash-image" src="https://www.betterteam.com/images/betterteam-best-job-boards-6416x4277-2022095.jpeg?crop=1:1,smart&width=1200&dpr=2&format=pjpg&auto=webp&quality=85" alt="JobTrackr">
        </div>
    </div>
</div>

<style>
    .splash {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        width: 100%;
        padding: 2rem 1rem;
    }

    .container {
        width: 100%;
        max-width: var(--max-width);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }

    .splash-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .button-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: clamp(0.75rem, 2vw, 1rem);
        flex-wrap: wrap;
    }
    
    .header {
        font-size: clamp(2.5rem, 8vw, 92px);
        font-weight: 600;
        line-height: 1.1;
    }

    .subheader {
        font-size: clamp(1rem, 2vw, 24px);
        font-weight: 400;
        color: #6B7280;
        line-height: 1.5;
        max-width: 600px;
    }

    .image-container {
        width: 100%;
        border-radius: 16px;
        overflow: hidden;
        aspect-ratio: 16/9;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    #splash-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
    }

    @media (min-width: 768px) {
        .container {
            flex-direction: row;
            align-items: center;
            gap: 4rem;
        }

        .splash-content {
            width: 50%;
        }

        .image-container {
            width: 50%;
        }
    }

    @media (max-width: 767px) {
        .splash {
            padding: 1rem;
        }

        .button-container {
            justify-content: center;
        }

        .text-content {
            text-align: center;
        }
    }
</style>