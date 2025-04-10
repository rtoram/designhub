// Função para remover fundo (usando BodyPix)
document.getElementById('remove-bg-btn').addEventListener('click', async () => {
    const net = await bodyPix.load(); // Carregar o modelo BodyPix
    const canvasElement = canvas.getActiveObject();
    if (!canvasElement || !(canvasElement instanceof fabric.Image)) {
        alert('Selecione uma imagem no canvas para remover o fundo.');
        return;
    }

    const imgElement = new Image();
    imgElement.src = canvasElement.toDataURL();

    imgElement.onload = async () => {
        const segmentation = await net.segmentPerson(imgElement);
        const maskBackground = bodyPix.toMask(segmentation, { r: 0, g: 0, b: 0, a: 0 }, { r: 255, g: 255, b: 255, a: 255 });
        
        const maskedCanvas = document.createElement('canvas');
        maskedCanvas.width = imgElement.width;
        maskedCanvas.height = imgElement.height;
        const ctx = maskedCanvas.getContext('2d');
        ctx.putImageData(maskBackground, 0, 0);
        
        fabric.Image.fromURL(maskedCanvas.toDataURL(), (img) => {
            canvas.remove(canvasElement);
            canvas.add(img);
        });
    };
});
