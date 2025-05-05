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
        min-height: 200px;
        width: 100%;
        padding: 1.5rem;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .feature:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .img-container {
        aspect-ratio: 1/1;
        border-radius: 10000px;
        background-color: #DBE9FE;
        padding: clamp(8px, 2vw, 10px);
        display: flex;
        align-items: center;
        justify-content: center;
        width: clamp(60px, 15vw, 80px);
        height: clamp(60px, 15vw, 80px);
    }

    .img-container img {
        width: 60%;
        height: 60%;
        object-fit: contain;
    }

    h3 {
        color: #1d40b0;
        font-size: clamp(1.25rem, 2vw, 2rem);
        font-weight: 600;
        margin-top: clamp(0.5rem, 2vw, 1rem);
        text-align: center;
    }

    p {
        color: #64748b;
        font-size: clamp(0.875rem, 1.5vw, 1rem);
        line-height: 1.5;
        text-align: center;
        margin-top: 0.5rem;
    }

    .text-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
        padding: 0.5rem;
    }

    @media (max-width: 768px) {
        .feature {
            padding: 1rem;
        }
    }
</style>