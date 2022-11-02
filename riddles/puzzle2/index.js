const encrypt = CryptoJS.AES.encrypt
const decrypt = CryptoJS.AES.decrypt

const enc_key = "U2FsdGVkX1/teVDuYsDzQC1GBl7tFijS6a96I5i41uvRJw8ClKvs720rIBeWbyynB/jldR15KVbfXoDSH/82ng=="
let key

const guarding_page = `
<div id="guard">
<div id="err">Something is wrong about your solution</div>
<div id="pass"></div>
<div id="input">
    <label id="answer-label" for="answer">The passphrase from the previous puzzle</label>
    <input id="answer" type="text" placeholder="Example: fine if you don't know" />
</div>
</div>
`
let riddle;
const enc_riddle = `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`

let mtimeout

const showGuardingPage = () => {
    clearTimeout(mtimeout)
    document.body.innerHTML = guarding_page
    let answer = document.getElementById("answer");
    let guard = document.getElementById("guard");
    let err = document.getElementById("err")
    answer.onkeydown = e => {
        if (e.key == "Enter")
        {
            key = decrypt(enc_key, e.target.value.toLowerCase()).toString(CryptoJS.enc.Utf8);
            if (key.startsWith("key-"))
                showRiddle();
            else {
                err.style.display = "flex"
                setTimeout(() => {
                    err.style.display = "none"
                }, 3000);
            }
        }
    }
}

const givePassPhrase = s => {
    showGuardingPage()
    const pass = document.getElementById("pass")
    pass.innerHTML = `<div>Your passphrase</div><b>${s}</b>`
    pass.style.display = "flex"
    setTimeout(() => {
        pass.style.display = "none"
    }, 15000);
}

const showRiddle = () => {
    riddle = decrypt(enc_riddle, key).toString(CryptoJS.enc.Utf8)
    document.body.innerHTML =  riddle
    const close = document.getElementById("close")
    const answerIn = document.getElementById("answer-input")

    let pass1;
    let pass2;
    const enc_pass1 = "U2FsdGVkX19/kvF7kODrKx7I9FUrr3Jqii72xcBbn20="
    const enc_pass2 = "U2FsdGVkX1/h2EHN3fBeQXWjjHL8MQ8dy7SIIJuDf4A="

    answerIn.onkeydown = e => {
        if (e.key == "Enter")
        {
            pass1 = decrypt(enc_pass1, e.target.value.toLowerCase()).toString(CryptoJS.enc.Utf8);
            pass2 = decrypt(enc_pass2, e.target.value.toLowerCase()).toString(CryptoJS.enc.Utf8);
            if (pass1.startsWith('d'))
                givePassPhrase(pass1);
            else if (pass2.startsWith('d'))
                givePassPhrase(pass2);
            else 
                givePassPhrase("pass phrase 3031")
        }
    }

    close.onclick = e => {
        showGuardingPage()
    }
    mtimeout = setTimeout(() => {
        showGuardingPage()
    }, 420000);
}

showGuardingPage();