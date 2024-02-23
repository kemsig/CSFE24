var textBox = document.getElementById("userInput");
var button = document.getElementById("confirmButton");
var tOutput= document.getElementById("translatedOutput");

textBox.addEventListener("input", function() {
    // Check if textbox value is not empty
    if (textBox.value !== "") {
        // Enable the button
        button.disabled = false;
    } else {
        // Disable the button if textbox is empty
        button.disabled = true;
    }
});

button.addEventListener("click", async function() {
    const result = await getTranslation(textBox.value)
    tOutput.textContent = result;
});

function getTranslatedText(result){
}

async function getTranslation(textToTranslate){
    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': '6fbd33de69mshbcda194146b5185p1ab49bjsn63f2ad3d4a0d',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: new URLSearchParams({
            q: textToTranslate,
            target: 'tl',
            source: 'en'
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        const data = JSON.parse(result);
        console.log(result);
        return data.data.translations[0].translatedText;
    } catch (error) {
        console.error(error);
    }
}