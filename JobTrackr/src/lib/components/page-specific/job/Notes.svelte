<script lang="ts">
    export let notes: string;
</script>

<div class="box notes">
    <h2>Notes</h2>
    <h3>Keep track of important details about this job application</h3>
    <p class="note">{notes}</p>
</div>

<style>
    .box {
        border: 1px solid #1d40b0;
        border-style: dashed;
        padding: 20px;
        margin: 20px;
        border-radius: 26px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    h2 {
        margin-bottom: 20px;
    }

    h3 {
        font-weight: 100;
        color: #6B7280;
        font-size: 24px;
    }

    .note {
        margin: 24px 20px;
        font-size: 30px;
    }
</style> 