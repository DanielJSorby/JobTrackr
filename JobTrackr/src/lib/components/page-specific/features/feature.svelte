<script>
    let { title, description, image } = $props();
</script>

<div class="feature">
    <div class="img-container">
        <img src={image} alt={title} />
    </div>
    <div class="text-container">
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
</div>

<style>
    .feature {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        border-radius: 16px;
        border: 1px solid #1d40b0;
	    border-style: dashed;
        height: 200px;
        width: 400px;
    }

    .img-container {
        aspect-ratio: 1/1;
        border-radius: 10000px;
        background-color: #DBE9FE;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    h3 {
        color: #1d40b0;
        font-size: 32px;
        font-weight: 600;
        margin-top: 10px;
    }

    p {
        color: #64748b;
    }

    .text-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 80%;
    }
    
</style>