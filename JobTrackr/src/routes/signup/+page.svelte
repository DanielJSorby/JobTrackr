<script lang="ts">
    let name = $state('');
    let email = $state('');
    let password = $state('');

    async function handleSubmit() {
        try {
            const response = await fetch('/api/user/create-user', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
        window.location.href = '/dashboard';
    }
</script>

<div class="login">
    <div class="container">
        <div class="header">
            <h1>Sign Up</h1>
            <p>Create an account to get started</p>
        </div>
        <form onsubmit={handleSubmit}>
            <label for="name">Name</label>
            <input type="text" id="name" placeholder="John Doe" bind:value={name} required />
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="john@email.com" bind:value={email} required />
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="********" bind:value={password} required />
            <button class="button filled" type="submit">Sign Up</button>
        </form>
        <div class="bottom-message">
            <p>Already have an account? <a href="/login">Log in</a></p>
        </div>
    </div>
</div>

<style>
    .bottom-message {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
        text-align: center;
        font-size: 20px;
        font-weight: 100;
    }

    .bottom-message a {
        color: #1d40b0;
        text-decoration: underline;
    }

    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .container {
        width: 100%;
        max-width: 800px;
        padding: 2rem;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        border-radius: 16px;
        border: 1px solid #1d40b0;
	    border-style: dashed;
        overflow: hidden;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .header {
        background-color: #1d40b0;
        color: #fff;
        padding: 1rem;
        border: 1px solid #1d40b0;
	    border-style: dashed;
        margin: -2em;
        margin-bottom: 2em;
        padding: 2em;
    }

    .header h1 {
        font-size: 52px;
    }

    .header p {
        font-size: 20px;
        font-weight: 100;
    }
</style>
