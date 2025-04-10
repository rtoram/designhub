document.getElementById('add-text-btn').addEventListener('click', () => {
    const font = document.getElementById('font-select').value;
    const color = document.getElementById('color-picker').value;
    const text = new fabric.Textbox('Digite seu texto', {
        left: 100,
        top: 100,
        width: 200,
        fontSize: 20,
        fontFamily: font,
        fill: color,
    });
    canvas.add(text);
});

// Atualizar fonte e cor de um texto selecionado
canvas.on('selection:updated', () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
        document.getElementById('font-select').value = activeObject.fontFamily || 'Arial';
        document.getElementById('color-picker').value = activeObject.fill || '#000000';
    }
});

document.getElementById('font-select').addEventListener('change', (e) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
        activeObject.set('fontFamily', e.target.value);
        canvas.renderAll();
    }
});

document.getElementById('color-picker').addEventListener('change', (e) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
        activeObject.set('fill', e.target.value);
        canvas.renderAll();
    }
});
