
    

function main() {

    // JavaScript to update the slider value dynamically
    const slider = document.getElementById('interestSlider');
    const output = document.getElementById('sliderValue');
    output.textContent = slider.value;

    slider.oninput = function() {
        output.textContent = this.value;
    }

}

main();