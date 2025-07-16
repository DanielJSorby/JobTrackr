<script lang="ts">
    import { onMount } from 'svelte';

    onMount(() => {
        // Clear the user cookie
        document.cookie = 'UserId=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        
        // Redirect to login page
        window.location.href = '/login';
    });
</script>

<div class="logout-page">
    <div class="container">
        <div class="logout-message">
            <h1>Logging out...</h1>
            <p>You will be redirected to the login page.</p>
        </div>
    </div>
</div>

<style>
    .logout-page {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f8fafc;
    }

    .container {
        text-align: center;
        padding: 2rem;
    }

    .logout-message h1 {
        color: #1d40b0;
        margin-bottom: 1rem;
    }

    .logout-message p {
        color: #6b7280;
        font-size: 1.1rem;
    }
</style> 