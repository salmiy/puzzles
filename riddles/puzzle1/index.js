const encrypt = CryptoJS.AES.encrypt
const decrypt = CryptoJS.AES.decrypt


const givePassPhrase = s => {
    const pass = document.getElementById("pass")
    pass.innerHTML = `<div>Your passphrase</div><b>${s}</b>`
    pass.style.display = "flex"
    setTimeout(() => {
        pass.style.display = "none"
    }, 15000);
    const answerIn = document.getElementById("answer-input")
    answerIn.value = "";
}

const showRiddle = () => {
    const answerIn = document.getElementById("answer-input")

    let pass;
    const enc_pass = "U2FsdGVkX191AcII6dYPEdNQkYqay2N+NU6AIJBST0c="

    answerIn.onkeydown = e => {
        if (e.key == "Enter")
        {
            pass = decrypt(enc_pass, e.target.value.toLowerCase()).toString(CryptoJS.enc.Utf8);
            console.log(pass)
            if (pass.length == 0)
                givePassPhrase("pass2072");
            else {
                givePassPhrase(pass);
            }
        }
    }
}

showRiddle();