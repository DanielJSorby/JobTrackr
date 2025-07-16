<script lang="ts">
    import { onMount } from 'svelte';
    import { getCookie } from '$lib/functions/getCookie';

    // User data
    let user = $state({
        name: '',
        email: '',
        id: ''
    });

    // Form states
    let isEditingProfile = $state(false);
    let isChangingPassword = $state(false);
    let isChangingEmail = $state(false);

    // Profile form
    let profileForm = $state({
        name: '',
        email: ''
    });

    // Password change form
    let passwordForm = $state({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Email change form
    let emailForm = $state({
        currentPassword: '',
        newEmail: ''
    });

    // Messages
    let successMessage = $state('');
    let errorMessage = $state('');
    let isLoading = $state(false);

    // Account statistics
    let accountStats = $state({
        totalJobs: 0,
        activeJobs: 0,
        completedJobs: 0,
        memberSince: ''
    });

    onMount(async () => {
        const userId = getCookie('UserId');
        if (!userId) {
            window.location.href = '/login';
            return;
        }

        await loadUserData(userId);
        await loadAccountStats(userId);
    });

    async function loadUserData(userId: string) {
        try {
            const response = await fetch('/api/user/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });

            const data = await response.json();
            if (data.status === 200) {
                user = data.user;
                profileForm.name = user.name;
                profileForm.email = user.email;
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    async function loadAccountStats(userId: string) {
        try {
            const response = await fetch('/api/user/stats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });

            const data = await response.json();
            if (data.status === 200) {
                accountStats = data.stats;
            }
        } catch (error) {
            console.error('Error loading account stats:', error);
        }
    }

    function showMessage(message: string, isError = false) {
        if (isError) {
            errorMessage = message;
            successMessage = '';
        } else {
            successMessage = message;
            errorMessage = '';
        }
        
        setTimeout(() => {
            successMessage = '';
            errorMessage = '';
        }, 5000);
    }

    async function updateProfile() {
        if (!profileForm.name.trim()) {
            showMessage('Name is required', true);
            return;
        }

        isLoading = true;
        try {
            const response = await fetch('/api/user/update-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.id,
                    name: profileForm.name.trim()
                })
            });

            const data = await response.json();
            if (data.status === 200) {
                user.name = profileForm.name.trim();
                showMessage('Profile updated successfully');
                isEditingProfile = false;
            } else {
                showMessage(data.error || 'Failed to update profile', true);
            }
        } catch (error) {
            showMessage('An error occurred while updating profile', true);
        } finally {
            isLoading = false;
        }
    }

    async function changePassword() {
        if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
            showMessage('All password fields are required', true);
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            showMessage('New passwords do not match', true);
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            showMessage('New password must be at least 6 characters long', true);
            return;
        }

        isLoading = true;
        try {
            const response = await fetch('/api/user/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.id,
                    currentPassword: passwordForm.currentPassword,
                    newPassword: passwordForm.newPassword
                })
            });

            const data = await response.json();
            if (data.status === 200) {
                showMessage('Password changed successfully');
                passwordForm = {
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                };
                isChangingPassword = false;
            } else {
                showMessage(data.error || 'Failed to change password', true);
            }
        } catch (error) {
            showMessage('An error occurred while changing password', true);
        } finally {
            isLoading = false;
        }
    }

    async function changeEmail() {
        if (!emailForm.currentPassword || !emailForm.newEmail) {
            showMessage('All fields are required', true);
            return;
        }

        if (!emailForm.newEmail.includes('@')) {
            showMessage('Please enter a valid email address', true);
            return;
        }

        isLoading = true;
        try {
            const response = await fetch('/api/user/change-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.id,
                    currentPassword: emailForm.currentPassword,
                    newEmail: emailForm.newEmail.trim()
                })
            });

            const data = await response.json();
            if (data.status === 200) {
                user.email = emailForm.newEmail.trim();
                profileForm.email = emailForm.newEmail.trim();
                showMessage('Email changed successfully');
                emailForm = {
                    currentPassword: '',
                    newEmail: ''
                };
                isChangingEmail = false;
            } else {
                showMessage(data.error || 'Failed to change email', true);
            }
        } catch (error) {
            showMessage('An error occurred while changing email', true);
        } finally {
            isLoading = false;
        }
    }

    async function deleteAccount() {
        if (!confirm('Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your job data.')) {
            return;
        }

        isLoading = true;
        try {
            const response = await fetch('/api/user/delete-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: user.id })
            });

            const data = await response.json();
            if (data.status === 200) {
                document.cookie = 'UserId=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                window.location.href = '/';
            } else {
                showMessage(data.error || 'Failed to delete account', true);
            }
        } catch (error) {
            showMessage('An error occurred while deleting account', true);
        } finally {
            isLoading = false;
        }
    }

    function logout() {
        document.cookie = 'UserId=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = '/login';
    }
</script>

<div class="profile-page">
    <div class="container">
        <div class="header">
            <h1>Profile Settings</h1>
            <p>Manage your account and preferences</p>
        </div>

        {#if successMessage}
            <div class="success-message">
                {successMessage}
            </div>
        {/if}

        {#if errorMessage}
            <div class="error-message">
                {errorMessage}
            </div>
        {/if}

        <div class="profile-grid">
            <!-- Account Overview -->
            <div class="section">
                <h2>Account Overview</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">{accountStats.totalJobs}</div>
                        <div class="stat-label">Total Jobs</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">{accountStats.activeJobs}</div>
                        <div class="stat-label">Active Jobs</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">{accountStats.completedJobs}</div>
                        <div class="stat-label">Completed</div>
                    </div>
                </div>
            </div>

            <!-- Profile Information -->
            <div class="section">
                <div class="section-header">
                    <h2>Profile Information</h2>
                    {#if !isEditingProfile}
                        <button class="button transparent" on:click={() => isEditingProfile = true}>
                            Edit
                        </button>
                    {/if}
                </div>

                {#if isEditingProfile}
                    <form on:submit|preventDefault={updateProfile}>
                        <label for="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            bind:value={profileForm.name} 
                            required 
                        />
                        <label for="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={profileForm.email} 
                            disabled 
                        />
                        <div class="form-actions">
                            <button type="button" class="button transparent" on:click={() => isEditingProfile = false}>
                                Cancel
                            </button>
                            <button type="submit" class="button filled" disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                {:else}
                    <div class="info-display">
                        <div class="info-item">
                            <label>Name:</label>
                            <span>{user.name}</span>
                        </div>
                        <div class="info-item">
                            <label>Email:</label>
                            <span>{user.email}</span>
                        </div>
                    </div>
                {/if}
            </div>

            <!-- Change Password -->
            <div class="section">
                <div class="section-header">
                    <h2>Change Password</h2>
                    {#if !isChangingPassword}
                        <button class="button transparent" on:click={() => isChangingPassword = true}>
                            Change
                        </button>
                    {/if}
                </div>

                {#if isChangingPassword}
                    <form on:submit|preventDefault={changePassword}>
                        <label for="currentPassword">Current Password</label>
                        <input 
                            type="password" 
                            id="currentPassword" 
                            bind:value={passwordForm.currentPassword} 
                            required 
                        />
                        <label for="newPassword">New Password</label>
                        <input 
                            type="password" 
                            id="newPassword" 
                            bind:value={passwordForm.newPassword} 
                            required 
                        />
                        <label for="confirmPassword">Confirm New Password</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            bind:value={passwordForm.confirmPassword} 
                            required 
                        />
                        <div class="form-actions">
                            <button type="button" class="button transparent" on:click={() => isChangingPassword = false}>
                                Cancel
                            </button>
                            <button type="submit" class="button filled" disabled={isLoading}>
                                {isLoading ? 'Changing...' : 'Change Password'}
                            </button>
                        </div>
                    </form>
                {:else}
                    <p class="section-description">Update your password to keep your account secure.</p>
                {/if}
            </div>

            <!-- Change Email -->
            <div class="section">
                <div class="section-header">
                    <h2>Change Email</h2>
                    {#if !isChangingEmail}
                        <button class="button transparent" on:click={() => isChangingEmail = true}>
                            Change
                        </button>
                    {/if}
                </div>

                {#if isChangingEmail}
                    <form on:submit|preventDefault={changeEmail}>
                        <label for="emailCurrentPassword">Current Password</label>
                        <input 
                            type="password" 
                            id="emailCurrentPassword" 
                            bind:value={emailForm.currentPassword} 
                            required 
                        />
                        <label for="newEmail">New Email</label>
                        <input 
                            type="email" 
                            id="newEmail" 
                            bind:value={emailForm.newEmail} 
                            required 
                        />
                        <div class="form-actions">
                            <button type="button" class="button transparent" on:click={() => isChangingEmail = false}>
                                Cancel
                            </button>
                            <button type="submit" class="button filled" disabled={isLoading}>
                                {isLoading ? 'Changing...' : 'Change Email'}
                            </button>
                        </div>
                    </form>
                {:else}
                    <p class="section-description">Update your email address for account notifications.</p>
                {/if}
            </div>

            <!-- Account Actions -->
            <div class="section">
                <h2>Account Actions</h2>
                <div class="action-buttons">
                    <button class="button transparent" on:click={logout}>
                        Logout
                    </button>
                    <button class="button error" on:click={deleteAccount} disabled={isLoading}>
                        {isLoading ? 'Deleting...' : 'Delete Account'}
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .profile-page {
        padding: 6rem 0 2rem 0;
        min-height: 100vh;
        background-color: #f8fafc;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
    }

    .header {
        text-align: center;
        margin-bottom: 3rem;
        background-color: #1d40b0;
        color: #fff;
        padding: 2rem;
        border-radius: 16px;
        border: 1px solid #1d40b0;
        border-style: dashed;
    }

    .header h1 {
        font-size: 3rem;
        margin-bottom: 0.5rem;
    }

    .header p {
        font-size: 1.2rem;
        opacity: 0.9;
    }

    .success-message {
        background-color: #f0fdf4;
        border: 1px solid #bbf7d0;
        color: #166534;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 2rem;
        text-align: center;
        font-weight: 500;
    }

    .error-message {
        background-color: #fef2f2;
        border: 1px solid #fecaca;
        color: #dc2626;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 2rem;
        text-align: center;
        font-weight: 500;
    }

    .profile-grid {
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    }

    .section {
        background: #fff;
        padding: 2rem;
        border-radius: 16px;
        border: 1px solid #1d40b0;
        border-style: dashed;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    .section h2 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #1d40b0;
    }

    .section-description {
        color: #6b7280;
        font-style: italic;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
    }

    .stat-card {
        text-align: center;
        padding: 1rem;
        background: #f8fafc;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
    }

    .stat-number {
        font-size: 2rem;
        font-weight: bold;
        color: #1d40b0;
        margin-bottom: 0.5rem;
    }

    .stat-label {
        font-size: 0.875rem;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .info-display {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .info-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 0;
        border-bottom: 1px solid #e5e7eb;
    }

    .info-item:last-child {
        border-bottom: none;
    }

    .info-item label {
        font-weight: 600;
        color: #374151;
        margin: 0;
    }

    .info-item span {
        color: #6b7280;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 1rem;
    }

    .action-buttons {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    @media (max-width: 768px) {
        .profile-grid {
            grid-template-columns: 1fr;
        }

        .header h1 {
            font-size: 2rem;
        }

        .section {
            padding: 1.5rem;
        }

        .form-actions {
            flex-direction: column;
        }

        .action-buttons {
            flex-direction: column;
        }
    }
</style>
