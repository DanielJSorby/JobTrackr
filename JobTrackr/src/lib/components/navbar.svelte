<script>
    let { links = [{ label: 'Sign Up', href: '/signup' }, { label: 'Log In', href: '/login' }] } = $props();
</script>

<nav>
    <div class="logo">
        <a href="/">JobTrackr</a>
    </div>
    <ul>
        {#each links as link}
            <li>
                <a href={link.href}>{link.label}</a>
            </li>
        {/each}
    </ul>
</nav>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: #1D40B0;
        color: #fff;
        height: 80px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100000;
    }

    nav ul {
        display: flex;
        list-style: none;
        gap: 1rem;
    }

    nav ul li a {
        text-decoration: none;
        color: #fff;
        font-size: 1.2rem;
    }

    nav ul li a:hover {
        text-shadow: 4px 4px 2px rgba(0,0,0,0.6);
        transition: text-shadow 0.3s ease;
    }

    .logo a {
        font-size: 3rem;
        font-weight: bold;
        color: #fff;
        text-decoration: none;
    }
    
</style>