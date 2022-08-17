var formElement = document.forms['formElement'];


formElement.addEventListener('click', e => {
    let inputs = formElement.elements;

    for(let i = 0; i < inputs.length; i++){
        inputs[i].classList.remove('focused');
    }
    if(e.target.tagName === 'INPUT') {
        e.target.classList.add('focused');
    }
    
})