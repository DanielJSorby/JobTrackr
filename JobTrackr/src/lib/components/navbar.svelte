<script>
    let { links = [{ label: 'Sign Up', href: '/signup' }, { label: 'Log In', href: '/login' }] } = $props();
</script>

<nav>
    <div class="logo">
        <a href="/">JobTrackr</a>
    </div>
    
    <!-- Desktop Menu -->
    <ul class="desktop-menu">
        {#each links as link}
            <li>
                <a href={link.href}>{link.label}</a>
            </li>
        {/each}

    </ul>
    
    <!-- Hamburger Menu Button -->
    <input type="checkbox" id="hamburger-toggle" class="hamburger-checkbox">
    <label for="hamburger-toggle" class="hamburger">
        <span></span>
        <span></span>
        <span></span>
    </label>
    
    <!-- Mobile Menu -->
    <div class="mobile-menu">
        <ul>
            {#each links as link}
                <li>
                    <a href={link.href}>{link.label}</a>
                </li>
            {/each}

        </ul>
    </div>
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
        position: relative;
    }

    nav ul li a::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -4px;
        left: 0;
        background-color: #fff;
        transition: width 0.3s ease-in-out;
    }

    nav ul li a:hover::after {
        width: 100%;
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
        transition: text-shadow 0.3s ease;
    }

    .logo a:hover {
        text-shadow: 4px 4px 2px rgba(0,0,0,0.6);
        transition: text-shadow 0.3s ease;
    }
    
    /* Hamburger Menu */
    .hamburger-checkbox {
        display: none;
    }
    
    .hamburger {
        display: none;
        flex-direction: column;
        cursor: pointer;
        width: 30px;
        height: 30px;
        position: relative;
        z-index: 100001;
    }
    
    .hamburger span {
        width: 100%;
        height: 3px;
        background-color: #fff;
        border-radius: 3px;
        transition: all 0.3s ease;
        transform-origin: center;
    }
    
    .hamburger span:nth-child(1) {
        transform: translateY(0);
    }
    
    .hamburger span:nth-child(2) {
        transform: translateY(8px);
    }
    
    .hamburger span:nth-child(3) {
        transform: translateY(16px);
    }
    
    /* Active hamburger animation */
    .hamburger-checkbox:checked ~ .hamburger span:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger-checkbox:checked ~ .hamburger span:nth-child(2) {
        opacity: 0;
        transform: translateX(-20px);
    }
    
    .hamburger-checkbox:checked ~ .hamburger span:nth-child(3) {
        transform: translateY(8px) rotate(-45deg);
    }
    
    /* Mobile Menu */
    .mobile-menu {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100vh;
        background-color: #1D40B0;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 100000;
    }
    
    .hamburger-checkbox:checked ~ .mobile-menu {
        transform: translateX(0);
    }
    
    .mobile-menu ul {
        flex-direction: column;
        gap: 2rem;
        text-align: center;
    }
    
    .mobile-menu ul li a {
        font-size: 2rem;
        font-weight: bold;
    }
    

    
    /* Responsive Design */
    @media (max-width: 768px) {
        .desktop-menu {
            display: none;
        }
        
        .hamburger {
            display: flex;
        }
        
        .logo a {
            font-size: 2rem;
        }
    }
</style>