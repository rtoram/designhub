// Inicializar o canvas com Fabric.js
const canvas = new fabric.Canvas('canvas', {
    width: 800,
    height: 500
});

// Função para upload de imagem
document.getElementById('upload-btn').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            fabric.Image.fromURL(event.target.result, (img) => {
                canvas.add(img);
            });
        };
        reader.readAsDataURL(file);
    };
    input.click();
});

// Função para remover fundo (exemplo básico com TensorFlow.js)
document.getElementById('remove-bg-btn').addEventListener('click', async () => {
    alert('Funcionalidade de remoção de fundo em desenvolvimento. Requer ajustes avançados com BodyPix.');
    // Para uma implementação completa, consulte a documentação do TensorFlow.js BodyPix.
    /*
    const net = await bodyPix.load();
    const segmentation = await net.segmentPerson(canvas.getElement());
    const mask = bodyPix.toMask(segmentation);
    // Aplicar a máscara no canvas (requer mais código).
    */
});

// Função para adicionar texto
document.getElementById('add-text-btn').addEventListener('click', () => {
    const text = new fabric.Textbox('Digite seu texto', {
        left: 100,
        top: 100,
        width: 200,
        fontSize: 20
    });
    canvas.add(text);
});

// Função para exportar a imagem
document.getElementById('export-btn').addEventListener('click', () => {
    const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1.0
    });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'imagem_editada.png';
    link.click();
});

// Função para mostrar/esconder o manual de instruções
const modal = document.getElementById('help-modal');
const btn = document.getElementById('help-btn');
const span = document.getElementsByClassName('close')[0];

btn.onclick = () => {
    modal.style.display = 'block';
};

span.onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
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
