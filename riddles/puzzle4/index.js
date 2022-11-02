const encrypt = CryptoJS.AES.encrypt
const decrypt = CryptoJS.AES.decrypt

const enc_key = "U2FsdGVkX1+5C+N5tvf8JVq2tbdryz/LU2fvGEd2O8CT9kO5UJxOBJMaXoICazoNZ7AtD0BkfLg2nJssw3D13w=="
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
let riddle

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

    let pass;
    const enc_pass = "U2FsdGVkX1/7zU0Xd8wjrZMeOHtnrVZUYgILSZFxazM="

    answerIn.onkeydown = e => {
        if (e.key == "Enter")
        {
            pass = decrypt(enc_pass, e.target.value.toLowerCase()).toString(CryptoJS.enc.Utf8);
            if (pass.startsWith('Y'))
                givePassPhrase(pass);
            else 
                givePassPhrase("Loser")
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