<div class="splash">
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
            <a href="/signup"><button class="button filled">Get Started <img src="/icons/arrow-right.svg" alt="->"></button></a>
            <a href="/login"><button class="button transparent">Log In</button></a>
        </div>
    </div>
    <div class="image-container">
        <img id="splash-image" src="https://www.betterteam.com/images/betterteam-best-job-boards-6416x4277-2022095.jpeg?crop=1:1,smart&width=1200&dpr=2&format=pjpg&auto=webp&quality=85" alt="JobTrackr">
    </div>
</div>

<style>
    .splash {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        height: 100vh;
        width: 100vw;
    }

    .splash-content {
        width: 40vw;
    }

    .button-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-top: 32px;
        gap: 16px;
    }
    
    .header {
        font-size: 92px;
        font-weight: 600;
    }

    .subheader {
        font-size: 24px;
        font-weight: 400;
        color: #6B7280;
    }

    .image-container {
        width: 40vw;
        border-radius: 16px;
        overflow: hidden;
    }

    #splash-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
    }
    
</style>